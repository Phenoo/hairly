"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ChevronRight, Heart, MapPin, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/store-data";
import { categorySlug, money, products } from "@/lib/store-data";
import { useStorefront } from "@/lib/storefront-context";
import { ProductGrid } from "@/components/product-card";
export function ProductDetail({ product }: { product: Product }) {
  const [option, setOption] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart, wishlist, toggleWishlist } = useStorefront();
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
      priceCurrency: "GBP",
      price: product.price.toFixed(2),
      availability: product.inventory > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
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
  const addProduct = () => {
    addToCart(product, option || undefined, quantity);
    setAdded(true);
  };
  return (
    <section className="product-detail container section-space">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><ChevronRight size={13} />
        <Link href={`/category/${categorySlug(product.category)}`}>{product.category}</Link><ChevronRight size={13} />
        <span aria-current="page">{product.name}</span>
      </nav>
      <div className="product-detail-grid">
        <div className="product-detail-image">
          <Image src={product.image} alt={product.imageAlt} width={1000} height={1200} sizes="(max-width: 900px) 100vw, 55vw" preload />
        </div>
        <div className="product-detail-copy">
          <Link className="product-brand-link" href={`/brands/${product.brand.toLowerCase().replaceAll(" ", "-")}`}>
            {product.brand}
          </Link>
          <h1>{product.name}</h1>
          <div className={`stock-state detail-stock ${product.inventory <= 0 ? "is-out" : product.inventory <= 5 ? "is-low" : ""}`}>
            {product.inventory <= 0
              ? "Currently unavailable"
              : product.inventory <= 5
                ? `Only ${product.inventory} left`
                : "In stock"}
          </div>
          <div className="detail-price">
            {money(product.price)}{" "}
            {product.compareAt && <del>{money(product.compareAt)}</del>}
          </div>
          <p>{product.description}</p>
          <span className="sku">SKU: {product.sku}</span>
          {product.options && (
            <div className="detail-options">
              <div className="option-label">
                <span className="eyebrow">
                  {product.type === "Makeup"
                    ? "Choose your shade"
                    : "Choose your option"}
                </span>
                <strong>{option || "Select an option"}</strong>
              </div>
              <div className="option-grid">
                {product.options.map((item, index) => (
                  <button
                    type="button"
                    key={item}
                    disabled={index === 6 && product.id === "black-opal"}
                    className={`${option === item ? "selected" : ""} ${index === 6 && product.id === "black-opal" ? "sold-out" : ""}`}
                    onClick={() => {
                      setOption(item);
                      setAdded(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="quantity-row">
            <span className="eyebrow">Quantity</span>
            <div className="quantity-control">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => Math.min(product.inventory, value + 1))} aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div className="detail-actions">
            <button
              className="button button-dark"
              disabled={product.inventory <= 0 || Boolean(product.options && !option)}
              onClick={addProduct}
            >
              {added ? "Added to bag" : "Add to bag"} <ShoppingBag size={16} />
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
          <div className="collection-note">
            Collection from 8 Cross Street, Erith can be selected at checkout.
            Availability is confirmed against your order.
          </div>
        </div>
      </div>
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
          items={products.filter((item) => item.id !== product.id).slice(0, 4)}
        />
      </section>
      <div className="mobile-sticky-product-cta">
        <span>{money(product.price)}</span>
        <button
          type="button"
          className="button button-dark"
          disabled={product.inventory <= 0 || Boolean(product.options && !option)}
          onClick={addProduct}
        >
          {product.options && !option ? "Choose an option" : "Add to bag"}
          <ShoppingBag size={15} />
        </button>
      </div>
    </section>
  );
}
