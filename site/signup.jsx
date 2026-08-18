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
  const isBookable = (ev) => Boolean(ev.price);
  const requestedEventMatch = events.find((ev) => eventKey(ev) === requestedEvent);
  const successFallback = (!requestedEventMatch && paidSuccess && requestedEvent.includes("|"))
    ? { date: requestedEvent.split("|")[0], title: requestedEvent.split("|").slice(1).join("|"), time: "", where: window.S26.SITE.addressLabel, price: "", sub: "", blurb: "" }
    : null;
  const selectedClass = requestedEventMatch ? requestedEventMatch.title : classNames.includes(requested) ? requested : "";
  const sessions = events
    .filter((ev) => !selectedClass || ev.title === selectedClass)
    .slice(0, selectedClass ? 6 : 9);
  const firstBookable = sessions.find(isBookable) || null;
  const [bookingEvent, setBookingEvent] = React.useState(requestedEventMatch || successFallback || firstBookable);
  const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  React.useEffect(() => {
    if (requestedEventMatch) {
      requestAnimationFrame(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, []);

  return (
    <React.Fragment>
      <window.Nav />
      <main id="main" tabIndex={-1}>
        <section className="class-detail-band signup-direct" id="sessions">
          <div className="wrap reveal">
            <div className="sec-head pay-head">
              <div className="eyebrow-m">{paidSuccess ? "Confirmation" : selectedClass ? "Selected class" : "Choose a date"}</div>
              <h2>{paidSuccess ? "You're booked." : (selectedClass || copy.sessionsHeadline)} {!paidSuccess && <em>{copy.sessionsAccent}</em>}</h2>
              <p className="section-note">{paidSuccess ? "Your payment went through. Here are the details." : copy.sessionsBody}</p>
            </div>
            {!paidSuccess && <div className="payment-grid">
              {sessions.map((ev) => {
                return (
                <div
                  className={`payment-card session-card${bookingEvent && eventKey(bookingEvent) === eventKey(ev) ? " selected" : ""}${isBookable(ev) ? " is-clickable" : ""}`}
                  key={ev.date + ev.title}
                  role={isBookable(ev) ? "button" : undefined}
                  tabIndex={isBookable(ev) ? 0 : undefined}
                  aria-pressed={isBookable(ev) && bookingEvent && eventKey(bookingEvent) === eventKey(ev)}
                  aria-label={isBookable(ev) ? `Select ${ev.title} on ${fmtDate(ev.date)}` : undefined}
                  onClick={() => {
                    if (!isBookable(ev)) return;
                    setBookingEvent(ev);
                    requestAnimationFrame(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" }));
                  }}
                  onKeyDown={(e) => {
                    if (!isBookable(ev) || (e.key !== "Enter" && e.key !== " ")) return;
                    e.preventDefault();
                    setBookingEvent(ev);
                    requestAnimationFrame(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" }));
                  }}
                >
                  <span className="session-date">{fmtDate(ev.date)}</span>
                  <span className="session-time">{ev.time}</span>
                  <strong>{ev.title}</strong>
                  <em>{ev.sub || ev.blurb || copy.emptyLinkText}</em>
                  <small>{ev.price} · {ev.where}</small>
                  {isBookable(ev) ? (
                    <button className="btn btn-fill" type="button" onClick={(e) => {
                      e.stopPropagation();
                      setBookingEvent(ev);
                      requestAnimationFrame(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" }));
                    }}>{bookingEvent && eventKey(bookingEvent) === eventKey(ev) ? copy.selectedButton : copy.liveButton}</button>
                  ) : (
                    <button className="btn btn-outline" type="button" disabled>{copy.missingButton}</button>
                  )}
                </div>
              )})}
            </div>}
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
