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
  const site = window.S26.SITE;
  const classNames = Object.values(details).map((c) => c.title);
  const requested = new URLSearchParams(window.location.search).get("class") || "";
  const selectedClass = classNames.includes(requested) ? requested : "";
  const [paymentMode, setPaymentMode] = React.useState("");
  const events = window.S26.EVENTS;
  const sessions = events
    .filter((ev) => !selectedClass || ev.title === selectedClass)
    .slice(0, selectedClass ? 6 : 9);
  const firstBookable = sessions.find((ev) => ev.bookingUrl) || null;
  const [bookingEvent, setBookingEvent] = React.useState(firstBookable);
  const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

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
        <section className="section register-section">
          <div className="wrap register-grid reveal">
            <div className="register-card">
              <div className="eyebrow-m">{copy.form.eyebrow}</div>
              <h2>{copy.form.headline}</h2>
              <form action={site.formEndpoint} method="POST">
                <input type="hidden" name="_subject" value={copy.form.subject} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={`${site.liveUrl}${copy.form.successPath}`} />
                <input type="text" name="name" required placeholder="Name" aria-label="Name" />
                <input type="email" name="email" required placeholder="Email" aria-label="Email" />
                <input type="tel" name="phone" placeholder="Phone, optional" aria-label="Phone" />
                <select name="class_interest" required aria-label="Class interest" defaultValue={selectedClass}>
                  <option value="" disabled>Choose a class or event</option>
                  {classNames.map((c) => <option key={c} value={c}>{c}</option>)}
                  {copy.form.classOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
                <input type="text" name="preferred_date" placeholder="Preferred date or session" aria-label="Preferred date or session" />
                <select
                  name="payment_preference"
                  required
                  aria-label="Payment preference"
                  value={paymentMode}
                  onChange={(event) => setPaymentMode(event.target.value)}
                >
                  <option value="" disabled>Payment preference</option>
                  {copy.form.paymentOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
                <p className="field-help">
                  {paymentMode === "Ask about sliding scale" ? copy.form.slidingScaleHint : copy.form.payNowHint}
                </p>
                <textarea name="notes" placeholder={copy.form.notesPlaceholder} aria-label="Notes"></textarea>
                <button
                  className="btn btn-fill"
                  type={paymentMode === "Pay now" ? "button" : "submit"}
                  onClick={() => {
                    if (paymentMode === "Pay now") document.getElementById("sessions")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {paymentMode === "Pay now" ? copy.form.payNowButton : paymentMode === "Ask about sliding scale" ? copy.form.slidingScaleButton : copy.form.button}
                </button>
              </form>
            </div>

            <aside className="register-side">
              {copy.steps.map((step, index) => (
                <div className={`register-note${index ? " soft" : ""}`} key={step.label}>
                  <span>{step.label}</span>
                  <strong>{step.headline}</strong>
                  <p>{step.body}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="class-detail-band" id="sessions">
          <div className="wrap reveal">
            <div className="sec-head pay-head"><h2>{copy.sessionsHeadline} <em>{copy.sessionsAccent}</em></h2></div>
            <div className="payment-grid">
              {sessions.map((ev) => {
                return (
                <div className="payment-card session-card" key={ev.date + ev.title}>
                  <span>{fmtDate(ev.date)} · {ev.time}</span>
                  <strong>{ev.title}</strong>
                  <em>{ev.sub || ev.blurb || copy.emptyLinkText}</em>
                  <small>{ev.price} · {ev.where}</small>
                  {ev.bookingUrl ? (
                    <button className="btn btn-fill" type="button" onClick={() => {
                      setBookingEvent(ev);
                      requestAnimationFrame(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" }));
                    }}>{copy.liveButton}</button>
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
