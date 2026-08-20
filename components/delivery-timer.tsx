"use client";

import { useEffect, useState } from "react";
import { Clock, ShieldCheck, Truck } from "lucide-react";

export function DeliveryTimer() {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number }>({
    hours: 3,
    minutes: 42,
  });

  useEffect(() => {
    // Calculate hours and minutes until 3:00 PM UK dispatch cut-off
    const calculateTime = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(15, 0, 0, 0); // 3:00 PM dispatch cut-off

      if (now > cutoff) {
        // Next day cutoff
        cutoff.setDate(cutoff.getDate() + 1);
      }

      const diffMs = cutoff.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft({ hours, minutes });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="delivery-timer-badge my-3.5 flex items-center gap-2 rounded-md border border-[#e2d5e5] bg-[#fbf7fc] px-3 py-2 text-xs text-[#0d125d]">
      <Clock size={15} className="shrink-0 text-[#9f70a5]" />
      <span>
        Order within{" "}
        <strong className="text-[#0d125d]">
          {timeLeft.hours}h {timeLeft.minutes}m
        </strong>{" "}
        for same-day dispatch from our Erith store.
      </span>
    </div>
  );
}

export function TrustPerks() {
  return (
    <div className="trust-perks-grid my-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      <div className="flex items-center gap-2.5 rounded-lg border border-[#eef0fa] bg-[#f9fafd] p-2.5">
        <Truck size={17} className="shrink-0 text-[#0d125d]" />
        <div className="text-[11px] leading-tight text-[#0d125d]">
          <strong>Free UK Delivery</strong>
          <span className="block text-slate-500">On orders over £40</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 rounded-lg border border-[#eef0fa] bg-[#f9fafd] p-2.5">
        <ShieldCheck size={17} className="shrink-0 text-[#0d125d]" />
        <div className="text-[11px] leading-tight text-[#0d125d]">
          <strong>100% Genuine</strong>
          <span className="block text-slate-500">Authorised UK stock</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 rounded-lg border border-[#eef0fa] bg-[#f9fafd] p-2.5 col-span-2 sm:col-span-1">
        <Clock size={17} className="shrink-0 text-[#0d125d]" />
        <div className="text-[11px] leading-tight text-[#0d125d]">
          <strong>Store Collection</strong>
          <span className="block text-slate-500">Same-day pickup in Erith</span>
        </div>
      </div>
    </div>
  );
}
