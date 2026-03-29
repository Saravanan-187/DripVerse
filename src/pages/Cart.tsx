import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 md:px-8 py-24 md:py-32">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-muted flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop">
              <Button className="h-12 px-8 text-sm uppercase tracking-widest">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-12">
            Shopping Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="border-b border-border/50 pb-4 mb-6 hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4">
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Product</span>
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground text-center">Size</span>
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground text-center">Quantity</span>
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground text-right">Total</span>
                <span className="w-8" />
              </div>

              <div className="space-y-6">
                {items.map((item) => {
                  const price = item.product.isSale && item.product.salePrice
                    ? parseInt(item.product.salePrice.replace(/[₹,]/g, ""))
                    : item.product.priceNum;
                  const total = price * item.quantity;

                  return (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="grid md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center py-6 border-b border-border/50"
                    >
                      {/* Product */}
                      <div className="flex gap-4">
                        <Link to={`/product/${item.product.id}`} className="w-20 h-24 bg-muted/50 flex-shrink-0 overflow-hidden">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div>
                          <Link to={`/product/${item.product.id}`} className="font-medium hover:text-muted-foreground transition-colors">
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.color}</p>
                          <p className="text-sm font-medium mt-1">
                            {item.product.isSale && item.product.salePrice
                              ? item.product.salePrice
                              : item.product.price}
                          </p>
                        </div>
                      </div>

                      {/* Size */}
                      <div className="text-center">
                        <span className="md:hidden text-xs uppercase tracking-wider text-muted-foreground mr-2">Size:</span>
                        {item.size}
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="text-right font-medium">
                        ₹{total.toLocaleString()}
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between mt-8">
                <Link to="/shop">
                  <Button variant="outline" className="text-sm uppercase tracking-wider">
                    Continue Shopping
                  </Button>
                </Link>
                <Button variant="ghost" onClick={clearCart} className="text-sm uppercase tracking-wider text-muted-foreground">
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-muted/30 p-8">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{totalPrice >= 999 ? "Free" : "₹99"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-8">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{(totalPrice + (totalPrice >= 999 ? 0 : 99)).toLocaleString()}</span>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full h-14 text-sm uppercase tracking-widest">
                    Proceed to Checkout
                  </Button>
                </Link>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Free shipping on orders over ₹999
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
