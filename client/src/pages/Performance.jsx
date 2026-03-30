import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import PageTransition from "@/components/PageTransition";
import GlowBackground from "@/components/GlowBackground";
import SectionTransition from "@/components/SectionTransition";
import AnimatedParticles from "@/components/AnimatedParticles";
import { Cpu, Layers, Gauge, Zap } from "lucide-react";









function StatBar({ label, value, colorClass, glowColor, delay = 0 }) {
  return (
    <div className="mb-7">
      <div className="flex justify-between items-center mb-2 font-display">
        <span className="text-white/70 tracking-widest text-xs uppercase">{label}</span>
        <motion.span
          className="text-sm font-bold"
          style={{ color: glowColor, textShadow: `0 0 10px ${glowColor}` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.5 }}>
          
          {value}%
        </motion.span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: `${value}%`, opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 1.8, delay, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full ${colorClass} rounded-full relative overflow-hidden`}
          style={{ boxShadow: `0 0 12px ${glowColor}, 0 0 24px ${glowColor.replace("0.8", "0.3")}` }}>
          
          {/* Shimmer on bar */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
        </motion.div>
      </div>
    </div>);

}

const benchmarksLeft = [
{ label: "Multi-Core Rendering", value: 95, colorClass: "bg-gradient-to-r from-primary to-emerald-400", glowColor: "rgba(74,222,128,0.8)" },
{ label: "Gaming Performance", value: 92, colorClass: "bg-gradient-to-r from-primary to-emerald-400", glowColor: "rgba(74,222,128,0.8)" },
{ label: "Power Efficiency", value: 88, colorClass: "bg-gradient-to-r from-primary to-emerald-400", glowColor: "rgba(74,222,128,0.8)" }];


const benchmarksRight = [
{ label: "Ray Tracing Capability", value: 98, colorClass: "bg-gradient-to-r from-cyan-400 to-blue-500", glowColor: "rgba(6,182,212,0.8)" },
{ label: "DLSS 3 Frame Generation", value: 100, colorClass: "bg-gradient-to-r from-cyan-400 to-blue-500", glowColor: "rgba(6,182,212,0.8)" },
{ label: "1440P Gaming", value: 90, colorClass: "bg-gradient-to-r from-cyan-400 to-blue-500", glowColor: "rgba(6,182,212,0.8)" }];


const specs = [
{ icon: Cpu, value: "8", label: "CPU Cores" },
{ icon: Layers, value: "16", label: "Threads" },
{ icon: Gauge, value: "5.1GHz", label: "Max Boost" },
{ icon: Zap, value: "8GB", label: "VRAM GDDR6" }];


export default function Performance() {
  const cpuRef = useRef(null);
  const gpuRef = useRef(null);

  const { scrollYProgress: cpuProgress } = useScroll({ target: cpuRef, offset: ["start end", "end start"] });
  const { scrollYProgress: gpuProgress } = useScroll({ target: gpuRef, offset: ["start end", "end start"] });

  const cpuImgY = useSpring(useTransform(cpuProgress, [0, 1], [60, -60]), { stiffness: 80, damping: 20 });
  const cpuImgScale = useTransform(cpuProgress, [0, 0.5, 1], [0.95, 1.04, 0.97]);
  const gpuImgY = useSpring(useTransform(gpuProgress, [0, 1], [60, -60]), { stiffness: 80, damping: 20 });

  return (
    <PageTransition className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      <AnimatedParticles count={10} />
      <GlowBackground variant="section" />

      {/* Tech grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-28">
          <SectionTransition>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/2 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="font-display text-xs tracking-[0.2em] text-white/70">BENCHMARK PERFORMANCE</span>
            </div>
          </SectionTransition>
          <SectionTransition delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-4 uppercase">
              Raw <span className="text-gradient-alt glow-text-xl">Power</span>
            </h1>
          </SectionTransition>
          <SectionTransition delay={0.2}>
            <p className="font-body text-xl text-white/70 max-w-xl mx-auto">
              Shatter benchmarks with desktop-tier silicon architecture.
            </p>
          </SectionTransition>

          {/* Spec pills */}
          <SectionTransition delay={0.35}>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {specs.map((spec, i) =>
              <motion.div
                key={i}
                whileHover={{ scale: 1.08, y: -4 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/3 border border-white/8 backdrop-blur-sm"
                style={{ boxShadow: "0 0 15px rgba(74,222,128,0.05)" }}>
                
                  <spec.icon className="w-4 h-4 text-primary" />
                  <span className="font-display text-sm font-bold text-white">{spec.value}</span>
                  <span className="font-body text-xs text-white/60">{spec.label}</span>
                </motion.div>
              )}
            </div>
          </SectionTransition>
        </div>

        {/* CPU Section */}
        <div ref={cpuRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <SectionTransition direction="left">
            <motion.div
              style={{ y: cpuImgY, scale: cpuImgScale }}
              className="relative group rounded-2xl overflow-hidden cursor-pointer">
              
              <div className="relative overflow-hidden rounded-2xl">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000"
                  alt="AMD Processor"
                  className="w-full rounded-2xl border border-white/5 opacity-70 grayscale contrast-110 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                  style={{ boxShadow: "0 0 40px rgba(0,0,0,0.5)" }} />
                
                {/* Neon overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay rounded-2xl transition-opacity duration-500 opacity-60 group-hover:opacity-100" />
                {/* Pulsing core indicator */}
                <motion.div
                  animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.15, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(74,222,128,0.35), transparent 70%)" }} />
                
                {/* Corner tech label */}
                <div className="absolute bottom-4 left-4 font-display text-xs text-primary/70 tracking-widest">
                  ZEN 4 ARCHITECTURE
                </div>
              </div>
            </motion.div>
          </SectionTransition>

          <SectionTransition direction="right">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}>
              
              <span className="font-display text-xs tracking-[0.25em] text-primary/60 mb-3 block">CPU · PROCESSOR</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 text-gradient-alt glow-text">
                AMD Ryzen™ 7 8845HS
              </h2>
              <p className="font-body text-lg text-white/70 mb-8 leading-relaxed">
                Built on the incredible Zen 4 architecture, experience lightning-fast speeds for intense gaming, streaming, and content creation without breaking a sweat.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-panel-premium p-6 rounded-xl neon-border">
                
                {benchmarksLeft.map((bar, i) =>
                <StatBar key={i} {...bar} delay={i * 0.15} />
                )}
              </motion.div>
            </motion.div>
          </SectionTransition>
        </div>

        {/* Divider */}
        <SectionTransition>
          <div className="flex items-center gap-6 mb-32">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="font-display text-xs tracking-[0.4em] text-white/20">GRAPHICS</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </SectionTransition>

        {/* GPU Section */}
        <div ref={gpuRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SectionTransition direction="left" delay={0.1}>
            <div>
              <span className="font-display text-xs tracking-[0.25em] text-cyan-400/60 mb-3 block">GPU · GRAPHICS</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 glow-text"
              style={{ textShadow: "0 0 20px rgba(6,182,212,0.6)" }}>
                NVIDIA® GeForce RTX™ 4060
              </h2>
              <p className="font-body text-lg text-white/70 mb-8 leading-relaxed">
                Powered by the ultra-efficient NVIDIA Ada Lovelace architecture, bringing a quantum leap in performance with AI-powered DLSS 3 and full ray tracing.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-panel-premium p-6 rounded-xl"
                style={{ border: "1px solid rgba(6,182,212,0.2)", boxShadow: "0 0 30px rgba(6,182,212,0.06)" }}>
                
                {benchmarksRight.map((bar, i) =>
                <StatBar key={i} {...bar} delay={i * 0.15} />
                )}
              </motion.div>
            </div>
          </SectionTransition>

          <SectionTransition direction="right" delay={0.15}>
            <motion.div
              style={{ y: gpuImgY }}
              className="relative group rounded-2xl overflow-hidden cursor-pointer">
              
              <div className="relative overflow-hidden rounded-2xl">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000"
                  alt="NVIDIA GPU"
                  className="w-full rounded-2xl border border-white/5 opacity-75 group-hover:opacity-100 transition-all duration-700"
                  style={{ boxShadow: "0 0 40px rgba(0,0,0,0.5)" }} />
                
                <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/20 to-transparent mix-blend-overlay rounded-2xl" />
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(6,182,212,0.3), transparent 70%)" }} />
                
                <div className="absolute bottom-4 left-4 font-display text-xs text-cyan-400/70 tracking-widest">
                  ADA LOVELACE ARCH
                </div>
              </div>
            </motion.div>
          </SectionTransition>
        </div>
      </div>
    </PageTransition>);

}