import { useState } from "react";
import { PROFILE, RESUME } from "../data/siteData";
import Icon from "./Icon";

// Deterministic city skyline across a 1440-wide viewBox.
const SKYLINE = (() => {
  let d = "M0 320V250";
  let x = 0;
  let seed = 7;
  const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  while (x < 1440) {
    const w = 24 + Math.round(rand() * 46);
    const h = 190 + Math.round(rand() * 70) - (x > 560 && x < 900 ? 70 * rand() : 0);
    d += `H${x}V${Math.round(h)}`;
    if (rand() > 0.72) d += `h${Math.round(w / 2 - 3)}v-18h6v18`;
    x += w;
    d += `H${Math.min(x, 1440)}`;
  }
  return `${d}V320z`;
})();

export default function Contact({ onAsk, onQuote }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const links = [
    { icon: "mail", label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: "linkedin", label: "LinkedIn", value: "linkedin.com/in/nerissabautista", href: PROFILE.linkedin },
    { icon: "github", label: "GitHub", value: "github.com/neribautista", href: PROFILE.github },
  ];

  return (
    <section id="contact" className="contact">
      <div className="contact__sky" aria-hidden="true">
        <div className="contact__sun" />
        <svg className="contact__mountains" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="m1" d="M0 230 140 150l90 50 150-120 130 90 110-60 160 110 140-130 170 120 120-70 130 60v120H0z" />
          <path className="m2" d={SKYLINE} />
        </svg>
        <div className="contact__fade" />
      </div>

      <div className="contact__inner">
        <div className="contact__pitch">
          <h2 className="contact__title">
            Let's Build
            <br />
            Something <span className="accent">Great</span>
          </h2>
          <p>
            Need a website for your business, hiring a Solutions Engineer, or just want to say hi? I'd love to connect.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={`mailto:${PROFILE.email}?subject=Hello%20Nerissa`}>
              Get in Touch
            </a>
            <button className="btn btn--ghost" onClick={onQuote}>
              <Icon name="rocket" size={17} /> Get a Website Quote
            </button>
          </div>
          <button className="link-btn contact__ask" onClick={() => onAsk()}>
            <Icon name="chat" size={16} /> Or ask the Nerissa AI a question first
          </button>
        </div>

        <div className="connect">
          <h3>Connect with me</h3>
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target={l.icon === "mail" ? undefined : "_blank"} rel="noreferrer">
                  <Icon name={l.icon} size={20} />
                  <span>
                    <strong>{l.label}</strong>
                    <small>{l.value}</small>
                  </span>
                </a>
                {l.icon === "mail" && (
                  <button className="connect__copy" onClick={copyEmail}>
                    {copied ? "Copied" : "Copy"}
                  </button>
                )}
              </li>
            ))}
            <li>
              <a href={RESUME.file} download>
                <Icon name="download" size={20} />
                <span>
                  <strong>Resume</strong>
                  <small>Solutions Engineer · PDF</small>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <footer className="footer">
        <span className="signature">{PROFILE.first} {PROFILE.last}</span>
        <div className="footer__icons">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={18} /></a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
          <a href={`mailto:${PROFILE.email}`} aria-label="Email"><Icon name="mail" size={18} /></a>
        </div>
        <span className="footer__loc">
          © 2026 · {PROFILE.locationShort} <Icon name="heart" size={13} className="accent" />
        </span>
      </footer>
    </section>
  );
}
