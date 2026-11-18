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
import { track } from "./lib/analytics";

export default function App() {
  const [pickerOpen, setPickerOpen] = useState(true);
  const [projectId, setProjectId] = useState(null);
  const [ask, setAsk] = useState({ open: false, seed: null });
  // null = closed, "" = open at plan picker, plan id = open at booking form for that plan
  const [quotePlan, setQuotePlan] = useState(null);

  const project = PROJECTS.find((p) => p.id === projectId) || null;

  const openAsk = useCallback((seed = null) => {
    track("ask_nerissa_open");
    setAsk({ open: true, seed });
  }, []);
  // Opens the quote popup: "" = plan picker, plan id = booking form for that plan.
  const openQuote = useCallback((plan = "") => {
    track("quote_open", { plan: plan || "picker" });
    setQuotePlan(plan);
  }, []);
  const anyOverlay = pickerOpen || !!project || ask.open || quotePlan !== null;

  // Lock page scroll behind overlays.
  useEffect(() => {
    document.body.style.overflow = anyOverlay ? "hidden" : "";
  }, [anyOverlay]);

  const sections = {
    trending: <Trending key="trending" onOpenProject={(id) => { track("project_open", { project: id }); setProjectId(id); }} />,
    about: <About key="about" />,
    lab: <AILab key="lab" />,
    experience: <Experience key="experience" />,
    plans: <Plans key="plans" onQuote={openQuote} />,
    contact: <Contact key="contact" onAsk={openAsk} onQuote={() => openQuote("")} />,
  };

  return (
    <div className="app">
      <NavBar onAsk={() => openAsk()} />

      <main>
        <Hero
          onStart={() => scrollToSection("trending")}
          onQuote={() => openQuote("")}
          onAsk={() => openAsk()}
        />
        {SECTION_ORDER.map((id) => sections[id])}
      </main>

      {pickerOpen && <ProfileSelector onSelect={() => setPickerOpen(false)} />}
      {project && (
        <ProjectModal
          project={project}
          onClose={() => setProjectId(null)}
          onOpenProject={(id) => {
            track("project_open", { project: id });
            setProjectId(id);
          }}
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
