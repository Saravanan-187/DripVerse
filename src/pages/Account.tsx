import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Account = () => {
    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch user details (using login response structure or a dedicated /me endpoint if we had one)
        // For now, we'll rely on what we have or fetch orders
        fetch('http://localhost:5000/api/orders', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch orders');
                }
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    setOrders([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setOrders([]);
                setLoading(false);
            });

        // We don't have a dedicated GET /me, so we might need to store user info in local storage on login
        // or implement GET /auth/me. For now, let's assume we can update profile blindly or just show orders.
    }, [token, navigate]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name');
        const password = formData.get('password');

        try {
            const res = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, password })
            });
            if (res.ok) {
                alert('Profile updated successfully');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
                    <p className="text-muted-foreground">Loading...</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Account</h1>
                    <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                </div>

                <Tabs defaultValue="orders" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="orders">Order History</TabsTrigger>
                        <TabsTrigger value="profile">Profile Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="orders">
                        <div className="space-y-4 mt-4">
                            {orders.length === 0 ? (
                                <p className="text-muted-foreground text-center py-8">No orders found.</p>
                            ) : (
                                orders.map((order: any) => (
                                    <div key={order._id} className="border rounded-lg p-4">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-semibold">Order #{order._id.slice(-6)}</span>
                                            <span className="text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>{order.items.length} items</span>
                                            <span className="font-bold">₹{order.totalAmount}</span>
                                        </div>
                                        <div className="mt-2 text-sm text-muted-foreground">
                                            Status: <span className="capitalize text-foreground">{order.status}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="profile">
                        <div className="max-w-md mx-auto mt-8">
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" name="name" placeholder="Update your name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">New Password</Label>
                                    <Input id="password" name="password" type="password" placeholder="Leave blank to keep current" />
                                </div>
                                <Button type="submit" className="w-full">Update Profile</Button>
                            </form>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
};

export default Account;
