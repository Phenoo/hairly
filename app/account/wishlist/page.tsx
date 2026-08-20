import { AccountShell, AccountWishlist } from "@/components/customer-account-ui";
import { requireCustomerSession } from "@/lib/customer-guard";
import { getCustomerAccount } from "@/lib/customer-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Wishlist | Aglory Hair and Cosmetics", robots: { index: false, follow: false } };

export default async function AccountWishlistPage() {
  const session = await requireCustomerSession("/account/wishlist");
  const customer = await getCustomerAccount(session, 1);
  return <AccountShell customer={customer}><AccountWishlist /></AccountShell>;
}
