"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Check,
  Copy,
  Sparkles,
  User,
  Search,
  MessageCircle,
  ChevronRight,
  BookOpen,
  Heart,
  Tag,
  CheckCircle2,
} from "lucide-react";
import { blogPosts, products, getProduct, image, Product, money } from "@/lib/store-data";
import { ProductCard } from "@/components/product-card";

// Expanded Blog Data with rich content for each article
export interface DetailedBlogPost {
  slug: string;
  category: string;
  read: string;
  title: string;
  subtitle: string;
  excerpt: string;
  image: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  tableOfContents: { id: string; label: string }[];
  sections: {
    id: string;
    title: string;
    content: string[];
    stylistTip?: string;
    quote?: string;
    bullets?: string[];
  }[];
  recommendedProductIds: string[];
}

export const blogDetails: Record<string, DetailedBlogPost> = {
  "protective-style-that-feels-like-you": {
    slug: "protective-style-that-feels-like-you",
    category: "Hair Care",
    read: "5 min read",
    title: "How to choose a protective style that feels like you",
    subtitle: "A practical guide to texture matching, scalp tension management, and nighttime silk rituals.",
    excerpt: "A practical guide to texture, tension and finding a look you can live in without sacrificing scalp health.",
    image: image("photo-1522337360788-8b13dee7a37e", 1200),
    date: "August 12, 2026",
    author: {
      name: "Kemi Adebayo",
      role: "Master Stylist & Aglory Texture Lead",
      avatar: "K",
      bio: "Over 12 years of experience in protective styling, knotless braiding, and natural coil preservation across Kent and London.",
    },
    tableOfContents: [
      { id: "understanding-scalp-tension", label: "1. Scalp & Tension Management" },
      { id: "choosing-your-texture", label: "2. Choosing Synthetic vs Human Fibre" },
      { id: "pre-install-hydrate", label: "3. Pre-Install Hydration Ritual" },
      { id: "nighttime-silk-care", label: "4. Nighttime Maintenance & Edges" },
    ],
    sections: [
      {
        id: "understanding-scalp-tension",
        title: "1. Understanding Scalp & Tension Limits",
        content: [
          "Protective styling should give your natural hair a rest — not cause tension bumps or fragile hairline stress. Before booking your next braid appointment, inspect your hairline and scalp porosity.",
          "If you notice tightness around your temples or nape within 24 hours of installation, that is a signal to ask your stylist to reduce tension on the perimeter rows.",
        ],
        stylistTip: "Stylist Advice: Never suffer through tight braids! Apply a few drops of lightweight tea tree or peppermint scalp oil immediately to soothe tension follicles.",
      },
      {
        id: "choosing-your-texture",
        title: "2. Choosing the Right Texture: Synthetic, Human, or Passion Twists",
        content: [
          "Not all braiding hair behaves the same. Passion twists and passion locs require pre-twisted soft synthetic fibers with low luster to blend seamlessly with 3C-4C coils.",
          "For knotless box braids, pre-stretched kanekalon hair with anti-bacterial coating prevents itchiness and scalp inflammation during long wears.",
        ],
        quote: "The right protective style feels like natural support — not a daily struggle to maintain.",
      },
      {
        id: "pre-install-hydrate",
        title: "3. The Mandatory Pre-Install Hydration Ritual",
        content: [
          "Never tuck dry, unconditioned hair into braids or extensions. A deep moisturizing masque followed by a leave-in conditioner ensures your natural strands remain lubricated for 4 to 6 weeks.",
        ],
        bullets: [
          "Clarify scalp with a sulfate-free cleansing shampoo.",
          "Apply deep treatment masque for 20 minutes under mild heat.",
          "Seal moisture with a lightweight jojoba or argan oil before blow drying.",
        ],
      },
      {
        id: "nighttime-silk-care",
        title: "4. Nighttime Maintenance & Keeping Edges Smooth",
        content: [
          "Cotton pillowcases absorb natural oils from your braids while creating friction that frizzles the hair shaft. Switch to a 100% Mulberry silk bonnet or satin pillowcase.",
          "Slick your edges using a flake-free edge gel enriched with castor oil to nourish baby hairs overnight.",
        ],
      },
    ],
    recommendedProductIds: ["darling-empress", "virgin-fertilizer", "ebin-wonder-lace-bond"],
  },

  "soft-skin-ritual-decoded": {
    slug: "soft-skin-ritual-decoded",
    category: "Skincare",
    read: "6 min read",
    title: "The soft-skin ritual, decoded",
    subtitle: "How to build a body-care routine that feels like a moment of self-care, not a chore.",
    excerpt: "How to build a body-care routine that feels like a moment, not a chore — focusing on barrier hydration.",
    image: image("photo-1570194065650-d99fb4ee38df", 1200),
    date: "August 8, 2026",
    author: {
      name: "Elena Rostova",
      role: "Skincare & Barrier Care Specialist",
      avatar: "E",
      bio: "Dedicated to melanin-rich skin health, hyperpigmentation recovery, and velvety body care formulations.",
    },
    tableOfContents: [
      { id: "layering-oils-and-butters", label: "1. Layering Body Oils & Butters" },
      { id: "gentle-exfoliation", label: "2. Exfoliation Without Stripping" },
      { id: "locking-post-shower-moisture", label: "3. The 3-Minute Post-Shower Moisture Lock" },
    ],
    sections: [
      {
        id: "layering-oils-and-butters",
        title: "1. Layering Body Oils & Butters",
        content: [
          "True skin softness is achieved through emulsion — pairing water-based hydrating lotions with lipid-rich botanical oils like cocoa butter and rosehip.",
          "Apply your lotion first while skin is damp, then layer an oil over top to create an occlusive shield that prevents transepidermal water loss.",
        ],
        stylistTip: "Barrier Secret: Concentrate raw shea butter or cocoa oil on elbows, knees, and ankles right before slipping into bedtime socks or pyjamas.",
      },
      {
        id: "gentle-exfoliation",
        title: "2. Exfoliation Without Stripping Moisture",
        content: [
          "Avoid harsh abrasive scrubs that leave micro-tears on sensitive skin. Instead, opt for gentle chemical exfoliants like lactic acid or natural sugar polishes twice per week.",
        ],
        quote: "Soft skin is healthy skin. Focus on soothing hydration rather than aggressive scrubbing.",
      },
      {
        id: "locking-post-shower-moisture",
        title: "3. The 3-Minute Post-Shower Moisture Lock",
        content: [
          "Don't pat your skin completely dry with a towel after showering. Leaving a light film of water on your body helps humectant ingredients draw moisture directly into the stratum corneum.",
        ],
        bullets: [
          "Shower in warm (not scalding hot) water to preserve natural skin lipids.",
          "Apply body oil within 180 seconds of stepping out of the shower.",
          "Use fragrance-free formula on sensitive body zones.",
        ],
      },
    ],
    recommendedProductIds: ["palmers-cocoa-butter-body-oil", "dexe-mask"],
  },

  "finding-your-undertone": {
    slug: "finding-your-undertone",
    category: "Beauty",
    read: "4 min read",
    title: "Finding your undertone with confidence",
    subtitle: "The simple shade cues and lighting checks that make your next complexion match feel effortless.",
    excerpt: "The simple shade cues that make your next complexion match feel easier and eliminate ashy cast.",
    image: image("photo-1596462502278-27bfdc403348", 1200),
    date: "July 29, 2026",
    author: {
      name: "Maya Chen",
      role: "Complexion & Color Match Specialist",
      avatar: "M",
      bio: "Expert in shade matching across rich olive, golden, warm mahogany, and cool neutral skin tones.",
    },
    tableOfContents: [
      { id: "cool-warm-neutral-tests", label: "1. Cool, Warm, or Neutral Tests" },
      { id: "lighting-swatches", label: "2. Testing Swatches in Natural Light" },
      { id: "preventing-ashy-casts", label: "3. Preventing Ashy & Gray Casts" },
    ],
    sections: [
      {
        id: "cool-warm-neutral-tests",
        title: "1. Cool, Warm, or Neutral: The Modern Undertone Test",
        content: [
          "Understanding your undertone is the key to foundation sticks that disappear seamlessly into your jawline. Surface skin tone changes with sun exposure, but your undertone stays constant.",
          "Check your inner wrist under daylight: greenish veins indicate warm/golden undertones; blue or purple veins indicate cool undertones; a blend of both points to neutral.",
        ],
        stylistTip: "Shade Matching Rule: Always swatch three shades along your jawline down toward your collarbone — never on the back of your hand!",
      },
      {
        id: "lighting-swatches",
        title: "2. Testing Swatches in Natural Light",
        content: [
          "Retail store lighting often casts yellow or fluorescent tones that distort shade accuracy. Step near a natural window or outdoors to observe how the pigment settles after 5 minutes of oxidation.",
        ],
        quote: "Your foundation should enhance your natural complexion, not mask it.",
      },
      {
        id: "preventing-ashy-casts",
        title: "3. Preventing Ashy & Gray Casts",
        content: [
          "If your foundation appears gray or chalky after application, the shade contains too much cool pink or blue base for your golden/red undertones.",
        ],
        bullets: [
          "Select stick foundations with rich yellow or warm red pigments for melanin tones.",
          "Use a warm-toned setting powder to lock in complexion vibrancy.",
          "Hydrate with a dewy primer before applying full-coverage foundation.",
        ],
      },
    ],
    recommendedProductIds: ["black-opal-skin-perfecting-stick-foundation"],
  },
};

