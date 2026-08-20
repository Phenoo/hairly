import { NextResponse } from "next/server";
import { createAuthorizationRequest, savePendingAuthorization, safeReturnTo } from "@/lib/customer-account";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const returnTo = safeReturnTo(new URL(request.url).searchParams.get("returnTo"));
    const pending = await createAuthorizationRequest(returnTo);
    const response = NextResponse.redirect(pending.authorizationUrl);
    savePendingAuthorization(response.cookies, pending);
    return response;
  } catch {
    return NextResponse.redirect(new URL("/login?error=configuration", request.url));
  }
}
