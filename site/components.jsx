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
  const headerCta = site.headerCta || { label: "Sign up now", href: "list.html" };
  const navLinks = site.nav.concat([{ ...headerCta, cta: true }]);
  return (
    <nav className={`nav${solid ? " solid" : ""}${open ? " open" : ""}`}>
      <a className="brand" href="index.html#top"><span className="sr-only">{site.brand} home</span></a>
      <div className="links">
        {site.nav.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        <a className="nav-cta" href={headerCta.href}>{headerCta.label}</a>
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
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { if (mq.matches) setPaused(true); };
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => setSlide((n) => (n + 1) % bgImages.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused, bgImages.length]);
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
        <div className="hero-controls">
          <div className="hero-dots">
            {bgImages.map((bg, i) => (
              <button
                key={bg}
                type="button"
                className={i === slide ? "active" : ""}
                aria-label={`Show image ${i + 1} of ${bgImages.length}`}
                aria-current={i === slide ? "true" : undefined}
                onClick={() => { setSlide(i); setPaused(true); }}
              />
            ))}
          </div>
          <button
            type="button"
            className="hero-pause"
            aria-pressed={paused}
            aria-label={paused ? "Play hero images" : "Pause hero images"}
            onClick={() => setPaused((v) => !v)}
          >{paused ? "Play" : "Pause"}</button>
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
        <div className="tess-photo"><img src={tess.image} alt={tess.imageAlt || "Tescia Seufferlein, founder of Studio Twenty Six"} /></div>
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

function loadInstagramEmbed() {
  const run = () => {
    const go = () => { if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process(); };
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(go);
    else go();
  };
  if (window.instgrm && window.instgrm.Embeds) {
    run();
    return undefined;
  }
  const existing = document.querySelector("script[data-s26-instagram-embed]");
  if (existing) {
    existing.addEventListener("load", run);
    return undefined;
  }
  const script = document.createElement("script");
  script.src = "https://www.instagram.com/embed.js";
  script.async = true;
  script.dataset.s26InstagramEmbed = "true";
  script.addEventListener("load", run);
  document.body.appendChild(script);
  return undefined;
}

function Instagram() {
  const copy = window.S26.HOME.instagram;
  const [posts, setPosts] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram-feed")
      .then((response) => response.ok ? response.json() : {})
      .then((data) => {
        if (cancelled) return;
        const items = (data.posts || []).filter((post) => post && post.permalink && (post.mediaUrl || post.thumbnailUrl));
        setPosts(items);
      })
      .catch(() => { if (!cancelled) setPosts([]); });
    return () => { cancelled = true; };
  }, []);

  React.useEffect(() => {
    if (posts && posts.length) return undefined;
    return loadInstagramEmbed();
  }, [posts]);

  return (
    <section className="instagram-section" id="instagram">
      <div className="wrap">
        <div className="instagram-head reveal">
          <div>
            <div className="eyebrow-m">{copy.eyebrow}</div>
            <div className="sec-head"><h2>{copy.headline}</h2></div>
            <p className="instagram-lede">{copy.body}</p>
          </div>
          <a className="btn btn-fill" href={copy.href} target="_blank" rel="noopener noreferrer">{copy.cta}</a>
        </div>
        {posts && posts.length ? (
          <div className="ig-grid reveal">
            {posts.map((post) => (
              <a key={post.id || post.permalink} href={post.permalink} target="_blank" rel="noopener noreferrer">
                <img src={post.thumbnailUrl || post.mediaUrl} alt="" />
              </a>
            ))}
          </div>
        ) : (
          <div className="ig-embed reveal">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={copy.href}
              data-instgrm-version="14"
            >
              <a href={copy.href} target="_blank" rel="noopener noreferrer">{copy.handle}</a>
            </blockquote>
          </div>
        )}
      </div>
    </section>
  );
}

function Signup() {
  const teaser = window.S26.HOME.signupTeaser;
  return (
    <section id="signup" style={{ paddingBottom: "var(--s-2)" }}>
      <div className="signup reveal">
        <div className="gr"></div>
        <div className="eyebrow-m">{teaser.eyebrow}</div>
        <h2>{teaser.headline}</h2>
        <div className="signup-actions">
          <a className="btn btn-fill" href={teaser.primaryCta.href}>{teaser.primaryCta.label}</a>
          <a className="btn btn-outline" href={teaser.secondaryCta.href}>{teaser.secondaryCta.label}</a>
        </div>
        <p className="note">{teaser.note}</p>
      </div>
    </section>
  );
}