// --- BLOG INDEX COMPONENT ---
export function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});

  const categoriesList = ["All", "Hair Care", "Skincare", "Beauty"];

  const featuredPost = blogDetails["protective-style-that-feels-like-you"];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCat =
        activeCategory === "All" ||
        post.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        (activeCategory === "Hair Care" && post.category === "Hair") ||
        (activeCategory === "Skincare" && post.category === "Skin");

      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleBookmark = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedPosts((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <div className="bg-slate-50/60 pb-20">
      {/* Blog Hero & Header */}
      <section className="bg-[#0d2d4b] text-white pt-12 pb-16 lg:pt-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b4865c_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#b4865c] bg-[#b4865c]/10 px-3.5 py-1.5 rounded-full border border-[#b4865c]/20 mb-4">
              <Sparkles size={13} className="text-[#b4865c]" />
              The Aglory Beauty Journal
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-4">
              Beauty wisdom,
              <br />
              <em className="italic text-[#b4865c]">crafted for your ritual.</em>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
              Thoughtful, expert-led guidance for protective styling, wash day care, melanin skin barrier rituals, and shade confidence.
            </p>
          </div>

          {/* Featured Article Banner */}
          {featuredPost && (
            <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-white/30 transition-all duration-300">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span className="px-3 py-1 rounded-full bg-[#b4865c] text-white font-semibold">
                    Featured Story
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> {featuredPost.read}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} /> {featuredPost.date}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-tight">
                  <Link href={`/blog/${featuredPost.slug}`} className="hover:text-[#b4865c] transition-colors">
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base line-clamp-2">
                  {featuredPost.subtitle}
                </p>

                <div className="pt-2 flex items-center gap-4">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0d2d4b] text-xs sm:text-sm font-semibold hover:bg-[#b4865c] hover:text-white transition-all duration-200 shadow-sm"
                  >
                    Read Full Story <ArrowRight size={15} />
                  </Link>

                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-7 h-7 rounded-full bg-[#b4865c] text-white font-serif flex items-center justify-center font-bold">
                      {featuredPost.author.avatar}
                    </div>
                    <span>By {featuredPost.author.name}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Link href={`/blog/${featuredPost.slug}`} className="block overflow-hidden rounded-2xl border border-white/10 group">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Filter Toolbar & Search */}
      <div className="container mx-auto px-4 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#0d2d4b] text-white shadow-sm"
                    : "bg-slate-100 text-[#12395b] hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search beauty guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-[#12395b] outline-none focus:bg-white focus:border-[#b4865c]"
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <section className="container mx-auto px-4 lg:px-8 mt-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-2xl p-8">
            <BookOpen size={36} className="text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-semibold text-[#12395b] mb-1">No articles found</h3>
            <p className="text-xs text-slate-500 mb-4">Try searching for another topic or clear your filters.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-full bg-[#0d2d4b] text-white text-xs font-medium"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const details = blogDetails[post.slug];
              const isSaved = !!savedPosts[post.slug];
              return (
                <article
                  key={post.slug}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div>
                    {/* Image */}
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-[#0d2d4b]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <button
                        onClick={(e) => toggleBookmark(post.slug, e)}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition ${
                          isSaved ? "text-rose-500" : "text-slate-600 hover:text-rose-500"
                        }`}
                        title={isSaved ? "Saved" : "Save article"}
                      >
                        <Heart size={15} className={isSaved ? "fill-current" : ""} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.read}
                        </span>
                        {details?.date && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} /> {details.date}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#12395b] group-hover:text-[#b4865c] transition-colors leading-snug mb-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-auto">
                    {details?.author ? (
                      <div className="flex items-center gap-2 pt-4">
                        <div className="w-6 h-6 rounded-full bg-[#0d2d4b] text-white font-serif flex items-center justify-center text-[10px] font-bold">
                          {details.author.avatar}
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{details.author.name}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 pt-4">Aglory Editorial</span>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#b4865c] hover:text-[#0d2d4b] pt-4 transition-colors"
                    >
                      Read Guide <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* WhatsApp Help Banner */}
      <section className="container mx-auto px-4 lg:px-8 mt-16">
        <div className="bg-gradient-to-br from-[#0d2d4b] to-[#12395b] text-white rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#b4865c] flex items-center gap-1.5 mb-2">
              <MessageCircle size={15} /> Personal Advice from Erith
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-tight mb-3">
              Need personalized hair or skin recommendations?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Chat directly with our Kent beauty specialists on WhatsApp for shade matching, wig care guidance, or texture advice.
            </p>
          </div>

          <a
            href="https://wa.me/4407446841404"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-full bg-[#b4865c] text-white font-semibold text-sm hover:bg-[#a2744c] transition shadow-md flex items-center gap-2 shrink-0"
          >
            Chat with an Expert <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}

// --- INDIVIDUAL BLOG ARTICLE COMPONENT ---
export function BlogArticle({ slug }: { slug: string }) {
  const details = blogDetails[slug] || blogDetails["protective-style-that-feels-like-you"];
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Recommended Products fetched dynamically
  const recommendedProducts = useMemo(() => {
    return details.recommendedProductIds
      .map((id) => products.find((p) => p.id === id || p.slug === id))
      .filter((p): p is Product => p !== undefined);
  }, [details]);

  // Related posts (excluding current)
  const relatedPosts = useMemo(() => {
    return blogPosts.filter((p) => p.slug !== slug).slice(0, 2);
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <article className="bg-slate-50/50 pb-24">
      {/* Article Header & Hero */}
      <header className="bg-gradient-to-b from-[#0d2d4b] via-[#0d2d4b] to-[#12395b] text-white pt-10 pb-16 lg:pt-14 lg:pb-20 relative">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={12} className="text-slate-400" />
            <Link href="/blog" className="hover:text-white transition">Journal</Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-[#b4865c] font-semibold truncate">{details.category}</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
            <span className="px-3.5 py-1 rounded-full bg-[#b4865c] text-white font-bold tracking-wide uppercase text-[10px]">
              {details.category}
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock size={13} /> {details.read}
            </span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Calendar size={13} /> {details.date}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-4">
            {details.title}
          </h1>

          <p className="text-slate-200 text-base sm:text-xl font-normal leading-relaxed mb-8 max-w-3xl">
            {details.subtitle}
          </p>

          {/* Author & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#b4865c] text-white font-serif flex items-center justify-center font-bold text-lg shadow-md border-2 border-white/20">
                {details.author.avatar}
              </div>
              <div>
                <strong className="block text-sm font-semibold text-white">{details.author.name}</strong>
                <span className="text-xs text-slate-300">{details.author.role}</span>
              </div>
            </div>

            {/* Share & Bookmark buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2.5 rounded-full border transition cursor-pointer ${
                  isBookmarked
                    ? "bg-rose-500 text-white border-rose-500"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }`}
                title={isBookmarked ? "Saved to reading list" : "Save article"}
              >
                <Heart size={16} className={isBookmarked ? "fill-current" : ""} />
              </button>

              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Share Guide</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Image Frame */}
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl -mt-10 relative z-20">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
          <img
            src={details.image}
            alt={details.title}
            className="w-full h-80 sm:h-[450px] object-cover"
          />
        </div>
      </div>

      {/* Content Body Grid with Sidebar */}
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Table of Contents */}
        <aside className="lg:col-span-4 space-y-6 order-2 lg:order-1">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sticky top-24 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#12395b] mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-[#b4865c]" />
              In this Guide
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {details.tableOfContents.map((toc) => (
                <li key={toc.id}>
                  <a
                    href={`#${toc.id}`}
                    className="text-slate-600 hover:text-[#b4865c] font-medium transition flex items-center gap-1.5"
                  >
                    <ChevronRight size={13} className="text-[#b4865c]" />
                    {toc.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                Have a question?
              </span>
              <p className="text-xs text-slate-600 mb-3">
                Ask our Erith beauty team on WhatsApp for product advice.
              </p>
              <a
                href="https://wa.me/4407446841404"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full bg-[#0d2d4b] text-white text-xs font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2"
              >
                <MessageCircle size={14} /> Ask Stylist
              </a>
            </div>
          </div>
        </aside>

        {/* Main Editorial Text */}
        <main className="lg:col-span-8 space-y-10 order-1 lg:order-2">
          {/* Excerpt Lead */}
          <div className="bg-white border-l-4 border-[#b4865c] p-6 rounded-r-2xl shadow-sm text-slate-700 text-base sm:text-lg leading-relaxed font-serif italic">
            “{details.excerpt} Beauty is deeply personal, so the best ritual is always the one tailored to your texture, lifestyle, and confidence.”
          </div>

          {/* Dynamic Article Sections */}
          {details.sections.map((sec) => (
            <section id={sec.id} key={sec.id} className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#12395b] leading-tight pt-2 border-b border-slate-200/80 pb-3">
                {sec.title}
              </h2>

              {sec.content.map((pText, idx) => (
                <p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {pText}
                </p>
              ))}

              {/* Stylist Tip Box */}
              {sec.stylistTip && (
                <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 flex items-start gap-3 text-xs sm:text-sm text-amber-900 shadow-sm">
                  <Sparkles size={20} className="text-[#b4865c] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold block text-[#12395b] mb-0.5">Aglory Pro Tip</strong>
                    <span>{sec.stylistTip}</span>
                  </div>
                </div>
              )}

              {/* Pull Quote */}
              {sec.quote && (
                <blockquote className="my-6 p-6 bg-[#0d2d4b] text-white rounded-2xl text-lg sm:text-xl font-serif italic text-center shadow-md">
                  “{sec.quote}”
                </blockquote>
              )}

              {/* Checklist / Bullets */}
              {sec.bullets && (
                <ul className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 text-xs sm:text-sm text-slate-700">
                  {sec.bullets.map((bItem, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bItem}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Recommended Products Carousel / Grid */}
          {recommendedProducts.length > 0 && (
            <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm mt-12">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#b4865c] flex items-center gap-1.5 mb-1">
                  <Tag size={13} /> Recommended Essentials
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#12395b]">
                  Products Mentioned in This Guide
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedProducts.map((prod) => (
                  <div key={prod.id} className="border border-slate-200 rounded-2xl p-4 flex gap-4 items-center bg-slate-50/50 hover:bg-white transition">
                    <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded-xl border shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase text-[#b4865c]">{prod.brand}</span>
                      <strong className="block text-xs font-bold text-[#12395b] truncate">{prod.name}</strong>
                      <span className="text-xs font-semibold text-slate-700">{money(prod.price)}</span>
                    </div>
                    <Link
                      href={`/products/${prod.slug}`}
                      className="px-3 py-1.5 rounded-full bg-[#0d2d4b] text-white text-[11px] font-semibold hover:bg-[#b4865c] shrink-0 transition"
                    >
                      Shop
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Author Bio Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0d2d4b] to-[#1e527d] text-white font-serif flex items-center justify-center font-bold text-2xl shrink-0 shadow-md">
              {details.author.avatar}
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#b4865c]">Written By Specialist</span>
              <h4 className="font-serif text-lg font-bold text-[#12395b] mb-1">{details.author.name}</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">{details.author.bio}</p>
              <span className="text-[11px] font-medium text-slate-400">{details.author.role}</span>
            </div>
          </div>

          {/* Related Stories Navigation */}
          {relatedPosts.length > 0 && (
            <div className="pt-8 border-t border-slate-200">
              <h3 className="font-serif text-xl font-bold text-[#12395b] mb-4">Read Next</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.slug}
                    href={`/blog/${rPost.slug}`}
                    className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-3 items-center hover:shadow-md transition group"
                  >
                    <img src={rPost.image} alt={rPost.title} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#b4865c]">{rPost.category}</span>
                      <strong className="block text-xs font-bold text-[#12395b] group-hover:text-[#b4865c] transition-colors truncate">
                        {rPost.title}
                      </strong>
                      <span className="text-[11px] text-slate-400">{rPost.read}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </article>
  );
}
