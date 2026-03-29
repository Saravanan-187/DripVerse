import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";

const Wishlist = () => {
    const { addItem } = useCart();
    const { items, toggleItem } = useWishlist();

    const removeFromWishlist = async (productId: number) => {
        await toggleItem(productId);
    };

    const wishlistProducts = products.filter(p => items.includes(p.id));

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

                {wishlistProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
                        <Link to="/">
                            <Button>Continue Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistProducts.map(product => (
                            <div key={product.id} className="border rounded-lg p-4 flex flex-col gap-4">
                                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-md" />
                                <div>
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="text-muted-foreground">{product.price}</p>
                                </div>
                                <div className="flex gap-2 mt-auto">
                                    <Button
                                        className="flex-1"
                                        onClick={() => addItem(product, product.sizes[0], product.colors[0])}
                                    >
                                        Move to Cart
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => removeFromWishlist(product.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Wishlist;
