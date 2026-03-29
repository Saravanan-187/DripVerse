import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products, categories, genders, Product } from "@/data/products";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const genderMatch =
      selectedGender === "All" ||
      product.gender === selectedGender.toLowerCase() ||
      product.gender === "unisex";
    return categoryMatch && genderMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.priceNum - b.priceNum;
      case "price-high":
        return b.priceNum - a.priceNum;
      case "newest":
        return a.isNew ? -1 : 1;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Banner */}
        <div className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
              Shop All
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover our curated collection of everyday essentials
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 md:px-8 py-8 border-b border-border/50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-6">
              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Category
                </span>
                <div className="flex gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-sm px-3 py-1.5 transition-colors ${
                        selectedCategory === cat
                          ? "bg-foreground text-background"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Gender
                </span>
                <div className="flex gap-2">
                  {genders.map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className={`text-sm px-3 py-1.5 transition-colors ${
                        selectedGender === g
                          ? "bg-foreground text-background"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-transparent border border-border px-3 py-2 focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => (
  <WishlistProductCard product={product} />
);

const WishlistProductCard = ({ product }: { product: Product }) => {
  const { isInWishlist, toggleItem } = useWishlist();
  const { toast } = useToast();
  const saved = isInWishlist(product.id);

  return (
    <Link to={`/product/${product.id}`} className="group cursor-pointer">
      <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-muted/50 hover-lift">
        <img
          src={product.image}
          alt={`${product.name} - ${product.category}`}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-foreground text-background text-[10px] uppercase tracking-widest px-2 py-1">
            New
          </span>
        )}
        {product.isSale && (
          <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-[10px] uppercase tracking-widest px-2 py-1">
            Sale
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white hover:bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg"
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const added = await toggleItem(product.id);
            const hasToken = Boolean(localStorage.getItem("token"));
            if (!hasToken) return;
            toast({
              title: added ? "Added to wishlist" : "Removed from wishlist",
              description: `${product.name} ${added ? "is saved for later." : "was removed from your wishlist."}`,
            });
          }}
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-current text-red-500" : ""}`} />
        </Button>
      </div>
      <div className="space-y-2">
        <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.15em] font-medium">
          {product.category}
        </p>
        <h3 className="text-sm md:text-base font-medium leading-tight group-hover:text-primary/80 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          {product.isSale && product.salePrice ? (
            <>
              <p className="text-sm md:text-base font-semibold text-destructive">{product.salePrice}</p>
              <p className="text-sm text-muted-foreground line-through">{product.price}</p>
            </>
          ) : (
            <p className="text-sm md:text-base font-semibold tracking-tight">{product.price}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Shop;
