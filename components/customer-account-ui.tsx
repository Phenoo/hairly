"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, LogOut, MapPin, PackageCheck, ShieldCheck, UserRound } from "lucide-react";
import type { CustomerAccount, CustomerAddress, CustomerOrder } from "@/lib/customer-data";
import type { ShopifyCart } from "@/lib/shopify-types";
import { money } from "@/lib/store-data";
import { useStorefront } from "@/lib/storefront-context";
import { trackCommerceEvent } from "@/lib/analytics";
import { SkeletonImage } from "@/components/ui/skeleton-image";

export function AccountShell({ customer, children }: { customer: CustomerAccount; children: React.ReactNode }) {
  return (
    <section className="route-page container section-space">
      <div className="page-kicker">
        <span className="eyebrow">Shopify customer account</span>
        <h1>Welcome back, <em>{customer.firstName || customer.displayName}.</em></h1>
        <p>Review orders, delivery information and account details securely through Shopify.</p>
      </div>
      <div className="mb-8 flex flex-wrap gap-2 border-b border-[#dedfe8] pb-5 text-sm font-semibold text-[#0d125d]">
        <Link className="button-secondary" href="/account">Overview</Link>
        <Link className="button-secondary" href="/account/orders">Orders</Link>
        <Link className="button-secondary" href="/account/addresses">Addresses</Link>
        <Link className="button-secondary" href="/account/profile">Profile</Link>
        <Link className="button-secondary" href="/account/wishlist">Wishlist</Link>
        <Link className="button-secondary" href="/account/preferences">Preferences</Link>
        <Link className="button-secondary" href="/account/security">Security</Link>
      </div>
      {children}
    </section>
  );
}

export function AccountDashboard({ customer }: { customer: CustomerAccount }) {
  const recentOrder = customer.orders.nodes[0];
  useEffect(() => { trackCommerceEvent("view_account", {}); }, []);
  return (
    <div className="account-grid">
      <div className="account-card account-welcome">
        <UserRound size={26} />
        <span className="eyebrow">Account</span>
        <h2>{customer.displayName}</h2>
        <p>{customer.emailAddress?.emailAddress}</p>
        <Link className="button button-dark" href="/account/profile">Manage profile <ArrowRight size={16} /></Link>
      </div>
      <div className="account-card">
        <span className="eyebrow">Latest order</span>
        {recentOrder ? <>
          <h3>{recentOrder.name}</h3>
          <p>{formatDate(recentOrder.processedAt)} · {formatStatus(recentOrder.fulfillmentStatus)}</p>
          <Link className="text-button" href={`/account/orders/${encodeURIComponent(recentOrder.id)}`}>View order <ArrowRight size={15} /></Link>
        </> : <><h3>No orders yet</h3><p>Your Shopify orders will appear here after purchase.</p><Link className="text-button" href="/shop">Start shopping <ArrowRight size={15} /></Link></>}
      </div>
      <div className="account-card">
        <MapPin size={20} />
        <span className="eyebrow">Default address</span>
        {customer.defaultAddress ? <p>{customer.defaultAddress.formatted.join(", ")}</p> : <p>Add an address to make checkout faster.</p>}
        <Link className="text-button" href="/account/addresses">Manage addresses <ArrowRight size={15} /></Link>
      </div>
      <div className="account-card">
        <PackageCheck size={20} />
        <span className="eyebrow">Order support</span>
        <p>Open an order to see Shopify fulfillment and tracking details when they are available.</p>
        <Link className="text-button" href="/account/orders">View orders <ArrowRight size={15} /></Link>
      </div>
    </div>
  );
}

