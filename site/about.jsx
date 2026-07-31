/* Studio Twenty Six — About page */
function AboutPage(){
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

  const about = window.S26.ABOUT;

  return (
    <React.Fragment>
      <window.Nav />
      <header className="bio-hero" id="top">
        <div className="bio-bg"><img src={about.hero.image} alt="" /></div>
        <div className="grain-ov"></div>
        <div className="bio-hero-inner">
          <div className="eyebrow"><span>{about.hero.eyebrow}</span><span className="est">{about.hero.meta}</span></div>
          <h1><span>{about.hero.lineOne}</span><br /><em>{about.hero.accent}</em></h1>
          <p>{about.hero.body}</p>
        </div>
      </header>

      <window.Marquee variant="mag" items={about.marquee} />

      <main>
        <section className="section bio-section about-intro">
          <div className="wrap about-statement reveal">
            <div>
              <div className="eyebrow-m">Mission</div>
              <h2>{about.mission.headline}</h2>
            </div>
            <p>{about.mission.body}</p>
          </div>
        </section>

        <section className="bio-band about-vision">
          <div className="wrap about-vision-grid reveal">
            <div>
              <span>Vision</span>
              <strong>{about.vision.headline}</strong>
            </div>
            <p>{about.vision.body}</p>
          </div>
        </section>

        <section className="section bio-section">
          <div className="wrap bio-grid reveal">
            <div>
              <div className="eyebrow-m">{about.founder.eyebrow}</div>
              <h2>{about.founder.name}</h2>
              <div className="tess-portrait-slot has-photo">
                <img src={about.founder.portrait} alt={about.founder.portraitAlt} />
              </div>
            </div>
            <div className="bio-copy">
              {about.founder.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </section>

        <section className="bio-band">
          <div className="wrap bio-cards reveal">
            {about.credits.map((credit) => <span key={credit}>{credit}</span>)}
          </div>
        </section>

        <section className="section bio-section">
          <div className="wrap bio-story reveal">
            <div className="bio-image"><img src={about.story.image} alt="" /></div>
            <div className="bio-copy">
              <div className="eyebrow-m">{about.story.eyebrow}</div>
              <h2>{about.story.headline}</h2>
              {about.story.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </section>

        <section className="section bio-section bio-pink">
          <div className="wrap bio-grid reveal">
            <div>
              <div className="eyebrow-m">{about.returnStory.eyebrow}</div>
              <h2>{about.returnStory.headline}</h2>
            </div>
            <div className="bio-copy">
              {about.returnStory.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </section>

        <section className="section bio-quote reveal">
          <div className="wrap">
            <p>{about.quote}</p>
            <a className="btn btn-fill" href="book.html">Come make something</a>
          </div>
        </section>
      </main>

      <window.Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AboutPage />);
