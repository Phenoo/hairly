import { UtilityPage } from "@/components/route-ui";

export const metadata = { title: "Terms | Aglory Hair and Cosmetics" };

export default function TermsRoute() {
  return (
    <UtilityPage
      eyebrow="Store information"
      title={
        <>
          Simple <em>terms.</em>
        </>
      }
      body="The basic terms for browsing Aglory, placing an order and getting in touch with our team."
    >
      <div className="policy-grid">
        <section>
          <h2>Product information</h2>
          <p>
            We aim to keep product names, prices and availability accurate.
            Details may change as the live catalogue is updated.
          </p>
        </section>
        <section>
          <h2>Orders</h2>
          <p>
            An order is confirmed once the live store accepts it. Online payment
            and order confirmation will be completed through Shopify Checkout.
          </p>
        </section>
        <section>
          <h2>Returns</h2>
          <p>
            Eligible unused and unopened products can be returned within 30
            days. See the delivery and returns page for the current guidance.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            For questions about these terms, call 01322 333305 or email{" "}
            <a href="mailto:info@agloryhairandcosmetics.co.uk">
              info@agloryhairandcosmetics.co.uk
            </a>
            .
          </p>
        </section>
      </div>
    </UtilityPage>
  );
}
