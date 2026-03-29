import { ShoppingBag, Search, User, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { items } = useWishlist();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-xl md:text-2xl font-bold tracking-[-0.03em]">DRIPVERSE</Link>
          </div>

          <nav className="hidden md:flex items-center space-x-10">
            <Link to="/collections/women" className="text-xs uppercase tracking-[0.2em] font-medium hover:text-muted-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-foreground after:transition-all hover:after:w-full">
              Women
            </Link>
            <Link to="/collections/men" className="text-xs uppercase tracking-[0.2em] font-medium hover:text-muted-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-foreground after:transition-all hover:after:w-full">
              Men
            </Link>
            <Link to="/new" className="text-xs uppercase tracking-[0.2em] font-medium hover:text-muted-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-foreground after:transition-all hover:after:w-full">
              New
            </Link>
            <Link to="/sale" className="text-xs uppercase tracking-[0.2em] font-medium hover:text-muted-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-foreground after:transition-all hover:after:w-full">
              Sale
            </Link>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-3">
            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-muted/50 transition-colors">
              <Search className="h-4 w-4" />
            </Button>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-muted/50 transition-colors relative">
                <Heart className="h-4 w-4" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-[10px] flex items-center justify-center rounded-full">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link to={localStorage.getItem('token') ? "/account" : "/login"}>
              <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-muted/50 transition-colors">
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-muted/50 transition-colors">
                <ShoppingBag className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-[10px] flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-muted/50 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-6 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/collections/women" className="text-sm uppercase tracking-[0.15em] font-medium" onClick={() => setIsMenuOpen(false)}>Women</Link>
              <Link to="/collections/men" className="text-sm uppercase tracking-[0.15em] font-medium" onClick={() => setIsMenuOpen(false)}>Men</Link>
              <Link to="/new" className="text-sm uppercase tracking-[0.15em] font-medium" onClick={() => setIsMenuOpen(false)}>New</Link>
              <Link to="/sale" className="text-sm uppercase tracking-[0.15em] font-medium" onClick={() => setIsMenuOpen(false)}>Sale</Link>
              <Link to="/about" className="text-sm uppercase tracking-[0.15em] font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/contact" className="text-sm uppercase tracking-[0.15em] font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
