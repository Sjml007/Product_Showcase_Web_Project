import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Cpu, Maximize, HardDrive, Battery, Monitor, Weight, ChevronDown } from "lucide-react";
import { useState } from "react";
import GlowBackground from "@/components/GlowBackground";
import SectionTransition from "@/components/SectionTransition";

const specs = [
{
  icon: Cpu,
  label: "Processor",
  value: "AMD Ryzen™ 7 8845HS (8 Cores, 16 Threads, up to 5.1 GHz)",
  extra: "Zen 4 Architecture · 4nm Process Node · 45W TDP",
  accent: "rgba(74,222,128,0.6)"
},
{
  icon: Maximize,
  label: "Graphics",
  value: "NVIDIA® GeForce RTX™ 4060 Laptop GPU 8GB GDDR6",
  extra: "Ada Lovelace · DLSS 3 · Ray Tracing · 80W TGP",
  accent: "rgba(6,182,212,0.6)"
},
{
  icon: HardDrive,
  label: "Memory & Storage",
  value: "16GB DDR5 5600MHz / 1TB PCIe Gen4 NVMe SSD",
  extra: "2× SODIMM upgradeable · 7,000 MB/s read speed",
  accent: "rgba(249,115,22,0.6)"
},
{
  icon: Monitor,
  label: "Display",
  value: '16" WQXGA (2560×1600) IPS, 165Hz, 3ms, 100% sRGB',
  extra: "16:10 aspect · G-Sync Compatible · Dolby Vision",
  accent: "rgba(147,51,234,0.6)"
},
{
  icon: Battery,
  label: "Battery & Power",
  value: "57Wh Li-ion battery, 135W AC Adapter",
  extra: "Up to 6.5 hours video playback · Fast Charge support",
  accent: "rgba(234,179,8,0.6)"
},
{
  icon: Weight,
  label: "Dimensions",
  value: "361 × 278 × 25 mm / 2.1 kg (4.63 lbs)",
  extra: "Aluminum lid finish · Military-grade MIL-SPEC tested",
  accent: "rgba(156,163,175,0.6)"
}];


export default function Specifications() {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <PageTransition className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Animated background layers */}
      <GlowBackground variant="minimal" />

      {/* Futuristic animated grid */}
      <motion.div
        animate={{ backgroundPositionY: ["0px", "60px"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
          "linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 50%, transparent 100%)"
        }} />
      

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <SectionTransition className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/2 mb-6">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-primary"
              style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }} />
            
            <span className="font-display text-xs tracking-[0.2em] text-white/50">FULL SPECIFICATIONS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black text-white mb-6 text-gradient-alt glow-text-lg">
            TECH SPECS
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] mx-auto rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, #4ade80, #4DFFB0, transparent)",
              boxShadow: "0 0 12px rgba(74,222,128,0.6)"
            }} />
          
        </SectionTransition>

        {/* Specs List */}
        <div className="space-y-3">
          {specs.map((spec, index) =>
          <SectionTransition key={index} delay={index * 0.08} direction="left">
              <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={() => setExpandedIdx(expandedIdx === index ? null : index)}
              className="group cursor-pointer rounded-xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.3s, box-shadow 0.3s",
                ...(expandedIdx === index && {
                  borderColor: spec.accent.replace("0.6", "0.25"),
                  boxShadow: `0 0 30px ${spec.accent.replace("0.6", "0.08")}`
                })
              }}>
              
                <div className="flex items-center gap-5 p-5 md:p-6">
                  {/* Icon */}
                  <motion.div
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: spec.accent.replace("0.6", "0.08"),
                    border: `1px solid ${spec.accent.replace("0.6", "0.2")}`
                  }}>
                  
                    <spec.icon
                    className="w-5 h-5 transition-all duration-300"
                    style={{ color: expandedIdx === index ? spec.accent : "rgba(255,255,255,0.4)" }} />
                  
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <span
                    className="font-display text-xs tracking-[0.2em] mb-1 block"
                    style={{ color: spec.accent.replace("0.6", "0.5") }}>
                    
                      {spec.label.toUpperCase()}
                    </span>
                    <p className="font-body text-white/80 group-hover:text-white transition-colors text-sm md:text-base leading-snug">
                      {spec.value}
                    </p>
                  </div>

                  {/* Expand toggle */}
                  <motion.div
                  animate={{ rotate: expandedIdx === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/20 group-hover:text-white/50 transition-colors shrink-0">
                  
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>

                {/* Expandable details */}
                <AnimatePresence>
                  {expandedIdx === index &&
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden">
                  
                      <div
                    className="px-6 pb-5 pt-1 border-t"
                    style={{ borderColor: spec.accent.replace("0.6", "0.1") }}>
                    
                        <p className="font-body text-sm leading-relaxed" style={{ color: spec.accent.replace("0.6", "0.7") }}>
                          {spec.extra}
                        </p>
                      </div>
                    </motion.div>
                }
                </AnimatePresence>
              </motion.div>
            </SectionTransition>
          )}
        </div>

        {/* Footer note */}
        <SectionTransition delay={0.6} className="text-center mt-12">
          <p className="font-body text-xs text-white/20 tracking-widest">
            SPECIFICATIONS MAY VARY BY REGION · SUBJECT TO CHANGE WITHOUT NOTICE
          </p>
        </SectionTransition>
      </div>
    </PageTransition>);

}