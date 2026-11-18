import { useEffect, useMemo, useRef, useState } from "react";
import { PLANS, QUOTE_COPY, QUOTE_ENDPOINT, formatPrice } from "../data/quoteData";
import PlanCard from "./PlanCard";
import Icon from "./Icon";

const TIME_SLOTS = Array.from({ length: 23 }, (_, i) => {
  const mins = 8 * 60 + i * 30; // 8:00 AM – 7:00 PM
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  const label = `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  return { value, label };
});

const localDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const EMPTY = { name: "", email: "", phone: "", business: "", website: "", notes: "", date: "", time: "", meetingType: "video", website_url_confirm: "" };

// Netflix-style signup: step 1 pick a plan → step 2 book a consultation → done.
export default function QuoteModal({ initialPlan, onClose }) {
  const [step, setStep] = useState(initialPlan ? 2 : 1);
  const [plan, setPlan] = useState(initialPlan || "business");
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: "idle", error: "" });
  const panelRef = useRef(null);
  const openedAt = useRef(Date.now());

  const timeZone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Chicago", []);
  const minDate = useMemo(() => localDate(new Date(Date.now() + 24 * 3600 * 1000)), []);
  const chosen = PLANS.find((p) => p.id === plan);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
    panelRef.current?.querySelector("[data-autofocus]")?.focus();
  }, [step]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (status.state === "sending") return;
    setStatus({ state: "sending", error: "" });
    try {
      const res = await fetch(QUOTE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan, timeZone, elapsedMs: Date.now() - openedAt.current }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus({ state: "idle", error: "" });
      setStep(3);
    } catch (err) {
      setStatus({
        state: "idle",
        error: err.name === "TimeoutError" ? "That took too long. Please try again, or email info@neribautista.net." : err.message,
      });
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className={`quote ${step === 1 ? "quote--wide" : ""}`}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="icon-btn quote__close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={22} />
        </button>

        {step === 1 && (
          <>
            <p className="quote__step">Step 1 of 2</p>
            <h2 id="quote-title" className="quote__title">{QUOTE_COPY.pickTitle}</h2>
            <ul className="quote__perks">
              <li><Icon name="check" size={18} stroke={2.5} /> Free consultation, no commitment.</li>
              <li><Icon name="check" size={18} stroke={2.5} /> Custom quote tailored to your business.</li>
              <li><Icon name="check" size={18} stroke={2.5} /> No payment until you approve the scope.</li>
            </ul>
            <div className="plans plans--pick" role="radiogroup" aria-label="Website plans">
              {PLANS.map((p) => (
                <PlanCard key={p.id} as="label" plan={p} selected={plan === p.id} onSelect={() => setPlan(p.id)} />
              ))}
            </div>
            <p className="quote__note">{QUOTE_COPY.pickNote}</p>
            <div className="quote__actions">
              <button className="btn btn--primary btn--lg" onClick={() => setStep(2)} data-autofocus>
                Subscribe <Icon name="arrowRight" size={16} />
              </button>
              <button className="link-btn" onClick={() => { setPlan("unsure"); setStep(2); }}>
                Not sure yet? Skip to booking
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <form onSubmit={submit} noValidate={false}>
            <p className="quote__step">Step 2 of 2</p>
            <h2 id="quote-title" className="quote__title">{QUOTE_COPY.formTitle}</h2>
            <p className="quote__lead">{QUOTE_COPY.formNote}</p>

            <div className="quote__summary">
              <div>
                <small>Your plan</small>
                <strong>{chosen ? chosen.name : "Not sure yet, let's talk"}</strong>
                {chosen && <span>Starting at {formatPrice(chosen.price)}</span>}
              </div>
              <button type="button" className="link-btn" onClick={() => setStep(1)}>Change</button>
            </div>

            <div className="field-grid">
              <label className="field">
                <span>Full name *</span>
                <input required autoComplete="name" value={form.name} onChange={set("name")} data-autofocus maxLength={100} />
              </label>
              <label className="field">
                <span>Email *</span>
                <input required type="email" autoComplete="email" value={form.email} onChange={set("email")} maxLength={160} />
              </label>
              <label className="field">
                <span>Phone number *</span>
                <input required type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} maxLength={40} placeholder="(512) 555-0123" />
              </label>
              <label className="field">
                <span>Business name</span>
                <input autoComplete="organization" value={form.business} onChange={set("business")} maxLength={120} />
              </label>
              <label className="field field--full">
                <span>Current website <em className="field__opt">optional</em></span>
                <input
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  value={form.website}
                  onChange={set("website")}
                  onBlur={() => setForm((f) => ({ ...f, website: f.website.trim().replace(/\s+/g, "") }))}
                  maxLength={200}
                  placeholder="Paste your link, e.g. https://yourbusiness.com"
                />
                <small className="field__hint">Have a site already? Paste it so I can review it before our call. Leave blank if you're starting fresh.</small>
              </label>

              <fieldset className="field field--full">
                <legend>Preferred meeting time *</legend>
                <div className="field-row">
                  <input required type="date" min={minDate} value={form.date} onChange={set("date")} aria-label="Meeting date" />
                  <select required value={form.time} onChange={set("time")} aria-label="Meeting time">
                    <option value="" disabled>Pick a time</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <select value={form.meetingType} onChange={set("meetingType")} aria-label="Meeting type">
                    <option value="video">Video call</option>
                    <option value="phone">Phone call</option>
                  </select>
                </div>
                <small className="field__hint">Times are in your time zone ({timeZone.replace(/_/g, " ")}). 30-minute call.</small>
              </fieldset>

              <label className="field field--full">
                <span>Project details or questions</span>
                <textarea rows={4} value={form.notes} onChange={set("notes")} maxLength={3000} placeholder="What does your business do? What should the website help you with? Any sites you love?" />
              </label>

              {/* Honeypot: hidden from people, filled by bots. */}
              <label className="quote__hp" aria-hidden="true">
                Leave this empty
                <input tabIndex={-1} autoComplete="off" value={form.website_url_confirm} onChange={set("website_url_confirm")} />
              </label>
            </div>

            {status.error && <p className="quote__error" role="alert">{status.error}</p>}

            <div className="quote__actions">
              <button className="btn btn--primary btn--lg" type="submit" disabled={status.state === "sending"}>
                {status.state === "sending" ? "Sending…" : "Confirm Request"}
              </button>
              <button type="button" className="link-btn" onClick={() => setStep(1)}>
                <Icon name="arrowLeft" size={16} /> Back to plans
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="quote__done">
            <span className="quote__done-icon"><Icon name="check" size={34} stroke={2.5} /></span>
            <h2 id="quote-title" className="quote__title">You're all set, {form.name.split(" ")[0]}!</h2>
            <p className="quote__lead">
              Your request is in. A confirmation is on its way to <strong>{form.email}</strong>, and I'll reply within
              1 business day to confirm your meeting time.
            </p>
            <div className="quote__actions">
              <button className="btn btn--primary btn--lg" onClick={onClose} data-autofocus>Keep Exploring</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
