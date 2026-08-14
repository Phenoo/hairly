import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CreditCard,
  MapPin,
  PackageCheck,
} from "lucide-react";
import { categories, image, products } from "@/lib/store-data";
import { ProductGrid } from "@/components/product-card";
import { BrandMarquee } from "@/components/brand-marque";

const blogCards = [
  [
    "protective-style-that-feels-like-you",
    "Hair",
    "How to choose a protective style that feels like you",
    "A practical guide to texture, tension and finding a look you can live in.",
    "photo-1522337360788-8b13dee7a37e",
  ],
  [
    "soft-skin-ritual-decoded",
    "Skin",
    "The soft-skin ritual, decoded",
    "How to build a body-care routine that feels like a moment, not a chore.",
    "photo-1570194065650-d99fb4ee38df",
  ],
  [
    "finding-your-undertone",
    "Beauty",
    "Finding your undertone with confidence",
    "The simple shade cues that make your next complexion match feel easier.",
    "photo-1596462502278-27bfdc403348",
  ],
];

const featuredBrands = [
  { name: "Sensationnel", domain: "sensationnel.com" },
  { name: "Shea Moisture", domain: "www.sheamoisture.com" },
  { name: "ORS", domain: "orshaircare.com" },
  { name: "Ebin New York", domain: "ebinnewyork.com" },
  { name: "Palmer’s", domain: "palmers.com" },
  { name: "Sleek Makeup", domain: "www.sleekmakeup.com" },
];

