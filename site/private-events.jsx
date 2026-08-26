/* Studio Twenty Six — private events */
function PrivateEventsPage(){
  const copy = window.S26.PRIVATE_EVENTS;
  const email = window.S26.SITE.email;
  const mailto = `mailto:${email}?subject=${encodeURIComponent("Private event inquiry for Studio Twenty Six")}`;
  const [name, setName] = React.useState("");
  const [guestEmail, setGuestEmail] = React.useState("");
  const [occasion, setOccasion] = React.useState(copy.occasions[0]);
  const [date, setDate] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    document.querySelector(".site")?.classList.add("js");
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus("Sending your note...");
    try {
      const response = await fetch("/api/private-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: guestEmail, occasion, date, message }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not send that note right now.");
      setDone(true);
      setStatus("");
    } catch (error) {
      setStatus(error.message || "Could not send that note right now.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <React.Fragment>
      <window.Nav />
      <header className="bio-hero happenings-hero">
        <div className="bio-hero-bg"><img src={copy.hero.image} alt="" /></div>
        <div className="grain-ov"></div>
        <div className="wrap bio-hero-inner">
          <div className="eyebrow"><span>{copy.hero.eyebrow}</span><span className="est">{copy.hero.meta}</span></div>
          <h1>{copy.hero.headline}</h1>
          <p>{copy.hero.body}</p>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="section">
        <div className="wrap contact-panel">
          {done ? (
            <div className="checkout-form checkout-ready">
              <p>{copy.success}</p>
              <a className="btn btn-outline" href={mailto}>{copy.mailtoLabel}</a>
            </div>
          ) : (
            <form className="checkout-form" onSubmit={submit}>
              <div className="checkout-row checkout-contact-row">
                <label>
                  <span>Name</span>
                  <input name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required />
                </label>
              </div>
              <div className="checkout-row">
                <label>
                  <span>What kind of event</span>
                  <select name="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                    {copy.occasions.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </label>
                <label>
                  <span>Preferred date</span>
                  <input name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
              </div>
              <label>
                <span>Tell us about it</span>
                <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Headcount, timing, and what you want to make." required />
              </label>
              {status && <p className="checkout-status">{status}</p>}
              <button className="btn btn-fill" type="submit" disabled={saving}>{saving ? "Sending..." : copy.button}</button>
              <a className="btn btn-outline" href={mailto}>{copy.mailtoLabel}</a>
            </form>
          )}
        </div>
      </main>
      <window.Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PrivateEventsPage />);
