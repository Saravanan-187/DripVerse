import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products, Product } from "@/data/products";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/hooks/use-toast";

const Sale = () => {
  const saleProducts = products.filter((p) => p.isSale);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <div className="bg-destructive/10 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <span className="inline-block bg-destructive text-destructive-foreground text-xs uppercase tracking-widest px-4 py-2 mb-6">
              Limited Time
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
              End of Season Sale
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Up to 50% off on selected styles. Don't miss out on these incredible deals.
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          {saleProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No sale items at the moment.</p>
              <Link to="/shop">
                <Button variant="outline">Shop All Products</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
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
        <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-[10px] uppercase tracking-widest px-2 py-1">
          Sale
        </span>
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
          <p className="text-sm md:text-base font-semibold text-destructive">{product.salePrice}</p>
          <p className="text-sm text-muted-foreground line-through">{product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Sale;
