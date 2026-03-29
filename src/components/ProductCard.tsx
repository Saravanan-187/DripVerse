import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/hooks/use-toast";
import { use3DTilt } from "@/hooks/useParallax";

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: string;
}

const ProductCard = ({ id, image, name, price, category, isNew = false, isSale = false, salePrice }: ProductCardProps) => {
  const { isInWishlist, toggleItem } = useWishlist();
  const { toast } = useToast();
  const saved = isInWishlist(id);
  const tilt = use3DTilt(8);

  return (
    <div
      ref={tilt.ref}
      style={tilt.style}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      className="parallax-3d-card"
    >
      <Link to={`/product/${id}`} className="group cursor-pointer block">
        <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-muted/50">
          <img
            src={image}
            alt={`${name} - ${category}`}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
          {isNew && (
            <span className="absolute top-4 left-4 bg-foreground text-background text-[10px] uppercase tracking-widest px-2 py-1">
              New
            </span>
          )}
          {isSale && (
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
              const added = await toggleItem(id);
              const hasToken = Boolean(localStorage.getItem("token"));
              if (!hasToken) return;
              toast({
                title: added ? "Added to wishlist" : "Removed from wishlist",
                description: `${name} ${added ? "is saved for later." : "was removed from your wishlist."}`,
              });
            }}
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-current text-red-500" : ""}`} />
          </Button>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.15em] font-medium">{category}</p>
          <h3 className="text-sm md:text-base font-medium leading-tight group-hover:text-primary/80 transition-colors">{name}</h3>
          {isSale && salePrice ? (
            <div className="flex items-center gap-2">
              <p className="text-sm md:text-base font-semibold text-destructive">{salePrice}</p>
              <p className="text-sm text-muted-foreground line-through">{price}</p>
            </div>
          ) : (
            <p className="text-sm md:text-base font-semibold tracking-tight">{price}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
