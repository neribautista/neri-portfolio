import { useState } from "react";
import SectionLabel from "./SectionLabel";

function ProjectCard({ proj, data }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`project-card ${hovered ? "project-card--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: data.cardBg,
        border: `1px solid ${hovered ? data.accentColor + "60" : data.accentColor + "20"}`,
        boxShadow: hovered ? `0 12px 32px ${data.accentColor}20` : "none",
      }}
    >
      <div
        className="project-card__bar"
        style={{ background: `linear-gradient(to right, ${data.accentColor}, ${data.accentColor}80)` }}
      />

      <div className="project-card__body">
        <div className="project-card__header">
          <span
            className="project-card__genre"
            style={{
              color: data.accentColor,
              background: `${data.accentColor}15`,
            }}
          >
            {proj.genre}
          </span>
          <span className="project-card__rating" style={{ color: data.accentColor }}>
            {proj.rating}
          </span>
        </div>

        <h3 className="project-card__title" style={{ color: data.textColor }}>
          {proj.title}
        </h3>

        <p className="project-card__subtitle" style={{ color: data.accentColor }}>
          {proj.subtitle}
        </p>

        <p className="project-card__meta" style={{ color: data.subtleColor }}>
          {proj.context} · {proj.period}
        </p>

        <p className="project-card__desc" style={{ color: data.subtleColor }}>
          {proj.description}
        </p>

        <div className="project-card__tags">
          {proj.tags.map((t) => (
            <span
              key={t}
              className="tag tag--small"
              style={{
                color: data.subtleColor,
                background: `${data.textColor}08`,
                border: `1px solid ${data.textColor}15`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ data }) {
  return (
    <section id="projects" className="section">
      <SectionLabel label="Featured Work" color={data.accentColor} textColor={data.textColor} />
      <div className="grid grid--projects">
        {data.projects.map((p, i) => (
          <ProjectCard key={i} proj={p} data={data} />
        ))}
      </div>
    </section>
  );
}
