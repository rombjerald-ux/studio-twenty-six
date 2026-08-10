/* Studio Twenty Six — interactive Calendar */
const { useState: useCS, useEffect: useCE } = React;

const TC = { Atelier:"var(--t-atelier)", Open:"var(--t-open)", Salon:"var(--t-salon)", Workshop:"var(--t-workshop)", Series:"var(--t-series)", Restore:"var(--t-restore)", Special:"var(--t-special)" };
const THEX = { Atelier:"#A65486", Open:"#5278A6", Salon:"#7A5E9E", Workshop:"#4F938C", Series:"#5E6BA8", Restore:"#5FA0A8", Special:"#C45C92" };
function inkFor(hex){
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  const L=(0.299*r+0.587*g+0.114*b)/255;
  return L > 0.55 ? "#0B0710" : "#F6EEF2";
}
const DRAWER_IMG = { Atelier:"photo-c6.jpg", Open:"photo-c1.jpg", Salon:"photo-beads.jpg", Workshop:"photo-c4.jpg", Series:"photo-c2.jpg", Restore:"photo-c3.jpg", Special:"photo-c5.jpg" };
const DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MO = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MOFULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const TODAY = "2026-08-09";
const RECUR = { Atelier:true, Open:true, Salon:true, Restore:true };

function fmtDate(iso){
  const [y,m,d] = iso.split("-").map(Number);
  const wd = new Date(y, m-1, d).getDay();
  return `${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][wd]}, ${MOFULL[m-1]} ${d}, ${y}`;
}

function bookingHref(ev){
  return `book.html?event=${encodeURIComponent(`${ev.date}|${ev.title}`)}#book`;
}

