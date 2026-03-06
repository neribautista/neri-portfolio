import { useState } from "react";
import SectionLabel from "./SectionLabel";
import ContactCard from "./ContactCard";

export default function ResumeSection({ data }) {
  const [cart, setCart] = useState([]);
  const [checkedOut, setCheckedOut] = useState(false);
  const [adding, setAdding] = useState(null);

  const addToCart = (label) => {
    if (cart.includes(label)) return;
    setAdding(label);
    setTimeout(() => {
      setCart((c) => [...c, label]);
      setAdding(null);
    }, 600);
  };

  const removeFromCart = (label) => setCart((c) => c.filter((i) => i !== label));

  const checkout = () => {
    if (cart.length === 0) return;
    setCheckedOut(true);

    // Trigger actual file downloads for each selected resume
    cart.forEach((label) => {
      const resume = data.resumes.find((r) => r.label === label);
      if (resume?.file) {
        const link = document.createElement("a");
        link.href = resume.file;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });

    setTimeout(() => {
      setCheckedOut(false);
      setCart([]);
    }, 100);
  };

  return (
    <section id="resume" className="section section--resume">
      <SectionLabel label="Resume & Contact" color={data.accentColor} textColor={data.textColor} />

      <div className="resume-contact-row">
      <div
        className="resume-cart"
        style={{
          background: data.cardBg,
          border: `1px solid ${data.accentColor}25`,
        }}
      >
        {/* Header */}
        <div
          className="resume-cart__header"
          style={{
            borderBottom: `1px solid ${data.accentColor}20`,
            background: `${data.accentColor}08`,
          }}
        >
          <span className="resume-cart__icon"><img src="/icons/cart.png" alt="Cart" width="22" height="22" style={{ filter: data.textColor === "#ffffff" ? "invert(1)" : "none" }} /></span>
          <span className="resume-cart__title" style={{ color: data.textColor }}>
            Resume Cart
          </span>
          {cart.length > 0 && (
            <span className="resume-cart__count" style={{ background: data.accentColor }}>
              {cart.length} item{cart.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Product list */}
        <div className="resume-cart__body">
          <p className="resume-cart__desc" style={{ color: data.subtleColor }}>
            Add the resume version(s) you'd like — then hit{" "}
            <strong style={{ color: data.textColor }}>Checkout</strong> to download.
          </p>

          <div className="resume-cart__list">
            {data.resumes.map((r) => {
              const inCart = cart.includes(r.label);
              const isAdding = adding === r.label;
              return (
                <div
                  key={r.label}
                  className="resume-item"
                  style={{
                    background: inCart ? `${r.color}12` : `${data.textColor}05`,
                    border: `1px solid ${inCart ? r.color + "50" : data.textColor + "10"}`,
                  }}
                >
                  <div
                    className="resume-item__icon"
                    style={{ background: `${r.color}20` }}
                  >
                    <img src={r.icon} alt={r.label} width="26" height="26" style={{ filter: data.textColor === "#ffffff" ? "invert(1)" : "none" }} />
                  </div>

                  <div className="resume-item__info">
                    <div className="resume-item__label" style={{ color: data.textColor }}>
                      {r.label} Resume
                    </div>
                    <div className="resume-item__desc" style={{ color: data.subtleColor }}>
                      {r.desc}
                    </div>
                  </div>

                  {inCart ? (
                    <button
                      className="resume-item__btn resume-item__btn--added"
                      onClick={() => removeFromCart(r.label)}
                      style={{
                        border: `1px solid ${r.color}60`,
                        color: r.color,
                      }}
                    >
                      ✓ Added
                    </button>
                  ) : (
                    <button
                      className="resume-item__btn resume-item__btn--add"
                      onClick={() => addToCart(r.label)}
                      disabled={isAdding}
                      style={{
                        background: data.accentColor,
                        opacity: isAdding ? 0.7 : 1,
                        transform: isAdding ? "scale(0.95)" : "scale(1)",
                      }}
                    >
                      {isAdding ? "Adding…" : "+ Add to Cart"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Checkout */}
        <div
          className="resume-cart__footer"
          style={{ borderTop: `1px solid ${data.accentColor}20` }}
        >
          <button
            className="resume-cart__checkout"
            onClick={checkout}
            disabled={cart.length === 0}
            style={{
              background: cart.length > 0 ? data.accentColor : `${data.textColor}20`,
              color: cart.length > 0 ? "#fff" : data.subtleColor,
              cursor: cart.length > 0 ? "pointer" : "not-allowed",
            }}
          >
            {checkedOut ? "✓ Downloading!" : `Checkout${cart.length > 0 ? ` (${cart.length})` : ""}`}
          </button>

          {checkedOut && (
            <span className="resume-cart__downloading" style={{ color: data.accentColor }}>
              📥 Your selected resume{cart.length > 1 ? "s are" : " is"} downloading…
            </span>
          )}

          {cart.length === 0 && !checkedOut && (
            <span className="resume-cart__hint" style={{ color: data.subtleColor }}>
              Add at least one resume to continue.
            </span>
          )}
        </div>
      </div>

      <ContactCard data={data} />
      </div>
    </section>
  );
}
