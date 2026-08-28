/* Studio Twenty Six — happenings page */
function HappeningsPage(){
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

  const copy = window.S26.HAPPENINGS;
  const happenings = window.S26.EVENTS.filter((ev) => ev.type === "Special" && window.S26.isFutureSession(ev));
  const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const bookingHref = (ev) => `book.html?event=${encodeURIComponent(`${ev.date}|${ev.title}`)}#book`;

  return (
    <React.Fragment>
      <window.Nav />
      <header className="bio-hero happenings-hero">
        <div className="bio-hero-bg"><img src={copy.hero.image} alt="" /></div>
        <div className="grain-ov"></div>
        <div className="wrap bio-hero-inner">
          <div className="eyebrow"><span>{copy.hero.eyebrow}</span><span className="est">{copy.hero.meta}</span></div>
          <h1><span>{copy.hero.headline}</span><br /><em>{copy.hero.accent}</em></h1>
          <p>{copy.hero.body}</p>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="section">
          <div className="wrap reveal">
            <div className="sec-head">
              <h2>Upcoming <em>happenings.</em></h2>
              <p className="section-note">{copy.intro}</p>
            </div>
            <div className="private-event-callout">
              <div>
                <span className="eyebrow-m">{copy.privateEvents.eyebrow}</span>
                <h3>{copy.privateEvents.headline}</h3>
                <p>{copy.privateEvents.body}</p>
              </div>
              <a className="btn btn-fill" href={copy.privateEvents.href || "private-events.html"}>{copy.privateEvents.button}</a>
            </div>
            <div className="happening-grid">
              {happenings.map((ev) => (
                <a className="happening-card" href={bookingHref(ev)} key={ev.date + ev.title}>
                  <span>{fmtDate(ev.date)} · {ev.time}</span>
                  <strong>{ev.title}</strong>
                  <em>{ev.sub}</em>
                  <p>{ev.blurb}</p>
                  <b>Details + sign up</b>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <window.Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<HappeningsPage />);
