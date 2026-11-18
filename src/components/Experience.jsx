import { useState } from "react";
import { EXPERIENCE, SEASON_ONE, SKILLS } from "../data/siteData";
import Icon from "./Icon";

export default function Experience() {
  const [showSeasonOne, setShowSeasonOne] = useState(false);

  return (
    <section id="experience" className="section">
      <div className="section__head">
        <div>
          <h2 className="section__title">Experience</h2>
          <p className="section__sub">My journey in building, learning, and growing.</p>
        </div>
      </div>

      <div className="xp">
        <ol className="timeline">
          {EXPERIENCE.map((e) => (
            <li key={e.title} className="timeline__item">
              <span className="timeline__period">{e.period}</span>
              <div className="timeline__card">
                <div className="timeline__top">
                  <div>
                    <h3>{e.title}</h3>
                    <p className="timeline__org">{e.org}</p>
                  </div>
                  {e.badge && <span className="badge badge--outline">{e.badge}</span>}
                </div>
                <ul className="timeline__points">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {e.tags && (
                  <ul className="chips chips--sm">
                    {e.tags.map((t) => (
                      <li key={t} className="chip chip--xs">{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}

          <li className="timeline__item timeline__item--season">
            <span className="timeline__period">2015 – 2022</span>
            <div className="timeline__card">
              <button className="season__toggle" onClick={() => setShowSeasonOne((s) => !s)} aria-expanded={showSeasonOne}>
                <span>
                  <span className="kicker">Season 1 · The Foundation</span>
                  <h3>7+ years in sales & business development</h3>
                  <p className="timeline__org">Automotive · Hospitality · Forex — Philippines</p>
                </span>
                <Icon name="chevronDown" size={20} className={`season__chev ${showSeasonOne ? "is-open" : ""}`} />
              </button>
              {showSeasonOne && (
                <ul className="season__list">
                  {SEASON_ONE.map((j) => (
                    <li key={j.title + j.company}>
                      <strong>{j.title}</strong>
                      <span>{j.company}</span>
                      <em>{j.period}</em>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        </ol>

        <aside className="skills">
          <h3>Skills</h3>
          {Object.entries(SKILLS).map(([group, items]) => (
            <div key={group} className="skills__group">
              <h4>{group}</h4>
              <ul className="chips chips--sm">
                {items.map((s) => (
                  <li key={s} className="chip chip--xs">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
