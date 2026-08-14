"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  LockKeyhole,
  PackageCheck,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import type { Product } from "@/lib/store-data";
import {
  brands,
  blogPosts,
  image,
  money,
  products,
  slugify,
} from "@/lib/store-data";
import { ProductGrid } from "@/components/product-card";
import { useStorefront } from "@/lib/storefront-context";
import { useState } from "react";

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
  items = products,
  title = (
    <>
      Shop all <em>beauty.</em>
    </>
  ),
  eyebrow = "Aglory catalogue",
}: {
  items?: Product[];
  title?: React.ReactNode;
  eyebrow?: string;
}) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const activeCollection = searchParams.get("collection") || "";
  const [sort, setSort] = useState("featured");
  const filterTypes: Record<string, Product["type"][]> = {
    "Hair care": ["Hair"],
    "Wigs & extensions": ["Wigs"],
    "Skin & body": ["Skin"],
    Makeup: ["Makeup"],
    Tools: ["Tools"],
    Men: ["Men"],
  };
  const filtered = items.filter((product) => {
    const categoryMatches =
      !activeCategory ||
      activeCategory === "All products" ||
      (filterTypes[activeCategory] || []).includes(product.type);
    const collectionMatches =
      !activeCollection ||
      (activeCollection === "new-arrivals"
        ? ["New", "New arrival", "Just in"].includes(product.tag || "")
        : activeCollection === "best-sellers"
          ? ["Bestseller", "Top rated"].includes(product.tag || "")
          : true);
    return categoryMatches && collectionMatches;
  });
  const visibleItems = [...filtered].sort((a, b) =>
    sort === "price-low"
      ? a.price - b.price
      : sort === "price-high"
        ? b.price - a.price
        : sort === "rating"
          ? b.rating - a.rating
          : 0,
  );
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
            <option value="rating">Top rated</option>
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

