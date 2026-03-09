import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Plus } from "lucide-react";
import { useState } from "react";

const images = [
  { url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1000", alt: "Sleek Side View" },
  { url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1000", alt: "Keyboard RGB Close-up" },
  { url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000", alt: "Rear Exhaust Vents" },
  { url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1000", alt: "Display Quality" },
];

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <PageTransition className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase">
              Visual <span className="text-gradient-alt glow-text-lg">Showcase</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground mt-4">Inspect every detail of the Nitro V16 Lite.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-xl overflow-hidden cursor-crosshair border border-white/10 glass-panel-premium group hover-lift ${index === 0 || index === 3 ? 'md:col-span-2 md:h-[600px]' : 'h-[400px]'}`}
            >
              <motion.img 
                src={img.url} 
                alt={img.alt}
                animate={{ scale: hoveredIndex === index ? 1.08 : 1, filter: hoveredIndex === index ? "grayscale(0%)" : "grayscale(30%)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full object-cover transition-all duration-700"
              />
              
              {/* Overlay Gradient */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300" 
              />
              
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, rgba(124,255,79,0.1), transparent 70%)`,
                  pointerEvents: 'none'
                }}
              />
              
              {/* Hover Content */}
              <motion.div 
                className="absolute bottom-0 left-0 w-full p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                initial={{ y: 30, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
              >
                <div className="flex items-center justify-between">
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="font-display font-bold text-2xl text-white tracking-widest"
                  >
                    {img.alt}
                  </motion.h3>
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center glow-box-strong cursor-pointer"
                  >
                    <Plus className="w-6 h-6" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