export function OrdersList({ orders }: { orders: CustomerOrder[] }) {
  if (!orders.length) return <div className="utility-card"><PackageCheck size={25} /><h2>No orders yet.</h2><p>When you complete an order with this email address, it will appear here.</p><Link className="button button-dark" href="/shop">Continue shopping</Link></div>;
  return <div className="grid gap-4">
    {orders.map((order) => <article key={order.id} className="rounded-xl border border-[#dedfe8] bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><span className="eyebrow">Order</span><h2 className="font-serif text-2xl font-bold text-[#0d125d]">{order.name}</h2><p className="mt-1 text-sm text-slate-600">{formatDate(order.processedAt)} · {formatStatus(order.fulfillmentStatus)}</p></div><strong>{money(Number(order.totalPrice.amount), order.totalPrice.currencyCode)}</strong></div>
      <p className="mt-3 text-sm text-slate-700">{order.lineItems.nodes.reduce((sum, item) => sum + item.quantity, 0)} item{order.lineItems.nodes.reduce((sum, item) => sum + item.quantity, 0) === 1 ? "" : "s"}</p>
      <Link className="text-button mt-4 inline-flex" href={`/account/orders/${encodeURIComponent(order.id)}`}>View details <ArrowRight size={15} /></Link>
    </article>)}
  </div>;
}

export function OrderDetails({ order }: { order: CustomerOrder }) {
  const { cartId, adoptCart } = useStorefront();
  const [reorderStatus, setReorderStatus] = useState<string>();
  const reorder = async () => {
    setReorderStatus(undefined);
    try {
      const response = await fetch("/api/account/reorder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: order.id, cartId }) });
      const result = await response.json() as { cart?: ShopifyCart; unavailableCount?: number; error?: string };
      if (!response.ok || !result.cart) throw new Error(result.error || "We couldn't add these items right now.");
      adoptCart(result.cart);
      trackCommerceEvent("reorder", { item_count: result.cart.lines.length });
      setReorderStatus(result.unavailableCount ? `${result.unavailableCount} unavailable item${result.unavailableCount === 1 ? " was" : "s were"} skipped. Available items were added to your bag.` : "Available items were added to your bag.");
    } catch (error) { setReorderStatus(error instanceof Error ? error.message : "We couldn't add these items right now."); }
  };
  return <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
    <div className="rounded-xl border border-[#dedfe8] bg-white p-5"><span className="eyebrow">{order.name}</span><h2 className="font-serif text-3xl font-bold text-[#0d125d]">Order details</h2><p className="mt-2 text-sm text-slate-600">Placed {formatDate(order.processedAt)} · {formatStatus(order.financialStatus)} · {formatStatus(order.fulfillmentStatus)}</p>
      <div className="mt-6 space-y-4">{order.lineItems.nodes.map((item) => <div key={item.id} className="flex gap-4 border-t border-[#eef0f4] pt-4"><div className="h-16 w-16 shrink-0 overflow-hidden rounded bg-slate-100"><SkeletonImage className="h-full w-full object-cover" containerClassName="w-full h-full" width={64} height={64} src={item.image?.url || "/unavailable_product.png"} alt={item.image?.altText || item.title} /></div><div className="min-w-0 flex-1"><strong className="block text-[#0d125d]">{item.title}</strong><span className="text-sm text-slate-600">{item.variantTitle || ""} · Qty {item.quantity}</span></div><strong>{item.totalPrice ? money(Number(item.totalPrice.amount), item.totalPrice.currencyCode) : ""}</strong></div>)}</div>
    </div>
    <aside className="space-y-5"><div className="rounded-xl border border-[#dedfe8] bg-white p-5"><span className="eyebrow">Delivery</span><h3 className="mt-1 font-serif text-2xl font-bold text-[#0d125d]">Fulfillment</h3>{order.fulfillments.nodes.length ? <div className="mt-4 space-y-3">{order.fulfillments.nodes.map((fulfillment) => <div key={fulfillment.id} className="rounded-lg bg-slate-50 p-3 text-sm"><strong>{formatStatus(fulfillment.latestShipmentStatus || fulfillment.status)}</strong>{fulfillment.estimatedDeliveryAt && <p>Estimated delivery: {formatDate(fulfillment.estimatedDeliveryAt)}</p>}{fulfillment.trackingInformation.map((tracking, index) => <p key={`${tracking.number}-${index}`}>{tracking.url ? <a className="underline" href={tracking.url} target="_blank" rel="noreferrer">Track with {tracking.company || "carrier"}</a> : `${tracking.company || "Carrier"}: ${tracking.number || "Tracking unavailable"}`}</p>)}</div>)}</div> : <p className="mt-3 text-sm text-slate-600">Shopify has not provided tracking information for this order.</p>}</div>
      <div className="rounded-xl border border-[#dedfe8] bg-white p-5"><span className="eyebrow">Order total</span><dl className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{order.subtotal ? money(Number(order.subtotal.amount), order.subtotal.currencyCode) : "—"}</dd></div><div className="flex justify-between"><dt>Delivery</dt><dd>{money(Number(order.totalShipping.amount), order.totalShipping.currencyCode)}</dd></div><div className="flex justify-between"><dt>Tax</dt><dd>{order.totalTax ? money(Number(order.totalTax.amount), order.totalTax.currencyCode) : "—"}</dd></div><div className="flex justify-between border-t pt-2 font-bold"><dt>Total</dt><dd>{money(Number(order.totalPrice.amount), order.totalPrice.currencyCode)}</dd></div></dl><button className="button button-dark mt-5" type="button" onClick={() => void reorder()}>Reorder available items</button>{reorderStatus && <p className="mt-3 text-sm" role="status">{reorderStatus}</p>}<p className="mt-4 text-sm text-slate-600">Returns are handled according to the <Link className="underline" href="/policies/delivery-returns">Returns Policy</Link>. A return action is shown only when Shopify has been configured to support it.</p></div></aside>
  </div>;
}

async function accountMutation(body: Record<string, unknown>) {
  const response = await fetch("/api/account", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await response.json() as { error?: string };
  if (!response.ok) throw new Error(data.error || "We couldn't save that change.");
}

export function ProfileForm({ customer }: { customer: CustomerAccount }) {
  const router = useRouter(); const [status, setStatus] = useState<string>();
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setStatus(undefined); const data = new FormData(event.currentTarget); try { await accountMutation({ action: "profile", firstName: data.get("firstName"), lastName: data.get("lastName") }); setStatus("Saved."); router.refresh(); } catch (error) { setStatus(error instanceof Error ? error.message : "We couldn't save that change."); } };
  return <form onSubmit={submit} className="max-w-xl rounded-xl border border-[#dedfe8] bg-white p-6"><span className="eyebrow">Profile</span><h2 className="mt-1 font-serif text-3xl font-bold text-[#0d125d]">Your details</h2><p className="mt-2 text-sm text-slate-600">Your sign-in email is managed by Shopify’s passwordless customer accounts service.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><label>First name<input name="firstName" defaultValue={customer.firstName || ""} autoComplete="given-name" /></label><label>Last name<input name="lastName" defaultValue={customer.lastName || ""} autoComplete="family-name" /></label></div><button className="button button-dark mt-5" type="submit">Save details</button>{status && <p className="mt-3 text-sm" role="status">{status}</p>}</form>;
}

export function AddressesManager({ addresses }: { addresses: CustomerAddress[] }) {
  const router = useRouter(); const [status, setStatus] = useState<string>(); const [editing, setEditing] = useState<CustomerAddress | undefined>();
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setStatus(undefined); const form = new FormData(event.currentTarget); const address = Object.fromEntries(["firstName", "lastName", "address1", "address2", "city", "zip", "territoryCode", "zoneCode", "phoneNumber"].map((key) => [key, form.get(key)])); try { await accountMutation(editing ? { action: "address-update", addressId: editing.id, address, defaultAddress: form.get("defaultAddress") === "on" } : { action: "address-create", address, defaultAddress: form.get("defaultAddress") === "on" }); setEditing(undefined); event.currentTarget.reset(); setStatus(editing ? "Address updated." : "Address saved."); trackCommerceEvent(editing ? "address_updated" : "address_added", {}); router.refresh(); } catch (error) { setStatus(error instanceof Error ? error.message : "We couldn't save that address."); } };
  const remove = async (addressId: string) => { if (!window.confirm("Remove this saved address?")) return; try { await accountMutation({ action: "address-delete", addressId }); setStatus("Address removed."); router.refresh(); } catch (error) { setStatus(error instanceof Error ? error.message : "We couldn't remove that address."); } };
  return <div className="grid gap-6 lg:grid-cols-2"><div className="rounded-xl border border-[#dedfe8] bg-white p-6"><span className="eyebrow">Saved addresses</span><h2 className="mt-1 font-serif text-3xl font-bold text-[#0d125d]">Delivery details</h2><div className="mt-5 space-y-3">{addresses.length ? addresses.map((address) => <div key={address.id} className="rounded-lg border border-[#eef0f4] p-3 text-sm"><p>{address.formatted.join(", ")}</p><button type="button" onClick={() => setEditing(address)} className="mt-2 underline">Edit</button><button type="button" onClick={() => void remove(address.id)} className="ml-4 mt-2 underline">Remove</button></div>) : <p className="text-sm text-slate-600">No saved addresses yet.</p>}</div></div><form key={editing?.id || "new"} onSubmit={submit} className="rounded-xl border border-[#dedfe8] bg-white p-6"><span className="eyebrow">{editing ? "Edit address" : "Add address"}</span><div className="mt-4 grid gap-3 sm:grid-cols-2"><label>First name<input name="firstName" defaultValue={editing?.firstName || ""} autoComplete="given-name" /></label><label>Last name<input name="lastName" defaultValue={editing?.lastName || ""} autoComplete="family-name" /></label></div><label className="mt-3 block">Address line 1<input required name="address1" defaultValue={editing?.address1 || ""} autoComplete="address-line1" /></label><label className="mt-3 block">Address line 2<input name="address2" defaultValue={editing?.address2 || ""} autoComplete="address-line2" /></label><div className="mt-3 grid gap-3 sm:grid-cols-2"><label>Town or city<input required name="city" defaultValue={editing?.city || ""} autoComplete="address-level2" /></label><label>Postcode<input name="zip" defaultValue={editing?.zip || ""} autoComplete="postal-code" /></label><label>Country code<input required name="territoryCode" defaultValue={editing?.territoryCode || "GB"} maxLength={3} autoComplete="country" /></label><label>County / region<input name="zoneCode" defaultValue={editing?.zoneCode || ""} autoComplete="address-level1" /></label></div><label className="mt-3 block">Phone (optional)<input name="phoneNumber" defaultValue={editing?.phoneNumber || ""} placeholder="+441234567890" autoComplete="tel" /></label><label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" name="defaultAddress" /> Set as default</label><button className="button button-dark mt-5" type="submit">{editing ? "Update address" : "Save address"}</button>{editing && <button type="button" className="ml-3 underline" onClick={() => setEditing(undefined)}>Cancel</button>}{status && <p className="mt-3 text-sm" role="status">{status}</p>}</form></div>;
}

export function AccountWishlist() { const { wishlist } = useStorefront(); return <div className="rounded-xl border border-[#dedfe8] bg-white p-6"><span className="eyebrow">Wishlist</span><h2 className="mt-1 font-serif text-3xl font-bold text-[#0d125d]">Saved on this device</h2><p className="mt-2 text-sm text-slate-600">{wishlist.length ? `${wishlist.length} product${wishlist.length === 1 ? "" : "s"} saved in this browser.` : "Save products with the heart icon while you shop."} Persistent account wishlists need a Shopify customer metafield definition before they can be enabled safely.</p><Link className="button button-dark mt-5" href="/wishlist">View wishlist</Link></div>; }

export function SecurityPanel() { return <div className="max-w-xl rounded-xl border border-[#dedfe8] bg-white p-6"><ShieldCheck size={26} className="text-[#0d125d]" /><span className="eyebrow mt-3 block">Passwordless security</span><h2 className="mt-1 font-serif text-3xl font-bold text-[#0d125d]">No Aglory password is stored.</h2><p className="mt-3 text-sm text-slate-600">Shopify sends the secure email verification code and controls your customer session. Signing out ends this storefront session and returns to Shopify’s configured logout flow.</p><a className="button button-dark mt-5" href="/auth/logout" onClick={() => trackCommerceEvent("logout", {})}><LogOut size={16} /> Sign out</a></div>; }

export function PreferencesPanel() { return <div className="max-w-xl rounded-xl border border-[#dedfe8] bg-white p-6"><span className="eyebrow">Preferences</span><h2 className="mt-1 font-serif text-3xl font-bold text-[#0d125d]">Privacy and communications</h2><p className="mt-3 text-sm text-slate-600">Analytics consent is managed in the site cookie settings. Marketing preferences will be connected only after the required Shopify customer permissions are enabled.</p><Link className="button button-outline mt-5" href="/policies/cookies">Cookie settings</Link></div>; }

function formatDate(value: string) { return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value)); }
function formatStatus(value?: string | null) { return value ? value.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase()) : "Pending"; }
