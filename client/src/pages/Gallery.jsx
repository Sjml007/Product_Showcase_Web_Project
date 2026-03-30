import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import GlowBackground from "@/components/GlowBackground";
import SectionTransition from "@/components/SectionTransition";
import { Plus, ZoomIn, X, Upload, Star, Tag, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";

const initialImages = [
  {
    url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1200",
    alt: "Sleek Side View",
    desc: "Aerodynamic form factor. 25mm thin. Machined aluminum finish.",
    span: "col-span-1 md:col-span-2",
    height: "h-[420px]",
    fit: "cover",
    highlight: false,
    category: "Hardware",
  },
  {
    url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800",
    alt: "4-Zone RGB Keyboard",
    desc: "16.8M color RGB per zone. NitroSense dedicated key.",
    span: "col-span-1",
    height: "h-[340px]",
    fit: "cover",
    highlight: false,
    category: "Accessories",
  },
  {
    url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800",
    alt: "Cooling Exhaust Design",
    desc: "Dual-fan vortex. Quad exhaust. Zero throttling.",
    span: "col-span-1",
    height: "h-[340px]",
    fit: "cover",
    highlight: false,
    category: "Thermals",
  },
  {
    url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1200",
    alt: "165Hz WQXGA Display",
    desc: "2560×1600 res. 100% sRGB. 3ms response. Zero blur.",
    span: "col-span-1 md:col-span-2",
    height: "h-[420px]",
    fit: "cover",
    highlight: true,
    category: "Display",
  }
];

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState(initialImages);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const containerRef = useRef(null);

  // Upload State
  const fileInputRef = useRef(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadConfig, setUploadConfig] = useState({
    title: "New Image",
    description: "User uploaded image",
    size: "Medium",
    fit: "Cover",
    category: "",
    highlight: false,
  });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target.result);
      setUploadConfig(prev => ({ 
        ...prev, 
        title: file.name.split('.')[0] || "New Image",
        description: "User uploaded image",
        size: "Medium",
        fit: "Cover",
        category: "",
        highlight: false,
      }));
      setIsUploadModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = () => {
    if (!previewImage) return;

    let span = "col-span-1";
    let height = "h-[340px]";
    
    if (uploadConfig.size === "Small") {
      height = "h-[240px]";
    } else if (uploadConfig.size === "Large") {
      span = "col-span-1 md:col-span-2";
      height = "h-[420px]";
    }

    const newImage = {
      url: previewImage,
      alt: uploadConfig.title || "Uploaded Image",
      desc: uploadConfig.description || "",
      span,
      height,
      fit: uploadConfig.fit.toLowerCase(),
      category: uploadConfig.category || "",
      highlight: uploadConfig.highlight
    };

    setGalleryImages(prev => [...prev, newImage]);
    closeUploadModal();
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
    setTimeout(() => {
      setPreviewImage(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }, 300);
  };

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
                  <span className="font-display text-xs tracking-[0.2em] text-white/70">VISUAL SHOWCASE</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase">
                  Visual{" "}
                  <span className="text-gradient-alt glow-text-xl">Showcase</span>
                </h1>
                <p className="font-body text-xl text-white/60 mt-4">
                  Inspect every detail of the Nitro V16 Lite.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 self-start md:self-auto">
                <motion.div
                  className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/3 font-display text-xs tracking-widest text-white/60">
                  {galleryImages.length} IMAGES
                </motion.div>
                
                {/* Upload Button */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/40 bg-primary/10 font-display font-bold text-xs tracking-widest text-primary hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(74,222,128,0.15)]">
                  <Upload className="w-4 h-4" />
                  UPLOAD
                </motion.button>
              </div>
            </div>
          </SectionTransition>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence>
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setLightboxIndex(index)}
                className={`relative rounded-2xl overflow-hidden cursor-crosshair group ${img.span} ${img.height} ${
                  img.highlight ? 'border border-primary' : 'border border-white/8'
                }`}
                style={{
                  boxShadow: img.highlight 
                    ? "0 0 30px rgba(74,222,128,0.2), inset 0 0 20px rgba(74,222,128,0.1)" 
                    : hoveredIndex === index 
                      ? "0 0 40px rgba(74,222,128,0.15), 0 20px 60px rgba(0,0,0,0.6)" 
                      : "0 4px 20px rgba(0,0,0,0.4)",
                  transition: "box-shadow 0.4s"
                }}>
                
                {/* Image with parallax zoom */}
                <motion.img
                  src={img.url}
                  alt={img.alt}
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                    filter: hoveredIndex === index ? "brightness(1)" : img.highlight ? "brightness(0.9)" : "brightness(0.7)"
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`w-full h-full ${img.fit === "contain" ? "object-contain bg-black/40" : "object-cover"}`} 
                />

                {/* Tags / Badges */}
                <div className="absolute top-4 left-4 flex gap-2 pointer-events-none z-20">
                  {img.category && (
                    <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-xl">
                      <Tag className="w-3 h-3 text-white/70" />
                      <span className="font-display text-[10px] uppercase tracking-wider text-white">{img.category}</span>
                    </div>
                  )}
                  {img.highlight && (
                    <div className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/50 flex items-center gap-1.5 shadow-[0_0_10px_rgba(74,222,128,0.3)]">
                      <Star className="w-3 h-3 text-primary fill-primary" />
                      <span className="font-display text-[10px] uppercase tracking-wider text-primary">Featured</span>
                    </div>
                  )}
                </div>

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Neon glow on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at center, rgba(74,222,128,0.08), transparent 70%)"
                  }} 
                />

                {/* Scan-line micro effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)"
                  }} 
                />

                {/* Bottom content */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}>
                  <div className="flex items-end justify-between">
                    <div className="max-w-[80%]">
                      <h3 className={`font-display font-bold text-xl tracking-widest mb-1 ${img.highlight ? 'text-primary' : 'text-white'}`}>
                        {img.alt}
                      </h3>
                      <p className="font-body text-sm text-white/80">{img.desc}</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center shrink-0 ml-4 hover:bg-primary/90 hover:text-black hover:border-transparent"
                      style={{ boxShadow: hoveredIndex === index ? "0 0 20px rgba(74,222,128,0.5)" : "none" }}>
                      <Plus className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Corner index */}
                <div className="absolute top-4 right-4 font-display text-xs text-white/30 z-20 mix-blend-difference">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Upload Configuration Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-black/95 border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_40px_rgba(74,222,128,0.1)] flex flex-col md:flex-row max-h-[90vh]">
              
              {/* Left Side: Live Preview */}
              <div className="w-full md:w-1/2 p-6 flex flex-col bg-[#080808] border-b md:border-b-0 md:border-r border-white/5 relative items-center justify-center">
                <div className="absolute top-4 left-4 font-display text-xs tracking-widest text-white/40 uppercase">
                  Live Preview
                </div>
                
                <div 
                  className={`relative rounded-xl overflow-hidden border ${uploadConfig.highlight ? 'border-primary' : 'border-white/10'} transition-all duration-300 w-full flex items-center justify-center`}
                  style={{ 
                    height: uploadConfig.size === "Small" ? "200px" : uploadConfig.size === "Medium" ? "280px" : "340px",
                    boxShadow: uploadConfig.highlight ? "0 0 25px rgba(74,222,128,0.15), inset 0 0 15px rgba(74,222,128,0.1)" : "none"
                  }}
                >
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className={`w-full h-full ${uploadConfig.fit === "Contain" ? "object-contain bg-black/50" : "object-cover"}`} 
                  />
                  
                  {/* Badges preview */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {uploadConfig.category && (
                      <div className="px-2 py-0.5 rounded-full bg-black/60 border border-white/10 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5 text-white/70" />
                        <span className="font-display text-[8px] uppercase tracking-wider text-white">{uploadConfig.category}</span>
                      </div>
                    )}
                    {uploadConfig.highlight && (
                      <div className="px-2 py-0.5 rounded-full bg-primary/20 border border-primary/50 flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 text-primary fill-primary" />
                        <span className="font-display text-[8px] uppercase tracking-wider text-primary">Featured</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Gradient & Content Preview */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className={`font-display font-bold text-lg leading-tight mb-1 truncate ${uploadConfig.highlight ? 'text-primary glow-text' : 'text-white'}`}>
                      {uploadConfig.title}
                    </h3>
                    <p className="font-body text-xs text-white/70 truncate">{uploadConfig.description}</p>
                  </div>
                </div>
              </div>

              {/* Right Side: Configuration Form */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto custom-scrollbar">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-6 uppercase flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    Display Settings
                  </h2>

                  <div className="space-y-6">
                    {/* Size Selector */}
                    <div>
                      <label className="block font-display text-[10px] tracking-widest text-white/60 mb-3 uppercase">
                        Layout Size
                      </label>
                      <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                        {["Small", "Medium", "Large"].map((s) => (
                          <button
                            key={s}
                            onClick={() => setUploadConfig({...uploadConfig, size: s})}
                            className={`flex-1 py-2 rounded-md font-display text-xs tracking-wider transition-all duration-300 ${
                              uploadConfig.size === s 
                                ? "bg-primary text-black font-bold shadow-[0_0_15px_rgba(74,222,128,0.3)]" 
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Fit Selector */}
                    <div>
                      <label className="block font-display text-[10px] tracking-widest text-white/60 mb-3 uppercase">
                        Aspect Ratio / Fit
                      </label>
                      <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                        {["Cover", "Contain"].map((f) => (
                          <button
                            key={f}
                            onClick={() => setUploadConfig({...uploadConfig, fit: f})}
                            className={`flex-1 py-2 rounded-md font-body font-semibold text-sm transition-all duration-300 ${
                              uploadConfig.fit === f 
                                ? "bg-white/10 text-white shadow-sm border border-white/10" 
                                : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block font-display text-[10px] tracking-widest text-white/60 mb-2 uppercase">Image Title</label>
                        <input 
                          type="text" 
                          value={uploadConfig.title}
                          onChange={(e) => setUploadConfig({...uploadConfig, title: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm font-body outline-none focus:border-primary/50 transition-colors"
                          placeholder="e.g. RGB Keyboard Macro"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block font-display text-[10px] tracking-widest text-white/60 mb-2 uppercase">Description</label>
                        <input 
                          type="text" 
                          value={uploadConfig.description}
                          onChange={(e) => setUploadConfig({...uploadConfig, description: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm font-body outline-none focus:border-primary/50 transition-colors"
                          placeholder="Write a short description"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block font-display text-[10px] tracking-widest text-white/60 mb-2 uppercase">Category & Tag (Optional)</label>
                        <div className="relative">
                          <Tag className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text" 
                            value={uploadConfig.category}
                            onChange={(e) => setUploadConfig({...uploadConfig, category: e.target.value})}
                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm font-body outline-none focus:border-primary/50 transition-colors"
                            placeholder="e.g. Thermal, Design, Display"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Highlight Toggle */}
                    <div 
                      className={`cursor-pointer rounded-lg border p-4 flex items-center justify-between transition-all duration-300 ${
                        uploadConfig.highlight 
                          ? 'bg-primary/5 border-primary/30' 
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                      onClick={() => setUploadConfig({...uploadConfig, highlight: !uploadConfig.highlight})}
                    >
                      <div className="flex flex-col">
                        <span className={`font-display text-sm font-bold uppercase ${uploadConfig.highlight ? 'text-primary' : 'text-white'}`}>
                          Feature this image
                        </span>
                        <span className="font-body text-xs text-white/50">Makes it prominent with a glowing border</span>
                      </div>
                      <div className={`w-10 h-6 rounded-full relative transition-colors duration-300 ${uploadConfig.highlight ? 'bg-primary' : 'bg-white/20'}`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${uploadConfig.highlight ? 'translate-x-4 shadow-sm' : ''}`} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
                  <button 
                    onClick={closeUploadModal}
                    className="flex-1 py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-white font-display text-xs font-bold tracking-wider transition-colors"
                  >
                    CANCEL
                  </button>
                  <button 
                    onClick={handleUploadSubmit}
                    className="flex-[2] py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-emerald-500 text-black font-display text-xs font-bold tracking-wider transition-all hover:brightness-110 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(74,222,128,0.2)]"
                  >
                    <Plus className="w-4 h-4" /> ADD TO GALLERY
                  </button>
                </div>
              </div>

              <button
                onClick={closeUploadModal}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
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
              className={`relative max-w-5xl w-full rounded-2xl overflow-hidden ${galleryImages[lightboxIndex].fit === "contain" ? "bg-black/95 flex items-center justify-center pt-8" : ""}`}
              style={{ boxShadow: "0 0 80px rgba(74,222,128,0.15), 0 40px 100px rgba(0,0,0,0.8)" }}>
              
              <img
                src={galleryImages[lightboxIndex].url}
                alt={galleryImages[lightboxIndex].alt}
                className={`w-full ${galleryImages[lightboxIndex].fit === "contain" ? "object-contain max-h-[70vh]" : "object-cover max-h-[80vh]"}`} 
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <h3 className="font-display text-2xl font-bold text-white mb-1">{galleryImages[lightboxIndex].alt}</h3>
                <p className="font-body text-white/70">{galleryImages[lightboxIndex].desc}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white">
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}