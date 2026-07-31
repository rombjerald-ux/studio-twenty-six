/* Studio Twenty Six — classes index */
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
      <main className="section">
        <div className="wrap class-card-grid reveal">
          {Object.keys(details).map((slug) => {
            const c = details[slug];
            return (
              <a className="class-card" href={urls[slug]} key={slug}>
                <span className="class-card-img"><img src={c.image} alt="" /></span>
                <span className="class-card-body">
                  <em>{c.kicker}</em>
                  <strong>{c.title}</strong>
                  <span>{c.tagline}</span>
                  <small>{c.price} · {c.duration}</small>
                </span>
              </a>
            );
          })}
        </div>
      </main>
      <window.Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ClassesPage />);
