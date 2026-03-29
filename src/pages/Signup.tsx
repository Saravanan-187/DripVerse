import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiUrl } from "@/lib/api";

const Signup = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="w-full max-w-md space-y-8 bg-background p-8 rounded-lg border border-border/50 shadow-sm animate-fade-in">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold tracking-tight">Create an account</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Enter your details to get started
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const name = formData.get('name');
                        const email = formData.get('email');
                        const password = formData.get('password');
                        const confirmPassword = formData.get('confirm-password');

                        if (password !== confirmPassword) {
                            alert("Passwords don't match");
                            return;
                        }

                        try {
                            const response = await fetch(apiUrl('/api/auth/register'), {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ name, email, password })
                            });

                            const data = await response.json();
                            if (response.ok) {
                                localStorage.setItem('token', data.token);
                                window.location.href = '/';
                            } else {
                                alert(data.message);
                            }
                        } catch (error) {
                            console.error('Signup failed', error);
                            alert('Signup failed');
                        }
                    }}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    placeholder="Create a password"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    placeholder="Confirm your password"
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Sign up
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">Already have an account? </span>
                            <Link to="/login" className="font-medium hover:text-primary transition-colors">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Signup;
