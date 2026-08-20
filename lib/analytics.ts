"use client";

export const CONSENT_STORAGE_KEY = "aglory-cookie-consent:v1";
export const CONSENT_EVENT = "aglory-cookie-consent";

export type AnalyticsEvent =
  | "view_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "begin_checkout"
  | "login_started"
  | "logout"
  | "view_account"
  | "view_order"
  | "reorder"
  | "address_added"
  | "address_updated";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function hasAnalyticsConsent() {
  try {
    const val = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (val === "accepted") return true;
    if (val && val.startsWith("{")) {
      const parsed = JSON.parse(val) as { analytics?: boolean };
      return Boolean(parsed.analytics);
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * A provider-neutral data layer. Configure GTM/GA4 only after legal review;
 * events are intentionally not emitted until the visitor accepts analytics.
 */
export function trackCommerceEvent(event: AnalyticsEvent, ecommerce: Record<string, unknown>) {
  if (!hasAnalyticsConsent()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ecommerce });
}
