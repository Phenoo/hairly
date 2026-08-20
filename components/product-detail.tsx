"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Heart, MapPin, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/store-data";
import { categorySlug, money } from "@/lib/store-data";
import { useStorefront } from "@/lib/storefront-context";
import { ProductGrid } from "@/components/product-card";
import { DeliveryTimer, TrustPerks } from "@/components/delivery-timer";
import { FrequentlyBoughtTogether } from "@/components/frequently-bought-together";
import { RecentlyViewedSection, RecentlyViewedTracker } from "@/components/recently-viewed";
import { trackCommerceEvent } from "@/lib/analytics";
import { SkeletonImage } from "@/components/ui/skeleton-image";

export function ProductDetail({ product }: { product: Product }) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart, wishlist, toggleWishlist, catalog, isCartUpdating, cartError } = useStorefront();
  const viewedProductRef = useRef<string | undefined>(undefined);
  const optionGroups = useMemo(() => product.optionGroups ?? [], [product.optionGroups]);
  const selectedVariant = useMemo(() => {
    if (!product.variants?.length) return undefined;
    if (!optionGroups.length) return product.variants.find((variant) => variant.id === product.defaultVariantId) || product.variants[0];
    if (optionGroups.some((group) => !selectedOptions[group.name])) return undefined;
    return product.variants.find((variant) => optionGroups.every((group) => variant.selectedOptions.some((option) => option.name === group.name && option.value === selectedOptions[group.name])));
  }, [optionGroups, product.defaultVariantId, product.variants, selectedOptions]);
  const displayVariant = selectedVariant || (!optionGroups.length ? product.variants?.find((variant) => variant.id === product.defaultVariantId) : undefined);
  const isValueAvailable = (name: string, value: string) => product.variants?.some((variant) =>
    variant.availableForSale && variant.selectedOptions.some((option) => option.name === name && option.value === value) &&
    Object.entries(selectedOptions).every(([selectedName, selectedValue]) => selectedName === name || variant.selectedOptions.some((option) => option.name === selectedName && option.value === selectedValue)),
  ) || false;
  const canAdd = Boolean(selectedVariant?.availableForSale || (!optionGroups.length && displayVariant?.availableForSale));
  useEffect(() => {
    if (viewedProductRef.current === product.id) return;
    viewedProductRef.current = product.id;
    trackCommerceEvent("view_item", {
      currency: product.currencyCode || "GBP",
      value: displayVariant?.price || product.price,
      items: [{ item_id: product.id, item_name: product.name, item_variant: displayVariant?.title, price: displayVariant?.price || product.price, quantity: 1 }],
    });
  }, [displayVariant?.price, displayVariant?.title, product]);
  const wished = wishlist.some((item) => item.id === product.id);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description,
    image: product.image,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      priceCurrency: product.currencyCode || "GBP",
      price: (displayVariant?.price || product.price).toFixed(2),
      availability: canAdd ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `https://www.agloryhairandcosmetics.co.uk/products/${product.slug}`,
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.agloryhairandcosmetics.co.uk/" },
      { "@type": "ListItem", position: 2, name: product.category, item: `https://www.agloryhairandcosmetics.co.uk/category/${categorySlug(product.category)}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://www.agloryhairandcosmetics.co.uk/products/${product.slug}` },
    ],
  };
  const addProduct = async () => {
    try {
      await addToCart(product, selectedVariant?.id || displayVariant?.id, quantity);
      setAdded(true);
    } catch {
      setAdded(false);
    }
  };
  return (
    <section className="product-detail container section-space">
      <RecentlyViewedTracker currentProduct={product} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><ChevronRight size={13} />
        <Link href={`/category/${categorySlug(product.category)}`}>{product.category}</Link><ChevronRight size={13} />
        <span aria-current="page">{product.name}</span>
      </nav>
      <div className="product-detail-grid">
        <div className="product-detail-image">
          <SkeletonImage
            src={displayVariant?.image || product.image}
            alt={product.imageAlt}
            width={1000}
            height={1200}
            sizes="(max-width: 900px) 100vw, 55vw"
            preload
            containerClassName="w-full h-full min-h-[420px] lg:min-h-[620px]"
          />
        </div>
        <div className="product-detail-copy">
          <Link className="product-brand-link" href={`/brands/${product.brand.toLowerCase().replaceAll(" ", "-")}`}>
            {product.brand}
          </Link>
          <h1>{product.name}</h1>
          <div className={`stock-state detail-stock ${displayVariant && !displayVariant.availableForSale ? "is-out" : ""}`}>
            {!selectedVariant && optionGroups.length
              ? "Choose options to check availability"
              : displayVariant?.availableForSale ? "In stock" : "Currently unavailable"}
          </div>
          <div className="detail-price">
            {money(displayVariant?.price || product.price, product.currencyCode)}{" "}
            {(displayVariant?.compareAt || product.compareAt) && <del>{money(displayVariant?.compareAt || product.compareAt || 0, product.currencyCode)}</del>}
          </div>
          <p>{product.description}</p>
          <span className="sku">SKU: {product.sku}</span>
          {optionGroups.length > 0 && (
            <div className="detail-options">
              {optionGroups.map((group) => (
                <fieldset className="mb-4" key={group.name}>
                  <legend className="option-label"><span className="eyebrow">Choose {group.name}</span><strong>{selectedOptions[group.name] || "Select an option"}</strong></legend>
                  <div className="option-grid">
                    {group.values.map((value) => {
                      const available = isValueAvailable(group.name, value);
                      return <button type="button" key={value} disabled={!available} aria-pressed={selectedOptions[group.name] === value} className={`${selectedOptions[group.name] === value ? "selected" : ""} ${!available ? "sold-out" : ""}`} onClick={() => { setSelectedOptions((current) => ({ ...current, [group.name]: value })); setAdded(false); }}>{value}</button>;
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          )}
          <DeliveryTimer />
          <div className="quantity-row">
            <span className="eyebrow">Quantity</span>
            <div className="quantity-control">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => Math.min(99, value + 1))} aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div className="detail-actions">
            <button
              className="button button-dark"
              disabled={!canAdd || isCartUpdating}
              onClick={addProduct}
            >
              {isCartUpdating ? "Adding…" : added ? "Added to bag" : "Add to bag"} <ShoppingBag size={16} />
            </button>
            <button
              className={`modal-wish ${wished ? "is-active" : ""}`}
              onClick={() => toggleWishlist(product)}
              aria-label={`${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist`}
            >
              <Heart size={18} fill={wished ? "currentColor" : "none"} />
            </button>
          </div>
          {added && (
            <p className="inline-success" role="status">
              Added to your bag. <Link href="/cart">View bag</Link>
            </p>
          )}
          {cartError && <p className="inline-success" role="alert">{cartError}</p>}
          <div className="modal-notes">
            <span>
              <Check size={14} /> Delivery timing confirmed at checkout
            </span>
            <span>
              <Check size={14} /> 30-day returns
            </span>
            <span>
              <MapPin size={14} /> Erith store collection available
            </span>
          </div>
          <TrustPerks />
          <div className="collection-note">
            Collection from 8 Cross Street, Erith can be selected at checkout.
            Availability is confirmed against your order.
          </div>
        </div>
      </div>
      <FrequentlyBoughtTogether product={product} />
      <div className="detail-accordions">
        <details open>
          <summary>Description</summary>
          <p>{product.description}</p>
        </details>
        <details>
          <summary>Delivery & returns</summary>
          <p>
            Delivery timing and charges are confirmed before payment. Eligible
            items can be returned within 30 days; hygiene and opened-product
            exclusions apply.
          </p>
        </details>
        <details>
          <summary>Need advice?</summary>
          <p>
            Our Erith store team can help you choose a shade, texture or
            routine.{" "}
            <a href="https://wa.me/447446841404">WhatsApp the team.</a>
          </p>
        </details>
        {product.details?.length ? (
          <details>
            <summary>Product details</summary>
            <dl className="product-facts">
              {product.details.map((detail) => (
                <div key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
          </details>
        ) : null}
        {product.howToUse ? (
          <details>
            <summary>How to use</summary>
            <p>{product.howToUse}</p>
          </details>
        ) : null}
        {product.ingredients ? (
          <details>
            <summary>Ingredients</summary>
            <p>{product.ingredients}</p>
          </details>
        ) : null}
      </div>
      <section className="related-products">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Complete the routine</span>
            <h2>
              You may also <em>like.</em>
            </h2>
          </div>
          <Link className="text-button" href="/shop">
            Shop all <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid
          items={catalog.filter((item) => item.id !== product.id).slice(0, 4)}
        />
      </section>
      <RecentlyViewedSection excludeId={product.id} />
      <div className="mobile-sticky-product-cta">
        <span>{money(displayVariant?.price || product.price, product.currencyCode)}</span>
        <button
          type="button"
          className="button button-dark"
          disabled={!canAdd || isCartUpdating}
          onClick={addProduct}
        >
          {optionGroups.length && !selectedVariant ? "Choose options" : "Add to bag"}
          <ShoppingBag size={15} />
        </button>
      </div>
    </section>
  );
}
