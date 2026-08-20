import { NextResponse } from "next/server";
import { clearCustomerSession, getCustomerSession, refreshCustomerSession, safeReturnTo, saveCustomerSession } from "@/lib/customer-account";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const returnTo = safeReturnTo(new URL(request.url).searchParams.get("returnTo"));
  const session = await getCustomerSession();
  if (!session) return NextResponse.redirect(new URL(`/auth/login?returnTo=${encodeURIComponent(returnTo)}`, request.url));
  const refreshed = await refreshCustomerSession(session);
  if (!refreshed) {
    const response = NextResponse.redirect(new URL(`/login?error=session&returnTo=${encodeURIComponent(returnTo)}`, request.url));
    clearCustomerSession(response.cookies);
    return response;
  }
  const response = NextResponse.redirect(new URL(returnTo, request.url));
  saveCustomerSession(response.cookies, refreshed);
  return response;
}
