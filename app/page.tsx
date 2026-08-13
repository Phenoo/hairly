"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  Heart,
  MapPin,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { useMemo, useState } from "react";

type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  compareAt?: number;
  category: string;
  type: "Hair" | "Wigs" | "Skin" | "Makeup" | "Tools" | "Men";
  image: string;
  imageAlt: string;
  rating: number;
  reviews: number;
  tag?: string;
  description: string;
  options?: string[];
  inventory: number;
};

const image = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const products: Product[] = [
  {
    id: "black-opal",
    brand: "Black Opal",
    name: "Skin Perfecting Stick Foundation",
    price: 22.99,
    category: "Makeup",
    type: "Makeup",
    image: image("photo-1596462502278-27bfdc403348"),
    imageAlt: "Black Opal makeup collection",
    rating: 4.5,
    reviews: 24,
    tag: "Shade range",
    inventory: 8,
    description: "Maximum coverage with a soft matte finish, created for normal to dry skin and a broad spectrum of deeper tones.",
    options: ["Cool Nude", "Champagne Beige", "Cashew", "Kalahari Sand", "Heavenly Honey", "Rich Caramel", "Truly Topaz", "Warm Almond", "Nutmeg", "Amber", "Beautiful Bronze", "Hazelnut", "Toasted Chestnut", "Carob", "Sweet Espresso", "Suede Mocha", "Black Walnut", "Ebony Brown", "Au Chocolat", "Yes Honey", "Snatched Sepia"],
  },
  {
    id: "darling-empress",
    brand: "Darling",
    name: "Empress Passion Twist",
    price: 12.99,
    category: "Wigs & Extensions",
    type: "Wigs",
    image: image("photo-1522337360788-8b13dee7a37e"),
    imageAlt: "Textured hair styling",
    rating: 4.5,
    reviews: 18,
    tag: "Bestseller",
    inventory: 22,
    description: "Pre-looped passion twist hair for a confident protective style with a soft, natural finish.",
    options: ["1B", "2", "4", "27", "30"],
  },
  {
    id: "virgin-fertilizer",
    brand: "Virgin Hair Fertilizer",
    name: "Hair Fertilizer",
    price: 3.99,
    category: "Hair Care",
    type: "Hair",
    image: image("photo-1608248543803-ba4f8c70ae0b"),
    imageAlt: "Hair and body care products",
    rating: 4.5,
    reviews: 41,
    tag: "Everyday essential",
    inventory: 64,
    description: "A classic scalp care essential for nourished roots and a healthy-looking hair routine.",
  },
  {
    id: "feme-brazilian",
    brand: "Feme",
    name: "100% Virgin Brazilian Straight",
    price: 44.99,
    compareAt: 54.99,
    category: "Wigs & Extensions",
    type: "Wigs",
    image: image("photo-1529139574466-a303027c1d8b"),
    imageAlt: "Editorial hair texture",
    rating: 4.8,
    reviews: 12,
    tag: "-18%",
    inventory: 5,
    description: "Versatile 100% virgin Brazilian hair with a silky straight texture and natural movement.",
    options: ["10 inch", "12 inch", "14 inch", "16 inch"],
  },
  {
    id: "soft-silky",
    brand: "Soft N’ Silky",
    name: "Afro Natural Synthetic Afro Twist Braid",
    price: 5.99,
    category: "Wigs & Extensions",
    type: "Wigs",
    image: image("photo-1519699047748-de8e457a634e"),
    imageAlt: "Braided hair texture",
    rating: 4.6,
    reviews: 9,
    tag: "New",
    inventory: 31,
    description: "Lightweight synthetic twist braid with a generous, natural-looking afro texture.",
    options: ["1", "1B", "2", "30"],
  },
  {
    id: "dexe-serum",
    brand: "DEXE",
    name: "Keratin Nutrient Hair Serum 80ml",
    price: 7.99,
    category: "Hair Care",
    type: "Hair",
    image: image("photo-1556229010-6c3f2c9ca5f8"),
    imageAlt: "Hair serum and skincare bottles",
    rating: 4.7,
    reviews: 16,
    tag: "Shine ritual",
    inventory: 13,
    description: "A nourishing keratin serum for smoother lengths, polished shine, and a softer finish.",
  },
  {
    id: "dexe-mask",
    brand: "DEXE",
    name: "Organic Keratin Nutrient Deep Treatment Hair Mask",
    price: 10.99,
    category: "Hair Care",
    type: "Hair",
    image: image("photo-1608248543803-ba4f8c70ae0b"),
    imageAlt: "Deep treatment hair care",
    rating: 4.6,
    reviews: 14,
    tag: "Repair",
    inventory: 17,
    description: "A rich deep treatment for dry, tired strands that need softness and restorative care.",
  },
  {
    id: "sheamoisture",
    brand: "Shea Moisture",
    name: "Coconut & Hibiscus Foam Body Wash",
    price: 12.99,
    category: "Skin & Body",
    type: "Skin",
    image: image("photo-1556228720-195a672e8a03"),
    imageAlt: "Body wash and skincare products",
    rating: 4.7,
    reviews: 28,
    tag: "New arrival",
    inventory: 26,
    description: "A creamy, fragrant body wash that leaves skin feeling soft, fresh, and beautifully cared for.",
  },
  {
    id: "toppik",
    brand: "Toppik",
    name: "Hair Perfecting Tool Kit",
    price: 24.99,
    category: "Tools",
    type: "Tools",
    image: image("photo-1522335789203-aabd1fc54bc9"),
    imageAlt: "Beauty tools and accessories",
    rating: 4.5,
    reviews: 8,
    tag: "Just in",
    inventory: 7,
    description: "The finishing tools for a fuller-looking, more polished hair styling routine.",
  },
  {
    id: "tree-hut",
    brand: "Tree Hut",
    name: "Moroccan Rose Shea Sugar Scrub",
    price: 12.99,
    category: "Skin & Body",
    type: "Skin",
    image: image("photo-1570194065650-d99fb4ee38df"),
    imageAlt: "Rose body scrub",
    rating: 4.9,
    reviews: 32,
    tag: "Top rated",
    inventory: 11,
    description: "A softly scented sugar scrub to smooth, polish, and bring a little ritual to every shower.",
  },
  {
    id: "bigen-men",
    brand: "Bigen",
    name: "Men Speed Colour Real Black",
    price: 8.99,
    category: "Men’s Grooming",
    type: "Men",
    image: image("photo-1621605815971-fbc98d665033"),
    imageAlt: "Men's grooming products",
    rating: 4.4,
    reviews: 7,
    tag: "Grooming",
    inventory: 18,
    description: "A quick, dependable colour refresh for a considered grooming routine.",
  },
];

