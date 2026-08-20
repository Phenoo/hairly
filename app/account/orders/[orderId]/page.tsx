import { notFound } from "next/navigation";
import { AccountShell, OrderDetails } from "@/components/customer-account-ui";
import { requireCustomerSession } from "@/lib/customer-guard";
import { getCustomerAccount, getCustomerOrder } from "@/lib/customer-data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Order details | Aglory Hair and Cosmetics", robots: { index: false, follow: false } };

export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const decodedId = decodeURIComponent(orderId);
  const returnTo = `/account/orders/${encodeURIComponent(decodedId)}`;
  const session = await requireCustomerSession(returnTo);
  const [customer, order] = await Promise.all([getCustomerAccount(session, 1), getCustomerOrder(session, decodedId)]);
  if (!order) notFound();
  return <AccountShell customer={customer}><OrderDetails order={order} /></AccountShell>;
}
