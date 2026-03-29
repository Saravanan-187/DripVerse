import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, products } from "@/data/products";

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const token = localStorage.getItem('token');

  const fetchCart = async () => {
    if (!token) {
      setItems([]);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const cartData = await response.json();
        const mappedItems = cartData
          .map((item: { productId: number; quantity: number; size: string; color: string }) => {
            const product = products.find((entry) => entry.id === item.productId);
            if (!product) return null;

            return {
              product,
              quantity: item.quantity,
              size: item.size,
              color: item.color,
            };
          })
          .filter((item): item is CartItem => item !== null);

        setItems(mappedItems);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error('Failed to fetch cart', error);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const addItem = async (product: Product, size: string, color: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, size, color }];
    });

    if (token) {
      try {
        await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId: product.id, quantity: 1, size, color })
        });
      } catch (error) {
        console.error('Failed to add to cart API', error);
      }
    }
  };

  const removeItem = async (productId: number, size: string, color: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      )
    );

    if (token) {
      try {
        await fetch(`http://localhost:5000/api/cart/${productId}/${size}/${color}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (error) {
        console.error('Failed to remove from cart API', error);
      }
    }
  };

  const updateQuantity = async (productId: number, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );

    if (token) {
      try {
        await fetch('http://localhost:5000/api/cart', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId, quantity, size, color })
        });
      } catch (error) {
        console.error('Failed to update quantity API', error);
      }
    }
  };

  const clearCart = async () => {
    setItems([]);
    if (token) {
      try {
        await fetch('http://localhost:5000/api/cart/clear', {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (error) {
        console.error('Failed to clear cart API', error);
      }
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.product.isSale && item.product.salePrice
      ? parseInt(item.product.salePrice.replace(/[₹,]/g, ""))
      : item.product.priceNum;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
