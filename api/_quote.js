// Server-only: validates a quote request and sends two emails through your SMTP mailbox.
//   1. A lead alert to you (QUOTE_TO, defaults to SMTP_USER)
//   2. A branded confirmation to the client
// Used by api/quote.js on Vercel and by the dev middleware in vite.config.js.
//
// Env vars (set in Vercel → Project → Settings → Environment Variables, and in .env.local):
//   SMTP_HOST   e.g. mail.neribautista.net (GreenGeeks: cPanel → Email Accounts → Connect Devices)
//   SMTP_PORT   465 (SSL) or 587 (STARTTLS)
//   SMTP_USER   info@neribautista.net
//   SMTP_PASS   that mailbox's password
//   QUOTE_TO    optional, where lead alerts go (defaults to SMTP_USER)
//   QUOTE_OUTBOX optional, dev only: write emails as .html files to this folder instead of sending
import nodemailer from "nodemailer";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE = "https://neribautista.net";
const BRAND_RED = "#E50914";

const PLANS = {
  starter: { name: "Starter Website", price: 750 },
  business: { name: "Business Website", price: 1800 },
  ai: { name: "AI-Powered Website", price: 3500 },
  unsure: { name: "Not sure yet", price: null },
};
const MEETING_TYPES = { video: "Video call (Google Meet)", phone: "Phone call" };

const fail = (status, message) => Object.assign(new Error(message), { status, expose: true });

const clean = (v, max) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "");
const oneLine = (v, max) => clean(v, max).replace(/[\r\n]+/g, " ");
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const money = (n) => `$${n.toLocaleString("en-US")}`;

// ─── Validation ──────────────────────────────────────────────────────────────

function validTimeZone(tz) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

// Converts a wall-clock date/time in `tz` to a UTC Date.
function zonedToUtc(date, time, tz) {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
      .formatToParts(new Date(guess))
      .map((p) => [p.type, p.value])
  );
  const asIfUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return new Date(guess - (asIfUtc - guess));
}

