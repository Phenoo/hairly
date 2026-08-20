import Link from "next/link";

export const metadata = {
  title: "FAQs | Aglory Hair and Cosmetics",
  description: "Answers about Aglory products, delivery, returns and store collection.",
};

const faqs = [
  ["Is local delivery available?", "Local delivery may be available in selected areas. The store team confirms eligibility, timing and the delivery fee before payment."],
  ["Can I collect from the Erith store?", "Yes, for eligible items once the team has confirmed current stock and told you the order is ready."],
  ["What is your returns policy?", "Eligible items can be returned within 30 days. Please review the Delivery & returns policy for exclusions and contact the team before sending anything back."],
  ["Can I ask for product advice?", "Yes. Call 01322 333305 or message the Aglory team on WhatsApp for help with products, shades, textures and routines."],
];

export default function FaqPage() {
  return (
    <section className="route-page container section-space">
      <div className="page-kicker">
        <span className="eyebrow">Help centre</span>
        <h1>Frequently asked <em>questions.</em></h1>
        <p>Clear answers for shopping online and visiting Aglory in Erith.</p>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      <Link className="button button-outline" href="/contact">Still need help?</Link>
    </section>
  );
}
