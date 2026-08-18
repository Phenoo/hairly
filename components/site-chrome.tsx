"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  Heart,
  Menu,
  Phone,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useStorefront } from "@/lib/storefront-context";
import { categories } from "@/lib/store-data";
import { HeaderSearch } from "@/components/header-search";
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
    title: "Hair care",
    links: [
      ["All hair care", "/category/hair-care"],
      ["Treatments & masks", "/search?q=treatment"],
      ["Oils & serums", "/search?q=serum"],
      ["Scalp care", "/search?q=scalp"],
    ],
  },
  {
    title: "Protective styling",
    links: [
      ["All wigs & extensions", "/category/wigs-extensions"],
      ["Braiding hair", "/search?q=braid"],
      ["Twists", "/search?q=twist"],
      ["Human hair", "/search?q=human%20hair"],
    ],
  },
  {
    title: "Skin, makeup & grooming",
    links: [
      ["Makeup", "/category/makeup"],
      ["Skin & body", "/category/skin-body"],
      ["Men’s grooming", "/category/mens-grooming"],
      ["Tools & accessories", "/category/tools-accessories"],
    ],
  },
  {
    title: "More ways to shop",
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
          Visit us in Erith · Local delivery availability confirmed by our team
        </span>
        <div className="announcement-socials">
          <a
            href="https://wa.me/447446841404"
            target="_blank"
            rel="noreferrer"
            aria-label="Contact A-Glory on WhatsApp"
          >
            <FaWhatsapp size={13} />
            <span>WhatsApp</span>
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
            aria-label="A-Glory Hair and Cosmetics home"
          >
            <span>ag</span>lory
          </Link>
          <HeaderSearch />
          <nav className="desktop-nav" aria-label="Main navigation">
            <NavigationMenu className="category-navigation">
              <NavigationMenuList>
                <NavigationMenuItem className="text-xs font-semibold">
                  <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
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
            <Link href="/category/hair-care">Hair care</Link>
            <Link href="/category/wigs-extensions">Wigs & extensions</Link>
            <Link href="/category/skin-body">Skin & body</Link>
            <Link href="/category/makeup">Makeup</Link>
            <Link href="/brands">Brands</Link>
            <Link className="nav-offers" href="/shop?collection=best-sellers">Offers</Link>
          </nav>
          <div className="header-actions">
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
                <span className="mobile-nav-label">A-Glory menu</span>
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
              <HeaderSearch onNavigate={() => setMobileNav(false)} />
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
                  <span>Shop by category</span>
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
                <span>Beauty advice</span>
                <ChevronRight size={17} />
              </Link>
              <Link href="/shop?collection=new-arrivals" onClick={() => setMobileNav(false)}>
                <span>New arrivals</span>
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
                  href="https://wa.me/447446841404"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={15} />
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
  return (
    <>
      <section className="newsletter">
        <div className="container newsletter-inner">
          <div>
            <span className="eyebrow font-bold">
              Product advice from real people
            </span>
            <h2 className="font-semibold">
              Not sure what
              <br />
              <em>to choose?</em>
            </h2>
          </div>
          <div>
            <p className="font-medium">
              Ask the Erith store team about textures, shades, routines or
              availability before you buy.
            </p>
            <div className="newsletter-actions">
              <a className="button button-dark" href="https://wa.me/447446841404" target="_blank" rel="noreferrer">
                WhatsApp the team <ArrowUpRight size={15} />
              </a>
              <Link className="text-button" href="/contact">Contact & store details</Link>
            </div>
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
              <a href="https://wa.me/447446841404" aria-label="WhatsApp A-Glory">
                <FaWhatsapp />
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
              A-Glory Hair and Cosmetics
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
          <span>© 2026 A-Glory Hair and Cosmetics</span>
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
        href="https://wa.me/447446841404"
        target="_blank"
        rel="noreferrer"
        aria-label="Message A-Glory Hair and Cosmetics on WhatsApp"
      >
        <span>
          <FaWhatsapp size={18} />
        </span>
        <small className="font-bold">Message us on WhatsApp</small>
      </a>{" "}
    </>
  );
}
