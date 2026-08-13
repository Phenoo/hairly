export type ProductType = "Hair" | "Wigs" | "Skin" | "Makeup" | "Tools" | "Men";

export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  price: number;
  compareAt?: number;
  category: string;
  type: ProductType;
  image: string;
  imageAlt: string;
  rating: number;
  reviews: number;
  tag?: string;
  description: string;
  options?: string[];
  inventory: number;
  sku: string;
};

export const image = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const products: Product[] = [
  { id: "black-opal", slug: "black-opal-skin-perfecting-stick-foundation", brand: "Black Opal", name: "Skin Perfecting Stick Foundation", price: 22.99, category: "Makeup", type: "Makeup", image: image("photo-1596462502278-27bfdc403348"), imageAlt: "Black Opal makeup collection", rating: 4.5, reviews: 24, tag: "Shade range", inventory: 8, sku: "027811037926", description: "Maximum coverage with a soft matte finish, created for normal to dry skin and a broad spectrum of deeper tones.", options: ["Cool Nude", "Champagne Beige", "Cashew", "Kalahari Sand", "Heavenly Honey", "Rich Caramel", "Truly Topaz", "Warm Almond", "Nutmeg", "Amber", "Beautiful Bronze", "Hazelnut", "Toasted Chestnut", "Carob", "Sweet Espresso", "Suede Mocha", "Black Walnut", "Ebony Brown", "Au Chocolat", "Yes Honey", "Snatched Sepia"] },
  { id: "darling-empress", slug: "darling-empress-passion-twist", brand: "Darling", name: "Empress Passion Twist", price: 12.99, category: "Wigs & Extensions", type: "Wigs", image: image("photo-1522337360788-8b13dee7a37e"), imageAlt: "Textured hair styling", rating: 4.5, reviews: 18, tag: "Bestseller", inventory: 22, sku: "AG-DARLING-PT", description: "Pre-looped passion twist hair for a confident protective style with a soft, natural finish.", options: ["1B", "2", "4", "27", "30"] },
  { id: "virgin-fertilizer", slug: "virgin-hair-fertilizer", brand: "Virgin Hair Fertilizer", name: "Hair Fertilizer", price: 3.99, category: "Hair Care", type: "Hair", image: image("photo-1608248543803-ba4f8c70ae0b"), imageAlt: "Hair and body care products", rating: 4.5, reviews: 41, tag: "Everyday essential", inventory: 64, sku: "AG-VHF-001", description: "A classic scalp care essential for nourished roots and a healthy-looking hair routine." },
  { id: "feme-brazilian", slug: "feme-100-virgin-brazilian-straight", brand: "Feme", name: "100% Virgin Brazilian Straight", price: 44.99, compareAt: 54.99, category: "Wigs & Extensions", type: "Wigs", image: image("photo-1529139574466-a303027c1d8b"), imageAlt: "Editorial hair texture", rating: 4.8, reviews: 12, tag: "-18%", inventory: 5, sku: "AG-FEME-BRZ", description: "Versatile 100% virgin Brazilian hair with a silky straight texture and natural movement.", options: ["10 inch", "12 inch", "14 inch", "16 inch"] },
  { id: "soft-silky", slug: "soft-n-silky-afro-twist-braid", brand: "Soft N’ Silky", name: "Afro Natural Synthetic Afro Twist Braid", price: 5.99, category: "Wigs & Extensions", type: "Wigs", image: image("photo-1519699047748-de8e457a634e"), imageAlt: "Braided hair texture", rating: 4.6, reviews: 9, tag: "New", inventory: 31, sku: "AG-SNS-AFRO", description: "Lightweight synthetic twist braid with a generous, natural-looking afro texture.", options: ["1", "1B", "2", "30"] },
  { id: "dexe-serum", slug: "dexe-keratin-nutrient-hair-serum", brand: "DEXE", name: "Keratin Nutrient Hair Serum 80ml", price: 7.99, category: "Hair Care", type: "Hair", image: image("photo-1556229010-6c3f2c9ca5f8"), imageAlt: "Hair serum and skincare bottles", rating: 4.7, reviews: 16, tag: "Shine ritual", inventory: 13, sku: "AG-DEXE-SERUM", description: "A nourishing keratin serum for smoother lengths, polished shine, and a softer finish." },
  { id: "dexe-mask", slug: "dexe-organic-keratin-deep-treatment-mask", brand: "DEXE", name: "Organic Keratin Nutrient Deep Treatment Hair Mask", price: 10.99, category: "Hair Care", type: "Hair", image: image("photo-1608248543803-ba4f8c70ae0b"), imageAlt: "Deep treatment hair care", rating: 4.6, reviews: 14, tag: "Repair", inventory: 17, sku: "AG-DEXE-MASK", description: "A rich deep treatment for dry, tired strands that need softness and restorative care." },
  { id: "sheamoisture", slug: "shea-moisture-coconut-hibiscus-foam-body-wash", brand: "Shea Moisture", name: "Coconut & Hibiscus Foam Body Wash", price: 12.99, category: "Skin & Body", type: "Skin", image: image("photo-1556228720-195a672e8a03"), imageAlt: "Body wash and skincare products", rating: 4.7, reviews: 28, tag: "New arrival", inventory: 26, sku: "AG-SM-FOAM", description: "A creamy, fragrant body wash that leaves skin feeling soft, fresh, and beautifully cared for." },
  { id: "toppik", slug: "toppik-hair-perfecting-tool-kit", brand: "Toppik", name: "Hair Perfecting Tool Kit", price: 24.99, category: "Tools", type: "Tools", image: image("photo-1522335789203-aabd1fc54bc9"), imageAlt: "Beauty tools and accessories", rating: 4.5, reviews: 8, tag: "Just in", inventory: 7, sku: "AG-TOPPIK-KIT", description: "The finishing tools for a fuller-looking, more polished hair styling routine." },
  { id: "tree-hut", slug: "tree-hut-moroccan-rose-sugar-scrub", brand: "Tree Hut", name: "Moroccan Rose Shea Sugar Scrub", price: 12.99, category: "Skin & Body", type: "Skin", image: image("photo-1570194065650-d99fb4ee38df"), imageAlt: "Rose body scrub", rating: 4.9, reviews: 32, tag: "Top rated", inventory: 11, sku: "AG-TREEHUT-ROSE", description: "A softly scented sugar scrub to smooth, polish, and bring a little ritual to every shower." },
  { id: "bigen-men", slug: "bigen-men-speed-colour-real-black", brand: "Bigen", name: "Men Speed Colour Real Black", price: 8.99, category: "Men’s Grooming", type: "Men", image: image("photo-1621605815971-fbc98d665033"), imageAlt: "Men's grooming products", rating: 4.4, reviews: 7, tag: "Grooming", inventory: 18, sku: "AG-BIGEN-BLK", description: "A quick, dependable colour refresh for a considered grooming routine." },
];

