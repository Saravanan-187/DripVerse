import { useScrollPosition } from "@/hooks/useParallax";
import "./ParallaxLayer.css";

/**
 * Floating geometric shapes that parallax at different depths
 * across the entire site, creating a 3D editorial atmosphere.
 */

interface FloatingShape {
  type: "circle" | "ring" | "line" | "dot-cluster" | "diamond";
  size: number;
  x: string;
  y: string;
  speed: number;       // parallax speed multiplier
  opacity: number;
  rotation?: number;
  delay?: number;      // animation delay in seconds
}

const SHAPES: FloatingShape[] = [
  // Subtle ring — top right
  { type: "ring", size: 120, x: "85%", y: "15%", speed: -0.08, opacity: 0.04, rotation: 15 },
  // Small dot cluster — left mid
  { type: "dot-cluster", size: 80, x: "5%", y: "35%", speed: -0.12, opacity: 0.06, delay: 2 },
  // Large circle — right mid
  { type: "circle", size: 200, x: "92%", y: "55%", speed: -0.05, opacity: 0.025 },
  // Diagonal line — left
  { type: "line", size: 100, x: "8%", y: "65%", speed: -0.15, opacity: 0.05, rotation: -35 },
  // Diamond — center right
  { type: "diamond", size: 40, x: "78%", y: "80%", speed: -0.1, opacity: 0.04, rotation: 45, delay: 1 },
  // Ring — bottom left
  { type: "ring", size: 80, x: "12%", y: "90%", speed: -0.06, opacity: 0.035, rotation: -20 },
  // Dot cluster — far right
  { type: "dot-cluster", size: 60, x: "95%", y: "42%", speed: -0.09, opacity: 0.05, delay: 3 },
  // Line — top left
  { type: "line", size: 70, x: "25%", y: "12%", speed: -0.07, opacity: 0.04, rotation: 60 },
  // Small circle — mid
  { type: "circle", size: 50, x: "55%", y: "70%", speed: -0.13, opacity: 0.03, delay: 1.5 },
  // Diamond — bottom right
  { type: "diamond", size: 25, x: "65%", y: "95%", speed: -0.11, opacity: 0.04, rotation: 45, delay: 2.5 },
];

const ShapeRenderer = ({
  shape,
  scrollY,
}: {
  shape: FloatingShape;
  scrollY: number;
}) => {
  const yOffset = scrollY * shape.speed;
  const floatClass = shape.delay
    ? `parallax-float parallax-float-delay-${Math.round((shape.delay || 0) * 10)}`
    : "parallax-float";

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    left: shape.x,
    top: shape.y,
    width: shape.size,
    height: shape.size,
    opacity: shape.opacity,
    transform: `translateY(${yOffset}px) rotate(${shape.rotation || 0}deg)`,
    willChange: "transform",
    pointerEvents: "none",
    animationDelay: shape.delay ? `${shape.delay}s` : undefined,
  };

  switch (shape.type) {
    case "circle":
      return (
        <div
          className={floatClass}
          style={{
            ...baseStyle,
            borderRadius: "50%",
            background: "radial-gradient(circle, currentColor 0%, transparent 70%)",
          }}
        />
      );

    case "ring":
      return (
        <div
          className={floatClass}
          style={{
            ...baseStyle,
            borderRadius: "50%",
            border: "1px solid currentColor",
          }}
        />
      );

    case "line":
      return (
        <div
          className={floatClass}
          style={{
            ...baseStyle,
            height: 1,
            background: "linear-gradient(90deg, transparent, currentColor, transparent)",
          }}
        />
      );

    case "diamond":
      return (
        <div
          className={floatClass}
          style={{
            ...baseStyle,
            border: "1px solid currentColor",
            transform: `translateY(${yOffset}px) rotate(45deg)`,
          }}
        />
      );

    case "dot-cluster":
      return (
        <div className={floatClass} style={baseStyle}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "currentColor",
                left: `${20 + Math.sin(i * 1.5) * 30}%`,
                top: `${20 + Math.cos(i * 1.5) * 30}%`,
              }}
            />
          ))}
        </div>
      );

    default:
      return null;
  }
};

const ParallaxLayer = () => {
  const scrollY = useScrollPosition();

  return (
    <div
      className="parallax-layer"
      aria-hidden="true"
    >
      {/* Film grain overlay for premium texture */}
      <div className="parallax-grain" />

      {/* Floating shapes */}
      {SHAPES.map((shape, i) => (
        <ShapeRenderer key={i} shape={shape} scrollY={scrollY} />
      ))}

      {/* Subtle gradient orbs that respond to scroll */}
      <div
        className="parallax-orb parallax-orb-1"
        style={{
          transform: `translate(${scrollY * -0.03}px, ${scrollY * -0.06}px)`,
        }}
      />
      <div
        className="parallax-orb parallax-orb-2"
        style={{
          transform: `translate(${scrollY * 0.04}px, ${scrollY * -0.08}px)`,
        }}
      />
    </div>
  );
};

export default ParallaxLayer;