function Footer() {
  const site = window.S26.SITE;
  const col = (h, links) => (
    <div className="col" key={h}><h4>{h}</h4>{links.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}</div>
  );
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="top">
          <div>
            <a className="brand" href="index.html"><span className="sr-only">{site.brand}</span></a>
            <p className="blurb">A community art studio in {site.location} for classes, costumes, rituals, events, and more.</p>
          </div>
          {site.footerColumns.map((group) => col(group.heading, group.links))}
        </div>
        <div className="colophon">
          <span>© 2026 {site.brand} · {site.addressLabel}</span>
          <span className="tag">Find your <b>✺</b> creative eye</span>
        </div>
      </div>
    </footer>
  );
}

function formatEventDate(iso, options = { weekday: "long", month: "long", day: "numeric", year: "numeric" }) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, options);
}

function parsePrice(price) {
  const match = String(price || "").match(/\$([0-9]+)/);
  return match ? Number(match[1]) : 0;
}

function slidingScaleMailto(ev) {
  const subject = `Sliding scale request: ${ev.title}`;
  const body = [
    "Hi Studio Twenty Six,",
    "",
    `I am interested in a sliding scale spot for ${ev.title}.`,
    `Preferred date: ${formatEventDate(ev.date)} at ${ev.time}`,
    "",
    "Name:",
    "Email:",
    "Seats:",
    "Anything you want us to know:",
  ].join("\n");
  return `mailto:${window.S26.SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function NativeCheckoutPanel({ event }) {
  const checkout = window.S26.CHECKOUT;
  const policy = window.S26.POLICY;
  const paidSuccess = new URLSearchParams(window.location.search).get("success") === "1";
  const [confirmedFree, setConfirmedFree] = useState(false);
  const [seats, setSeats] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [waiverAccepted, setWaiverAccepted] = useState(false);
  const [status, setStatus] = useState("");
  const [savingRequest, setSavingRequest] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const pastSession = event.date && window.S26.isFutureSession && !window.S26.isFutureSession(event) && !paidSuccess;
  const unitPrice = parsePrice(event.price);
  const isPeaceLoveDraw = event.title === "Peace Love Draw";
  const studentApplied = isPeaceLoveDraw && promoCode.trim().toUpperCase() === "STUDENT";
  const discountedUnit = studentApplied && unitPrice > 10 ? unitPrice - 10 : unitPrice;
  const total = discountedUnit * seats;
  const priceText = unitPrice ? `$${total}` : "$0";
  const canUseStripe = unitPrice > 0;

  const saveSignupRequest = async (requestType) => {
    if (!name.trim() || !email.trim()) {
      setStatus("Add your name and email first, then save the request.");
      return false;
    }
    setSavingRequest(true);
    setStatus(requestType === "sliding_scale" ? "Saving your sliding scale request..." : "Saving your spot...");
    try {
      const response = await fetch("/api/signup-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType,
          title: event.title,
          date: event.date,
          time: event.time,
          price: event.price,
          name,
          email,
          seats,
          waiverAccepted: requestType === "free_signup" ? waiverAccepted : undefined,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not save that request.");
      const emailNote = data.confirmationSent ? " Confirmation email sent." : "";
      if (requestType === "free_signup") {
        setConfirmedFree(true);
        return true;
      }
      setStatus("Request saved. Tess can see it in the signup list." + emailNote);
      return true;
    } catch (error) {
      setStatus(error.message || "Could not save that request right now.");
      return false;
    } finally {
      setSavingRequest(false);
    }
  };

  const submitCheckout = async (submitEvent) => {
    submitEvent.preventDefault();
    if (submitting) return;
    if (pastSession) {
      setStatus("That session has already happened. Pick an upcoming date.");
      return;
    }
    if (!checkout.enabled) {
      setStatus(checkout.disabledNotice);
      return;
    }
    if (!waiverAccepted) {
      setStatus("Check the waiver and photo consent box to continue.");
      return;
    }
    setSubmitting(true);
    if (!canUseStripe) {
      const ok = await saveSignupRequest("free_signup");
      if (!ok) setSubmitting(false);
      return;
    }
    setStatus("Opening secure checkout...");
    try {
      const response = await fetch(checkout.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: event.title,
          date: event.date,
          time: event.time,
          price: event.price,
          name,
          email,
          seats,
          promoCode,
          waiverAccepted,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.url) throw new Error(data.error || "Checkout is not ready yet.");
      window.location.assign(data.url);
    } catch (error) {
      setSubmitting(false);
      setStatus(error.message || "Checkout is having trouble connecting. Message the studio and we will help.");
    }
  };

  if (pastSession) {
    return (
      <section className="native-checkout" id="book" aria-label={`Past session ${event.title}`}>
        <div className="checkout-copy">
          <span>This date has passed</span>
          <h3>Pick an upcoming session.</h3>
          <p>That class date is over. Choose another date to pay or reserve.</p>
        </div>
        <a className="btn btn-fill" href="book.html">See upcoming dates</a>
      </section>
    );
  }

  if (paidSuccess || confirmedFree) {
    const place = window.S26.SITE.addressLabel || event.where;
    return (
      <section className="native-checkout" id="book" aria-label={`Confirmed ${event.title}`}>
        <div className="checkout-copy">
          <span>Confirmed</span>
          <h3>{checkout.confirmHeadline}</h3>
          <p>{checkout.confirmBody}</p>
        </div>
        <div className="checkout-shell checkout-confirm">
          <aside className="checkout-summary">
            <span>Your class</span>
            <strong>{event.title}</strong>
            <dl>
              <div><dt>Date</dt><dd>{formatEventDate(event.date)}</dd></div>
              <div><dt>Time</dt><dd>{event.time}</dd></div>
              <div><dt>Place</dt><dd>{place}</dd></div>
            </dl>
          </aside>
          <div className="checkout-form checkout-ready">
            <p>{checkout.confirmEmailNote}</p>
            <a className="btn btn-fill" href="index.html">Back to the studio</a>
            <a className="btn btn-outline" href="book.html">Book another class</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="native-checkout" id="book" aria-label={`Book ${event.title}`}>
      <div className="checkout-copy">
        <span>Checkout</span>
        <h3>{checkout.headline}</h3>
        <p>{checkout.body}</p>
      </div>
      <div className="checkout-shell">
        <aside className="checkout-summary">
          <span>Your class</span>
          <strong>{event.title}</strong>
          <dl>
            <div><dt>Date</dt><dd>{formatEventDate(event.date)}</dd></div>
            <div><dt>Time</dt><dd>{event.time}</dd></div>
            <div><dt>Place</dt><dd>{window.S26.SITE.addressLabel || event.where}</dd></div>
            <div><dt>Price</dt><dd>{event.price}</dd></div>
          </dl>
          <ul className="checkout-policy">
            <li>{policy.parking}</li>
            <li>{policy.cancel}</li>
          </ul>
        </aside>
        <form className="checkout-form" onSubmit={submitCheckout}>
          <div className="checkout-row checkout-contact-row">
            <label>
              <span>Name</span>
              <input name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required />
            </label>
          </div>
          <div className="checkout-row">
            <label>
              <span>Seats</span>
              <select name="seats" value={seats} onChange={(e) => setSeats(Number(e.target.value))}>
                {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            {isPeaceLoveDraw && (
              <label>
                <span>{checkout.promoLabel || "Have a code?"}</span>
                <input name="s26-promo-code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder={checkout.promoPlaceholder || "Enter code"} autoComplete="off" autoCorrect="off" spellCheck={false} />
              </label>
            )}
          </div>
          <label className="checkout-waiver">
            <input type="checkbox" name="waiver" checked={waiverAccepted} onChange={(e) => setWaiverAccepted(e.target.checked)} required />
            <span>{checkout.waiverLabel}</span>
          </label>
          <div className="checkout-total"><span>Total today</span><strong>{priceText}</strong></div>
          {status && <p className="checkout-status">{status}</p>}
          <button className="btn btn-fill" type="submit" disabled={!waiverAccepted || submitting}>{submitting ? "Working..." : (canUseStripe ? checkout.submitLabel : checkout.freeLabel)}</button>
        </form>
      </div>
      <div className="checkout-scale">
        <div>
          <span>{checkout.slidingScaleLabel}</span>
          <p>{checkout.slidingScaleBody}</p>
        </div>
        <button className="btn btn-outline" type="button" disabled={savingRequest} onClick={() => saveSignupRequest("sliding_scale")}>{savingRequest ? "Saving..." : checkout.slidingScaleButton}</button>
      </div>
    </section>
  );
}

Object.assign(window, { Btn, Nav, Marquee, Hero, Mission, TessTeaser, Make, Instagram, Signup, Footer, NativeCheckoutPanel, formatEventDate, slidingScaleMailto });
