import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Zap, Shield, Crosshair, ArrowRight, TrendingUp, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import PageTransition from "@/components/PageTransition";
import AnimatedParticles from "@/components/AnimatedParticles";
import GlowBackground from "@/components/GlowBackground";
import SectionTransition from "@/components/SectionTransition";
import Laptop3D from "@/components/Laptop3D";

const stats = [
{ value: "165", unit: "Hz", label: "Refresh Rate" },
{ value: "8", unit: "GB", label: "VRAM GDDR6" },
{ value: "5.1", unit: "GHz", label: "Max Boost Clock" },
{ value: "2.1", unit: "kg", label: "Ultra Light" }];


const highlights = [
{ icon: Zap, title: "RYZEN™ 7", desc: "8 Cores, 16 Threads of pure processing dominance." },
{ icon: Shield, title: "RTX™ 4060", desc: "NVIDIA's Ada Lovelace architecture for lifelike ray tracing." },
{ icon: Crosshair, title: "165HZ WQXGA", desc: "Pinpoint accuracy with zero motion blur or tearing." }];


function AnimatedCounter({ target, unit }) {
  const [displayed, setDisplayed] = useState("0");
  const ref = useRef(null);
  const inView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView.current) {
          inView.current = true;
          const targetNum = parseFloat(target);
          const isDecimal = target.includes(".");
          const steps = 40;
          let step = 0;
          const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = targetNum * eased;
            setDisplayed(isDecimal ? current.toFixed(1) : Math.floor(current).toString());
            if (step >= steps) clearInterval(interval);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{displayed}{unit}</span>;
}

