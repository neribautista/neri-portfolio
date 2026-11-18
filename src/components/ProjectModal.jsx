import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "../data/siteData";
import ProjectCover from "./ProjectCover";
import Icon from "./Icon";

const TABS = ["The Story", "Episodes", "Tech Stack", "Impact"];
const IMPACT_ICONS = ["sparkles", "route", "smartphone", "zap"];

export default function ProjectModal({ project: p, onClose, onOpenProject }) {
  const [tab, setTab] = useState(TABS[0]);
  const panelRef = useRef(null);

  useEffect(() => {
    setTab(TABS[0]);
    panelRef.current?.scrollTo({ top: 0 });
    panelRef.current?.focus();
  }, [p.id]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const more = PROJECTS.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <div className="overlay" onClick={onClose}>
      <article
        className="detail"
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="detail__hero">
          <ProjectCover project={p} size="hero" />
          <div className="detail__shade" />
          <div className="detail__intro">
            <button className="link-btn" onClick={onClose}>
              <Icon name="arrowLeft" size={16} /> Back to Projects
            </button>
            <h2 id="detail-title" className="detail__title">{p.name}</h2>
            <p className="detail__tagline">{p.tagline}</p>
            <ul className="chips">
              {p.tags.slice(0, 5).map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
            <div className="hero__actions">
              {p.live && (
                <a className="btn btn--primary" href={p.live} target="_blank" rel="noreferrer">
                  <Icon name="play" size={16} fill="currentColor" stroke={0} /> Watch Project
                </a>
              )}
              {p.code && (
                <a className={`btn ${p.live ? "btn--ghost" : "btn--primary"}`} href={p.code} target="_blank" rel="noreferrer">
                  <Icon name="github" size={17} /> View Code
                </a>
              )}
              {!p.live && !p.code && <span className="detail__note">Internal university system · no public link</span>}
            </div>
          </div>
          <button className="icon-btn detail__close" onClick={onClose} aria-label="Close">
            <Icon name="close" size={22} />
          </button>
        </header>

        <div className="tabs" role="tablist">
          {TABS.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} className={`tab ${tab === t ? "is-active" : ""}`} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        <div className="detail__body" role="tabpanel">
          {tab === "The Story" && (
            <div className="detail__split">
              <div>
                <p className="detail__meta">
                  {p.context} · {p.period}
                </p>
                <p className="detail__story">{p.story}</p>
              </div>
              <div>
                <h3 className="detail__h">Impact</h3>
                <ImpactList items={p.impact} />
              </div>
            </div>
          )}

          {tab === "Episodes" && (
            <ol className="episodes">
              {p.highlights.map((h, i) => (
                <li key={h} className="episode">
                  <span className="episode__num">{i + 1}</span>
                  <div>
                    <span className="episode__label">Episode {i + 1}</span>
                    <p>{h}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}

          {tab === "Tech Stack" && (
            <ul className="stack">
              {p.tags.map((t) => (
                <li key={t} className="stack__item">
                  <Icon name="code" size={18} />
                  {t}
                </li>
              ))}
            </ul>
          )}

          {tab === "Impact" && <ImpactList items={p.impact} large />}
        </div>

        <section className="detail__more">
          <h3 className="detail__h">More like this</h3>
          <ul className="more">
            {more.map((m) => (
              <li key={m.id}>
                <button className="poster poster--sm" onClick={() => onOpenProject(m.id)}>
                  <ProjectCover project={m} />
                  <span className="poster__meta">
                    <span className="poster__title">{m.name}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}

function ImpactList({ items, large }) {
  return (
    <ul className={`impact ${large ? "impact--large" : ""}`}>
      {items.map((it, i) => (
        <li key={it}>
          <span className="impact__icon">
            <Icon name={IMPACT_ICONS[i % IMPACT_ICONS.length]} size={large ? 22 : 18} />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}
