import { motion } from "framer-motion";






export default function GlowBackground({ className = "", variant = "section" }) {
  if (variant === "hero") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
                {/* Animated gradient mesh */}
                <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[80vh] h-[80vh] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(74,222,128,0.12) 0%, rgba(74,222,128,0.04) 40%, transparent 70%)",
            filter: "blur(60px)"
          }} />
        
                <motion.div
          animate={{ x: [0, -30, 30, 0], y: [0, 20, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 w-[60vh] h-[60vh] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,170,255,0.1) 0%, rgba(0,255,255,0.04) 40%, transparent 70%)",
            filter: "blur(80px)"
          }} />
        
                <motion.div
          animate={{ scale: [1, 1.2, 0.9, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[50vh] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)",
            filter: "blur(40px)"
          }} />
        

                {/* Futuristic animated grid */}
                <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
            "linear-gradient(rgba(74,222,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px"
          }} />
        

                {/* Radial vignette grid mask */}
                <div
          className="absolute inset-0"
          style={{
            background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(5,5,5,0.8) 100%)"
          }} />
        
            </div>);

  }

  if (variant === "minimal") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
                <motion.div
          animate={{ opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(74,222,128,0.15), transparent)"
          }} />
        
            </div>);

  }

  // section variant (default)
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <motion.div
        animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-1/4 w-[40vh] h-[40vh] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)",
          filter: "blur(50px)"
        }} />
      
            <motion.div
        animate={{ x: [0, -15, 10, 0], y: [0, 10, -8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-0 left-1/4 w-[30vh] h-[30vh] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,200,255,0.06) 0%, transparent 70%)",
          filter: "blur(60px)"
        }} />
      
        </div>);

}