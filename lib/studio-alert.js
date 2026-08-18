const STUDIO_ALERT = process.env.STUDIO_ALERT_EMAIL || "Studiotwentysix.ca@gmail.com";

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
  }[char]));
}

async function sendStudioAlert({ kind, name, email, title, date, time, seats, extra }) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) return false;

  const prettyDate = /^\d{4}-\d{2}-\d{2}$/.test(String(date || ""))
    ? new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : (date || "");
  const label = kind || "Signup";
  const subject = `New signup: ${title || "class"}`;
  const rows = [
    ["Type", label],
    ["Name", name || ""],
    ["Email", email || ""],
    ["Class", title || ""],
    ["Date", prettyDate],
    ["Time", time || ""],
    ["Seats", seats || "1"],
  ];
  if (extra) rows.push(["Note", extra]);

  const html = `<p>Someone just signed up.</p><p>${rows.map(([k, v]) => `<strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}`).join("<br>")}</p><p>5303 Claremont Ave, Oakland</p>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [STUDIO_ALERT],
      reply_to: email || process.env.EMAIL_REPLY_TO || undefined,
      subject,
      html
    })
  });
  if (!response.ok) throw new Error(`Studio alert returned ${response.status}`);
  return true;
}

module.exports = { sendStudioAlert, STUDIO_ALERT };
