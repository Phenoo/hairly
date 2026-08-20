"use client";

import { Sliders } from "lucide-react";
import { CONSENT_STORAGE_KEY } from "@/lib/analytics";

export function CookieResetButton() {
  const handleReset = () => {
    try {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      window.location.reload();
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="mt-8 rounded-xl border border-[#dedfe8] bg-[#f9fafd] p-6">
      <h3 className="font-serif text-lg font-bold text-[#0d125d]">
        Manage your choices
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        You can revisit and update your cookie preferences at any time.
      </p>
      <button
        type="button"
        onClick={handleReset}
        className="button button-dark mt-4 flex items-center gap-2 text-xs font-bold"
      >
        <Sliders size={14} /> Update cookie preferences
      </button>
    </div>
  );
}