const categories = [
  { name: "Hair care", note: "Rituals for every texture", image: image("photo-1522337360788-8b13dee7a37e") },
  { name: "Wigs & extensions", note: "Your next signature style", image: image("photo-1519699047748-de8e457a634e") },
  { name: "Skin & body", note: "Glow from the neck down", image: image("photo-1556229010-6c3f2c9ca5f8") },
  { name: "Makeup", note: "Colour with intention", image: image("photo-1596462502278-27bfdc403348") },
  { name: "Men’s grooming", note: "The daily edit", image: image("photo-1621605815971-fbc98d665033") },
  { name: "Tools & accessories", note: "Finish the look", image: image("photo-1522335789203-aabd1fc54bc9") },
];

const brands = ["Sensationnel", "Shea Moisture", "ORS", "Ebin New York", "Palmer’s", "Sleek Makeup", "Cantu", "Freetress Equal"];

const blogPosts = [
  { category: "Hair", read: "5 min read", title: "How to choose a protective style that feels like you", excerpt: "A practical guide to texture, tension and finding a look you can live in.", image: image("photo-1522337360788-8b13dee7a37e") },
  { category: "Skin", read: "6 min read", title: "The soft-skin ritual, decoded", excerpt: "How to build a body-care routine that feels like a moment, not a chore.", image: image("photo-1570194065650-d99fb4ee38df") },
  { category: "Beauty", read: "4 min read", title: "Finding your undertone with confidence", excerpt: "The simple shade cues that make your next complexion match feel easier.", image: image("photo-1596462502278-27bfdc403348") },
];

const money = (amount: number) => `£${amount.toFixed(2)}`;

function ProductCard({ product, onAdd, onOpen, isWishlisted, onWish }: { product: Product; onAdd: (product: Product) => void; onOpen: (product: Product) => void; isWishlisted: boolean; onWish: (product: Product) => void }) {
  return (
    <article className="product-card">
      <button className={`heart-button ${isWishlisted ? "is-active" : ""}`} aria-label={`${isWishlisted ? "Remove" : "Add"} ${product.name} ${isWishlisted ? "from" : "to"} wishlist`} onClick={() => onWish(product)}>
        <Heart size={17} fill={isWishlisted ? "currentColor" : "none"} />
      </button>
      <button className="product-image" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <img src={product.image} alt={product.imageAlt} />
        <span className="quick-view">Quick view <ArrowUpRight size={14} /></span>
      </button>
      <div className="product-copy">
        <span className="eyebrow">{product.brand}</span>
        <button className="product-name" onClick={() => onOpen(product)}>{product.name}</button>
        <div className="rating"><span className="stars">★★★★★</span> <span>{product.rating} ({product.reviews})</span></div>
        <div className="product-foot"><span className="price">{money(product.price)}</span>{product.compareAt && <span className="compare">{money(product.compareAt)}</span>}<button className="quick-add" onClick={() => onAdd(product)}>{product.options ? "Select options" : "Quick add"}</button></div>
      </div>
    </article>
  );
}

