import { useState, useEffect } from "react";

function NetflixLogo({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <text x="0" y="24" fontSize="26" fontWeight="900" fontFamily="Georgia,serif" fill={color} letterSpacing="-2">
        N
      </text>
    </svg>
  );
}

function ToggleSwitch({ isPast, onToggle, present, past }) {
  return (
    <button
      className="toggle"
      onClick={onToggle}
      title={isPast ? "Switch to Present (Tech Era)" : "Switch to Past (Biz Era)"}
    >
      <span
        className="toggle__label"
        style={{
          color: isPast ? past.accentColor : present.subtleColor,
          opacity: isPast ? 1 : 0.5,
        }}
      >
        {past.modeLabel}
      </span>

      <div className="toggle__track" style={{ background: isPast ? past.accentColor : present.accentColor }}>
        <div className="toggle__thumb" style={{ left: isPast ? "27px" : "3px" }}>
        </div>
      </div>

      <span
        className="toggle__label"
        style={{
          color: isPast ? present.subtleColor : present.accentColor,
          opacity: isPast ? 0.5 : 1,
        }}
      >
        {present.modeLabel}
      </span>
    </button>
  );
}

export default function NavBar({ data, isPast, onToggle, present, past }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = scrolled
    ? isPast
      ? "rgba(253,250,244,0.97)"
      : "rgba(20,20,20,0.97)"
    : isPast
    ? "linear-gradient(to bottom, rgba(253,250,244,0.95), transparent)"
    : "linear-gradient(to bottom, rgba(20,20,20,0.95), transparent)";

  return (
    <nav
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      style={{
        background: navBg,
        borderBottom: scrolled ? `1px solid ${isPast ? "#e8d5b0" : "#2a2a2a"}` : "none",
      }}
    >
      <div className="nav__brand">
        <NetflixLogo color={data.accentColor} />
        <span className="nav__name" style={{ color: data.textColor }}>
          BAUTISTA
        </span>
        <span
          className="nav__badge"
          style={{
            color: data.accentColor,
            background: `${data.accentColor}22`,
            border: `1px solid ${data.accentColor}44`,
          }}
        >
          {data.modeLabel}
        </span>
      </div>

      <div className="nav__right">
        <div className="nav__menu">
          {["About", "Experience", "Projects", "Skills", "Resume"].map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase()}`}
              className="nav__link"
              style={{ color: data.subtleColor }}
              onMouseEnter={(e) => (e.target.style.color = data.textColor)}
              onMouseLeave={(e) => (e.target.style.color = data.subtleColor)}
            >
              {s.toUpperCase()}
            </a>
          ))}
        </div>
        <ToggleSwitch isPast={isPast} onToggle={onToggle} present={present} past={past} />
        <img
          src="/profile.png"
          alt="Profile"
          className="nav__avatar"
          title="Nerissa Bautista"
        />
      </div>
    </nav>
  );
}
