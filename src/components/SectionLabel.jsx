export default function SectionLabel({ label, color, textColor }) {
  return (
    <div className="section-label">
      <div className="section-label__bar" style={{ background: color }} />
      <h2 className="section-label__text" style={{ color: textColor }}>
        {label}
      </h2>
    </div>
  );
}
