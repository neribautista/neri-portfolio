import { useEffect, useRef, useState } from "react";
import { CATEGORIES, PROJECTS } from "../data/siteData";
import ProjectCover from "./ProjectCover";
import Icon from "./Icon";

export default function Trending({ onOpenProject }) {
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const rowRef = useRef(null);

  const list = category ? PROJECTS.filter((p) => p.categories.includes(category)) : PROJECTS;
  const activeCat = CATEGORIES.find((c) => c.id === category);

  // Keep the page dots in sync with the scroll position.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () => {
      const total = Math.max(1, Math.ceil(row.scrollWidth / row.clientWidth - 0.05));
      setPages(total);
      setPage(Math.min(total - 1, Math.round(row.scrollLeft / row.clientWidth)));
    };
    update();
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [list.length]);

  const scrollBy = (dir) => {
    const row = rowRef.current;
    row.scrollBy({ left: dir * row.clientWidth * 0.9, behavior: "smooth" });
  };

  const pickCategory = (id) => {
    setCategory((c) => (c === id ? null : id));
    rowRef.current?.scrollTo({ left: 0 });
    document.getElementById("trending")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="trending" className="section">
      <div className="section__head">
        <div>
          <h2 className="section__title">{activeCat ? activeCat.label : "Trending Now"}</h2>
          <p className="section__sub">
            {activeCat ? `${list.length} project${list.length === 1 ? "" : "s"}` : "Featured projects and latest work"}
          </p>
        </div>
        {activeCat && (
          <button className="chip chip--clear" onClick={() => setCategory(null)}>
            Show all <Icon name="close" size={14} />
          </button>
        )}
      </div>

      <div className="row">
        <button className="row__arrow row__arrow--left" onClick={() => scrollBy(-1)} aria-label="Previous" disabled={page === 0}>
          <Icon name="chevronLeft" size={22} />
        </button>
        <ul className="row__track" ref={rowRef}>
          {list.map((p) => (
            <li key={p.id}>
              <button className="poster" onClick={() => onOpenProject(p.id)}>
                <ProjectCover project={p} />
                {p.live && <span className="poster__badge">Live</span>}
                <span className="poster__meta">
                  <span className="poster__title">{p.name}</span>
                  <span className="poster__tags">
                    {p.tags.slice(0, 3).join(" · ")}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <button className="row__arrow row__arrow--right" onClick={() => scrollBy(1)} aria-label="Next" disabled={page >= pages - 1}>
          <Icon name="chevronRight" size={22} />
        </button>
      </div>
      {pages > 1 && (
        <div className="dots" aria-hidden="true">
          {Array.from({ length: pages }, (_, i) => (
            <span key={i} className={i === page ? "is-active" : ""} />
          ))}
        </div>
      )}

      <h3 id="projects" className="section__title section__title--sm">Browse by Category</h3>
      <ul className="cats">
        {CATEGORIES.map((c) => {
          const count = PROJECTS.filter((p) => p.categories.includes(c.id)).length;
          return (
            <li key={c.id}>
              <button className={`cat ${category === c.id ? "is-active" : ""}`} onClick={() => pickCategory(c.id)}>
                <Icon name={c.icon} size={22} className="cat__icon" />
                <span className="cat__label">{c.label}</span>
                <span className="cat__count">
                  {count} project{count === 1 ? "" : "s"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