function EventDrawer({ ev, onClose }){
  useCE(() => {
    const k = (e) => { if(e.key === "Escape") onClose(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  const T = ev && window.S26.TYPES[ev.type];
  const cal = window.S26.CALENDAR;
  const art = ev && cal.artCards[ev.type];
  return (
    <React.Fragment>
      <div className={`drawer-scrim${ev ? " open" : ""}`} onClick={onClose}></div>
      <aside className={`drawer${ev ? " open" : ""}`} aria-hidden={!ev}>
        {ev && (
          <React.Fragment>
            <div className="dimg">
              <img src={art ? art.src : "../assets/" + DRAWER_IMG[ev.type]} alt="" />
              <button className="close" onClick={onClose} aria-label="Close">×</button>
              <span className="dtype"><i className="dot" style={{ background: ev.special ? "var(--t-special)" : TC[ev.type] }}></i>{ev.special ? "★ Special · " : ""}{T.label}</span>
            </div>
            <div className="dbody">
              <h3>{ev.title}{ev.sub && <span className="sub">{ev.sub}</span>}</h3>
              <p className="blurb">{ev.blurb || T.desc}</p>
              <div className="dmeta">
                <span className="k">When</span><span className="v">{fmtDate(ev.date)}</span>
                <span className="k">Time</span><span className="v">{ev.time}</span>
                <span className="k">Price</span><span className="v">{ev.price}</span>
                <span className="k">Where</span><span className="v">{ev.where}</span>
                <span className="k">Who</span><span className="v">{T.who}</span>
              </div>
              {RECUR[ev.type] && (
                <div className="recur"><span>↻</span><span>{cal.recurringNote.replace("{day}", T.day)}</span></div>
              )}
              <div className="gtk">
                <h4>Good to know</h4>
                <ul>
                  {cal.goodToKnow[ev.type].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <p className="dsub">{cal.drawerNote}</p>
            </div>
            <div className="dreg split">
              <a className="btn btn-outline" href={cal.eventDetailUrls[ev.title] || "classes.html"}>Details</a>
              <a className="btn btn-fill" href={bookingHref(ev)} onClick={onClose}>Sign up now →</a>
            </div>
          </React.Fragment>
        )}
      </aside>
    </React.Fragment>
  );
}

function Calendar(){
  const { MONTHS, EVENTS, RHYTHM, PRICE_GUIDE, CALENDAR: cal } = window.S26;
  const [monthKey, setMonth] = useCS(MONTHS[0].key);
  const [filters, setFilters] = useCS([]); // empty = Everything
  const [sel, setSel] = useCS(null);

  const toggle = (c) => {
    if (c.k === "Everything") { setFilters([]); return; }
    setFilters((f) => f.includes(c.k) ? f.filter((x) => x !== c.k) : [...f, c.k]);
  };
  const isOn = (c) => c.k === "Everything" ? filters.length === 0 : filters.includes(c.k);

  const matches = (ev) => {
    if (filters.length === 0) return true;
    return cal.chips.some((c) => filters.includes(c.k) && (c.special ? ev.special : ev.type === c.t));
  };

  const monthEvents = EVENTS.filter((ev) => ev.date.startsWith(monthKey) && matches(ev));
  const allMonthEvents = EVENTS.filter((ev) => ev.date.startsWith(monthKey));
  const activeMonth = MONTHS.find((mo) => mo.key === monthKey);
  const nextFor = (r) => EVENTS.find((ev) => ev.title === r.t || (r.t === "Rotating workshops" && ev.type === "Workshop"));
  const rhythmDate = (r) => {
    const ev = nextFor(r);
    if (!ev) return r.d;
    const [, mm, dd] = ev.date.split("-").map(Number);
    return `${MO[mm - 1]} ${dd}`;
  };
  const byDate = {};
  monthEvents.forEach((ev) => { (byDate[ev.date] = byDate[ev.date] || []).push(ev); });

  const [y, m] = monthKey.split("-").map(Number);
  const firstDow = new Date(y, m-1, 1).getDay();
  const days = new Date(y, m, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const iso = (d) => `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const evColor = (ev) => ev.special ? "var(--t-special)" : TC[ev.type];

  return (
    <section className="section calendar-light" id="calendar">
      <div className="wrap">
        <div className="eyebrow-m">{cal.eyebrow}</div>
        <div className="sec-head" style={{ marginBottom: "var(--s-3)" }}><h2>{cal.headline} <em>{cal.accent}</em></h2></div>
        <p className="cal-intro">
          {cal.intro}
        </p>

        <div className="cal-summary">
          <div>
            <span className="cal-summary-k">Now viewing</span>
            <strong>{activeMonth.label}</strong>
            <em>{allMonthEvents.length} sessions · {activeMonth.tag}</em>
          </div>
          <div>
            <span className="cal-summary-k">Pricing</span>
            <strong>{cal.pricingHeadline}</strong>
            <em>{cal.pricingBody}</em>
          </div>
        </div>

        <div className="rhythm-strip" aria-label="Studio rhythm">
          {RHYTHM.map((r) => {
            const ev = nextFor(r);
            return (
              <a className="rhythm-card" key={r.t} href={ev ? bookingHref(ev) : r.href} aria-label={`Book ${r.t}`}>
                <span>{rhythmDate(r)}</span>
                <strong>{r.t}</strong>
                <em>{r.time}</em>
                <small>{r.note}</small>
              </a>
            );
          })}
        </div>

        <div className="cal-top">
          <div className="month-tabs">
            {MONTHS.map((mo) => (
              <button key={mo.key} className={`month-tab${mo.key === monthKey ? " on" : ""}`} onClick={() => setMonth(mo.key)}>
                <span>{mo.label}</span><span className="tg">{mo.tag}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="chips">
          {cal.chips.map((c) => (
            <button key={c.k} className={`chip${isOn(c) ? " on" : ""}${c.k === "Everything" ? " everything" : ""}`} onClick={() => toggle(c)}>
              {c.t && <i className="dot" style={{ background: c.special ? "var(--t-special)" : TC[c.t] }}></i>}
              {c.k}
            </button>
          ))}
        </div>

        <div className="price-strip" aria-label="Pricing guide">
          {PRICE_GUIDE.map((p) => (
            <a className="price-pill" key={p.label} href={p.href} aria-label={`View ${p.label} class details`}>
              <span>{p.label}</span>
              <strong>{p.price}</strong>
              <em>{p.note}</em>
            </a>
          ))}
        </div>

        <div className="event-art-wall" aria-label="Event artwork">
          {Object.keys(cal.artCards).map((type) => {
            const art = cal.artCards[type];
            return (
              <a className="event-art-card" key={type} href={art.href}>
                <span className="event-art-img"><img src={art.src} alt="" /></span>
                <span className="event-art-copy">
                  <strong>{art.label}</strong>
                  <em>Details + sign up</em>
                </span>
              </a>
            );
          })}
        </div>

        {/* desktop grid */}
        <div className="cal-grid" role="grid">
          {DOW.map((d) => <div className="cal-dow" key={d}>{d}</div>)}
          {cells.map((d, i) => {
            if (d === null) return <div className="cal-cell empty" key={i}></div>;
            const date = iso(d);
            const evs = byDate[date] || [];
            const filled = evs.length > 0;
            return (
              <div className={`cal-cell${filled ? " filled" : ""}${date === TODAY ? " today" : ""}`} key={i}>
                <span className="num">{d}</span>
                <div className="ev-stack">
                  {evs.map((ev, j) => {
                    const bg = THEX[ev.type], ink = inkFor(bg);
                    return (
                      <button className="ev-fill" key={j} style={{ background: bg, color: ink }} onClick={() => setSel(ev)}>
                        {cal.artCards[ev.type] && <span className="ev-art"><img src={cal.artCards[ev.type].src} alt="" /></span>}
                        <span className="etitle">{ev.special && <span className="star">★ </span>}{ev.title}</span>
                        {ev.sub && <span className="esub">{ev.sub}</span>}
                        <span className="etime"><span>{ev.time}</span><span>{ev.price}</span></span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* mobile agenda */}
        <div className="agenda">
          {monthEvents.length === 0 && <p style={{ color:"var(--faint)" }}>Nothing matches those filters this month.</p>}
          {monthEvents.map((ev, i) => {
            const [, mm, dd] = ev.date.split("-").map(Number);
            const bg = THEX[ev.type], ink = inkFor(bg);
            return (
              <button className="ag-item filled" key={i} style={{ background: bg, color: ink }} onClick={() => setSel(ev)}>
                <span className="ag-date"><span className="d">{dd}</span><span className="mo">{MO[mm-1]}</span></span>
                <span className="ag-body">
                  <span className="at">{ev.special && "★ "}{ev.title}</span>
                  {ev.sub && <span className="as">{ev.sub}</span>}
                  <span className="am"><span>{ev.time}</span><span>·</span><span>{ev.price}</span></span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <EventDrawer ev={sel} onClose={() => setSel(null)} />
    </section>
  );
}

window.Calendar = Calendar;
