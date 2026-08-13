import { UtilityPage } from "@/components/route-ui";
export const metadata = { title: "Wishlist | Aglory Hair and Cosmetics" };
export default function WishlistRoute() { return <UtilityPage eyebrow="Your saved edit" title={<>Wishlist, <em>kept close.</em></>} body="Your saved products will appear here and can move directly into your Shopify cart." />; }
