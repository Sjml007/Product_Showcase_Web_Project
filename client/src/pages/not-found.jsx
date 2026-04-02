import { motion } from "framer-motion";
import { Link } from "wouter";
import PageTransition from "@/components/PageTransition";
import GlowBackground from "@/components/GlowBackground";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <PageTransition className="min-h-screen w-full flex items-center justify-center relative overflow-hidden pt-20">
      <GlowBackground variant="hero" />
      
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(74,222,128,0.08), transparent 70%)", filter: "blur(80px)" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-2xl mx-auto px-6 text-center mt-[-10vh]"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(74,222,128,0.2)", "0 0 40px rgba(74,222,128,0.4)", "0 0 20px rgba(74,222,128,0.2)"] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/30 bg-primary/5 backdrop-blur-sm"
        >
          <AlertTriangle className="h-10 w-10 text-primary glow-text" />
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase mb-4 text-gradient-alt glow-text-lg tracking-wider">
          ERROR 404
        </h1>
        
        <p className="font-body text-xl text-white/70 mb-10">
          The requested origin point doesn't exist in our systems. 
          <br className="hidden sm:block" /> 
          This sector of the web is currently uncharted.
        </p>

        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 60px rgba(74,222,128,0.5), 0 0 100px rgba(74,222,128,0.2)" }}
            whileTap={{ scale: 0.96 }}
            className="btn-premium px-8 py-4 bg-gradient-to-r from-primary to-emerald-400 text-black font-display font-bold tracking-wider rounded-lg inline-flex items-center gap-3"
            style={{ boxShadow: "0 0 30px rgba(74,222,128,0.3)" }}
          >
            <Home className="w-5 h-5" />
            RETURN TO BASE
          </motion.button>
        </Link>
      </motion.div>
    </PageTransition>
  );
}