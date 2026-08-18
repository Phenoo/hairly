const marqueeItems = [
  "A-Glory Hair and Cosmetics",
  "Beauty made brilliantly personal",
  "Hair · Skin · Makeup",
  "Curated in Erith",
  "Every texture · Every tone · Every ritual",
];

export function BrandMarquee() {
  return (
    <section className="brand-marquee" aria-label="A-Glory highlights">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" aria-hidden={copy === 1} key={copy}>
            {marqueeItems.map((item) => (
              <span key={`${copy}-${item}`}>
                {item}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
