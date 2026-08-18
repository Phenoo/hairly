import { UtilityPage } from "@/components/route-ui";
export const metadata = { title: "About A-Glory Hair and Cosmetics" };
export default function AboutRoute() {
  return (
    <UtilityPage
      eyebrow="About A-Glory"
      title={
        <>
          Beauty that
          <br />
          <em>understands you.</em>
        </>
      }
      body="A-Glory is your local beauty destination for hair, skin, cosmetics, protective styling and expert advice."
    />
  );
}
