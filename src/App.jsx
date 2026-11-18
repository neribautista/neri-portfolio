import { useCallback, useEffect, useState } from "react";
import { SECTION_ORDER, PROJECTS } from "./data/siteData";
import ProfileSelector from "./components/ProfileSelector";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Trending from "./components/Trending";
import About from "./components/About";
import AILab from "./components/AILab";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import ProjectModal from "./components/ProjectModal";
import AskNerissa from "./components/AskNerissa";
import Plans from "./components/Plans";
import QuoteModal from "./components/QuoteModal";
import { scrollToSection } from "./lib/scroll";

export default function App() {
  const [pickerOpen, setPickerOpen] = useState(true);
  const [projectId, setProjectId] = useState(null);
  const [ask, setAsk] = useState({ open: false, seed: null });
  // null = closed, "" = open at plan picker, plan id = open at booking form for that plan
  const [quotePlan, setQuotePlan] = useState(null);

  const project = PROJECTS.find((p) => p.id === projectId) || null;

  const openAsk = useCallback((seed = null) => setAsk({ open: true, seed }), []);
  const anyOverlay = pickerOpen || !!project || ask.open || quotePlan !== null;

  // Lock page scroll behind overlays.
  useEffect(() => {
    document.body.style.overflow = anyOverlay ? "hidden" : "";
  }, [anyOverlay]);

  const sections = {
    trending: <Trending key="trending" onOpenProject={setProjectId} />,
    about: <About key="about" />,
    lab: <AILab key="lab" />,
    experience: <Experience key="experience" />,
    plans: <Plans key="plans" onQuote={setQuotePlan} />,
    contact: <Contact key="contact" onAsk={openAsk} onQuote={() => setQuotePlan("")} />,
  };

  return (
    <div className="app">
      <NavBar onAsk={() => openAsk()} />

      <main>
        <Hero
          onStart={() => scrollToSection("trending")}
          onQuote={() => setQuotePlan("")}
          onAsk={() => openAsk()}
        />
        {SECTION_ORDER.map((id) => sections[id])}
      </main>

      {pickerOpen && <ProfileSelector onSelect={() => setPickerOpen(false)} />}
      {project && (
        <ProjectModal
          project={project}
          onClose={() => setProjectId(null)}
          onOpenProject={setProjectId}
        />
      )}
      {ask.open && (
        <AskNerissa
          seed={ask.seed}
          onClose={() => setAsk({ open: false, seed: null })}
          onOpenProject={(id) => {
            setAsk({ open: false, seed: null });
            setProjectId(id);
          }}
        />
      )}
      {quotePlan !== null && <QuoteModal initialPlan={quotePlan || null} onClose={() => setQuotePlan(null)} />}
    </div>
  );
}
