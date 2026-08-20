import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  PackageCheck,
  Sparkles,
  Store,
} from "lucide-react";
import { blogPosts, categories, image, slugify } from "@/lib/store-data";
import { ProductGrid } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog";
import { SkeletonImage } from "@/components/ui/skeleton-image";
import Image from "next/image";

const routineCategories = [
  {
    title: "Scalp & Follicle Therapy",
    tag: "Growth & Scalp",
    description: "Soothe itch, clarify buildup, and nourish follicles for stronger, resilient hair.",
    image: image("photo-1608248543803-ba4f8c70ae0b", 600),
    imageAlt: "Scalp and root care oils and treatments",
    pills: ["Scalp Oils", "Rosemary & Mint", "Clarifying Rinses"],
    href: "/shop?q=scalp",
  },
  {
    title: "Deep Moisture & Curls",
    tag: "3A–4C Texture",
    description: "Rich leave-ins, curl smoothies, and restorative masques that seal in all-day moisture.",
    image: image("photo-1522337360788-8b13dee7a37e", 600),
    imageAlt: "Curl defining and moisture care",
    pills: ["Curl Creams", "Shea Butter", "Deep Masques"],
    href: "/shop?q=moisture",
  },
  {
    title: "Protective Styling Rituals",
    tag: "Braids & Twists",
    description: "Pre-stretched braiding hair, braid sheens, and firm edge control for lasting styles.",
    image: image("photo-1519699047748-de8e457a634e", 600),
    imageAlt: "Braiding hair and protective styling",
    pills: ["X-Pression", "Edge Tamer", "Braid Sprays"],
    href: "/collections/protective-styling",
  },
  {
    title: "Lace Melt & Wig Care",
    tag: "Wigs & Weaves",
    description: "Invisible melting sprays, tint mousses, wax sticks, and synthetic/human hair care.",
    image: image("photo-1529139574466-a303027c1d8b", 600),
    imageAlt: "Lace melt and wig styling essentials",
    pills: ["Ghost Bond", "Lace Tint", "Wax Sticks"],
    href: "/category/wigs-extensions",
  },
  {
    title: "Complexion & Base Matching",
    tag: "Flawless Base",
    description: "Maximum coverage stick foundations, setting powders, and primers for deep tones.",
    image: image("photo-1596462502278-27bfdc403348", 600),
    imageAlt: "Black Opal foundation and complexion makeup",
    pills: ["Stick Foundation", "Setting Powder", "Primers"],
    href: "/category/makeup",
  },
  {
    title: "Body Polish & All-Day Glow",
    tag: "Skin Barrier",
    description: "Exfoliating sugar scrubs, whipped cocoa butters, and replenishing body oils.",
    image: image("photo-1570194065650-d99fb4ee38df", 600),
    imageAlt: "Body care and exfoliating scrubs",
    pills: ["Sugar Scrubs", "Cocoa Butter", "Body Oils"],
    href: "/category/skin-body",
  },
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

export default async function HomePage() {
  const products = await getCatalogProducts({ first: 8 });
  const heroProducts = products.slice(0, 3);
  const campaignProduct = products[1] || products[0];
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
              advice from the Aglory store team.
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
            {heroProducts.map((product, index) => (
              <Link
                className={`retail-hero-product retail-hero-product-${index}`}
                href={`/products/${product.slug}`}
                key={product.id}
              >
                <SkeletonImage
                  src={product.image}
                  alt={product.imageAlt}
                  width={720}
                  height={900}
                  sizes="(max-width: 900px) 60vw, 32vw"
                  preload={index === 0}
                  containerClassName="w-full h-full"
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

      <section className="trust-strip" aria-label="Aglory service information">
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
              <SkeletonImage
                src={category.image}
                alt={category.name}
                width={640}
                height={720}
                sizes="(max-width: 600px) 50vw, (max-width: 1120px) 33vw, 17vw"
                containerClassName="col-span-full aspect-[0.86] w-full"
              />
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

      {campaignProduct && <section className="campaign-split container section-space">
        <div className="campaign-split-image">
          <SkeletonImage
            src={campaignProduct.image}
            alt={campaignProduct.imageAlt}
            width={900}
            height={1000}
            sizes="(max-width: 900px) 100vw, 55vw"
            containerClassName="w-full h-full min-h-[530px]"
          />
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
              Explore protective styles <ArrowRight size={16} />
            </Link>
            <Link className="text-button light-button" href="/category/hair-care">
              Hair care essentials <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>}

      <section className="routine-hub section-space bg-gradient-to-b from-[#faf9fc] via-white to-[#faf9fc] border-y border-[#ede9f2]">
        <div className="container">
          <div className="section-heading retail-heading">
            <div>
              <span className="eyebrow flex items-center gap-1.5 text-[#9f70a5]">
                <Sparkles size={14} className="text-[#b4865c]" />
                Targeted beauty rituals
              </span>
              <h2>
                Find what you need <em>by routine.</em>
              </h2>
            </div>
            <Link className="text-button" href="/shop">
              Explore all routines <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mt-8">
            {routineCategories.map((routine) => (
              <Link
                key={routine.title}
                href={routine.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dedfe8]/90 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0d125d] hover:shadow-xl"
              >
                {/* Image & Badge Area */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <SkeletonImage
                    src={routine.image}
                    alt={routine.imageAlt}
                    width={640}
                    height={400}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                  <span className="absolute left-3.5 top-3.5 z-10 rounded-full bg-[#0d125d]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs shadow-xs">
                    {routine.tag}
                  </span>
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0d125d] transition-colors group-hover:text-[#9f70a5]">
                      {routine.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {routine.description}
                    </p>

                    {/* Quick Tags / Chips */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {routine.pills.map((pill) => (
                        <span
                          key={pill}
                          className="rounded-md border border-[#e5e3eb] bg-[#f8f7fa] px-2 py-0.5 text-[11px] font-medium text-slate-700 transition-colors group-hover:border-[#d7d2e0] group-hover:bg-[#f2eff7]"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Link */}
                  <div className="mt-5 flex items-center justify-between border-t border-[#f0edf5] pt-3.5 text-xs font-bold text-[#0d125d] transition-colors group-hover:text-[#9f70a5]">
                    <span>Shop this routine</span>
                    <span className="flex size-7 items-center justify-center rounded-full bg-[#f8f7fa] text-[#0d125d] transition-all group-hover:bg-[#0d125d] group-hover:text-white group-hover:translate-x-0.5">
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="product-section section-space">
        <div className="container">
          <div className="section-heading retail-heading">
            <div>
              <span className="eyebrow">More in store</span>
              <h2>Featured essentials</h2>
            </div>
            <Link className="text-button" href="/shop">
              View all products <ArrowRight size={16} />
            </Link>
          </div>
          <ProductGrid items={products.slice(4, 8)} />
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
              <SkeletonImage
                src={post.image}
                alt={post.title}
                width={720}
                height={460}
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                containerClassName="w-full aspect-[720/460]"
              />
              <span className="eyebrow">{post.category} · {post.read}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="store-section store-section-clean container section-space">
        <div className="store-map-panel" aria-label="Aglory Hair and Cosmetics Erith store emblem">
          <div className="relative size-48 sm:size-56 md:size-64 drop-shadow-2xl transition-transform duration-500 hover:scale-105">
            <Image
              src="/logo-icon.png"
              alt="Aglory Hair and Cosmetics Erith store emblem"
              width={320}
              height={320}
              className="h-full w-full object-contain"
            />
          </div>
          <small>8 Cross Street · DA8 1RB</small>
        </div>
        <div className="store-copy">
          <span className="eyebrow">Visit Aglory</span>
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
            <span><strong>Aglory Hair and Cosmetics</strong>8 Cross Street, Erith<br />Kent DA8 1RB</span>
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
