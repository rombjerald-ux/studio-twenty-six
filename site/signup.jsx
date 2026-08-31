/* Studio Twenty Six — signup and payment page */
function SignupPage(){
  React.useEffect(() => {
    const root = document.querySelector(".site");
    root.classList.add("js");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const details = window.S26.CLASS_DETAILS;
  const copy = window.S26.SIGNUP;
  const classNames = Object.values(details).map((c) => c.title);
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("class") || "";
  const requestedEvent = params.get("event") || "";
  const paidSuccess = params.get("success") === "1";
  const events = window.S26.EVENTS;
  const eventKey = (ev) => `${ev.date}|${ev.title}`;
  const isBookable = (ev) => Boolean(ev.price) && window.S26.isFutureSession(ev);
  const requestedEventMatch = events.find((ev) => eventKey(ev) === requestedEvent);
  const liveRequested = requestedEventMatch && (paidSuccess || isBookable(requestedEventMatch)) ? requestedEventMatch : null;
  const pastRequested = requestedEventMatch && !paidSuccess && !isBookable(requestedEventMatch) ? requestedEventMatch : null;
  const successFallback = (!liveRequested && paidSuccess && requestedEvent.includes("|"))
    ? { date: requestedEvent.split("|")[0], title: requestedEvent.split("|").slice(1).join("|"), time: "", where: window.S26.SITE.addressLabel, price: "", sub: "", blurb: "" }
    : null;
  const selectedClass = liveRequested ? liveRequested.title : classNames.includes(requested) ? requested : "";
  const sessions = events.filter((ev) => (!selectedClass || ev.title === selectedClass) && isBookable(ev));
  const firstBookable = liveRequested || successFallback || pastRequested || null;
  const [bookingEvent, setBookingEvent] = React.useState(firstBookable);
  const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  const hasDirectEvent = Boolean(liveRequested || successFallback);
  const listing = (title) => window.S26.listingTitle(title);

  const chooseEvent = (ev) => {
    if (!isBookable(ev)) return;
    const url = window.S26.bookingHref(ev);
    window.history.replaceState({}, "", url);
    setBookingEvent(ev);
  };

  return (
    <React.Fragment>
      <window.Nav />
      <main id="main" tabIndex={-1}>
        <section className={`class-detail-band signup-direct${hasDirectEvent || bookingEvent ? " signup-checkout" : ""}`} id="sessions">
          <div className="wrap reveal">
            {paidSuccess ? (
              <div className="sec-head pay-head">
                <div className="eyebrow-m">Confirmation</div>
                <h2>You're booked.</h2>
                <p className="section-note">Your payment went through. Here are the details.</p>
              </div>
            ) : !bookingEvent ? (
              <div className="sec-head pay-head">
                <div className="eyebrow-m">{selectedClass ? listing(selectedClass) : "Sign up now"}</div>
                <h2>{copy.sessionsHeadline} <em>{copy.sessionsAccent}</em></h2>
                <p className="section-note">{copy.sessionsBody}</p>
              </div>
            ) : null}
            {!paidSuccess && !bookingEvent && (
              <div className="session-pick">
                {sessions.length === 0 && <p className="section-note">No upcoming dates for this class. Message the studio and we will help.</p>}
                {sessions.map((ev) => (
                  <a
                    className="session-pick-row"
                    key={ev.date + ev.title}
                    href={window.S26.bookingHref(ev)}
                    onClick={(e) => {
                      e.preventDefault();
                      chooseEvent(ev);
                    }}
                  >
                    <span>{fmtDate(ev.date)}</span>
                    <strong>{listing(ev.title)}</strong>
                    <em>{ev.title !== listing(ev.title) ? ev.title : ev.sub}</em>
                    <small>{ev.time} · {ev.price}</small>
                    <b>{copy.liveButton}</b>
                  </a>
                ))}
              </div>
            )}
            {bookingEvent && !paidSuccess && !hasDirectEvent && (
              <p className="checkout-change">
                <button type="button" className="text-link" onClick={() => { setBookingEvent(null); window.history.replaceState({}, "", selectedClass ? `book.html?class=${encodeURIComponent(selectedClass)}` : "book.html"); }}>Change date</button>
              </p>
            )}
            {bookingEvent && (
              <window.NativeCheckoutPanel event={bookingEvent} />
            )}
          </div>
        </section>
      </main>

      <window.Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<SignupPage />);
