// Answers visitor questions about Nerissa.
// Primary: Gemini via the /api/ask server function (api/_gemini.js holds the prompt).
// Fallback: the keyword answers below, used if the server can't be reached.
import { PROFILE, PROJECTS, EXPERIENCE, SEASON_ONE, SKILLS } from "../data/siteData";
import { PRESENT } from "../data/portfolioData";

export const SUGGESTIONS = [
  "What experience does Nerissa have with AI?",
  "Show me her strongest Python project",
  "Has she built anything for businesses?",
  "What did she do at Rowan?",
  "Why would she be a good Solutions Engineer?",
];

const P = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));

// Keys include common Tagalog/Taglish words so mixed-language questions still match.
// These are only the offline fallback; Gemini handles every language.
const INTENTS = [
  {
    keys: ["software", "developer", "dev", "engineer", "engineering", "coding", "programming", "full stack", "full-stack", "karanasan"],
    answer: () =>
      "Nerissa is a Solutions Engineer at Nalo Seed, where she builds and maintains full-stack apps across 30+ client repositories with React, Next.js, TypeScript, Node.js, and PostgreSQL, including AI voice agents and customer service assistants. Before that, she spent Sept 2023 to May 2026 as an Application Developer Intern at Rowan University IRT, building a Django URL shortener for 15,000+ users and cutting redirect latency 75% with Redis. She has also shipped FlightAdvsr, Restaurant Depot, and Bandito's, and led the UniRide capstone team.",
    sources: ["Nalo Seed", "Rowan IRT", "Projects"],
  },
  {
    keys: ["ai", "llm", "gemini", "openai", "azure", "claude", "machine learning", "artificial"],
    answer: () =>
      "As a Solutions Engineer at Nalo Seed, Nerissa builds AI voice agents and customer service assistants for clients using Gemini, Claude, OpenAI Codex, and Retell AI. Earlier, at Rowan University's IRT, she prototyped an AI document-processing pipeline with Azure OpenAI and Azure Blob Storage that extracts structured data from program guides to answer degree-planning questions, and she uses GitHub Copilot and Claude daily for code generation and debugging. On her own projects she built a Gemini-powered travel agent in FlightAdvsr that handles natural-language requests and checks visa rules across 190+ countries, plus a Gemini shopping assistant for Restaurant Depot that guides members through enrollment and support.",
    sources: ["Nalo Seed", "Rowan IRT", "FlightAdvsr"],
    project: "flightadvsr",
  },
  {
    keys: ["python", "django", "redis", "oracle", "backend", "strongest", "url shortener"],
    answer: () =>
      "Her strongest Python work is the Rowan URL Shortener: a Django app serving 15,000+ university users. She designed a 10-table Oracle schema, added Redis caching that cut redirect latency by 75% (~200ms to under 50ms), and deployed it on a fault-tolerant NGINX/Gunicorn stack.",
    sources: ["Rowan URL Shortener", "Rowan IRT"],
    project: "rowan-url",
  },
  {
    keys: ["business", "client", "freelance", "negosyo", "kliyente", "company", "companies", "commerce", "website", "shop", "bandito"],
    answer: () =>
      "Yes, it's her day job. As a Solutions Engineer at Nalo Seed she builds and maintains apps across 30+ client repositories for businesses in roofing, real estate, healthcare, and food services, and turns prospect requirements into demos and proofs of concept. She also built Bandito's, a client site for an Austin card and comic shop with an instant cash-or-trade estimate calculator, a consignment admin dashboard, and event sign-ups. She also rebuilt Restaurant Depot's storefront with a Gemini assistant in 10 days and built a MERN ordering platform for Julius Silvert. Before tech, she spent 7+ years in sales and business development, so she understands the business side too.",
    sources: ["Bandito's", "Restaurant Depot", "Julius Silvert"],
    project: "banditos",
  },
  {
    keys: ["rowan", "intern", "irt", "university", "school", "nag-aral", "paaralan", "eskwela", "degree", "education", "graduat"],
    answer: () =>
      `At Rowan University's Information Resources & Technology she was an Application Developer Intern from Sept 2023 to May 2026: building a Django URL shortener for 15,000+ users, designing Oracle schemas, adding Redis caching, writing automated tests, and prototyping an Azure OpenAI document pipeline. She earned a ${PRESENT.education.degree} Summa Cum Laude in May 2026 and is continuing with an M.S. in Cybersecurity.`,
    sources: ["Rowan IRT", "Education"],
  },
  {
    keys: ["solutions", "analyst", "relevant", "fit", "hire", "why", "role", "position", "strength", "nalo", "current", "job", "ngayon", "kasalukuyan"],
    answer: () =>
      "She's already doing the job: as a Solutions Engineer at Nalo Seed she translates client requirements into demos, prototypes, and production apps across 30+ repositories, including AI voice agents built with Retell AI. Before tech she spent 7+ years in sales, account management, and business development, so she's comfortable in front of customers, not just in the codebase. That mix of client-facing experience and full-stack + AI engineering is what solutions roles need.",
    sources: ["Nalo Seed", "Season 1: Business", "Skills"],
  },
  {
    keys: ["skill", "stack", "language", "framework", "tech", "tools", "kasanayan", "kakayahan"],
    answer: () =>
      Object.entries(SKILLS)
        .map(([k, v]) => `${k}: ${v.join(", ")}.`)
        .join(" "),
    sources: ["Skills"],
  },
  {
    keys: ["sales", "past", "background", "before", "dati", "noon", "nakaraan", "pinagmulan", "career change", "pivot", "philippines", "story"],
    answer: () =>
      `Before tech, Nerissa spent 7+ years in the Philippines across automotive, hospitality, and forex: ${SEASON_ONE.slice(-3)
        .reverse()
        .map((e) => `${e.title} at ${e.company}`)
        .join(", ")}, and later demand management at OYO and account management in forex. She moved to New Jersey and pivoted to software at Rowan University in 2023.`,
    sources: ["Season 1: Business", "Origin Story"],
  },
  {
    keys: ["travel", "flight", "visa", "react native", "mobile", "expo"],
    answer: () => `${P.flightadvsr.story} It's built with ${P.flightadvsr.tags.join(", ")}.`,
    sources: ["FlightAdvsr"],
    project: "flightadvsr",
  },
  {
    keys: ["carpool", "uniride", "capstone", "team", "lead"],
    answer: () => `${P.uniride.story} Impact: ${P.uniride.impact.join("; ")}.`,
    sources: ["UniRide"],
    project: "uniride",
  },
  {
    keys: ["project", "built", "portfolio", "work", "proyekto", "ginawa"],
    answer: () =>
      `Her live projects are FlightAdvsr (AI travel assistant), Restaurant Depot (AI shopping assistant), and Bandito's (client site for a card shop). She also built UniRide, Julius Silvert, and the Rowan URL Shortener, which serves 15,000+ users.`,
    sources: ["FlightAdvsr", "Restaurant Depot", "Bandito's"],
  },
  {
    keys: ["contact", "email", "reach", "kontak", "makausap", "linkedin", "available", "resume", "cv"],
    answer: () =>
      `You can email her at ${PROFILE.email} or connect on LinkedIn. Her Solutions Engineer resume is in the Contact section at the bottom of the page.`,
    sources: ["Contact"],
  },
];

