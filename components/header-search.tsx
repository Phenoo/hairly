"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories, money, products, slugify } from "@/lib/store-data";

export function HeaderSearch({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const normalized = query.trim().toLowerCase();
  const matchingProducts = normalized
    ? products
        .filter((product) =>
          `${product.brand} ${product.name} ${product.category} ${product.description}`
            .toLowerCase()
            .includes(normalized),
        )
        .slice(0, 4)
    : [];
  const matchingCategories = normalized
    ? categories
        .filter((category) =>
          `${category.name} ${category.note}`.toLowerCase().includes(normalized),
        )
        .slice(0, 2)
    : [];
  const matchingBrands = normalized
    ? [...new Set(products.map((product) => product.brand))]
        .filter((brand) => brand.toLowerCase().includes(normalized))
        .slice(0, 2)
    : [];

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  const submit = () => {
    if (!query.trim()) return;
    setOpen(false);
    onNavigate?.();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="header-search" ref={wrapperRef}>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <Search size={18} aria-hidden="true" />
        <input
          aria-label="Search products, brands and categories"
          autoComplete="off"
          placeholder="Search products, brands and categories"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
          >
            <X size={16} />
          </button>
        )}
      </form>
      {open && normalized && (
        <div className="header-search-results" role="region" aria-label="Search suggestions">
          {matchingProducts.length > 0 && (
            <div className="header-search-products">
              <span className="search-result-label">Products</span>
              {matchingProducts.map((product) => (
                <Link
                  href={`/products/${product.slug}`}
                  key={product.id}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                >
                  <Image src={product.image} alt="" width={48} height={48} />
                  <span>
                    <small>{product.brand}</small>
                    {product.name}
                  </span>
                  <strong>{money(product.price)}</strong>
                </Link>
              ))}
            </div>
          )}
          {(matchingCategories.length > 0 || matchingBrands.length > 0) && (
            <div className="header-search-routes">
              <span className="search-result-label">Browse</span>
              {matchingCategories.map((category) => (
                <Link
                  href={`/category/${category.slug}`}
                  key={category.slug}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                >
                  Category <strong>{category.name}</strong>
                </Link>
              ))}
              {matchingBrands.map((brand) => (
                <Link
                  href={`/brands/${slugify(brand)}`}
                  key={brand}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                >
                  Brand <strong>{brand}</strong>
                </Link>
              ))}
            </div>
          )}
          {!matchingProducts.length && !matchingCategories.length && !matchingBrands.length && (
            <div className="header-search-empty">
              No exact match. Press Enter to see the full search page.
            </div>
          )}
          <button type="button" className="header-search-all" onClick={submit}>
            See all results for “{query.trim()}”
          </button>
        </div>
      )}
    </div>
  );
}
