"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/store-data";
import { money } from "@/lib/store-data";
import { useStorefront } from "@/lib/storefront-context";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useStorefront();
  const [added, setAdded] = useState(false);
  const wishlisted = wishlist.some((item) => item.id === product.id);
  return (
    <article className="product-card">
      <button
        type="button"
        className={`heart-button ${wishlisted ? "is-active" : ""}`}
        aria-label={`${wishlisted ? "Remove" : "Add"} ${product.name} ${wishlisted ? "from" : "to"} wishlist`}
        onClick={() => toggleWishlist(product)}
      >
        <Heart size={17} fill={wishlisted ? "currentColor" : "none"} />
      </button>
      <Link className="product-image" href={`/products/${product.slug}`}>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <Image
          src={product.image}
          alt={product.imageAlt}
          width={720}
          height={900}
          sizes="(max-width: 600px) 50vw, (max-width: 900px) 50vw, 25vw"
        />
        <span className="quick-view">
          View product <ArrowUpRight size={14} />
        </span>
      </Link>
      <div className="product-copy">
        <span className="eyebrow">{product.brand}</span>
        <Link className="product-name" href={`/products/${product.slug}`}>
          {product.name}
        </Link>
        {product.inventory <= 5 && (
          <div className={`stock-state ${product.inventory <= 0 ? "is-out" : "is-low"}`}>
            {product.inventory <= 0 ? "Out of stock" : "Low stock"}
          </div>
        )}
        <div className="product-foot">
          <div className="product-pricing">
            <span className="price">{money(product.price)}</span>
            {product.compareAt && (
              <span className="compare">{money(product.compareAt)}</span>
            )}
          </div>
          {product.options ? (
            <Link className="quick-add" href={`/products/${product.slug}`}>
              Choose options
            </Link>
          ) : (
            <button
              type="button"
              className="quick-add"
              disabled={product.inventory <= 0}
              onClick={() => {
                addToCart(product);
                setAdded(true);
              }}
            >
              {product.inventory <= 0 ? "Unavailable" : added ? "Added" : "Add to bag"}
            </button>
          )}
        </div>
        <span className="sr-only" aria-live="polite">
          {added ? `${product.name} added to bag` : ""}
        </span>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="product-grid shop-grid">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
