"use client";

import Link from "next/link";
import { ArrowRight, Heart, PackageCheck, UserRound } from "lucide-react";

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const signup = mode === "signup";
  return (
    <section className="auth-page container section-space">
      <div className="auth-layout auth-layout-honest">
        <div className="auth-intro">
          <span className="eyebrow">A-Glory Hair and Cosmetics</span>
          <h1>
            {signup ? <>Accounts are<br /><em>coming soon.</em></> : <>Account access<br /><em>is being connected.</em></>}
          </h1>
          <p>
            We have removed the preview sign-in form because no authentication
            service is connected. Your wishlist and bag still stay saved on this device.
          </p>
        </div>
        <div className="auth-form-card auth-service-card">
          <UserRound size={30} />
          <span className="eyebrow">No password needed yet</span>
          <h2>Keep shopping while accounts are prepared.</h2>
          <div className="auth-benefits">
            <Link href="/wishlist"><Heart size={16} /> View your saved products</Link>
            <Link href="/track-order"><PackageCheck size={16} /> Get order support</Link>
          </div>
          <Link className="button button-dark wide" href="/shop">
            Continue shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
