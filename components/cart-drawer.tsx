"use client";

import Link from "next/link";
import {
  ArrowRight,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { money } from "@/lib/store-data";
import { useStorefront } from "@/lib/storefront-context";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { SkeletonImage } from "@/components/ui/skeleton-image";

const FREE_SHIPPING_THRESHOLD = 40;

export function CartDrawer() {
  const {
    cart,
    cartCount,
    cartTotal,
    cartCurrency,
    isCartOpen,
    setIsCartOpen,
    closeCart,
    changeQuantity,
    removeFromCart,
    checkoutUrl,
    isCartUpdating,
    catalog,
    addToCart,
    beginCheckout,
  } = useStorefront();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const freeShippingProgress = Math.min(
    100,
    (cartTotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  // Quick upsells: products not in cart
  const cartIds = cart.map((line) => line.product.id);
  const upsellItems = catalog.filter((p) => !cartIds.includes(p.id)).slice(0, 2);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        side="right"
        className="cart-drawer-sheet flex h-full w-full flex-col bg-white p-0 shadow-2xl sm:max-w-md"
      >
        {/* Header */}
        <div className="cart-drawer-header flex items-center justify-between border-b border-[#dedfe8] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-[#0d125d]" />
            <SheetTitle className="font-serif text-xl font-bold tracking-tight text-[#0d125d]">
              Shopping Bag
            </SheetTitle>
            <span className="rounded-full bg-[#0d125d] px-2.5 py-0.5 text-xs font-bold text-white">
              {cartCount}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#0d125d]"
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="cart-free-shipping-bar border-b border-[#dedfe8] bg-[#f8f6fa] px-5 py-3">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-[#0d125d]">
              <Truck size={14} className="text-[#9f70a5]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-700 font-bold">
                  🎉 You have unlocked Free UK Delivery!
                </span>
              ) : (
                <span>
                  Add <strong>£{remainingForFreeShipping.toFixed(2)}</strong> for{" "}
                  <strong>Free UK Delivery</strong>
                </span>
              )}
            </span>
            <span className="text-[11px] font-bold text-[#9f70a5]">
              {Math.round(freeShippingProgress)}%
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#e6e0eb]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#9f70a5] to-[#0d125d] transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Line Items */}
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="flex size-18 items-center justify-center rounded-full bg-[#f3eaf4] text-[#9f70a5]">
              <ShoppingBag size={32} />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-[#0d125d]">
              Your bag is currently empty
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#5d6077]">
              Explore our curated multicultural beauty selection, wigs &
              extensions, and expert hair care.
            </p>
            <div className="mt-6 flex w-full flex-col gap-2.5">
              <Link
                href="/shop"
                onClick={closeCart}
                className="button button-dark flex w-full items-center justify-center gap-2"
              >
                Shop all beauty <ArrowRight size={16} />
              </Link>
              <Link
                href="/category/hair-care"
                onClick={closeCart}
                className="button button-outline flex w-full items-center justify-center"
              >
                Explore hair care
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="cart-items-scroll flex-1 overflow-y-auto px-5 py-4">
              <div className="divide-y divide-[#eee]">
                {cart.map((line) => (
                  <div
                    key={line.id}
                    className="flex gap-3.5 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="relative size-18 shrink-0 overflow-hidden rounded-md border border-[#e8e9f0] bg-white p-1">
                      <SkeletonImage
                        src={line.product.image}
                        alt={line.product.name}
                        fill
                        className="object-contain"
                        sizes="72px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <span className="text-[10px] font-bold tracking-wider uppercase text-[#9f70a5]">
                          {line.product.brand}
                        </span>
                        <Link
                          href={`/products/${line.product.slug}`}
                          onClick={closeCart}
                          className="line-clamp-1 block text-xs font-bold text-[#0d125d] hover:underline"
                        >
                          {line.product.name}
                        </Link>
                        {line.variantTitle && (
                          <span className="mt-0.5 inline-block rounded bg-[#f3eef5] px-2 py-0.5 text-[10px] font-semibold text-[#0d125d]">
                            {line.variantTitle}
                          </span>
                        )}
                      </div>

                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-[#dedfe8] bg-white">
                          <button
                            type="button"
                            disabled={isCartUpdating || line.quantity <= 1}
                            onClick={() =>
                              void changeQuantity(line.id, line.quantity - 1)
                            }
                            className="flex size-7 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-[#0d125d]">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={isCartUpdating}
                            onClick={() =>
                              void changeQuantity(line.id, line.quantity + 1)
                            }
                            className="flex size-7 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-[#0d125d]">
                            {money(line.unitPrice.amount * line.quantity, line.unitPrice.currencyCode)}
                          </span>
                          <button
                            type="button"
                            disabled={isCartUpdating}
                            onClick={() =>
                              void removeFromCart(line.id)
                            }
                            className="text-slate-400 transition hover:text-red-600"
                            aria-label={`Remove ${line.product.name} from bag`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Routine Add-ons */}
              {upsellItems.length > 0 && (
                <div className="mt-6 rounded-lg border border-[#dedfe8] bg-[#fbfafc] p-3.5">
                  <div className="text-[11px] font-bold text-[#0d125d]">
                    Complete your routine:
                  </div>
                  <div className="mt-2.5 flex flex-col gap-2">
                    {upsellItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-md bg-white p-2 border border-[#eaebee]"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative size-10 shrink-0 overflow-hidden rounded bg-slate-50">
                            <SkeletonImage
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain"
                              sizes="40px"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-[#0d125d]">
                              {item.name}
                            </p>
                            <span className="text-[11px] font-bold text-[#9f70a5]">
                              {money(item.price)}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          disabled={isCartUpdating}
                          className="shrink-0 rounded bg-[#0d125d] px-2.5 py-1 text-[11px] font-bold text-white transition hover:bg-[#070b42]"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            <div className="border-t border-[#dedfe8] bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-[#5d6077]">Subtotal</span>
                <span className="font-serif text-lg font-bold text-[#0d125d]">
                  {money(cartTotal, cartCurrency)}
                </span>
              </div>

              <div className="mb-4 flex items-center gap-1.5 rounded-md bg-[#eef3f8] px-2.5 py-1.5 text-[11px] text-[#0d125d]">
                <Store size={14} className="shrink-0 text-[#0d125d]" />
                <span>
                  <strong>Click & Collect:</strong> Free same-day pickup at 8
                  Cross St, Erith
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={checkoutUrl || "/checkout"}
                  aria-disabled={isCartUpdating || isCheckingOut}
                  onClick={(event) => {
                    event.preventDefault();
                    if (isCartUpdating || isCheckingOut) return;
                    setIsCheckingOut(true);
                    void beginCheckout().then((url) => {
                      if (url) window.location.assign(url);
                    }).catch(() => undefined).finally(() => setIsCheckingOut(false));
                  }}
                  className="button button-dark flex w-full items-center justify-center gap-2 py-3 text-sm font-bold shadow-md"
                >
                  <Lock size={15} /> {isCheckingOut ? "Preparing checkout…" : "Proceed to Checkout"} <ArrowRight size={15} />
                </a>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="text-center text-xs font-semibold text-[#5d6077] hover:text-[#0d125d] hover:underline"
                >
                  View full shopping bag
                </Link>
              </div>

              <p className="mt-3 text-center text-[10px] text-slate-400">
                Taxes, shipping, and promotional codes calculated at checkout.
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
