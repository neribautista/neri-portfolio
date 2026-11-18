import { useState } from "react";
import { LAB } from "../data/siteData";
import Icon from "./Icon";

// Radial "toolkit" diagram: the chosen category sits in the core and its
// tools orbit around it.
export default function AILab() {
  const [catId, setCatId] = useState(LAB[0].id);
  const [focus, setFocus] = useState(null);
  const cat = LAB.find((c) => c.id === catId);

  const R = 38; // orbit radius, % of the square stage
  const nodes = cat.tools.map((t, i) => {
    const a = (-90 + (360 / cat.tools.length) * i + 45) * (Math.PI / 180);
    return { ...t, x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
  });

  return (
    <section id="lab" className="section">
      <div className="section__head">
        <div>
          <h2 className="section__title">AI Lab</h2>
          <p className="section__sub">The tools, technologies, and systems I work with.</p>
        </div>
      </div>

      <div className="lab">
        <nav className="lab__cats" aria-label="Toolkit categories">
          <p className="lab__cats-title">Toolkit</p>
          {LAB.map((c) => (
            <button
              key={c.id}
              className={`lab__cat ${c.id === catId ? "is-active" : ""}`}
              onClick={() => {
                setCatId(c.id);
                setFocus(null);
              }}
            >
              <Icon name={c.icon} size={16} />
              {c.label}
            </button>
          ))}
        </nav>

        <div className="lab__stage" key={catId}>
          <svg className="lab__lines" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r={R} />
            <circle cx="50" cy="50" r={R * 0.62} />
            {nodes.map((n) => (
              <line key={n.name} x1="50" y1="50" x2={n.x} y2={n.y} className={focus === n.name ? "is-focus" : ""} />
            ))}
          </svg>
          <div className="lab__core">
            <Icon name={cat.icon} size={30} />
            <span>{cat.label}</span>
          </div>
          {nodes.map((n, i) => (
            <button
              key={n.name}
              className={`lab__node ${focus === n.name ? "is-focus" : ""}`}
              style={{ left: `${n.x}%`, top: `${n.y}%`, "--i": i }}
              onMouseEnter={() => setFocus(n.name)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(n.name)}
              onBlur={() => setFocus(null)}
            >
              <span className="lab__node-icon">
                <Icon name={n.icon} size={20} />
              </span>
              <span className="lab__node-name">{n.name}</span>
            </button>
          ))}
        </div>

        <aside className="lab__featured">
          <h3>Featured Tools</h3>
          <ul>
            {cat.tools.map((t) => (
              <li
                key={t.name}
                className={focus === t.name ? "is-focus" : ""}
                onMouseEnter={() => setFocus(t.name)}
                onMouseLeave={() => setFocus(null)}
              >
                <span className="lab__tool-icon">
                  <Icon name={t.icon} size={18} />
                </span>
                <span>
                  <strong>{t.name}</strong>
                  <small>{t.note}</small>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
