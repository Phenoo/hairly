"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY } from "@/lib/analytics";

interface ConsentState {
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

function readStoredConsent() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function subscribeToConsent(onChange: () => void) {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function parseStoredConsent(value: string | null): ConsentState | null {
  if (!value) return null;
  if (value === "accepted") return { essential: true, analytics: true, marketing: true };
  if (value === "rejected") return { essential: true, analytics: false, marketing: false };
  if (!value.startsWith("{")) return null;
  try {
    const parsed = JSON.parse(value) as Partial<ConsentState>;
    return { essential: true, analytics: Boolean(parsed.analytics), marketing: Boolean(parsed.marketing) };
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const storedValue = useSyncExternalStore(subscribeToConsent, readStoredConsent, () => null);
  const storedConsent = parseStoredConsent(storedValue);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [draftConsent, setDraftConsent] = useState<{ analytics: boolean; marketing: boolean } | null>(null);
  const hasDecided = storedConsent !== null;
  const analyticsConsent = draftConsent?.analytics ?? storedConsent?.analytics ?? false;
  const marketingConsent = draftConsent?.marketing ?? storedConsent?.marketing ?? false;

  const saveConsent = (analytics: boolean, marketing: boolean) => {
    const state: ConsentState = {
      essential: true,
      analytics,
      marketing,
    };

    const valueToStore =
      analytics && marketing
        ? "accepted"
        : !analytics && !marketing
        ? "rejected"
        : JSON.stringify(state);

    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, valueToStore);
    } catch {
      // consent remains in memory for this session
    }

    window.dispatchEvent(
      new CustomEvent(CONSENT_EVENT, { detail: valueToStore })
    );

    setDraftConsent(null);
    setIsCustomizing(false);
  };

  const handleAcceptAll = () => saveConsent(true, true);
  const handleRejectAll = () => saveConsent(false, false);
  const handleSaveCustom = () => saveConsent(analyticsConsent, marketingConsent);

  if (hasDecided !== false) return null;

  return (
    <aside
      className="cookie-consent-overlay fixed inset-x-0 bottom-0 z-[95] border-t border-[#dedfe8] bg-white/95 shadow-[0_-10px_30px_rgba(13,18,93,0.1)] backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-300"
      role="dialog"
      aria-label="Privacy & Cookie Preferences"
    >
      <div className="container mx-auto px-4 py-4 sm:px-8 sm:py-5">
        {/* Customization Accordion (Expanded) */}
        {isCustomizing && (
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3 rounded-xl border border-[#e8e9f0] bg-[#f9fafd] p-4 animate-in fade-in duration-200">
            {/* Essential Category */}
            <div className="flex flex-col justify-between rounded-lg bg-white p-3 border border-[#eceef4]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#0d125d]">
                  Essential & Bag
                </span>
                <span className="rounded-md bg-[#eef7ee] px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  Always Active
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Required for shopping bag persistence, store collection & secure checkout.
              </p>
            </div>

            {/* Analytics Category */}
            <div className="flex flex-col justify-between rounded-lg bg-white p-3 border border-[#eceef4]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#0d125d]">
                  Analytics & Speed
                </span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={analyticsConsent}
                    onChange={(e) => setDraftConsent({ analytics: e.target.checked, marketing: marketingConsent })}
                    className="peer sr-only"
                  />
                  <div className="peer h-5 w-9 rounded-full bg-slate-200 after:absolute after:top-[2px] after:left-[2px] after:size-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#0d125d] peer-checked:after:translate-x-full peer-focus:outline-none" />
                </label>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Helps us measure site performance and popular category searches.
              </p>
            </div>

            {/* Personalization Category */}
            <div className="flex flex-col justify-between rounded-lg bg-white p-3 border border-[#eceef4]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#0d125d]">
                  Personalised Advice
                </span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setDraftConsent({ analytics: analyticsConsent, marketing: e.target.checked })}
                    className="peer sr-only"
                  />
                  <div className="peer h-5 w-9 rounded-full bg-slate-200 after:absolute after:top-[2px] after:left-[2px] after:size-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#0d125d] peer-checked:after:translate-x-full peer-focus:outline-none" />
                </label>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Provides tailored hair texture suggestions and shade matching.
              </p>
            </div>
          </div>
        )}

        {/* Main Bar Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Column: Copy & Links */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-base font-bold text-[#0d125d]">
                Your Privacy at Aglory
              </h3>
             
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-700">
              We use essential storage for your bag and checkout security. Optional analytics help us understand popular hair textures and shades to improve your shopping experience. Read our{" "}
              <Link
                href="/policies/cookies"
                className="text-[#0d125d] text-sm font-semibold underline hover:opacity-80"
              >
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/policies/privacy"
                className="text-[#0d125d] text-sm font-semibold underline hover:opacity-80"
              >
                Privacy Notice
              </Link>
              .
            </p>
          </div>

          {/* Right Column: Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsCustomizing((prev) => !prev)}
              className="flex items-center gap-1 py-2 px-3 text-xs font-semibold text-[#0d125d] hover:underline"
              aria-expanded={isCustomizing}
            >
              {isCustomizing ? (
                <>
                  Hide choices <ChevronUp size={14} />
                </>
              ) : (
                <>
                  Manage choices <ChevronDown size={14} />
                </>
              )}
            </button>

            {isCustomizing ? (
              <>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="button button-dark py-2.5 px-4 text-xs font-bold shadow-xs"
                >
                  Save preferences
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="button button-outline py-2.5 px-4 text-xs font-bold"
                >
                  Accept all
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="button button-outline py-2.5 px-4 text-xs font-semibold"
                >
                  Reject optional
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="button button-dark py-2.5 px-5 text-xs font-bold shadow-md"
                >
                  Accept all
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
