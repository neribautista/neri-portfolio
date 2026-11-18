import { useEffect, useState } from "react";
import { PROFILE } from "../data/siteData";
import { scrollToSection } from "../lib/scroll";
import Icon from "./Icon";

export const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "trending", label: "Trending", icon: "flame" },
  { id: "projects", label: "Projects", icon: "grid" },
  { id: "ask", label: "Ask Nerissa", icon: "chat" },
  { id: "about", label: "About", icon: "info" },
  { id: "lab", label: "AI Lab", icon: "flask" },
  { id: "experience", label: "Experience", icon: "timeline" },
  { id: "plans", label: "Website Plans", icon: "rocket" },
];

// Tracks which section is under the nav bar.
export function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id).concat("contact");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

export default function NavBar({ onAsk }) {
  const [shown, setShown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    if (id === "ask") return onAsk();
    if (id === "home") return window.scrollTo({ top: 0, behavior: "smooth" });
    scrollToSection(id);
  };

  return (
    <header className={`topnav ${shown ? "topnav--shown" : ""} ${menuOpen ? "topnav--open" : ""}`}>
      <button className="brand" onClick={() => go("home")} aria-label="Back to top">
        NERISSA
      </button>

      <nav className="topnav__links" aria-label="Sections">
        {NAV_ITEMS.map((n) => (
          <button
            key={n.id}
            className={`topnav__link ${active === n.id ? "is-active" : ""}`}
            onClick={() => go(n.id)}
          >
            {n.label}
          </button>
        ))}
      </nav>

      <div className="topnav__right">
        <button className="icon-btn" onClick={onAsk} aria-label="Ask Nerissa AI">
          <Icon name="search" size={19} />
        </button>
        <button
          className="topnav__avatar"
          onClick={() => go("about")}
          title="About Nerissa"
          aria-label="About Nerissa"
        >
          <img src={PROFILE.photos.avatar} alt="" />
        </button>
        <button className="icon-btn topnav__menu" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu" aria-expanded={menuOpen}>
          <Icon name={menuOpen ? "close" : "menu"} size={22} />
        </button>
      </div>
    </header>
  );
}
