import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { useScrollReveal } from "@/hooks/useParallax";

const ProductGrid = () => {
  const headingReveal = useScrollReveal(0.2);
  const gridReveal = useScrollReveal(0.05);

  return (
    <section id="trending" className="container mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
      <div
        ref={headingReveal.ref}
        className={`flex items-center justify-between mb-12 md:mb-16 parallax-reveal ${headingReveal.isVisible ? "is-visible" : ""}`}
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Curated Selection</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Trending Now</h2>
        </div>
        <Link
          to="/shop"
          className="text-xs md:text-sm font-medium uppercase tracking-wider hover:text-muted-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:scale-x-100 hover:after:scale-x-0 after:transition-transform after:origin-right hover:after:origin-left"
        >
          View All
        </Link>
      </div>
      <div
        ref={gridReveal.ref}
        className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10 parallax-stagger ${gridReveal.isVisible ? "is-visible" : ""}`}
      >
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
