const Stripe = require("stripe");

const ADDRESS = "5303 Claremont Ave, Oakland";
const MIN_HOURS = 36;
const MAX_HOURS = 72;

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"]/g, (char) => ({
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

function parseClock(time) {
  const t = String(time || "");
  const match = t.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i);
  if (!match) return { h: 12, m: 0 };
  let h = Number(match[1]);
  const m = Number(match[2] || 0);
  let mer = (match[3] || "").toUpperCase();
  const endMer = t.match(/(AM|PM)\s*$/i);
  if (!mer && endMer) mer = endMer[1].toUpperCase();
  if (/afternoon/i.test(t) && !match[3] && !endMer) return { h: 14, m: 0 };
  if (mer === "PM" && h < 12) h += 12;
  if (mer === "AM" && h === 12) h = 0;
  return { h, m };
}

function laOffset(isoDate) {
  const probe = new Date(`${isoDate}T20:00:00Z`);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    timeZoneName: "longOffset",
    hour: "numeric"
  }).formatToParts(probe);
  const name = (parts.find((p) => p.type === "timeZoneName") || {}).value || "GMT-07:00";
  const off = name.replace("GMT", "");
  return off.startsWith("-") || off.startsWith("+") ? off : "-07:00";
}

function classStartMs(isoDate, time) {
  if (!isoDate) return null;
  const { h, m } = parseClock(time);
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  const ms = Date.parse(`${isoDate}T${hh}:${mm}:00${laOffset(isoDate)}`);
  return Number.isFinite(ms) ? ms : null;
}

function hoursUntil(isoDate, time) {
  const start = classStartMs(isoDate, time);
  if (start == null) return null;
  return (start - Date.now()) / 3600000;
}

function inReminderWindow(isoDate, time) {
  const hours = hoursUntil(isoDate, time);
  return hours != null && hours >= MIN_HOURS && hours <= MAX_HOURS;
}

async function sendReminder({ email, name, title, date, time }) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM || !email) return false;
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
      subject: `Reminder: ${title} is in two days`,
      html: `<p>Hi ${escapeHtml(name || "there")},</p><p>Just a reminder that <strong>${escapeHtml(title)}</strong> is in two days. We're so excited to see you.</p><p>More information will be provided before the class.</p><p><strong>Class:</strong> ${escapeHtml(title)}<br><strong>Date:</strong> ${escapeHtml(formatDate(date) || date)}<br><strong>Time:</strong> ${escapeHtml(time)}<br><strong>Address:</strong> ${escapeHtml(ADDRESS)}</p><p>Studio Twenty Six</p>`
    })
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
  return true;
}

function authorized(req) {
  if (req.headers["x-vercel-cron"] === "1") return true;
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = req.headers.authorization || "";
  return header === `Bearer ${secret}`;
}

async function listPaidSessions(stripe) {
  const sessions = [];
  let startingAfter;
  do {
    const page = await stripe.checkout.sessions.list({
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {})
    });
    sessions.push(...page.data);
    startingAfter = page.has_more && page.data.length ? page.data[page.data.length - 1].id : undefined;
  } while (startingAfter);
  return sessions.filter((session) => session.status === "complete" && session.payment_status === "paid");
}

async function listSignupRequests(stripe) {
  const customers = [];
  let nextPage;
  do {
    const page = await stripe.customers.search({
      query: "metadata['source']:'studio26_signup_request'",
      limit: 100,
      ...(nextPage ? { page: nextPage } : {})
    });
    customers.push(...page.data);
    nextPage = page.has_more ? page.next_page : undefined;
  } while (nextPage);
  return customers;
}

module.exports = async function classReminders(req, res) {
  if (req.method !== "GET" && req.method !== "POST") return res.status(405).end();
  if (!authorized(req)) return res.status(401).json({ error: "Unauthorized" });
  if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ error: "Stripe is not configured yet." });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sent = [];
  const skipped = [];

  try {
    const sessions = await listPaidSessions(stripe);
    for (const session of sessions) {
      const meta = session.metadata || {};
      const title = meta.class_title || "";
      const date = meta.class_date || "";
      const time = meta.class_time || "";
      const email = (session.customer_details && session.customer_details.email) || session.customer_email || "";
      const name = meta.customer_name || (session.customer_details && session.customer_details.name) || "there";
      if (!title || !date || !email) {
        skipped.push({ id: session.id, reason: "missing fields" });
        continue;
      }
      if (meta.reminder_sent === "1") {
        skipped.push({ id: session.id, reason: "already sent" });
        continue;
      }
      if (!inReminderWindow(date, time)) {
        skipped.push({ id: session.id, reason: "outside window", hours: hoursUntil(date, time) });
        continue;
      }
      await sendReminder({ email, name, title, date, time });
      await stripe.checkout.sessions.update(session.id, {
        metadata: { ...meta, reminder_sent: "1" }
      });
      sent.push({ id: session.id, email, title, date });
    }

    const requests = await listSignupRequests(stripe);
    for (const customer of requests) {
      const meta = customer.metadata || {};
      const title = meta.class_title || "";
      const date = meta.class_date || "";
      const time = meta.class_time || "";
      const email = customer.email || "";
      const name = customer.name || "there";
      if (!title || !date || !email) {
        skipped.push({ id: customer.id, reason: "missing fields" });
        continue;
      }
      if (meta.reminder_sent === "1") {
        skipped.push({ id: customer.id, reason: "already sent" });
        continue;
      }
      if (!inReminderWindow(date, time)) {
        skipped.push({ id: customer.id, reason: "outside window", hours: hoursUntil(date, time) });
        continue;
      }
      await sendReminder({ email, name, title, date, time });
      await stripe.customers.update(customer.id, {
        metadata: { ...meta, reminder_sent: "1" }
      });
      sent.push({ id: customer.id, email, title, date });
    }

    return res.status(200).json({ ok: true, sent: sent.length, skipped: skipped.length, sentTo: sent });
  } catch (error) {
    console.error("Class reminders failed", error);
    return res.status(500).json({ error: "Reminders could not be sent." });
  }
};
