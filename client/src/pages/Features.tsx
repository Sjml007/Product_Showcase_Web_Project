import { motion } from "framer-motion";
import { Keyboard, Monitor, Wind, HardDrive, Wifi, Feather } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Tilt3D from "@/components/Tilt3D";

const features = [
  {
    icon: Keyboard,
    title: "4-Zone RGB Keyboard",
    desc: "Customize your battle station with vibrant, per-zone RGB lighting and a dedicated NitroSense key for instant control.",
    color: "from-purple-500/20 to-blue-500/20"
  },
  {
    icon: Monitor,
    title: "165Hz WQXGA Display",
    desc: "Experience buttery-smooth gameplay with a 16\" 16:10 display, boasting a 165Hz refresh rate and 100% sRGB color gamut.",
    color: "from-primary/20 to-emerald-500/20"
  },
  {
    icon: Wind,
    title: "Vortex Cooling",
    desc: "Dual fans and quad-exhaust design keep thermals perfectly balanced even during the most intense gaming sessions.",
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    icon: HardDrive,
    title: "PCIe Gen 4 SSD",
    desc: "Lightning-fast load times with up to 1TB NVMe SSD storage, ensuring you're always the first to join the match.",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    icon: Wifi,
    title: "Wi-Fi 6E Connectivity",
    desc: "Dominate online with Killer™ Wi-Fi 6E AX1675i, prioritizing game traffic and reducing latency to near zero.",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    icon: Feather,
    title: "Ultra-Light Chassis",
    desc: "Weighing just 2.1kg, the Lite edition brings heavy-weight performance in a surprisingly portable form factor.",
    color: "from-zinc-500/20 to-stone-500/20"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 } 
  }
};

export default function Features() {
  return (
    <PageTransition className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-display text-xs tracking-widest mb-4 neon-border shimmer cursor-pointer"
          >
            ARSENAL OF FEATURES
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
          >
            ENGINEERED TO <span className="text-gradient-alt glow-text-lg">WIN</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Every component, every curve, and every feature has been meticulously crafted to give you the ultimate competitive advantage.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
            >
              <Tilt3D className="h-full">
                <motion.div
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="relative group rounded-2xl glass-panel-premium p-8 overflow-hidden isolate hover-lift neon-border cursor-pointer h-full"
                >
                  {/* Animated Background Gradient */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  {/* Animated Border Glow on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, rgba(124,255,79,0.2), transparent 80%)`,
                      pointerEvents: 'none'
                    }}
                  />

                  <div className="relative z-10">
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-all duration-300 neon-border"
                    >
                      <feature.icon className="w-8 h-8 text-white group-hover:text-primary group-hover:glow-text transition-all duration-300" />
                    </motion.div>
                    
                    <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="font-body text-lg text-muted-foreground leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      {feature.desc}
                    </p>
                  </div>
                  
                  {/* Decorative corner glow */}
                  <motion.div 
                    className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    whileHover={{ scale: 1.5 }}
                  />

                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                    whileHover={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              </Tilt3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
