# A-Glory Hair & Cosmetics — Ecommerce UX, Competitor Analysis & Redesign Brief

Audit date: 18 August 2026  
Scope: live A-Glory prototype, local Next.js codebase, Paks, Beautizone UK and TJ Beauty Products UK. The live competitor review covers public pages and accessible interactions. Beautizone blocked direct browser access with Cloudflare, so its findings are based on its currently indexed homepage, collection, brand, product, delivery and returns pages; those findings are marked accordingly.

## Part 1 — Executive summary

The current site has a promising visual foundation: restrained typography, modest corner radii, clear local-store contact details and a more premium tone than many category competitors. The problem is not that it lacks design. The problem is that it presents a prototype as if it were a working retailer: the catalogue contains only 11 local sample products, search is isolated on a separate page, navigation is shallow, product images are generic Unsplash photographs, reviews and customer names are fabricated, and authentication, checkout, order tracking, contact and newsletter actions are simulations.

The redesign should keep the editorial discipline and rebuild the commerce layer around real inventory, real variants, real fulfilment rules and faster routes to known products. A-Glory should feel more considered than Paks, as navigable as TJ Beauty, as visually product-led as Beautizone, and more trustworthy than all three because local expertise and operational facts are visible at the point of decision.

### The 10 biggest changes

| # | Change | Customer problem solved | Business outcome | Priority |
|---|---|---|---|---|
| 1 | Connect a real commerce backend and production checkout; remove every demo state and false payment control. | Customers cannot actually complete a trustworthy purchase or retrieve an order. | Revenue capture, accurate stock, fewer support contacts and a launchable store. | P0 |
| 2 | Replace all sample products, ratings, testimonials, brand favicons and generic photography with authorised catalogue and store data. | Shoppers cannot tell what is genuinely sold, reviewed or stocked. | Trust, legal/brand safety, lower product mismatch and stronger conversion. | P0 |
| 3 | Make search a visible desktop field and persistent mobile action with predictive products, brands, categories and typo tolerance. | A customer who knows “Cantu conditioner” or “X-Pression 1B” has to browse or visit a separate search page. | Faster product finding, higher search conversion and fewer zero-result sessions. | P0 |
| 4 | Replace the single shallow “Categories” menu with a catalogue-backed mega menu and a drill-down mobile menu. | Hair care, braids, wigs, colour, kids and men are too broad or missing as distinct routes. | Better catalogue penetration, lower bounce and scalable merchandising. | P0 |
| 5 | Build true collection pages with breadcrumbs, subcategory shortcuts, relevant filters, product counts, crawlable pagination and preserved state. | Current collection pages are essentially a small product grid with generic filters. | Higher findability, SEO coverage and conversion in large categories. | P0 |
| 6 | Rebuild product data and PDPs around variants, shade/colour imagery, gallery, delivery eligibility, ingredients, suitability and real reviews. | A single lifestyle image and text button cannot support shade, length, pack or formula decisions. | Fewer returns, higher add-to-basket rate and greater confidence. | P0 |
| 7 | Correct the brand system to the official navy #0D125D and mauve #9F70A5, using derived tints and real product colour rather than the prototype gold/blue palette. | The current site is elegant but not unmistakably A-Glory and is too white. | Stronger brand recognition without sacrificing retail clarity. | P1 |
| 8 | Reorder and shorten the homepage around category entry, bestsellers, protective styling, concerns, brands and local trust. | The current long editorial sequence delays products and repeats decorative marquees. | More product views per session and a more commercial first impression. | P1 |
| 9 | Put verified delivery, Click & Collect, returns and Erith-store help beside product and basket decisions. | Generic trust icons do not answer “when, where, how much, and can I return it?” | Reduced checkout anxiety, local sales and lower service demand. | P0 |
| 10 | Add ecommerce measurement and performance budgets before advanced personalisation. | There is no evidence loop for search quality, funnel abandonment or Core Web Vitals. | Prioritised optimisation, lower acquisition waste and controlled technical debt. | P1 |

### Strategic position

A-Glory should own this position: **expert multicultural beauty, carefully presented, easy to buy online, backed by a real Erith team**. It should not compete with Paks on visible catalogue density, with TJ Beauty on promotional volume, or with Beautizone on repeated sale labels. It should compete on clarity, curation, authenticity and confidence while still exposing enough product depth for brand-led and task-led shoppers.

## Part 2 — Current-site audit

### What works and should remain

| Area | Evidence | Why it is strong | Keep / evolve |
|---|---|---|---|
| Overall tone | Playfair Display is paired with local Satoshi; spacing is calm and radii are restrained. | It already avoids the rounded-card/SaaS look in the brief. | Keep the typography roles and editorial restraint; reduce oversized headings on utility pages. |
| Local identity | Phone, WhatsApp, Erith address, opening hours, store section and Click & Collect language appear across the site. | A real shop is A-Glory’s clearest advantage over an anonymous catalogue. | Keep, but verify all contact details and move operational facts closer to PDP/cart. |
| Header clarity | Account, wishlist and bag are recognisable; mobile gives search, wishlist and bag direct access. | Core tools are visible and icon buttons are labelled for assistive technology. | Keep the actions; replace desktop “Search” link with a full field. |
| Product-card restraint | Brand, name, price, sale price, wishlist and add/choose action are visually ordered. | It is less noisy than Paks and more premium than a default Shopify grid. | Keep the hierarchy; replace generic badges/stock text and add real variant cues. |
| PDP purchase priority | Title, price, option, quantity and add-to-bag precede education; a mobile sticky CTA exists in code. | The purchase decision is not buried under editorial content. | Keep the order; add gallery, variant data, fulfilment, reviews and complementary products. |
| Search concept | Local code supports recent/popular searches plus product, category and brand matches. | The conceptual model is correct for beauty retail. | Keep the grouped result model; move it into a global predictive search service. |
| Accessibility basics | Focus-visible styling, semantic buttons/links, labelled wishlist actions, form labels and an aria-modal mobile menu are present. | There is a better semantic baseline than many competitor themes. | Keep and complete keyboard focus management, contrast and status announcements. |
| Visual discipline | Mostly square/low-radius surfaces, subtle borders and limited animation. | This aligns directly with the anti-AI-template requirement. | Keep. Do not replace it with bento layouts, glass effects or pill-heavy UI. |

### What does not work

| Finding | Evidence | Customer risk | Required response |
|---|---|---|---|
| The store is a prototype, not a commerce implementation. | Products are a local array in lib/store-data.ts; cart/wishlist/recent search use localStorage; authentication, contact, tracking and checkout return simulated success states. | Lost orders, false expectations and no cross-device continuity. | P0: integrate the chosen commerce, identity, payment, fulfilment and messaging systems before launch. |
| Fabricated social proof is published. | app/page.tsx hard-codes Sarah Johnson, Emma Williams and David Chen; the live cards show invented-looking star ratings/review counts not present in the Product type. | Severe trust and compliance risk; directly violates the brief. | P0: remove immediately. Render reviews only from a verified source and show a neutral empty state otherwise. |
| Product data and imagery are not credible retail assets. | Eleven sample products use generic Unsplash images; brand “logos” are Google favicons, some only 16×16 pixels. | Customers cannot verify packaging, shade, colour, size or authenticity. | P0: ingest real product media and authorised brand assets. |
| The official palette is not implemented. | globals.css defines #0F1C49 blue, #B4865C gold and pale blue surfaces rather than #0D125D / #9F70A5. | The result is elegant but not distinctly A-Glory. | P1: token migration using official colours and accessible derived tints. |
| Desktop search is underpowered. | Search is a small icon/text link to /search despite ample header space. | High-intent shoppers take an extra step; no autocomplete is available globally. | P0: visible search field with suggestions and keyboard support. |
| Navigation is too shallow. | Desktop exposes Shop, Categories, Brands and Blog; the mega menu routes many labels to the same broad collection. Mobile “Categories” simply links to /shop. | Customers cannot jump directly to braids, edge control, kids care, hair colour or a known task. | P0: catalogue-backed mega menu and drill-down mobile accordions. |
| Collections do not scale. | Current live shop has 11 products and broad category tabs; local filters are select boxes for brand, price, availability and mixed “colour / length”. | Thousands of products would be unmanageable; mixed variant semantics create bad filters. | P0: facet schema by category, desktop sidebar, mobile drawer and indexed pagination. |
| PDP information is insufficient. | One main image; no thumbnails, zoom, video, ingredients on most products, genuine reviews, delivery date/cost, pack guidance or variant-specific inventory. | Shade/length/material uncertainty and preventable returns. | P0/P1: structured product data and a fuller PDP. |
| Delivery claims are too absolute. | “Same-day delivery available” and “30-day returns” appear globally, while the policy says eligibility and price appear later. | Customers may infer UK-wide or unconditional service. | P0: qualify by postcode, cut-off, eligible items and return exclusions at the relevant step. |
| Homepage is long and editorial before being operational. | Two marquees, multiple editorial edits, guides, blog, fabricated testimonials and another product section create a long page. | Product discovery is diluted and mobile scrolling is excessive. | P1: consolidate to nine purposeful content modules after the header. |
| Homepage representation is weak. | The hero uses a generic white model with long straight hair and the same stock imagery is reused across product/category/editorial contexts. | Multicultural positioning feels asserted in copy rather than evidenced in merchandising. | P1: real product-led campaigns and representative commissioned/brand photography. |
| SEO is generic. | Root metadata is inherited widely; PDP title observed as the homepage title; no sitemap.ts or robots.ts exists; category copy is generic; LocalBusiness is typed as BeautySalon. | Poor indexation, weak snippets and inaccurate entity classification. | P0/P1: route metadata, RetailStore/HealthAndBeautyBusiness schema, sitemaps, canonicals and merchant data. |
| Images are unoptimised. | next.config.ts sets images.unoptimized; pages use raw img elements; the live homepage exposes about 30 images, all with loading “auto”. | Slow mobile LCP, wasted data and layout risk. | P0: real image pipeline, dimensions, responsive sizes, lazy loading and priority only for the LCP asset. |
| Static export conflicts with live commerce needs. | next.config.ts sets output: export and creates a static asset worker; there is no backend/API implementation. | Inventory, pricing, search and account state cannot be reliably real-time. | Architecture decision: either use a hosted commerce storefront with server capabilities or keep static pages only where data freshness permits. |
| Build verification is currently blocked. | npm run lint fails because eslint is not installed in the workspace’s node_modules; the build could not be run after that failure. | Unknown production regressions. | Restore dependencies, then make lint, typecheck, unit, integration and browser checks required in CI. |

### Current technical architecture

| Concern | Current implementation | Assessment |
|---|---|---|
| Framework | Next.js 16.3 App Router, React 19.2, TypeScript | Good modern base; must follow repository-local Next 16 docs before implementation. |
| Routing | app directory with static dynamic routes for products, brands, categories and blog | Keep route concepts; data generation and metadata need real sources. |
| Styling | Tailwind 4 imported, but most design is a single 5,000+ line globals.css | Refactor tokens and page/component layers; do not rewrite the whole UI at once. |
| Components | SiteChrome, ProductCard/Grid, ProductDetail and a large route-ui.tsx | Reuse domain concepts; split route-ui.tsx into page-specific and shared commerce components. |
| Catalogue | lib/store-data.ts local array, 11 sample products, six broad categories | Prototype only. Replace through an adapter behind commerce-contract.ts. |
| Database / API | None present | P0 dependency. Choose a system of record before advanced UX work. |
| Authentication | Client-only simulated forms | Replace. No working account or password flow exists. |
| Cart / wishlist | React context persisted to localStorage | Useful prototype; replace cart with server/commerce IDs and optionally merge anonymous/account carts. |
| Search | In-memory substring match | Fine for demo; unsuitable for a large catalogue or typo tolerance. |
| Images | Remote Unsplash, raw img, unoptimised | Replace with authorised product CDN assets and Next image handling. |
| Checkout | Simulated form and payment buttons | Must be removed or clearly blocked from public launch until production checkout exists. |
| Deployment | Static export currently deployed on Railway; build script also emits a static asset worker | Reassess once commerce backend and rendering strategy are chosen. |

## Part 3 — Competitor analysis

### A-Glory

