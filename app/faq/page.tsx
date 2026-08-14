import Link from "next/link";

export const metadata = {
  title: "FAQs | Aglory Hair and Cosmetics",
  description: "Answers about Aglory products, delivery, returns and store collection.",
};

const faqs = [
  ["When is same-day delivery available?", "Same-day delivery is available in selected areas for orders placed before 12pm. Eligibility, timing and the delivery fee are confirmed at checkout."],
  ["Can I collect from the Erith store?", "Choose Click & Collect at checkout when it is available for your order. Stock is confirmed against the order before collection."],
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
