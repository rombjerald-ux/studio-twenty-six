/* Studio Twenty Six — hidden site copy draft page */
function ReviewBlock({ title, href, children }) {
  return (
    <section className="review-block reveal">
      <div className="review-block-head">
        <h2>{title}</h2>
        {href && <a className="btn btn-outline" href={href}>Open page</a>}
      </div>
      <div className="review-copy">{children}</div>
    </section>
  );
}

function ReviewField({ label, children }) {
  if (!children) return null;
  return (
    <div className="review-field">
      <span>{label}</span>
      <p>{children}</p>
    </div>
  );
}

function ReviewList({ label, items }) {
  if (!items || !items.length) return null;
  return (
    <div className="review-field">
      <span>{label}</span>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

function ReviewPage(){
  React.useEffect(() => {
    const root = document.querySelector(".site");
    root.classList.add("js");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const { SITE, HOME, ABOUT, SIGNUP, CLASSES_PAGE, CLASS_DETAILS, CLASS_URLS, EVENTS } = window.S26;
  const livePages = [
    { label: "Home", href: "index.html" },
    { label: "Classes", href: "classes.html" },
    { label: "About", href: "about.html" },
    { label: "Sign up", href: "book.html" },
  ];
  const nextEvents = EVENTS.slice(0, 12);

  return (
    <React.Fragment>
      <window.Nav />
      <header className="review-hero" id="top">
        <div className="review-bg"><img src="../assets/hero-pink-teal-4.jpg" alt="" /></div>
        <div className="grain-ov"></div>
        <div className="wrap review-hero-inner">
          <div className="eyebrow"><span>Studio Twenty Six</span><span className="est">Site copy draft</span></div>
          <h1>Proposed copy for the new site.</h1>
          <p>This page gathers the current homepage, about page, class descriptions, signup language, prices, and upcoming calendar copy in one place for easy editing.</p>
          <div className="review-live-links">
            {livePages.map((page) => <a className="btn btn-fill" href={page.href} key={page.label}>{page.label}</a>)}
          </div>
        </div>
      </header>

      <main className="review-main">
        <div className="wrap">
          <section className="review-checklist reveal">
            <div>
              <span>Review scope</span>
              <strong>Voice, facts, class details, dates, and pricing.</strong>
            </div>
            <p>Each section below reflects copy that appears on the working site. The page buttons open the designed pages using this same copy.</p>
          </section>

          <ReviewBlock title="Homepage" href="index.html">
            <ReviewField label="Hero eyebrow">{HOME.hero.eyebrow} · {HOME.hero.meta}</ReviewField>
            <ReviewField label="Hero headline">{HOME.hero.lineOne} {HOME.hero.lineTwo}</ReviewField>
            <ReviewField label="Hero body">{HOME.hero.lede} {HOME.hero.ledeEm}</ReviewField>
            <ReviewField label="Badge">{HOME.hero.badge}</ReviewField>
            <ReviewField label="Mission">{HOME.mission.headline} {HOME.mission.accent}</ReviewField>
            <ReviewField label="Mission body">{HOME.mission.body}</ReviewField>
            <ReviewField label="Tess teaser">{HOME.tessTeaser.headline}</ReviewField>
            <ReviewField label="Tess teaser body">{HOME.tessTeaser.body}</ReviewField>
            <ReviewField label="Making section">{HOME.make.body}</ReviewField>
          </ReviewBlock>

          <ReviewBlock title="About Page" href="about.html">
            <ReviewField label="Hero">{ABOUT.hero.lineOne} {ABOUT.hero.accent}</ReviewField>
            <ReviewField label="Hero body">{ABOUT.hero.body}</ReviewField>
            <ReviewField label="Mission headline">{ABOUT.mission.headline}</ReviewField>
            <ReviewField label="Mission body">{ABOUT.mission.body}</ReviewField>
            <ReviewField label="Vision headline">{ABOUT.vision.headline}</ReviewField>
            <ReviewField label="Vision body">{ABOUT.vision.body}</ReviewField>
            <ReviewField label="Founder name">{ABOUT.founder.name}</ReviewField>
            <ReviewList label="Founder bio" items={ABOUT.founder.paragraphs} />
            <ReviewList label="Credits" items={ABOUT.credits} />
            <ReviewField label="Story headline">{ABOUT.story.headline}</ReviewField>
            <ReviewList label="Story body" items={ABOUT.story.paragraphs} />
            <ReviewField label="Quote">{ABOUT.quote}</ReviewField>
          </ReviewBlock>

          <ReviewBlock title="Classes Page" href="classes.html">
            <ReviewField label="Hero">{CLASSES_PAGE.hero.headline}</ReviewField>
            <ReviewField label="Hero body">{CLASSES_PAGE.hero.body}</ReviewField>
          </ReviewBlock>

          {Object.keys(CLASS_DETAILS).map((slug) => {
            const c = CLASS_DETAILS[slug];
            return (
              <ReviewBlock title={`Class Detail: ${c.title}`} href={CLASS_URLS[slug]} key={slug}>
                <ReviewField label="Kicker">{c.kicker}</ReviewField>
                <ReviewField label="Tagline">{c.tagline}</ReviewField>
                <ReviewField label="Price">{c.price}</ReviewField>
                <ReviewField label="Duration">{c.duration}</ReviewField>
                <ReviewField label="Capacity">{c.capacity}</ReviewField>
                <ReviewField label="Intro">{c.intro}</ReviewField>
                <ReviewList label="Included" items={c.includes} />
                <ReviewList label="Good for" items={c.goodFor} />
                <ReviewField label="Notes">{c.notes}</ReviewField>
              </ReviewBlock>
            );
          })}

          <ReviewBlock title="Signup Page" href="book.html">
            <ReviewField label="Hero">{SIGNUP.hero.headline}</ReviewField>
            <ReviewField label="Hero body">{SIGNUP.hero.body}</ReviewField>
            <ReviewField label="Form headline">{SIGNUP.form.headline}</ReviewField>
            <ReviewList label="Payment options" items={SIGNUP.form.paymentOptions} />
            <ReviewField label="Notes placeholder">{SIGNUP.form.notesPlaceholder}</ReviewField>
            <ReviewList label="Step cards" items={SIGNUP.steps.map((step) => `${step.label}: ${step.headline} ${step.body}`)} />
          </ReviewBlock>

          <ReviewBlock title="Upcoming Calendar / Booking Links" href="index.html#calendar">
            {nextEvents.map((ev) => (
              <div className="review-event" key={`${ev.date}-${ev.title}`}>
                <span>{ev.date} · {ev.time}</span>
                <strong>{ev.title}</strong>
                <p>{ev.sub || ev.blurb}</p>
                <em>{ev.price}</em>
                {ev.price ? <a href={`book.html?event=${encodeURIComponent(`${ev.date}|${ev.title}`)}#book`}>Studio checkout ready</a> : <small>Needs checkout</small>}
              </div>
            ))}
          </ReviewBlock>

          <section className="review-checklist reveal">
            <div>
              <span>Editing notes</span>
              <strong>Send changes by section name.</strong>
            </div>
            <p>For example: Homepage / Hero body, About Page / Founder bio, Peace Love Draw / Notes, or Upcoming Calendar / Pricing.</p>
          </section>
        </div>
      </main>
      <window.Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ReviewPage />);