const signatureEdits = [
  {
    eyebrow: "Protective styling",
    title: (
      <>
        Your next <em>signature style.</em>
      </>
    ),
    body: "Braids, twists and extensions chosen for the way you actually wear them.",
    href: "/collections/protective-styling",
    image: products[1].image,
    alt: products[1].imageAlt,
  },
  {
    eyebrow: "Hair rituals",
    title: (
      <>
        Care that keeps <em>up with you.</em>
      </>
    ),
    body: "Everyday essentials for softer strands, nourished roots and polished finishes.",
    href: "/collections/wash-day",
    image: products[2].image,
    alt: products[2].imageAlt,
  },
  {
    eyebrow: "Wig care",
    title: (
      <>
        Keep your <em>style in form.</em>
      </>
    ),
    body: "Simple care essentials for a polished routine between wears.",
    href: "/collections/wig-care",
    image: products[0].image,
    alt: products[0].imageAlt,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="kicker">
            The destination for beauty that understands you
          </div>
          <h1>
            Beauty,
            <br />
            <em>made brilliantly</em> personal.
          </h1>
          <p>
            Discover hair, skin and beauty essentials selected for every
            texture, tone and routine — with expert care from Erith to your
            door.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/shop">
              Shop beauty <ArrowRight size={16} />
            </Link>
            <Link className="text-button" href="/category/wigs-extensions">
              Shop wigs & extensions <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="hero-category-links" aria-label="Shop key categories">
            <Link href="/category/hair-care">Shop hair</Link>
            <Link href="/category/wigs-extensions">Shop wigs</Link>
            <Link href="/category/skin-body">Shop skincare</Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-main">
            <img
              src={image("photo-1522337360788-8b13dee7a37e", 1200)}
              alt="A beauty editorial portrait"
            />
          </div>
          <div className="hero-caption">
            <span>01 / 04</span>
            <span>Texture is always in.</span>
          </div>
          <div className="hero-stamp">
            <span>AGLORY</span>
            <small>
              Beauty
              <br />
              in all
              <br />
              your forms
            </small>
          </div>
          <Link className="hero-product" href={`/products/${products[0].slug}`}>
            <img src={products[0].image} alt={products[0].imageAlt} />
            <div>
              <span className="eyebrow">Featured product</span>
              <strong>Complexion, considered.</strong>
            </div>
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div>
            <PackageCheck size={21} />
            <span>
              <strong>Same-day delivery</strong>Order before 12pm
            </span>
          </div>
          <div>
            <Check size={21} />
            <span>
              <strong>30-day returns</strong>Hassle-free returns
            </span>
          </div>
          <div>
            <CreditCard size={21} />
            <span>
              <strong>Secure payment</strong>Safe checkout every time
            </span>
          </div>
        </div>
      </section>

      <section className="category-section container section-space">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Shop by category</span>
            <h2>
              Beauty for
              <br />
              <em>every need.</em>
            </h2>
          </div>
          <Link className="text-button" href="/shop">
            View all categories <ArrowRight size={16} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link
              className={`category-card category-${index}`}
              key={category.slug}
              href={`/category/${category.slug}`}
            >
              <img src={category.image} alt="" />
              <span className="category-overlay" />
              <span className="category-content">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{category.name}</strong>
                <small>{category.note}</small>
                <ArrowUpRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <BrandMarquee />

      <section className="brand-ribbon">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Trusted professional brands</span>
              <h2>
                Names you
                <br />
                <em>know and love.</em>
              </h2>
            </div>
            <Link className="text-button" href="/brands">
              Shop all brands <ArrowRight size={16} />
            </Link>
          </div>
          <div className="brand-ribbon-list">
            {featuredBrands.map((brand) => (
              <Link
                href={`/brands/${brand.name.toLowerCase().replaceAll(" ", "-")}`}
                key={brand.name}
              >
                <img
                  src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`}
                  alt={`${brand.name} logo`}
                />
                <span>{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="signature-edit section-space">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">The Aglory edit</span>
              <h2>
                Start with what
                <br />
                <em>feels like you.</em>
              </h2>
            </div>
            <p className="signature-intro">
              A considered starting point for your next style, ritual or shade.
            </p>
          </div>
          <div className="signature-grid">
            {signatureEdits.map((edit, index) => (
              <Link
                className={`signature-card signature-card-${index}`}
                href={edit.href}
                key={edit.eyebrow}
              >
                <img src={edit.image} alt={edit.alt} />
                <span className="signature-shade" />
                <div className="signature-copy">
                  <span className="font-semibold text-sm tracking-wider uppercase text-white">
                    {edit.eyebrow}
                  </span>
                  <h3>{edit.title}</h3>
                  <p>{edit.body}</p>
                  <span className="text-button light-button">
                    Explore edit <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="product-section section-dark section-space">
        <div className="container">
          <div className="section-heading light">
            <div>
              <span className="eyebrow">Bestsellers</span>
              <h2>
                Featured <em>products.</em>
              </h2>
            </div>
            <Link className="text-button light-button" href="/shop">
              Shop all products <ArrowRight size={16} />
            </Link>
          </div>
          <ProductGrid items={products.slice(0, 4)} />
        </div>
      </section>

      <section className="routine-banner container section-space">
        <div className="routine-image">
          <img
            src={image("photo-1608248543803-ba4f8c70ae0b", 1000)}
            alt="A nourishing hair care routine"
          />
        </div>
        <div className="routine-copy">
          <span className="eyebrow">Beauty guides</span>
          <h2>
            Glow, strength
            <br />
            <em>and confidence.</em>
          </h2>
          <p>
            Aglory is your partner in glow, strength and confidence. Find simple
            guidance for the beauty goals that matter to you.
          </p>
          <Link className="button button-dark" href="/blog">
            Read our guides <ArrowRight size={16} />
          </Link>
          <div className="routine-goals">
            <span>Hair growth</span>
            <span>Neck firming</span>
            <span>Pigmentation</span>
            <span>Dark circles</span>
          </div>
        </div>
      </section>

      <section className="blog-section section-space">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Our news</span>
              <h2>
                Latest beauty
                <br />
                <em>insights.</em>
              </h2>
            </div>
            <Link className="text-button" href="/blog">
              View all posts <ArrowRight size={16} />
            </Link>
          </div>
          <p className="blog-intro">
            Practical, culturally-aware guidance for the routines you actually
            live — from choosing your undertone to caring for a wig between
            wears.
          </p>
          <div className="blog-grid">
            {blogCards.map(([slug, category, title, excerpt, photo], index) => (
              <Link
                className={`blog-card blog-card-${index}`}
                href={`/blog/${slug}`}
                key={slug}
              >
                <img src={image(photo)} alt="" />
                <div className="blog-card-copy">
                  <span className="eyebrow">{category} / 5 min read</span>
                  <h3>{title}</h3>
                  <p>{excerpt}</p>
                  <span className="blog-card-link">
                    Read story <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <BrandMarquee />

      <section className="testimonial-section section-space">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Customer stories</span>
              <h2>
                Loved by the
                <br />
                <em>community.</em>
              </h2>
            </div>
            <span className="testimonial-note">Stories published by Aglory.</span>
          </div>
          <div className="review-placeholder-grid">
            {[
              ["Sarah Johnson", "Professional Stylist", "The Keratin Treatment transformed my frizzy hair..."],
              ["Emma Williams", "Customer story", "Fast delivery and premium packaging."],
              ["David Chen", "Beauty Enthusiast", "Aglory is my go-to for all things beauty."],
            ].map(([author, role, quote]) => (
              <article className="review-placeholder-card review-testimonial-card" key={author}>
                <span className="review-placeholder-mark">“</span>
                <blockquote>{quote}</blockquote>
                <h3>{author}</h3>
                <p>{role}</p>
              </article>
            ))}
          </div>
          <a className="text-button review-contact-link" href="https://www.agloryhairandcosmetics.co.uk/" target="_blank" rel="noreferrer">
            View more stories <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="new-arrivals-section section-dark section-space">
        <div className="container">
          <div className="section-heading light">
            <div>
              <span className="eyebrow">Just in</span>
              <h2>
                New <em>arrivals.</em>
              </h2>
            </div>
            <Link
              className="text-button light-button"
              href="/shop?collection=new-arrivals"
            >
              View all new arrivals <ArrowRight size={16} />
            </Link>
          </div>
          <ProductGrid items={products.slice(4, 8)} />
        </div>
      </section>

      <section className="store-section container section-space">
        <div className="store-photo">
          <img
            src={image("photo-1515377905703-c4788e51af15", 1100)}
            alt="Aglory Hair and Cosmetics store experience"
          />
        </div>
        <div className="store-copy">
          <span className="eyebrow">Come say hello</span>
          <h2>
            Your beauty place,
            <br />
            <em>in real life.</em>
          </h2>
          <p>
            Visit the Aglory Hair and Cosmetics team in Erith for expert advice,
            new arrivals and a little time to find what feels right.
          </p>
          <div className="address">
            <MapPin size={17} />
            <span>
              <strong>Aglory Hair and Cosmetics</strong>8 Cross Street, Erith
              <br />
              Kent DA8 1RB
            </span>
          </div>
          <div className="store-links">
            <a
              className="button button-outline"
              href="https://www.google.com/maps/search/?api=1&query=8+Cross+Street+Erith+Kent+DA8+1RB"
              target="_blank"
              rel="noreferrer"
            >
              Get directions <ArrowUpRight size={15} />
            </a>
            <a
              href="https://wa.me/4407446841404"
              target="_blank"
              rel="noreferrer"
              className="text-button"
            >
              WhatsApp the team <ArrowRight size={15} />
            </a>
          </div>
          <span className="hours">Mon–Sat 9am–7pm · Sun 11am–4pm</span>
        </div>
      </section>
    </>
  );
}