export default function Home() {
  const [cart, setCart] = useState<{ product: Product; quantity: number; option?: string }[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeView, setActiveView] = useState<"home" | "shop" | "brands" | "finder" | "account" | "contact">("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedOption, setSelectedOption] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [finderStep, setFinderStep] = useState(0);
  const [finderType, setFinderType] = useState("Hair growth");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return products.filter((product) => {
      const matchesFilter = activeFilter === "All" || product.category === activeFilter || product.type === activeFilter;
      const matchesQuery = !normalized || `${product.brand} ${product.name} ${product.category}`.toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartTotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  const addToCart = (product: Product, option?: string) => {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id && line.option === option);
      if (existing) return current.map((line) => line === existing ? { ...line, quantity: line.quantity + 1 } : line);
      return [...current, { product, quantity: 1, option }];
    });
    setCartOpen(true);
    setActiveProduct(null);
  };

  const toggleWish = (product: Product) => setWishlist((current) => current.some((item) => item.id === product.id) ? current.filter((item) => item.id !== product.id) : [...current, product]);
  const changeQuantity = (id: string, delta: number) => setCart((current) => current.map((line) => line.product.id === id ? { ...line, quantity: Math.max(1, line.quantity + delta) } : line));
  const goTo = (view: typeof activeView) => { setActiveView(view); setMobileNav(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <main className="site-shell">
      <div className="announcement"><span><Zap size={14} /> Same-day delivery available when you order before 12pm</span><span className="announcement-detail">Free delivery on orders over £50 <ArrowRight size={14} /></span></div>
      <header className="site-header">
        <div className="header-main container">
          <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={21} /></button>
          <button className="logo" onClick={() => goTo("home")} aria-label="Aglory home"><span>ag</span>lory</button>
          <nav className="desktop-nav" aria-label="Main navigation">
            <button onClick={() => goTo("shop")}>Shop <ChevronDown size={14} /></button>
            <button onClick={() => goTo("finder")}>Find your beauty <ChevronDown size={14} /></button>
            <button onClick={() => goTo("brands")}>Brands</button>
            <button onClick={() => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" })}>Blog</button>
          </nav>
          <div className="header-actions">
            <button className="icon-label" onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={19} /><span>Search</span></button>
            <button className="icon-label hide-small" onClick={() => goTo("account")} aria-label="Account"><UserRound size={19} /><span>Account</span></button>
            <button className="icon-label" onClick={() => setWishlist(wishlist)} aria-label="Wishlist"><Heart size={19} /><span className="hide-small">Wishlist</span>{wishlist.length > 0 && <b>{wishlist.length}</b>}</button>
            <button className="bag-button" onClick={() => setCartOpen(true)} aria-label="Shopping bag"><ShoppingBag size={20} /><span className="bag-count">{cartCount}</span></button>
          </div>
        </div>
        <div className="header-sub container"><span>Curated beauty for every texture, tone & ritual.</span><button onClick={() => goTo("contact")}>Visit us in Erith <MapPin size={13} /></button></div>
      </header>

      {mobileNav && <div className="mobile-nav-backdrop" onClick={() => setMobileNav(false)}><aside className="mobile-nav" onClick={(event) => event.stopPropagation()}><div className="mobile-nav-top"><button className="logo" onClick={() => goTo("home")}><span>ag</span>lory</button><button onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={21} /></button></div><div className="mobile-nav-links"><button onClick={() => goTo("shop")}>Shop all <ArrowRight size={16} /></button><button onClick={() => goTo("finder")}>Find your beauty <ArrowRight size={16} /></button><button onClick={() => goTo("brands")}>Brands <ArrowRight size={16} /></button><button onClick={() => { setMobileNav(false); setActiveView("home"); window.setTimeout(() => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" }), 0); }}>Blog <ArrowRight size={16} /></button><button onClick={() => goTo("account")}>Your account <ArrowRight size={16} /></button></div><div className="mobile-nav-note"><Sparkles size={18} /><p>Beauty advice, same-day delivery and a real store team just a message away.</p></div></aside></div>}

      {activeView === "home" && <>
        <section className="hero container">
          <div className="hero-copy"><div className="kicker"><span className="kicker-line" /> The destination for beauty that understands you</div><h1>Beauty,<br /><em>made brilliantly</em> personal.</h1><p>Discover hair, skin and beauty essentials selected for every texture, tone and routine — with expert care from Erith to your door.</p><div className="hero-actions"><button className="button button-dark" onClick={() => goTo("shop")}>Shop beauty <ArrowRight size={16} /></button><button className="text-button" onClick={() => goTo("finder")}>Find your hair <ArrowUpRight size={16} /></button></div><div className="hero-proof"><span><Check size={14} /> Real store expertise</span><span><Check size={14} /> 7,000+ essentials</span><span><Check size={14} /> Same-day local delivery</span></div></div>
          <div className="hero-visual"><div className="hero-image-main"><img src={image("photo-1522337360788-8b13dee7a37e", 1200)} alt="A beauty editorial portrait" /></div><div className="hero-caption"><span>01 / 04</span><span>Texture is always in.</span></div><div className="hero-stamp"><span>AGLORY</span><small>Beauty<br />in all<br />your forms</small></div><div className="hero-product"><img src={image("photo-1596462502278-27bfdc403348", 500)} alt="Black Opal makeup essentials" /><div><span className="eyebrow">Featured edit</span><strong>Complexion, considered.</strong></div><ArrowUpRight size={17} /></div></div>
        </section>

        <section className="trust-strip"><div className="container trust-grid"><div><PackageCheck size={21} /><span><strong>Same-day delivery</strong>On orders before 12pm</span></div><div><Sparkles size={21} /><span><strong>7,000+ products</strong>Expertly curated</span></div><div><Check size={21} /><span><strong>30-day returns</strong>Hassle-free shopping</span></div><div><CircleHelp size={21} /><span><strong>Real beauty advice</strong>Call or WhatsApp the team</span></div></div></section>

        <section className="category-section container section-space"><div className="section-heading"><div><span className="eyebrow">Start with your ritual</span><h2>Shop by what<br /><em>moves you.</em></h2></div><button className="text-button" onClick={() => goTo("shop")}>View all categories <ArrowRight size={16} /></button></div><div className="category-grid">{categories.map((category, index) => <button className={`category-card category-${index}`} key={category.name} onClick={() => { setActiveFilter(category.name.includes("Wigs") ? "Wigs" : category.name.includes("Hair") ? "Hair" : category.name.includes("Skin") ? "Skin" : category.name.includes("Makeup") ? "Makeup" : category.name.includes("Men") ? "Men" : "Tools"); goTo("shop"); }}><img src={category.image} alt="" /><span className="category-overlay" /><span className="category-content"><span>{String(index + 1).padStart(2, "0")}</span><strong>{category.name}</strong><small>{category.note}</small><ArrowUpRight size={17} /></span></button>)}</div></section>

        <section className="product-section section-dark section-space"><div className="container"><div className="section-heading light"><div><span className="eyebrow">The considered edit</span><h2>Trending <em>now.</em></h2></div><button className="text-button light-button" onClick={() => goTo("shop")}>Shop all products <ArrowRight size={16} /></button></div><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} onOpen={setActiveProduct} isWishlisted={wishlist.some((item) => item.id === product.id)} onWish={toggleWish} />)}</div></div></section>

        <section className="routine-banner container section-space"><div className="routine-image"><img src={image("photo-1608248543803-ba4f8c70ae0b", 1000)} alt="A nourishing hair care ritual" /></div><div className="routine-copy"><span className="eyebrow">A little help, beautifully given</span><h2>Build your<br /><em>best routine.</em></h2><p>Tell us what your beauty needs today. We’ll curate the next few steps — from wash day to glow day.</p><button className="button button-dark" onClick={() => goTo("finder")}>Start the finder <ArrowRight size={16} /></button><div className="routine-goals"><span>Hair growth</span><span>Dryness</span><span>Protective styling</span><span>Uneven tone</span></div></div></section>

        <section className="blog-section section-space" id="blog"><div className="container"><div className="section-heading"><div><span className="eyebrow">The Aglory Blog</span><h2>Beauty wisdom<br /><em>worth keeping.</em></h2></div><button className="text-button" onClick={() => goTo("contact")}>Read the latest edit <ArrowRight size={16} /></button></div><p className="blog-intro">Practical, culturally-aware guidance for the routines you actually live — from choosing your undertone to caring for a wig between wears.</p><div className="blog-grid">{blogPosts.map((post, index) => <button className={`blog-card blog-card-${index}`} key={post.title} onClick={() => goTo("contact")}><img src={post.image} alt="" /><div className="blog-card-copy"><span className="eyebrow">{post.category} / {post.read}</span><h3>{post.title}</h3><p>{post.excerpt}</p><span className="blog-card-link">Read story <ArrowUpRight size={16} /></span></div></button>)}</div></div></section>

        <section className="store-section container section-space"><div className="store-photo"><img src={image("photo-1515377905703-c4788e51af15", 1100)} alt="Aglory beauty store experience" /></div><div className="store-copy"><span className="eyebrow">Come say hello</span><h2>Your beauty place,<br /><em>in real life.</em></h2><p>Visit the Aglory team in Erith for expert advice, new arrivals and a little time to find what feels right.</p><div className="address"><MapPin size={17} /><span><strong>Aglory Hair & Cosmetics</strong>8 Cross Street, Erith<br />Kent DA8 1RB</span></div><div className="store-links"><button className="button button-outline" onClick={() => goTo("contact")}>Get directions <ArrowUpRight size={15} /></button><a href="https://wa.me/4407446841404" target="_blank" rel="noreferrer" className="text-button">WhatsApp the team <ArrowRight size={15} /></a></div><span className="hours">Mon–Sat 9am–7pm &nbsp;·&nbsp; Sun 11am–4pm</span></div></section>
      </>}

      {activeView === "shop" && <ShopView products={filteredProducts} activeFilter={activeFilter} setActiveFilter={setActiveFilter} query={query} setQuery={setQuery} onAdd={addToCart} onOpen={setActiveProduct} wishlist={wishlist} onWish={toggleWish} goTo={goTo} />}
      {activeView === "brands" && <BrandsView onSelect={(brand) => { setQuery(brand); goTo("shop"); }} />}
      {activeView === "finder" && <FinderView step={finderStep} setStep={setFinderStep} type={finderType} setType={setFinderType} onOpen={setActiveProduct} goTo={goTo} />}
      {activeView === "account" && <AccountView goTo={goTo} wishlist={wishlist} />}
      {activeView === "contact" && <ContactView />}

      <section className="newsletter"><div className="container newsletter-inner"><div><span className="eyebrow">A little beauty in your inbox</span><h2>Your beauty inbox,<br /><em>upgraded.</em></h2></div><div><p>New arrivals, expert advice and members-only offers — considered, never noisy.</p>{subscribed ? <div className="subscribed"><Check size={17} /> You’re on the list. Welcome to Aglory.</div> : <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (email) setSubscribed(true); }}><input type="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} aria-label="Your email address" required /><button type="submit">Join the community <ArrowRight size={16} /></button></form>}<small>By subscribing, you agree to receive Aglory updates. Unsubscribe anytime.</small></div></div></section>

      <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><button className="logo" onClick={() => goTo("home")}><span>ag</span>lory</button><p>The destination for beauty that understands you.</p><div className="socials"><a href="https://www.instagram.com" aria-label="Instagram"><FaInstagram size={15} /></a><a href="https://wa.me/4407446841404" aria-label="WhatsApp"><FaWhatsapp size={15} /></a><a href="https://www.tiktok.com" aria-label="TikTok"><FaTiktok size={15} /></a><a href="https://www.facebook.com" aria-label="Facebook"><FaFacebookF size={13} /></a></div></div><div className="footer-col"><span>Shop</span><button onClick={() => goTo("shop")}>Hair care</button><button onClick={() => goTo("shop")}>Wigs & extensions</button><button onClick={() => goTo("shop")}>Skin & body</button><button onClick={() => goTo("shop")}>New arrivals</button><button onClick={() => goTo("shop")}>Best sellers</button></div><div className="footer-col"><span>Help</span><button onClick={() => goTo("contact")}>Contact</button><button onClick={() => goTo("contact")}>Delivery & returns</button><button onClick={() => goTo("account")}>Track an order</button><button onClick={() => goTo("account")}>Your account</button><button onClick={() => goTo("brands")}>Brands</button><button onClick={() => { setActiveView("home"); window.setTimeout(() => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" }), 0); }}>Blog</button></div><div className="footer-col footer-visit"><span>Visit us</span><p>Aglory Hair & Cosmetics<br />8 Cross Street<br />Erith, Kent DA8 1RB</p><a href="tel:01322333305">01322 333305</a><a href="mailto:info@agloryhairandcosmetics.co.uk">info@agloryhairandcosmetics.co.uk</a></div></div><div className="container footer-bottom"><span>© 2026 Aglory Hair & Cosmetics</span><span>Beauty, culture, confidence.</span><span>Privacy &nbsp; Terms</span></div></footer>

      <a className="whatsapp-float" href="https://wa.me/4407446841404" target="_blank" rel="noreferrer" aria-label="Chat with Aglory on WhatsApp"><span><FaWhatsapp size={18} /></span><small>Need beauty advice?</small></a>

      {searchOpen && <div className="overlay" onClick={() => setSearchOpen(false)}><div className="search-modal" onClick={(event) => event.stopPropagation()}><div className="search-top"><Search size={22} /><input autoFocus placeholder="Search products, brands, concerns..." value={query} onChange={(event) => setQuery(event.target.value)} /><button onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={21} /></button></div><div className="search-content"><span className="eyebrow">{query ? "Results in the Aglory catalogue" : "Try searching for"}</span>{query ? <>{filteredProducts.length > 0 ? <div className="search-products">{filteredProducts.slice(0, 4).map((product) => <button key={product.id} onClick={() => { setActiveProduct(product); setSearchOpen(false); }}><img src={product.image} alt="" /><span><strong>{product.name}</strong><small>{product.brand} · {money(product.price)}</small></span><ArrowUpRight size={16} /></button>)}</div> : <p className="empty-copy">No products yet. Try “shéa”, “hair”, or “foundation”.</p>}</> : <div className="popular-searches"><button onClick={() => setQuery("Shea Moisture")}>Shea Moisture</button><button onClick={() => setQuery("hair")}>Hair growth</button><button onClick={() => setQuery("foundation")}>Foundation</button><button onClick={() => setQuery("wigs")}>Wigs & extensions</button></div>}</div></div></div>}

      {activeProduct && <div className="overlay" onClick={() => setActiveProduct(null)}><div className="product-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setActiveProduct(null)} aria-label="Close product"><X size={20} /></button><div className="modal-image"><img src={activeProduct.image} alt={activeProduct.imageAlt} /></div><div className="modal-info"><span className="eyebrow">{activeProduct.brand}</span><h2>{activeProduct.name}</h2><div className="rating"><span className="stars">★★★★★</span> {activeProduct.rating} · {activeProduct.reviews} reviews</div><div className="modal-price">{money(activeProduct.price)} {activeProduct.compareAt && <span>{money(activeProduct.compareAt)}</span>}</div><p>{activeProduct.description}</p>{activeProduct.options && <div className="option-picker"><div><span className="eyebrow">{activeProduct.type === "Makeup" ? "Choose your shade" : "Choose your option"}</span><span className="selected-option">{selectedOption || "Select an option"}</span></div><div className="option-grid">{activeProduct.options.map((option, index) => <button key={option} className={`${selectedOption === option ? "selected" : ""} ${index === 6 && activeProduct.id === "black-opal" ? "sold-out" : ""}`} disabled={index === 6 && activeProduct.id === "black-opal"} onClick={() => setSelectedOption(option)}>{option}{index === 6 && activeProduct.id === "black-opal" && <small>Sold out</small>}</button>)}</div></div>}<div className="modal-actions"><button className="button button-dark wide" disabled={Boolean(activeProduct.options && !selectedOption)} onClick={() => addToCart(activeProduct, selectedOption || undefined)}>Add to bag <ShoppingBag size={16} /></button><button className={`modal-wish ${wishlist.some((item) => item.id === activeProduct.id) ? "is-active" : ""}`} onClick={() => toggleWish(activeProduct)}><Heart size={18} fill={wishlist.some((item) => item.id === activeProduct.id) ? "currentColor" : "none"} /></button></div><div className="modal-notes"><span><Check size={14} /> Same-day delivery available</span><span><Check size={14} /> 30-day returns</span></div></div></div></div>}

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><span className="eyebrow">Your edit</span><h2>{checkout ? "Checkout" : "Your bag"}</h2></div><button onClick={() => setCartOpen(false)} aria-label="Close bag"><X size={20} /></button></div>{checkout ? <div className="checkout-content"><div className="checkout-step active"><span>1</span><div><strong>Delivery details</strong><p>Same-day delivery is available for eligible postcodes before 12pm.</p><input placeholder="Postcode" aria-label="Postcode" /><button className="button button-dark wide" onClick={() => setCheckout(false)}>Continue to delivery <ArrowRight size={16} /></button></div></div><div className="checkout-step"><span>2</span><strong>Payment</strong><small>Secure payment options appear here at checkout.</small></div><div className="checkout-step"><span>3</span><strong>Review order</strong><small>{cartCount} item{cartCount === 1 ? "" : "s"} · {money(cartTotal)}</small></div></div> : <>{cart.length === 0 ? <div className="empty-bag"><ShoppingBag size={30} /><h3>Your bag is waiting.</h3><p>Add something beautiful to get started.</p><button className="button button-dark" onClick={() => { setCartOpen(false); goTo("shop"); }}>Shop the edit <ArrowRight size={16} /></button></div> : <><div className="delivery-progress"><div><span>You’re {money(Math.max(0, 50 - cartTotal))} away from free delivery</span><strong>{money(Math.min(50, cartTotal))} / £50</strong></div><div className="progress"><span style={{ width: `${Math.min(100, cartTotal / 50 * 100)}%` }} /></div></div><div className="cart-lines">{cart.map((line) => <div className="cart-line" key={`${line.product.id}-${line.option}`}><img src={line.product.image} alt="" /><div className="cart-line-info"><span className="eyebrow">{line.product.brand}</span><strong>{line.product.name}</strong>{line.option && <small>{line.option}</small>}<div className="cart-line-bottom"><div className="quantity"><button onClick={() => changeQuantity(line.product.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{line.quantity}</span><button onClick={() => changeQuantity(line.product.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div><b>{money(line.product.price * line.quantity)}</b></div></div><button className="remove-line" onClick={() => setCart((current) => current.filter((item) => item !== line))} aria-label={`Remove ${line.product.name}`}><X size={15} /></button></div>)}</div><div className="cart-upsell"><span className="eyebrow">You may also need</span><p>Complete your routine with a little something extra.</p><button onClick={() => { setActiveProduct(products[6]); setCartOpen(false); }}>Explore pairings <ArrowRight size={15} /></button></div><div className="drawer-total"><div><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><small>Delivery calculated at checkout.</small><button className="button button-dark wide" onClick={() => setCheckout(true)}>Checkout <ArrowRight size={16} /></button><button className="view-bag" onClick={() => setCartOpen(false)}>View bag details</button></div></>}</>}</aside></div>}
    </main>
  );
}

function ShopView({ products: items, activeFilter, setActiveFilter, query, setQuery, onAdd, onOpen, wishlist, onWish, goTo }: { products: Product[]; activeFilter: string; setActiveFilter: (filter: string) => void; query: string; setQuery: (query: string) => void; onAdd: (product: Product) => void; onOpen: (product: Product) => void; wishlist: Product[]; onWish: (product: Product) => void; goTo: (view: "home" | "shop" | "brands" | "finder" | "account" | "contact") => void }) {
  const filters = ["All", "Hair", "Wigs", "Skin", "Makeup", "Tools", "Men"];
  return <section className="shop-page container section-space"><div className="page-kicker"><span className="eyebrow">Aglory catalogue</span><h1>Shop the <em>edit.</em></h1><p>7,000+ considered essentials for every texture, tone and ritual.</p></div><div className="shop-toolbar"><div className="filter-pills">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? "selected" : ""} onClick={() => setActiveFilter(filter)}>{filter === "All" ? "All products" : filter === "Wigs" ? "Wigs & extensions" : filter === "Skin" ? "Skin & body" : filter}</button>)}</div><label className="catalog-search"><Search size={16} /><input placeholder="Search this edit" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div><div className="shop-meta"><span>{items.length * 24}+ results <span className="muted">· Curated for you</span></span><button>Featured <ChevronDown size={14} /></button></div>{items.length ? <div className="product-grid shop-grid">{items.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} onOpen={onOpen} isWishlisted={wishlist.some((item) => item.id === product.id)} onWish={onWish} />)}</div> : <div className="no-results"><Search size={28} /><h3>Nothing in this edit yet.</h3><p>Try another category or clear your search.</p><button className="button button-outline" onClick={() => { setActiveFilter("All"); setQuery(""); }}>Clear filters</button></div>}<div className="shop-guide"><div><Sparkles size={18} /><span><strong>Need a little help?</strong> Find the right products for your hair, skin and beauty goals.</span></div><button className="text-button" onClick={() => goTo("finder")}>Take the finder <ArrowRight size={15} /></button></div></section>;
}

function BrandsView({ onSelect }: { onSelect: (brand: string) => void }) { return <section className="brands-page container section-space"><div className="page-kicker"><span className="eyebrow">The Aglory index</span><h1>Brands with <em>intention.</em></h1><p>Professional favourites, cult classics and the names worth knowing next.</p></div><div className="featured-brand"><div><span className="eyebrow">Featured brand</span><h2>Made for your<br /><em>real routine.</em></h2><p>Explore thoughtful formulas from the brands our store team reaches for again and again.</p><button className="button button-dark" onClick={() => onSelect("Shea Moisture")}>Shop Shea Moisture <ArrowRight size={16} /></button></div><img src={image("photo-1556229010-6c3f2c9ca5f8", 1000)} alt="Shea Moisture body care" /></div><div className="brand-index"><div className="section-heading"><div><span className="eyebrow">Shop all brands</span><h2>A–Z, with <em>favorites.</em></h2></div><label className="catalog-search"><Search size={16} /><input placeholder="Find a brand" /></label></div><div className="brand-list">{brands.map((brand, index) => <button key={brand} onClick={() => onSelect(brand)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{brand}</strong><ArrowUpRight size={16} /></button>)}</div></div></section>; }

function FinderView({ step, setStep, type, setType, onOpen, goTo }: { step: number; setStep: (step: number) => void; type: string; setType: (type: string) => void; onOpen: (product: Product) => void; goTo: (view: "home" | "shop" | "brands" | "finder" | "account" | "contact") => void }) { const goals = ["Hair growth", "Dry hair", "Protective styling", "Wig care", "Uneven tone", "Men’s grooming"]; const picks = type === "Hair growth" ? products.filter((p) => ["virgin-fertilizer", "dexe-serum", "dexe-mask"].includes(p.id)) : products.slice(2, 5); return <section className="finder-page container section-space"><div className="finder-intro"><span className="eyebrow">Your beauty, decoded</span><h1>Find what feels<br /><em>right for you.</em></h1><p>A few thoughtful questions, then a considered edit picked from the Aglory catalogue.</p><div className="finder-progress"><span className="active" /><span className={step > 0 ? "active" : ""} /><span className={step > 1 ? "active" : ""} /></div></div>{step < 2 ? <div className="finder-card"><span className="eyebrow">Step {step + 1} of 3</span><h2>{step === 0 ? "What does your routine need today?" : "How would you like to shop it?"}</h2>{step === 0 ? <div className="finder-options">{goals.map((goal) => <button key={goal} className={type === goal ? "selected" : ""} onClick={() => setType(goal)}>{goal}<ArrowRight size={16} /></button>)}</div> : <div className="finder-options"><button className="selected" onClick={() => setStep(2)}>Show me a considered edit <ArrowRight size={16} /></button><button onClick={() => goTo("shop")}>I’d rather browse the catalogue <ArrowRight size={16} /></button></div>}<button className="button button-dark finder-next" onClick={() => setStep(step + 1)}>{step === 0 ? "Continue" : "See my edit"} <ArrowRight size={16} /></button></div> : <div className="finder-results"><div className="results-head"><div><span className="eyebrow">Your considered edit</span><h2>For {type.toLowerCase()}.</h2></div><button className="text-button" onClick={() => setStep(0)}>Start again <ArrowRight size={15} /></button></div><p className="results-note">Three Aglory essentials to make the next step in your routine feel a little easier.</p><div className="product-grid">{picks.map((product) => <ProductCard key={product.id} product={product} onAdd={() => onOpen(product)} onOpen={onOpen} isWishlisted={false} onWish={() => {}} />)}</div><button className="button button-dark" onClick={() => goTo("shop")}>Explore all products <ArrowRight size={16} /></button></div>}</section>; }

function AccountView({ goTo, wishlist }: { goTo: (view: "home" | "shop" | "brands" | "finder" | "account" | "contact") => void; wishlist: Product[] }) { return <section className="account-page container section-space"><div className="page-kicker"><span className="eyebrow">Welcome back</span><h1>Your beauty <em>dashboard.</em></h1><p>Keep your favorites close, track your orders and pick up where your routine left off.</p></div><div className="account-grid"><div className="account-card account-welcome"><span className="account-avatar">A</span><span className="eyebrow">Your Aglory account</span><h2>Ready for your next<br /><em>good hair day?</em></h2><button className="button button-dark" onClick={() => goTo("shop")}>Buy again <ArrowRight size={16} /></button></div><div className="account-card"><span className="eyebrow">Recent orders</span><h3>No orders yet</h3><p>Your next order will live here, along with delivery updates and easy reordering.</p><button className="text-button" onClick={() => goTo("shop")}>Start shopping <ArrowRight size={15} /></button></div><div className="account-card"><span className="eyebrow">Saved edit</span><h3>{wishlist.length ? `${wishlist.length} saved item${wishlist.length === 1 ? "" : "s"}` : "Your wishlist is quiet."}</h3><p>Keep the products you’re considering in one beautiful place.</p><button className="text-button" onClick={() => goTo("shop")}>Browse favorites <ArrowRight size={15} /></button></div></div><div className="account-links"><button><PackageCheck size={18} /> Track an order <ArrowRight size={15} /></button><button><Heart size={18} /> Wishlist <ArrowRight size={15} /></button><button><CircleHelp size={18} /> Need help? <ArrowRight size={15} /></button></div></section>; }

function ContactView() { return <section className="contact-page container section-space"><div className="contact-intro"><span className="eyebrow">Come closer</span><h1>Let’s talk<br /><em>beauty.</em></h1><p>Questions about a product, your next style or a same-day delivery? The Aglory team is here.</p><div className="contact-details"><a href="tel:01322333305"><span>Call the store</span><strong>01322 333305</strong></a><a href="https://wa.me/4407446841404" target="_blank" rel="noreferrer"><span>WhatsApp us</span><strong>+44 07446 841404</strong></a><a href="mailto:info@agloryhairandcosmetics.co.uk"><span>Email</span><strong>info@agloryhairandcosmetics.co.uk</strong></a></div></div><div className="contact-form-card"><span className="eyebrow">Send a note</span><h2>What can we help<br /><em>you find?</em></h2><form onSubmit={(event) => event.preventDefault()}><input placeholder="Your name" aria-label="Your name" /><input type="email" placeholder="Email address" aria-label="Email address" /><select aria-label="What do you need help with?"><option>Product advice</option><option>Delivery & returns</option><option>Click & collect</option><option>Something else</option></select><textarea placeholder="Tell us a little more..." aria-label="Message" /><button className="button button-dark wide" type="submit">Send message <ArrowRight size={16} /></button></form></div></section>; }
