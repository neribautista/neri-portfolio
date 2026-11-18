import { PLANS, QUOTE_COPY } from "../data/quoteData";
import PlanCard from "./PlanCard";
import Icon from "./Icon";

// On-page "Website Plans" section: crawlable text for SEO and a direct path to the quote form.
export default function Plans({ onQuote }) {
  return (
    <section id="plans" className="section" aria-labelledby="plans-title">
      <div className="section__head">
        <div>
          <p className="kicker accent">Now accepting new clients</p>
          <h2 id="plans-title" className="section__title">{QUOTE_COPY.sectionTitle}</h2>
          <p className="section__sub plans__sub">{QUOTE_COPY.sectionSub}</p>
        </div>
      </div>

      <div className="plans">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={plan.badge}
            onSelect={() => onQuote(plan.id)}
            action={
              <button
                className={`btn ${plan.badge ? "btn--primary" : "btn--ghost"} plan__cta`}
                onClick={(e) => {
                  e.stopPropagation();
                  onQuote(plan.id);
                }}
              >
                Subscribe <Icon name="arrowRight" size={16} />
              </button>
            }
          />
        ))}
      </div>

      <p className="plans__foot">
        <Icon name="info" size={15} /> Subscribing books a free consultation. No payment until you approve your custom quote.
        Need something else, like a redesign or an AI chatbot for an existing site?{" "}
        <button className="link-btn link-btn--inline" onClick={() => onQuote("unsure")}>
          Request a custom quote
        </button>
      </p>
    </section>
  );
}
