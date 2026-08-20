"use client";

import Link from "next/link";
import { ArrowRight, Heart, PackageCheck, ShieldCheck, UserRound } from "lucide-react";
import { trackCommerceEvent } from "@/lib/analytics";

export function AuthPage({ mode, error, returnTo = "/account" }: { mode: "login" | "signup"; error?: string; returnTo?: string }) {
  const signup = mode === "signup";
  const message = error === "configuration"
    ? "Customer accounts are being configured. Please try again shortly."
    : error === "cancelled"
      ? "Sign-in was cancelled. You can try again whenever you are ready."
      : error === "session"
        ? "Your session ended. Please sign in again."
        : error === "verification"
          ? "That sign-in link could not be verified. Request a new code from Shopify."
          : undefined;
  return (
    <section className="auth-page container section-space">
      <div className="auth-layout auth-layout-honest">
        <div className="auth-intro">
          <span className="eyebrow">Aglory Hair and Cosmetics</span>
          <h1>{signup ? <>Create or access your<br /><em>account.</em></> : <>Sign in, simply<br /><em>and securely.</em></>}</h1>
          <p>
            Aglory uses Shopify Customer Accounts. Shopify sends a one-time verification code to your email—there is no Aglory password to create or remember.
          </p>
        </div>
        <div className="auth-form-card auth-service-card">
          <ShieldCheck size={30} />
          <span className="eyebrow">Passwordless Shopify sign-in</span>
          <h2>Access orders, addresses and delivery updates.</h2>
          {message && <p className="mt-3 text-sm text-red-700" role="alert">{message}</p>}
          <div className="auth-benefits">
            <span><UserRound size={16} /> Sign in with an emailed one-time code</span>
            <span><PackageCheck size={16} /> Review Shopify order and tracking details</span>
            <span><Heart size={16} /> Your current bag stays available</span>
          </div>
          <a className="button button-dark wide" href={`/auth/login?returnTo=${encodeURIComponent(returnTo)}`} onClick={() => trackCommerceEvent("login_started", {})}>
            Continue with Shopify <ArrowRight size={16} />
          </a>
          <Link className="text-button mt-4" href="/shop">
            Continue shopping as guest <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
