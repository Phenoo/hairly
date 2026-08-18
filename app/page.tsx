import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  MessageCircle,
  PackageCheck,
  Store,
} from "lucide-react";
import { blogPosts, categories, products, slugify } from "@/lib/store-data";
import { ProductGrid } from "@/components/product-card";

const shoppingNeeds = [
  ["Scalp care", "scalp"],
  ["Hair treatments", "treatment"],
  ["Protective styling", "protective style"],
  ["Body care", "body"],
  ["Complexion", "foundation"],
];

const featuredBrands = [
  "Shea Moisture",
  "Cantu",
  "ORS",
  "Sensationnel",
  "Ebin New York",
  "Palmer’s",
  "Freetress Equal",
  "Sleek Makeup",
];

export default function HomePage() {
  return (
    <>
      <section className="retail-hero">
        <div className="container retail-hero-grid">
          <div className="retail-hero-copy">
            <span className="eyebrow">Hair, beauty and grooming in Erith</span>
            <h1>
              Hair care for
              <br />
              <em>every texture.</em>
            </h1>
            <p>
              Shop trusted hair, wig, skincare and beauty essentials, backed by
              advice from the A-Glory store team.
            </p>
            <div className="hero-actions">
              <Link className="button button-light" href="/shop">
                Shop all products <ArrowRight size={16} />
              </Link>
              <Link className="text-button light-button" href="/category/wigs-extensions">
                Wigs & extensions <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div className="retail-hero-products" aria-label="Featured product categories">
            {products.slice(0, 3).map((product, index) => (
              <Link
                className={`retail-hero-product retail-hero-product-${index}`}
                href={`/products/${product.slug}`}
                key={product.id}
              >
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  width={720}
                  height={900}
                  sizes="(max-width: 900px) 60vw, 32vw"
                  preload={index === 0}
                />
                <span>
                  <small>{product.brand}</small>
                  <strong>{product.name}</strong>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="A-Glory service information">
        <div className="container trust-grid">
          <div>
            <Store size={21} />
            <span><strong>Real Erith store</strong>8 Cross Street, DA8 1RB</span>
          </div>
          <div>
            <PackageCheck size={21} />
            <span><strong>Local delivery</strong>Availability confirmed by our team</span>
          </div>
          <div>
            <Check size={21} />
            <span><strong>30-day returns</strong>On eligible, unopened items</span>
          </div>
        </div>
      </section>

      <section className="category-section container section-space">
        <div className="section-heading retail-heading">
          <div>
            <span className="eyebrow">Start here</span>
            <h2>Shop by category</h2>
          </div>
          <Link className="text-button" href="/shop">
            View all products <ArrowRight size={16} />
          </Link>
        </div>
        <div className="retail-category-grid">
          {categories.map((category) => (
            <Link className="retail-category-card" key={category.slug} href={`/category/${category.slug}`}>
              <Image src={category.image} alt="" width={640} height={720} sizes="(max-width: 600px) 50vw, (max-width: 1120px) 33vw, 17vw" />
              <span>
                <strong>{category.name}</strong>
                <small>{category.note}</small>
              </span>
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </div>
      </section>

      <section className="product-section section-tint section-space">
        <div className="container">
          <div className="section-heading retail-heading">
            <div>
              <span className="eyebrow">Popular right now</span>
              <h2>Bestsellers</h2>
            </div>
            <Link className="text-button" href="/shop?collection=best-sellers">
              Shop bestsellers <ArrowRight size={16} />
            </Link>
          </div>
          <ProductGrid items={products.slice(0, 4)} />
        </div>
      </section>

      <section className="campaign-split container section-space">
        <div className="campaign-split-image">
          <Image src={products[1].image} alt={products[1].imageAlt} width={900} height={1000} sizes="(max-width: 900px) 100vw, 55vw" />
        </div>
        <div className="campaign-split-copy">
          <span className="eyebrow">Protective styling</span>
          <h2>
            Braiding hair from
            <br />
            <em>brands you trust.</em>
          </h2>
          <p>
            Find twists, braiding textures and extension options, then ask our
            team if you need help choosing colour or length.
          </p>
          <div className="campaign-actions">
            <Link className="button button-light" href="/collections/protective-styling">
              Shop protective styling <ArrowRight size={16} />
            </Link>
            <a className="text-button light-button" href="https://wa.me/447446841404" target="_blank" rel="noreferrer">
              Ask the team <MessageCircle size={15} />
            </a>
          </div>
        </div>
      </section>

      <section className="shop-needs section-space">
        <div className="container shop-needs-inner">
          <div>
            <span className="eyebrow">Shop by need</span>
            <h2>Find the right routine faster.</h2>
          </div>
          <div className="shop-needs-links">
            {shoppingNeeds.map(([label, query]) => (
              <Link href={`/search?q=${encodeURIComponent(query)}`} key={label}>
                {label}<ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-ribbon section-space">
        <div className="container">
          <div className="section-heading retail-heading">
            <div>
              <span className="eyebrow">Brand-led beauty</span>
              <h2>Names customers ask for</h2>
            </div>
            <Link className="text-button" href="/brands">
              Browse A–Z <ArrowRight size={16} />
            </Link>
          </div>
          <div className="brand-wordmark-grid">
            {featuredBrands.map((brand) => (
              <Link href={`/brands/${slugify(brand)}`} key={brand}>{brand}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="new-arrivals-section section-dark section-space">
        <div className="container">
          <div className="section-heading light retail-heading">
            <div>
              <span className="eyebrow">Just in</span>
              <h2>New arrivals</h2>
            </div>
            <Link className="text-button light-button" href="/shop?collection=new-arrivals">
              View new arrivals <ArrowRight size={16} />
            </Link>
          </div>
          <ProductGrid items={products.slice(4, 8)} />
        </div>
      </section>

      <section className="advice-section container section-space">
        <div className="section-heading retail-heading">
          <div>
            <span className="eyebrow">Beauty advice</span>
            <h2>Useful guidance, clearly written</h2>
          </div>
          <Link className="text-button" href="/blog">See all advice <ArrowRight size={16} /></Link>
        </div>
        <div className="advice-grid">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <Image src={post.image} alt="" width={720} height={460} sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
              <span className="eyebrow">{post.category} · {post.read}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="store-section store-section-clean container section-space">
        <div className="store-map-panel" aria-hidden="true">
          <span>A—G</span>
          <strong>ERITH</strong>
          <small>8 Cross Street · DA8 1RB</small>
        </div>
        <div className="store-copy">
          <span className="eyebrow">Visit A-Glory</span>
          <h2>
            Expert help,
            <br />
            <em>in store.</em>
          </h2>
          <p>
            Visit the team for product advice, current availability and help
            choosing the right shade, texture or routine.
          </p>
          <div className="address">
            <MapPin size={17} />
            <span><strong>A-Glory Hair and Cosmetics</strong>8 Cross Street, Erith<br />Kent DA8 1RB</span>
          </div>
          <div className="store-links">
            <a className="button button-outline" href="https://www.google.com/maps/search/?api=1&query=8+Cross+Street+Erith+Kent+DA8+1RB" target="_blank" rel="noreferrer">
              Get directions <ArrowUpRight size={15} />
            </a>
            <a href="tel:01322333305" className="text-button">Call 01322 333305</a>
          </div>
          <span className="hours">Mon–Sat 9am–7pm · Sun 11am–4pm</span>
        </div>
      </section>
    </>
  );
}
