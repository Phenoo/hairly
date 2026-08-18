import { Suspense } from "react";
import { SearchPage } from "@/components/route-ui";
export const metadata = { title: "Search | A-Glory Hair and Cosmetics" };
export default function SearchRoute() {
  return (
    <Suspense fallback={<div className="route-page container section-space"><p>Loading search…</p></div>}>
      <SearchPage />
    </Suspense>
  );
}
