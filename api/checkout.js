const Stripe = require("stripe");


const EVENTS = {
  "2026-08-19|Peace Love Draw": { amount: 2500, title: "Peace Love Draw", date: "2026-08-19", time: "6:00-9:00 PM" },
  "2026-08-23|Wake and Make": { amount: 4000, title: "Wake and Make", date: "2026-08-23", time: "8:00-10:00 AM" },
  "2026-08-25|Paint the Town": { amount: 5500, title: "Paint the Town", date: "2026-08-25", time: "6:30-8:30 PM" },
  "2026-09-09|Peace Love Draw": { amount: 2500, title: "Peace Love Draw", date: "2026-09-09", time: "6:00-9:00 PM" },
  "2026-09-13|Art Church": { amount: 5000, title: "Art Church", date: "2026-09-13", time: "1:00-3:00 PM" },
  "2026-09-27|Art Church": { amount: 5000, title: "Art Church", date: "2026-09-27", time: "1:00-3:00 PM" },
  "2026-09-29|The Craft Show": { amount: 5500, title: "The Craft Show", date: "2026-09-29", time: "6:00-9:00 PM" },
  "2026-10-06|Ride or Dye": { amount: 6500, title: "Ride or Dye", date: "2026-10-06", time: "6:30-8:30 PM" },
  "2026-10-11|Wake and Make": { amount: 4000, title: "Wake and Make", date: "2026-10-11", time: "8:00-10:00 AM" },
  "2026-10-13|Paint the Town": { amount: 5500, title: "Paint the Town", date: "2026-10-13", time: "6:30-8:30 PM" },
  "2026-10-14|Peace Love Draw": { amount: 2500, title: "Peace Love Draw", date: "2026-10-14", time: "6:00-9:00 PM" },
  "2026-10-22|Surrealist Dinner Party": { amount: 6500, title: "Surrealist Dinner Party", date: "2026-10-22", time: "6:00-11:00 PM" },
  "2026-11-03|Paint the Town": { amount: 5500, title: "Paint the Town", date: "2026-11-03", time: "6:30-8:30 PM" },
  "2026-11-08|Wake and Make": { amount: 4000, title: "Wake and Make", date: "2026-11-08", time: "8:00-10:00 AM" },
  "2026-11-15|Art Church": { amount: 5000, title: "Art Church", date: "2026-11-15", time: "1:00-3:00 PM" },
  "2026-11-18|Peace Love Draw": { amount: 2500, title: "Peace Love Draw", date: "2026-11-18", time: "6:00-9:00 PM" },
  "2026-11-19|Friendsgiving Party": { amount: 6500, title: "Friendsgiving Party", date: "2026-11-19", time: "6:00-11:00 PM" },
  "2026-12-01|Ride or Dye": { amount: 6500, title: "Ride or Dye", date: "2026-12-01", time: "6:30-8:30 PM" },
  "2026-12-06|Wake and Make": { amount: 4000, title: "Wake and Make", date: "2026-12-06", time: "8:00-10:00 AM" },
  "2026-12-09|Peace Love Draw": { amount: 2500, title: "Peace Love Draw", date: "2026-12-09", time: "6:00-9:00 PM" },
  "2026-12-13|Art Church": { amount: 5000, title: "Art Church", date: "2026-12-13", time: "1:00-3:00 PM" },
  "2026-12-17|Holiday Party": { amount: 6500, title: "Holiday Party", date: "2026-12-17", time: "6:00-11:00 PM" }
};

function baseUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${proto}://${host}`;
}

module.exports = async function checkout(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: "Checkout is not configured yet." });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const seats = Math.max(1, Math.min(Number(req.body && req.body.seats) || 1, 4));
  const customerEmail = String(req.body && req.body.email || "").trim().toLowerCase();
  const customerName = String(req.body && req.body.name || "").trim();
  const key = `${req.body && req.body.date}|${req.body && req.body.title}`;
  const event = EVENTS[key];

  if (!event) {
    return res.status(400).json({ error: "That class is not available for checkout." });
  }

  if (!customerEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customerEmail)) {
    return res.status(400).json({ error: "Please enter a valid email address for your confirmation." });
  }

  const promoCode = String(req.body && req.body.promoCode || "").trim().toUpperCase();
  let unitAmount = event.amount;
  let appliedPromo = "";
  if (promoCode) {
    if (promoCode !== "STUDENT") {
      return res.status(400).json({ error: "That code is not valid." });
    }
    if (event.title !== "Peace Love Draw") {
      return res.status(400).json({ error: "STUDENT is only for Peace Love Draw." });
    }
    unitAmount = Math.max(0, event.amount - 1000);
    appliedPromo = "STUDENT";
  }

  const site = baseUrl(req);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: customerEmail,
    customer_creation: "always",
    line_items: [
      {
        quantity: seats,
        price_data: {
          currency: "usd",
          unit_amount: unitAmount,
          product_data: {
            name: `${event.title} - ${event.date}`,
            description: appliedPromo
              ? `${event.time} at Studio Twenty Six · STUDENT $10 off`
              : `${event.time} at Studio Twenty Six`
          }
        }
      }
    ],
    metadata: {
      class_title: event.title,
      class_date: event.date,
      class_time: event.time,
      seats: String(seats),
      customer_name: customerName,
      promo_code: appliedPromo
    },
    payment_intent_data: {
      receipt_email: customerEmail
    },
    success_url: `${site}/site/book.html?success=1&event=${encodeURIComponent(key)}#book`,
    cancel_url: `${site}/site/book.html?event=${encodeURIComponent(key)}#book`
  });

  return res.status(200).json({ url: session.url });
};
