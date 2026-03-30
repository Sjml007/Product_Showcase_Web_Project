import { Cpu, Github, Twitter, Youtube } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "YouTube" },
  { icon: Github, label: "GitHub" }];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="border-t border-white/5 bg-[#020202] pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-6 inline-flex">
              <motion.div whileHover={{ scale: 1.15, rotate: 10 }}>
                <Cpu className="w-6 h-6 text-primary" />
              </motion.div>
              <span className="font-display font-bold text-xl tracking-widest text-white">
                NITRO <span className="text-primary font-light">V16</span>
              </span>
            </Link>
            <p className="text-muted-foreground font-body text-lg max-w-sm">
              Unleash unprecedented gaming power with the new Acer Nitro V16 Lite. Designed for dominance, engineered for victory.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-4 font-body text-lg text-muted-foreground">
              {[
              { href: "/features", label: "Features" },
              { href: "/performance", label: "Performance" },
              { href: "/specifications", label: "Specifications" },
              { href: "/gallery", label: "Gallery" }].
              map((item) =>
              <motion.li key={item.href} whileHover={{ x: 5 }}>
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </motion.li>
              )}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) =>
              <motion.a
                key={social.label}
                href="#"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300 neon-border group">
                
                  <social.icon className="w-5 h-5 group-hover:glow-text" />
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 font-body text-muted-foreground">
          
          <p>© {new Date().getFullYear()} Acer Inc. This is a concept design.</p>
          <div className="flex gap-6">
            <motion.a href="#" whileHover={{ color: "#4ade80" }} className="hover:text-white transition-colors">Privacy Policy</motion.a>
            <motion.a href="#" whileHover={{ color: "#4ade80" }} className="hover:text-white transition-colors">Terms of Service</motion.a>
          </div>
        </motion.div>
      </div>
    </footer>);

}