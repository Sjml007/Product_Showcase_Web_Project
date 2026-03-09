import { Cpu, Github, Twitter, Youtube } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#020202] pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-6 inline-flex">
              <Cpu className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-xl tracking-widest text-white">
                NITRO <span className="text-primary font-light">V16</span>
              </span>
            </Link>
            <p className="text-muted-foreground font-body text-lg max-w-sm">
              Unleash unprecedented gaming power with the new Acer Nitro V16 Lite. Designed for dominance, engineered for victory.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-4 font-body text-lg text-muted-foreground">
              <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/performance" className="hover:text-primary transition-colors">Performance</Link></li>
              <li><Link href="/specifications" className="hover:text-primary transition-colors">Specifications</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300 hover:glow-box">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300 hover:glow-box">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300 hover:glow-box">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 font-body text-muted-foreground">
          <p>© {new Date().getFullYear()} Acer Inc. This is a concept design.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
