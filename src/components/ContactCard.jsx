import { useState } from "react";

export default function ContactCard({ data }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="contact-card"
      style={{
        background: data.cardBg,
        border: `1px solid ${data.accentColor}25`,
      }}
    >
      {/* Header */}
      <div
        className="contact-card__header"
        style={{
          borderBottom: `1px solid ${data.accentColor}20`,
          background: `${data.accentColor}08`,
        }}
      >
        <span className="contact-card__icon"><img src="/icons/chat.png" alt="Contact" width="22" height="22" style={{ filter: data.textColor === "#ffffff" ? "invert(1)" : "none" }} /></span>
        <span className="contact-card__title" style={{ color: data.textColor }}>
          Contact Me
        </span>
      </div>

      {/* Body */}
      <div className="contact-card__body">
        <p className="contact-card__desc" style={{ color: data.subtleColor }}>
          Interested in working together or have a question? Reach out through any of these channels.
        </p>

        <div className="contact-card__links">
          {/* Email */}
          <div
            className="contact-item"
            style={{
              background: `${data.textColor}05`,
              border: `1px solid ${data.textColor}10`,
            }}
          >
            <div
              className="contact-item__icon"
              style={{ background: `${data.accentColor}20` }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#EA4335"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
            </div>
            <div className="contact-item__info">
              <div className="contact-item__label" style={{ color: data.textColor }}>
                Email
              </div>
              <div className="contact-item__value" style={{ color: data.subtleColor }}>
                {data.email}
              </div>
            </div>
            <button
              className="contact-item__btn"
              onClick={copyEmail}
              style={{
                background: copied ? "transparent" : data.accentColor,
                color: copied ? data.accentColor : "#fff",
                border: copied ? `1px solid ${data.accentColor}60` : "none",
              }}
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>

          {/* LinkedIn */}
          <a
            href={data.linkedin}
            target="_blank"
            rel="noreferrer"
            className="contact-item contact-item--link"
            style={{
              background: `${data.textColor}05`,
              border: `1px solid ${data.textColor}10`,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              className="contact-item__icon"
              style={{ background: "#0077b520" }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </div>
            <div className="contact-item__info">
              <div className="contact-item__label" style={{ color: data.textColor }}>
                LinkedIn
              </div>
              <div className="contact-item__value" style={{ color: data.subtleColor }}>
                /in/nerissabautista
              </div>
            </div>
            <span
              className="contact-item__btn"
              style={{
                background: data.accentColor,
                color: "#fff",
                border: "none",
              }}
            >
              Visit
            </span>
          </a>

          {/* GitHub */}
          <a
            href={data.github}
            target="_blank"
            rel="noreferrer"
            className="contact-item contact-item--link"
            style={{
              background: `${data.textColor}05`,
              border: `1px solid ${data.textColor}10`,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              className="contact-item__icon"
              style={{ background: `${data.textColor}15` }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill={data.textColor}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </div>
            <div className="contact-item__info">
              <div className="contact-item__label" style={{ color: data.textColor }}>
                GitHub
              </div>
              <div className="contact-item__value" style={{ color: data.subtleColor }}>
                /nerissabautista
              </div>
            </div>
            <span
              className="contact-item__btn"
              style={{
                background: data.accentColor,
                color: "#fff",
                border: "none",
              }}
            >
              Visit
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