| Area | What they do | Strength | Weakness | What A-Glory should learn |
|---|---|---|---|---|
| Brand positioning | Premium editorial beauty with Erith/local expertise. | Most distinctive and considered of the four. | Copy overstates catalogue depth and representation; visual assets are generic. | Keep the position, prove it with real products, people and service. |
| Header | Slim announcement, logo, four text links and utility actions. | Calm and uncluttered. | Search is not a field; main categories are hidden behind one trigger. | Add retail utility without losing restraint. |
| Navigation | Four-column mega menu with broad group labels. | Easy to scan at current size. | Repeated destinations and too little depth; mobile categories do not drill down. | Make every label a meaningful destination backed by inventory. |
| Search | Separate page with local product/category/brand concepts. | Clean and conceptually grouped. | No global autocomplete, typo tolerance or scalable index. | Turn the existing concept into a persistent predictive search layer. |
| Categories | Six broad categories. | Simple starting point. | Braids, wigs, colour and kids do not get appropriate independent paths. | Use shopper language and catalogue depth, not internal product “types”. |
| Product discovery | Category tiles, bestsellers, edits, brands and blog. | Multiple entry points exist. | Long page and several routes are editorial rather than task-led. | Prioritise category, brand, concern and known-item paths above inspiration. |
| Product cards | Brand, name, rating, price, badge, wishlist and quick action. | Strong visual hierarchy. | Ratings are not trustworthy; stock messaging is generic; lifestyle imagery prevents comparison. | Keep hierarchy; render only verified data and pack/variant cues. |
| Filtering | Prototype select controls for brand, price, availability and option. | Basic filtering is anticipated in code. | Not visible in deployed build during initial hydration; mixed option facet is not category-aware. | Build a product-attribute taxonomy first, then facets. |
| Product pages | Purchase block first, accordions second, related grid. | Sensible order and restrained UI. | One image, weak fulfilment detail, generic related items and false reviews. | Preserve ordering; deepen evidence and variant handling. |
| Brands | Featured brand plus eight-brand index. | Brand loyalty is recognised. | Favicon assets, no A–Z search at scale and brand pages lack depth. | Create a true directory and brand landing template. |
| Offers | Sale badges, bestsellers and new arrivals. | Commercial content is present. | Badges are manually inferred from tags, not rules. | Use scheduled, inventory-aware collections with consistent promotion metadata. |
| Mobile | Clear action row, 390px layout has no horizontal overflow, large readable hero and menu dialog. | Strong visual adaptation, not merely a compressed desktop page. | Hero is about 886px tall; menu is shallow; category discovery starts below a long campaign. | Shorten the mobile hero and add expandable category navigation. |
| Trust | Store, phone, WhatsApp, returns and checkout statements. | Local contact is prominent. | Generic icons and unqualified claims; simulated flows undermine trust. | Replace assurances with verified operational specifics. |
| Content | Three guides and editorial routines. | Tone is helpful and culturally aware. | Articles and authors are prototype content; homepage gives content too much space. | Publish only expert-owned content tied to products and internal links. |
| Checkout/conversion | Bag supports quantity/remove; checkout previews delivery and Click & Collect. | The intended flow is understandable. | It is explicitly a demo with non-functional payment and account state. | Production checkout is the launch gate, not a later enhancement. |
| Visual design | Editorial serif, navy, gold and white, modest radii. | Premium and human compared with dense competitors. | Wrong official palette, too white and repeated stock photos. | Retain structure; migrate tokens and art direction. |
| Overall usability | Pleasant for browsing 11 products. | Low cognitive load. | Cannot scale or support genuine purchasing. | Evolve the shell; replace the commerce foundation. |

### Paks / Pak Cosmetics

| Area | What they do | Strength | Weakness | What A-Glory should learn |
|---|---|---|---|---|
| Brand positioning | “No. 1 choice” for multicultural hair and beauty with huge range. | Immediate authority and category relevance. | Visual language is mass-market and crowded rather than premium. | Be equally explicit about multicultural expertise, with a calmer presentation. |
| Header | Full-width search, phone/email, wishlist/account/bag, free-delivery and trust messages. | Excellent known-item utility on desktop. | Many small elements compete; cookie banner content is malformed in the observed page. | Keep search prominent, simplify secondary utilities. |
| Navigation | Deep mega menus for extensions, wigs, hair care, skin, makeup, electricals, kids, men and more. | Exceptional breadth; highly specific labels such as X-Pression, crochet and wig types. | Density is overwhelming and duplicates appear across branches. | Borrow depth, group it into fewer task-based columns with “View all”. |
| Search | Large persistent “Search keyword” field. | Very visible. | Typing Cantu showed no predictive suggestion panel in the observed homepage. | Beat Paks with grouped autocomplete and error tolerance. |
| Categories | Three or more levels with hair type, product type and use case. | Makes a huge catalogue crawlable and reachable. | Naming and hierarchy are inconsistent in places. | Define controlled taxonomy and synonyms before importing the whole range. |
| Product discovery | New arrivals, sale, top sellers, brands, campaigns and blog. | Constant routes into product inventory. | Homepage is long and product-heavy without enough prioritisation. | Use fewer, stronger merchandising modules. |
| Product cards | Brand, title, review state, price, size list, sale and quick view. | High information density suits replenishment shoppers. | Text is small; cards are cluttered; “from” prices and sizes repeat. | Show only decision-critical data, defer the rest to interaction. |
| Filtering | Parent category pages act as subcategory directories; deeper catalogue organisation is extensive. | Shoppers can narrow via taxonomy. | Representative Shampoo page was a list of subcategories plus very long SEO copy rather than a modern faceted PLP. | Combine crawlable subcategories with usable facets and concise copy. |
| Product pages | Gallery, stock, size, quantity, price, add-to-cart, secure checkout, reviews and last viewed. | Strong purchase facts and real review depth. | Visual hierarchy is dated; long unedited review list and unclear “online only” placement. | Borrow operational detail and last-viewed, improve hierarchy. |
| Brands | Brand-first navigation and extensive brand routes. | Excellent for loyal beauty shoppers. | Directory presentation is visually dense. | A–Z search plus featured/trending groupings. |
| Offers | Sale destination, percentage badges, promotional hero and offer collections. | Offers are unmistakable. | Discount messaging is omnipresent and can cheapen perception. | Use disciplined campaign hierarchy and genuine price rules. |
| Mobile | Responsive theme exposes shopping tools. | Breadth remains available. | Dense desktop IA and small typography translate poorly; overlays consume space. | Design mobile navigation independently. |
| Trust | Phone, email, UK delivery, secure checkout, company details and real reviews. | Established-retailer signals are numerous. | Generic slogans and broken consent copy reduce polish. | Use fewer, verifiable signals in context. |
| Content | Blog, how-to topics and Instagram/lookbook. | Supports organic discovery and product education. | Some copy feels SEO-led and links are awkward. | Publish concise expert guidance that routes directly to products. |
| Checkout/conversion | Account, wishlist, basket, stock and secure checkout messaging. | Familiar mature-store flow. | Friction and ageing UI may reduce confidence on mobile. | Match functional depth with A-Glory’s cleaner interface. |
| Visual design | Dense product-led mass retail. | Products and offers are always visible. | Limited premium feel, inconsistent imagery and crowded hierarchy. | Keep commercial directness, not the visual density. |
| Overall usability | Powerful for an experienced shopper who knows the terminology. | Catalogue breadth is its moat. | New shoppers can be overwhelmed. | Offer both direct expert taxonomy and guided concern/hair-type paths. |

### Beautizone UK

| Area | What they do | Strength | Weakness | What A-Glory should learn |
|---|---|---|---|---|
| Brand positioning | Broad beauty supplier with strong Afro hair extensions, 200+ brands and value-led offers. | Product/brand breadth is immediately credible. | Position stretches into fragrances, blades and broad personal care, reducing focus. | Stay focused on A-Glory’s core expertise while signalling enough range. |
| Header | Indexed homepage exposes a direct “What are you looking for?” search and free-delivery message. | Search language is clear. | Direct browser audit was blocked by Cloudflare, so visual/header interaction could not be verified. | Keep search plain-language and prominent. |
| Navigation | Collection structure covers hair extensions, hair care, skin, makeup and brands. | Strong category coverage. | Duplicate/legacy collection routes and mixed naming appear in the index. | Clean URLs and one canonical taxonomy. |
| Search | Visible search field in indexed homepage. | Supports known-item entry. | Predictive quality could not be directly tested. | Benchmark after analytics; do not assume visibility alone is enough. |
| Categories | Hair extensions break into braids/plaiting, human hair, half wigs, tape and ponytails. | Protective styling is treated as a real department. | Some zero-count and inconsistent labels are exposed. | Suppress empty leaves and standardise case/spelling. |
| Product discovery | “Customer’s Picked”, pre-stretched hair, new, most loved and sale sections. | Product-led and relevant to category demand. | Repetition and frequent sale/compare controls create clutter. | Borrow focused product campaigns, remove comparison unless research proves value. |
| Product cards | Product, brand, rating, sale price, quick shop/add and compare. | Strong product visibility and quick commerce. | Price strings repeat and the card can become verbose. | Use concise price/variant display and one primary quick action. |
| Filtering | Availability, price, product type, brand, colour and size on relevant collections. | Best category-specific facet example in this set, especially hair colour. | Long filter lists need search/collapse; naming is inconsistent. | Borrow category relevance, add searchable filter groups. |
| Product pages | Multi-image zoom, colour selection, quantity, delivery timeline, how-to, ingredients and reviews. | Excellent decision support for braiding hair; some pages include packs-for-full-head guidance. | Very large galleries and long descriptions can dominate; AI review summaries are unnecessary. | Add pack guidance and real colour media, keep education structured and human. |
| Brands | Featured set plus a large A–Z directory. | Strong loyalty path and breadth signal. | Directory mixes brands, categories and promotional collections. | Enforce brand entity data and search within brands. |
| Offers | Sale prices, bundle packs and free delivery over £50. | Value is clear. | Sale repetition can feel permanent and reduce premium trust. | Limit badges to genuine states and state end dates when real. |
| Mobile | Shopify-style theme likely provides responsive drawers; direct visual test was blocked. | Indexed pages use tap-to-zoom language. | Cannot verify menu density or overlays; treat as an audit limitation. | Validate A-Glory independently at target widths. |
| Trust | Reviews, delivery timelines, returns policy, address and authenticity language. | Specific timelines and verified purchase signals help. | Some claims are verbose and the Cloudflare block itself creates access risk for some users/bots. | Put concise operational facts on PDP; monitor edge security false positives. |
| Content | Long collection and product copy supports niche queries. | Covers product-specific questions. | Copy is often repetitive/SEO-heavy. | Answer genuine questions in scannable sections, not filler paragraphs. |
| Checkout/conversion | Quick shop, add, variants and delivery options support fast purchase. | Strong short path from collection to basket. | Compare and repeated options add cognitive load. | Offer quick add only for single-variant items; clear choose-options for others. |
| Visual design | Product photography provides colour; sale-led theme is functional. | Commercial and catalogue rich. | Less distinctive/premium; precise visual audit unavailable due access block. | Let product packaging supply colour inside A-Glory’s controlled system. |
| Overall usability | Strong for extension shoppers and attribute filtering. | Useful product/colour depth. | Taxonomy hygiene and content editing need improvement. | Copy the relevance of facets, not the messy data model. |