export function parseQuote(body = {}) {
  // Bots fill hidden fields and submit instantly; pretend success so they move on.
  if (clean(body.website_url_confirm, 200)) return { spam: true };
  if (Number(body.elapsedMs) > 0 && Number(body.elapsedMs) < 2500) return { spam: true };

  const q = {
    plan: PLANS[body.plan] ? body.plan : "unsure",
    name: oneLine(body.name, 100),
    email: oneLine(body.email, 160).toLowerCase(),
    phone: oneLine(body.phone, 40),
    business: oneLine(body.business, 120),
    website: oneLine(body.website, 200),
    notes: clean(body.notes, 3000),
    date: oneLine(body.date, 10),
    time: oneLine(body.time, 5),
    timeZone: oneLine(body.timeZone, 64) || "America/Chicago",
    meetingType: MEETING_TYPES[body.meetingType] ? body.meetingType : "video",
  };

  if (q.name.length < 2) throw fail(400, "Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(q.email)) throw fail(400, "Please enter a valid email address.");
  if (q.phone.replace(/\D/g, "").length < 7) throw fail(400, "Please enter a valid phone number.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(q.date) || !/^\d{2}:\d{2}$/.test(q.time)) throw fail(400, "Please pick a meeting date and time.");
  if (!validTimeZone(q.timeZone)) q.timeZone = "America/Chicago";

  q.start = zonedToUtc(q.date, q.time, q.timeZone);
  if (Number.isNaN(q.start.getTime()) || q.start.getTime() < Date.now()) throw fail(400, "Please pick a meeting time in the future.");
  q.end = new Date(q.start.getTime() + 30 * 60 * 1000);
  return q;
}

// ─── Formatting helpers ──────────────────────────────────────────────────────

function meetingLabel(q, tz = q.timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(q.start);
}

const gcalStamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

function calendarLink(q) {
  const plan = PLANS[q.plan].name;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Website consultation: ${q.name}`,
    dates: `${gcalStamp(q.start)}/${gcalStamp(q.end)}`,
    details: `Plan: ${plan}\nPhone: ${q.phone}\nEmail: ${q.email}\n\n${q.notes}`,
    add: q.email,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// ─── Email layout (table-based with inline styles so it renders in Gmail/Outlook/Apple Mail) ──

function layout({ preheader, heading, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${esc(heading)}</title>
</head>
<body style="margin:0;padding:0;background:#f2f2f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#141414;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f4;">
  <tr><td align="center" style="padding:32px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
      <tr><td style="background:#0c0e14;padding:22px 32px;">
        <a href="${SITE}" style="text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:22px;font-weight:900;letter-spacing:1px;color:${BRAND_RED};">NERISSA</a>
        <span style="float:right;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#a4a7b4;line-height:26px;">Websites &amp; AI</span>
      </td></tr>
      <tr><td style="height:4px;background:${BRAND_RED};font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:36px 32px 8px;">
        <h1 style="margin:0 0 12px;font-size:26px;line-height:1.25;font-weight:800;color:#141414;">${heading}</h1>
        ${body}
      </td></tr>
      <tr><td style="padding:24px 32px 32px;border-top:1px solid #ececf0;font-size:12px;line-height:1.6;color:#8a8d99;">
        Nerissa Bautista · Solutions Engineer · Austin, TX<br>
        <a href="${SITE}" style="color:#8a8d99;">neribautista.net</a> · <a href="mailto:info@neribautista.net" style="color:#8a8d99;">info@neribautista.net</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

const p = (html) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#3d3f48;">${html}</p>`;

const button = (href, label, primary = true) =>
  `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 10px 0;padding:13px 22px;border-radius:999px;font-size:14px;font-weight:700;text-decoration:none;${
    primary ? `background:${BRAND_RED};color:#ffffff;` : "background:#ffffff;color:#141414;border:1.5px solid #d6d7dd;"
  }">${esc(label)}</a>`;

function detailRows(rows) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;border:1px solid #ececf0;border-radius:12px;border-collapse:separate;overflow:hidden;">
${rows
  .filter(([, v]) => v)
  .map(
    ([k, v], i) => `<tr>
  <td style="padding:12px 16px;width:38%;font-size:13px;color:#8a8d99;vertical-align:top;${i ? "border-top:1px solid #ececf0;" : ""}">${esc(k)}</td>
  <td style="padding:12px 16px;font-size:14px;font-weight:600;color:#141414;vertical-align:top;${i ? "border-top:1px solid #ececf0;" : ""}">${v}</td>
</tr>`
  )
  .join("\n")}
</table>`;
}

function planPill(q) {
  const plan = PLANS[q.plan];
  return `<span style="display:inline-block;padding:6px 12px;border-radius:999px;background:#fde8e9;color:${BRAND_RED};font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">${esc(plan.name)}</span>`;
}

// ─── The two emails ──────────────────────────────────────────────────────────

function ownerEmail(q) {
  const plan = PLANS[q.plan];
  const first = q.name.split(" ")[0];
  const site = q.website && (/^https?:\/\//i.test(q.website) ? q.website : `https://${q.website}`);
  const body = `
${planPill(q)}
<div style="height:16px;"></div>
${p(`<strong>${esc(q.name)}</strong>${q.business ? ` from <strong>${esc(q.business)}</strong>` : ""} requested a website quote and a free consultation.`)}
${detailRows([
  ["Plan", `${esc(plan.name)}${plan.price ? ` · from ${money(plan.price)}` : ""}`],
  ["Requested meeting", `${esc(meetingLabel(q))}<br><span style="font-weight:400;color:#8a8d99;">${esc(meetingLabel(q, "America/Chicago"))} your time</span>`],
  ["Meeting type", esc(MEETING_TYPES[q.meetingType])],
  ["Email", `<a href="mailto:${esc(q.email)}" style="color:${BRAND_RED};">${esc(q.email)}</a>`],
  ["Phone", `<a href="tel:${esc(q.phone.replace(/[^\d+]/g, ""))}" style="color:${BRAND_RED};">${esc(q.phone)}</a>`],
  ["Business", esc(q.business)],
  ["Current website", site ? `<a href="${esc(site)}" style="color:${BRAND_RED};">${esc(q.website)}</a>` : ""],
])}
${
  q.notes
    ? `<div style="margin:0 0 24px;padding:16px 18px;background:#f7f7f9;border-left:4px solid ${BRAND_RED};border-radius:8px;font-size:14px;line-height:1.65;color:#3d3f48;white-space:pre-wrap;">${esc(q.notes)}</div>`
    : ""
}
<div style="margin:0 0 20px;">
  ${button(calendarLink(q), "Add to Google Calendar")}
  ${button(`mailto:${q.email}?subject=${encodeURIComponent(`Your website consultation, ${first}`)}`, `Reply to ${first}`, false)}
</div>`;
  return {
    subject: `New quote request: ${plan.name} · ${q.name}`,
    html: layout({ preheader: `${q.name} · ${plan.name} · ${meetingLabel(q, "America/Chicago")}`, heading: "New website lead", body }),
    text: [
      `New quote request from ${q.name}`,
      `Plan: ${plan.name}`,
      `Meeting: ${meetingLabel(q)} (${MEETING_TYPES[q.meetingType]})`,
      `Email: ${q.email}`,
      `Phone: ${q.phone}`,
      q.business && `Business: ${q.business}`,
      q.website && `Website: ${q.website}`,
      q.notes && `\nNotes:\n${q.notes}`,
      `\nAdd to calendar: ${calendarLink(q)}`,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

function clientEmail(q) {
  const plan = PLANS[q.plan];
  const first = q.name.split(" ")[0];
  const step = (n, title, text) => `<tr>
  <td style="width:36px;padding:0 0 18px;vertical-align:top;"><span style="display:inline-block;width:28px;height:28px;border-radius:50%;background:#141414;color:#ffffff;font-size:13px;font-weight:700;line-height:28px;text-align:center;">${n}</span></td>
  <td style="padding:2px 0 18px;vertical-align:top;font-size:14px;line-height:1.6;color:#3d3f48;"><strong style="color:#141414;">${title}</strong><br>${text}</td>
</tr>`;
  const body = `
${p(`Thanks for reaching out! I got your request for a <strong>${esc(plan.name)}</strong> and I'm excited to hear about your project.`)}
${detailRows([
  ["Plan", `${esc(plan.name)}${plan.price ? ` · from ${money(plan.price)}` : ""}`],
  ["Requested meeting", esc(meetingLabel(q))],
  ["Meeting type", esc(MEETING_TYPES[q.meetingType])],
  ["Business", esc(q.business)],
])}
<h2 style="margin:8px 0 16px;font-size:16px;font-weight:800;color:#141414;">What happens next</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  ${step(1, "I confirm your time", "Within 1 business day I'll confirm your meeting or suggest a nearby time.")}
  ${step(2, "Free consultation", "A relaxed 30-minute call about your goals, your customers, and what your site needs to do.")}
  ${step(3, "Your custom quote", "You get a clear quote with scope, timeline, and price. No payment until you approve it.")}
</table>
${p("Have a logo, photos, or sites you love? Just reply to this email and send them over.")}
<div style="margin:4px 0 24px;">${button(`${SITE}/#trending`, "See my recent work")}</div>
${p(`Talk soon,<br><strong style="color:#141414;">Nerissa Bautista</strong><br><span style="color:#8a8d99;">Solutions Engineer · Websites &amp; AI</span>`)}`;
  return {
    subject: `You're booked in, ${first}! Your website quote request`,
    html: layout({
      preheader: `I got your ${plan.name} request. Here's what happens next.`,
      heading: `Thanks, ${esc(first)}! Your request is in.`,
      body,
    }),
    text: [
      `Thanks, ${first}! Your request is in.`,
      ``,
      `Plan: ${plan.name}`,
      `Requested meeting: ${meetingLabel(q)} (${MEETING_TYPES[q.meetingType]})`,
      ``,
      `What happens next:`,
      `1. Within 1 business day I'll confirm your meeting or suggest a nearby time.`,
      `2. A 30-minute call about your goals and what your site needs to do.`,
      `3. A clear quote with scope, timeline, and price. No payment until you approve it.`,
      ``,
      `Reply to this email anytime.`,
      `Nerissa Bautista · ${SITE}`,
    ].join("\n"),
  };
}

// ─── Sending ─────────────────────────────────────────────────────────────────

export function buildEmails(q) {
  return { owner: ownerEmail(q), client: clientEmail(q) };
}

export async function sendQuote(body, env = process.env) {
  const q = parseQuote(body);
  if (q.spam) return { ok: true };

  const { owner, client } = buildEmails(q);
  const from = env.SMTP_USER || "info@neribautista.net";
  const to = env.QUOTE_TO || from;

  if (env.QUOTE_OUTBOX) {
    const dir = path.resolve(env.QUOTE_OUTBOX);
    await mkdir(dir, { recursive: true });
    const stamp = Date.now();
    await writeFile(path.join(dir, `${stamp}-owner.html`), owner.html);
    await writeFile(path.join(dir, `${stamp}-client.html`), client.html);
    return { ok: true, outbox: dir };
  }

  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) throw fail(503, "Email is not configured yet.");
  const port = Number(env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });

  // Lead alert first: if this fails, the client shouldn't get a confirmation for a lead you never saw.
  await transport.sendMail({ from: `"Website Quotes" <${from}>`, to, replyTo: `"${q.name}" <${q.email}>`, ...owner });
  await transport.sendMail({ from: `"Nerissa Bautista" <${from}>`, to: q.email, replyTo: from, ...client });
  return { ok: true };
}
