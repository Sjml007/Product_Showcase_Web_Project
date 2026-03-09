import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageTransition from "@/components/PageTransition";

function StatBar({ label, value, colorClass }: { label: string, value: number, colorClass: string }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-2 font-display">
        <span className="text-white tracking-widest text-sm">{label}</span>
        <span className="text-primary font-bold">{value}%</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
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

  return (
    <PageTransition className="min-h-screen pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase"
          >
            Raw <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-primary">Power</span>
          </motion.h1>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Shatter benchmarks with desktop-tier silicon architecture.
          </p>
        </div>

        {/* CPU Section */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* abstract processor glowing Unsplash */}
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000" 
              alt="Processor" 
              className="rounded-2xl border border-white/10 opacity-70 grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay rounded-2xl" />
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/30 blur-3xl rounded-full"
            />
          </motion.div>

          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">AMD Ryzen™ 7 8845HS</h2>
            <p className="font-body text-lg text-muted-foreground mb-8">
              Built on the incredible Zen 4 architecture, experience lightning-fast speeds for intense gaming, streaming, and content creation without breaking a sweat.
            </p>
            
            <div className="glass-panel p-6 rounded-xl">
              <StatBar label="MULTI-CORE RENDERING" value={95} colorClass="bg-primary" />
              <StatBar label="GAMING PERFORMANCE" value={92} colorClass="bg-primary" />
              <StatBar label="POWER EFFICIENCY" value={88} colorClass="bg-primary" />
            </div>
          </div>
        </div>

        {/* GPU Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row-reverse">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative lg:order-2"
          >
             {/* abstract gpu graphic card Unsplash */}
             <img 
              src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000" 
              alt="Graphics Card" 
              className="rounded-2xl border border-white/10 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-bl from-green-500/20 to-transparent mix-blend-overlay rounded-2xl" />
          </motion.div>

          <div className="lg:order-1">
            <h2 className="text-3xl font-display font-bold text-white mb-4">NVIDIA® GeForce RTX™ 4060</h2>
            <p className="font-body text-lg text-muted-foreground mb-8">
              Powered by the ultra-efficient NVIDIA Ada Lovelace architecture, bringing a quantum leap in performance with AI-powered DLSS 3 and full ray tracing.
            </p>
            
            <div className="glass-panel p-6 rounded-xl">
              <StatBar label="RAY TRACING CAPABILITY" value={98} colorClass="bg-emerald-400" />
              <StatBar label="DLSS 3 FRAME GENERATION" value={100} colorClass="bg-emerald-400" />
              <StatBar label="1440P GAMING" value={90} colorClass="bg-emerald-400" />
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
