import { NextResponse } from "next/server";
import { clearPendingAuthorization, exchangeAuthorizationCode, saveCustomerSession } from "@/lib/customer-account";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state || url.searchParams.has("error")) {
    return NextResponse.redirect(new URL("/login?error=cancelled", request.url));
  }
  try {
    const { session, returnTo } = await exchangeAuthorizationCode(code, state);
    const response = NextResponse.redirect(new URL(returnTo, request.url));
    saveCustomerSession(response.cookies, session);
    clearPendingAuthorization(response.cookies);
    return response;
  } catch {
    const response = NextResponse.redirect(new URL("/login?error=verification", request.url));
    clearPendingAuthorization(response.cookies);
    return response;
  }
}
