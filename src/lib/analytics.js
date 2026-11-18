// Google Analytics 4. Loads only when VITE_GA_ID is set (e.g. G-XXXXXXXXXX in Vercel env vars),
// so local dev and preview builds without the ID send nothing.
const GA_ID = import.meta.env.VITE_GA_ID;

export function initAnalytics() {
  if (!GA_ID || typeof window === "undefined" || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  trackClicks();
}

// One listener for the whole page: every button or link click becomes a "button_click" event
// with its label and the section it's in. Only the button's visible text is sent, never form input.
function trackClicks() {
  document.addEventListener(
    "click",
    (e) => {
      const el = e.target.closest?.("button, a, [role=button], label.plan");
      if (!el) return;
      const label = (el.getAttribute("aria-label") || el.innerText || el.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 80);
      const area = el.closest("[role=dialog]")
        ? el.closest("[role=dialog]").getAttribute("aria-labelledby")?.replace(/-title$/, "") || "dialog"
        : el.closest("section[id], nav, header, footer, aside")?.id || el.closest("nav, header, footer, aside")?.tagName.toLowerCase() || "page";
      const href = el.tagName === "A" ? el.getAttribute("href") || "" : "";
      track("button_click", {
        button_label: label || "(icon)",
        button_section: area,
        link_url: href.startsWith("mailto:") ? "mailto" : href.startsWith("tel:") ? "tel" : href.slice(0, 200),
      });
    },
    { capture: true }
  );
}

// Sends a GA4 event; a no-op when analytics isn't configured.
export function track(event, params = {}) {
  if (typeof window !== "undefined" && window.gtag) window.gtag("event", event, params);
}
