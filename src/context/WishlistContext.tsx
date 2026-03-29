import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface WishlistContextType {
  items: number[];
  isInWishlist: (productId: number) => boolean;
  toggleItem: (productId: number) => Promise<boolean>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<number[]>([]);
  const { toast } = useToast();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) {
        setItems([]);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data = await response.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    fetchWishlist();
  }, [token]);

  const isInWishlist = (productId: number) => items.includes(productId);

  const toggleItem = async (productId: number) => {
    if (!token) {
      toast({
        title: "Please login",
        description: "You need to be logged in to use your wishlist.",
        variant: "destructive",
      });
      return false;
    }

    const isSaved = isInWishlist(productId);

    try {
      const response = await fetch(
        isSaved ? `http://localhost:5000/api/wishlist/${productId}` : "http://localhost:5000/api/wishlist",
        {
          method: isSaved ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: isSaved ? undefined : JSON.stringify({ productId }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update wishlist");
      }

      const data = await response.json();
      setItems(Array.isArray(data) ? data : []);
      return !isSaved;
    } catch (error) {
      console.error("Failed to update wishlist", error);
      toast({
        title: "Wishlist update failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
      return isSaved;
    }
  };

  return (
    <WishlistContext.Provider value={{ items, isInWishlist, toggleItem }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
