export const metadata = {
  title: "Cookie Policy | Aglory Hair and Cosmetics",
  description: "How Aglory Hair and Cosmetics uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <section className="policy-page container section-space">
      <div className="page-kicker">
        <span className="eyebrow">Legal</span>
        <h1>Cookie <em>policy.</em></h1>
        <p>We use cookies and similar technologies to keep the website working and understand how it is used.</p>
      </div>
      <div className="policy-copy">
        <h2>Essential cookies</h2>
        <p>These support shopping basics such as navigation, cart state and secure form behaviour.</p>
        <h2>Analytics and preferences</h2>
        <p>Where enabled, these help us understand site performance and remember useful preferences. We will ask for consent where required.</p>
        <h2>Questions</h2>
        <p>For questions about privacy or cookies, contact info@agloryhairandcosmetics.co.uk.</p>
      </div>
    </section>
  );
}
