const Stripe = require("stripe");

async function readRawBody(req) {
  if (Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === "string") return req.body;
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>\"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
  }[char]));
}

async function sendConfirmation(session) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) return false;

  const email = session.customer_details && session.customer_details.email;
  if (!email) return false;

  const metadata = session.metadata || {};
  const name = metadata.customer_name || "there";
  const title = metadata.class_title || "your Studio Twenty Six class";
  const date = metadata.class_date || "";
  const time = metadata.class_time || "";
  const seats = metadata.seats || "1";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [email],
      subject: `You're booked for ${title}`,
      html: `<p>Hi ${escapeHtml(name)},</p><p>Your spot is confirmed for <strong>${escapeHtml(title)}</strong>.</p><p><strong>Date:</strong> ${escapeHtml(date)}<br><strong>Time:</strong> ${escapeHtml(time)}<br><strong>Seats:</strong> ${escapeHtml(seats)}</p><p>We can't wait to make something with you.</p><p>Studio Twenty Six</p>`
    })
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
  return true;
}

module.exports = async function stripeWebhook(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(500).json({ error: "Webhook is not configured yet." });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(await readRawBody(req), signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    try {
      await sendConfirmation(event.data.object);
    } catch (error) {
      console.error("Confirmation email failed", error);
      return res.status(500).json({ error: "Confirmation email could not be sent." });
    }
  }

  return res.status(200).json({ received: true });
};

module.exports.config = { api: { bodyParser: false } };
