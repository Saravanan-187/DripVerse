import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-main.jpg";
import saravananImage from "@/assets/saravanan.png";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={heroImage}
            alt="About Dripverse"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
              Our Story
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-8 md:pb-12">
          {/* Mission */}
          <div className="max-w-3xl mx-auto text-center mb-24">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">
              Fashion that feels like you
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dripverse was born from a simple idea: everyone deserves clothing that makes them feel confident, comfortable, and authentically themselves. We believe style isn't about following trends—it's about expressing who you are.
            </p>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-12 mb-24">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">01</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality First</h3>
              <p className="text-muted-foreground">
                Every piece is crafted from premium materials designed to last. We partner with ethical manufacturers who share our commitment to excellence.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-muted flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">02</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Sustainable Practice</h3>
              <p className="text-muted-foreground">
                From organic cotton to recycled packaging, we're committed to reducing our environmental footprint while creating beautiful clothing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-muted flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">03</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Inclusive Design</h3>
              <p className="text-muted-foreground">
                Fashion is for everyone. Our sizing and styles are designed to celebrate all body types and personal expressions.
              </p>
            </div>
          </div>

          {/* Quote */}
          <div className="bg-muted/30 py-16 md:py-24 px-8 md:px-16 text-center">
            <blockquote className="text-2xl md:text-3xl font-light italic tracking-tight max-w-4xl mx-auto">
              "Style is a way to say who you are without having to speak."
            </blockquote>
            <p className="mt-6 text-muted-foreground">— Rachel Zoe</p>
          </div>

          {/* Team section */}
          <div className="pt-16 md:pt-24 pb-0 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              The Team
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">
              Meet the creator
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
              We're a small team of designers, dreamers, and fashion enthusiasts based in India, united by our passion for creating timeless pieces.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-sm mx-auto">
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-foreground shadow-xl">
                  <img
                    src={saravananImage}
                    alt="Saravanan"
                    className="w-full h-full object-cover object-[center_20%] grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="font-medium text-xl">Saravanan</p>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
