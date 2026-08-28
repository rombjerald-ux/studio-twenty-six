/* Studio Twenty Six — reusable class detail page */
function useReveal(){
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
}

function ClassDetailPage(){
  useReveal();
  const slug = window.CLASS_SLUG || "peace-love-draw";
  const c = window.S26.CLASS_DETAILS[slug];
  const exactSessions = window.S26.EVENTS.filter((ev) => ev.title === c.title && window.S26.isFutureSession(ev));
  const related = (exactSessions.length ? exactSessions : window.S26.EVENTS.filter((ev) => ev.type === c.type && window.S26.isFutureSession(ev))).slice(0, 5);
  const isBookable = (ev) => Boolean(ev.price) && window.S26.isFutureSession(ev);
  const today = window.S26.todayISO();
  const next = window.S26.nextBookable(related, today);
  const displayTitle = c.displayTitle || c.title;
  const policy = window.S26.POLICY;
  return (
    <React.Fragment>
      <window.Nav />
      <header className="class-detail-hero">
        <div className="class-detail-bg"><img src={c.image} alt="" /></div>
        <div className="grain-ov"></div>
        <div className="wrap class-detail-inner">
          <a className="backlink" href="classes.html">← All offerings</a>
          <div className="eyebrow"><span>{c.kicker}</span><span className="est">{c.rhythm}</span></div>
          <h1>{displayTitle}</h1>
          <p>{c.tagline}</p>
          <div className="class-detail-actions">
            <a className="btn btn-fill" href={next ? window.S26.bookingHref(next) : "book.html"}>Sign up now</a>
            <a className="btn btn-outline" href="index.html#calendar">See calendar</a>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="section">
          <div className="wrap class-detail-grid reveal">
            <div className="class-detail-copy">
              <div className="eyebrow-m">What it is</div>
              <h2>{c.intro}</h2>
              <p>{c.notes}</p>
            </div>
            <aside className="class-detail-side">
              <figure className="class-art-panel">
                <span className="class-art-img"><img src={c.image} alt={`${displayTitle} class artwork`} /></span>
                <figcaption>
                  <span>{c.kicker}</span>
                  <strong>{displayTitle}</strong>
                  {c.poster && <a href={c.poster} target="_blank" rel="noreferrer">View poster →</a>}
                </figcaption>
              </figure>
              <div className="class-facts">
                <div><span>Price</span><strong>{c.price}</strong></div>
                <div><span>Duration</span><strong>{c.duration}</strong><em>{c.rhythm}</em></div>
                <div><span>Capacity</span><strong>{c.capacity}</strong><em>Small enough for real support</em></div>
                <div><span>Where</span><strong>{c.space}</strong><em>Studio Twenty Six, Oakland</em></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="class-detail-band">
          <div className="wrap detail-lists reveal">
            <div>
              <h3>Included</h3>
              <ul>{c.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              <p className="detail-note">All core materials are included in the class fee unless a specific session says to bring something from home.</p>
            </div>
            <div>
              <h3>Good for</h3>
              <ul>{c.goodFor.map((item) => <li key={item}>{item}</li>)}</ul>
              <p className="detail-note">If cost is a barrier, message for sliding scale pricing.</p>
            </div>
          </div>
        </section>

        <section className="section" id="sessions">
          <div className="wrap reveal">
            <div className="sec-head">
              <h2>Upcoming <em>sessions.</em></h2>
              <p className="section-note">Sign up now jumps straight to checkout for that date. Message for sliding scale pricing if the listed price is a barrier.</p>
            </div>
            <div className="detail-events">
              {related.map((ev) => (
                <div className="detail-event" key={ev.date + ev.title}>
                  <span>{ev.date}</span>
                  <strong>{ev.title}</strong>
                  <em>{ev.sub} · {ev.time} · {ev.price}</em>
                  <div className="detail-event-actions">
                    {isBookable(ev) ? (
                      <a className="btn btn-fill" href={window.S26.bookingHref(ev)}>Sign up now</a>
                    ) : (
                      <button className="btn btn-outline" type="button" disabled>Payment link coming</button>
                    )}
                    <a className="btn btn-outline" href={window.slidingScaleMailto(ev)}>Message for sliding scale pricing</a>
                  </div>
                </div>
              ))}
            </div>
            <p className="detail-note">{policy.parking} {policy.cancel}</p>
          </div>
        </section>
      </main>

      <window.Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ClassDetailPage />);
