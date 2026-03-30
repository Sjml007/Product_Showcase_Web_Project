import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { CheckCircle2, ShieldCheck, Truck, RotateCcw, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import GlowBackground from "@/components/GlowBackground";
import SectionTransition from "@/components/SectionTransition";

const benefits = [
  { icon: CheckCircle2, text: "Includes 1 Month Xbox Game Pass" },
  { icon: ShieldCheck, text: "2-Year Premium Warranty" },
  { icon: Truck, text: "Free Pan-India Delivery" },
  { icon: RotateCcw, text: "30-Day Money-Back Guarantee" }];


const formFields = [
  [
    { label: "First Name", placeholder: "John", type: "text" },
    { label: "Last Name", placeholder: "Doe", type: "text" }]];



export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [0.4, 1, 1]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Extract form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Log to console instead of sending to backend
    console.log("=== PRE-ORDER FORM SUBMITTED ===");
    console.log(data);
    console.log("================================");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <PageTransition className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Ambient background */}
      <GlowBackground variant="hero" />

      {/* Floating green orb top right */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(74,222,128,0.1), transparent 70%)", filter: "blur(80px)" }} />


      <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Product Summary */}
          <div>
            <SectionTransition direction="left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/2 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-display text-xs tracking-[0.2em] text-white/50">LIMITED LAUNCH EDITION</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-black text-white uppercase mb-4 text-gradient-alt glow-text-xl">
                Secure Yours
              </h1>
              <p className="font-body text-xl text-white/50 mb-12 leading-relaxed">
                Pre-order the Acer Nitro V16 Lite today and be the first to experience portable dominance.
              </p>
            </SectionTransition>

            {/* Product Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="glass-panel-premium p-8 rounded-2xl mb-8 relative overflow-hidden cursor-pointer"
              style={{
                y,
                opacity: cardOpacity,
                border: "1px solid rgba(74,222,128,0.15)",
                boxShadow: "0 0 50px rgba(74,222,128,0.06), 0 20px 50px rgba(0,0,0,0.4)"
              }}>

              {/* Stock Badge */}
              <div className="absolute top-5 right-5">
                <motion.div
                  animate={{ scale: [1, 1.06, 1], boxShadow: ["0 0 10px rgba(74,222,128,0.3)", "0 0 20px rgba(74,222,128,0.5)", "0 0 10px rgba(74,222,128,0.3)"] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="bg-primary text-black font-display font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">

                  IN STOCK SOON
                </motion.div>
              </div>

              {/* Background decoration */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full border border-primary/10 pointer-events-none" />


              <h3 className="font-display text-2xl font-bold text-white mb-2">Nitro V16 Lite</h3>
              <p className="text-white/40 font-body text-sm mb-8">RTX 4060 · Ryzen 7 · 16GB RAM · 1TB SSD</p>

              {/* Pricing */}
              <div className="flex items-end gap-4 mb-8 pb-8 border-b border-white/5">
                <motion.span
                  className="font-display text-5xl font-black text-primary glow-text-lg"
                  animate={{ textShadow: ["0 0 20px rgba(74,222,128,0.5)", "0 0 40px rgba(74,222,128,0.8)", "0 0 20px rgba(74,222,128,0.5)"] }}
                  transition={{ duration: 3, repeat: Infinity }}>

                  ₹1,09,990
                </motion.span>
                <span className="font-body text-white/30 line-through text-xl pb-1">₹1,24,990</span>
                <span className="font-display text-xs text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 self-center ml-2">
                  SAVE ₹15,000
                </span>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, idx) =>
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-default">

                    <motion.div whileHover={{ scale: 1.25, rotate: 10 }}>
                      <benefit.icon className="w-5 h-5 text-primary glow-text shrink-0" />
                    </motion.div>
                    <span className="font-body text-base">{benefit.text}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right: Checkout Form */}
          <SectionTransition direction="right" delay={0.15}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="glass-panel-premium p-8 rounded-2xl relative overflow-hidden"
              style={{
                border: "1px solid rgba(74,222,128,0.2)",
                boxShadow: "0 0 60px rgba(74,222,128,0.07), 0 20px 60px rgba(0,0,0,0.4)"
              }}>

              {/* Decorative corner glow */}
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(74,222,128,0.12), transparent 70%)", filter: "blur(20px)" }} />


              <h3 className="font-display text-2xl font-bold text-white mb-2 uppercase tracking-wider text-gradient-alt glow-text">
                Contact / Pre-order
              </h3>
              <p className="font-body text-sm text-white/30 mb-8">Fill in your details and we'll reach out shortly.</p>

              <AnimatePresence mode="wait">
                {submitted ?
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-center py-16">

                    <motion.div
                      animate={{ scale: [1, 1.08, 1], boxShadow: ["0 0 20px rgba(74,222,128,0.3)", "0 0 40px rgba(74,222,128,0.5)", "0 0 20px rgba(74,222,128,0.3)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
                      style={{ background: "radial-gradient(circle, rgba(74,222,128,0.2), rgba(74,222,128,0.05))", border: "1px solid rgba(74,222,128,0.3)" }}>

                      <CheckCircle2 className="w-12 h-12 text-primary glow-text" />
                    </motion.div>
                    <h4 className="font-display text-3xl text-white mb-3 text-gradient-alt">Request Received</h4>
                    <p className="font-body text-white/50 max-w-xs mx-auto">
                      We'll contact you shortly to complete your purchase setup.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05, color: "#4DFFB0" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-primary font-display tracking-widest text-sm glow-text">

                      SUBMIT ANOTHER →
                    </motion.button>
                  </motion.div> :

                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-5">

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "First Name", placeholder: "John" },
                        { label: "Last Name", placeholder: "Doe" }].
                        map((field, idx) =>
                          <div key={idx} className="space-y-1.5">
                            <label className="font-display text-[10px] text-white/30 uppercase tracking-widest">
                              {field.label}
                            </label>
                            <motion.input
                              whileFocus={{ scale: 1.01, borderColor: "rgba(74,222,128,0.5)" }}
                              required
                              type="text"
                              name={field.label.toLowerCase().replace(" ", "_")}
                              className="w-full bg-white/3 border border-white/8 rounded-lg px-4 py-3 text-white font-body text-sm transition-all placeholder:text-white/20"
                              placeholder={field.placeholder} />

                          </div>
                        )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-display text-[10px] text-white/30 uppercase tracking-widest">Email Address</label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        required
                        type="email"
                        name="email"
                        className="w-full bg-white/3 border border-white/8 rounded-lg px-4 py-3 text-white font-body text-sm transition-all placeholder:text-white/20"
                        placeholder="john@example.com" />

                    </div>

                    <div className="space-y-1.5">
                      <label className="font-display text-[10px] text-white/30 uppercase tracking-widest">Region</label>
                      <select name="region" className="w-full bg-black/40 border border-white/8 rounded-lg px-4 py-3 text-white/70 font-body text-sm appearance-none transition-all">
                        <option value="India">India</option>
                        <option value="Asia Pacific">Asia Pacific</option>
                        <option value="Europe">Europe</option>
                        <option value="North America">North America</option>
                      </select>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(74,222,128,0.4), 0 0 100px rgba(74,222,128,0.15)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-primary to-emerald-400 text-black font-display font-bold text-base py-4 rounded-lg uppercase tracking-wider transition-all disabled:opacity-60 flex items-center justify-center gap-3 mt-2"
                      style={{ boxShadow: "0 0 30px rgba(74,222,128,0.25)" }}>

                      {isSubmitting ?
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}>

                            <RotateCcw className="w-5 h-5" />
                          </motion.div>
                          Processing...
                        </> :

                        "Confirm Pre-order"
                      }
                    </motion.button>

                    <p className="text-center font-body text-xs text-white/20 mt-3">
                      No payment required today. You will be billed when the item ships.
                    </p>
                  </motion.form>
                }
              </AnimatePresence>
            </motion.div>
          </SectionTransition>
        </div>
      </div>
    </PageTransition>);

}