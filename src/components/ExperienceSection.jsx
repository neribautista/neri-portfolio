import { useState } from "react";
import SectionLabel from "./SectionLabel";

const CATEGORY_META = {
  "Forex & Finance": { icon: "/icons/forex.png", tagline: "3 roles in financial markets" },
  Hospitality: { icon: "/icons/hotel.png", tagline: "Revenue & demand management" },
  Automotive: { icon: "/icons/automotive.png", tagline: "5 years in auto sales" },
};

function ExpCard({ exp, data }) {
  return (
    <div
      className="exp-card"
      style={{
        background: data.cardBg,
        border: `1px solid ${data.accentColor}20`,
      }}
    >
      <div
        className="exp-card__accent-bar"
        style={{ background: `linear-gradient(to bottom, ${data.accentColor}, transparent)` }}
      />

      <div className="exp-card__header">
        <h3 className="exp-card__title" style={{ color: data.textColor }}>
          {exp.title}
        </h3>
        <span className="exp-card__period" style={{ color: data.accentColor }}>
          {exp.period}
        </span>
      </div>

      <p className="exp-card__company" style={{ color: data.subtleColor }}>
        {exp.company} · {exp.location}
      </p>

      <ul className="exp-card__highlights">
        {exp.highlights.map((h, j) => (
          <li key={j} className="exp-card__highlight" style={{ color: data.subtleColor }}>
            {h}
          </li>
        ))}
      </ul>

      <div className="tags">
        {exp.tags.map((t) => (
          <span
            key={t}
            className="tag"
            style={{
              color: data.accentColor,
              background: `${data.accentColor}15`,
              border: `1px solid ${data.accentColor}30`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection({ data, isPast }) {
  const [openCategory, setOpenCategory] = useState(null);

  if (isPast) {
    const groups = {};
    data.experience.forEach((exp) => {
      const cat = exp.category || "Other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(exp);
    });

    const categories = Object.entries(groups);
    const openItems = openCategory ? groups[openCategory] : null;

    return (
      <section id="experience" className="section">
        <SectionLabel label="Experience" color={data.accentColor} textColor={data.textColor} />

        {/* 3 category cards in a row */}
        <div className="exp-category-row">
          {categories.map(([category, items]) => {
            const meta = CATEGORY_META[category] || { icon: "/icons/forex.png", tagline: "" };
            const isOpen = openCategory === category;
            return (
              <button
                key={category}
                className={`exp-category__card ${isOpen ? "exp-category__card--open" : ""}`}
                onClick={() => setOpenCategory(isOpen ? null : category)}
                style={{
                  background: isOpen ? `${data.accentColor}15` : data.cardBg,
                  border: `1px solid ${isOpen ? data.accentColor + "50" : data.accentColor + "20"}`,
                }}
              >
                <img className="exp-category__icon" src={meta.icon} alt={category} width="40" height="40" />
                <div className="exp-category__info">
                  <span className="exp-category__name" style={{ color: data.textColor }}>
                    {category}
                  </span>
                  <span className="exp-category__tagline" style={{ color: data.subtleColor }}>
                    {meta.tagline}
                  </span>
                </div>
                <span className="exp-category__count" style={{ background: data.accentColor }}>
                  {items.length}
                </span>
                <span
                  className={`exp-category__chevron ${isOpen ? "exp-category__chevron--open" : ""}`}
                  style={{ color: data.accentColor }}
                >
                  ▾
                </span>
              </button>
            );
          })}
        </div>

        {/* Expanded panel below all cards */}
        <div className={`exp-category__panel ${openCategory ? "exp-category__panel--open" : ""}`}>
          {openItems && (
            <div className="exp-category__roles">
              {openItems.map((exp, i) => (
                <ExpCard key={i} exp={exp} data={data} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="section">
      <SectionLabel label="Experience" color={data.accentColor} textColor={data.textColor} />
      {data.experience.map((exp, i) => (
        <ExpCard key={i} exp={exp} data={data} />
      ))}
    </section>
  );
}
