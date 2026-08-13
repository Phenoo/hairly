"use client";

import Link from "next/link";
import { Heart, MapPin, Menu, Search, ShoppingBag, Sparkles, UserRound, X, Zap } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { useState } from "react";
import { useStorefront } from "@/lib/storefront-context";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [mobileNav, setMobileNav] = useState(false);
  const { cartCount, wishlist } = useStorefront();
  return <main className="site-shell">
    <div className="announcement"><span><Zap size={14} /> Same-day delivery available when you order before 12pm</span><span className="announcement-detail">Free delivery on orders over £50</span></div>
    <header className="site-header">
      <div className="header-main container">
        <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={21} /></button>
        <Link className="logo" href="/" aria-label="Aglory Hair and Cosmetics home"><span>ag</span>lory</Link>
        <nav className="desktop-nav" aria-label="Main navigation"><Link href="/shop">Shop</Link><Link href="/finders">Find your beauty</Link><Link href="/brands">Brands</Link><Link href="/blog">Blog</Link></nav>
        <div className="header-actions"><Link className="icon-label" href="/search"><Search size={19} /><span>Search</span></Link><Link className="icon-label hide-small" href="/account"><UserRound size={19} /><span>Account</span></Link><Link className="icon-label" href="/wishlist" aria-label="Wishlist"><Heart size={19} /><span className="hide-small">Wishlist</span>{wishlist.length > 0 && <b>{wishlist.length}</b>}</Link><Link className="bag-button" href="/cart" aria-label="Shopping bag"><ShoppingBag size={20} /><span className="bag-count">{cartCount}</span></Link></div>
      </div>
      <div className="header-sub container"><span>Curated beauty for every texture, tone & ritual.</span><Link href="/contact">Visit us in Erith <MapPin size={13} /></Link></div>
    </header>
    {mobileNav && <div className="mobile-nav-backdrop" onClick={() => setMobileNav(false)}><aside className="mobile-nav" onClick={(event) => event.stopPropagation()}><div className="mobile-nav-top"><Link className="logo" href="/" onClick={() => setMobileNav(false)}><span>ag</span>lory</Link><button onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={21} /></button></div><div className="mobile-nav-links"><Link href="/shop" onClick={() => setMobileNav(false)}>Shop all <span>→</span></Link><Link href="/finders" onClick={() => setMobileNav(false)}>Find your beauty <span>→</span></Link><Link href="/brands" onClick={() => setMobileNav(false)}>Brands <span>→</span></Link><Link href="/blog" onClick={() => setMobileNav(false)}>Blog <span>→</span></Link><Link href="/account" onClick={() => setMobileNav(false)}>Your account <span>→</span></Link></div><div className="mobile-nav-note"><Sparkles size={18} /><p>Beauty advice, same-day delivery and a real store team just a message away.</p></div></aside></div>}
    {children}
    <SiteFooter />
  </main>;
}

function SiteFooter() {
  return <><section className="newsletter"><div className="container newsletter-inner"><div><span className="eyebrow">A little beauty in your inbox</span><h2>Your beauty inbox,<br /><em>upgraded.</em></h2></div><div><p>New arrivals, expert advice and members-only offers — considered, never noisy.</p><form className="newsletter-form" onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Your email address" required /><button type="submit">Join the community <span>→</span></button></form><small>By subscribing, you agree to receive Aglory updates. Unsubscribe anytime.</small></div></div></section><footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><Link className="logo" href="/"><span>ag</span>lory</Link><p>The destination for beauty that understands you.</p><div className="socials"><a href="https://www.instagram.com" aria-label="Instagram"><FaInstagram /></a><a href="https://wa.me/4407446841404" aria-label="WhatsApp"><FaWhatsapp /></a><a href="https://www.tiktok.com" aria-label="TikTok"><FaTiktok /></a><a href="https://www.facebook.com" aria-label="Facebook"><FaFacebookF /></a></div></div><div className="footer-col"><span>Shop</span><Link href="/shop">Hair care</Link><Link href="/category/wigs-extensions">Wigs & extensions</Link><Link href="/category/skin-body">Skin & body</Link><Link href="/shop?collection=new-arrivals">New arrivals</Link><Link href="/shop?collection=best-sellers">Best sellers</Link></div><div className="footer-col"><span>Help</span><Link href="/contact">Contact</Link><Link href="/policies/delivery-returns">Delivery & returns</Link><Link href="/track-order">Track an order</Link><Link href="/account">Your account</Link><Link href="/brands">Brands</Link></div><div className="footer-col footer-visit"><span>Visit us</span><p>Aglory Hair and Cosmetics<br />8 Cross Street<br />Erith, Kent DA8 1RB</p><a href="tel:01322333305">01322 333305</a><a href="mailto:info@agloryhairandcosmetics.co.uk">info@agloryhairandcosmetics.co.uk</a></div></div><div className="container footer-bottom"><span>© 2026 Aglory Hair and Cosmetics</span><span>Beauty, culture, confidence.</span><span>Privacy · Terms</span></div></footer><a className="whatsapp-float" href="https://wa.me/4407446841404" target="_blank" rel="noreferrer" aria-label="Chat with Aglory Hair and Cosmetics on WhatsApp"><span><FaWhatsapp size={18} /></span><small>Need beauty advice?</small></a></>;
}
