const Stripe = require("stripe");
const { sendStudioAlert } = require("../lib/studio-alert");

// Existing sheet lives in lib/existing-mailing-list.js and /site/admin.html CSV.
// Stripe import (no mail): node scripts/import-mailing-list.js

function clean(value, max = 200) {
  return String(value || "").trim().slice(0, max);
}

module.exports = async function mailingList(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const name = clean(req.body && req.body.name, 160);
  const email = clean(req.body && req.body.email, 160).toLowerCase();

  if (!name) return res.status(400).json({ error: "Please enter your name." });
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  let id = "";
  try {
    if (process.env.STRIPE_SECRET_KEY) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const customer = await stripe.customers.create({
        name,
        email,
        description: "Studio 26 mailing list",
        metadata: {
          source: "studio26_mailing_list",
          request_type: "mailing_list",
        },
      });
      id = customer.id;
    }
  } catch (error) {
    console.error("Mailing list store failed", error);
  }

  try {
    await sendStudioAlert({
      kind: "Mailing list",
      name,
      email,
      title: "General mailing list",
      extra: "Not a class signup"
    });
  } catch (error) {
    console.error("Mailing list studio alert failed", error);
    if (!id) return res.status(500).json({ error: "Could not save that signup right now." });
  }

  if (!id && !process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "The mailing list is not configured yet." });
  }

  return res.status(200).json({ ok: true, id });
};