const brandDomains: Record<string, string> = {
  Sensationnel: "sensationnel.com",
  "Shea Moisture": "sheamoisture.com",
  ORS: "orshaircare.com",
  "Ebin New York": "ebinnewyork.com",
  "Palmer’s": "palmers.com",
  "Sleek Makeup": "sleekmakeup.com",
  Cantu: "cantubeauty.com",
  "Freetress Equal": "freetress.com",
};

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
        <img
          src={image("photo-1556229010-6c3f2c9ca5f8", 1000)}
          alt="Shea Moisture body care"
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
                <img
                  src={`https://www.google.com/s2/favicons?domain=${brandDomains[brand]}&sz=128`}
                  alt={`${brand} logo`}
                />
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
                  closest products from this this catalogue.
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
            <img src={post.image} alt="" />
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
      <img className="article-hero" src={post.image} alt="" />
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
        eyebrow="Welcome back"
        title={
          <>
            Your beauty <em>dashboard.</em>
          </>
        }
        body="Keep your favorites close, track your orders and pick up where your routine left off."
      />
      <div className="account-grid">
        <div className="account-card account-welcome">
          <span className="account-avatar">A</span>
          <span className="eyebrow">Your Aglory account</span>
          <h2>
            Ready for your next
            <br />
            <em>good hair day?</em>
          </h2>
          <Link className="button button-dark" href="/shop">
            Buy again <ArrowRight size={16} />
          </Link>
        </div>
        <div className="account-card">
          <span className="eyebrow">Recent orders</span>
          <h3>No orders yet</h3>
          <p>Orders will appear here after the live checkout is connected.</p>
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
          <Sparkles size={18} /> Need help? <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
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
            href="https://wa.me/4407446841404"
            target="_blank"
            rel="noreferrer"
          >
            <span>WhatsApp us</span>
            <strong>+44 07446 841404</strong>
          </a>
          <a href="mailto:info@agloryhairandcosmetics.co.uk">
            <span>Email</span>
            <strong>info@agloryhairandcosmetics.co.uk</strong>
          </a>
        </div>
      </div>
      <div className="contact-form-card">
        <span className="eyebrow">Send a note</span>
        {sent ? (
          <div className="form-success-panel" role="status">
            <Check size={25} />
            <h2>Message received.</h2>
            <p>
              Thanks for getting in touch. This prototype has recorded your
              message and the Aglory team can follow up here once the inbox is
              connected.
            </p>
            <button
              className="button button-outline"
              type="button"
              onClick={() => setSent(false)}
            >
              Send another message
            </button>
          </div>
        ) : (
          <>
            <h2>
              What can we help
              <br />
              <em>you find?</em>
            </h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <label>
                <span>Your name</span>
                <input
                  required
                  placeholder="Your name"
                  aria-label="Your name"
                />
              </label>
              <label>
                <span>Email address</span>
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                />
              </label>
              <label>
                <span>What do you need help with?</span>
                <select aria-label="What do you need help with?">
                  <option>Product advice</option>
                  <option>Delivery & returns</option>
                  <option>Click & collect</option>
                  <option>Something else</option>
                </select>
              </label>
              <label>
                <span>Message</span>
                <textarea
                  required
                  placeholder="Tell us a little more..."
                  aria-label="Message"
                />
              </label>
              <button className="button button-dark wide" type="submit">
                Send message <ArrowRight size={16} />
              </button>
            </form>
          </>
        )}
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
  const { cart, cartTotal, changeQuantity, removeFromCart } = useStorefront();
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
            key={`${line.product.id}-${line.option}`}
          >
            <img src={line.product.image} alt="" />
            <div>
              <span className="eyebrow">{line.product.brand}</span>
              <h3>{line.product.name}</h3>
              {line.option && <small>{line.option}</small>}
              <div className="cart-page-controls">
                <div className="quantity">
                  <button
                    onClick={() =>
                      changeQuantity(line.product.id, -1, line.option)
                    }
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{line.quantity}</span>
                  <button
                    onClick={() =>
                      changeQuantity(line.product.id, 1, line.option)
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-button"
                  onClick={() => removeFromCart(line.product.id, line.option)}
                >
                  Remove
                </button>
              </div>
            </div>
            <strong>{money(line.product.price * line.quantity)}</strong>
          </div>
        ))}
      </div>
      <div className="cart-page-total">
        <span>Subtotal</span>
        <strong>{money(cartTotal)}</strong>
        <small>Delivery is calculated at checkout.</small>
        <Link className="button button-dark" href="/checkout">
          Go to checkout <ArrowRight size={16} />
        </Link>
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
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
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
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try “Shea Moisture”, “foundation” or “hair”"
          aria-label="Search products"
        />
      </label>
      {suggestions.length > 0 && normalized && results.length === 0 && (
        <div className="search-suggestions" aria-label="Suggested products">
          {suggestions.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.id}>
              <span>{product.brand}</span>
              {product.name}
              <ArrowRight size={14} />
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
      </div>
      {results.length ? (
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
    </section>
  );
}

export function CheckoutPage() {
  const { cart, cartTotal } = useStorefront();
  const [complete, setComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  if (complete)
    return (
      <section className="utility-page container section-space">
        <div className="utility-card">
          <Check size={28} />
          <span className="eyebrow">Prototype confirmation</span>
          <h2>Your demo order is ready.</h2>
          <p>
            No payment was taken. The selected payment method and delivery
            details are ready for Shopify Checkout integration.
          </p>
          <div className="utility-actions">
            <Link className="button button-dark" href="/shop">
              Continue shopping <ArrowRight size={16} />
            </Link>
            <Link className="button button-outline" href="/contact">
              Need help?
            </Link>
          </div>
        </div>
      </section>
    );
  if (!cart.length)
    return (
      <section className="utility-page container section-space">
        <RouteIntro
          eyebrow="Checkout"
          title={
            <>
              Your bag is <em>empty.</em>
            </>
          }
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
        eyebrow="Demo checkout"
        title={
          <>
            Complete your <em>order.</em>
          </>
        }
        body="Enter your details and choose how you’d like to receive your order. Payment is simulated until the live checkout is connected."
      />
      <form
        className="checkout-form"
        onSubmit={(event) => {
          event.preventDefault();
          setComplete(true);
        }}
      >
        <div className="checkout-fields">
          <h2>Delivery details</h2>
          <input
            required
            placeholder="Full name"
            aria-label="Full name"
            autoComplete="name"
          />
          <input
            required
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            autoComplete="email"
          />
          <input
            required
            placeholder="Address"
            aria-label="Address"
            autoComplete="street-address"
          />
          <div className="checkout-two">
            <input
              required
              placeholder="Town / city"
              aria-label="Town or city"
              autoComplete="address-level2"
            />
            <input
              required
              pattern="[A-Za-z0-9 ]{3,10}"
              placeholder="Postcode"
              aria-label="Postcode"
              autoComplete="postal-code"
            />
          </div>
          <h2>Delivery option</h2>
          <label className="delivery-choice">
            <input type="radio" name="delivery" defaultChecked /> Standard
            delivery <span>Delivery price will be connected at checkout</span>
          </label>
          <label className="delivery-choice">
            <input type="radio" name="delivery" /> Click & Collect{" "}
            <span>8 Cross Street, Erith</span>
          </label>
          <h2>Payment method</h2>
          <div className="checkout-payment" aria-label="Payment method">
            <button
              type="button"
              className={`payment-option payment-link ${paymentMethod === "link" ? "is-selected" : ""}`}
              onClick={() => setPaymentMethod("link")}
              aria-pressed={paymentMethod === "link"}
            >
              <span>
                <b>stripe</b> <strong>link</strong>
              </span>
              <i>|</i>
              <strong>Demo</strong>
            </button>
            <button
              type="button"
              className={`payment-option payment-google ${paymentMethod === "google" ? "is-selected" : ""}`}
              onClick={() => setPaymentMethod("google")}
              aria-pressed={paymentMethod === "google"}
            >
              <strong>G Pay</strong>
              <i>|</i>
              <span>Demo</span>
            </button>
            <button
              type="button"
              className={`payment-option payment-paypal ${paymentMethod === "paypal" ? "is-selected" : ""}`}
              onClick={() => setPaymentMethod("paypal")}
              aria-pressed={paymentMethod === "paypal"}
            >
              <strong>PayPal</strong>
              <span>Demo</span>
            </button>
            <button
              type="button"
              className={`payment-option payment-card ${paymentMethod === "card" ? "is-selected" : ""}`}
              onClick={() => setPaymentMethod("card")}
              aria-pressed={paymentMethod === "card"}
            >
              <LockKeyhole size={25} />
              <strong>Debit or Credit Card</strong>
              <span className="payment-demo-label">Demo</span>
            </button>
          </div>
          <button className="button button-dark" type="submit">
            Complete demo order <ArrowRight size={16} />
          </button>
        </div>
        <aside className="checkout-order">
          <span className="eyebrow">Order summary</span>
          {cart.map((line) => (
            <div
              className="checkout-order-line"
              key={`${line.product.id}-${line.option}`}
            >
              <span>
                {line.product.name} × {line.quantity}
              </span>
              <strong>{money(line.product.price * line.quantity)}</strong>
            </div>
          ))}
          <div className="checkout-order-total">
            <span>Subtotal</span>
            <strong>{money(cartTotal)}</strong>
          </div>
          <small className="checkout-demo-note">
            Delivery and payment are not charged in this prototype.
          </small>
        </aside>
      </form>
    </section>
  );
}

export function TrackingPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="utility-page container section-space">
      <RouteIntro
        eyebrow="Order tracking"
        title={
          <>
            Where is your
            <br />
            <em>order?</em>
          </>
        }
        body="Enter your order number and email to see the latest delivery update."
      />
      {submitted ? (
        <div className="utility-card">
          <Check size={28} />
          <span className="eyebrow">Demo tracking</span>
          <h2>Details received.</h2>
          <p>
            This demo has accepted your order details. Live delivery updates
            will appear here when orders are connected.
          </p>
          <Link className="button button-dark" href="/shop">
            Continue shopping <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <form
          className="tracking-form utility-card"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <input
            required
            placeholder="Order number"
            aria-label="Order number"
          />
          <input
            required
            type="email"
            placeholder="Email address"
            aria-label="Email address"
          />
          <button className="button button-dark" type="submit">
            Check order <ArrowRight size={16} />
          </button>
        </form>
      )}
    </section>
  );
}
