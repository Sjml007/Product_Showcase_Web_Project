import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/performance", label: "Performance" },
  { href: "/specifications", label: "Specs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Buy Now" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-4 glass-panel-premium border-b border-white/5 shadow-lg" : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group interactive">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="w-8 h-8 text-primary group-hover:glow-text transition-all duration-300"
          >
            <Cpu className="w-full h-full" />
          </motion.div>
          <span className="font-display font-bold text-xl tracking-widest text-white group-hover:text-primary transition-colors">
            NITRO <span className="text-primary font-light">V16</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = location === link.href;
            return (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "relative font-display text-sm uppercase tracking-wider transition-colors duration-200 py-2",
                    isActive ? "text-primary glow-text" : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-emerald-400"
                      style={{ boxShadow: "0 0 15px rgba(124, 255, 79, 0.8)" }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden text-white interactive"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 glass-panel-premium border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {links.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "font-display text-lg uppercase tracking-wider py-2 border-b border-white/5 block transition-colors",
                      location === link.href ? "text-primary glow-text" : "text-white/70 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
