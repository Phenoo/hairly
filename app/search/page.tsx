import { ShopCatalog } from "@/components/route-ui";
import { products } from "@/lib/store-data";
export const metadata = { title: "Search | Aglory Hair & Cosmetics" };
export default function SearchRoute() { return <ShopCatalog items={products} eyebrow="Find your next essential" title={<>Search the <em>catalogue.</em></>} />; }
