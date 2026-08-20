import { AccountShell, SecurityPanel } from "@/components/customer-account-ui";
import { requireCustomerSession } from "@/lib/customer-guard";
import { getCustomerAccount } from "@/lib/customer-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Security | Aglory Hair and Cosmetics", robots: { index: false, follow: false } };

export default async function SecurityPage() {
  const session = await requireCustomerSession("/account/security");
  const customer = await getCustomerAccount(session, 1);
  return <AccountShell customer={customer}><SecurityPanel /></AccountShell>;
}
