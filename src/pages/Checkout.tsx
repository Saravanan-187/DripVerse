import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight } from "lucide-react";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const shipping = totalPrice >= 999 ? 0 : 99;
  const total = totalPrice + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const orderItems = items.map(item => {
          const price = item.product.isSale && item.product.salePrice
            ? parseInt(item.product.salePrice.replace(/[₹,]/g, ""))
            : item.product.priceNum;

          return {
            productId: item.product.id,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            price: price
          };
        });

        const shippingAddress = {
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          address: formData.address,
          city: formData.city,
          postalCode: formData.pincode,
          country: formData.state || "India"
        };

        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            items: orderItems,
            totalAmount: total,
            shippingAddress
          })
        });

        if (!response.ok) {
           throw new Error("Failed to place order API");
        }
      } catch (error) {
        console.error("Failed to place order:", error);
        toast({
          title: "Order Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
        return;
      }
    } else {
        toast({
          title: "Login Required",
          description: "Please login to place an order.",
          variant: "destructive"
        });
        navigate("/login");
        return;
    }

    toast({
      title: "Order placed successfully!",
      description: "You will receive an order confirmation email shortly.",
    });
    await clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 md:px-8 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/shop" className="text-muted-foreground hover:text-foreground underline">
            Continue shopping
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/cart" className="hover:text-foreground transition-colors">Cart</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Checkout</span>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-12">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Contact</h2>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12 bg-transparent border-border"
                />
              </div>

              {/* Shipping */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="h-12 bg-transparent border-border"
                    />
                    <Input
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="h-12 bg-transparent border-border"
                    />
                  </div>
                  <Input
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    className="h-12 bg-transparent border-border"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      className="h-12 bg-transparent border-border"
                    />
                    <Input
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                      className="h-12 bg-transparent border-border"
                    />
                    <Input
                      placeholder="PIN Code"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      required
                      className="h-12 bg-transparent border-border"
                    />
                  </div>
                  <Input
                    placeholder="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12 bg-transparent border-border"
                  />
                </div>
              </div>

              {/* Payment placeholder */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Payment</h2>
                <div className="bg-muted/30 p-6 text-center">
                  <p className="text-muted-foreground">
                    Payment integration would be added here (Razorpay, Stripe, etc.)
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full h-14 text-sm uppercase tracking-widest">
                Place Order
              </Button>
            </form>

            {/* Order Summary */}
            <div>
              <div className="bg-muted/30 p-8 sticky top-24">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => {
                    const price = item.product.isSale && item.product.salePrice
                      ? parseInt(item.product.salePrice.replace(/[₹,]/g, ""))
                      : item.product.priceNum;

                    return (
                      <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                        <div className="relative w-16 h-20 bg-muted/50 flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center rounded-full">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">{item.size} / {item.color}</p>
                        </div>
                        <p className="font-medium text-sm">₹{(price * item.quantity).toLocaleString()}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-3 border-t border-border">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
