import { motion } from "framer-motion";
import { Keyboard, Monitor, Wind, HardDrive, Wifi, Feather } from "lucide-react";
import PageTransition from "@/components/PageTransition";

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
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function Features() {
  return (
    <PageTransition className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-display text-xs tracking-widest mb-4"
          >
            ARSENAL OF FEATURES
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
          >
            ENGINEERED TO <span className="text-gradient">WIN</span>
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
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="relative group rounded-2xl glass-panel p-8 overflow-hidden isolate"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:glow-box transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
              
              {/* Decorative corner element */}
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
