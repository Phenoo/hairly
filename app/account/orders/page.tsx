import { AccountShell, OrdersList } from "@/components/customer-account-ui";
import { requireCustomerSession } from "@/lib/customer-guard";
import { getCustomerAccount } from "@/lib/customer-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Orders | Aglory Hair and Cosmetics", robots: { index: false, follow: false } };

export default async function OrdersPage() {
  const session = await requireCustomerSession("/account/orders");
  const customer = await getCustomerAccount(session, 20);
  return <AccountShell customer={customer}><OrdersList orders={customer.orders.nodes} /></AccountShell>;
}
