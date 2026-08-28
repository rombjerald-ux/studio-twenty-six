/* Studio Twenty Six — app assembly + scroll reveal */
function App(){
  const home = window.S26.HOME;
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
  return (
      <React.Fragment>
      <window.Nav />
      <main id="main" tabIndex={-1}>
      <window.Hero />
      <window.Marquee variant="mag" items={home.topMarquee} />
      <window.Mission />
      <window.TessTeaser />
      <window.Make />
      <window.Marquee variant="dark" items={home.classMarquee} />
      <window.Calendar />
      <section className="section" id="faq">
        <div className="wrap policy-faq reveal">
          <div className="sec-head">
            <div className="eyebrow-m">{window.S26.CLASSES_PAGE.faq.eyebrow}</div>
            <h2>{window.S26.CLASSES_PAGE.faq.headline}</h2>
          </div>
          <dl>
            {window.S26.CLASSES_PAGE.faq.items.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <window.Signup />
      </main>
      <window.Footer />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
