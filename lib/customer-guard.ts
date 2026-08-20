import { redirect } from "next/navigation";
import { getCustomerSession, sessionNeedsRefresh, type CustomerSession } from "@/lib/customer-account";

export async function requireCustomerSession(returnTo: string): Promise<CustomerSession> {
  const session = await getCustomerSession();
  if (!session) redirect(`/auth/login?returnTo=${encodeURIComponent(returnTo)}`);
  if (sessionNeedsRefresh(session)) redirect(`/auth/refresh?returnTo=${encodeURIComponent(returnTo)}`);
  return session;
}
