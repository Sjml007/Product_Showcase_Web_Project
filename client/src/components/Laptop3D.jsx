import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";







const NEON = "#4ade80";
const CYAN = "#00FFFF";
const PURPLE = "#a855f7";

// Feature callout label
function Callout({
  x, y, label, side = "right"


}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="absolute flex items-center gap-1.5 pointer-events-none"
      style={{ left: x, top: y, zIndex: 30 }}>
      
            {side === "left" &&
      <>
                    <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-display text-[12px] font-bold tracking-widest whitespace-nowrap"
          style={{ color: NEON, textShadow: `0 0 10px ${NEON}` }}>
          
                        {label}
                    </motion.div>
                    <div style={{ width: "48px", height: "2px", background: `linear-gradient(90deg, transparent, ${NEON})` }} />
                    <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-3 h-3 rounded-full flex items-center justify-center relative"
          style={{ background: `${NEON}40`, border: `1.5px solid ${NEON}`, boxShadow: `0 0 12px ${NEON}` }}>
          <div className="w-1.5 h-1.5 rounded-full bg-white" style={{ boxShadow: `0 0 5px white` }} />
        </motion.div>
                </>
      }
            {side === "right" &&
      <>
                    <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-3 h-3 rounded-full flex items-center justify-center relative"
          style={{ background: `${CYAN}40`, border: `1.5px solid ${CYAN}`, boxShadow: `0 0 12px ${CYAN}` }}>
          <div className="w-1.5 h-1.5 rounded-full bg-white" style={{ boxShadow: `0 0 5px white` }} />
        </motion.div>
                    <div style={{ width: "48px", height: "2px", background: `linear-gradient(90deg, ${CYAN}, transparent)` }} />
                    <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          className="font-display text-[12px] font-bold tracking-widest whitespace-nowrap"
          style={{ color: CYAN, textShadow: `0 0 10px ${CYAN}` }}>
          
                        {label}
                    </motion.div>
                </>
      }
        </motion.div>);

}

