import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/context/WishlistContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);
  const { addItem } = useCart();
  const { toast } = useToast();
  const { isInWishlist, toggleItem } = useWishlist();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/shop" className="text-muted-foreground hover:text-foreground underline">
            Return to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Choose a size and color before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = async () => {
    const hasToken = Boolean(localStorage.getItem("token"));
    const added = await toggleItem(product.id);
    if (!hasToken) return;

    toast({
      title: added ? "Added to wishlist" : "Removed from wishlist",
      description: `${product.name} ${added ? "has been added to your wishlist." : "has been removed from your wishlist."}`,
    });
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>

        {/* Product Section */}
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Image */}
            <div className="relative aspect-[3/4] bg-muted/50 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-6 left-6 bg-foreground text-background text-xs uppercase tracking-widest px-3 py-1.5">
                  New
                </span>
              )}
              {product.isSale && (
                <span className="absolute top-6 left-6 bg-destructive text-destructive-foreground text-xs uppercase tracking-widest px-3 py-1.5">
                  Sale
                </span>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                {product.isSale && product.salePrice ? (
                  <>
                    <span className="text-2xl font-semibold text-destructive">{product.salePrice}</span>
                    <span className="text-lg text-muted-foreground line-through">{product.price}</span>
                  </>
                ) : (
                  <span className="text-2xl font-semibold">{product.price}</span>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div className="border border-border/60 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">Category</p>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div className="border border-border/60 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">Fit</p>
                  <p className="font-medium capitalize">{product.gender}</p>
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.15em] mb-3">
                  Color: <span className="text-muted-foreground">{selectedColor || "Select"}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm border transition-colors ${selectedColor === color
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.15em] mb-3">
                  Size: <span className="text-muted-foreground">{selectedSize || "Select"}</span>
                </p>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 text-sm border transition-colors ${selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-8">
                <p className="text-xs uppercase tracking-[0.15em]">Quantity</p>
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 h-14 text-sm uppercase tracking-widest"
                >
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14" onClick={handleAddToWishlist}>
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-current text-red-500" : ""}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 border-t border-border/50">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-12">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-muted/50 hover-lift">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mb-1">
                    {p.category}
                  </p>
                  <h3 className="text-sm font-medium">{p.name}</h3>
                  <p className="text-sm font-semibold">{p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
