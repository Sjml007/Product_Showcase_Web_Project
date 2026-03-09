import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Zap, Shield, Crosshair } from "lucide-react";
import { Link } from "wouter";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <PageTransition className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary font-display text-sm tracking-widest mb-6 backdrop-blur-sm">
              NEXT-GEN PERFORMANCE
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-6">
              UNLEASH <br />
              <span className="text-gradient">GAMING POWER</span>
            </h1>
            <p className="text-xl font-body text-muted-foreground mb-8 max-w-lg">
              The Acer Nitro V16 Lite. Desktop-class performance compressed into an ultra-sleek, portable chassis. Dominate anywhere.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary text-black font-display font-bold tracking-wider rounded-lg glow-box-hover transition-all"
                >
                  PRE-ORDER NOW
                </motion.button>
              </Link>
              <Link href="/features">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 text-white border border-white/10 font-display font-bold tracking-wider rounded-lg hover:bg-white/10 transition-all"
                >
                  DISCOVER FEATURES
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: y1 }}
            className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center"
          >
            {/* abstract cinematic gaming laptop concept Unsplash */}
            <motion.img 
              animate={{ 
                y: [0, -20, 0],
                rotateZ: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=2000" 
              alt="Acer Nitro V16 Lite" 
              className="relative z-10 max-w-[120%] lg:max-w-[150%] object-contain drop-shadow-[0_0_50px_rgba(124,255,79,0.3)]"
            />
            
            {/* Decoration Rings */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-[400px] h-[400px] border border-white/5 rounded-full absolute" 
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-[500px] h-[500px] border border-primary/10 rounded-full absolute border-dashed" 
              />
            </div>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="font-display text-xs tracking-[0.3em]">SCROLL</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-primary" />
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
              className="glass-panel p-8 rounded-2xl flex items-start gap-6 group hover:border-primary/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="font-body text-muted-foreground text-lg">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
