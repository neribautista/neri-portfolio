import { formatPrice } from "../data/quoteData";
import Icon from "./Icon";

// Netflix-style plan card. `as="label"` makes the whole card a radio option in the popup.
export default function PlanCard({ plan, selected, onSelect, action, as = "article" }) {
  const Tag = as;
  const [c1, c2] = plan.gradient;
  return (
    <Tag className={`plan ${selected ? "is-selected" : ""}`} onClick={as === "label" ? undefined : onSelect}>
      {as === "label" && (
        <input type="radio" name="plan" className="plan__radio" value={plan.id} checked={!!selected} onChange={onSelect} />
      )}
      <header className="plan__head" style={{ "--p1": c1, "--p2": c2 }}>
        {plan.badge && <span className="plan__badge">{plan.badge}</span>}
        <h3 className="plan__name">{plan.name}</h3>
        <p className="plan__tag">{plan.tagline}</p>
        {selected && (
          <span className="plan__check" aria-hidden="true">
            <Icon name="check" size={16} stroke={3} />
          </span>
        )}
      </header>
      <div className="plan__body">
        <p className="plan__price">
          <small>Starting at</small>
          <strong>{formatPrice(plan.price)}</strong>
          <small>one-time · free quote</small>
        </p>
        <dl className="plan__rows">
          {plan.rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <ul className="plan__features">
          {plan.features.map((f) => (
            <li key={f}>
              <Icon name="check" size={15} stroke={2.5} />
              {f}
            </li>
          ))}
        </ul>
        {action}
      </div>
    </Tag>
  );
}
