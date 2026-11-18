import { PROFILE, RESUME } from "../data/siteData";
import { scrollToSection } from "../lib/scroll";
import { NAV_ITEMS, useActiveSection } from "./NavBar";
import Icon from "./Icon";

function SideRail({ onAsk }) {
  const active = useActiveSection();
  const go = (id) => {
    if (id === "ask") return onAsk();
    if (id === "home") return window.scrollTo({ top: 0, behavior: "smooth" });
    scrollToSection(id);
  };

  return (
    <aside className="rail" aria-label="Sections">
      <div className="brand brand--rail">NERISSA</div>
      <nav className="rail__nav">
        {NAV_ITEMS.map((n) => (
          <button key={n.id} className={`rail__item ${active === n.id ? "is-active" : ""}`} onClick={() => go(n.id)}>
            <Icon name={n.icon} size={16} />
            {n.label}
          </button>
        ))}
        <a className="rail__item" href={RESUME.file} target="_blank" rel="noreferrer">
          <Icon name="file" size={16} />
          Resume
        </a>
      </nav>
      <div className="rail__loc">
        <Icon name="pin" size={14} />
        {PROFILE.locationShort}
      </div>
    </aside>
  );
}

export default function Hero({ onStart, onQuote, onAsk }) {
  return (
    <section id="home" className="hero">
      <div className="hero__photo" aria-hidden="true">
        <img src={PROFILE.photos.hero} alt="" fetchpriority="high" />
      </div>
      <div className="hero__shade" aria-hidden="true" />

      <SideRail onAsk={onAsk} />

      <div className="hero__content">
        <p className="eyebrow">
          {PROFILE.eyebrow.map((w, i) => (
            <span key={w}>
              {i > 0 && <span className="eyebrow__dot">•</span>}
              {w}
            </span>
          ))}
        </p>

        <h1 className="hero__name">
          <span className="sr-only">{PROFILE.first} {PROFILE.last}, </span>
          <span>Call me</span>
          <span className="accent">{PROFILE.nickname}</span>
        </h1>

        <p className="hero__pitch">{PROFILE.pitch}</p>

        <div className="hero__actions">
          <button className="btn btn--primary" onClick={onStart}>
            <Icon name="play" size={16} fill="currentColor" stroke={0} />
            Start Exploring
          </button>
          <button className="btn btn--ghost" onClick={onQuote}>
            <Icon name="rocket" size={18} />
            Get a Website Quote
          </button>
        </div>

        <button className="hero__scroll" onClick={onStart}>
          <Icon name="arrowDown" size={16} />
          Scroll
        </button>
      </div>

      <p className="hero__script" aria-hidden="true">
        Better Systems,
        <br />
        Bigger Impact
      </p>
    </section>
  );
}
