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
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase">
              Visual <span className="text-primary">Showcase</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground mt-4">Inspect every detail of the Nitro V16 Lite.</p>
          </div>
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
              className={`relative rounded-xl overflow-hidden cursor-crosshair border border-white/10 glass-panel group ${index === 0 || index === 3 ? 'md:col-span-2 md:h-[600px]' : 'h-[400px]'}`}
            >
              <motion.img 
                src={img.url} 
                alt={img.alt}
                animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Hover Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-2xl text-white tracking-widest">{img.alt}</h3>
                  <div className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center glow-box">
                    <Plus className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
