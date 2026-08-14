"use client";

import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/store-data";
import { money } from "@/lib/store-data";
import { useStorefront } from "@/lib/storefront-context";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useStorefront();
  const [added, setAdded] = useState(false);
  const wishlisted = wishlist.some((item) => item.id === product.id);
  return <article className="product-card"><button type="button" className={`heart-button ${wishlisted ? "is-active" : ""}`} aria-label={`${wishlisted ? "Remove" : "Add"} ${product.name} ${wishlisted ? "from" : "to"} wishlist`} onClick={() => toggleWishlist(product)}><Heart size={17} fill={wishlisted ? "currentColor" : "none"} /></button><Link className="product-image" href={`/products/${product.slug}`}><span className="product-tag">{product.tag || "Featured"}</span><img src={product.image} alt={product.imageAlt} /><span className="quick-view">View product <ArrowUpRight size={14} /></span></Link><div className="product-copy"><span className="eyebrow">{product.brand}</span><Link className="product-name" href={`/products/${product.slug}`}>{product.name}</Link><div className="rating"><span className="stars">★★★★★</span> <span>{product.rating} ({product.reviews})</span></div><div className="product-foot"><span className="price">{money(product.price)}</span>{product.compareAt && <span className="compare">{money(product.compareAt)}</span>}{product.options ? <Link className="quick-add" href={`/products/${product.slug}`}>View options</Link> : <button type="button" className="quick-add" onClick={() => { addToCart(product); setAdded(true); }}>{added ? "Added" : "Quick add"}</button>}</div></div></article>;
}

export function ProductGrid({ items }: { items: Product[] }) { return <div className="product-grid shop-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>; }
