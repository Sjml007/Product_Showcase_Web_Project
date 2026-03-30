import { motion, useScroll, useTransform } from "framer-motion";
import { Keyboard, Monitor, Wind, HardDrive, Wifi, Feather, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import PageTransition from "@/components/PageTransition";
import Tilt3D from "@/components/Tilt3D";
import GlowBackground from "@/components/GlowBackground";
import SectionTransition from "@/components/SectionTransition";
import AnimatedParticles from "@/components/AnimatedParticles";

const features = [
{
  icon: Keyboard,
  title: "4-Zone RGB Keyboard",
  desc: "Customize your battle station with vibrant, per-zone RGB lighting and a dedicated NitroSense key for instant control.",
  color: "from-purple-500/20 to-blue-500/20",
  accentColor: "rgba(147,51,234,0.6)",
  tag: "CUSTOMIZABLE",
  stat: "16.8M Colors"
},
{
  icon: Monitor,
  title: "165Hz WQXGA Display",
  desc: "Experience buttery-smooth gameplay with a 16\" 16:10 display, boasting a 165Hz refresh rate and 100% sRGB color gamut.",
  color: "from-primary/20 to-emerald-500/20",
  accentColor: "rgba(74,222,128,0.6)",
  tag: "FLAGSHIP",
  stat: "2560×1600"
},
{
  icon: Wind,
  title: "Vortex Cooling",
  desc: "Dual fans and quad-exhaust design keep thermals perfectly balanced even during the most intense gaming sessions.",
  color: "from-cyan-500/20 to-blue-500/20",
  accentColor: "rgba(6,182,212,0.6)",
  tag: "ENGINEERED",
  stat: "4 Exhaust Vents"
},
{
  icon: HardDrive,
  title: "PCIe Gen 4 SSD",
  desc: "Lightning-fast load times with up to 1TB NVMe SSD storage, ensuring you're always the first to join the match.",
  color: "from-orange-500/20 to-red-500/20",
  accentColor: "rgba(249,115,22,0.6)",
  tag: "BLAZING FAST",
  stat: "7,000 MB/s"
},
{
  icon: Wifi,
  title: "Wi-Fi 6E Connectivity",
  desc: "Dominate online with Killer™ Wi-Fi 6E AX1675i, prioritizing game traffic and reducing latency to near zero.",
  color: "from-blue-500/20 to-indigo-500/20",
  accentColor: "rgba(59,130,246,0.6)",
  tag: "LOW LATENCY",
  stat: "6 GHz Band"
},
{
  icon: Feather,
  title: "Ultra-Light Chassis",
  desc: "Weighing just 2.1kg, the Lite edition brings heavy-weight performance in a surprisingly portable form factor.",
  color: "from-zinc-500/20 to-stone-500/20",
  accentColor: "rgba(113,113,122,0.6)",
  tag: "PORTABLE",
  stat: "2.1 kg"
}];


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.93, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 16 }
  }
};

export default function Features() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <PageTransition className="min-h-screen pt-32 pb-28 relative overflow-hidden">
      <AnimatedParticles count={12} />
      <GlowBackground variant="section" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div ref={headerRef} style={{ y: headerY }} className="text-center mb-24">
          <SectionTransition>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block px-5 py-2 rounded-full border border-primary/25 bg-primary/5 text-primary font-display text-xs tracking-widest mb-6 neon-border cursor-pointer shimmer">
              
              ARSENAL OF FEATURES
            </motion.div>
          </SectionTransition>

          <SectionTransition delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-none">
              ENGINEERED TO{" "}
              <span className="text-gradient-alt glow-text-xl">WIN</span>
            </h1>
          </SectionTransition>

          <SectionTransition delay={0.2}>
            <p className="font-body text-xl text-white/70 max-w-xl mx-auto leading-relaxed">
              Every component, every curve, and every feature has been meticulously crafted to give you the ultimate competitive advantage.
            </p>
          </SectionTransition>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {features.map((feature, i) =>
          <motion.div
            key={i}
            variants={itemVariants}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}>
            
              <Tilt3D className="h-full group" intensity={10}>
                <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                className={`relative rounded-2xl glass-panel-premium p-8 overflow-hidden h-full cursor-pointer flex flex-col`}
                style={{
                  borderColor: hoveredIdx === i ? `${feature.accentColor.replace("0.6", "0.3")}` : "rgba(255,255,255,0.06)",
                  boxShadow: hoveredIdx === i ?
                  `0 0 40px ${feature.accentColor.replace("0.6", "0.15")}, 0 20px 50px rgba(0,0,0,0.5)` :
                  "0 4px 20px rgba(0,0,0,0.3)",
                  transition: "border-color 0.4s, box-shadow 0.4s"
                }}>
                
                  {/* Animated gradient fill on hover */}
                  <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} transition-opacity duration-500 rounded-2xl`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIdx === i ? 1 : 0 }} />
                

                  {/* Radial spotlight on hover */}
                  <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{
                    background: hoveredIdx === i ?
                    `radial-gradient(circle at 30% 20%, ${feature.accentColor.replace("0.6", "0.12")}, transparent 65%)` :
                    "transparent"
                  }}
                  transition={{ duration: 0.4 }} />
                

                  {/* Tag + Stat */}
                  <div className="relative z-10 flex justify-between items-start mb-6">
                    <span
                    className="font-display text-[10px] tracking-[0.2em] px-2 py-0.5 rounded border"
                    style={{
                      color: feature.accentColor,
                      borderColor: feature.accentColor.replace("0.6", "0.3"),
                      backgroundColor: feature.accentColor.replace("0.6", "0.08")
                    }}>
                    
                      {feature.tag}
                    </span>
                    <span className="font-display text-xs text-white/30">{feature.stat}</span>
                  </div>

                  {/* Icon */}
                  <motion.div
                  whileHover={{ scale: 1.2, rotate: 12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative z-10 w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:border-white/20 transition-all duration-300"
                  style={{
                    boxShadow: hoveredIdx === i ? `0 0 20px ${feature.accentColor.replace("0.6", "0.3")}` : "none"
                  }}>
                  
                    <feature.icon
                    className="w-7 h-7 transition-all duration-300"
                    style={{ color: hoveredIdx === i ? feature.accentColor : "rgba(255,255,255,0.6)" }} />
                  
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 flex-1">
                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="font-body text-white/70 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Bottom learn more */}
                  <motion.div
                  className="relative z-10 mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}>
                  
                    <span
                    className="font-display text-xs tracking-widest"
                    style={{ color: feature.accentColor }}>
                    
                      LEARN MORE
                    </span>
                    <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{ color: feature.accentColor }}>
                    
                      <ArrowRight className="w-3 h-3" />
                    </motion.span>
                  </motion.div>

                  {/* Corner glow */}
                  <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: feature.accentColor.replace("0.6", "0.15"), filter: "blur(20px)" }} />
                
                </motion.div>
              </Tilt3D>
            </motion.div>
          )}
        </motion.div>
      </div>
    </PageTransition>);

}