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
  const exactSessions = window.S26.EVENTS.filter((ev) => ev.title === c.title);
  const related = (exactSessions.length ? exactSessions : window.S26.EVENTS.filter((ev) => ev.type === c.type)).slice(0, 5);
  const firstBookable = related.find((ev) => ev.bookingUrl) || null;
  const [bookingEvent, setBookingEvent] = React.useState(firstBookable);
  return (
    <React.Fragment>
      <window.Nav />
      <header className="class-detail-hero">
        <div className="class-detail-bg"><img src={c.image} alt="" /></div>
        <div className="grain-ov"></div>
        <div className="wrap class-detail-inner">
          <a className="backlink" href="classes.html">← All classes</a>
          <div className="eyebrow"><span>{c.kicker}</span><span className="est">{c.rhythm}</span></div>
          <h1>{c.title}</h1>
          <p>{c.tagline}</p>
          <div className="class-detail-actions">
            <a className="btn btn-fill" href="#sessions">Sign up now →</a>
            <a className="btn btn-outline" href="index.html#calendar">See calendar</a>
          </div>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="wrap class-detail-grid reveal">
            <div className="class-detail-copy">
              <div className="eyebrow-m">What it is</div>
              <h2>{c.intro}</h2>
              <p>{c.notes}</p>
            </div>
            <aside className="class-detail-side">
              <figure className="class-art-panel">
                <span className="class-art-img"><img src={c.image} alt={`${c.title} class artwork`} /></span>
                <figcaption>
                  <span>Class image</span>
                  <strong>{c.title}</strong>
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
              <p className="detail-note">If cost is a barrier, reach out. A few community-supported spots are held for each season.</p>
            </div>
          </div>
        </section>

        <section className="section" id="sessions">
          <div className="wrap reveal">
            <div className="sec-head">
              <h2>Upcoming <em>sessions.</em></h2>
              <p className="section-note">Choose a date to book your spot. If price is a barrier, message the team and we'll help find a rate that works.</p>
            </div>
            <div className="detail-events">
              {related.map((ev) => (
                <div className="detail-event" key={ev.date + ev.title}>
                  <span>{ev.date}</span>
                  <strong>{ev.title}</strong>
                  <em>{ev.sub} · {ev.time} · {ev.price}</em>
                  <div className="detail-event-actions">
                    {ev.bookingUrl ? (
                      <button className="btn btn-fill" type="button" onClick={() => {
                        setBookingEvent(ev);
                        requestAnimationFrame(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" }));
                      }}>Book this class</button>
                    ) : (
                      <button className="btn btn-outline" type="button" disabled>Payment link coming</button>
                    )}
                    <a className="btn btn-outline" href={window.slidingScaleMailto(ev)}>Ask about sliding scale</a>
                  </div>
                </div>
              ))}
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

ReactDOM.createRoot(document.getElementById("root")).render(<ClassDetailPage />);
