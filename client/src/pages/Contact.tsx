import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { CheckCircle2, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <PageTransition className="min-h-screen pt-32 pb-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Product Summary */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-display font-black text-white uppercase mb-4">Secure Yours</h1>
          <p className="font-body text-xl text-muted-foreground mb-12">
            Pre-order the Acer Nitro V16 Lite today and be the first to experience portable dominance.
          </p>

          <div className="glass-panel p-8 rounded-2xl border border-white/10 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-primary text-black font-display font-bold text-xs px-3 py-1 rounded-full uppercase tracking-widest">
                IN STOCK SOON
              </span>
            </div>
            
            <h3 className="font-display text-2xl font-bold text-white mb-2">Nitro V16 Lite</h3>
            <p className="text-muted-foreground font-body mb-6">RTX 4060 | Ryzen 7 | 16GB RAM | 1TB SSD</p>
            
            <div className="flex items-end gap-4 mb-8 border-b border-white/10 pb-8">
              <span className="font-display text-5xl font-bold text-white">$1,299</span>
              <span className="font-body text-muted-foreground line-through text-xl pb-1">$1,499</span>
            </div>

            <ul className="space-y-4 font-body text-lg">
              <li className="flex items-center gap-3 text-white/80">
                <CheckCircle2 className="w-5 h-5 text-primary" /> Includes 1 Month Xbox Game Pass
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <ShieldCheck className="w-5 h-5 text-primary" /> 2-Year Premium Warranty
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Truck className="w-5 h-5 text-primary" /> Free Express Shipping
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <RotateCcw className="w-5 h-5 text-primary" /> 30-Day Money-Back Guarantee
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Checkout Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-panel p-8 rounded-2xl border border-primary/20 bg-black/60 shadow-[0_0_50px_rgba(124,255,79,0.05)]">
            <h3 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wider">Contact / Pre-order</h3>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h4 className="font-display text-2xl text-white mb-2">Request Received</h4>
                <p className="font-body text-muted-foreground">We will contact you shortly to complete your purchase setup.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-primary hover:text-white transition-colors font-display tracking-widest text-sm"
                >
                  SUBMIT ANOTHER
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-display text-xs text-muted-foreground uppercase tracking-widest">First Name</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-lg" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-display text-xs text-muted-foreground uppercase tracking-widest">Last Name</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-lg" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-display text-xs text-muted-foreground uppercase tracking-widest">Email Address</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-lg" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="font-display text-xs text-muted-foreground uppercase tracking-widest">Region</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-lg appearance-none">
                    <option>North America</option>
                    <option>Europe</option>
                    <option>Asia Pacific</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-black font-display font-bold text-lg py-4 rounded-lg uppercase tracking-wider hover:glow-box-hover transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <RotateCcw className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    "Confirm Pre-order"
                  )}
                </button>
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
