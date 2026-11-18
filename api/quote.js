// Vercel serverless function: POST /api/quote -> sends the lead alert + client confirmation emails.
import { sendQuote } from "./_quote.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    await sendQuote(body);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[quote]", err.message);
    const status = err.status || 500;
    return res.status(status).json({
      error: err.expose ? err.message : "Something went wrong sending your request. Please email info@neribautista.net.",
    });
  }
}
