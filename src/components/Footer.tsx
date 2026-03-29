import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/30 mt-24 md:mt-32 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1">
            <Link to="/" className="text-xl md:text-2xl font-bold mb-4 tracking-[-0.02em] block">DRIPVERSE</Link>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              Your destination for casual, fashion-forward clothing
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em]">Shop</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/collections/women" className="hover:text-foreground transition-colors font-light">Women</Link></li>
              <li><Link to="/collections/men" className="hover:text-foreground transition-colors font-light">Men</Link></li>
              <li><Link to="/new" className="hover:text-foreground transition-colors font-light">New Arrivals</Link></li>
              <li><Link to="/sale" className="hover:text-foreground transition-colors font-light">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em]">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors font-light">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors font-light">Contact</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-light">Shipping Info</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-light">Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em]">Follow Us</h4>
            <div className="flex space-x-5">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8">
          <p className="text-xs text-muted-foreground text-center font-light tracking-wide">
            © 2025 Dripverse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
