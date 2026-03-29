import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-main.jpg";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowDown } from "lucide-react";
import { useScrollPosition } from "@/hooks/useParallax";
import "./Hero.css";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollY = useScrollPosition();

  // Staggered load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse parallax effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  }, []);

  // Combine mouse parallax + scroll parallax for 3D depth on hero image
  const imageTransform = `translate(${mousePosition.x * -20}px, ${mousePosition.y * -15 + scrollY * 0.35}px) scale(1.15)`;

  // Content fades and lifts as user scrolls past hero
  const contentOpacity = Math.max(0, 1 - scrollY / 600);
  const contentTranslate = scrollY * 0.15;

  return (
    <section
      ref={heroRef}
      className="hero-section relative h-[100vh] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Image with Scroll + Mouse Parallax */}
      <div
        className="absolute inset-[-60px] will-change-transform"
        style={{
          transform: imageTransform,
          transition: "transform 0.15s ease-out",
        }}
      >
        <img
          src={heroImage}
          alt="Fashion collection hero banner showcasing casual streetwear"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Gradient Overlays */}
      <div className="absolute inset-0 hero-gradient-animated" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="hero-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      {/* Main Content — fades out and lifts on scroll */}
      <div
        className="relative h-full container mx-auto px-4 md:px-8 flex items-center z-10"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${-contentTranslate}px)`,
        }}
      >
        <div className="max-w-3xl text-white space-y-5">
          {/* Animated line */}
          <div
            className={`hero-accent-line transition-all duration-1000 ${
              isLoaded ? "w-16 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          />

          {/* Eyebrow text */}
          <p
            className={`text-xs md:text-sm uppercase tracking-[0.3em] text-white/70 font-light transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            Spring / Summer — 2026
          </p>

          {/* Main heading with clip reveal */}
          <div className="overflow-hidden">
            <h1
              className={`text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-[-0.04em] leading-[0.88] transition-all duration-1000 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-full"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <span className="block hero-text-gradient">Everyday</span>
              <span className="block mt-1 md:mt-2 hero-text-outline">
                Comfort
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <p
            className={`text-sm md:text-base max-w-md text-white/70 font-light leading-relaxed tracking-wide transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            Discover casual styles that seamlessly blend comfort with street-ready
            confidence. Curated for the modern individual.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap items-center gap-4 pt-4 transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            <Button
              size="lg"
              className="hero-cta-primary group relative overflow-hidden bg-white text-black hover:bg-white font-semibold tracking-[0.2em] uppercase text-xs sm:text-[13px] px-12 h-14 rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02]"
              onClick={() => {
                const element = document.getElementById("trending");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Collection
                <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
              </span>
              <div className="hero-cta-shine" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white hover:text-black font-semibold tracking-[0.2em] uppercase text-xs sm:text-[13px] px-12 h-14 rounded-full backdrop-blur-md transition-all duration-500 hover:scale-[1.02]"
              onClick={() => {
                window.location.href = "/new";
              }}
            >
              New Arrivals
            </Button>
          </div>
        </div>
      </div>

      {/* Corner Decorative Elements */}
      <div
        className={`absolute top-28 md:top-32 right-4 md:right-8 z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1600ms" }}
      >
        <div className="hero-vertical-text text-[10px] uppercase tracking-[0.3em] text-white/20 font-light">
          DRIPVERSE — SS26
        </div>
      </div>
    </section>
  );
};

export default Hero;
