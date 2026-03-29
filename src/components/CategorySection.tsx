import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import menImage from "@/assets/men-collection.jpg";
import womenImage from "@/assets/women-collection.jpg";
import { use3DTilt, useScrollReveal } from "@/hooks/useParallax";

const CategoryCard = ({
  to,
  image,
  alt,
  label,
  delay,
}: {
  to: string;
  image: string;
  alt: string;
  label: string;
  delay: number;
}) => {
  const tilt = use3DTilt(10);
  const reveal = useScrollReveal(0.1);

  return (
    <div
      ref={(el) => {
        // Combine refs
        (reveal.ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (tilt.ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className={`parallax-reveal-scale ${reveal.isVisible ? "is-visible" : ""}`}
      style={{
        ...tilt.style,
        transitionDelay: reveal.isVisible ? `${delay}ms` : "0ms",
      }}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
    >
      <Link
        to={to}
        className="group relative overflow-hidden aspect-[3/4] cursor-pointer block rounded-sm"
      >
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tighter transform transition-transform duration-500 group-hover:scale-105">
            {label}
          </h3>
          <Button className="bg-white text-black hover:bg-white/95 font-medium tracking-wide uppercase text-xs md:text-sm px-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
            Explore Collection
          </Button>
        </div>
      </Link>
    </div>
  );
};

const CategorySection = () => {
  const headingReveal = useScrollReveal(0.2);

  return (
    <section className="container mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
      {/* Section heading with reveal */}
      <div
        ref={headingReveal.ref}
        className={`text-center mb-12 md:mb-16 parallax-reveal ${headingReveal.isVisible ? "is-visible" : ""}`}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Shop by Category
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
          Find Your Style
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
        <CategoryCard
          to="/collections/women"
          image={womenImage}
          alt="Women's fashion collection - casual and trendy styles"
          label="WOMEN"
          delay={0}
        />
        <CategoryCard
          to="/collections/men"
          image={menImage}
          alt="Men's fashion collection - casual and trendy styles"
          label="MEN"
          delay={150}
        />
      </div>
    </section>
  );
};

export default CategorySection;
