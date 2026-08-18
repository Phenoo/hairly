import { UtilityPage } from "@/components/route-ui";

export const metadata = { title: "Privacy | A-Glory Hair and Cosmetics" };

export default function PrivacyRoute() {
  return (
    <UtilityPage
      eyebrow="Your privacy"
      title={
        <>
          Privacy, made <em>clear.</em>
        </>
      }
      body="A short, plain-language overview of how A-Glory handles information shared through this website."
    >
      <div className="policy-grid">
        <section>
          <h2>What we collect</h2>
          <p>
            We may receive details you choose to share, such as your name, email
            address, delivery details and messages sent through the contact
            form.
          </p>
        </section>
        <section>
          <h2>How we use it</h2>
          <p>
            Information is used to respond to enquiries, prepare orders and
            improve the shopping experience. We do not sell your personal
            information.
          </p>
        </section>
        <section>
          <h2>Payments</h2>
          <p>
            Payment details will be processed securely by the checkout provider
            when the online store is connected.
          </p>
        </section>
        <section>
          <h2>Questions</h2>
          <p>
            For privacy questions, email{" "}
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
