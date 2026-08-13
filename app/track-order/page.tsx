import { UtilityPage } from "@/components/route-ui";
export const metadata = { title: "Track Order | Aglory Hair & Cosmetics" };
export default function TrackOrderRoute() { return <UtilityPage eyebrow="Order tracking" title={<>Where is your<br /><em>order?</em></>} body="Enter your order number and email to see your delivery timeline." />; }
