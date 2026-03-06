export default function TransitionOverlay({ visible, direction }) {
  return (
    <div
      className={`overlay ${visible ? "overlay--visible" : "overlay--hidden"}`}
      style={{ background: direction === "to-past" ? "#f5a623" : "#E50914" }}
    >
      <div className="overlay__content" style={{ opacity: visible ? 1 : 0 }}>
        <div className="overlay__icon">
        </div>
        <div className="overlay__text">
          {direction === "to-past" ? "LOADING: THE FOUNDATION" : "LOADING: THE EVOLUTION"}
        </div>
      </div>
    </div>
  );
}
