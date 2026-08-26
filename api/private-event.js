const { sendStudioAlert } = require("../lib/studio-alert");

function clean(value, max = 800) {
  return String(value || "").trim().slice(0, max);
}

module.exports = async function privateEvent(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const name = clean(req.body && req.body.name, 160);
  const email = clean(req.body && req.body.email, 160).toLowerCase();
  const occasion = clean(req.body && req.body.occasion, 120);
  const date = clean(req.body && req.body.date, 80);
  const message = clean(req.body && req.body.message, 800);

  if (!name) return res.status(400).json({ error: "Please enter your name." });
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (!message) return res.status(400).json({ error: "Please tell us a little about the event." });

  try {
    await sendStudioAlert({
      kind: "Private event inquiry",
      name,
      email,
      title: occasion || "Private event",
      date,
      extra: message
    });
  } catch (error) {
    console.error("Private event alert failed", error);
    return res.status(500).json({ error: "Could not send that note right now. Email Studiotwentysix.ca@gmail.com." });
  }

  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    return res.status(500).json({ error: "Could not send that note right now. Email Studiotwentysix.ca@gmail.com." });
  }

  return res.status(200).json({ ok: true });
};
