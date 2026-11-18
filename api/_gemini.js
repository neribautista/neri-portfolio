// Server-only Gemini call for the "Ask Nerissa" chat. The API key never reaches the browser.
// Used by api/ask.js on Vercel and by the dev middleware in vite.config.js.
import { PROFILE, PROJECTS, EXPERIENCE, SEASON_ONE, SKILLS } from "../src/data/siteData.js";

const MAX_QUESTION = 600;
const MAX_TURNS = 8;

function portfolioFacts() {
  const projects = PROJECTS.map((p) => `- ${p.name}: ${p.tagline} (${p.tags.join(", ")}). ${p.impact.join("; ")}${p.live ? ` Live: ${p.live}` : ""}`).join("\n");
  const exp = EXPERIENCE.map((e) => `- ${e.title}, ${e.org} (${e.period}): ${e.points.join("; ")}`).join("\n");
  const biz = SEASON_ONE.map((e) => `- ${e.title}, ${e.company} (${e.period}): ${e.highlights.join("; ")}`).join("\n");
  const skills = Object.entries(SKILLS).map(([k, v]) => `${k}: ${v.join(", ")}`).join("\n");
  return `About: ${PROFILE.bio}\nLocation: ${PROFILE.location}\nContact: ${PROFILE.email} · LinkedIn: ${PROFILE.linkedin} · GitHub: ${PROFILE.github}\n\nProjects:\n${projects}\n\nExperience:\n${exp}\n\nEarlier business career (Philippines, 2015–2022):\n${biz}\n\nSkills:\n${skills}`;
}

// Edit this to change how the assistant behaves.
const INSTRUCTIONS = `You are "Ask Nerissa", a friendly assistant on Nerissa Bautista's portfolio website. Visitors are mostly recruiters and hiring managers.

Rules:
- Always reply in the same language (and writing system) the visitor used in their latest message, including mixed languages like Taglish or Spanglish. If they ask you to answer or write in a specific language, do that.
- Use only the facts below. If the facts don't cover something, say so politely and suggest contacting her by email.
- Refer to Nerissa in the third person.
- Keep answers short: 3 sentences or fewer unless the visitor asks for more detail.
- Plain text only, no markdown, bullet points, or asterisks.
- Only discuss Nerissa, her work, and her fit for roles. Politely decline unrelated requests.

Facts about Nerissa:
`;

export async function askGemini({ question, history } = {}, env = process.env) {
  const key = env.GEMINI_API_KEY;
  if (!key) throw Object.assign(new Error("GEMINI_API_KEY is not set"), { status: 503 });

  const q = typeof question === "string" ? question.trim().slice(0, MAX_QUESTION) : "";
  if (!q) throw Object.assign(new Error("Missing question"), { status: 400 });

  const past = (Array.isArray(history) ? history : [])
    .filter((m) => m && typeof m.text === "string" && (m.role === "user" || m.role === "bot"))
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role === "bot" ? "model" : "user", parts: [{ text: m.text.slice(0, 1500) }] }));

  const model = env.GEMINI_MODEL || "gemini-3.8-flash";
  const call = () => fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: INSTRUCTIONS + portfolioFacts() }] },
      contents: [...past, { role: "user", parts: [{ text: q }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 500,
        // Gemini models "think" by default, which can use up the output budget and return nothing.
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
    signal: AbortSignal.timeout(9000),
  });
  let res = await call();
  // Free-tier models sometimes return "high demand" (503) or rate limits (429); retry once.
  if (res.status === 503 || res.status === 429) {
    await new Promise((r) => setTimeout(r, 500));
    res = await call();
  }
  if (!res.ok) throw Object.assign(new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`), { status: 502 });
  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("").trim();
  if (!text) throw Object.assign(new Error("Empty Gemini response"), { status: 502 });
  return text;
}
