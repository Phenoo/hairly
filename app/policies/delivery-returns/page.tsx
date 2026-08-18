import { UtilityPage } from "@/components/route-ui";
export const metadata = {
  title: "Delivery & Returns | A-Glory Hair and Cosmetics",
};
export default function DeliveryReturnsRoute() {
  return (
    <UtilityPage
      eyebrow="Help centre"
      title={
        <>
          Delivery & <em>returns.</em>
        </>
      }
      body="Current guidance for store-assisted orders, local delivery and collection."
    >
      <div className="policy-grid">
        <section>
          <h2>Delivery</h2>
          <p>
            Online checkout is not connected yet. The A-Glory team confirms
            delivery availability, timing and price before taking payment.
          </p>
        </section>
        <section>
          <h2>Click & Collect</h2>
          <p>
            Ask the team to reserve eligible items. We’ll confirm when your order
            is ready to collect from 8 Cross Street, Erith, Kent DA8 1RB.
          </p>
        </section>
        <section>
          <h2>Returns</h2>
          <p>
            Contact us within 30 days if you need to return an eligible item.
            Products must be unused, unopened and in their original packaging.
          </p>
        </section>
        <section>
          <h2>Need help?</h2>
          <p>
            <a href="/contact">Contact the A-Glory team</a> or message us on
            WhatsApp and we’ll help with your order.
          </p>
        </section>
      </div>
    </UtilityPage>
  );
}
