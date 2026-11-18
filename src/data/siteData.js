// Site content for the redesign. Facts come from portfolioData.js —
// this file only reshapes them for the new sections.
import { PRESENT, PAST } from "./portfolioData.js";

export const PROFILE = {
  first: "Nerissa",
  last: "Bautista",
  nickname: "Neri",
  eyebrow: ["Solutions", "AI", "Software"],
  pitch:
    "I build intelligent systems and digital products that turn complicated problems into simpler experiences.",
  bio: PRESENT.bio,
  location: PRESENT.location,
  locationShort: "Austin, TX",
  email: PRESENT.email,
  linkedin: PRESENT.linkedin,
  github: PRESENT.github,
  roles: ["Solutions Engineer", "Developer", "AI Builder", "Problem Solver"],
  exploring: ["AI", "Automation", "Product", "Cybersecurity"],
  previously: ["Rowan University IRT", "Sales & Business Development"],
  photos: {
    hero: "/images/neri-side.webp",
    portrait: "/images/neri-portrait.webp",
    avatar: "/images/neri-avatar-formal.webp",
  },
};

export const SECTION_ORDER = ["trending", "about", "lab", "experience", "plans", "contact"];

// ─── Projects ────────────────────────────────────────────────────────────────

const byTitle = (t) => PRESENT.projects.find((p) => p.title.startsWith(t));
const rowan = PRESENT.experience.find((e) => e.company.includes("Rowan"));

export const CATEGORIES = [
  { id: "ai", label: "AI & Automation", icon: "cpu" },
  { id: "swe", label: "Software Engineering", icon: "code" },
  { id: "product", label: "Product", icon: "sparkles" },
  { id: "web", label: "Web & Mobile", icon: "smartphone" },
];

export const PROJECTS = [
  {
    ...byTitle("FlightAdvsr"),
    id: "flightadvsr",
    screenshot: "/images/projects/flightadvsr.webp",
    name: "FlightAdvsr",
    tagline: "Your AI travel assistant for flights and visa requirements.",
    live: byTitle("FlightAdvsr").link,
    categories: ["ai", "web", "product"],
    cover: { icon: "plane", from: "#3b1c5a", via: "#b33a4a", to: "#f08a5d" },
    story:
      "Planning international travel means juggling flight searches and visa rules that change with every passport. FlightAdvsr puts both in one cross-platform app, with a Gemini-powered travel agent that understands plain-language requests.",
    impact: [
      "Visa rules evaluated per passport across 190+ countries",
      "Natural-language travel requests handled by a Gemini agent",
      "Cross-platform React Native (Expo) app, live on Vercel",
    ],
  },
  {
    ...byTitle("Restaurant Depot"),
    id: "restaurant-depot",
    screenshot: "/images/projects/restaurant-depot.webp",
    name: "Restaurant Depot",
    tagline: "A wholesale storefront rebuilt from scratch, with a Gemini shopping assistant.",
    live: byTitle("Restaurant Depot").link,
    categories: ["ai", "web", "product"],
    cover: { icon: "store", from: "#1f2a38", via: "#7a2f1f", to: "#e0a458" },
    story:
      "An interview challenge: redesign a wholesale food distributor's website in ten days. I rebuilt it in React and added a Gemini assistant that walks members through enrollment and support.",
    impact: [
      "Full redesign shipped in a 10-day timeline",
      "AI assistant guides members through enrollment and support",
      "Production deploy on Vercel",
    ],
  },
  {
    id: "banditos",
    screenshot: "/images/projects/banditos.webp",
    name: "Bandito's",
    title: "Bandito's Cards, Comics & Collectibles",
    subtitle: "Client Website — Trading Card & Comic Shop",
    tagline: "A storefront, buy list, and events hub for an Austin card shop.",
    period: "2026",
    context: "Client Demo",
    live: "https://banditos-demo-client-mauve.vercel.app/",
    highlights: [
      "Built an instant cash-or-trade estimate calculator from the shop's posted buy list",
      "Designed a consignment flow with an admin dashboard for queue and showroom management",
      "Added an events calendar with sign-ups for weekly TCG play nights",
      "Showcased live in-stock inventory from the shop's display case",
    ],
    tags: ["React", "React Router", "Vite", "Vercel"],
    genre: "CLIENT",
    categories: ["web", "product"],
    cover: { icon: "cards", from: "#2a0f0c", via: "#7d241b", to: "#e7b04a" },
    story:
      "Bandito's is a local card, comic, and collectibles shop. The site lets collectors get an instant cash-or-trade offer before driving over, consign their collections, and sign up for game nights, while the owner manages consignments from an admin dashboard.",
    impact: [
      "Instant cash or store-credit estimates before a visit",
      "Consignment queue & showroom managed from one dashboard",
      "Weekly play schedule with event sign-ups",
    ],
  },
  {
    ...byTitle("UniRide"),
    id: "uniride",
    name: "UniRide",
    tagline: "A verified-student carpool app for Rowan University commuters.",
    code: byTitle("UniRide").link,
    categories: ["swe", "web", "product"],
    cover: { icon: "car", from: "#0f2a2e", via: "#1f5f5b", to: "#9bd4a6" },
    story:
      "Commuting to campus is expensive. As capstone team lead, I guided four developers building rider and driver dashboards, real-time ride requests, and Google Maps routing, all limited to verified university accounts.",
    impact: [
      "Commute costs of $1–2 per mile vs. commercial ride-share",
      "100% verified-user access via university email auth",
      "Led a 4-member capstone team",
    ],
  },
  {
    ...byTitle("E-commerce Platform"),
    id: "julius-silvert",
    name: "Julius Silvert",
    tagline: "A MERN ordering platform for a wholesale distributor.",
    code: byTitle("E-commerce Platform").link,
    context: "Personal Project",
    categories: ["swe", "web"],
    cover: { icon: "package", from: "#26170f", via: "#6b3a1f", to: "#d98e4a" },
    story:
      "Wholesale buyers need to reorder fast. I built a full-stack MERN ordering app with a streamlined, responsive catalog that cuts friction from browsing to checkout.",
    impact: [
      "~30% more efficient user navigation",
      "Real-time product management in production",
      "Responsive UI built with Tailwind",
    ],
  },
  {
    id: "rowan-url",
    name: "Rowan URL Shortener",
    title: "Rowan URL Shortener",
    subtitle: "Enterprise link service for Rowan University",
    tagline: "A production URL shortener serving 15,000+ university users.",
    period: rowan.period,
    context: "Rowan University IRT",
    highlights: [
      "Built, deployed, and monitored a full-stack URL shortener with Python, Django, and JavaScript",
      "Added a Redis caching layer that cut redirects from ~200ms to under 50ms",
      "Designed Oracle schemas across 10 tables with 4 data-migration scripts",
      "NGINX map files give O(1) redirects that keep working during backend outages",
    ],
    tags: ["Python", "Django", "Oracle", "Redis", "NGINX"],
    categories: ["swe"],
    cover: { icon: "link", from: "#1a1030", via: "#5b1f3a", to: "#e50914" },
    story:
      "At Rowan's Information Resources & Technology, I built and deployed a full-stack URL shortener for the whole university, from Oracle schema design to a fault-tolerant NGINX/Gunicorn deployment.",
    impact: [
      "Serves 15,000+ university users",
      "Redirect latency cut 75% with Redis (~200ms → <50ms)",
      "O(1) hash-based redirects on a fault-tolerant deploy",
    ],
  },
];

