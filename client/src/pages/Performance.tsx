import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageTransition from "@/components/PageTransition";

function StatBar({ label, value, colorClass }: { label: string, value: number, colorClass: string }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-2 font-display">
        <span className="text-white tracking-widest text-sm">{label}</span>
        <motion.span 
          className="text-primary font-bold glow-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {value}%
        </motion.span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden neon-border">
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: `${value}%`, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full ${colorClass} glow-box`}
        />
      </div>
    </div>
  );
}

export default function Performance() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <PageTransition className="min-h-screen pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase"
          >
            Raw <span className="text-gradient-alt glow-text-lg">Power</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-body text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Shatter benchmarks with desktop-tier silicon architecture.
          </motion.p>
        </div>

        {/* CPU Section */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ opacity }}
            className="relative group hover-lift rounded-2xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000" 
              alt="Processor" 
              className="rounded-2xl border border-white/10 opacity-70 grayscale contrast-125 neon-border group-hover:opacity-100 transition-all duration-500 w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay rounded-2xl" />
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/30 blur-3xl rounded-full"
            />
          </motion.div>

          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-bold text-white mb-4 text-gradient-alt glow-text"
            >
              AMD Ryzen™ 7 8845HS
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-body text-lg text-muted-foreground mb-8"
            >
              Built on the incredible Zen 4 architecture, experience lightning-fast speeds for intense gaming, streaming, and content creation without breaking a sweat.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-panel-premium p-6 rounded-xl neon-border hover-lift"
            >
              <StatBar label="MULTI-CORE RENDERING" value={95} colorClass="bg-primary" />
              <StatBar label="GAMING PERFORMANCE" value={92} colorClass="bg-primary" />
              <StatBar label="POWER EFFICIENCY" value={88} colorClass="bg-primary" />
            </motion.div>
          </div>
        </div>

        {/* GPU Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row-reverse">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:order-2 relative group hover-lift rounded-2xl overflow-hidden"
            style={{ opacity }}
          >
            <img 
              src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000" 
              alt="Graphics Card" 
              className="rounded-2xl border border-white/10 opacity-80 neon-border group-hover:opacity-100 transition-all duration-500 w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/20 to-transparent mix-blend-overlay rounded-2xl" />
          </motion.div>

          <div className="lg:order-1">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-bold text-white mb-4 text-gradient-alt glow-text"
            >
              NVIDIA® GeForce RTX™ 4060
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-body text-lg text-muted-foreground mb-8"
            >
              Powered by the ultra-efficient NVIDIA Ada Lovelace architecture, bringing a quantum leap in performance with AI-powered DLSS 3 and full ray tracing.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-panel-premium p-6 rounded-xl neon-border hover-lift"
            >
              <StatBar label="RAY TRACING CAPABILITY" value={98} colorClass="bg-emerald-400" />
              <StatBar label="DLSS 3 FRAME GENERATION" value={100} colorClass="bg-emerald-400" />
              <StatBar label="1440P GAMING" value={90} colorClass="bg-emerald-400" />
            </motion.div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
