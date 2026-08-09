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
  const events = window.S26.EVENTS;
  const eventKey = (ev) => `${ev.date}|${ev.title}`;
  const requestedEventMatch = events.find((ev) => eventKey(ev) === requestedEvent);
  const selectedClass = requestedEventMatch ? requestedEventMatch.title : classNames.includes(requested) ? requested : "";
  const sessions = events
    .filter((ev) => !selectedClass || ev.title === selectedClass)
    .slice(0, selectedClass ? 6 : 9);
  const firstBookable = sessions.find((ev) => ev.bookingUrl) || null;
  const [bookingEvent, setBookingEvent] = React.useState(requestedEventMatch || firstBookable);
  const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  React.useEffect(() => {
    if (requestedEventMatch) {
      requestAnimationFrame(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, []);

  return (
    <React.Fragment>
      <window.Nav />
      <header className="register-hero" id="top">
        <div className="register-bg"><img src={copy.hero.image} alt="" /></div>
        <div className="grain-ov"></div>
        <div className="wrap register-hero-inner">
          <div className="eyebrow"><span>{copy.hero.eyebrow}</span><span className="est">{copy.hero.meta}</span></div>
          <h1>{copy.hero.headline}</h1>
          <p>{copy.hero.body}</p>
        </div>
      </header>

      <main>
        <section className="class-detail-band" id="sessions">
          <div className="wrap reveal">
            <div className="sec-head pay-head">
              <div className="eyebrow-m">{selectedClass ? "Selected class" : "Choose a date"}</div>
              <h2>{selectedClass || copy.sessionsHeadline} <em>{copy.sessionsAccent}</em></h2>
              <p className="section-note">{copy.sessionsBody}</p>
            </div>
            <div className="payment-grid">
              {sessions.map((ev) => {
                return (
                <div className={`payment-card session-card${bookingEvent && eventKey(bookingEvent) === eventKey(ev) ? " selected" : ""}`} key={ev.date + ev.title}>
                  <span>{fmtDate(ev.date)} · {ev.time}</span>
                  <strong>{ev.title}</strong>
                  <em>{ev.sub || ev.blurb || copy.emptyLinkText}</em>
                  <small>{ev.price} · {ev.where}</small>
                  {ev.bookingUrl ? (
                    <button className="btn btn-fill" type="button" onClick={() => {
                      setBookingEvent(ev);
                      requestAnimationFrame(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" }));
                    }}>{bookingEvent && eventKey(bookingEvent) === eventKey(ev) ? copy.selectedButton : copy.liveButton}</button>
                  ) : (
                    <button className="btn btn-outline" type="button" disabled>{copy.missingButton}</button>
                  )}
                </div>
              )})}
            </div>
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
