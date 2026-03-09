import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown, Zap, Shield, Crosshair } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import Tilt3D from "@/components/Tilt3D";
import AnimatedParticles from "@/components/AnimatedParticles";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const rotate = useTransform(scrollY, [0, 500], [0, -10]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (clientX - centerX) * 0.02;
      const offsetY = (clientY - centerY) * 0.02;
      mouseX.set(offsetX);
      mouseY.set(offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <PageTransition className="min-h-screen pt-20 relative">
      {/* Animated Background */}
      <AnimatedParticles count={15} />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Premium Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ 
              x: [0, 20, -20, 0],
              y: [0, 10, -10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/40 to-emerald-500/15 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              x: [0, -15, 15, 0],
              y: [0, -10, 10, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" 
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,255,79,0.2)" }}
              className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary font-display text-sm tracking-widest mb-6 backdrop-blur-sm neon-border cursor-pointer"
            >
              NEXT-GEN PERFORMANCE
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-6">
                UNLEASH <br />
                <span className="text-gradient-alt glow-text-lg">GAMING POWER</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl font-body text-muted-foreground mb-8 max-w-lg"
            >
              The Acer Nitro V16 Lite. Desktop-class performance compressed into an ultra-sleek, portable chassis. Dominate anywhere.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact">
                <motion.button 
                  whileHover={{ scale: 1.08, boxShadow: "0 0 50px rgba(124,255,79,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-premium px-8 py-4 bg-gradient-to-r from-primary to-emerald-400 text-black font-display font-bold tracking-wider rounded-lg glow-box-strong transition-all hover-lift"
                >
                  PRE-ORDER NOW
                </motion.button>
              </Link>
              <Link href="/features">
                <motion.button 
                  whileHover={{ scale: 1.08, borderColor: "rgba(124,255,79,0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 text-white border border-white/10 font-display font-bold tracking-wider rounded-lg hover:bg-white/10 transition-all neon-border"
                >
                  DISCOVER FEATURES
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* 3D Tilt Laptop Image */}
          <motion.div 
            style={{ y: y1 }}
            className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center"
          >
            <Tilt3D className="w-full h-full flex items-center justify-center relative">
              <motion.div
                style={{ x: springX, y: springY }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                {/* Enhanced Glowing Light Effect */}
                <motion.div 
                  animate={{ 
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-t from-primary/50 to-transparent blur-3xl rounded-full"
                />

                <motion.img 
                  animate={{ 
                    y: [0, -25, 0],
                    rotateZ: [0, 3, -3, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=2000" 
                  alt="Acer Nitro V16 Lite" 
                  className="relative z-10 max-w-[120%] lg:max-w-[150%] object-contain drop-shadow-[0_0_60px_rgba(124,255,79,0.5)] shimmer"
                />
              </motion.div>
              
              {/* Rotating Rings - Enhanced */}
              <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-[400px] h-[400px] border border-white/10 rounded-full absolute" 
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="w-[500px] h-[500px] border border-primary/20 rounded-full absolute border-dashed" 
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="w-[600px] h-[600px] border border-primary/10 rounded-full absolute" 
                />
              </div>
            </Tilt3D>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="font-display text-xs tracking-[0.3em]">SCROLL</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-primary glow-text" />
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Highlights */}
      <section className="py-24 relative border-t border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "RYZEN™ 7", desc: "8 Cores, 16 Threads of pure processing dominance." },
            { icon: Shield, title: "RTX™ 4060", desc: "NVIDIA's Ada Lovelace architecture for lifelike ray tracing." },
            { icon: Crosshair, title: "165HZ WQXGA", desc: "Pinpoint accuracy with zero motion blur or tearing." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="glass-panel-premium p-8 rounded-2xl flex items-start gap-6 group hover-lift cursor-pointer neon-border"
            >
              <motion.div 
                whileHover={{ scale: 1.3, rotate: 15, color: "#7CFF4F" }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/25 to-primary/5 flex items-center justify-center shrink-0 neon-border"
              >
                <item.icon className="w-7 h-7 text-primary glow-text transition-all" />
              </motion.div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="font-body text-muted-foreground text-lg">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
