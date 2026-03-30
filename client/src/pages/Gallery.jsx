import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import GlowBackground from "@/components/GlowBackground";
import SectionTransition from "@/components/SectionTransition";
import { Plus, ZoomIn, X } from "lucide-react";
import { useState, useRef } from "react";

const images = [
{
  url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1200",
  alt: "Sleek Side View",
  desc: "Aerodynamic form factor. 25mm thin. Machined aluminum finish.",
  span: "col-span-2",
  height: "h-[420px]"
},
{
  url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800",
  alt: "4-Zone RGB Keyboard",
  desc: "16.8M color RGB per zone. NitroSense dedicated key.",
  span: "",
  height: "h-[340px]"
},
{
  url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800",
  alt: "Cooling Exhaust Design",
  desc: "Dual-fan vortex. Quad exhaust. Zero throttling.",
  span: "",
  height: "h-[340px]"
},
{
  url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1200",
  alt: "165Hz WQXGA Display",
  desc: "2560×1600 res. 100% sRGB. 3ms response. Zero blur.",
  span: "col-span-2",
  height: "h-[420px]"
}];


export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

  return (
    <PageTransition className="min-h-screen pt-32 pb-24 relative">
      <GlowBackground variant="section" />

      <section ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div style={{ y: headerY }} className="mb-16">
          <SectionTransition>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/2 mb-5">
                  <ZoomIn className="w-4 h-4 text-primary" />
                  <span className="font-display text-xs tracking-[0.2em] text-white/50">VISUAL SHOWCASE</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase">
                  Visual{" "}
                  <span className="text-gradient-alt glow-text-xl">Showcase</span>
                </h1>
                <p className="font-body text-xl text-white/40 mt-4">
                  Inspect every detail of the Nitro V16 Lite.
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2 rounded-lg border border-white/10 bg-white/3 font-display text-xs tracking-widest text-white/40 cursor-pointer self-start md:self-auto">
                
                {images.length} IMAGES
              </motion.div>
            </div>
          </SectionTransition>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {images.map((img, index) =>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setLightboxIndex(index)}
            className={`relative rounded-2xl overflow-hidden cursor-crosshair border border-white/8 group ${img.span} ${img.height}`}
            style={{
              boxShadow: hoveredIndex === index ?
              "0 0 40px rgba(74,222,128,0.15), 0 20px 60px rgba(0,0,0,0.6)" :
              "0 4px 20px rgba(0,0,0,0.4)",
              transition: "box-shadow 0.4s"
            }}>
            
              {/* Image with parallax zoom */}
              <motion.img
              src={img.url}
              alt={img.alt}
              animate={{
                scale: hoveredIndex === index ? 1.08 : 1,
                filter: hoveredIndex === index ? "grayscale(0%) brightness(1.05)" : "grayscale(25%) brightness(0.85)"
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full h-full object-cover" />
            

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Neon glow on hover */}
              <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, rgba(74,222,128,0.08), transparent 70%)"
              }} />
            

              {/* Scan-line micro effect */}
              <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)"
              }} />
            

              {/* Bottom content */}
              <motion.div
              className="absolute bottom-0 left-0 right-0 p-6"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}>
              
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white tracking-widest mb-1">
                      {img.alt}
                    </h3>
                    <p className="font-body text-sm text-white/50">{img.desc}</p>
                  </div>
                  <motion.div
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-11 h-11 rounded-full bg-primary/90 text-black flex items-center justify-center shrink-0 ml-4"
                  style={{ boxShadow: "0 0 20px rgba(74,222,128,0.5)" }}>
                  
                    <Plus className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Corner index */}
              <div className="absolute top-4 right-4 font-display text-xs text-white/20">
                0{index + 1}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl cursor-zoom-out p-6">
          
            <motion.div
            initial={{ scale: 0.85, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.85, opacity: 0, filter: "blur(20px)" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 0 80px rgba(74,222,128,0.15), 0 40px 100px rgba(0,0,0,0.8)" }}>
            
              <img
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt}
              className="w-full object-cover max-h-[80vh]" />
            
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="font-display text-2xl font-bold text-white mb-1">{images[lightboxIndex].alt}</h3>
                <p className="font-body text-white/50">{images[lightboxIndex].desc}</p>
              </div>
              <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white">
              
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </PageTransition>);

}