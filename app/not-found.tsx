import Link from "next/link";

export default function NotFound() {
  return <section className="utility-page container section-space"
  ><div className="utility-card"><span className="eyebrow">404 · Page not found</span><h1>We couldn’t find that page.</h1><p>The product may have moved or is no longer available. Browse the latest arrivals or search the catalogue.</p><div className="utility-actions"><Link className="button button-dark" href="/shop">Shop all products</Link><Link className="button button-outline" href="/search">Search products</Link></div></div></section>;
}
