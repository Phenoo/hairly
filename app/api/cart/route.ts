import { NextResponse } from "next/server";
import {
  addShopifyCartLine,
  createShopifyCart,
  getShopifyCart,
  removeShopifyCartLine,
  updateShopifyCartLine,
} from "@/lib/shopify";
import { getCustomerSession, sessionNeedsRefresh } from "@/lib/customer-account";
import type { ShopifyCart } from "@/lib/shopify-types";

export const dynamic = "force-dynamic";

type CartRequest =
  | { action: "create"; lines: { merchandiseId: string; quantity: number }[] }
  | { action: "add"; cartId: string; merchandiseId: string; quantity: number }
  | { action: "update"; cartId: string; lineId: string; quantity: number }
  | { action: "remove"; cartId: string; lineId: string };

const noStore = { "Cache-Control": "no-store" };

async function checkoutForCurrentBuyer(cart: ShopifyCart) {
  const session = await getCustomerSession();
  // Shopify Customer Accounts uses its active account-domain session to
  // authenticate checkout. A guest cart remains unchanged when not signed in.
  if (!session || sessionNeedsRefresh(session)) return cart;
  const checkoutUrl = new URL(cart.checkoutUrl);
  checkoutUrl.searchParams.set("sso", "silent");
  return { ...cart, checkoutUrl: checkoutUrl.toString() };
}

function isId(value: unknown): value is string {
  return typeof value === "string" && value.startsWith("gid://shopify/");
}

function isQuantity(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0 && value <= 99;
}

export async function GET(request: Request) {
  const cartId = new URL(request.url).searchParams.get("id");
  if (!isId(cartId)) return NextResponse.json({ error: "Invalid cart." }, { status: 400, headers: noStore });
  try {
    const cart = await getShopifyCart(cartId);
    return cart ? NextResponse.json({ cart: await checkoutForCurrentBuyer(cart) }, { headers: noStore }) : NextResponse.json({ cart: null }, { status: 404, headers: noStore });
  } catch {
    return NextResponse.json({ error: "Your bag could not be refreshed." }, { status: 502, headers: noStore });
  }
}

export async function POST(request: Request) {
  let input: CartRequest;
  try { input = await request.json() as CartRequest; }
  catch { return NextResponse.json({ error: "Invalid cart request." }, { status: 400, headers: noStore }); }

  try {
    let cart;
    if (input.action === "create" && Array.isArray(input.lines) && input.lines.length > 0 && input.lines.length <= 50 && input.lines.every((line) => isId(line.merchandiseId) && isQuantity(line.quantity))) {
      cart = await createShopifyCart(input.lines);
    } else if (input.action === "add" && isId(input.cartId) && isId(input.merchandiseId) && isQuantity(input.quantity)) {
      cart = await addShopifyCartLine(input.cartId, input.merchandiseId, input.quantity);
    } else if (input.action === "update" && isId(input.cartId) && isId(input.lineId) && isQuantity(input.quantity)) {
      cart = await updateShopifyCartLine(input.cartId, input.lineId, input.quantity);
    } else if (input.action === "remove" && isId(input.cartId) && isId(input.lineId)) {
      cart = await removeShopifyCartLine(input.cartId, input.lineId);
    } else {
      return NextResponse.json({ error: "Invalid cart request." }, { status: 400, headers: noStore });
    }
    return NextResponse.json({ cart: await checkoutForCurrentBuyer(cart) }, { headers: noStore });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Your bag could not be updated.";
    return NextResponse.json({ error: message }, { status: 422, headers: noStore });
  }
}
