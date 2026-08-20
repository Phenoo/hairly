import { CartPage } from "@/components/route-ui";
export const metadata = { title: "Your Bag | Aglory Hair and Cosmetics" };
export default function CartRoute() {
  return (
    <section className="route-page container section-space">
      <div className="page-kicker">
        <span className="eyebrow">Your bag</span>
        <h1>
          Your <em>bag.</em>
        </h1>
        <p>Review your selected products before checkout.</p>
      </div>
      <CartPage />
    </section>
  );
}
