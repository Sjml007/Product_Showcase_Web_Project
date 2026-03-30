import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const smoothX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const smoothY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  // Ring lags behind slightly
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 25 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const updatePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "TEXTAREA" ||
      target.closest("a") ||
      target.closest("button") ||
      target.classList.contains("interactive") ||
      target.classList.contains("cursor-pointer");
      setIsHovering(Boolean(isInteractive));
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Inner dot (Diamond) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovering ? 1.5 : 1,
          rotate: isHovering ? 135 : 45, // Spins when hovering
          opacity: isVisible ? (isHovering ? 0.4 : 1) : 0
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}>
        
        <div
          className="w-2.5 h-2.5 bg-[#FFFFFF]"
          style={{
            boxShadow: "0 0 12px rgba(255,255,255,1)"
          }} />
        
      </motion.div>

      {/* Outer Circle Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isClicking ? 0.85 : isHovering ? 1.25 : 0.8,
          opacity: isVisible && isHovering ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}>
        
        <div 
          className="rounded-full flex items-center justify-center transition-all duration-300" 
          style={{ 
            width: isHovering ? "52px" : "36px", 
            height: isHovering ? "52px" : "36px",
            border: `2px solid rgba(255,255,255, ${isHovering ? 0.6 : 0.3})`,
            backgroundColor: isHovering ? "rgba(255,255,255,0.12)" : "transparent",
            boxShadow: isHovering ? "0 0 16px rgba(255,255,255,0.2)" : "none"
          }}>
        </div>
        
      </motion.div>

      {/* Hide default cursor */}
      <style>{`* { cursor: none !important; }`}</style>
    </>);

}