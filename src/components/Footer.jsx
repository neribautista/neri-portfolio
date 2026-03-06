export default function Footer({ data, isPast }) {
  return (
    <footer
      className="footer"
      style={{ borderTop: `1px solid ${data.accentColor}20` }}
    >
      <div className="footer__text" style={{ color: data.subtleColor }}>
        © 2026 Nerissa Bautista · Built with React
      </div>
      <div className="footer__text" style={{ color: data.subtleColor }}>
        Toggle the switch above to see my{" "}
        <span style={{ color: data.accentColor, fontWeight: 700 }}>
          {isPast ? "Tech Era ↑" : "Business Era ↑"}
        </span>
      </div>
    </footer>
  );
}
