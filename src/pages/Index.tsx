import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Wave from "@/components/Wave";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import ParallaxLayer from "@/components/ParallaxLayer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Site-wide parallax floating shapes + grain texture */}
      <ParallaxLayer />

      <Header />
      <main className="relative z-10">
        <div className="relative">
          <Hero />
          <Wave />
        </div>
        <CategorySection />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
