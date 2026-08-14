"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  Heart,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useStorefront } from "@/lib/storefront-context";
import { categories } from "@/lib/store-data";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const megaMenuGroups = [
  {
    title: "Hair",
    links: [
      ["Hair care", "/category/hair-care"],
      ["Shampoo & conditioner", "/category/hair-care"],
      ["Treatments & styling", "/category/hair-care"],
      ["Hair colour", "/category/hair-care"],
    ],
  },
  {
    title: "Wigs & extensions",
    links: [
      ["Wigs", "/category/wigs-extensions"],
      ["Braiding hair", "/category/wigs-extensions"],
      ["Crochet & weaves", "/category/wigs-extensions"],
      ["Hair pieces", "/category/wigs-extensions"],
    ],
  },
  {
    title: "Beauty",
    links: [
      ["Makeup", "/category/makeup"],
      ["Skin & body", "/category/skin-body"],
      ["Tools & accessories", "/category/tools-accessories"],
      ["Men’s grooming", "/category/mens-grooming"],
    ],
  },
  {
    title: "Shop",
    links: [
      ["New arrivals", "/shop?collection=new-arrivals"],
      ["Best sellers", "/shop?collection=best-sellers"],
      ["All brands", "/brands"],
      ["All products", "/shop"],
    ],
  },
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [mobileNav, setMobileNav] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const { cartCount, wishlist } = useStorefront();
  useEffect(() => {
    let previousScrollY = window.scrollY;
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setAtTop(currentScrollY < 24);
        setHeaderVisible(currentScrollY < 24 || currentScrollY < previousScrollY);
        previousScrollY = currentScrollY;
        frame = 0;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!mobileNav) return;
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && setMobileNav(false);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileNav]);
  return (
    <main className="site-shell">
      <div className="announcement">
        <a
          href="tel:01322333305"
          className="announcement-phone"
          aria-label="Call store at 01322 333305"
        >
          <Phone size={12} />
          <span>01322 333305</span>
        </a>
        <span className="announcement-text">
          Same-day delivery available when you order before 12pm
        </span>
        <div className="announcement-socials">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram size={13} />
          </a>
          <a
            href="https://wa.me/4407446841404"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={13} />
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
          >
            <FaTiktok size={13} />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF size={12} />
          </a>
        </div>
      </div>
      <div className="site-header-spacer" aria-hidden="true" />
      <header
        className={`site-header ${headerVisible || mobileNav ? "is-visible" : "is-hidden"} ${atTop ? "is-at-top" : "is-scrolled"}`}
      >
        <div className="header-main container">
          <button
            className="mobile-menu"
            aria-label="Open navigation"
            onClick={() => setMobileNav(true)}
          >
            <Menu size={21} />
          </button>
          <Link
            className="logo"
            href="/"
            aria-label="Aglory Hair and Cosmetics home"
          >
            <span>ag</span>lory
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/shop">Shop</Link>
            <NavigationMenu className="category-navigation">
              <NavigationMenuList>
                <NavigationMenuItem className="text-xs font-semibold">
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent className="category-menu-content">
                    <div className="mega-menu-columns">
                      {megaMenuGroups.map((group) => (
                        <div className="mega-menu-column" key={group.title}>
                          <span className="mega-menu-title">{group.title}</span>
                          {group.links.map(([label, href]) => (
                            <NavigationMenuLink
                              key={`${group.title}-${label}`}
                              className="mega-menu-link"
                              render={<Link href={href} />}
                            >
                              {label}
                            </NavigationMenuLink>
                          ))}
                        </div>
                      ))}
                    </div>
                    <NavigationMenuLink
                      className="category-menu-all"
                      render={<Link href="/shop" />}
                    >
                      View all beauty <ArrowUpRight size={14} />
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link href="/brands">Brands</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <div className="header-actions">
            <Link className="icon-label" href="/search">
              <Search size={19} />
              <span>Search</span>
            </Link>
            <Link className="icon-label hide-small" href="/login">
              <UserRound size={19} />
              <span>Account</span>
            </Link>
            <Link className="icon-label" href="/wishlist" aria-label="Wishlist">
              <Heart size={19} />
              <span className="hide-small">Wishlist</span>
              {wishlist.length > 0 && <b>{wishlist.length}</b>}
            </Link>
            <Link className="bag-button" href="/cart" aria-label="Shopping bag">
              <ShoppingBag size={20} />
              <span className="bag-count">{cartCount}</span>
            </Link>
          </div>
        </div>
      </header>
      {mobileNav && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMobileNav(false)}
        >
          <aside
            className="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mobile-nav-top">
              <div>
                <span className="mobile-nav-label">Aglory menu</span>
                <Link
                  className="logo"
                  href="/"
                  onClick={() => setMobileNav(false)}
                >
                  <span>ag</span>lory
                </Link>
              </div>
              <button
                className="mobile-nav-close"
                onClick={() => setMobileNav(false)}
                aria-label="Close navigation"
              >
                <X size={21} />
              </button>
            </div>
            <div className="mobile-nav-intro">
              <span>Beauty, made brilliantly personal.</span>
            </div>
            <nav className="mobile-nav-links" aria-label="Mobile menu links">
              <Link
                className="mobile-nav-featured"
                href="/shop"
                onClick={() => setMobileNav(false)}
              >
                <span>Shop all beauty</span>
                <ArrowUpRight size={17} />
              </Link>
              <details className="mobile-category-details">
                <summary>
                  <span>Categories</span>
                  <ChevronRight size={17} />
                </summary>
                <div className="mobile-category-links">
                  {categories.map((category) => (
                    <Link
                      href={`/category/${category.slug}`}
                      key={category.slug}
                      onClick={() => setMobileNav(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </details>
              <Link href="/brands" onClick={() => setMobileNav(false)}>
                <span>Brands</span>
                <ChevronRight size={17} />
              </Link>
              <Link href="/blog" onClick={() => setMobileNav(false)}>
                <span>Beauty blog</span>
                <ChevronRight size={17} />
              </Link>
            </nav>
            <div className="mobile-nav-footer">
              <Link href="/login" onClick={() => setMobileNav(false)}>
                <UserRound size={17} /> Account
              </Link>
              <Link href="/wishlist" onClick={() => setMobileNav(false)}>
                <Heart size={17} /> Wishlist{" "}
                {wishlist.length > 0 && <b>{wishlist.length}</b>}
              </Link>
              <Link href="/cart" onClick={() => setMobileNav(false)}>
                <ShoppingBag size={17} /> Bag{" "}
                {cartCount > 0 && <b>{cartCount}</b>}
              </Link>
            </div>
            <div className="mobile-nav-contact">
              <a href="tel:01322333305" className="mobile-nav-phone">
                <Phone size={15} /> <span>01322 333305</span>
              </a>
              <div className="mobile-nav-socials">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram size={15} />
                </a>
                <a
                  href="https://wa.me/4407446841404"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={15} />
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                >
                  <FaTiktok size={15} />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={14} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
      {children}
      <SiteFooter />
    </main>
  );
}

function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <>
      <section className="newsletter">
        <div className="container newsletter-inner">
          <div>
            <span className="eyebrow font-bold">
              A little beauty in your inbox
            </span>
            <h2 className="font-semibold">
              Your beauty inbox,
              <br />
              <em>upgraded.</em>
            </h2>
          </div>
          <div>
            <p className="font-medium">
              Get exclusive offers, beauty tips, and early access to new
              arrivals directly in your inbox.
            </p>
            {subscribed ? (
              <div className="form-success font-semibold" role="status">
                Signup captured. Email delivery will be connected with the
                newsletter service.
              </div>
            ) : (
              <form
                className="newsletter-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubscribed(true);
                }}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Your email address"
                  className="font-semibold"
                  required
                />
                <button type="submit" className="font-bold">
                  Join the community <span>→</span>
                </button>
              </form>
            )}
            <small className="font-medium">
              By subscribing, you agree to receive Aglory updates. Unsubscribe
              anytime.
            </small>
          </div>
        </div>
      </section>
      <footer className="site-footer font-medium">
        <div className="container footer-main">
          <div className="footer-brand">
            <Link className="logo" href="/">
              <span>ag</span>lory
            </Link>
            <p className="font-medium">
              The destination for beauty that understands you.
            </p>
            <div className="socials">
              <a href="https://www.instagram.com" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://wa.me/4407446841404" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
              <a href="https://www.tiktok.com" aria-label="TikTok">
                <FaTiktok />
              </a>
              <a href="https://www.facebook.com" aria-label="Facebook">
                <FaFacebookF />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <span className="font-bold">Shop</span>
            <Link className="font-semibold" href="/shop">
              Hair care
            </Link>
            <Link className="font-semibold" href="/category/wigs-extensions">
              Wigs & extensions
            </Link>
            <Link className="font-semibold" href="/category/skin-body">
              Skin & body
            </Link>
            <Link
              className="font-semibold"
              href="/shop?collection=new-arrivals"
            >
              New arrivals
            </Link>
            <Link
              className="font-semibold"
              href="/shop?collection=best-sellers"
            >
              Best sellers
            </Link>
          </div>
          <div className="footer-col">
            <span className="font-bold">Help</span>
            <Link className="font-semibold" href="/contact">
              Contact
            </Link>
            <Link className="font-semibold" href="/policies/delivery-returns">
              Delivery & returns
            </Link>
            <Link className="font-semibold" href="/track-order">
              Track an order
            </Link>
            <Link className="font-semibold" href="/account">
              Your account
            </Link>
            <Link className="font-semibold" href="/brands">
              Brands
            </Link>
            <Link className="font-semibold" href="/faq">
              FAQs
            </Link>
          </div>
          <div className="footer-col footer-visit">
            <span className="font-bold">Visit us</span>
            <p className="font-semibold">
              Aglory Hair and Cosmetics
              <br />8 Cross Street
              <br />
              Erith, Kent DA8 1RB
            </p>
            <a className="font-bold" href="tel:01322333305">
              01322 333305
            </a>
            <a
              className="font-semibold"
              href="mailto:info@agloryhairandcosmetics.co.uk"
            >
              info@agloryhairandcosmetics.co.uk
            </a>
          </div>
        </div>
        <div className="container footer-bottom font-semibold">
          <span>© 2026 Aglory Hair and Cosmetics</span>
          <span>Beauty, culture, confidence.</span>
          <span>
            <Link className="font-bold" href="/policies/privacy">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link className="font-bold" href="/policies/terms">
              Terms
            </Link>
            ·{" "}
            <Link className="font-bold" href="/policies/cookies">
              Cookies
            </Link>
          </span>
        </div>
      </footer>
      <a
        className="whatsapp-float font-bold"
        href="https://wa.me/4407446841404"
        target="_blank"
        rel="noreferrer"
        aria-label="Message Aglory Hair and Cosmetics on WhatsApp"
      >
        <span>
          <FaWhatsapp size={18} />
        </span>
        <small className="font-bold">Message us on WhatsApp</small>
      </a>{" "}
    </>
  );
}
