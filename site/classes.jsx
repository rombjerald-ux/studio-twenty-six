/* Studio Twenty Six — offerings index */
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

function ClassesPage(){
  useReveal();
  const details = window.S26.CLASS_DETAILS;
  const urls = window.S26.CLASS_URLS;
  const hero = window.S26.CLASSES_PAGE.hero;
  const faq = window.S26.CLASSES_PAGE.faq;
  const today = new Date().toISOString().slice(0, 10);
  return (
    <React.Fragment>
      <window.Nav />
      <header className="classes-hero">
        <div className="classes-hero-bg"><img src={hero.image} alt="" /></div>
        <div className="grain-ov"></div>
        <div className="wrap classes-hero-inner">
          <div className="eyebrow"><span>{hero.eyebrow}</span><span className="est">{hero.meta}</span></div>
          <h1>{hero.headline}</h1>
          <p>{hero.body}</p>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="section">
        <div className="wrap class-card-grid reveal">
          {Object.keys(details).map((slug) => {
            const c = details[slug];
            const next = window.S26.nextBookable(window.S26.EVENTS.filter((ev) => ev.title === c.title), today);
            return (
              <article className="class-card" key={slug}>
                <a className="class-card-img" href={urls[slug]}><img src={c.image} alt="" /></a>
                <span className="class-card-body">
                  <em>{c.kicker}</em>
                  <strong>{c.displayTitle || c.title}</strong>
                  <span>{c.tagline}</span>
                  <small>{c.price} · {c.duration}</small>
                  <span className="class-card-actions">
                    <a className="btn btn-fill" href={next ? window.S26.bookingHref(next) : "book.html"}>Sign up now</a>
                    <a className="btn btn-outline" href={urls[slug]}>Details</a>
                  </span>
                </span>
              </article>
            );
          })}
        </div>
        <div className="wrap policy-faq reveal" id="faq">
          <div className="sec-head">
            <div className="eyebrow-m">{faq.eyebrow}</div>
            <h2>{faq.headline}</h2>
          </div>
          <dl>
            {faq.items.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </main>
      <window.Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ClassesPage />);
