import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
{ href: "/", label: "Home" },
{ href: "/features", label: "Features" },
{ href: "/performance", label: "Performance" },
{ href: "/specifications", label: "Specs" },
{ href: "/gallery", label: "Gallery" },
{ href: "/contact", label: "Buy Now" }];


export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.7, 1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      style={{ opacity: navOpacity }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ?
        "py-3 backdrop-blur-2xl border-b border-white/5" :
        "py-6 bg-transparent"
      )}>
      
      {/* Glassy background on scroll */}
      {isScrolled &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-2xl border-b border-primary/10"
        style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.5), 0 1px 0 rgba(74,222,128,0.1)" }} />

      }

      <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group interactive">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-8 h-8 text-primary transition-all duration-300"
            style={{ filter: "drop-shadow(0 0 8px rgba(74,222,128,0.6))" }}>
            
            <Cpu className="w-full h-full" />
          </motion.div>
          <motion.span
            className="font-display font-bold text-xl tracking-widest text-white group-hover:text-primary transition-colors duration-300">
            
            NITRO{" "}
            <motion.span
              className="text-primary font-light"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ textShadow: "0 0 10px rgba(74,222,128,0.6)" }}>
              
              V16
            </motion.span>
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link, idx) => {
            const isActive = location === link.href;
            const isCTA = link.label === "Buy Now";

            if (isCTA) {
              return (
                <motion.div key={link.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={link.href}
                    className="relative font-display text-sm uppercase tracking-wider px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-emerald-400 text-black font-bold transition-all"
                    style={{ boxShadow: "0 0 20px rgba(74,222,128,0.3)" }}>
                    
                    {link.label}
                  </Link>
                </motion.div>);

            }

            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -2 }}>
                
                <Link
                  href={link.href}
                  className={cn(
                    "relative font-display text-sm uppercase tracking-wider transition-colors duration-200 py-2 group",
                    isActive ? "text-primary" : "text-white/60 hover:text-white"
                  )}>
                  
                  {isActive &&
                  <motion.span
                    className="absolute inset-0 -z-10 rounded-md"
                    layoutId="nav-bg"
                    style={{ background: "rgba(74,222,128,0.06)" }} />

                  }
                  {link.label}

                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-primary to-emerald-400 rounded-full"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: "0 0 8px rgba(74,222,128,0.6)"
                    }} />
                  

                  {/* Active indicator glow */}
                  {isActive &&
                  <motion.div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }} />

                  }
                </Link>
              </motion.div>);

          })}
        </nav>

        {/* Mobile Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-white interactive p-2 rounded-lg border border-white/10 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ?
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="w-5 h-5" />
              </motion.div> :

            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu className="w-5 h-5" />
              </motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden absolute top-full left-0 right-0 overflow-hidden"
          style={{
            background: "rgba(5,5,5,0.95)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(74,222,128,0.1)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
          }}>
          
            <div className="flex flex-col p-6 gap-2">
              {links.map((link, idx) =>
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}>
              
                  <Link
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "font-display text-lg uppercase tracking-wider py-3 px-4 block rounded-lg transition-all",
                  location === link.href ?
                  "text-primary bg-primary/10 border border-primary/20" :
                  "text-white/70 hover:text-white hover:bg-white/5"
                )}>
                
                    {link.label}
                  </Link>
                </motion.div>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </motion.header>);

}