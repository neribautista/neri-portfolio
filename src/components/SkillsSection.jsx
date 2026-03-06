import SectionLabel from "./SectionLabel";

export default function SkillsSection({ data }) {
  return (
    <section id="skills" className="section">
      <SectionLabel label="Skills & Stack" color={data.accentColor} textColor={data.textColor} />

      <div className="grid grid--skills">
        {Object.entries(data.skills).map(([cat, skills]) => (
          <div
            key={cat}
            className="skill-card"
            style={{
              background: data.cardBg,
              border: `1px solid ${data.accentColor}20`,
            }}
          >
            <div className="skill-card__category" style={{ color: data.accentColor }}>
              {cat.toUpperCase()}
            </div>
            <div className="skill-card__items">
              {skills.map((s) => (
                <span
                  key={s}
                  className="skill-card__item"
                  style={{
                    color: data.subtleColor,
                    background: `${data.textColor}08`,
                    border: `1px solid ${data.textColor}15`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
