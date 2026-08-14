import { Suspense } from "react";
import { products } from "@/lib/store-data";
import { ShopCatalog } from "@/components/route-ui";
import { BrandMarquee } from "@/components/brand-marque";
export const metadata = { title: "Shop | Aglory Hair and Cosmetics" };
export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="route-page container section-space">
          <p>Loading products…</p>
        </div>
      }
    >
      <ShopCatalog items={products} />
      <BrandMarquee />
    </Suspense>
  );
}
