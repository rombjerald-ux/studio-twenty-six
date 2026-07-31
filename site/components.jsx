/* Studio Twenty Six — marketing sections (window globals) */
const { useState, useEffect } = React;
const ASSET = "../assets/";

function Btn({ variant = "fill", href = "#", children, onClick }) {
  return <a className={`btn btn-${variant}`} href={href} onClick={onClick}>{children}</a>;
}

function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const site = window.S26.SITE;
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", f, { passive: true }); f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    const close = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const navLinks = site.nav.concat([{ label: "Sign up", href: "book.html", cta: true }]);
  return (
    <nav className={`nav${solid ? " solid" : ""}${open ? " open" : ""}`}>
      <a className="brand" href="index.html#top" aria-label={`${site.shortBrand} — home`}></a>
      <div className="links">
        {site.nav.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        <a className="nav-cta" href="book.html">Sign up</a>
      </div>
      <button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span></span><span></span><span></span>
      </button>
      <div className="mobile-menu">
        {navLinks.map((link) => (
          <a key={link.label} className={link.cta ? "mobile-cta" : ""} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
        ))}
      </div>
    </nav>
  );
}

function Marquee({ items, variant = "mag" }) {
  const render = (key) => items.map((it, i) => (
    <span key={key + i}>{typeof it === "string" ? it : <React.Fragment><b>{it.b}</b> {it.t}</React.Fragment>}{"   ·   "}</span>
  ));
  return (
    <div className={`marquee ${variant}`} aria-hidden="true">
      <div className="track">{render("a")}{render("b")}</div>
    </div>
  );
}

function Hero() {
  const home = window.S26.HOME;
  const hero = home.hero;
  const bgImages = home.heroImages;
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setSlide((n) => (n + 1) % bgImages.length), 5200);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <header className="hero" id="top">
      <div className="bg hero-carousel">
        {bgImages.map((bg, i) => (
          <img key={bg} className={i === slide ? "active" : ""} src={ASSET + bg} alt="" />
        ))}
      </div>
      <div className="grain-ov"></div>
      <div className="inner">
        <div className="eyebrow"><span>{hero.eyebrow}</span><span className="est">{hero.meta}</span></div>
        <h1><span className="o">{hero.lineOne}</span><br /><span className="w">{hero.lineTwo}</span></h1>
        <p className="lede">{hero.lede} <span className="lede-em">{hero.ledeEm}</span></p>
        <div className="ctas">
          <Btn variant="fill" href={hero.primaryCta.href}>{hero.primaryCta.label}</Btn>
          <Btn variant="outline" href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Btn>
        </div>
        <div><span className="badge">{hero.badge}</span></div>
        <div className="hero-dots" aria-hidden="true">
          {bgImages.map((bg, i) => <span key={bg} className={i === slide ? "active" : ""}></span>)}
        </div>
      </div>
    </header>
  );
}

function Mission() {
  const mission = window.S26.HOME.mission;
  return (
    <section className="section" id="about">
      <div className="wrap mission reveal">
        <h2 className="stmt">{mission.headline} <em>{mission.accent}</em></h2>
        <p>{mission.body}</p>
      </div>
    </section>
  );
}

function TessTeaser() {
  const tess = window.S26.HOME.tessTeaser;
  return (
    <section className="section tess-teaser" id="tess">
      <div className="wrap tess-grid reveal">
        <div className="tess-photo"><img src={tess.image} alt="" /></div>
        <div className="tess-copy">
          <div className="eyebrow-m">{tess.eyebrow}</div>
          <h2>{tess.headline}</h2>
          <p>{tess.body}</p>
          <a className="btn btn-fill" href={tess.cta.href}>{tess.cta.label}</a>
        </div>
      </div>
    </section>
  );
}

function Make() {
  const M = window.S26.MEDIUMS;
  const copy = window.S26.HOME.make;
  return (
    <section className="section" id="make">
      <div className="wrap">
        <div className="make reveal">
          <div className="copy">
            <div className="eyebrow-m">{copy.eyebrow}</div>
            <div className="sec-head"><h2>{copy.headline} <em>{copy.accent}</em></h2></div>
            <p>{copy.body}</p>
          </div>
          <div className="mediums">
            {M.map((m) => <span className="medium" key={m}>{m}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Signup() {
  const [sent, setSent] = useState(false);
  const teaser = window.S26.HOME.signupTeaser;
  const site = window.S26.SITE;
  const classes = Object.values(window.S26.CLASS_DETAILS).map((c) => c.title).concat(window.S26.SIGNUP.form.classOptions);
  return (
    <section id="signup" style={{ paddingBottom: "var(--s-2)" }}>
      <div className="signup reveal">
        <div className="gr"></div>
        <div className="eyebrow-m">{teaser.eyebrow}</div>
        <h2>{teaser.headline}</h2>
        {sent ? (
          <div className="ok">{teaser.success}</div>
        ) : (
          <form action={site.formEndpoint} method="POST">
            <input type="hidden" name="_subject" value="Studio Twenty Six signup" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="name" required placeholder="Name" aria-label="Name" />
            <input type="email" name="email" required placeholder="Email" aria-label="Email" />
            <select name="class_interest" required aria-label="Class interest" defaultValue="">
              <option value="" disabled>Choose a class</option>
              {classes.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select name="payment_preference" required aria-label="Payment preference" defaultValue="">
              <option value="" disabled>Payment preference</option>
              {window.S26.SIGNUP.form.paymentOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
            <textarea name="notes" placeholder={window.S26.SIGNUP.form.notesPlaceholder} aria-label="Notes"></textarea>
            <button className="btn btn-fill" type="submit">{window.S26.SIGNUP.form.button}</button>
          </form>
        )}
        <p className="note">{teaser.note}</p>
      </div>
    </section>
  );
}

function Footer() {
  const site = window.S26.SITE;
  const col = (h, links) => (
    <div className="col"><h4>{h}</h4>{links.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}</div>
  );
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="top">
          <div>
            <div className="brand"></div>
            <p className="blurb">A community art studio in {site.location} for classes, costumes, rituals, events, and more.</p>
          </div>
          {site.footerColumns.map((group) => col(group.heading, group.links))}
        </div>
        <div className="colophon">
          <span>© 2026 {site.brand} · Temescal, Oakland CA</span>
          <span className="tag">Find your <b>✺</b> creative eye</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Btn, Nav, Marquee, Hero, Mission, TessTeaser, Make, Signup, Footer });