export default function Laptop3D({ className = "", mouseX, mouseY }) {
  const ref = useRef(null);
  const lx = useMotionValue(0);
  const ly = useMotionValue(0);
  const ax = mouseX ?? lx;
  const ay = mouseY ?? ly;

  const rotateY = useSpring(useTransform(ax, [-400, 400], [-18, 18]), { stiffness: 100, damping: 22 });
  const rotateX = useSpring(useTransform(ay, [-400, 400], [10, -6]), { stiffness: 100, damping: 22 });

  // Subtle shift for lid parallax (lid follows mouse slightly differently from base)
  const lidParallaxX = useSpring(useTransform(ax, [-400, 400], [-6, 6]), { stiffness: 80, damping: 20 });
  const lidParallaxY = useSpring(useTransform(ay, [-400, 400], [-4, 4]), { stiffness: 80, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ax.set(e.clientX - (rect.left + rect.width / 2));
    ay.set(e.clientY - (rect.top + rect.height / 2));
  };
  const handleMouseLeave = () => {ax.set(0);ay.set(0);};

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center ${className}`}
      style={{ perspective: "1100px" }}>
      
            {/* ── AMBIENT BACKDROP GLOW ── */}
            <motion.div
              animate={{ opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute pointer-events-none"
              style={{
                width: "550px",
                height: "400px",
                background: "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 65%)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                filter: "blur(40px)",
                zIndex: -1
              }}
            />

            {/* ── FLOATING WRAPPER ── */}
            <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", position: "relative" }}>
        

                {/* ── FEATURE CALLOUTS ── */}
                <Callout x="-145px" y="90px" label="165Hz WQXGA" side="left" />
                <Callout x="-145px" y="380px" label="RTX™ 4060" side="left" />
                <Callout x="100%" y="360px" label="Zen 4 CPU" side="right" />
                <Callout x="100%" y="450px" label="RGB Keyboard" side="right" />

                {/* ── SCREEN LID ── */}
                <motion.div
          style={{ x: lidParallaxX, y: lidParallaxY, transformStyle: "preserve-3d" }}
          className="relative mx-auto">
          
                    <div
            className="relative mx-auto"
            style={{
              width: "460px",
              height: "300px",
              transform: "rotateX(-8deg) translateZ(3px)",
              transformStyle: "preserve-3d"
            }}>
            
                        {/* Lid back face — brushed dark metal */}
                        <div
              className="absolute inset-0 rounded-t-[14px] rounded-b-[3px] overflow-hidden"
              style={{
                background: "linear-gradient(155deg, #3a3a3a 0%, #202020 35%, #2a2a2a 65%, #333333 100%)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow:
                "0 -6px 24px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.07), inset 1px 0 0 rgba(255,255,255,0.04)"
              }}>
              
                            {/* Top chrome edge */}
                            <div className="absolute top-0 left-[10%] right-[10%] h-[1.5px]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), rgba(255,255,255,0.1), transparent)" }} />
                            {/* Subtle carbon-fiber texture lines */}
                            {Array.from({ length: 8 }).map((_, i) =>
              <div key={i} className="absolute left-0 right-0" style={{
                top: `${12 + i * 14}%`, height: "1px",
                background: "rgba(255,255,255,0.018)"
              }} />
              )}
                            {/* Acer wordmark on lid back */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-display text-[11px] tracking-[0.5em] text-white/8 font-bold">
                                ACER
                            </div>
                            {/* Nitro logo bottom-right */}
                            <div className="absolute bottom-4 right-6 font-display text-[9px] tracking-[0.25em] text-primary/20">
                                NITRO
                            </div>
                        </div>

                        {/* Outer bezel ring */}
                        <div
              className="absolute rounded-t-[12px] rounded-b-[2px] overflow-hidden"
              style={{
                inset: "5px 8px 3px 8px",
                background: "#1c1c1c",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "inset 0 0 30px rgba(0,0,0,0.95)"
              }}>
              
                            {/* Inner screen area */}
                            <div className="absolute overflow-hidden rounded-[4px]" style={{ inset: "9px 11px 7px 11px" }}>

                                {/* ── SCREEN CONTENT ── */}
                                <div className="w-full h-full relative overflow-hidden"
                style={{ background: "linear-gradient(145deg, #030A03 0%, #050F07 40%, #020708 100%)" }}>

                                    {/* Grid wallpaper */}
                                    <motion.div
                    animate={{ backgroundPositionY: ["0px", "30px"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: "linear-gradient(rgba(74,222,128,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.07) 1px, transparent 1px)",
                      backgroundSize: "28px 28px"
                    }} />
                  

                                    {/* Ambient screen glow orbs */}
                                    <motion.div
                    animate={{ x: [0, 14, -8, 0], y: [0, -8, 12, 0], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-40 h-40 rounded-full"
                    style={{
                      top: "-10%", left: "5%",
                      background: `radial-gradient(circle, rgba(74,222,128,0.45) 0%, transparent 70%)`,
                      filter: "blur(22px)"
                    }} />
                  
                                    <motion.div
                    animate={{ x: [0, -10, 6, 0], y: [0, 10, -12, 0], opacity: [0.35, 0.7, 0.35] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute w-28 h-28 rounded-full"
                    style={{
                      bottom: "5%", right: "10%",
                      background: `radial-gradient(circle, rgba(0,200,255,0.5) 0%, transparent 70%)`,
                      filter: "blur(18px)"
                    }} />
                  

                                    {/* ── GAME HUD UI on screen ── */}
                                    <div className="absolute inset-0 flex flex-col justify-between p-3">
                                        {/* Top bar — FPS counter style */}
                                        <div className="flex items-center justify-between">
                                            <motion.div
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="flex items-center gap-1.5">
                        
                                                <span className="font-display text-[8px] tracking-widest" style={{ color: NEON }}>●</span>
                                                <span className="font-display text-[8px] tracking-widest text-white/50">REC</span>
                                            </motion.div>
                                            {/* FPS readout */}
                                            <div className="flex items-baseline gap-0.5">
                                                <motion.span
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 0.4, repeat: Infinity }}
                          className="font-display font-black text-[18px] leading-none"
                          style={{ color: NEON, textShadow: `0 0 12px ${NEON}` }}>
                          
                                                    165
                                                </motion.span>
                                                <span className="font-display text-[7px] text-white/30">FPS</span>
                                            </div>
                                            <div className="font-display text-[8px] text-white/20">NITRO V16</div>
                                        </div>

                                        {/* Center — Circular arc gauges */}
                                        <div className="flex items-center justify-center gap-6 my-1">
                                            {[
                      { label: "CPU", pct: 92, color: NEON, delay: 0 },
                      { label: "GPU", pct: 98, color: CYAN, delay: 0.3 },
                      { label: "RAM", pct: 74, color: PURPLE, delay: 0.6 }].
                      map(({ label, pct, color, delay }) => {
                        const r = 18;
                        const circ = 2 * Math.PI * r;
                        return (
                          <div key={label} className="flex flex-col items-center gap-0.5">
                                                        <div className="relative" style={{ width: 44, height: 44 }}>
                                                            <svg width="44" height="44" className="absolute inset-0" style={{ transform: "rotate(-90deg)" }}>
                                                                <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                                                                <motion.circle
                                  cx="22" cy="22" r={r}
                                  fill="none"
                                  stroke={color}
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeDasharray={circ}
                                  initial={{ strokeDashoffset: circ }}
                                  animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
                                  transition={{ duration: 1.5, delay, ease: "easeOut" }}
                                  style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
                                
                                                            </svg>
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <span className="font-display text-[8px] font-bold" style={{ color }}>{pct}%</span>
                                                            </div>
                                                        </div>
                                                        <span className="font-display text-[7px] tracking-widest text-white/30">{label}</span>
                                                    </div>);

                      })}
                                        </div>

                                        {/* Bottom — Animated bar graph */}
                                        <div className="flex items-end gap-[2px] justify-center h-[28px]">
                                            {Array.from({ length: 28 }).map((_, i) => {
                        const h = 30 + Math.sin(i * 0.7) * 40 + Math.random() * 30;
                        const isGreen = i < 10;
                        const isCyan = i >= 10 && i < 20;
                        const color = isGreen ? NEON : isCyan ? CYAN : PURPLE;
                        return (
                          <motion.div
                            key={i}
                            animate={{ height: [`${h * 0.4}%`, `${Math.min(100, h + (Math.random() - 0.5) * 30)}%`, `${h * 0.4}%`] }}
                            transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
                            className="rounded-t-sm flex-1"
                            style={{ background: color, opacity: 0.6, boxShadow: `0 0 3px ${color}` }} />);


                      })}
                                        </div>
                                    </div>

                                    {/* Screen glare */}
                                    <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 45%, rgba(255,255,255,0.02) 100%)" }} />
                                    {/* Screen vignette */}
                                    <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 60%, rgba(0,0,0,0.6) 100%)" }} />
                                </div>
                            </div>

                            {/* Webcam */}
                            <div className="absolute top-[4px] left-1/2 -translate-x-1/2 flex items-center gap-1">
                                <div className="w-[5px] h-[5px] rounded-full bg-black border border-white/10 flex items-center justify-center">
                                    <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-[2px] h-[2px] rounded-full"
                    style={{ background: NEON, boxShadow: `0 0 3px ${NEON}` }} />
                  
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── HINGE ── */}
                <div className="relative mx-auto" style={{ width: "462px", height: "8px" }}>
                    <div className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, #2a2a2a, #444444 25%, #333333 50%, #444444 75%, #2a2a2a)",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            borderRight: "1px solid rgba(255,255,255,0.04)",
            boxShadow: "0 3px 10px rgba(0,0,0,0.95)"
          }} />
                    {/* Hinge LED strip */}
                    <motion.div
            animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-[2px] left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "200px", height: "3px",
              background: `linear-gradient(90deg, ${NEON}, ${CYAN}, ${PURPLE}, ${NEON}, ${CYAN})`,
              backgroundSize: "200% 100%",
              boxShadow: `0 0 8px ${NEON}80, 0 0 16px ${CYAN}40`
            }} />
          
                    {/* Left and right hinge barrels */}
                    {[14, "calc(100% - 50px)"].map((l, i) =>
          <div key={i} className="absolute top-0 bottom-0 w-12 rounded-sm"
          style={{
            left: typeof l === "number" ? `${l}px` : l,
            background: "linear-gradient(180deg, #444444, #1a1a1a)",
            border: "1px solid rgba(255,255,255,0.12)"
          }} />
          )}
                </div>

                {/* ── KEYBOARD DECK ── */}
                <div
          className="relative mx-auto"
          style={{
            width: "480px",
            height: "240px",
            transform: "rotateX(12deg) translateZ(-8px)",
            transformStyle: "preserve-3d"
          }}>
          
                    {/* Deck surface */}
                    <div
            className="absolute inset-0 rounded-b-[18px]"
            style={{
              background: "linear-gradient(170deg, #333333 0%, #222222 40%, #1a1a1a 100%)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.07)"
            }}>
            
                        {/* Deck surface texture */}
                        {Array.from({ length: 5 }).map((_, i) =>
            <div key={i} className="absolute left-0 right-0"
            style={{ top: `${20 + i * 15}%`, height: "1px", background: "rgba(255,255,255,0.012)" }} />
            )}

                        {/* ── RGB KEYBOARD ── */}
                        <div className="absolute top-5 left-0 right-0 px-7">
                            {/* Function row */}
                            <div className="flex gap-[3px] mb-[4px]">
                                {Array.from({ length: 21 }).map((_, k) =>
                <motion.div
                  key={k}
                  animate={{ opacity: [0.2, 0.55, 0.2] }}
                  transition={{ duration: 1.8 + k * 0.05, repeat: Infinity, delay: k * 0.08 }}
                  className="rounded-[2px] flex-1"
                  style={{
                    height: "10px",
                    background: "#101010",
                    border: "1px solid rgba(74,222,128,0.12)",
                    boxShadow: "inset 0 0 3px rgba(74,222,128,0.08)"
                  }} />

                )}
                            </div>
                            {/* Main key rows */}
                            {[
              { count: 20, offset: 0, spacing: 18 },
              { count: 19, offset: 8, spacing: 18 },
              { count: 19, offset: 14, spacing: 18 },
              { count: 18, offset: 20, spacing: 18 },
              { count: 15, offset: 24, spacing: 22 }].
              map((row, ri) =>
              <div key={ri} className="flex gap-[3px] mb-[3px]" style={{ paddingLeft: `${row.offset}px` }}>
                                    {Array.from({ length: row.count }).map((_, ki) => {
                  // Create flowing wave color effect
                  const wave = (ri * 3 + ki) % 3;
                  const color = wave === 0 ? NEON : wave === 1 ? CYAN : PURPLE;
                  return (
                    <motion.div
                      key={ki}
                      animate={{
                        opacity: [0.25, 0.75, 0.25], boxShadow: [
                        `0 0 0px transparent`,
                        `0 0 5px ${color}50, inset 0 0 4px ${color}30`,
                        `0 0 0px transparent`]

                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: (ri * 0.18 + ki * 0.09) % 2.5,
                        ease: "easeInOut"
                      }}
                      className="rounded-[2px]"
                      style={{
                        width: `${row.spacing}px`,
                        height: "16px",
                        background: "linear-gradient(180deg, #1a1a1a, #101010)",
                        border: `1px solid ${color}28`
                      }} />);


                })}
                                </div>
              )}
                        </div>

                        {/* Touchpad */}
                        <div
              className="absolute rounded-xl overflow-hidden"
              style={{
                bottom: "16px", left: "50%", transform: "translateX(-50%)",
                width: "130px", height: "82px",
                background: "linear-gradient(145deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 20px rgba(0,0,0,0.5)"
              }}>
              
                            <motion.div
                animate={{ opacity: [0, 0.06, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-xl"
                style={{ background: `radial-gradient(circle at 40% 40%, ${NEON}, transparent 70%)` }} />
              
                        </div>

                        {/* Port indicators on left & right edges */}
                        <div className="absolute left-0 top-1/4 flex flex-col gap-[5px] pl-1">
                            {[NEON, CYAN, "rgba(255,255,255,0.15)"].map((c, i) =>
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                className="rounded-sm"
                style={{ width: 3, height: i === 2 ? 10 : 6, background: c, boxShadow: `0 0 4px ${c}` }} />

              )}
                        </div>
                        <div className="absolute right-0 top-1/4 flex flex-col gap-[5px] pr-1">
                            {[CYAN, "rgba(255,255,255,0.15)", NEON].map((c, i) =>
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                className="rounded-sm"
                style={{ width: 3, height: i === 1 ? 10 : 6, background: c, boxShadow: `0 0 4px ${c}` }} />

              )}
                        </div>

                        {/* Deck bottom edge highlight */}
                        <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px]"
            style={{ background: `linear-gradient(90deg, transparent, ${NEON}30, transparent)` }} />

                        {/* NITRO label */}
                        <div className="absolute bottom-3 right-7 font-display text-[9px] tracking-[0.3em] text-primary/25 font-bold">
                            NITRO
                        </div>
                    </div>

                    {/* Bottom face of deck — thickness illusion */}
                    <div
            className="absolute left-0 right-0 bottom-0 rounded-b-[18px]"
            style={{
              height: "10px",
              background: "linear-gradient(180deg, #1f1f1f, #111111)",
              border: "1px solid rgba(255,255,255,0.08)",
              transform: "translateY(8px) rotateX(-90deg)",
              transformOrigin: "bottom"
            }} />
          
                </div>

                {/* ── GROUND GLOW ── */}
                <motion.div
          animate={{ opacity: [0.4, 0.75, 0.4], scaleX: [1, 1.18, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute pointer-events-none"
          style={{
            bottom: "-50px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "420px",
            height: "36px",
            background: `radial-gradient(ellipse, ${NEON}66 0%, ${NEON}18 40%, transparent 75%)`,
            filter: "blur(16px)"
          }} />
        
                {/* Secondary dim blue glow */}
                <motion.div
          animate={{ opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute pointer-events-none"
          style={{
            bottom: "-55px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "320px",
            height: "26px",
            background: "radial-gradient(ellipse, rgba(0,200,255,0.4) 0%, transparent 75%)",
            filter: "blur(22px)"
          }} />
        

                {/* ── SCREEN EDGE AMBIENT GLOW ── */}
                <motion.div
          animate={{ opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 35%, ${NEON}18, transparent 70%)`,
            filter: "blur(24px)"
          }} />
        
            </motion.div>
        </div>);

}