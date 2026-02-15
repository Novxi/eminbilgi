
import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  from?: { opacity: number; y: number };
  to?: { opacity: number; y: number };
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
}) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: delay / 1000, 
        delayChildren: i * 0.1 
      },
    }),
  };

  const child = {
    visible: {
      ...to,
      transition: {
        // Fix: Cast transition type to const to satisfy Framer Motion's literal type requirements
        type: "spring" as const,
        damping: 14,
        stiffness: 100,
        duration: duration,
      },
    },
    hidden: {
      ...from,
    },
  };

  return (
    <motion.div
      style={{ 
        display: "inline-flex", 
        flexWrap: "nowrap",
        position: "relative",
        justifyContent: "center"
      }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className={className}
          style={{ 
            display: "inline-block", 
            whiteSpace: "pre",
            position: "relative",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent"
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default SplitText;
