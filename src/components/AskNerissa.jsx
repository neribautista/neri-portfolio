import { useEffect, useRef, useState } from "react";
import { ask, SUGGESTIONS } from "../lib/askNerissa";
import { PROFILE } from "../data/siteData";
import Icon from "./Icon";

const reduceMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function AskNerissa({ seed, onClose, onOpenProject }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const seeded = useRef(false);

  const send = async (text) => {
    const q = text.trim();
    if (!q || busy) return;
    setInput("");
    setBusy(true);
    const history = messages.filter((m) => m.text).map(({ role, text }) => ({ role, text }));
    setMessages((m) => [...m, { role: "user", text: q }]);
    // Hold the typing indicator briefly so instant local answers don't flash in.
    const [res] = await Promise.all([ask(q, history), new Promise((r) => setTimeout(r, reduceMotion() ? 0 : 450))]);

    // Reveal the answer word by word, like a streamed reply.
    const words = res.text.split(" ");
    const id = Date.now();
    setMessages((m) => [...m, { id, role: "bot", text: reduceMotion() ? res.text : "", sources: res.sources, project: res.project, done: reduceMotion() }]);
    if (!reduceMotion()) {
      for (let i = 1; i <= words.length; i++) {
        await new Promise((r) => setTimeout(r, 18));
        const partial = words.slice(0, i).join(" ");
        setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, text: partial, done: i === words.length } : msg)));
      }
    }
    setBusy(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (seeded.current) return; // StrictMode runs effects twice in dev
    seeded.current = true;
    if (seed) send(seed);
    else inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const asked = new Set(messages.filter((m) => m.role === "user").map((m) => m.text));
  const chips = SUGGESTIONS.filter((s) => !asked.has(s)).slice(0, 4);

  return (
    <div className="overlay overlay--center" onClick={onClose}>
      <div
        className={`ask ${expanded ? "ask--expanded" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="ask__head">
          <img className="ask__avatar" src={PROFILE.photos.avatar} alt="" />
          <div>
            <h2 id="ask-title" className="ask__title">
              Ask Nerissa AI <span className="badge">Beta</span>
            </h2>
            <p className="ask__sub">Ask me anything about Nerissa's experience, projects, skills, or goals. I'm here to help!</p>
          </div>
          <div className="ask__tools">
            <button className="icon-btn" onClick={() => setExpanded((x) => !x)} aria-label={expanded ? "Shrink" : "Expand"}>
              <Icon name="expand" size={18} />
            </button>
            <button className="icon-btn" onClick={onClose} aria-label="Close">
              <Icon name="close" size={20} />
            </button>
          </div>
        </header>

        <div className="ask__log" ref={listRef} aria-live="polite">
          {messages.length === 0 && (
            <p className="ask__empty">Try one of the questions below, or ask your own.</p>
          )}
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="msg msg--user">{m.text}</div>
            ) : (
              <div key={i} className="msg-row">
                <img className="msg__avatar" src={PROFILE.photos.avatar} alt="" />
                <div className="msg msg--bot">
                  <p>{m.text}</p>
                  {m.done && m.sources?.length > 0 && (
                    <div className="msg__sources">
                      <span>Sources:</span>
                      {m.sources.map((s) => (
                        <span key={s} className="chip chip--xs">{s}</span>
                      ))}
                      {m.project && (
                        <button className="chip chip--xs chip--accent" onClick={() => onOpenProject(m.project)}>
                          Open project <Icon name="arrowRight" size={12} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          )}
          {busy && messages[messages.length - 1]?.role === "user" && (
            <div className="msg-row">
              <img className="msg__avatar" src={PROFILE.photos.avatar} alt="" />
              <div className="msg msg--bot msg--typing"><span /><span /><span /></div>
            </div>
          )}
        </div>

        {chips.length > 0 && (
          <div className="ask__chips">
            {chips.map((s) => (
              <button key={s} className="chip chip--suggest" onClick={() => send(s)} disabled={busy}>
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          className="ask__form"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            aria-label="Ask a question"
            maxLength={300}
          />
          <button type="submit" className="ask__send" disabled={busy || !input.trim()} aria-label="Send">
            <Icon name="send" size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