// ─── AI Lab ──────────────────────────────────────────────────────────────────

export const LAB = [
  {
    id: "llm",
    label: "LLMs",
    icon: "brain",
    tools: [
      { name: "Azure OpenAI", note: "Document-processing pipeline for degree planning at Rowan IRT", icon: "cloud" },
      { name: "Gemini API", note: "FlightAdvsr travel agent · Restaurant Depot assistant", icon: "sparkle" },
      { name: "Claude", note: "Daily code generation, debugging & refactoring", icon: "sparkles" },
      { name: "GitHub Copilot", note: "AI pair programming across full-stack apps", icon: "github" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "server",
    tools: [
      { name: "Python", note: "Rowan URL shortener & automated tests", icon: "code" },
      { name: "Django + DRF", note: "Full-stack apps serving 15K+ users", icon: "layers" },
      { name: "Node.js", note: "UniRide & Julius Silvert APIs", icon: "server" },
      { name: "Express.js", note: "REST APIs for the MERN ordering platform", icon: "route" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "layout",
    tools: [
      { name: "React", note: "Restaurant Depot, Bandito's, UniRide", icon: "atom" },
      { name: "React Native + Expo", note: "FlightAdvsr, cross-platform", icon: "smartphone" },
      { name: "TypeScript", note: "FlightAdvsr", icon: "code" },
      { name: "Vite + Tailwind", note: "Fast, responsive web UIs", icon: "layout" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    icon: "cloud",
    tools: [
      { name: "Microsoft Azure", note: "Azure AI Foundry & OpenAI integrations", icon: "cloud" },
      { name: "Azure Blob Storage", note: "Source documents for the AI pipeline", icon: "database" },
      { name: "Vercel", note: "FlightAdvsr, Restaurant Depot, Bandito's", icon: "rocket" },
      { name: "AWS", note: "Cloud platform", icon: "cloud" },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: "database",
    tools: [
      { name: "Oracle", note: "10-table schema, 4 migration scripts", icon: "database" },
      { name: "Redis", note: "Caching that cut latency 75%", icon: "zap" },
      { name: "MongoDB", note: "Julius Silvert product data", icon: "database" },
      { name: "Supabase", note: "Auth & Postgres for app prototypes", icon: "database" },
    ],
  },
  {
    id: "tools",
    label: "DevOps",
    icon: "wrench",
    tools: [
      { name: "NGINX + Gunicorn", note: "Fault-tolerant, sub-millisecond redirects", icon: "server" },
      { name: "Git + GitHub", note: "Code reviews on a distributed team", icon: "github" },
      { name: "Docker", note: "Containerized environments", icon: "package" },
      { name: "JIRA + Agile", note: "Weekly standups & sprint tracking", icon: "list" },
    ],
  },
];

// ─── Origin story & experience ───────────────────────────────────────────────

export const ORIGIN = [
  { year: "2015", title: "Started in sales", body: "Mazda sales consultant in the Philippines" },
  { year: "2017", title: "Digital marketplaces", body: "Dealer success at OLX Group" },
  { year: "2020", title: "Hospitality & forex", body: "Demand at OYO, then three forex roles" },
  { year: "2023", title: "Pivot to tech", body: "Rowan University + IRT developer internship" },
  { year: "2025", title: "Team lead", body: "Led the UniRide capstone team" },
  { year: "2026", title: "Summa Cum Laude", body: "Graduated Rowan · M.S. Cybersecurity next" },
  { year: "Now", title: "Solutions Engineer", body: "Building client & AI solutions at Nalo Seed" },
];

export const EXPERIENCE = [
  {
    period: "Aug 2026 – Now",
    title: "Solutions Engineer",
    org: "Nalo Seed · Remote",
    badge: "Current",
    points: [
      "Develop and maintain full-stack apps across 30+ client repositories",
      "Turn prospect requirements into interactive demos, prototypes, and proofs of concept that win clients",
      "Build AI voice agents and customer service assistants with Gemini, Claude, OpenAI Codex, and Retell AI",
      "Modernize client sites in roofing, real estate, healthcare, and food services",
      "Ship admin workflows, reporting, REST APIs, and Google Analytics / Search Console integrations",
      "Validate releases with Vitest, Jest, and Playwright and support CI/CD improvements",
    ],
    tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Retell AI", "Playwright"],
  },
  {
    period: "2023 – 2026",
    title: rowan.title,
    org: "Rowan University · Information Resources & Technology",
    points: [
      "Built and deployed a Django URL shortener serving 15,000+ university users",
      "Cut redirect response time 75% (~200ms → <50ms) with a Redis caching layer",
      "Designed Oracle schemas across 10 tables and wrote 4 SQL migration scripts",
      "Architected NGINX/Gunicorn redirects with O(1) lookups that survive backend outages",
      "Prototyped an Azure OpenAI + Blob Storage pipeline for degree-planning queries",
      "Wrote automated tests for Django logic and API behavior before each deploy",
    ],
    tags: ["Python", "Django", "Oracle", "Redis", "NGINX", "Azure OpenAI", "GitHub"],
  },
  {
    period: "2025 – 2026",
    title: "Client, Personal & Capstone Projects",
    org: "Full-stack & AI development",
    points: [
      "Shipped FlightAdvsr and Restaurant Depot with Gemini-powered assistants",
      "Built the Bandito's storefront, buy list, and events site for a card shop",
      "Led the 4-member UniRide capstone team",
      "Built the Julius Silvert MERN ordering platform",
    ],
  },
  {
    period: "2023 – 2026",
    title: PRESENT.education.degree,
    org: "Rowan University · Summa Cum Laude",
    points: [`Next: ${PRESENT.education.next}`],
  },
];

export const SEASON_ONE = PAST.experience;
// Mirrors the Skills section of the Solutions Engineer resume.
export const SKILLS = {
  "Solutions Engineering": ["Requirements Analysis", "Solution Design", "Product Demos", "Prototypes & POCs", "Troubleshooting", "Client Delivery"],
  Languages: ["Python", "TypeScript", "JavaScript", "SQL"],
  Frontend: ["React", "Next.js", "React Native", "Expo", "Vite", "Tailwind CSS", "HTML/CSS"],
  "Backend & Data": ["Node.js", "Express.js", "Django", "REST APIs", "PostgreSQL", "MongoDB", "Supabase", "Redis", "Oracle"],
  AI: ["Azure OpenAI", "Gemini API", "Claude", "OpenAI Codex", "Retell AI", "Voice Agents", "Conversational AI", "Prompt Engineering"],
  "Cloud & DevOps": ["AWS", "Microsoft Azure", "Docker", "GitHub Actions", "CI/CD", "Vercel", "NGINX", "Gunicorn"],
  Testing: ["Vitest", "Jest", "Playwright", "Postman", "Code Reviews", "Agile"],
};

export const RESUME = {
  label: "Solutions Engineer Resume",
  file: "/resumes/Nerissa_Bautista_SolutionsEngineer.pdf",
};
