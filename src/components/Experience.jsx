import { useState } from "react";
import { EXPERIENCE, SEASON_ONE, SKILLS } from "../data/siteData";
import Icon from "./Icon";
import { useMedia, MOBILE } from "../lib/useMedia";

export default function Experience() {
  const [showSeasonOne, setShowSeasonOne] = useState(false);
  const mobile = useMedia(MOBILE);
  // On phones each job is an accordion; the current role starts open.
  const [openJob, setOpenJob] = useState(0);
  const [openSkill, setOpenSkill] = useState(null);
  const [allPoints, setAllPoints] = useState(false);
  const POINTS_PREVIEW = 3;

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
          {EXPERIENCE.map((e, i) => {
            const open = !mobile || openJob === i;
            const top = (
              <>
                <div>
                  <h3>{e.title}</h3>
                  <p className="timeline__org">{e.org}</p>
                </div>
                {e.badge && <span className="badge badge--outline">{e.badge}</span>}
                {mobile && <Icon name="chevronDown" size={20} className={`season__chev ${open ? "is-open" : ""}`} />}
              </>
            );
            return (
            <li key={e.title} className="timeline__item">
              <span className="timeline__period">{e.period}</span>
              <div className="timeline__card">
                {mobile ? (
                  <button className="timeline__top timeline__toggle" onClick={() => setOpenJob(open ? null : i)} aria-expanded={open}>
                    {top}
                  </button>
                ) : (
                  <div className="timeline__top">{top}</div>
                )}
                {open && (
                <>
                <ul className="timeline__points">
                  {(mobile && !allPoints ? e.points.slice(0, POINTS_PREVIEW) : e.points).map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {mobile && e.points.length > POINTS_PREVIEW && (
                  <button className="plan__more timeline__more" onClick={() => setAllPoints((v) => !v)} aria-expanded={allPoints}>
                    {allPoints ? "Show less" : `Show ${e.points.length - POINTS_PREVIEW} more`}
                    <Icon name="chevronDown" size={16} className={`season__chev ${allPoints ? "is-open" : ""}`} />
                  </button>
                )}
                {e.tags && (
                  <ul className="chips chips--sm">
                    {e.tags.map((t) => (
                      <li key={t} className="chip chip--xs">{t}</li>
                    ))}
                  </ul>
                )}
                </>
                )}
              </div>
            </li>
            );
          })}

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
          {Object.entries(SKILLS).map(([group, items]) => {
            const open = !mobile || openSkill === group;
            return (
              <div key={group} className={`skills__group ${mobile ? "skills__group--acc" : ""}`}>
                {mobile ? (
                  <button className="skills__toggle" onClick={() => setOpenSkill(open ? null : group)} aria-expanded={open}>
                    <h4>{group}</h4>
                    <span className="skills__count">{items.length}</span>
                    <Icon name="chevronDown" size={18} className={`season__chev ${open ? "is-open" : ""}`} />
                  </button>
                ) : (
                  <h4>{group}</h4>
                )}
                {open && (
                  <ul className="chips chips--sm">
                    {items.map((s) => (
                      <li key={s} className="chip chip--xs">{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </aside>
      </div>
    </section>
  );
}
