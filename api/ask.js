// Vercel serverless function: POST /api/ask { question, history } -> { text }
import { askGemini } from "./_gemini.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const text = await askGemini(body);
    return res.status(200).json({ text });
  } catch (err) {
    console.error("[ask]", err.message);
    return res.status(err.status || 500).json({ error: "Assistant unavailable" });
  }
}
