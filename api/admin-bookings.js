const Stripe = require("stripe");

function unauthorized(res) {
  return res.status(401).json({ error: "Admin login required." });
}

function isAuthorized(req) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Basic ") || !process.env.ADMIN_USER || !process.env.ADMIN_PASSWORD) return false;
  const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  const separator = decoded.indexOf(":");
  if (separator < 0) return false;
  return decoded.slice(0, separator) === process.env.ADMIN_USER && decoded.slice(separator + 1) === process.env.ADMIN_PASSWORD;
}

module.exports = async function adminBookings(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (!isAuthorized(req)) return unauthorized(res);
  if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ error: "Stripe is not configured yet." });

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
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
    const bookings = sessions
      .filter((session) => session.status === "complete" && session.payment_status === "paid")
      .map((session) => ({
        id: session.id,
        created: session.created,
        title: session.metadata && session.metadata.class_title,
        date: session.metadata && session.metadata.class_date,
        time: session.metadata && session.metadata.class_time,
        seats: Number(session.metadata && session.metadata.seats) || 1,
        name: session.metadata && session.metadata.customer_name || session.customer_details && session.customer_details.name || "",
        email: session.customer_details && session.customer_details.email || session.customer_email || "",
        amount: session.amount_total,
        currency: session.currency
      }));
    const signupRequests = [];
    let nextPage;
    do {
      const page = await stripe.customers.search({
        query: "metadata['source']:'studio26_signup_request'",
        limit: 100,
        ...(nextPage ? { page: nextPage } : {})
      });
      signupRequests.push(...page.data.map((customer) => ({
        id: customer.id,
        created: customer.created,
        name: customer.name || "",
        email: customer.email || "",
        type: customer.metadata && customer.metadata.request_type || "signup_request",
        title: customer.metadata && customer.metadata.class_title || "",
        date: customer.metadata && customer.metadata.class_date || "",
        time: customer.metadata && customer.metadata.class_time || "",
        price: customer.metadata && customer.metadata.class_price || "",
        seats: Number(customer.metadata && customer.metadata.seats) || 1
      })));
      nextPage = page.has_more ? page.next_page : undefined;
    } while (nextPage);
    return res.status(200).json({ bookings, signupRequests });
  } catch (error) {
    console.error("Admin bookings failed", error);
    return res.status(500).json({ error: "Could not load bookings right now." });
  }
};
