import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Cpu, Maximize, HardDrive, Battery, Monitor, Weight } from "lucide-react";

const specs = [
  { icon: Cpu, label: "Processor", value: "AMD Ryzen™ 7 8845HS (8 Cores, 16 Threads, up to 5.1 GHz)" },
  { icon: Maximize, label: "Graphics", value: "NVIDIA® GeForce RTX™ 4060 Laptop GPU 8GB GDDR6" },
  { icon: HardDrive, label: "Memory & Storage", value: "16GB DDR5 5600MHz / 1TB PCIe Gen4 NVMe SSD" },
  { icon: Monitor, label: "Display", value: "16\" WQXGA (2560x1600) IPS, 165Hz, 3ms, 100% sRGB" },
  { icon: Battery, label: "Battery & Power", value: "57Wh Li-ion battery, 135W AC Adapter" },
  { icon: Weight, label: "Dimensions", value: "361 x 278 x 25 mm / 2.1 kg (4.63 lbs)" },
];

export default function Specifications() {
  return (
    <PageTransition className="min-h-screen pt-32 pb-24 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,255,79,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,255,79,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-gradient-alt glow-text-lg">TECH SPECS</h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-emerald-400 mx-auto glow-box rounded-full" 
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel-premium rounded-2xl overflow-hidden border border-white/10 neon-border"
        >
          <table className="w-full text-left border-collapse">
            <tbody>
              {specs.map((spec, index) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 group cursor-pointer"
                >
                  <th className="py-6 px-6 md:px-8 w-1/3 align-top font-display text-white border-r border-white/5">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-5 h-5 rounded-lg bg-primary/10 flex items-center justify-center"
                      >
                        <spec.icon className="w-5 h-5 text-primary/70 group-hover:text-primary group-hover:glow-text transition-all" />
                      </motion.div>
                      <span className="tracking-wider uppercase text-sm md:text-base group-hover:text-primary transition-colors">{spec.label}</span>
                    </div>
                  </th>
                  <td className="py-6 px-6 md:px-8 font-body text-lg text-muted-foreground group-hover:text-white transition-all duration-300">
                    {spec.value}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </PageTransition>
  );
}
