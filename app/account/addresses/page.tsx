import { AccountShell, AddressesManager } from "@/components/customer-account-ui";
import { requireCustomerSession } from "@/lib/customer-guard";
import { getCustomerAccount } from "@/lib/customer-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Addresses | Aglory Hair and Cosmetics", robots: { index: false, follow: false } };

export default async function AddressesPage() {
  const session = await requireCustomerSession("/account/addresses");
  const customer = await getCustomerAccount(session, 1);
  return <AccountShell customer={customer}><AddressesManager addresses={customer.addresses.nodes} /></AccountShell>;
}
