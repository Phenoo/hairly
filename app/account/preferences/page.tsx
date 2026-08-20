import { AccountShell, PreferencesPanel } from "@/components/customer-account-ui";
import { requireCustomerSession } from "@/lib/customer-guard";
import { getCustomerAccount } from "@/lib/customer-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Preferences | Aglory Hair and Cosmetics", robots: { index: false, follow: false } };

export default async function PreferencesPage() {
  const session = await requireCustomerSession("/account/preferences");
  const customer = await getCustomerAccount(session, 1);
  return <AccountShell customer={customer}><PreferencesPanel /></AccountShell>;
}
