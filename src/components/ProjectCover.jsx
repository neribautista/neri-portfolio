import Icon from "./Icon";

// Generated poster art for a project: gradient sky, horizon glow, and a big glyph.
export default function ProjectCover({ project, size = "card" }) {
  const { from, via, to, icon } = project.cover;
  // Live projects show a real screenshot in the detail view.
  if (size === "hero" && project.screenshot) {
    return (
      <div className="cover cover--hero cover--shot" style={{ "--c1": from, "--c2": via, "--c3": to }}>
        <img src={project.screenshot} alt={`${project.name} homepage`} loading="lazy" decoding="async" />
      </div>
    );
  }
  return (
    <div
      className={`cover cover--${size}`}
      style={{ "--c1": from, "--c2": via, "--c3": to }}
      aria-hidden="true"
    >
      <div className="cover__grid" />
      <div className="cover__sun" />
      <svg className="cover__skyline" viewBox="0 0 400 80" preserveAspectRatio="none">
        <path d="M0 80V52h18V38h14v14h10V28h16v24h12V44h20v36zM92 80V34h12V20h10v14h14v46zM128 80V48h22V30h8v18h16V40h18v40zM192 80V26h10V12h6v14h12v54zM220 80V46h20V36h14v10h10V24h16v56zM280 80V40h14V30h18v50zM312 80V50h16V34h12v16h20V42h16v38zM376 80V30h10V20h8v10h6v50z" />
      </svg>
      <div className="cover__glyph">
        <Icon name={icon} size={size === "hero" ? 96 : 56} stroke={1.2} />
      </div>
    </div>
  );
}
