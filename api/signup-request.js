const Stripe = require("stripe");

const EVENTS = {
  "2026-08-19|Peace Love Draw": { title: "Peace Love Draw", date: "2026-08-19", time: "6:00-9:00 PM", price: "$25" },
  "2026-08-23|Wake and Make": { title: "Wake and Make", date: "2026-08-23", time: "8:00-10:00 AM", price: "$40" },
  "2026-08-25|Paint the Town": { title: "Paint the Town", date: "2026-08-25", time: "6:30-8:30 PM", price: "$55" },
  "2026-09-09|Peace Love Draw": { title: "Peace Love Draw", date: "2026-09-09", time: "6:00-9:00 PM", price: "$25" },
  "2026-09-13|Art Church": { title: "Art Church", date: "2026-09-13", time: "1:00-3:00 PM", price: "$50" },
  "2026-09-19|Opening Block Party": { title: "Opening Block Party", date: "2026-09-19", time: "Afternoon", price: "$0" },
  "2026-09-27|Art Church": { title: "Art Church", date: "2026-09-27", time: "1:00-3:00 PM", price: "$50" },
  "2026-09-29|The Craft Show": { title: "The Craft Show", date: "2026-09-29", time: "6:00-9:00 PM", price: "$55" },
  "2026-10-06|Ride or Dye": { title: "Ride or Dye", date: "2026-10-06", time: "6:30-8:30 PM", price: "$65" },
  "2026-10-11|Wake and Make": { title: "Wake and Make", date: "2026-10-11", time: "8:00-10:00 AM", price: "$40" },
  "2026-10-13|Paint the Town": { title: "Paint the Town", date: "2026-10-13", time: "6:30-8:30 PM", price: "$55" },
  "2026-10-14|Peace Love Draw": { title: "Peace Love Draw", date: "2026-10-14", time: "6:00-9:00 PM", price: "$25" },
  "2026-10-22|Surrealist Dinner Party": { title: "Surrealist Dinner Party", date: "2026-10-22", time: "6:00-11:00 PM", price: "$65" },
  "2026-11-03|Paint the Town": { title: "Paint the Town", date: "2026-11-03", time: "6:30-8:30 PM", price: "$55" },
  "2026-11-08|Wake and Make": { title: "Wake and Make", date: "2026-11-08", time: "8:00-10:00 AM", price: "$40" },
  "2026-11-15|Art Church": { title: "Art Church", date: "2026-11-15", time: "1:00-3:00 PM", price: "$50" },
  "2026-11-18|Peace Love Draw": { title: "Peace Love Draw", date: "2026-11-18", time: "6:00-9:00 PM", price: "$25" },
  "2026-11-19|Friendsgiving Party": { title: "Friendsgiving Party", date: "2026-11-19", time: "6:00-11:00 PM", price: "$65" },
  "2026-12-01|Ride or Dye": { title: "Ride or Dye", date: "2026-12-01", time: "6:30-8:30 PM", price: "$65" },
  "2026-12-06|Wake and Make": { title: "Wake and Make", date: "2026-12-06", time: "8:00-10:00 AM", price: "$40" },
  "2026-12-09|Peace Love Draw": { title: "Peace Love Draw", date: "2026-12-09", time: "6:00-9:00 PM", price: "$25" },
  "2026-12-13|Art Church": { title: "Art Church", date: "2026-12-13", time: "1:00-3:00 PM", price: "$50" },
  "2026-12-17|Holiday Party": { title: "Holiday Party", date: "2026-12-17", time: "6:00-11:00 PM", price: "$65" }
};

function clean(value, max = 500) {
  return String(value || "").trim().slice(0, max);
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>\"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
  }[char]));
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

async function sendConfirmation({ event, email, name, seats, requestType }) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) return false;

  const isSlidingScale = requestType === "sliding_scale";
  const subject = isSlidingScale
    ? `We received your request for ${event.title}`
    : `You're on the list for ${event.title}`;
  const headline = isSlidingScale
    ? "Your sliding scale request is in."
    : "You're on the signup list.";
  const body = isSlidingScale
    ? "Tess and the Studio Twenty Six team can see your request and will follow up if anything else is needed."
    : "Tess and the Studio Twenty Six team can see your RSVP in the studio list.";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [email],
      reply_to: process.env.EMAIL_REPLY_TO || undefined,
      subject,
      html: `<p>Hi ${escapeHtml(name)},</p><p><strong>${escapeHtml(headline)}</strong></p><p>${escapeHtml(body)}</p><p><strong>Class/event:</strong> ${escapeHtml(event.title)}<br><strong>Date:</strong> ${escapeHtml(formatDate(event.date))}<br><strong>Time:</strong> ${escapeHtml(event.time)}<br><strong>Seats:</strong> ${escapeHtml(seats)}</p><p>We can't wait to make something with you.</p><p>Studio Twenty Six</p>`
    })
  });

  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
  return true;
}

module.exports = async function signupRequest(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: "Signup requests are not configured yet." });
  }

  const key = `${clean(req.body && req.body.date, 40)}|${clean(req.body && req.body.title, 160)}`;
  const event = EVENTS[key];
  if (!event) return res.status(400).json({ error: "That class or event is not available." });

  const email = clean(req.body && req.body.email, 160).toLowerCase();
  const name = clean(req.body && req.body.name, 160);
  const seats = Math.max(1, Math.min(Number(req.body && req.body.seats) || 1, 10));
  const requestType = clean(req.body && req.body.requestType, 80) === "sliding_scale" ? "sliding_scale" : "free_signup";

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (!name) return res.status(400).json({ error: "Please enter your name." });

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const customer = await stripe.customers.create({
      name,
      email,
      description: `Studio 26 ${requestType.replace("_", " ")}: ${event.title}`,
      metadata: {
        source: "studio26_signup_request",
        request_type: requestType,
        class_title: event.title,
        class_date: event.date,
        class_time: event.time,
        class_price: event.price,
        seats: String(seats),
      },
    });

    let confirmationSent = false;
    try {
      confirmationSent = await sendConfirmation({ event, email, name, seats, requestType });
    } catch (error) {
      console.error("Signup confirmation email failed", error);
    }

    return res.status(200).json({ ok: true, id: customer.id, confirmationSent });
  } catch (error) {
    console.error("Signup request failed", error);
    return res.status(500).json({ error: "Could not save that signup request right now." });
  }
};