Evidence: [Beautizone homepage](https://beautizone.co.uk/), [hair extensions collection](https://beautizone.co.uk/collections/hair-extensions), [braids/plaiting collection](https://beautizone.co.uk/collections/braids-plaiting-hair), [brand directory](https://beautizone.co.uk/pages/brands), [representative X-Pression PDP](https://beautizone.co.uk/products/x-pression-lagos-braid-pre-stretched-hair-extensions).

### TJ Beauty Products UK

| Area | What they do | Strength | Weakness | What A-Glory should learn |
|---|---|---|---|---|
| Brand positioning | “Every shade. Every strand.” and melanin-first curation. | Clear cultural relevance with representative imagery. | Owned-brand promotion can dominate the retailer proposition. | Express customer relevance clearly but keep multi-brand breadth visible. |
| Header | Black branded header, category nav, search, account, bag, language/country controls. | Strong high-level department model. | Search is an icon on desktop and international selector adds noise for UK users. | Use a visible desktop search and defer secondary locale controls. |
| Navigation | Deep, organised mega menus with brands, ingredients, concerns and product types. | Best balanced IA of the three competitors. | Some branches link to “#”; naming includes duplication and awkward collection handles. | Borrow column logic and shopper vocabulary, enforce link QA. |
| Search | Overlay opens with popular products, thumbnails, price, stock and quick actions; search is a combobox. | Strong pre-query discovery and product-rich results. | Drawer can be visually busy; icon discoverability is weaker than a full field. | Use the grouped results, but with a visible field and categories/brands alongside products. |
| Categories | Hair care, wigs/extensions, skin, makeup, kids, men, tools and offers. | Broad yet comprehensible. | Hair colour sits within hair care and wigs/extensions are merged. | Separate high-demand A-Glory departments when inventory supports them. |
| Product discovery | Category tiles, Black-owned brands, top brands, bestsellers, ingredients, reviews and popular products. | Many useful shopping modes. | Homepage becomes long; repeated product rails compete. | Use a smaller number of modules selected by demand. |
| Product cards | Two-image hover, ratings, price, sale, out-of-stock, quick add or choose options. | Strong balance of information and action. | Long SEO-style product titles make cards tall and hard to scan. | Use concise display names plus structured SEO titles in metadata. |
| Filtering | Drawer groups Brand, Product Type, Category, Suitable for hair type and Colour. | Category-aware facets and clear applied-state controls. | Very long brand filter; mobile drawer needs within-filter search. | Borrow facet groups, add counts/search and hide zero-result values. |
| Product pages | Gallery, colour, price, reviews, add-to-bag, pair-with, accordion education, shipping and related items. | Comprehensive conversion and cross-sell pattern. | The example description is extremely long and SEO repetitive; global review carousel mixes unrelated products. | Keep decision content concise; separate product reviews from store reviews. |
| Brands | Featured/popular/more brands in menu plus top-brand pages. | Excellent brand discovery. | Large list can overwhelm and some labels are duplicated. | A–Z plus search and merchandising groups. |
| Offers | Owned-brand switch offer, Black-owned brands, 50% sale, bestsellers. | Strong campaign flexibility. | Heavy offer and chat overlays distract, especially mobile. | Limit concurrent promotions and do not obscure product actions. |
| Mobile | Dedicated hamburger/action header and responsive product grid. | Navigation is adapted, not simply squeezed. | Cookie and chat overlays occupied most of the observed 390px viewport. | Strict overlay governance and small, dismissible assistance. |
| Trust | 1,500-review programme, company addresses, store locations and shipping information. | Mature retail proof. | Mixed positive/negative store reviews are surfaced out of context; chat can feel intrusive. | Show authentic proof in the right context and let users summon help. |
| Content | Guides and collection FAQs answer texture/concern questions. | Supports education and internal links. | Some content is visibly search-engine written and overlong. | Publish expert-reviewed, concise advice. |
| Checkout/conversion | Quick add, variant selection, bundle offers, product pairing and Global-e disclosure. | Mature AOV and international flows. | Merchant-of-record disclosure and currency/locale can confuse UK visitors. | Keep the UK flow simple; disclose partners only where relevant. |
| Visual design | Black/coral identity, diverse imagery, product-led colour. | Distinctive and culturally relevant. | Campaign and pop-up layers sometimes crowd the core shop. | Use A-Glory navy/mauve with the same representational confidence and less interruption. |
| Overall usability | Strongest competitor balance of taxonomy, merchandising and modern interaction. | Best model for navigation/filter/product cards. | Content and overlay discipline are inconsistent. | Use TJ as the functional benchmark, not a visual template. |

### Cross-competitor conclusion

Paks is the catalogue-depth benchmark, Beautizone is useful for extension-specific filters and pack/colour information, and TJ Beauty is the strongest modern discovery benchmark. A-Glory already has the best opportunity for a premium, local, human identity. Its redesign should combine Paks’s reach, Beautizone’s attribute detail and TJ’s discovery patterns within a much cleaner operating system.

## Part 4 — Features worth borrowing

| Competitor | Feature | Why it works | A-Glory adaptation | Priority |
|---|---|---|---|---|
| Paks | Persistent desktop search | Known-item shoppers immediately see where to type. | Full-width header field with grouped predictions, recent/popular terms and typo handling. | P0 |
| Paks | Deep extension/wig vocabulary | Matches how expert shoppers name specific formats. | Controlled mega-menu branches for pre-stretched, X-Pression, crochet, twists/locs, lace, human/synthetic and accessories. | P0 |
| Paks | Size and “from” information on cards | Reduces unnecessary PDP visits for commodity items. | Always show size/pack count when singular; show “from” only when variants genuinely differ. | P1 |
| Paks | Last viewed products | Helps customers resume comparison. | Four-item local/session rail on PDP and basket, with privacy-respecting storage. | P2 |
| Beautizone | Hair-extension colour and product-type facets | Colour and format are primary decisions in braiding hair. | Searchable visual colour family filter plus length, fibre, pack size, texture and brand. | P0 |
| Beautizone | Packs-for-full-head guidance | Answers the practical question that controls basket quantity. | Structured “Typical packs needed” field with brand-approved caveat and quick quantity preset. | P1 |
| Beautizone | Delivery timeline on PDP | Removes a key pre-purchase uncertainty. | Postcode-aware standard/express/local/collect estimates beside add-to-basket. | P0 |
| Beautizone | A–Z brand directory | Beauty shoppers often begin with a known brand. | A–Z, brand search, featured/trending/recently added and clean brand entities only. | P1 |
| TJ Beauty | Mega-menu column structure | Balances depth with scanning. | Product type, concern, hair type and featured links; five columns maximum, no dead links. | P0 |
| TJ Beauty | Product-rich search overlay | Shows price, image, stock and action before a full results page. | Products left; categories/brands/advice right; keyboard selection and “View all results”. | P0 |
| TJ Beauty | Ingredient discovery | Ingredients such as castor oil and shea butter are real shopping anchors. | Publish only after catalogue ingredients are normalised; show product count and suitable concerns. | P1 |
| TJ Beauty | Quick add vs choose options | Keeps simple items fast and complex items safe. | Single-SKU products add inline; colour/length/shade products open an accessible option drawer. | P1 |
| TJ Beauty | Pairs well with | Adds a relevant companion at the purchase point. | Merchandiser-curated rule: dye + brush/gloves, wig + cap/care, shampoo + conditioner; never random. | P1 |
| TJ Beauty | Black-owned brand collection | Supports values-led discovery. | Use only verified ownership data, with editorial explanation and scheduled campaigns. | P2 |
| All | Clear sale/new/bestseller destinations | High-demand commercial states are easy to find. | Rule-based collections with start/end dates, previous price, price history/legal review and no false urgency. | P0/P1 |

Features not worth borrowing: Paks’s visual density and tiny type; Beautizone’s compare control and repetitive sale labels; TJ Beauty’s intrusive chat/cookie layering and long SEO-style titles/descriptions; any competitor’s duplicate taxonomy, dead “#” links or generic review carousel.

## Part 5 — Information architecture

### Navigation principles

1. Product type is the primary path because it matches high-intent language: shampoo, braiding hair, lace wig, dye and body lotion.
2. Brand is a first-class path because loyalty is unusually strong in beauty.
3. Concern, hair type and ingredient are secondary paths, not substitutes for the product taxonomy.
4. A leaf category is published only if it has enough genuine inventory or strategic demand to be useful. Empty categories stay out of navigation and sitemaps.
5. Every product has one canonical primary category and may have governed secondary classifications for merchandising.
6. Synonyms are searchable even when the navigation uses one preferred term: “plaiting hair” maps to braiding hair; “hair dye” maps to hair colour; “JBCO” maps to Jamaican black castor oil.

### Final desktop navigation

**Home**

**Hair Care**

- Wash & condition
  - Shampoo
  - Conditioner
  - Co-wash
  - Leave-in conditioner
- Treat & nourish
  - Masks & deep treatments
  - Oils & serums
  - Hair moisturisers
  - Hair growth
  - Scalp care & dandruff
  - Protein & strengthening
- Style & finish
  - Edge control
  - Styling gels & jellies
  - Curl creams & definers
  - Mousse & foam
  - Sprays & heat protection
  - Loc care
- Relaxers & texturisers
- Shop by concern
  - Dryness
  - Damage & breakage
  - Hair growth
  - Dry/itchy scalp & dandruff
  - Frizz & curl definition
  - Protective-style care
- Shop by hair type
  - Curly & coily
  - Kinky / 4C
  - Relaxed
  - Locs
  - Braids & protective styles

**Braids & Extensions**

- Braiding hair
  - Pre-stretched braids
  - X-Pression
  - Jumbo / Kanekalon braid
  - Afro & kinky braid
  - Marley twists
  - Locs & faux locs
- Crochet hair
- Weaves & bundles
  - Human hair
  - Synthetic hair
  - Straight
  - Curly & wavy
- Ponytails & hair pieces
- Clip-ins & tape-ins, only if stocked
- Extension accessories
  - Caps, thread & needles
  - Glue, tape & removers
- Shop by colour
- Shop by length

**Wigs**

- Synthetic wigs
- Human hair wigs
- Lace front wigs
- Full lace wigs, only if stocked
- Half wigs & instant weaves
- Short wigs
- Long wigs
- Curly & wavy wigs
- Straight wigs
- Wig care
- Wig caps, glue & accessories

**Hair Colour**

- Semi-permanent colour
- Permanent colour
- Temporary colour & sprays
- Bleach, peroxide & developer
- Root touch-up & grey coverage
- Colour care
- Men’s hair colour
- Shop all shades

**Skin & Body**

- Face
  - Cleansers
  - Toners
  - Moisturisers
  - Serums & treatments
  - Masks & exfoliators
- Body
  - Body lotions & creams
  - Body wash & soap
  - Body oils
  - Scrubs
  - African black soap
- Shop by concern
  - Dry skin
  - Sensitive skin
  - Blemish-prone skin
  - Uneven tone, using compliant and responsible language

**Makeup**

- Face & complexion
  - Foundation
  - Concealer
  - Powder
  - Blush, bronzer & highlighter
- Eyes
- Lips
- Lashes
- Brushes, sponges & tools
- Shop by shade / finish where catalogue data supports it

**Men**

- Hair care & styling
- Beard care
- Shaving
- Skin & body
- Hair colour
- Clippers & trimmers

**Kids**

- Shampoo & conditioner
- Moisturisers & detanglers
- Styling
- Braiding hair
- Accessories, bonnets & caps
- Baby care, only if stocked

**Tools & Accessories**

- Brushes & combs
- Bonnets, durags & scarves
- Hair accessories
- Wig & extension accessories
- Electrical styling tools
- Clippers & trimmers
- Makeup & beauty tools

**Brands**

- All brands A–Z
- Featured brands
- Trending brands
- Recently added
- Black-owned brands, after verification
- Search brands

**New & Trending**

- New arrivals
- Bestsellers
- Back in stock
- Trending now

**Offers**

- All offers
- Hair offers
- Braids & wigs offers
- Skin/body offers
- Makeup offers
- Bundles and multi-buy offers

At 1280px and above, show Hair Care, Braids & Extensions, Wigs, Hair Colour, Skin & Body, Makeup, Men, Kids, Brands and Offers. Between 1024px and 1279px, place Men, Kids and Tools & Accessories under “More” so search never collapses. Do not put New, Bestsellers and Offers in the same hidden group; Offers remains visibly distinct.

### Secondary discovery paths

**Shop by concern** launches with only well-supported product mappings: dry hair, damage/breakage, hair growth, scalp/dandruff, frizz/curl definition, protective-style maintenance, dry skin and sensitive skin. Each page needs a concise expert intro, related categories and products. Do not create a concern page solely for SEO.

**Shop by hair type** uses curly/coily, kinky/4C, relaxed, locs, braids/protective styles and wigs/extensions. “Natural hair” may be a synonym/filter rather than a separate ambiguous type.

**Shop by ingredient** launches only after ingredient fields are normalised. Recommended initial candidates, subject to a product-count audit: Jamaican black castor oil, shea butter, coconut oil, argan oil, tea tree, aloe vera, rosemary, keratin/protein and biotin. Each needs accurate ingredient evidence; a product is not tagged merely because its marketing copy mentions an ingredient.

### Complete sitemap

- Home
- Shop
  - All products
  - Hair Care
    - Wash & Condition
    - Treatments & Scalp
    - Styling & Finish
    - Relaxers & Texturisers
  - Braids & Extensions
  - Wigs
  - Hair Colour
  - Skin & Body
  - Makeup
  - Men
  - Kids
  - Tools & Accessories
- Shop by
  - Concern
  - Hair type
  - Ingredient
  - Colour / shade
- Brands
  - All brands A–Z
  - Brand detail pages
- New Arrivals
- Bestsellers
- Back in Stock
- Offers
- Beauty Advice
  - Hair care
  - Protective styling
  - Wigs & extensions
  - Skin & body
  - Makeup
  - Article detail
- Store
  - Visit A-Glory Erith
  - Opening hours and directions
- About A-Glory
- Contact & WhatsApp
- Help
  - Delivery
  - Click & Collect
  - Returns & refunds
  - FAQs
  - Track an order
- Account
  - Sign in / register / reset password
  - Overview
  - Orders
  - Addresses
  - Profile
- Wishlist
- Basket
- Checkout, hosted or integrated through the commerce platform
- Legal
  - Privacy
  - Cookies
  - Terms
  - Accessibility statement

### Taxonomy governance

Create controlled product fields for brand, product type, primary category, secondary category, hair type, concern, ingredient, colour family, exact shade code, length, size/volume, pack count, material/fibre, finish, availability, launch date and promotion state. Product titles should not carry every attribute; the structured fields power filters, search and variants.

## Part 6 — Homepage redesign

The target is a retail homepage of roughly nine content modules after navigation, not an endless editorial landing page. On mobile, the first product cards should begin within approximately two screens.

### Exact section order

| Order | Section | Purpose and content | Layout and colour | Desktop behaviour | Mobile behaviour | CTA | Conversion reason |
|---|---|---|---|---|---|---|---|
| 1 | Announcement bar | One operational message at a time: “Free UK delivery over £X”, “Order by 12pm for eligible local same-day delivery”, or a dated promotion. | 30–32px high; accessible dark mauve #754D7C with white type. No carousel unless it pauses and is user-controlled. | Phone/store link on left, message centred, delivery/help link right. | Single short message; phone and social links move into menu. | “Delivery details” or promotion destination. | Answers fulfilment/value immediately without clutter. |
| 2 | Commerce header and category nav | Logo, visible search, account, wishlist, basket and high-level departments. | Navy main bar; white search surface; white category row with navy type and mauve selected/hover rule. | Three horizontal rows including announcement. Sticky after modest scroll; category row may compact, search remains visible. | Navy icon row plus full-width search row. Menu, logo, account/bag actions retain 44–48px targets. | Search or category route. | Fastest path for known-item and category shoppers. |
| 3 | Retail campaign hero | One real seasonal/department campaign: product range plus representative lifestyle or pack photography. Example: “Braiding hair from the brands you trust”. | 1440×520-ish artboard, straight or 6px radius, 55–65% imagery and 35–45% copy; navy or mauve-tinted copy panel. | One primary CTA and one textual secondary link. No fake slide counter; maximum two user-controlled campaigns if the business can maintain them. | 4:5 image above a compact copy block; total target height 580–680px, not 886px. | “Shop braiding hair”; secondary “Shop X-Pression”. | Makes the commercial proposition and relevant range obvious above the fold. |
| 4 | Quick category rail | Eight fastest routes: Hair Care, Braiding Hair, Wigs, Hair Colour, Skin & Body, Makeup, Men, Kids. | Real product/category imagery, 4:5 or square crops, alternating pale navy/mauve tints; no heavy card shell. | Eight tiles in one row at wide desktop or four-by-two at standard desktop. | Horizontal snap rail showing 2.3 tiles, with text always visible; no auto-scroll. | Category name. | Converts broad intent into a product list in one tap. |
| 5 | Local service ribbon | Specific fulfilment: UK delivery threshold, local same-day eligibility, Click & Collect at 8 Cross Street, expert help by WhatsApp. | Navy strip with simple text divisions; use icons sparingly and pair with facts. | Four equal facts; each may link to detail. | Two-by-two grid or horizontally scrollable facts; concise labels. | “Check delivery” / “Store details”. | Replaces generic trust icons with decision-relevant proof. |
| 6 | Bestsellers | Eight genuine bestsellers ranked from order data; include a category tab only if each tab has meaningful inventory. | White product surface on a pale navy-tint section #EEF0F7; products provide colour. | Four or five visible cards, two rows maximum or a controlled carousel with arrows. | Two-column grid of four, followed by “View all”; avoid a swipe-only hidden assortment. | “Shop bestsellers”. | Gives uncertain visitors a safe starting point and accelerates product comparison. |
| 7 | Protective styling campaign | Commercial editorial split: real model/style or brand creative plus pre-stretched, crochet, twists/locs and edge control shortcuts. | Edge-to-edge navy/mauve colour block with one strong image; straight edges are welcome. | 55/45 split, four text links beneath the campaign copy. | Image first, then copy and a two-column link list. | “Shop protective styling”. | Owns a culturally important mission and creates cross-category baskets. |
| 8 | Shop by concern | Six verified paths: dryness, breakage, growth, scalp/dandruff, curl definition and protective-style care. | Compact text/image list on mauve tint #F3EDF4; use macro product/texture photography, not icon bubbles. | Three columns by two rows; each route includes a one-line descriptor. | Horizontal cards or stacked paired rows; titles remain short. | Concern name. | Helps customers who know the problem but not the product type. |
| 9 | Featured brand + products | One brand story and four to six real products; rotate on a merchandising calendar. | Brand-approved imagery on white/navy split; actual logo asset and product packaging. | Editorial panel beside product rail; CTA to brand page. | Brand panel, then two-column product grid. | “Shop [Brand]”. | Uses brand loyalty and communicates authorised, curated range. |
| 10 | New & trending | One component with tabs for New arrivals, Back in stock and Trending now. | White section with mauve active underline, not pill tabs. | Four to five product cards; no duplicate items already shown unless strategically important. | Two columns, four items per active tab; load content without shifting heading. | “View all new arrivals”. | Keeps the homepage current without three separate product sections. |
| 11 | Brands customers ask for | Searchable/linked strip of 12–16 authorised logos or wordmarks plus A–Z link. | Navy-tint background, consistent monochrome/navy logo treatment only when brand guidelines allow. | Two rows; no favicon sourcing. | Four-column grid or horizontal rail with “All brands”. | “Shop all brands”. | Supports high-intent brand loyalty and communicates range. |
| 12 | Real reviews + Erith store | Verified store/product rating summary paired with store image, address, hours, directions and WhatsApp. If no verified review source exists, omit reviews and expand the store story. | Navy background with real store/staff photography; mauve accents and white text. | 50/50 split; two or three short verified excerpts maximum. | Store image, details, then verified review summary. WhatsApp is a normal button, not a persistent bubble over checkout UI. | “Visit the store” / “Message the team”. | Converts local credibility into online confidence; removes fake testimonial risk. |
| 13 | Beauty advice | Three expert-reviewed articles tied to current categories and products. | White section with 3:2 real imagery; understated labels. | Three cards with title, topic and read time. | Horizontal snap or single-column cards; no excerpt longer than two lines. | “Read beauty advice”. | Builds trust, internal links and organic discovery without delaying products. |
| 14 | Newsletter and footer | Specific opt-in value, customer service, store and policy links. | Newsletter in mauve tint; footer in deep navy. | Email and consent statement visible; four-column footer. | Stacked accordions for link groups, store facts expanded by default. | “Get A-Glory updates”. | Retention and reassurance at page end. |

### Recommended homepage wireframe

    [Announcement: one verified delivery/offer message]
    [Navy main header: Logo | Search products and brands | Account | Wishlist | Bag]
    [Category nav: Hair Care | Braids & Extensions | Wigs | Hair Colour | Skin & Body | Makeup | Men | Kids | Brands | Offers]
    [Compact retail campaign: 55% real imagery | 45% campaign copy + CTA]
    [8 quick category tiles]
    [Delivery | Local same-day | Click & Collect | WhatsApp advice]
    [Bestsellers: 4–5 across desktop / 2-column mobile]
    [Protective styling split campaign + four shortcuts]
    [Shop by concern: 6 routes]
    [Featured brand + product rail]
    [Tabbed New | Back in stock | Trending]
    [Top brand grid + A–Z]
    [Verified reviews + Visit A-Glory Erith]
    [3 beauty advice articles]
    [Newsletter]
    [Footer]

The hero, bestseller, protective-style and store modules may change seasonally, but their layouts should not all become the same rounded banner. Reusable components need two or three art-directed variants: image-left split, full-bleed copy overlay and product-led colour block.

### Merchandising operating system

Build reusable slots rather than hard-coding every seasonal homepage:

| Component | Variants | Required data | Rules |
|---|---|---|---|
| CampaignHero | Image/copy split; full-bleed with solid text panel | Desktop/mobile art, label, specific headline, body, primary CTA, optional secondary CTA, start/end | One live hero; automatic fallback to evergreen category campaign; no unapproved countdown. |
| PromotionStrip | Navy, mauve-dark or product-derived campaign colour | Offer, qualifying products, dates, terms link | One dominant site-wide promotion; never stack several bars. |
| CategoryRail | Image tile or compact text/image | Category ID, art, label, priority | Hide empty categories automatically; keep shopper language stable. |
| ProductShelf | Grid or controlled carousel | Collection/rule, limit, title, CTA, fallback collection | Suppress unavailable products; do not repeat the same SKU in adjacent shelves. |
| EditorialSplit | Image-left, image-right or full-width colour block | Campaign art, copy, category links, optional product IDs | Maximum one per homepage view; square/straight edges allowed. |
| BrandFeature | Brand story plus products | Authorised logo/art, brand ID, copy, product rule | Dates and assets approved by brand/merchandiser. |
| ConcernGrid | Text/image route list | Governed concern IDs, short explanation, product counts | Hide routes below the agreed useful inventory threshold. |
| StoreFeature | Store photo split or navy information block | Verified address, hours, phone, WhatsApp, directions | Operational data comes from one source used by footer/schema/contact. |
| AdviceShelf | Three-card grid/rail | Reviewed article IDs, topic, author, updated date | Link to relevant category/products; remove stale seasonal articles. |

Every campaign record needs owner, start/end, target URL, desktop/mobile asset, alt text, terms, fallback, inventory rule and approval status. Preview it at all target widths before scheduling. Collections for Bestsellers, New, Back in stock and Sale are data rules; brand spotlights and seasonal edits are merchandiser-curated. This supports Mother’s Day, Christmas gifting, summer hair, festival beauty, back-to-school/kids hair, Black History Month and local Erith promotions without forcing every campaign into the same layout.

## Part 7 — Header/search/mega menu

### Desktop header specification

- Announcement: 30–32px, one sentence, no auto-rotating ticker.
- Main header: 72–76px navy #0D125D. Logo at approximately 150–170px wide. Search takes the central flexible width, ideally 480–680px. Account, wishlist and basket use icon plus label at wide widths.
- Search field: 48px high, white background, 6px radius, search icon on the left, clear button on the right, placeholder “Search products, brands or concerns”.
- Category nav: 44px white row with navy text; active/hover is a 2px mauve underline, not a rounded pill.
- Sticky state: after scroll, announcement may leave; main header compacts to 64px and category row stays only where viewport permits. Search never collapses to an icon on desktop.
- Basket count uses a small mauve badge and an accessible label such as “Basket, 2 items”.

### Predictive search experience

On focus with no query:

- Recent searches, stored with consent-aware local/session state.
- Popular searches from analytics, not a hard-coded permanent list.
- Four popular categories and four trending brands.

After two characters:

- **Products:** thumbnail, brand, concise name, variant/size when useful, price, sale price and stock state.
- **Brands:** matching brand names and authorised wordmarks.
- **Categories:** exact and synonym matches such as “plaiting” → Braiding Hair.
- **Advice:** maximum two relevant guides, visually secondary.
- “View all results for ‘cantu conditioner’” with result count.

Search behaviour:

- Normalise apostrophes, hyphens, plurals and common spacing differences.
- Maintain a synonym set for X-Pression/Xpression, JBCO/castor oil, hair dye/hair colour, plaiting/braiding and leave in/leave-in.
- Use typo tolerance with conservative thresholds so “Shea Moisure” resolves without making broad irrelevant matches.
- Rank exact product/brand matches first, then prefix, category, attribute and description.
- Suppress out-of-stock products by default only when alternatives exist; otherwise show them with “Out of stock” and a back-in-stock route.
- Log zero-result queries, search exits, result clicks, add-to-basket after search and revenue per search session.
- Keyboard: down/up traverses results, Enter selects, Escape closes, focus returns to the field; announce result counts through a live region.

Recommended architecture: a hosted commerce search/index service or search capability provided by the chosen commerce platform, fed by governed catalogue fields. The current in-memory includes() match cannot support catalogue scale.

### Mega-menu specification

- Open on click and a short intentional hover delay; close on Escape, click outside or focus leaving the menu.
- Full-width panel aligned under the category row, maximum five content columns plus one optional campaign column.
- Column headings are links. Leaf links are 15–16px with at least 36px line height.
- Each department uses its own relevant columns. Hair Care can include Wash & Condition, Treat & Nourish, Style & Finish, Shop by Concern and a campaign. Wigs should not show skin concerns merely to keep layout symmetry.
- Promotional image is optional, uses real campaign artwork, and never displaces the top product links.
- Selected department is underlined in mauve; the panel itself stays white with navy headings and pale tint dividers.
- No dead “#” links and no duplicate labels pointing to one broad page unless the link is intentionally “View all”.
- Implement the WAI-ARIA disclosure/navigation pattern carefully; do not force arrow-key menubar semantics onto ordinary site navigation unless implemented completely.

### Mobile header and menu

- Row 1: 28px announcement.
- Row 2: 60–64px navy header: menu, centred logo, account/basket; wishlist may stay as an icon if space permits.
- Row 3: persistent 48px search field on white or pale tint. Search should not require opening the menu.
- Drawer fills 92–100% width, uses a navy title band, traps focus, restores focus to menu trigger and prevents background scroll.
- First level lists departments plus New, Bestsellers and Offers.
- Tapping a department opens an in-drawer second level with Back, View all, grouped subcategories and one optional campaign.
- Account, wishlist, store, contact, delivery and social links sit after departments, not before them.

## Part 8 — Collection page

### Exact PLP structure

1. Breadcrumbs: Home / Hair Care / Shampoo. Visible and crawlable; horizontally scrollable on small screens without truncating the current page.
2. Category header: H1, one- or two-sentence helpful intro and optional “Read more” for longer expert copy. Do not lead with a large decorative hero on routine categories.
3. Subcategory shortcuts: image or text links for the next useful level, with counts only when reliable.
4. Merchandising banner: optional, compact, shown only when a genuine category campaign exists.
5. Control row: product count on left; Filter and Sort on right; applied-filter chips below.
6. Desktop body: 240–280px filter sidebar plus four-column product grid. Wide desktop may use five columns if cards retain readable titles.
7. Tablet: filter drawer plus three columns.
8. Mobile: sticky filter/sort bar under the header plus two columns at 375/390/430px. One column is reserved for unusually complex products only, not the default.
9. Results footer: crawlable numbered pagination with Previous/Next. A “Load more” enhancement may append results while updating the URL/history, but do not use endless scroll as the only navigation.
10. Below-grid content: concise category guide, FAQs and links to related categories/brands. Keep it useful and edited.

### Filter behaviour

- Sidebar groups are collapsible but Brand, Product Type and the category’s most important facet start open.
- Each option has a count; zero-result options are disabled or hidden.
- Brand lists over ten items get an internal search.
- Selections update the URL and product count without a full layout reset.
- Applied filters appear as removable chips above results; “Clear all” is textual, not a high-emphasis button.
- Mobile drawer has a fixed bottom bar: “Show 128 products” and “Clear”. Applying one facet does not close the drawer.
- Preserve filters, sort and scroll position when a customer opens a PDP and returns.
- Announce updated counts to screen readers without moving focus.

### Relevant filters by department

| Department | Filters |
|---|---|
| Hair Care | Brand, product type, concern, hair type, key ingredient, size, availability, rating, price |
| Braids & Extensions | Brand, product type, colour family, exact shade, length, material/fibre, texture, pack count, availability, price |
| Wigs | Brand, synthetic/human, construction, style/texture, length, colour, lace type, cap size if real, availability, price |
| Hair Colour | Brand, colour family, exact shade, permanent/semi/temporary, developer requirement, size, availability, price |
| Skin & Body | Brand, product type, concern, skin type, key ingredient, size, availability, rating, price |
| Makeup | Brand, product type, shade family, finish, coverage, skin type, availability, rating, price |
| Men | Product type, concern, brand, size, availability, price |
| Kids | Product type, age guidance where supplied, concern, brand, size, availability, price |
| Tools & Accessories | Product type, brand, material, electrical feature where applicable, availability, price |

Never show Rating until reviews are genuine and sufficiently populated. Never merge colour and length into one filter. Do not expose ingredients, hair type or concern inferred unreliably from prose.

### Sorting

Default “Featured” is merchandiser-controlled but respects stock. Also offer Bestselling, Newest, Price low–high, Price high–low and Highest rated once rating volume is meaningful. “Featured” rules and sponsored placement must not disguise irrelevant products.

### Empty and zero-result states

Explain what was removed, offer one-click filter removal, link to the nearest parent category and provide search/WhatsApp help. Do not fill an empty state with random products before resolving the customer’s intent.

## Part 9 — Product cards

### Component hierarchy

1. Product image area, fixed 4:5 ratio on a neutral #F5F6F8 background.
2. One state badge at top left when meaningful: Sale, New, Bestseller, Back in stock or Exclusive. “Featured”, “Available now”, “Shine ritual” and similar generic badges should not appear on every product.
3. Wishlist icon at top right with 44×44px interactive area even if the visible icon is smaller.
4. Brand as a small navy uppercase/text link.
5. Concise product display name, two to three lines maximum without stuffing search keywords.
6. Size/pack/length summary when it materially distinguishes the item.
7. Verified rating and count only if reviews exist.
8. Current price, previous price and calculated percentage saving when on genuine sale.
9. Variant cue: colour swatches with “+12”, shade family, or “8 colours”; never render dozens of tiny dots.
10. Primary action: Add to basket for a single purchasable SKU; Choose options for shade/length/size products; Notify me for unavailable items if the service exists.

### Always visible vs interaction

| Always visible | On pointer hover / keyboard focus | Mobile behaviour |
|---|---|---|
| Main image, meaningful badge, wishlist, brand, name, decision-critical size/pack, price, verified rating, stock-out state and action. | Second product/lifestyle image, subtle image scale no more than 1.02, full colour count and quick option drawer trigger. | No hover-dependent information. Show the action beneath price; second image is available through PDP/gallery, not a swipe trap on every card. |

### Image and variant rules

- Default image is the real product pack on a consistent background, not a model unrelated to the item.
- Hover image may show packaging back, texture, swatch or relevant lifestyle use.
- Braiding hair cards show exact selected/default colour name and a concise colour count; the quick drawer includes searchable shade families.
- Foundation and makeup cards show shade family swatches backed by real variant imagery. Do not render CSS colours as the sole shade representation.
- Wigs show model/front view first and construction/side/back images in the gallery; the card includes length and fibre where known.
- Pack guidance such as “2×46 in” belongs near the name; “typically 3 packs for a full head” may appear in quick options or PDP when verified.

### Interaction and feedback

- Add updates the basket count and opens a restrained mini-basket or toast with product, variant, quantity and “View basket”; it must not navigate the customer away unexpectedly.
- Choose options opens a bottom sheet on mobile and a small anchored drawer/modal on desktop. Focus is trapped and restored correctly.
- Wishlist change uses immediate icon/text feedback and persists to the customer account when signed in; anonymous state can be merged after sign-in.
- The entire card must not be one giant link if it contains nested buttons. Image and product name are the PDP links; actions remain buttons.
- Loading, disabled and error states are explicit. Never show “Added” if the commerce API rejected the item.

### Visual specification

- Card has no outer rounded container or shadow; spacing and image field provide structure.
- Product image radius: 4px, or square for selected campaigns.
- Internal vertical gaps: 6px brand-to-name, 8px name-to-attributes, 10px details-to-price, 12px price-to-action.
- Product name: Satoshi 14–15px/1.35, medium.
- Price: Satoshi 15–16px/1.2, 700 weight; sale price in navy, previous price muted and struck through. Red is not required; mauve may mark saving if contrast is sufficient.
- Action: 40–44px high desktop, 44–48px mobile, 6px radius. Keep identical action placement across a row.
- Product grid gaps: 20–24px desktop, 12–16px mobile.

### Customer and business rationale

The customer needs to compare product, pack, shade, price and availability without opening every PDP. A-Glory needs cards compact enough to expose range while preventing wrong-variant adds. This hierarchy reduces pogo-sticking and returns without reproducing Paks’s card clutter or TJ Beauty’s very long titles.

## Part 10 — Product detail page

### Above-the-fold purchase area

**Breadcrumbs**

Home / Braids & Extensions / Pre-stretched Braids / Product. Each level is linked and carries BreadcrumbList structured data.

**Gallery, 55–60% desktop width**

- Main image plus 4–6 thumbnails where assets exist.
- Product-front/pack image first; then back/ingredients, texture, colour swatch, construction and real lifestyle use.
- Click/tap zoom with high-resolution source; hover zoom is optional and must not trap scrolling.
- Video thumbnail only when brand-supplied or genuinely useful.
- Thumbnails are buttons with descriptive labels; current item is announced.
- Fixed aspect-ratio containers prevent layout shift.

**Purchase panel, 40–45% desktop width, sticky within the gallery height**

1. Brand link.
2. Product H1, concise and human-readable.
3. Verified stars/count linked to reviews, or no rating row.
4. Price, previous price, saving and tax statement if required.
5. Payment instalment messaging only when the exact provider is contracted and available for this basket/value.
6. Short benefit summary of one to three lines.
7. Variant selectors in decision order: colour/shade, length, size/pack. Update image, price, SKU, stock and URL where appropriate.
8. Selected variant name shown in text; unavailable combinations disabled and explained.
9. Inventory state: “In stock”, “Out of stock” or a genuine low-stock threshold from the source of truth. Do not expose exact quantity unless operationally accurate and useful.
10. Quantity selector, respecting purchase limits and variant inventory.
11. Primary full-width Add to basket; secondary wishlist icon/text.
12. Delivery estimator: postcode entry or known location, standard/express estimate, local same-day eligibility and Click & Collect availability. Show cost/threshold before checkout whenever possible.
13. Short returns line with product-specific exclusions, linked to full policy.
14. “Need help choosing?” with WhatsApp/phone and store hours, not a generic trust-icon row.

### Product-specific purchase modules

| Product type | Required module |
|---|---|
| Braiding hair / extensions | Fibre, folded/finished length, pack count, colour, hot-water suitability, typical packs needed, care/storage and colour disclaimer. |
| Wigs | Fibre, cap/construction, lace type/colour, density if authoritative, length, heat-safe guidance, care and return/hygiene restrictions. |
| Hair colour | Shade imagery, permanence, developer requirement, patch/strand-test guidance from manufacturer, suitable starting colours and application safety. |
| Hair care / skin | Size, benefits, suitability, how to use, complete ingredient list, warnings and routine position. |
| Makeup | Real shade image, coverage/finish, undertone, size, ingredients, application and hygienic returns restriction. |
| Electricals | Power/voltage, plug, warranty, included accessories and safety. |

### Below-the-fold information order

1. **Benefits / Why it works:** three to five factual bullets.
2. **Description:** edited manufacturer/merchant copy, not a keyword essay.
3. **How to use:** numbered, product-specific instructions.
4. **Ingredients / materials:** complete source text and last-updated process; advise customers to check packaging where formulations can change.
5. **Suitable for:** hair type, concern, skin type or style, only from governed attributes.
6. **Delivery & returns:** concise product-specific details.
7. **FAQs:** real questions from support/search, maximum six.
8. **Verified reviews:** rating distribution, filters, variant purchased, date and verified status. Do not mix store reviews into product reviews.
9. **Frequently bought together:** two or three merchandiser-approved complements with opt-in checkboxes; no preselected add-ons.
10. **Related products:** same need/category with compatible variants and stock.
11. **More from [Brand].**
12. **Recently viewed,** as the final rail.

Use accordions on mobile and for secondary desktop detail; keep Benefits and the start of Description open. A horizontal tab system that hides everything is less discoverable and harder to deep-link.

### Cross-selling rules

- Shampoo → matching conditioner/treatment.
- Hair dye → gloves, applicator brush, petroleum jelly/colour care only when appropriate.
- Braiding hair → edge control, mousse, braid spray and accessories.
- Wig → cap, adhesive/remover when compatible, care products and storage.
- Foundation → complementary tool or setting product, never an unrelated shade.
- Exclude out-of-stock, incompatible or already-selected products.

### Mobile PDP

- Gallery is a swipeable 1-up carousel with visible pagination and thumbnail/zoom access; no auto-advance.
- Purchase information begins immediately after the gallery; brand/title/price do not sit over imagery.
- Variant controls are at least 44px high; long shade lists open a searchable sheet grouped by colour family.
- Sticky bottom bar shows price plus Add to basket. If a required variant is missing, the button says “Choose colour” and scrolls/focuses the selector.
- The sticky bar yields to cookie/consent UI and never competes with a permanent chat bubble.

### Customer and business rationale

Customers need to know whether a product is the right shade, texture, size, fibre and delivery choice before paying. A-Glory needs fewer wrong-product purchases, higher add-to-basket rate and more complete baskets. Purchase facts therefore lead; detailed education follows in a predictable sequence.

## Part 11 — Visual design system

### Colour tokens

| Token | Value | Use |
|---|---|---|
| Brand Navy | #0D125D | Main header, footer, primary buttons, selected states, H1/H2 text, premium framing. |
| Navy Dark | #090D44 | Hover/pressed navy, high-contrast footer layers. |
| Navy Tint | #EEF0F7 | Alternating sections, product discovery panels, filter hover and subtle structure. |
| Brand Mauve | #9F70A5 | Medium/large accents, rules, icons, promotional details and non-text selected indicators. Avoid small body copy on white. |
| Mauve Dark | #754D7C | Accessible mauve text, announcement bar, links and focus treatment where contrast is verified. |
| Mauve Tint | #F3EDF4 | Concern sections, newsletter and soft campaign backgrounds. |
| White | #FFFFFF | Primary content and product-card surfaces. |
| Light Grey | #F5F6F8 | Product image backgrounds, filters, form grouping and alternate neutral sections. |
| Ink | #17182A | Long-form body text when navy feels too saturated. |
| Muted | #5F6274 | Secondary text that still passes contrast. |
| Border | #D9DCE8 | Dividers, inputs and table/card structure. |
| Success | #23734B | Genuine success/in-stock messages only. |
| Error | #B42335 | Form errors, destructive actions and genuine failures only. |

Do not add a gold accent to the core system. Campaign photography and product packaging provide greens, oranges, reds, yellows and metallics naturally. Seasonal artwork may use product-derived colours inside a bounded campaign, while navigation, typography and controls return to navy/mauve.

### Typography

Keep the current pairing because it is one of the prototype’s strongest choices.

| Role | Typeface | Desktop | Mobile | Notes |
|---|---|---|---|---|
| Campaign display | Playfair Display | 48–64px / 0.98–1.05 | 36–48px / 1.0–1.08 | Sparingly; one display message per module. Italics may accent two to four words. |
| Page H1 | Playfair Display | 42–56px / 1.04 | 34–42px / 1.08 | Utility and collection H1s stay at the lower end. |
| Section H2 | Playfair Display | 32–44px / 1.08 | 28–34px / 1.12 | Avoid repeated forced line breaks. |
| Card/article H3 | Satoshi, or Playfair only for editorial | 18–24px | 17–21px | Product names remain sans serif. |
| Body | Satoshi | 16px / 1.55–1.65 | 16px / 1.55 | Never below 16px for primary reading. |
| Product title | Satoshi | 14–15px / 1.35 | 14px / 1.35 | Medium 500–600. |
| Price | Satoshi | 15–18px / 1.2 | 15–17px | Bold 700. |
| Navigation | Satoshi | 14px / 1.2 | 16px in drawers | Semibold, normal case; avoid excessive letter spacing. |
| Labels/meta | Satoshi | 12–13px / 1.35 | 12–13px | Uppercase only for short labels; tracking no more than 0.08em. |

Load Playfair through the Next font system or self-host it; keep Satoshi local. The current CSS @import to Google Fonts adds an avoidable external request.

### Spacing and layout

- Base unit: 4px.
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
- Content max width: 1280–1360px, with 24–32px desktop gutters and 16px mobile gutters.
- Standard section spacing: 64–80px desktop, 44–56px mobile. Reserve 96px only for major campaigns; the prototype’s repeated 115px spacing is too generous for commerce.
- Grid: 12 columns desktop, 8 tablet, 4 mobile.

### Buttons

| Type | Style | Use |
|---|---|---|
| Primary | Navy fill, white text, 46–48px high, 6px radius; dark navy pressed | Checkout, Add to basket, primary campaign CTA. |
| Secondary | White/transparent, 1px navy border, navy text | Secondary campaign and account actions. |
| Mauve promotional | Mauve-dark fill with white text or mauve outline | A bounded promotion, never the default checkout action. |
| Text link | Navy text, mauve underline/arrow on hover | View all, editorial and low-emphasis navigation. |
| Destructive | Text or outlined error colour; confirmation where needed | Remove address/account actions; basket remove can stay low-emphasis and reversible. |

Sentence case is more readable than the prototype’s widespread uppercase. Hover uses colour/underline and at most 1px translation; no bouncing arrows or glow.

### Form inputs

- 48px minimum height, 6px radius, 1px border, persistent visible label above.
- Placeholder is an example, not the label.
- Focus: 2px mauve-dark outline plus 1px white offset on dark surfaces.
- Error text is adjacent, specific and associated via aria-describedby.
- Selectors use native semantics or an accessible combobox; do not create div-only dropdowns.
- Checkbox/radio hit areas are at least 44px even when the visual control is 20px.

### Badges

- Rectangular with 2–4px radius, 11–12px text, one per card by default.
- Sale: navy or mauve-dark with white; New: mauve tint with navy; Bestseller: navy tint with navy; Out of stock: grey with dark text.
- Avoid “Top rated” unless generated from sufficient verified data. Avoid “Low stock” unless inventory is genuinely below a governed threshold.

### Navigation and promotional banners

- Navigation uses straight white/navy surfaces, fine dividers and underlines, not pill groups.
- Campaign variants: full-bleed image with solid copy panel; 50/50 editorial split; product-led colour block with pack shots. Each supports desktop and independent mobile art.
- Maximum banner radius: 6–8px. Full-width strips and some campaigns should be square.
- Promotional copy template: label, specific headline, one sentence, CTA, optional terms/end date. Example: “Braiding hair from the brands you trust. Pre-stretched, crochet and twists in the colours you need.”

### Sections, cards, icons, radii and shadows

- Product cards: no outer border/shadow; 4px image radius.
- Editorial cards: border or background only when needed; 4–8px radius.
- Inputs/buttons: 6px.
- Campaign banners: 0–8px.
- Drawers/modals: 8px on floating desktop modal; mobile sheets may have 12px top corners only.
- Use Lucide-style 1.75–2px line icons consistently; branded social icons remain official.
- Shadows: drawers 0 16px 40px rgba(13,18,93,.14); popovers 0 8px 24px rgba(13,18,93,.10). No shadow on ordinary product cards.

### Image ratios and art direction

| Asset | Ratio |
|---|---|
| Product pack/card | 4:5 |
| Category tile | 4:5 or 1:1 |
| Desktop hero | approximately 8:3 with independent crop |
| Mobile hero | 4:5 or 3:4 |
| Editorial split | 4:5 image |
| Blog/article card | 3:2 |
| Brand logo container | 3:2, contain |
| Store photography | 4:3 or 3:2 |

Asset order: actual product photography, authorised brand lifestyle, real store/staff, commissioned representative photography. Generic stock and AI models are not part of the production asset plan.

### Copy system

- Lead with the thing customers can buy: “Braiding hair from the brands you trust”, “Hair care for every texture”, “Semi-permanent colour”, “Body care for dry skin”.
- One claim per headline; one helpful supporting sentence; one specific CTA.
- Use sentence case for headings/buttons except short merchandise labels.
- Name brands, product types, sizes, cut-offs and locations when they are relevant.
- Avoid “elevate”, “unlock”, “journey”, “transformative”, “curated collection” and generic confidence language unless a real fact follows.
- Avoid “premium” as self-praise; demonstrate it through authentic products, service and presentation.
- Promotions state the saving/threshold and terms plainly. Delivery copy states postcode, cut-off and exceptions.
- Product descriptions start with what it is, who it suits and its primary benefit; marketing story comes after facts.

Example campaign copy: **Braiding hair from the brands you trust.** Pre-stretched, crochet and twists in the colours and lengths you need. CTA: **Shop braiding hair**.

## Part 12 — Mobile UX

### Breakpoint behaviour

| Width | Required layout |
|---|---|
| 375px | 16px gutters; two-column product grid with 12px gap; 44–48px controls; shortest announcement copy; persistent search. |
| 390px | Same system with slightly wider card copy. The current live page showed no horizontal overflow, but its hero occupied roughly 886px and should be shortened. |
| 430px | Two-column grid with more breathing room; do not switch to three columns. Category rail may show 2.5 tiles. |
| 600–899px tablet | Three-column PLP, two-column campaign/content layouts, filter drawer and full-width search. |
| 900–1279px desktop/tablet landscape | Four-column PLP, compact mega menu; lower-priority departments under More. |
| 1280px+ | Full visible department nav, four/five product columns and 1280–1360px max content. |

### Mobile-specific changes

1. Keep a full search input directly under the header. The current magnifying-glass icon is visible but still adds a step.
2. Replace the current shallow drawer links with drill-down department panels and a Back/View all pattern.
3. Shorten the hero to one specific campaign, one primary CTA and a smaller image/copy stack.
4. Put the quick category rail immediately after the hero; do not force customers through marquees before categories.
5. Keep product grids at two columns; product names, size and price must remain legible without 9–10px text.
6. Use a bottom-sheet filter with counts, internal scrolling and fixed Apply/Clear controls.
7. Preserve PLP scroll and filters when returning from a PDP.
8. Make variant selectors thumb-friendly and searchable for large shade lists.
9. Add the sticky PDP add-to-basket bar with safe-area padding; hide it when the actual add button is visible if testing shows duplicate clutter.
10. Basket lines use 80×100px product images, variant details, price, quantity and Remove without horizontal squeeze.
11. Checkout uses one column, address autocomplete where appropriate, large input labels and express payment only when genuinely configured.
12. Keep order summary collapsible but show total and delivery state without opening it.
13. Cookie consent must be compact, accessible and dismissible; it must not cover the entire first screen. Chat/WhatsApp stays out of the sticky CTA zone.
14. Footer groups become accessible accordions; Store and Contact remain open because they are trust content.
15. Avoid hover-only image/action dependencies. Tap once follows the product; actions have separate clear buttons.
16. Use native lazy loading and reserve media dimensions to avoid mobile layout shifts.
17. Test at 200% text zoom, landscape, reduced motion, VoiceOver/TalkBack and keyboard on tablet.

### Current mobile observations to preserve or fix

- Preserve: 390px header actions, no observed horizontal overflow, readable display type, accessible menu dialog and visible wishlist/basket counts.
- Fix: the current mobile hero is too tall; the generic image is not representative; category navigation is one link rather than a hierarchy; the drawer leaves a large unused lower area; Account/Wishlist/Bag buttons are visually small; WhatsApp overlaps the content layer; category/product discovery starts too late.

## Part 13 — Conversion improvements

### Concrete CRO programme

| Improvement | Customer problem solved | Business outcome | Measure | Guardrail |
|---|---|---|---|---|
| Visible predictive search | Known-item shoppers cannot move directly to a product. | Search conversion and revenue/session. | Search use, result CTR, zero results, add-to-basket and revenue after search. | Keep latency under an agreed threshold and suggestions relevant. |
| Delivery promise on PDP | “When will it arrive and how much?” is unanswered until late. | Higher PDP-to-cart and fewer checkout exits. | Estimator use, add-to-cart after estimate, delivery-related support contacts. | Never promise same-day outside verified postcode/cut-off rules. |
| Click & Collect availability | Local customers do not know whether the item is in Erith. | Store pickup revenue and reduced delivery friction. | Pickup selection, ready-time adherence, pickup completion. | Inventory and ready time must be store-specific. |
| Meaningful free-delivery threshold | Customers cannot optimise their basket toward a real benefit. | Higher average order value. | Threshold exposure, incremental items, AOV and margin. | Show only a current verified threshold; avoid manipulative countdowns. |
| Quick add / option sheet | Simple replenishment items require a PDP visit; complex items risk wrong variants. | Faster add-to-basket with fewer errors. | Quick-add success, option-sheet completion, variant error/return rate. | No default variant when colour/length materially matters. |
| Mini-basket with editable lines | Add feedback is weak and customers lose context. | Checkout starts and cross-sell engagement. | Cart opens, checkout clicks, removals and abandonment. | Do not auto-open on every repeated add if testing shows interruption. |
| Curated frequently bought together | Customers forget necessary complementary items. | Higher units/order and AOV. | Attach rate and return rate by bundle. | No preselected add-ons; compatibility rules required. |
| Back-in-stock alerts | Customers reach an unavailable desired item with no next step. | Demand capture and recovered revenue. | Alert signups, notification conversion and unsubscribe rate. | Real consent, expected timing and no false restock messages. |
| Genuine review programme | Shoppers lack proof about shade, texture and service. | Trust and conversion. | Review coverage, PDP engagement, conversion by review presence. | Verified source; moderate abuse, not criticism; never seed fake reviews. |
| Save wishlist across devices | Anonymous localStorage is lost on a new device. | Return visits and retention. | Save rate, sign-in merge, wishlist-to-purchase. | Explain persistence and privacy; avoid forced account creation. |
| Guest checkout and express address entry | Account and form friction delay payment. | Checkout completion. | Step abandonment, form errors, completion time. | Offer account creation after purchase, not as a gate. |
| Basket delivery preview | Delivery appears only at checkout. | Fewer surprise-cost exits. | Basket-to-checkout and shipping-related abandonment. | Use accurate rates/eligibility from the fulfilment system. |
| Product-page “Need advice?” | Complex hair/shade choices need human reassurance. | Assisted conversions and fewer returns. | Advice contacts, assisted revenue and first-response time. | Show store hours and expected response; no intrusive chat pop-up. |
| Recently viewed | Comparison shoppers lose their path. | More PDP revisits and recovery. | Rail CTR and conversion after return. | Session/account-based and easy to clear. |
| Replenishment / buy again | Regular hair and body products are recurring. | Retention and lower repeat-purchase friction. | Buy-again usage and repeat order interval. | P2 until real order history exists. |

### Funnel instrumentation

Implement a privacy-conscious event taxonomy before optimisation:

- view_item_list with list/category and position;
- select_item;
- search, view_search_results and zero_results;
- view_item and select_variant;
- add_to_wishlist;
- add_to_cart, remove_from_cart and view_cart;
- begin_checkout, add_shipping_info, add_payment_info and purchase;
- select_click_collect / delivery_estimate;
- promotion_view / promotion_select;
- contact_advice with channel, without recording message content.

Segment by device, new/returning, acquisition channel, category, search use, fulfilment choice and stock state. Establish a baseline before A/B testing. Do not optimise button colour while checkout, data integrity and discovery remain unresolved.

### Trust implementation

- Product page: stock, delivery estimate, return eligibility and verified review count.
- Basket: delivery threshold, Click & Collect availability, subtotal and accurate exclusions.
- Checkout: accepted payment methods rendered by the real provider, privacy/security and full total before payment.
- Footer/help: legal business name, company number if applicable, address, phone, email, opening hours, returns and delivery.
- Store page: real exterior/interior/staff images, map/directions, transport/parking information if useful and current hours.
- Reviews: link to the real review source; product and store review contexts stay separate.

## Part 14 — SEO and performance

### SEO actions

1. **Unique route metadata.** Add product, category, brand, article, store and policy-specific titles/descriptions. The current product route inherits the homepage title in the live audit. Use concise names such as “X-Pression Pre-Stretched Braiding Hair | A-Glory” rather than stuffed titles. Next.js supports static metadata, dynamic generateMetadata and file-based metadata such as Open Graph images, robots and sitemaps: [Next.js metadata guidance](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).
2. **Crawlable hierarchy.** Link menu → category → subcategory → every indexable product with real anchor elements. Google explicitly recommends crawlable category-to-subcategory-to-product links and notes that crawlers generally do not submit site search forms: [Google ecommerce site structure](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure).
3. **Category pages.** Use one H1, concise edited intro, useful subcategory links, products and a short below-grid guide/FAQ. Do not reproduce Paks/Beautizone-style keyword paragraphs.
4. **Brand pages.** Unique brand introduction, authorised logo/creative, relevant categories, in-stock products, internal links and canonical brand URL. Avoid duplicate vendor/brand routes.
5. **Product data.** Put price, currency, availability, SKU/GTIN where valid, brand and variant information in initial HTML. Merchant listing markup is intended for pages where shoppers can directly purchase, and Google recommends product data in initial HTML: [Google merchant listing guidance](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing).
6. **Structured data.** Product/Offer or ProductGroup/variants as supported; BreadcrumbList; Organization; and the most accurate LocalBusiness subtype. The current BeautySalon type is wrong for a retailer. Google recommends the most specific local-business type and useful real-world fields: [LocalBusiness guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization).
7. **Reviews schema.** Emit AggregateRating/Review only when the same genuine reviews are visible on that product page and comply with platform rules. Never mark up the prototype ratings or self-authored store testimonials.
8. **Sitemap and robots.** Add app/sitemap.ts and app/robots.ts, include canonical products/categories/brands/articles/store, exclude basket/checkout/account/search/filter combinations and keep lastModified real. Next 16 provides metadata routes for robots and sitemap generation: [robots.txt convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots), [sitemap generation](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps).
9. **Faceted navigation.** Canonical category pages remain indexable. Most sort/filter parameter combinations should be noindex or controlled through crawl rules while still usable; allow selected high-value landing pages only when curated and unique. Do not canonical every paginated page to page one if it hides product discovery.
10. **Pagination.** Use crawlable numbered pages/Next/Previous URLs. Load-more may enhance the UI but all products need discoverable links.
11. **Variants.** Choose a consistent URL/canonical strategy. If variants have meaningful independent search demand and media/availability, use unique URLs and ProductGroup relationships; otherwise use one canonical PDP with stateful variant parameters.
12. **Local SEO.** Correct NAP data everywhere, use a real retailer subtype, create a strong Store page, keep Google Business Profile details aligned and link directions. Include openingHoursSpecification, geo/map only if accurate and real store imagery.
13. **Merchant Center.** Provide a feed matching on-page price, availability, shipping and returns. Validate the site is purchasable before launch. Google’s ecommerce launch guidance includes Search Console, sitemap, Merchant Center and physical-business establishment: [launch guidance](https://developers.google.com/search/docs/specialty/ecommerce/how-to-launch-an-ecommerce-website).
14. **Alt text.** Product image alt identifies product, variant and view when useful: “X-Pression Ultra Braid 1B, front pack”. Decorative campaign texture uses empty alt. Do not repeat keyword strings.
15. **Content.** Build advice from real customer questions: packs needed for braids, choosing wig fibre, caring for protective styles, colour safety and routines. Each article is expert-reviewed, dated, internally linked and connected to relevant products/categories.

### Performance actions

| Action | Current issue | Recommendation |
|---|---|---|
| Optimise product/campaign images | next.config.ts globally disables optimisation; raw img tags request 900–1200px Unsplash assets and homepage images default to loading auto. | Use an image CDN plus Next Image or a documented commerce image loader, strict remotePatterns, width/height or fill with sizes, AVIF/WebP, and quality by asset class. Next Image provides responsive sizing, lazy loading and layout stability: [Next.js image guidance](https://nextjs.org/docs/app/getting-started/images). |
| Prioritise only the LCP asset | Many homepage images can compete early. | Give the single desktop/mobile hero LCP asset high fetch priority; lazy-load below-fold category/editorial/product images. Do not preload every possible carousel slide. |
| Separate mobile art | Desktop crops waste bytes and miss the subject on phones. | Provide independent mobile 4:5 campaign assets via responsive source/art direction. |
| Reserve space | Raw images can shift layout. | Fixed aspect ratios plus intrinsic dimensions for every image/video/logo. |
| Optimise fonts | Playfair is loaded through CSS @import; Satoshi is local. | Self-host or use Next font loading for both, subset weights, limit Playfair variants and preconnect only when necessary. Next’s production checklist recommends the Font Module to remove external requests and reduce layout shift: [Next production checklist](https://nextjs.org/docs/app/guides/production-checklist). |
| Reduce client JavaScript | SiteChrome and the large route-ui.tsx make broad client surfaces; catalogue/filter/search are client-side arrays. | Keep static content/server-rendered where possible, isolate interactive islands, dynamically load quick-option, review and recommendation widgets, and avoid shipping entire catalogue data to the browser. |
| Search performance | In-memory substring filtering cannot scale. | Server/search-service results, 100–150ms debounce, request cancellation, cached popular results and a strict response budget. Render a usable search results route server-side for sharing/index control. |
| Product-grid performance | Large grids risk DOM and image cost. | Paginate, lazy-load images, minimise observers and avoid full DOM virtualisation that harms restoration/SEO unless carefully enhanced. |
| Third-party governance | Competitors show the harm of review/chat/cookie overlays. | Maintain a script register, consent categories, load marketing after consent, lazy-load reviews/chat, and set size/CPU budgets. |
| Caching/data | Static export is fresh only at build time. | Select a rendering/caching strategy based on real inventory SLAs. Cache category/brand content, but price/availability/cart must be correct at decision time. |
| Monitoring | No measurement is present. | Real-user LCP, INP and CLS by page type/device plus synthetic checks in CI. Target the current “good” thresholds at the 75th percentile: LCP ≤2.5s, INP ≤200ms and CLS ≤0.1: [Core Web Vitals](https://web.dev/articles/vitals). |

Suggested performance budgets for the initial launch: mobile LCP image under 200–250KB where quality permits; no below-fold image eager loading; initial route JavaScript budget agreed per template; zero unexpected layout shift from media; search suggestions visibly respond within 300ms under normal UK mobile conditions. Validate with field data rather than treating lab scores as the only truth.

## Part 15 — Priority roadmap

### Feature priority matrix

| Feature | User benefit | Business benefit | Effort | Priority | Dependencies |
|---|---|---|---|---|---|
| Real catalogue/variant source | Accurate product, price, stock and options | Sellable inventory and operations | Large | P0 | Commerce/POS decision, data migration |
| Production cart and checkout | Complete a genuine secure purchase | Revenue capture | Large | P0 | Commerce backend, payments, tax/shipping |
| Remove fabricated reviews/testimonials | Honest experience | Trust/compliance | Small | P0 | None |
| Real product/brand/store media | Confident product identification | Conversion and fewer returns | Large | P0 | Asset rights, catalogue data |
| Authentication/account/order history | Access orders and saved details | Retention/support reduction | Large | P0 | Identity and commerce customer model |
| Catalogue-backed mega menu/mobile drill-down | Reach exact department quickly | Discovery and SEO | Medium | P0 | Final taxonomy, product mapping |
| Global predictive search | Find known items/brands despite spelling variation | Search revenue | Large | P0 | Search index, synonyms, analytics |
| Category-aware PLP facets | Narrow large ranges | Conversion/catalogue reach | Large | P0 | Product attributes, search/filter service |
| Production PDP variant/gallery system | Choose correct product/variant | Add-to-cart and fewer returns | Large | P0 | Product data/media/inventory |
| Delivery/Click & Collect rules | Know cost/time before payment | Checkout completion/local sales | Large | P0 | Fulfilment zones, store inventory, carriers |
| Accurate delivery/returns pages | Clear policy | Trust/support reduction | Small | P0 | Legal/operational approval |
| Route metadata, schemas, sitemap, robots | Better search discovery | Organic traffic | Medium | P0 | Canonical data and production domain |
| Accessibility completion | Shop with keyboard/screen reader/zoom | Reach, compliance and usability | Medium | P0 | Final components/content |
| Error/loading/empty states | Recover from failures | Lower funnel loss | Medium | P0 | Real APIs |
| Analytics and consent | Privacy-respecting measurement | Optimisation and attribution | Medium | P0 | Analytics/legal choices |
| Official palette/token migration | Strong A-Glory recognition | Brand equity | Medium | P1 | Approved design tokens/assets |
| Homepage merchandising rebuild | Faster discovery | Product views and campaign revenue | Medium | P1 | Collections, media, CMS/merch tools |
| Quick add/option sheet | Faster shopping | Add-to-basket | Medium | P1 | Variant/cart APIs |
| Verified reviews | Purchase confidence | Conversion/retention | Medium | P1 | Review provider and migration |
| Frequently bought together | Complete routine | AOV | Medium | P1 | Merch rules/catalogue relationships |
| Brand A–Z/search/landing pages | Brand-led discovery | Catalogue penetration/SEO | Medium | P1 | Clean brand entities/assets |
| Back-in-stock alerts | Recover unavailable demand | Revenue recovery | Medium | P1 | Inventory events, messaging consent |
| Recently viewed | Resume comparison | PDP return/conversion | Small | P1 | Consent/session/account state |
| Concern/hair-type landing pages | Guidance for uncertain shoppers | Discovery/SEO | Medium | P1 | Governed attributes, expert content |
| Ingredient discovery | Shop familiar formulas | Discovery/cross-sell | Medium | P1 | Normalised ingredients, product count audit |
| Basket threshold/cross-sell | Understand delivery value | AOV | Small/Medium | P1 | Accurate shipping threshold/rules |
| Store locator/content enhancement | Strong local confidence | Footfall/pickup | Small/Medium | Real photography and verified details |
| Loyalty/referrals | Repeat value | Retention | Large | P2 | Accounts, order history, economics |
| Guided hair/beauty finder | Guided selection | Discovery/data | Large | P2 | Sufficient catalogue attributes, validation |
| Personalised recommendations | More relevant products | AOV/retention | Large | P2 | Traffic, consent, event history |
| Subscription/replenishment | Easier repeat purchase | Predictable revenue | Large | P2 | Suitable SKUs, payment/operations |
| Advanced bundles | Faster routine building | AOV | Medium/Large | P2 | Inventory and bundle fulfilment |
| Video consultations/live shopping | Human advice | Assisted conversion | Large | P2 | Staffing, scheduling, content |

### Phase 1 — Critical ecommerce foundation

**Objective:** make every public promise and transaction real.

- Confirm commerce/POS source of truth, payments, customer accounts, shipping zones, local same-day rules, Click & Collect and returns.
- Remove all fabricated ratings, testimonials, fake customer names, demo payment buttons and simulated success states.
- Import/clean real products, variants, inventory, prices, descriptions, ingredients and media.
- Implement production cart, checkout handoff, order confirmation, authentication and order history.
- Implement the primary taxonomy, crawlable category routes, core filters and visible global search.
- Add route metadata, canonical strategy, sitemap/robots and accurate Product/Breadcrumb/LocalBusiness data.
- Complete accessibility for navigation, forms, variant selectors, drawer focus and errors.
- Establish analytics/consent and CI verification.

**Exit criteria:** a customer can find a real SKU, select a real variant, see accurate fulfilment, pay, receive confirmation, retrieve the order and contact the real store. No prototype data is presented as fact.

### Phase 2 — Merchandising and product discovery

**Objective:** help customers find and combine products quickly.

- Full mega menu and mobile drill-down.
- Category-specific facet system, applied states and preserved history.
- Predictive search with synonyms, typo tolerance and zero-result reporting.
- Rebuilt cards, quick option sheet, mini-basket and delivery threshold.
- Bestsellers/new/back-in-stock collections and brand A–Z.
- Verified reviews, recently viewed, back-in-stock and curated complementary products.
- Homepage rebuilt around products, protective styling, concerns and local fulfilment.

### Phase 3 — Brand/editorial experience

**Objective:** make A-Glory unmistakable without slowing commerce.

- Official navy/mauve token migration and component-level visual QA.
- Commission/collect real product, store, staff and representative campaign photography.
- Concern, hair type and approved ingredient landing pages.
- Seasonal campaign system, brand spotlights and expert beauty advice.
- Enhanced Erith store page and verified local proof.
- Reusable campaign variants and merchandising calendar for Christmas, Mother’s Day, summer hair, festival beauty, back-to-school/kids hair, Black History Month and local Erith promotions.

### Phase 4 — Optimisation and advanced functionality

**Objective:** improve retention and efficiency from evidence.

- Funnel and search optimisation from real data.
- A/B tests on hierarchy, fulfilment presentation and cross-sells.
- Guided finder only after attribute quality and qualitative user testing.
- Loyalty, replenishment, personalised recommendations and advanced bundles where economics support them.
- Ongoing accessibility, performance, SEO and merchandising audits.

## Part 16 — Implementation plan

### Recommended target architecture

Keep Next.js App Router and the current visual shell, but place all commerce operations behind the existing CommerceCatalog/CommerceCart concept in lib/commerce-contract.ts. The missing decision is the source of truth. If Shopify is selected—as the prototype copy suggests—use its catalogue/customer/cart capabilities and hosted checkout rather than simulating payment UI. If A-Glory already has a POS/ERP or another commerce platform, implement the same adapter boundary for that system. Do not choose a database merely to preserve the current prototype shape.

Recommended layers:

- **Commerce provider:** products, variants, collections, price, inventory, cart, checkout, customer and orders.
- **Search index:** derived governed product records, synonyms, typo tolerance and analytics.
- **Content/merchandising:** campaign slots, navigation configuration, brand stories, guides and store/policy content; use the commerce CMS if adequate or a small dedicated CMS.
- **Media CDN:** authorised product/brand/store assets with responsive transformations.
- **Reviews:** verified provider or commerce-native system.
- **Analytics/consent:** one controlled data layer and consent-aware third parties.

### Keep, refactor, replace and add

| Decision | Current file/component | Recommendation |
|---|---|---|
| Keep | [lib/commerce-contract.ts](/Users/desco/Desktop/projects/aglory/lib/commerce-contract.ts) | Keep the adapter idea; expand types for variants, money, inventory, collections, pagination, filters, cart IDs and errors. |
| Keep | [components/ui/navigation-menu.tsx](/Users/desco/Desktop/projects/aglory/components/ui/navigation-menu.tsx) | Keep only if its keyboard/focus behaviour passes the new accessible mega-menu tests. |
| Keep/evolve | [components/brand-marque.tsx](/Users/desco/Desktop/projects/aglory/components/brand-marque.tsx) | Reuse at most once or replace with a static brand grid; repeated marquees are decorative noise. |
| Refactor | [components/site-chrome.tsx](/Users/desco/Desktop/projects/aglory/components/site-chrome.tsx) | Split into AnnouncementBar, DesktopHeader, PredictiveSearch, DepartmentNav, MegaMenu, MobileMenu, Newsletter and Footer. Drive links/content from configuration/CMS. |
| Refactor | [components/product-card.tsx](/Users/desco/Desktop/projects/aglory/components/product-card.tsx) | Add real variant/media/rating/stock types, quick option sheet and error feedback; remove generic stock/tag logic. |
| Refactor | [components/product-detail.tsx](/Users/desco/Desktop/projects/aglory/components/product-detail.tsx) | Split Gallery, PurchasePanel, VariantSelector, FulfilmentEstimator, ProductInformation, Reviews, FBT and related rails. Structured data should use production URLs and real variant offers. |
| Refactor | [components/route-ui.tsx](/Users/desco/Desktop/projects/aglory/components/route-ui.tsx) | Break the 1,200+ line client file into page-domain modules. Keep shared empty states and form primitives; fetch data outside broad client components. |
| Refactor | [app/globals.css](/Users/desco/Desktop/projects/aglory/app/globals.css) | Replace prototype variables with official tokens, remove duplicate/obsolete rule blocks, and split token/base/component/page CSS or adopt a disciplined Tailwind/component-token approach. Preserve unrelated user work. |
| Refactor | [lib/storefront-context.tsx](/Users/desco/Desktop/projects/aglory/lib/storefront-context.tsx) | Retain a UI-facing cart/wishlist interface but back it with commerce IDs/API state; add pending/error/optimistic rollback and account merge. |
| Replace | [lib/store-data.ts](/Users/desco/Desktop/projects/aglory/lib/store-data.ts) | Remove production dependence on sample arrays/Unsplash. Optional fixtures belong in test/fixture files and must be unmistakably non-production. |
| Replace | [components/auth-ui.tsx](/Users/desco/Desktop/projects/aglory/components/auth-ui.tsx) | Integrate real sign-in, registration, reset, verification and errors. Remove simulated completion. |
| Replace | Checkout portion of [components/route-ui.tsx](/Users/desco/Desktop/projects/aglory/components/route-ui.tsx) | Use real checkout/handoff. Never reproduce provider-branded buttons manually. |
| Replace | Testimonial block in [app/page.tsx](/Users/desco/Desktop/projects/aglory/app/page.tsx:372) | Remove immediately; later render verified review/store data or the honest local-store module. |
| Replace | Google favicon brand assets in [app/page.tsx](/Users/desco/Desktop/projects/aglory/app/page.tsx) and route UI | Store authorised logos with correct dimensions and guidelines. |
| Add | components/search/PredictiveSearch.tsx and SearchResults.tsx | Shared global search UI with grouped states, keyboard support and analytics. |
| Add | components/navigation/DepartmentMegaMenu.tsx and MobileDepartmentMenu.tsx | Data-driven, accessible department navigation. |
| Add | components/catalog/FilterSidebar.tsx, FilterDrawer.tsx, AppliedFilters.tsx, SortSelect.tsx and Pagination.tsx | One facet system across collection/search/brand pages. |
| Add | components/cart/MiniBasket.tsx, DeliveryThreshold.tsx and CartRecommendations.tsx | Clear add feedback and basket progress. |
| Add | components/product/FulfilmentEstimator.tsx, ProductGallery.tsx, VariantSelector.tsx and PurchasePanel.tsx | Product-type-aware decision support. |
| Add | components/store/StoreProof.tsx and app/store/page.tsx | Real Erith store destination with verified content. |
| Add | app/sitemap.ts, app/robots.ts and route metadata generation | Crawl/index control and unique snippets. |
| Add | tests for search, filters, variants, cart, checkout handoff, auth, keyboard menus and responsive flows | Launch safety. |

### Page-by-page recommendations

| Page | Keep | Change / add | Customer problem and business outcome |
|---|---|---|---|
| 1. Homepage | Editorial typography, local store story, restrained surfaces. | Use the 14-module structure in Part 6, real imagery/data, shorter mobile hero, product-first campaigns and no fabricated testimonials. | Faster route to products; higher engagement and trust. |
| 2. Shop landing | Broad category concept. | Make /shop a department hub with visual departments, top brands, concerns and promotions; “All products” remains a separate PLP. | A mixed catalogue needs orientation, not 11 undifferentiated cards. |
| 3. Category page | H1, intro, sort and grid. | Breadcrumbs, subcategories, real facets, pagination, applied filters, category merchandising and concise expert content. | Scalable discovery and indexation. |
| 4. Search results | Grouped product/category/brand concept. | Global search, URL query, corrections, suggested terms, filters, result type groups and zero-result analytics. | Known-item conversion and recovery from errors. |
| 5. Brand directory | Featured brand and A–Z intent. | Search field, actual A–Z anchors, featured/trending/recent groups and authorised assets. | Faster brand loyalty path and breadth signal. |
| 6. Brand page | Existing route shape. | Brand story, category shortcuts, in-stock product PLP, relevant filters, bestsellers and advice. | Brand-led conversion and SEO. |
| 7. Product page | Purchase-before-education order and sticky mobile CTA. | Full Part 10 specification with real gallery, variants, fulfilment, reviews and cross-sell. | Confidence, AOV and fewer returns. |
| 8. Wishlist | Simple empty state and product grid. | Account persistence, anonymous merge, stock/price changes, add selected/individual to basket and sharing only if demanded. | Return visits and saved-intent conversion. |
| 9. Basket/cart | Editable quantity/remove/subtotal. | Mini-basket, variant links, delivery threshold, fulfilment preview, promo code at the appropriate step, estimated total and curated complements. | Fewer surprises and stronger checkout starts/AOV. |
| 10. Account | Overview/order/wishlist concepts. | Real authentication, orders, tracking, addresses, returns, profile and buy again; plain utility typography. | Self-service, retention and lower support cost. |
| 11. Blog / Beauty Advice | Culturally aware topic direction. | Expert ownership, real author bios, categories/search, updated dates, product/category links and no synthetic filler. | Trust, useful organic traffic and assisted discovery. |
| 12. Contact/store | Phone, WhatsApp, email, address and hours. | Real form delivery, confirmation/reference, map, directions, store photos, accessibility/parking/transit notes if useful and response expectations. | Local confidence, footfall and fewer failed contacts. |
| 13. Delivery and returns | Separate factual sections. | Exact zones, thresholds, cut-offs, carriers, collection process, hygienic exclusions, refund timings and clear contact route; legally review. | Lower anxiety, disputes and support load. |
| 14. Mobile menu | Accessible modal shell and utility links. | Drill-down categories, persistent external search, Back/View all, Offers/New/Bestsellers, focus restoration and compact store/help area. | Mobile catalogue reach without overwhelming one list. |

### Implementation sequence at component level

1. Freeze/remediate public prototype claims: delete fabricated testimonials/ratings and clearly disable demo checkout if the production integration is not ready.
2. Define Product, Variant, Collection, Brand, Inventory, Money, Fulfilment and Review schemas; clean a representative migration set across shampoo, braiding hair, wig, colour, skincare and makeup.
3. Implement the commerce adapter and server data access; build contract tests against staging.
4. Build design tokens and shared primitives without changing every page at once.
5. Implement header/search/navigation, then PLP/card, then PDP/cart/checkout—the core discovery-to-purchase vertical slice.
6. Connect accounts, wishlist, reviews, store/help and content.
7. Migrate homepage campaigns after real collections and assets exist.
8. Complete SEO metadata/schema/sitemaps and performance optimisation.
9. Run launch verification across 375, 390, 430, tablet, desktop and wide desktop, plus keyboard and assistive technology.

### Verification and launch gates

- Restore dependencies; lint currently cannot run because eslint is unavailable in node_modules.
- Typecheck, lint and production build on every change.
- Unit tests for money, variant availability, filter query encoding, search synonyms and fulfilment rules.
- Integration tests for cart persistence/merge, checkout handoff, login, wishlist and back-in-stock consent.
- Browser tests: product search → filter → PDP → variant → add → basket → delivery → checkout, plus Click & Collect and error recovery.
- Visual regression at the requested widths, with long names, large prices, sale states, out-of-stock, many shades and empty categories.
- Accessibility: automated checks plus keyboard/VoiceOver/TalkBack/manual zoom; accessible name and focus checks for every icon/drawer.
- SEO: rendered metadata, canonicals, robots, sitemap, structured-data validation and Merchant Center feed parity.
- Performance: representative home/PLP/PDP/cart/checkout routes on mid-tier mobile and real-user monitoring.
- Content/operations sign-off: all prices, inventory, delivery, returns, contact details, hours, promotions, reviews and photography are genuine and approved.

### Final recommendation

Do not redesign the site from zero. Keep the disciplined typography, modest radii, product-card hierarchy, local-store presence and purchase-first PDP order. Replace the prototype commerce/data layer, shallow navigation, generic imagery, fabricated proof and off-brand tokens. Only after customers can reliably find, choose and buy real products should A-Glory invest in richer campaigns, concern/ingredient discovery and personalisation.

That order follows the required hierarchy: **clarity → discovery → trust → conversion → brand personality → visual decoration.**
