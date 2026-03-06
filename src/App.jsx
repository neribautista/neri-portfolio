import { useState } from "react";
import { PRESENT, PAST } from "./data/portfolioData";
import ProfileSelector from "./components/ProfileSelector";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import EducationBanner from "./components/EducationBanner";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import ResumeSection from "./components/ResumeSection";
import TransitionOverlay from "./components/TransitionOverlay";
import Footer from "./components/Footer";

export default function App() {
  const [profileSelected, setProfileSelected] = useState(false);
  const [isPast, setIsPast] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionDir, setTransitionDir] = useState("to-past");
  const data = isPast ? PAST : PRESENT;

  const handleToggle = () => {
    const dir = isPast ? "to-present" : "to-past";
    setTransitionDir(dir);
    setTransitioning(true);
    setTimeout(() => {
      setIsPast((p) => !p);
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => setTransitioning(false), 350);
    }, 350);
  };

  return (
    <div
      className="app"
      style={{
        "--accent": data.accentColor,
        "--bg": data.bgColor,
        "--text": data.textColor,
        background: data.bgColor,
        color: data.textColor,
      }}
    >
      {!profileSelected && <ProfileSelector onSelect={() => setProfileSelected(true)} />}

      <TransitionOverlay visible={transitioning} direction={transitionDir} />
      <NavBar data={data} isPast={isPast} onToggle={handleToggle} present={PRESENT} past={PAST} />
      <HeroSection data={data} isPast={isPast} />
      <EducationBanner data={data} />
      <ExperienceSection data={data} isPast={isPast} />
      <ProjectsSection data={data} />
      <SkillsSection data={data} />
      <ResumeSection data={data} />
      <Footer data={data} isPast={isPast} />
    </div>
  );
}
