import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";









export default function SectionTransition({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-120px" });

  const variants = {
    hidden: {
      opacity: 0,
      ...(direction === "up" && { y: 50 }),
      ...(direction === "left" && { x: -60 }),
      ...(direction === "right" && { x: 60 }),
      ...(direction === "scale" && { scale: 0.88 }),
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}>
      
            {children}
        </motion.div>);

}