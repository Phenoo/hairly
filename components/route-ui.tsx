"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  HelpCircle,
  PackageCheck,
  Search,
  ShoppingBag,
} from "lucide-react";
import type { Product } from "@/lib/store-data";
import {
  brands,
  blogPosts,
  categories,
  image,
  money,
  slugify,
} from "@/lib/store-data";
import { ProductGrid, ProductGridSkeleton } from "@/components/product-card";
import { useStorefront } from "@/lib/storefront-context";
import { useEffect, useState } from "react";
import { SkeletonImage } from "@/components/ui/skeleton-image";

export function RouteIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
}) {
  return (
    <div className="page-kicker">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
}

export function ShopCatalog({
  items,
  pageInfo,
  title = (
    <>
      Shop all <em>beauty.</em>
    </>
  ),
  eyebrow = "Aglory catalogue",
}: {
  items: Product[];
  pageInfo?: { hasNextPage: boolean; endCursor: string | null };
  title?: React.ReactNode;
  eyebrow?: string;
}) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const activeCollection = searchParams.get("collection") || "";
  const [sort, setSort] = useState("featured");
  const [brandFilter, setBrandFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [optionFilter, setOptionFilter] = useState("all");
  const [catalogItems, setCatalogItems] = useState(items);
  const [nextPageInfo, setNextPageInfo] = useState(pageInfo);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const filterTypes: Record<string, Product["type"][]> = {
    "Hair care": ["Hair"],
    "Wigs & extensions": ["Wigs"],
    "Skin & body": ["Skin"],
    Makeup: ["Makeup"],
    Tools: ["Tools"],
    Men: ["Men"],
  };
  const filtered = catalogItems.filter((product) => {
    const categoryMatches =
      !activeCategory ||
      activeCategory === "All products" ||
      (filterTypes[activeCategory] || []).includes(product.type);
    const brandMatches = brandFilter === "all" || product.brand === brandFilter;
    const priceMatches =
      priceFilter === "all" ||
      (priceFilter === "under-10" && product.price < 10) ||
      (priceFilter === "10-25" && product.price >= 10 && product.price <= 25) ||
      (priceFilter === "over-25" && product.price > 25);
    const availabilityMatches =
      availabilityFilter === "all" ||
      (availabilityFilter === "in-stock" && product.inventory > 0) ||
      (availabilityFilter === "low-stock" && product.inventory > 0 && product.inventory <= 5);
    const optionMatches =
      optionFilter === "all" || Boolean(product.options?.includes(optionFilter));
    return categoryMatches && brandMatches && priceMatches && availabilityMatches && optionMatches;
  });
  const visibleItems = [...filtered].sort((a, b) =>
    sort === "price-low"
      ? a.price - b.price
      : sort === "price-high"
        ? b.price - a.price
        : sort === "best-selling"
          ? Number(Boolean(b.tag && ["Bestseller", "Top rated"].includes(b.tag))) - Number(Boolean(a.tag && ["Bestseller", "Top rated"].includes(a.tag)))
        : sort === "newest"
          ? Number(Boolean(b.tag && ["New", "New arrival", "Just in"].includes(b.tag))) - Number(Boolean(a.tag && ["New", "New arrival", "Just in"].includes(a.tag)))
          : 0,
  );
  const filterBrands = [...new Set(catalogItems.map((product) => product.brand))].sort();
  const filterOptions = [...new Set(catalogItems.flatMap((product) => product.options || []))].sort();
  const hasExtraFilters = [brandFilter, priceFilter, availabilityFilter, optionFilter].some((value) => value !== "all");
  const filterUrl = (filter: string) =>
    filter === "All products"
      ? "/shop"
      : `/shop?category=${encodeURIComponent(filter)}`;
  return (
    <section className="route-page container section-space">
      <RouteIntro
        eyebrow={eyebrow}
        title={title}
        body="Hair, skin and beauty essentials for every texture, tone and routine."
      />
      <div className="shop-toolbar">
        <div className="filter-pills">
          {[
            "All products",
            "Hair care",
            "Wigs & extensions",
            "Skin & body",
            "Makeup",
            "Tools",
            "Men",
          ].map((filter) => (
            <Link
              className={
                activeCategory === filter ||
                (!activeCategory && filter === "All products")
                  ? "is-active"
                  : ""
              }
              href={filterUrl(filter)}
              aria-current={
                activeCategory === filter ||
                (!activeCategory && filter === "All products")
                  ? "page"
                  : undefined
              }
              key={filter}
            >
              {filter}
            </Link>
          ))}
        </div>
        <Link className="catalog-search" href="/search">
          <Search size={16} />
          <span>Search products</span>
        </Link>
      </div>
      <details className="catalog-filter-drawer">
        <summary>
          <span>Filter products{hasExtraFilters ? " · Applied" : ""}</span>
          <ChevronDown size={16} />
        </summary>
        <div className="catalog-filter-grid">
          <label>
            <span>Brand</span>
            <select value={brandFilter} onChange={(event) => setBrandFilter(event.target.value)}>
              <option value="all">All brands</option>
              {filterBrands.map((brand) => <option value={brand} key={brand}>{brand}</option>)}
            </select>
          </label>
          <label>
            <span>Price</span>
            <select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}>
              <option value="all">Any price</option>
              <option value="under-10">Under £10</option>
              <option value="10-25">£10–£25</option>
              <option value="over-25">Over £25</option>
            </select>
          </label>
          <label>
            <span>Availability</span>
            <select value={availabilityFilter} onChange={(event) => setAvailabilityFilter(event.target.value)}>
              <option value="all">All products</option>
              <option value="in-stock">In stock</option>
              <option value="low-stock">Low stock</option>
            </select>
          </label>
          {filterOptions.length > 0 && (
            <label>
              <span>Colour / length</span>
              <select value={optionFilter} onChange={(event) => setOptionFilter(event.target.value)}>
                <option value="all">Any option</option>
                {filterOptions.map((option) => <option value={option} key={option}>{option}</option>)}
              </select>
            </label>
          )}
          {hasExtraFilters && (
            <button type="button" className="filter-clear" onClick={() => {
              setBrandFilter("all");
              setPriceFilter("all");
              setAvailabilityFilter("all");
              setOptionFilter("all");
            }}>Clear filters</button>
          )}
        </div>
      </details>
      <div className="shop-meta">
        <span>
          {visibleItems.length} result{visibleItems.length === 1 ? "" : "s"}
          {(activeCategory || activeCollection) && (
            <span className="muted"> · Filtered for your selection</span>
          )}
        </span>
        <label className="sort-control">
          <span>Sort</span>
          <select
            aria-label="Sort products"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="best-selling">Best selling</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
          <ChevronDown size={14} />
        </label>
      </div>
      {visibleItems.length ? (
        <ProductGrid items={visibleItems} />
      ) : (
        <div className="utility-card">
          <Search size={25} />
          <h2>No products in this view.</h2>
          <p>Try another category or browse all of Aglory.</p>
          <Link className="button button-outline" href="/shop">
            View all products
          </Link>
        </div>
      )}
      {isLoadingMore && (
        <div className="mt-8">
          <ProductGridSkeleton count={4} />
        </div>
      )}
      {nextPageInfo?.hasNextPage && nextPageInfo.endCursor && !activeCategory && !activeCollection && !hasExtraFilters && (
        <div className="mt-8 flex justify-center">
          <button type="button" className="button button-outline" disabled={isLoadingMore} onClick={() => {
            setIsLoadingMore(true);
            void fetch(`/api/products?after=${encodeURIComponent(nextPageInfo.endCursor!)}`).then(async (response) => {
              if (!response.ok) throw new Error("Unable to load more products.");
              return response.json() as Promise<{ products: Product[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } }>;
            }).then((page) => {
              setCatalogItems((current) => [...current, ...page.products]);
              setNextPageInfo(page.pageInfo);
            }).catch(() => undefined).finally(() => setIsLoadingMore(false));
          }}>{isLoadingMore ? "Loading more…" : "Load more products"}</button>
        </div>
      )}
      <div className="shop-guide">
        <div>
          <span>
            <strong>Need a little help?</strong> Speak with the Aglory team on
            WhatsApp and we’ll help you choose.
          </span>
        </div>
        <a
          className="text-button"
          href="https://wa.me/4407446841404"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp the team <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}

export function BrandsIndex() {
  return (
    <section className="route-page brands-page container section-space">
      <RouteIntro
        eyebrow="The Aglory index"
        title={
          <>
            Brands with <em>intention.</em>
          </>
        }
        body="Professional favourites, cult classics and the names worth knowing next."
      />
      <div className="featured-brand">
        <div>
          <span className="eyebrow">Featured brand</span>
          <h2>
            Made for your
            <br />
            <em>real routine.</em>
          </h2>
          <p>
            Explore thoughtful formulas from the brands our store team reaches
            for again and again.
          </p>
          <Link className="button button-dark" href="/brands/shea-moisture">
            Shop Shea Moisture <ArrowRight size={16} />
          </Link>
        </div>
        <SkeletonImage
          src={image("photo-1556229010-6c3f2c9ca5f8", 1000)}
          alt="Shea Moisture body care"
          width={600}
          height={600}
          containerClassName="brand-hero-img-wrap w-full h-full min-h-[360px]"
        />
      </div>
      <div className="brand-index">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Shop all brands</span>
            <h2>
              A–Z, with <em>favorites.</em>
            </h2>
          </div>
          <Link className="catalog-search" href="/search">
            <Search size={16} />
            <span>Find a brand</span>
          </Link>
        </div>
        <div className="brand-list">
          {brands.map((brand, index) => (
            <Link href={`/brands/${slugify(brand)}`} key={brand}>
              <span className="brand-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="brand-logo">
                <span aria-hidden="true">{brand.slice(0, 2).toUpperCase()}</span>
              </span>
              <strong>{brand}</strong>
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinderPage({ kind }: { kind: "hair" | "beauty" }) {
  const { catalog: products } = useStorefront();
  const hair = kind === "hair";
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState("");
  const options = hair
    ? ["Wigs", "Braiding hair", "Crochet", "Weave", "Extensions"]
    : [
        "Hair growth",
        "Dry hair",
        "Protective styling",
        "Wig care",
        "Uneven tone",
        "Men’s grooming",
      ];
  const matches = products.filter((product) => {
    const terms = selection.toLowerCase().split(/\s+/).filter(Boolean);
    const searchable =
      `${product.name} ${product.category} ${product.type} ${product.description}`.toLowerCase();
    return !terms.length || terms.every((term) => searchable.includes(term));
  });
  const choose = (option: string) => {
    setSelection(option);
    setStep(2);
  };
  return (
    <section className="finder-page container section-space">
      <div className="finder-intro">
        <span className="eyebrow">Find what suits you</span>
        <h1>
          {hair ? (
            <>
              Find your
              <br />
              <em>hair.</em>
            </>
          ) : (
            <>
              Find what feels
              <br />
              <em>right for you.</em>
            </>
          )}
        </h1>
        <p>
          Answer a few questions and we’ll show you products that fit your style
          and routine.
        </p>
        <div className="finder-progress">
          <span className={step >= 1 ? "active" : ""} />
          <span className={step >= 2 ? "active" : ""} />
          <span className={step >= 3 ? "active" : ""} />
        </div>
      </div>
      <div className="finder-card">
        {step < 3 ? (
          <>
            <span className="eyebrow">Step {step} of 3</span>
            <h2>
              {step === 1
                ? hair
                  ? "What kind of style are you looking for?"
                  : "What does your routine need today?"
                : "Ready to see your recommendations?"}
            </h2>
            {step === 1 ? (
              <div className="finder-options">
                {options.map((option) => (
                  <button
                    type="button"
                    className={selection === option ? "selected" : ""}
                    onClick={() => choose(option)}
                    key={option}
                  >
                    {option}
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            ) : (
              <>
                <p className="finder-selection">
                  You chose <strong>{selection}</strong>. We’ve matched the
                  closest products from this catalogue.
                </p>
                <button
                  type="button"
                  className="button button-dark finder-next"
                  onClick={() => setStep(3)}
                >
                  Show my matches <ArrowRight size={16} />
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <span className="eyebrow">Your matches</span>
            <h2>
              {matches.length
                ? "A few good places to start."
                : "No exact match yet."}
            </h2>
            {matches.length ? (
              <ProductGrid items={matches.slice(0, 4)} />
            ) : (
              <p>Try another answer or browse the full collection.</p>
            )}
            <button
              type="button"
              className="button button-outline finder-next"
              onClick={() => {
                setSelection("");
                setStep(1);
              }}
            >
              Start again
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export function BlogIndex() {
  return (
    <section className="route-page container section-space">
      <RouteIntro
        eyebrow="The Aglory Blog"
        title={
          <>
            Beauty wisdom
            <br />
            <em>worth keeping.</em>
          </>
        }
        body="Thoughtful, practical guidance for hair, skin, beauty and the rituals that make them yours."
      />
      <div className="blog-index-grid">
        {blogPosts.map((post) => (
          <Link
            className="blog-card"
            href={`/blog/${post.slug}`}
            key={post.slug}
          >
            <SkeletonImage
              src={post.image}
              alt={post.title}
              width={720}
              height={460}
              containerClassName="w-full aspect-[720/460]"
            />
            <div className="blog-card-copy">
              <span className="eyebrow">
                {post.category} / {post.read}
              </span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="blog-card-link">
                Read story <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function BlogArticle({ slug }: { slug: string }) {
  const post = blogPosts.find((item) => item.slug === slug) || blogPosts[0];
  return (
    <article className="article-page container section-space">
      <RouteIntro
        eyebrow={`${post.category} · ${post.read}`}
        title={<>{post.title}</>}
        body={post.excerpt}
      />
      <SkeletonImage
        src={post.image}
        alt={post.title}
        width={1200}
        height={600}
        priority
        containerClassName="article-hero w-full aspect-[2/1] min-h-[300px]"
      />
      <div className="article-body">
        <p>
          {post.excerpt} Beauty is personal, so the best routine is the one that
          makes sense for your texture, your time and your life.
        </p>
        <h2>Start with what your routine needs.</h2>
        <p>
          Look for products that help you feel confident in the next step. Keep
          the essentials close, learn what your hair and skin respond to, and
          let the ritual evolve with you.
        </p>
        <blockquote>
          “The right beauty routine should feel like support, not another thing
          to keep up with.”
        </blockquote>
        <h2>A few things to remember</h2>
        <ul>
          <li>Consistency matters more than complexity.</li>
          <li>Choose products that suit your texture and lifestyle.</li>
          <li>Ask for advice when you need it — Aglory is here to help.</li>
        </ul>
        <Link className="button button-dark" href="/shop">
          Shop beauty <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export function AccountPage() {
  const { wishlist } = useStorefront();
  return (
    <section className="account-page container section-space">
      <RouteIntro
        eyebrow="Saved on this device"
        title={
          <>
            Your shopping <em>shortcuts.</em>
          </>
        }
        body="Accounts are not connected yet. Your wishlist and bag are stored only in this browser."
      />
      <div className="account-grid">
        <div className="account-card account-welcome">
          <span className="account-avatar">A</span>
          <span className="eyebrow">Account service coming soon</span>
          <h2>
            Continue your
            <br />
            <em>current shop.</em>
          </h2>
          <Link className="button button-dark" href="/shop">
            Browse products <ArrowRight size={16} />
          </Link>
        </div>
        <div className="account-card">
          <span className="eyebrow">Recent orders</span>
          <h3>No orders yet</h3>
          <p>Order history will appear after secure customer accounts and checkout are connected.</p>
          <Link className="text-button" href="/shop">
            Start shopping <ArrowRight size={15} />
          </Link>
        </div>
        <div className="account-card">
          <span className="eyebrow">Saved products</span>
          <h3>
            {wishlist.length
              ? `${wishlist.length} saved product${wishlist.length === 1 ? "" : "s"}.`
              : "Your wishlist is empty."}
          </h3>
          <p>
            {wishlist.length
              ? "Your saved products are ready whenever you are."
              : "Tap the heart on any product to save it for later."}
          </p>
          <Link className="text-button" href="/wishlist">
            View wishlist <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      <div className="account-links">
        <Link href="/track-order">
          <PackageCheck size={18} /> Track an order <ArrowRight size={15} />
        </Link>
        <Link href="/wishlist">
          <Heart size={18} /> Wishlist <ArrowRight size={15} />
        </Link>
        <Link href="/contact">
          <HelpCircle size={18} /> Need help? <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}

export function ContactPage() {
  return (
    <section className="contact-page container section-space">
      <div className="contact-intro">
        <span className="eyebrow">Come closer</span>
        <h1>
          Let’s talk
          <br />
          <em>beauty.</em>
        </h1>
        <p>
          Questions about a product, your next style or a same-day delivery? The
          Aglory team is here.
        </p>
        <div className="contact-details">
          <a href="tel:01322333305">
            <span>Call the store</span>
            <strong>01322 333305</strong>
          </a>
          <a
            href="https://wa.me/447446841404"
            target="_blank"
            rel="noreferrer"
          >
            <span>WhatsApp us</span>
            <strong>+44 07446 841404</strong>
          </a>
          <a href="mailto:agloryltd@aol.com">
            <span>Email</span>
            <strong>agloryltd@aol.com</strong>
          </a>
        </div>
        <div className="contact-store-card">
          <span className="eyebrow">Visit the store</span>
          <strong>Aglory Hair and Cosmetics</strong>
          <p>8 Cross Street, Erith, Kent DA8 1RB</p>
          <p>Mon–Sat 9am–7pm · Sun 11am–4pm</p>
          <a
            className="text-button"
            href="https://www.google.com/maps/search/?api=1&query=8+Cross+Street+Erith+Kent+DA8+1RB"
            target="_blank"
            rel="noreferrer"
          >
            Get directions <ArrowRight size={15} />
          </a>
        </div>
      </div>
      <div className="contact-form-card">
        <span className="eyebrow">Fastest ways to reach us</span>
        <h2>
          Ask a real
          <br />
          <em>store expert.</em>
        </h2>
        <p>
          The website contact form stays offline until it is connected to the
          Aglory inbox. Call, WhatsApp or email the store directly in the meantime.
        </p>
        <div className="contact-direct-actions">
          <a className="button button-dark wide" href="https://wa.me/447446841404" target="_blank" rel="noreferrer">
            WhatsApp the team <ArrowUpRight size={16} />
          </a>
          <a className="button button-outline wide" href="mailto:agloryltd@aol.com">
            Email Aglory <ArrowRight size={16} />
          </a>
          <a className="text-button" href="tel:01322333305">Call 01322 333305</a>
        </div>
      </div>
    </section>
  );
}

export function UtilityPage({
  title,
  eyebrow,
  body,
  children,
}: {
  title: React.ReactNode;
  eyebrow: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="utility-page container section-space">
      <RouteIntro eyebrow={eyebrow} title={title} body={body} />
      {children || (
        <div className="utility-card">
          <Check size={25} />
          <h2>You’re all set.</h2>
          <p>
            Use the links above to continue shopping or get help from the Aglory
            team.
          </p>
          <Link className="button button-dark" href="/shop">
            Continue shopping <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}

export function CartSummary() {
  return <CartPage />;
}

export function CartPage() {
  const { cart, cartTotal, cartCurrency, changeQuantity, removeFromCart, checkoutUrl, cartError, isCartUpdating, beginCheckout } = useStorefront();
  if (!cart.length)
    return (
      <div className="utility-card cart-summary">
        <ShoppingBag size={28} />
        <h2>Your bag is empty.</h2>
        <p>There are no products in your bag yet.</p>
        <Link className="button button-dark" href="/shop">
          Shop beauty <ArrowRight size={16} />
        </Link>
      </div>
    );
  return (
    <div className="cart-page-card">
      <div className="cart-page-lines">
        {cart.map((line) => (
          <div
            className="cart-page-line"
            key={line.id}
          >
            <SkeletonImage
              src={line.product.image}
              alt={line.product.name}
              width={80}
              height={80}
              containerClassName="size-20 shrink-0 rounded-md overflow-hidden"
            />
            <div>
              <span className="eyebrow">{line.product.brand}</span>
              <h3>{line.product.name}</h3>
              {line.variantTitle && <small>{line.variantTitle}</small>}
              <div className="cart-page-controls">
                <div className="quantity">
                  <button
                    onClick={() => void changeQuantity(line.id, line.quantity - 1).catch(() => undefined)}
                    disabled={isCartUpdating}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{line.quantity}</span>
                  <button
                    onClick={() => void changeQuantity(line.id, line.quantity + 1).catch(() => undefined)}
                    disabled={isCartUpdating}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-button"
                  onClick={() => void removeFromCart(line.id).catch(() => undefined)}
                  disabled={isCartUpdating}
                >
                  Remove
                </button>
              </div>
            </div>
            <strong>{money(line.unitPrice.amount * line.quantity, line.unitPrice.currencyCode)}</strong>
          </div>
        ))}
      </div>
      <div className="cart-page-total">
        <span>Subtotal</span>
        <strong>{money(cartTotal, cartCurrency)}</strong>
        <small>Taxes, delivery options and payment are confirmed securely by Shopify at checkout.</small>
        {cartError && <small role="alert">{cartError}</small>}
        {checkoutUrl ? (
          <a className="button button-dark" href={checkoutUrl} onClick={(event) => {
            event.preventDefault();
            void beginCheckout().then((url) => { if (url) window.location.assign(url); }).catch(() => undefined);
          }}>
            Secure checkout <ArrowRight size={16} />
          </a>
        ) : (
          <span className="button button-dark" aria-disabled="true">Preparing checkout…</span>
        )}
      </div>
    </div>
  );
}

export function WishlistPage() {
  const { wishlist } = useStorefront();
  return (
    <section className="route-page container section-space">
      <RouteIntro
        eyebrow="Saved products"
        title={
          <>
            Your <em>wishlist.</em>
          </>
        }
        body="Save products you love and come back to them whenever you’re ready."
      />
      {wishlist.length ? (
        <ProductGrid items={wishlist} />
      ) : (
        <div className="utility-card">
          <Heart size={25} />
          <h2>No saved products yet.</h2>
          <p>Tap the heart on a product to save it here.</p>
          <Link className="button button-dark" href="/shop">
            Browse products <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}

export function SearchPage() {
  const { catalog: initialCatalog } = useStorefront();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [products, setProducts] = useState<Product[]>(initialCatalog);
  const [pageInfo, setPageInfo] = useState<{ hasNextPage: boolean; endCursor: string | null }>({ hasNextPage: false, endCursor: null });
  const [isLoading, setIsLoading] = useState(Boolean(searchParams.get("q")));
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchError, setSearchError] = useState<string>();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  useEffect(() => {
    const loadRecentSearches = window.setTimeout(() => {
      try {
        setRecentSearches(JSON.parse(window.localStorage.getItem("aglory-recent-searches:v1") || "[]"));
      } catch {
        setRecentSearches([]);
      }
    }, 0);
    return () => window.clearTimeout(loadRecentSearches);
  }, []);
  useEffect(() => {
    const nextQuery = searchParams.get("q") || "";
    const syncQuery = window.setTimeout(() => setQuery(nextQuery), 0);
    return () => window.clearTimeout(syncQuery);
  }, [searchParams]);
  const normalized = query.trim().toLowerCase();
  useEffect(() => {
    const controller = new AbortController();
    const request = window.setTimeout(() => {
      setIsLoading(true);
      setSearchError(undefined);
      const params = new URLSearchParams({ first: "24" });
      if (normalized) params.set("q", normalized);
      void fetch(`/api/products?${params.toString()}`, { signal: controller.signal, cache: "no-store" })
        .then(async (response) => {
          if (!response.ok) throw new Error("Search is temporarily unavailable.");
          return response.json() as Promise<{ products: Product[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } }>;
        })
        .then((page) => {
          setProducts(page.products);
          setPageInfo(page.pageInfo);
        })
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === "AbortError") return;
          setSearchError(error instanceof Error ? error.message : "Search is temporarily unavailable.");
        })
        .finally(() => {
          if (!controller.signal.aborted) setIsLoading(false);
        });
    }, 220);
    return () => {
      window.clearTimeout(request);
      controller.abort();
    };
  }, [normalized]);
  const searchable = (product: Product) =>
    `${product.brand} ${product.name} ${product.category} ${product.type} ${product.description}`.toLowerCase();
  const results = products.filter(
    (product) => !normalized || searchable(product).includes(normalized),
  );
  const suggestions = normalized
    ? products
        .filter((product) =>
          searchable(product).includes(normalized.slice(0, 3)),
        )
        .slice(0, 4)
    : [];
  const liveResults = normalized ? results.slice(0, 4) : [];
  const matchingCategories = normalized
    ? categories.filter((category) => `${category.name} ${category.note}`.toLowerCase().includes(normalized)).slice(0, 3)
    : [];
  const matchingBrands = normalized
    ? brands.filter((brand) => brand.toLowerCase().includes(normalized)).slice(0, 3)
    : [];
  const popularSearches = ["Shea Moisture", "foundation", "hair care", "wigs"];
  const chooseSearch = (term: string) => {
    setQuery(term);
    setIsLoading(true);
    const next = [term, ...recentSearches.filter((item) => item.toLowerCase() !== term.toLowerCase())].slice(0, 5);
    setRecentSearches(next);
    try {
      window.localStorage.setItem("aglory-recent-searches:v1", JSON.stringify(next));
    } catch {
      // Search remains usable when storage is unavailable.
    }
  };
  return (
    <section className="route-page container section-space">
      <RouteIntro
        eyebrow="Find your next essential"
        title={
          <>
            Search for <em>beauty.</em>
          </>
        }
        body="Search by product, brand, category or routine need."
      />
      <label className="full-search">
        <Search size={20} />
        <input
          autoFocus
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            if (event.target.value.trim()) setIsLoading(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && query.trim()) chooseSearch(query.trim());
          }}
          placeholder="Try “Shea Moisture”, “foundation” or “hair”"
          aria-label="Search products"
        />
      </label>
      {!normalized && (
        <div className="search-discovery">
          {recentSearches.length > 0 && (
            <>
              <span className="eyebrow">Recent searches</span>
              <div className="search-chips">
                {recentSearches.map((term) => (
                  <button type="button" key={term} onClick={() => setQuery(term)}>{term}</button>
                ))}
              </div>
            </>
          )}
          <span className="eyebrow">Popular searches</span>
          <div className="search-chips">
            {popularSearches.map((term) => (
              <button type="button" key={term} onClick={() => setQuery(term)}>
                {term}
              </button>
            ))}
          </div>
          <span className="eyebrow">Browse by category</span>
          <div className="search-category-links">
            {categories.slice(0, 4).map((category) => (
              <Link href={`/category/${category.slug}`} key={category.slug}>
                {category.name} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      )}
      {normalized && (liveResults.length > 0 || matchingCategories.length > 0 || matchingBrands.length > 0) && (
        <div className="search-live-panel" aria-label="Search suggestions">
          {liveResults.length > 0 && (
            <div className="search-live-products">
              <span className="eyebrow">Products</span>
              {liveResults.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.id}>
                  <SkeletonImage
                    src={product.image}
                    alt={product.name}
                    width={48}
                    height={48}
                    containerClassName="size-12 shrink-0 rounded-md overflow-hidden"
                  />
                  <span><small>{product.brand}</small>{product.name}</span>
                  <strong>{money(product.price)}</strong>
                </Link>
              ))}
            </div>
          )}
          {(matchingCategories.length > 0 || matchingBrands.length > 0) && (
            <div className="search-live-links">
              {matchingCategories.map((category) => <Link href={`/category/${category.slug}`} key={category.slug}>Category · {category.name}<ArrowRight size={14} /></Link>)}
              {matchingBrands.map((brand) => <Link href={`/brands/${slugify(brand)}`} key={brand}>Brand · {brand}<ArrowRight size={14} /></Link>)}
            </div>
          )}
        </div>
      )}
      {suggestions.length > 0 && normalized && results.length === 0 && (
        <div className="search-suggestions" aria-label="Suggested products">
          {suggestions.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.id}>
              <span>{product.brand}</span>{product.name}<ArrowRight size={14} />
            </Link>
          ))}
        </div>
      )}
      <div className="shop-meta">
        <span>
          {query
            ? `${results.length} result${results.length === 1 ? "" : "s"}`
            : "All products"}
        </span>
        {isLoading && <span className="muted">Searching…</span>}
        {searchError && <span className="muted" role="alert">{searchError}</span>}
      </div>
      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : results.length ? (
        <ProductGrid items={results} />
      ) : (
        <div className="utility-card">
          <Search size={25} />
          <h2>No exact match.</h2>
          <p>Try a shorter search, another category, or browse all products.</p>
          <button
            className="button button-outline"
            onClick={() => setQuery("")}
          >
            Clear search
          </button>
        </div>
      )}
      {isLoadingMore && (
        <div className="mt-8">
          <ProductGridSkeleton count={4} />
        </div>
      )}
      {pageInfo.hasNextPage && pageInfo.endCursor && !isLoading && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="button button-outline"
            disabled={isLoadingMore}
            onClick={() => {
              setIsLoadingMore(true);
              const params = new URLSearchParams({ first: "24", after: pageInfo.endCursor! });
              if (normalized) params.set("q", normalized);
              void fetch(`/api/products?${params.toString()}`, { cache: "no-store" })
                .then(async (response) => {
                  if (!response.ok) throw new Error("Unable to load more products.");
                  return response.json() as Promise<{ products: Product[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } }>;
                })
                .then((page) => {
                  setProducts((current) => [...current, ...page.products]);
                  setPageInfo(page.pageInfo);
                })
                .catch((error: unknown) => setSearchError(error instanceof Error ? error.message : "Unable to load more products."))
                .finally(() => setIsLoadingMore(false));
            }}
          >
            {isLoadingMore ? "Loading more…" : "Load more products"} <ArrowRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}

export function CheckoutPage() {
  const { cart, cartTotal, cartCurrency, checkoutUrl, beginCheckout } = useStorefront();
  if (!cart.length)
    return (
      <section className="utility-page container section-space">
        <RouteIntro
          eyebrow="Checkout"
          title={<>Your bag is <em>empty.</em></>}
          body="Add a product before checking out."
        />
        <div className="utility-card">
          <ShoppingBag size={25} />
          <h2>Nothing to checkout yet.</h2>
          <Link className="button button-dark" href="/shop">
            Shop beauty <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    );

  return (
    <section className="checkout-page container section-space">
      <RouteIntro
        eyebrow="Order support"
        title={<>Your bag is <em>ready.</em></>}
        body="Your order is ready to complete through Aglory’s secure Shopify checkout."
      />
      <div className="checkout-handoff">
        <div className="checkout-fields">
          <span className="eyebrow">Secure Shopify checkout</span>
          <h2>Complete your order securely.</h2>
          <p>
            Shipping, collection options, taxes and payment are handled securely
            by Shopify. You will return to Aglory after your order is complete.
          </p>
          <div className="checkout-contact-actions">
            {checkoutUrl && <a className="button button-dark" href={checkoutUrl} onClick={(event) => { event.preventDefault(); void beginCheckout().then((url) => { if (url) window.location.assign(url); }).catch(() => undefined); }}>Continue to secure checkout <ArrowRight size={16} /></a>}
            <a className="button button-outline" href="tel:01322333305">
              Call 01322 333305
            </a>
          </div>
          <div className="checkout-assurance">
            <span><PackageCheck size={17} /> Delivery and collection are confirmed against current stock.</span>
            <span><Check size={17} /> Payment details are collected securely by Shopify.</span>
          </div>
        </div>
        <aside className="checkout-order">
          <span className="eyebrow">Bag summary</span>
          {cart.map((line) => (
            <div className="checkout-order-line" key={line.id}>
              <span>{line.product.name} × {line.quantity}</span>
              <strong>{money(line.unitPrice.amount * line.quantity, line.unitPrice.currencyCode)}</strong>
            </div>
          ))}
          <div className="checkout-order-total">
            <span>Subtotal</span>
            <strong>{money(cartTotal, cartCurrency)}</strong>
          </div>
          <small className="checkout-demo-note">
            Delivery charges are confirmed by the store team.
          </small>
        </aside>
      </div>
    </section>
  );
}
export function TrackingPage() {
  return (
    <section className="utility-page container section-space">
      <RouteIntro
        eyebrow="Order support"
        title={<>Need help with an <em>order?</em></>}
        body="Automated order tracking will appear here once checkout and fulfilment are connected."
      />
      <div className="utility-card">
        <PackageCheck size={28} />
        <h2>Contact the store for a current update.</h2>
        <p>Have your name and order details ready so the team can help quickly.</p>
        <div className="utility-actions">
          <a className="button button-dark" href="https://wa.me/447446841404" target="_blank" rel="noreferrer">
            WhatsApp the team <ArrowUpRight size={16} />
          </a>
          <a className="button button-outline" href="tel:01322333305">
            Call the store
          </a>
        </div>
      </div>
    </section>
  );
}