function localAnswer(question) {
  const q = question.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    // Short keys ("ai", "cv") must match whole words so "email" isn't an AI question.
    const hit = (k) => (k.length <= 3 ? new RegExp(`\\b${k}\\b`).test(q) : q.includes(k));
    const score = intent.keys.reduce((s, k) => s + (hit(k) ? k.length : 0), 0);
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  if (!best) {
    return {
      text: "I'm a small assistant that only knows Nerissa's portfolio. Try asking about her AI work, her Rowan internship, a specific project, or how to contact her.",
      sources: [],
    };
  }
  return { text: best.answer(), sources: best.sources, project: best.project };
}

// Sends the question (plus recent chat history) to the /api/ask server function,
// which calls Gemini with the API key kept on the server. Gemini understands and
// replies in whatever language the visitor writes in.
// If Gemini fails, skip it for a minute so visitors aren't stuck waiting on every question.
const RETRY_AFTER_MS = 60_000;
let serverDownAt = 0;

async function serverAnswer(question, history) {
  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, history }),
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error(`ask ${res.status}`);
  const { text } = await res.json();
  if (!text) throw new Error("Empty answer");
  return text;
}

// Falls back to the built-in keyword answers (English only) if the server is unavailable.
export async function ask(question, history = []) {
  const local = localAnswer(question);
  if (Date.now() - serverDownAt < RETRY_AFTER_MS) return local;
  try {
    return { ...local, text: await serverAnswer(question, history) };
  } catch {
    serverDownAt = Date.now();
    if (local.sources.length) return local;
    return {
      text: "My AI is busy right now, so I can only answer simple questions in English for a moment. Try asking about her sales background, AI work, projects, or how to contact her, or try again in a minute.",
      sources: [],
    };
  }
}
