import { products } from "@/lib/store-data";
import { ShopCatalog } from "@/components/route-ui";
export const metadata = { title: "Shop | Aglory Hair and Cosmetics" };
export default function ShopPage() { return <ShopCatalog items={products} />; }
