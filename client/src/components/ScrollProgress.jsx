import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);
  const leftPercent = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #4ade80, #4DFFB0, #00FFFF)",
          boxShadow: "0 0 8px rgba(74,222,128,0.8), 0 0 20px rgba(74,222,128,0.4), 0 0 40px rgba(74,222,128,0.2)"
        }} />
      
      {/* Glow pulse dot at end of bar */}
      <motion.div
        className="fixed top-0 z-[101] w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          left: leftPercent,
          background: "#4ade80",
          boxShadow: "0 0 6px rgba(74,222,128,1), 0 0 15px rgba(74,222,128,0.8), 0 0 30px rgba(74,222,128,0.5)"
        }} />
      
    </>);

}