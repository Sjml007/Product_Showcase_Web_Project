import { motion } from "framer-motion";
import { useMemo } from "react";

export default function AnimatedParticles({ count = 20, className = "" }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      delay: Math.random() * 0.5,
      duration: 3 + Math.random() * 2,
      x: Math.random() * 100,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            y: "100vh", 
            x: `${particle.x}%`,
            opacity: 0
          }}
          animate={{ 
            y: "-100vh", 
            opacity: [0, particle.opacity, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute rounded-full bg-primary"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            filter: "blur(1px)"
          }}
        />
      ))}
    </div>
  );
}
