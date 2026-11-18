// Analytics via Google Tag Manager (VITE_GTM_ID, e.g. GTM-XXXXXXX) or, if you skip GTM,
// straight Google Analytics 4 (VITE_GA_ID, e.g. G-XXXXXXXXXX). Set one in Vercel env vars.
// Nothing loads when neither is set, so local dev and previews send no data.
const GTM_ID = import.meta.env.VITE_GTM_ID;
const GA_ID = import.meta.env.VITE_GA_ID;
let mode = null; // "gtm" | "ga" | null

function loadScript(src) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function initAnalytics() {
  if (typeof window === "undefined" || mode) return;
  window.dataLayer = window.dataLayer || [];
  if (GTM_ID) {
    mode = "gtm";
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
  } else if (GA_ID) {
    mode = "ga";
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  } else {
    return;
  }
  trackClicks();
}

// Sends an event. With GTM it becomes a dataLayer event you can trigger tags on
// (Trigger type: Custom Event); with GA4 it's a gtag event. No-op when analytics is off.
export function track(event, params = {}) {
  if (mode === "gtm") window.dataLayer.push({ event, ...params });
  else if (mode === "ga") window.gtag("event", event, params);
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
