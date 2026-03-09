import { motion, useScroll, useTransform } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { CheckCircle2, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useState, useRef } from "react";

const benefits = [
  { icon: CheckCircle2, text: "Includes 1 Month Xbox Game Pass" },
  { icon: ShieldCheck, text: "2-Year Premium Warranty" },
  { icon: Truck, text: "Free Express Shipping" },
  { icon: RotateCcw, text: "30-Day Money-Back Guarantee" }
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <PageTransition className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Animated Background Glow */}
      <motion.div 
        animate={{ 
          x: [0, 50, -50, 0],
          y: [0, 30, -30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-primary/15 blur-[150px] rounded-full pointer-events-none"
      />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Product Summary */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl font-display font-black text-white uppercase mb-4 text-gradient-alt glow-text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Secure Yours
          </motion.h1>
          <motion.p 
            className="font-body text-xl text-muted-foreground mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Pre-order the Acer Nitro V16 Lite today and be the first to experience portable dominance.
          </motion.p>

          <motion.div 
            style={{ y, opacity }}
            className="glass-panel-premium p-8 rounded-2xl border border-primary/20 mb-8 relative overflow-hidden neon-border hover-lift"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-0 right-0 p-4"
            >
              <motion.span 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-primary text-black font-display font-bold text-xs px-3 py-1 rounded-full uppercase tracking-widest glow-box-strong"
              >
                IN STOCK SOON
              </motion.span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-display text-2xl font-bold text-white mb-2">Nitro V16 Lite</h3>
              <p className="text-muted-foreground font-body mb-6">RTX 4060 | Ryzen 7 | 16GB RAM | 1TB SSD</p>
              
              <div className="flex items-end gap-4 mb-8 border-b border-white/10 pb-8">
                <span className="font-display text-5xl font-bold text-primary glow-text">$1,299</span>
                <span className="font-body text-muted-foreground line-through text-xl pb-1">$1,499</span>
              </div>

              <div className="space-y-4 font-body text-lg">
                {benefits.map((benefit, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                      <benefit.icon className="w-5 h-5 text-primary glow-text" />
                    </motion.div>
                    {benefit.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Checkout Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="hover-lift"
        >
          <div className="glass-panel-premium p-8 rounded-2xl border border-primary/30 bg-black/60 shadow-[0_0_50px_rgba(124,255,79,0.1)] neon-border">
            <h3 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wider text-gradient-alt glow-text">
              Contact / Pre-order
            </h3>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-center py-12"
              >
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 neon-border"
                >
                  <CheckCircle2 className="w-10 h-10 text-primary glow-text" />
                </motion.div>
                <h4 className="font-display text-2xl text-white mb-2 text-gradient-alt">Request Received</h4>
                <p className="font-body text-muted-foreground">We will contact you shortly to complete your purchase setup.</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-primary hover:text-emerald-400 transition-colors font-display tracking-widest text-sm glow-text"
                >
                  SUBMIT ANOTHER
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "First Name", placeholder: "John" },
                    { label: "Last Name", placeholder: "Doe" }
                  ].map((field, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="space-y-2"
                    >
                      <label className="font-display text-xs text-muted-foreground uppercase tracking-widest">
                        {field.label}
                      </label>
                      <motion.input 
                        whileFocus={{ scale: 1.02 }}
                        required 
                        type="text" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-lg neon-border" 
                        placeholder={field.placeholder}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <label className="font-display text-xs text-muted-foreground uppercase tracking-widest">Email Address</label>
                  <motion.input 
                    whileFocus={{ scale: 1.02 }}
                    required 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-lg neon-border" 
                    placeholder="john@example.com"
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <label className="font-display text-xs text-muted-foreground uppercase tracking-widest">Region</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-lg appearance-none neon-border">
                    <option>North America</option>
                    <option>Europe</option>
                    <option>Asia Pacific</option>
                  </select>
                </motion.div>

                <motion.button 
                  type="submit" 
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(124,255,79,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary to-emerald-400 text-black font-display font-bold text-lg py-4 rounded-lg uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 glow-box-strong hover-lift"
                >
                  {isSubmitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <RotateCcw className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    "Confirm Pre-order"
                  )}
                </motion.button>
                <p className="text-center font-body text-xs text-muted-foreground mt-4">
                  No payment required today. You will be billed when the item ships.
                </p>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </PageTransition>
  );
}
