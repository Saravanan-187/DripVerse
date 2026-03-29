import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <div className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Have a question or just want to say hello? We'd love to hear from you.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* Contact Info */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Contact Info
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8">
                We're here to help
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a href="mailto:hello@dripverse.in" className="text-muted-foreground hover:text-foreground transition-colors">
                      hello@dripverse.in
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <a href="tel:+911234567890" className="text-muted-foreground hover:text-foreground transition-colors">
                      +91 1234567890
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Address</p>
                    <p className="text-muted-foreground">
                      456 Anna Salai<br />
                      Chennai, Tamil Nadu 600002<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-border/50">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Business Hours
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Friday: 10am - 7pm IST</p>
                  <p>Saturday: 10am - 5pm IST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] mb-2 block">
                      Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12 bg-transparent border-border focus:border-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 bg-transparent border-border focus:border-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.15em] mb-2 block">
                    Subject
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="h-12 bg-transparent border-border focus:border-foreground"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.15em] mb-2 block">
                    Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="bg-transparent border-border focus:border-foreground resize-none"
                  />
                </div>

                <Button type="submit" className="w-full h-14 text-sm uppercase tracking-widest">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
