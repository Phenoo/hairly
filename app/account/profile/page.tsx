import { AccountShell, ProfileForm } from "@/components/customer-account-ui";
import { requireCustomerSession } from "@/lib/customer-guard";
import { getCustomerAccount } from "@/lib/customer-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Profile | Aglory Hair and Cosmetics", robots: { index: false, follow: false } };

export default async function ProfilePage() {
  const session = await requireCustomerSession("/account/profile");
  const customer = await getCustomerAccount(session, 1);
  return <AccountShell customer={customer}><ProfileForm customer={customer} /></AccountShell>;
}
