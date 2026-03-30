import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";








export default function Tilt3D({ children, className = "", intensity = 12, glowOnHover = true }) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 200, damping: 25, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 200, damping: 25, mass: 0.5 });

  const rotateX = useTransform(y, [-300, 300], [intensity, -intensity]);
  const rotateY = useTransform(x, [-300, 300], [-intensity, intensity]);

  // Derive glow position for dynamic lighting effect
  const glowX = useTransform(x, [-300, 300], [0, 100]);
  const glowY = useTransform(y, [-300, 300], [0, 100]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rawX.set(e.clientX - centerX);
    rawY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d"
      }}
      className={`relative ${className}`}>
      
      {/* Dynamic glow highlight that follows mouse */}
      {glowOnHover &&
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(74,222,128,0.12) 0%, transparent 60%)`
        }} />

      }
      {children}
    </motion.div>);

}