import { NextResponse } from "next/server";
import { clearCustomerSession, createLogoutUrl } from "@/lib/customer-account";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  let destination = new URL("/", request.url).toString();
  try { destination = await createLogoutUrl(); } catch { /* Clear the local session even if Shopify discovery is unavailable. */ }
  const response = NextResponse.redirect(new URL(destination, request.url));
  clearCustomerSession(response.cookies);
  return response;
}