export const categories = [
  { slug: "hair-care", name: "Hair care", note: "Rituals for every texture", image: image("photo-1522337360788-8b13dee7a37e") },
  { slug: "wigs-extensions", name: "Wigs & extensions", note: "Your next signature style", image: image("photo-1519699047748-de8e457a634e") },
  { slug: "skin-body", name: "Skin & body", note: "Glow from the neck down", image: image("photo-1556229010-6c3f2c9ca5f8") },
  { slug: "makeup", name: "Makeup", note: "Colour with intention", image: image("photo-1596462502278-27bfdc403348") },
  { slug: "mens-grooming", name: "Men’s grooming", note: "The daily edit", image: image("photo-1621605815971-fbc98d665033") },
  { slug: "tools-accessories", name: "Tools & accessories", note: "Finish the look", image: image("photo-1522335789203-aabd1fc54bc9") },
];

export const brands = ["Sensationnel", "Shea Moisture", "ORS", "Ebin New York", "Palmer’s", "Sleek Makeup", "Cantu", "Freetress Equal"];

export const blogPosts = [
  { slug: "protective-style-that-feels-like-you", category: "Hair", read: "5 min read", title: "How to choose a protective style that feels like you", excerpt: "A practical guide to texture, tension and finding a look you can live in.", image: image("photo-1522337360788-8b13dee7a37e") },
  { slug: "soft-skin-ritual-decoded", category: "Skin", read: "6 min read", title: "The soft-skin ritual, decoded", excerpt: "How to build a body-care routine that feels like a moment, not a chore.", image: image("photo-1570194065650-d99fb4ee38df") },
  { slug: "finding-your-undertone", category: "Beauty", read: "4 min read", title: "Finding your undertone with confidence", excerpt: "The simple shade cues that make your next complexion match feel easier.", image: image("photo-1596462502278-27bfdc403348") },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
export const money = (amount: number) => `£${amount.toFixed(2)}`;
