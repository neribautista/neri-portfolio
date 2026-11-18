// Website plans shown in the "Website Plans" section and the quote popup.
// Edit prices, rows, and features here. If you change a price, also update the
// matching "price" in the JSON-LD block in index.html so Google shows the same number.

export const PLANS = [
  {
    id: "starter",
    name: "Starter Website",
    tagline: "Get your business online, fast.",
    price: 750,
    gradient: ["#2b3a8f", "#4d50d9"],
    rows: [
      ["Pages", "Up to 5"],
      ["Design", "Custom-styled template"],
      ["SEO", "Basic setup"],
      ["Timeline", "1–2 weeks"],
      ["Revisions", "2 rounds"],
    ],
    features: [
      "Mobile-friendly, fast-loading site",
      "Contact form that emails you",
      "Google Analytics + Search Console",
      "Launch help with your domain and hosting",
    ],
  },
  {
    id: "business",
    name: "Business Website",
    tagline: "A custom site built to win customers.",
    price: 1800,
    badge: "Most Popular",
    gradient: ["#7a0d14", "#e50914"],
    rows: [
      ["Pages", "Up to 10"],
      ["Design", "Fully custom"],
      ["SEO", "On-page SEO + local search"],
      ["Timeline", "3–4 weeks"],
      ["Revisions", "3 rounds"],
    ],
    features: [
      "Everything in Starter",
      "Booking, quote, or lead forms",
      "Website redesign of an existing site",
      "Admin area to update your own content",
    ],
  },
  {
    id: "ai",
    name: "AI-Powered Website",
    tagline: "Your site, with an AI assistant built in.",
    price: 3500,
    gradient: ["#3b1c5a", "#b33a4a"],
    rows: [
      ["Pages", "Custom scope"],
      ["Design", "Custom + web app features"],
      ["SEO", "Full SEO + analytics"],
      ["AI", "Chat assistant or voice agent"],
      ["Timeline", "4–6 weeks"],
    ],
    features: [
      "Everything in Business",
      "AI chatbot trained on your business info",
      "Automations: leads, emails, scheduling",
      "Integrations with CRMs, payments, and APIs",
    ],
  },
];

export const QUOTE_COPY = {
  sectionTitle: "Website Design & Development Plans",
  sectionSub:
    "Custom websites for small businesses in Austin and anywhere in the U.S. Pick a plan, book a free consultation, and get a custom quote. No payment until we agree on scope.",
  pickTitle: "Choose the plan that's right for your business",
  pickNote: "Not sure? Pick the closest one. Every quote is tailored on our call, and redesigns are welcome.",
  formTitle: "Book your free consultation",
  formNote: "No payment now. Tell me about your project and pick a time that works for you.",
};

export const QUOTE_ENDPOINT = "/api/quote";

export const formatPrice = (n) => `$${n.toLocaleString("en-US")}`;
