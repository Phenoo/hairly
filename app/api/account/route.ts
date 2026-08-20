import { NextResponse } from "next/server";
import { getCustomerSession, sessionNeedsRefresh } from "@/lib/customer-account";
import {
  createCustomerAddress,
  deleteCustomerAddress,
  getCustomerAccount,
  sanitizeAddressInput,
  sanitizeProfileInput,
  updateCustomerAddress,
  updateCustomerProfile,
} from "@/lib/customer-data";

export const dynamic = "force-dynamic";
const noStore = { "Cache-Control": "no-store" };

async function sessionOrUnauthorized() {
  const session = await getCustomerSession();
  return session && !sessionNeedsRefresh(session) ? session : undefined;
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

export async function GET() {
  const session = await sessionOrUnauthorized();
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401, headers: noStore });
  try {
    const customer = await getCustomerAccount(session, 20);
    return NextResponse.json({ customer }, { headers: noStore });
  } catch {
    return NextResponse.json({ error: "Your account information is temporarily unavailable." }, { status: 502, headers: noStore });
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403, headers: noStore });
  const session = await sessionOrUnauthorized();
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401, headers: noStore });
  let body: { action?: string; [key: string]: unknown };
  try { body = await request.json() as { action?: string; [key: string]: unknown }; }
  catch { return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: noStore }); }
  try {
    if (body.action === "profile") {
      await updateCustomerProfile(session, sanitizeProfileInput(body));
    } else if (body.action === "address-create") {
      await createCustomerAddress(session, sanitizeAddressInput(body.address), body.defaultAddress === true);
    } else if (body.action === "address-update" && typeof body.addressId === "string") {
      await updateCustomerAddress(session, body.addressId, sanitizeAddressInput(body.address), typeof body.defaultAddress === "boolean" ? body.defaultAddress : undefined);
    } else if (body.action === "address-delete" && typeof body.addressId === "string") {
      await deleteCustomerAddress(session, body.addressId);
    } else {
      return NextResponse.json({ error: "Invalid account action." }, { status: 400, headers: noStore });
    }
    return NextResponse.json({ ok: true }, { headers: noStore });
  } catch (error) {
    const message = error instanceof Error && /required|international format|first name|last name|Invalid address/.test(error.message)
      ? error.message
      : "We couldn't save that change. Please try again.";
    return NextResponse.json({ error: message }, { status: 422, headers: noStore });
  }
}
