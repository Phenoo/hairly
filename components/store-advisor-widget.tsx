"use client";

import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export function StoreAdvisorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(true);

  useEffect(() => {
    // Check if store is open (Mon-Sat 9am-7pm, Sun 11am-4pm UK time)
    const checkStoreStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();

      if (day === 0) {
        // Sunday: 11am - 4pm
        setStoreOpen(hour >= 11 && hour < 16);
      } else {
        // Mon-Sat: 9am - 7pm
        setStoreOpen(hour >= 9 && hour < 19);
      }
    };

    checkStoreStatus();
  }, []);

  return (
    <div className="store-advisor-float fixed bottom-6 right-6 z-40 max-md:hidden">
      {isOpen ? (
        <div className="advisor-card w-72 rounded-2xl border border-[#dedfe8] bg-white p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#0d125d] text-white font-serif font-bold text-sm">
                  A
                </div>
                <span
                  className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-white ${
                    storeOpen ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0d125d]">
                  Aglory Erith Store
                </h4>
                <p className="text-[10px] text-slate-500">
                  {storeOpen ? "Open now in store" : "Available via WhatsApp"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close store advisor"
            >
              <X size={15} />
            </button>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-600">
            Need help finding the right hair texture, braiding match, or foundation shade? Speak directly with our store team in Erith.
          </p>

          <div className="mt-3.5 flex flex-col gap-2">
            <a
              href="https://wa.me/447446841404?text=Hi%20Aglory%20team,%20I'd%20like%20some%20advice%20on%20products."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#20bd5a]"
            >
              <FaWhatsapp size={15} /> WhatsApp the team
            </a>
            <a
              href="tel:01322333305"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[#dedfe8] bg-white py-1.5 text-xs font-semibold text-[#0d125d] hover:bg-slate-50"
            >
              <Phone size={13} /> Call 01322 333305
            </a>
          </div>

          <div className="mt-3 border-t border-[#eee] pt-2 text-center text-[10px] text-slate-400">
            8 Cross Street, Erith, Kent DA8 1RB
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-[#0d125d] px-4 py-3 text-xs font-bold text-white shadow-xl transition-all duration-200 hover:scale-105 hover:bg-[#070b42]"
          aria-label="Ask our store team for advice"
        >
          <FaWhatsapp size={17} className="text-[#25D366]" />
          <span>Ask our team</span>
          <span
            className={`size-2 rounded-full ${
              storeOpen ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
            }`}
          />
        </button>
      )}
    </div>
  );
}
