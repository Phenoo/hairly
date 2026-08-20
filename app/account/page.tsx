import { AccountDashboard, AccountShell } from "@/components/customer-account-ui";
import { requireCustomerSession } from "@/lib/customer-guard";
import { getCustomerAccount } from "@/lib/customer-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Your account | Aglory Hair and Cosmetics", robots: { index: false, follow: false } };

export default async function AccountRoute() {
  const session = await requireCustomerSession("/account");
  const customer = await getCustomerAccount(session, 5);
  return <AccountShell customer={customer}><AccountDashboard customer={customer} /></AccountShell>;
}
