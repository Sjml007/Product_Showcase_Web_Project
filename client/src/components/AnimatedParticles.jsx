import { motion } from "framer-motion";
import { useMemo } from "react";













const colors = [
"rgba(74,222,128,1)", // neon green
"rgba(77,255,176,1)", // mint
"rgba(0,255,255,0.8)", // cyan
"rgba(74,222,128,0.6)" // dim green
];

export default function AnimatedParticles({ count = 20, className = "" }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 5,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.1,
      type: i % 5 === 0 ? "orb" : i % 3 === 0 ? "streak" : "dot",
      color: colors[Math.floor(Math.random() * colors.length)],
      xDrift: (Math.random() - 0.5) * 80
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => {
        if (particle.type === "orb") {
          return (
            <motion.div
              key={particle.id}
              initial={{ y: "108vh", x: `${particle.x}%`, opacity: 0, scale: 0.5 }}
              animate={{
                y: "-10vh",
                x: [`${particle.x}%`, `${particle.x + particle.xDrift}%`, `${particle.x}%`],
                opacity: [0, particle.opacity * 0.8, particle.opacity, 0],
                scale: [0.5, 1.5, 1, 0.5]
              }}
              transition={{
                duration: particle.duration * 1.5,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute rounded-full"
              style={{
                width: `${particle.size * 4}px`,
                height: `${particle.size * 4}px`,
                background: `radial-gradient(circle, ${particle.color}, transparent 70%)`,
                filter: `blur(${particle.size}px)`
              }} />);


        }

        if (particle.type === "streak") {
          return (
            <motion.div
              key={particle.id}
              initial={{ y: "108vh", x: `${particle.x}%`, opacity: 0 }}
              animate={{
                y: "-10vh",
                opacity: [0, particle.opacity, particle.opacity, 0]
              }}
              transition={{
                duration: particle.duration * 0.7,
                delay: particle.delay,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute"
              style={{
                width: `${particle.size * 0.5}px`,
                height: `${particle.size * 20}px`,
                background: `linear-gradient(0deg, transparent, ${particle.color}, transparent)`,
                filter: `blur(${particle.size * 0.3}px)`,
                borderRadius: "50%"
              }} />);


        }

        // Default: dot
        return (
          <motion.div
            key={particle.id}
            initial={{ y: "108vh", x: `${particle.x}%`, opacity: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, particle.opacity, particle.opacity * 0.5, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              filter: `blur(${particle.size * 0.3}px) drop-shadow(0 0 ${particle.size * 2}px ${particle.color})`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
            }} />);


      })}

      {/* Ambient floating light orbs (static, slow) */}
      {[0, 1, 2].map((i) =>
      <motion.div
        key={`ambient-${i}`}
        animate={{
          x: [0, 30 * (i % 2 === 0 ? 1 : -1), 0],
          y: [0, 20, 0],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{ duration: 8 + i * 3, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
        className="absolute rounded-full"
        style={{
          width: `${150 + i * 80}px`,
          height: `${150 + i * 80}px`,
          left: `${20 + i * 25}%`,
          top: `${20 + i * 20}%`,
          background: "radial-gradient(circle, rgba(74,222,128,0.8), transparent 70%)",
          filter: "blur(40px)"
        }} />

      )}
    </div>);

}