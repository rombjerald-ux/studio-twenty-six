/* Studio Twenty Six — general mailing list */
function ListPage(){
  const copy = window.S26.MAILING_LIST;
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    document.querySelector(".site")?.classList.add("js");
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus("Saving your spot on the list...");
    try {
      const response = await fetch("/api/mailing-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not join the list right now.");
      setDone(true);
      setStatus("");
    } catch (error) {
      setStatus(error.message || "Could not join the list right now.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <React.Fragment>
      <window.Nav />
      <header className="classes-hero">
        <div className="classes-hero-bg"><img src={copy.hero.image} alt="" /></div>
        <div className="grain-ov"></div>
        <div className="wrap classes-hero-inner">
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
              <a className="btn btn-fill" href="book.html">Sign up now</a>
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
                  <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required />
                </label>
              </div>
              {status && <p className="checkout-status">{status}</p>}
              <button className="btn btn-fill" type="submit" disabled={saving}>{saving ? "Saving..." : copy.button}</button>
              <p className="detail-note">{copy.note}</p>
            </form>
          )}
        </div>
      </main>
      <window.Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ListPage />);
