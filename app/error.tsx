"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalRouteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { /* Keep internal error details out of the customer experience. */ }, []);
  return <section className="utility-page container section-space"><div className="utility-card"><h1>Something went wrong.</h1><p>We couldn’t load this page right now. Please try again or continue shopping.</p><div className="utility-actions"><button className="button button-dark" type="button" onClick={reset}>Try again</button><Link className="button button-outline" href="/shop">Shop all products</Link></div></div></section>;
}