export default function Home() {
  const containerRef = useRef(null);
  const { scrollY, scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const laptopScale = useTransform(scrollY, [0, 500], [1, 0.85]);
  const laptopRotate = useTransform(scrollY, [0, 500], [0, -8]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((e.clientX - centerX) * 0.025);
      mouseY.set((e.clientY - centerY) * 0.025);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <PageTransition className="min-h-screen pt-20 relative">
      {/* Global particle field */}
      <AnimatedParticles count={18} />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <GlowBackground variant="hero" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-6">
              
              <motion.div
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm cursor-pointer"
                whileHover={{ scale: 1.05, borderColor: "rgba(74,222,128,0.6)" }}
                style={{ boxShadow: "0 0 20px rgba(74,222,128,0.15)" }}>
                
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-primary"
                  style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }} />
                
                <span className="text-primary font-display text-xs tracking-[0.25em]">NEXT-GEN PERFORMANCE</span>
              </motion.div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl xl:text-7xl font-display font-black text-white leading-[0.95] mb-6">
              
              UNLEASH{" "}
              <br />
              <motion.span
                className="text-gradient-alt glow-text-xl"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity }}>
                
                GAMING
              </motion.span>{" "}
              <span className="text-white/90">POWER</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl font-body text-white/60 mb-10 max-w-md leading-relaxed">
              
              The Acer Nitro V16 Lite. Desktop-class performance compressed into an ultra-sleek, portable chassis.{" "}
              <span className="text-primary/80">Dominate anywhere.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-wrap gap-4">
              
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.06, boxShadow: "0 0 60px rgba(74,222,128,0.5), 0 0 100px rgba(74,222,128,0.2)" }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-premium px-8 py-4 bg-gradient-to-r from-primary to-emerald-400 text-black font-display font-bold tracking-wider rounded-lg"
                  style={{ boxShadow: "0 0 30px rgba(74,222,128,0.3)" }}>
                  
                  <span className="flex items-center gap-2">
                    PRE-ORDER NOW
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}>
                      
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </span>
                </motion.button>
              </Link>
              <Link href="/features">
                <motion.button
                  whileHover={{ scale: 1.06, borderColor: "rgba(74,222,128,0.6)", backgroundColor: "rgba(74,222,128,0.08)" }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-4 bg-white/5 text-white border border-white/15 font-display font-bold tracking-wider rounded-lg transition-all neon-border backdrop-blur-sm">
                  
                  DISCOVER FEATURES
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-6 mt-10 pt-8 border-t border-white/5">
              
              {stats.slice(0, 3).map((stat, i) =>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-center">
                
                  <div className="font-display text-xl font-black text-primary glow-text">
                    <AnimatedCounter target={stat.value} unit={stat.unit} />
                  </div>
                  <div className="font-body text-xs text-white/40 tracking-widest uppercase mt-1">{stat.label}</div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right: CSS 3D Laptop */}
          <motion.div
            style={{ y: heroParallax, scale: laptopScale }}
            className="relative h-[480px] lg:h-[600px] w-full flex items-center justify-center">
            
            {/* Outer ambient glow behind the laptop */}
            <motion.div
              animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.08, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(74,222,128,0.12), transparent 70%)",
                filter: "blur(30px)"
              }} />
            

            {/* Orbit rings around laptop */}
            {[420, 520, 620].map((size, i) =>
            <motion.div
              key={i}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 25 + i * 10, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                border: `1px solid rgba(74,222,128,${0.08 - i * 0.02})`,
                borderStyle: i === 1 ? "dashed" : "solid"
              }} />

            )}

            {/* The 3D Laptop — receives global mouse spring values */}
            <Laptop3D
              mouseX={springX}
              mouseY={springY}
              className="relative z-10 w-full h-full" />
            
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-50"
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}>
          
          <span className="font-display text-[11px] font-bold tracking-[0.5em] text-white/70 mb-2 drop-shadow-md">
            SCROLL DOWN
          </span>
          <motion.div
            animate={{ y: [0, 15, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            
            <ChevronDown 
              className="w-8 h-8 text-primary" 
              style={{ filter: "drop-shadow(0 0 10px rgba(74,222,128,0.9))" }} 
            />
            
          </motion.div>
        </motion.div>
      </section>

      {/* ===== QUICK HIGHLIGHTS ===== */}
      <section className="py-28 relative overflow-hidden border-t border-white/5">
        <GlowBackground variant="section" />

        {/* Marquee ticker */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden border-b border-primary/10 py-2 bg-primary/3">
          <div className="marquee-container">
            <div className="marquee-track">
              {Array(4).fill(null).map((_, i) =>
              <span key={i} className="font-display text-xs tracking-[0.3em] text-primary/40 mx-12">
                  AMD RYZEN™ 7 8845HS &nbsp;·&nbsp; NVIDIA RTX™ 4060 &nbsp;·&nbsp; 165HZ WQXGA &nbsp;·&nbsp; 1TB NVME GEN4 &nbsp;·&nbsp; WIFI 6E &nbsp;·&nbsp;
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section label */}
          <SectionTransition className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/2 backdrop-blur-sm mb-4">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="font-display text-xs tracking-[0.2em] text-white/50">KEY SPECIFICATIONS</span>
            </div>
          </SectionTransition>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, i) =>
            <SectionTransition key={i} delay={i * 0.15} direction="up">
                <motion.div
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-panel-premium p-8 rounded-2xl group cursor-pointer relative overflow-hidden neon-border">
                
                  {/* Hover background fill */}
                  <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(74,222,128,0.08), transparent 60%)"
                  }} />
                

                  <div className="relative z-10 flex items-start gap-5">
                    <motion.div
                    whileHover={{ scale: 1.25, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 border border-primary/20"
                    style={{ boxShadow: "0 0 20px rgba(74,222,128,0.1)" }}>
                    
                      <item.icon className="w-7 h-7 text-primary glow-text" />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="font-body text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle, rgba(74,222,128,0.15), transparent 70%)",
                  filter: "blur(8px)"
                }} />
                
                </motion.div>
              </SectionTransition>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {stats.map((stat, i) =>
            <SectionTransition key={i} delay={0.3 + i * 0.1} direction="up">
                <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-xl border border-white/5 bg-white/2 backdrop-blur-sm relative overflow-hidden group">
                
                  <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-xl"
                  style={{ background: "radial-gradient(circle, rgba(74,222,128,0.06), transparent)" }} />
                
                  <div className="font-display text-3xl font-black text-primary glow-text relative z-10">
                    {stat.value}<span className="text-xl">{stat.unit}</span>
                  </div>
                  <div className="font-body text-xs text-white/40 uppercase tracking-widest mt-1 relative z-10">{stat.label}</div>
                </motion.div>
              </SectionTransition>
            )}
          </div>
        </div>
      </section>
    </PageTransition>);

}