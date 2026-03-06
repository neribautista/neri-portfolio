export default function HeroSection({ data, isPast }) {
  const stats = [
    { label: isPast ? "Years in Sales" : "GPA", val: isPast ? "7" : "3.9" },
    { label: isPast ? "Industries" : "Users Served", val: isPast ? "3+" : "15K+" },
    { label: isPast ? "Countries" : "API Endpoints", val: isPast ? "2" : "10+" },
  ];

  return (
    <section id="about" className="hero">
      {/* Background gradient */}
      <div
        className="hero__bg"
        style={{
          background: isPast
            ? `radial-gradient(ellipse at 60% 40%, ${data.accentColor}18 0%, transparent 60%)`
            : `radial-gradient(ellipse at 30% 50%, ${data.accentColor}20 0%, transparent 60%)`,
        }}
      />

      {/* Scanline texture for tech mode */}
      {!isPast && <div className="hero__scanlines" />}

      <div className="hero__content">
        <div
          className="hero__chapter"
          style={{
            color: data.accentColor,
            border: `1px solid ${data.accentColor}`,
          }}
        >
          {isPast ? "CHAPTER 1: THE FOUNDATION" : "CHAPTER 2: THE EVOLUTION"}
        </div>

        <h1 className="hero__name" style={{ color: data.textColor }}>
          {data.name}
        </h1>

        <p className="hero__tagline" style={{ color: data.accentColor }}>
          {data.tagline}
        </p>

        <p className="hero__bio" style={{ color: data.subtleColor }}>
          {data.bio}
        </p>

        <div className="hero__actions">
          <a
            href="#projects"
            className="hero__btn hero__btn--primary"
            style={{ background: data.accentColor, color: "#fff" }}
          >
            ▶ View My Work
          </a>
          <a
            href="#resume"
            className="hero__btn"
            style={{
              background: `${data.textColor}18`,
              color: data.textColor,
              border: `1px solid ${data.textColor}30`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = `${data.textColor}28`)}
            onMouseLeave={(e) => (e.currentTarget.style.background = `${data.textColor}18`)}
          >
            ⊕ Get Resume
          </a>
        </div>

        <div className="hero__stats">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="hero__stat-value" style={{ color: data.textColor }}>
                {s.val}
              </div>
              <div className="hero__stat-label" style={{ color: data.subtleColor }}>
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
