"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories, money, slugify, type Product } from "@/lib/store-data";
import { useStorefront } from "@/lib/storefront-context";
import { SkeletonImage } from "@/components/ui/skeleton-image";

export function HeaderSearch({ onNavigate }: { onNavigate?: () => void }) {
  const { catalog } = useStorefront();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [matchingProducts, setMatchingProducts] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const normalized = query.trim().toLowerCase();

  useEffect(() => {
    if (!normalized) return;
    const controller = new AbortController();
    const request = window.setTimeout(() => {
      void fetch(`/api/products?first=4&q=${encodeURIComponent(normalized)}`, {
        signal: controller.signal,
        cache: "no-store",
      })
        .then(async (response) => {
          if (!response.ok) throw new Error("Search unavailable");
          return response.json() as Promise<{ products: Product[] }>;
        })
        .then((result) => setMatchingProducts(result.products.slice(0, 4)))
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === "AbortError") return;
          setMatchingProducts(
            catalog
              .filter((product) =>
                `${product.brand} ${product.name} ${product.category} ${product.description}`
                  .toLowerCase()
                  .includes(normalized)
              )
              .slice(0, 4)
          );
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setIsSearching(false);
          }
        });
    }, 180);
    return () => {
      window.clearTimeout(request);
      controller.abort();
    };
  }, [catalog, normalized]);

  const visibleMatchingProducts = normalized ? matchingProducts : [];
  const matchingCategories = normalized
    ? categories
        .filter((category) =>
          `${category.name} ${category.note}`.toLowerCase().includes(normalized)
        )
        .slice(0, 2)
    : [];
  const matchingBrands = normalized
    ? [...new Set(visibleMatchingProducts.map((product) => product.brand))]
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
            if (event.target.value.trim()) setIsSearching(true);
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
          {isSearching ? (
            <div className="header-search-products" aria-busy="true">
              <span className="search-result-label">Searching…</span>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2.5">
                  <div className="size-12 shrink-0 rounded-md skeleton-shimmer" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 w-16 rounded skeleton-shimmer" />
                    <div className="h-3.5 w-40 rounded skeleton-shimmer" />
                  </div>
                  <div className="h-3.5 w-12 rounded skeleton-shimmer" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {visibleMatchingProducts.length > 0 && (
                <div className="header-search-products">
                  <span className="search-result-label">Products</span>
                  {visibleMatchingProducts.map((product) => (
                    <Link
                      href={`/products/${product.slug}`}
                      key={product.id}
                      onClick={() => {
                        setOpen(false);
                        onNavigate?.();
                      }}
                    >
                      <SkeletonImage
                        src={product.image}
                        alt={product.name}
                        width={48}
                        height={48}
                        containerClassName="size-12 shrink-0 rounded-md"
                      />
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
              {!visibleMatchingProducts.length && !matchingCategories.length && !matchingBrands.length && (
                <div className="header-search-empty">
                  No exact match. Press Enter to see the full search page.
                </div>
              )}
            </>
          )}
          <button type="button" className="header-search-all" onClick={submit}>
            See all results for “{query.trim()}”
          </button>
        </div>
      )}
    </div>
  );
}
