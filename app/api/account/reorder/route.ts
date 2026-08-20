import { NextResponse } from "next/server";
import { getCustomerSession, sessionNeedsRefresh } from "@/lib/customer-account";
import { getCustomerOrder } from "@/lib/customer-data";
import { addShopifyCartLines, createShopifyCart, getShopifyVariantAvailability } from "@/lib/shopify";

export const dynamic = "force-dynamic";
const noStore = { "Cache-Control": "no-store" };

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

function isShopifyId(value: unknown, resource?: string): value is string {
  return typeof value === "string" && value.startsWith(`gid://shopify/${resource || ""}`);
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403, headers: noStore });
  const session = await getCustomerSession();
  if (!session || sessionNeedsRefresh(session)) return NextResponse.json({ error: "Sign in required." }, { status: 401, headers: noStore });
  let body: { orderId?: unknown; cartId?: unknown };
  try { body = await request.json() as { orderId?: unknown; cartId?: unknown }; }
  catch { return NextResponse.json({ error: "Invalid reorder request." }, { status: 400, headers: noStore }); }
  if (!isShopifyId(body.orderId, "Order/")) return NextResponse.json({ error: "Invalid order." }, { status: 400, headers: noStore });
  try {
    // `order` is Customer Account API-scoped, so it returns only an order the
    // authenticated customer owns; an arbitrary ID cannot expose another order.
    const order = await getCustomerOrder(session, body.orderId);
    if (!order) return NextResponse.json({ error: "That order is not available in this account." }, { status: 404, headers: noStore });
    const requested = order.lineItems.nodes.flatMap((line) => line.variantId ? [{ merchandiseId: line.variantId, quantity: Math.min(line.quantity, 99) }] : []);
    const variants = await getShopifyVariantAvailability(requested.map((line) => line.merchandiseId));
    const available = new Set(variants.filter((variant) => variant.availableForSale).map((variant) => variant.id));
    const lines = requested.filter((line) => available.has(line.merchandiseId));
    if (!lines.length) return NextResponse.json({ error: "None of these items are currently available." }, { status: 422, headers: noStore });
    const cart = isShopifyId(body.cartId, "Cart/")
      ? await addShopifyCartLines(body.cartId, lines)
      : await createShopifyCart(lines);
    return NextResponse.json({ cart, unavailableCount: requested.length - lines.length }, { headers: noStore });
  } catch {
    return NextResponse.json({ error: "We couldn't add these items right now. Please try again." }, { status: 422, headers: noStore });
  }
}
