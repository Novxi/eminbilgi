
import React from 'react';
import { motion } from 'framer-motion';

interface ScrollFloatProps {
  text: string;
  className?: string;
  stagger?: number;
  animationDuration?: number;
  delay?: number;
}

const ScrollFloat = ({ 
  text, 
  className = "", 
  stagger = 0.03, 
  animationDuration = 1,
  delay = 0 
}: ScrollFloatProps) => {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      rotateX: -40,
      scale: 0.9,
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: animationDuration,
        // Fix: Cast easing array to any to bypass strict union type inference in Framer Motion
        ease: [0.215, 0.61, 0.355, 1] as any, 
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="inline-flex flex-wrap justify-center overflow-visible py-2"
      style={{ perspective: '1200px' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className={`inline-block select-none ${className}`}
          style={{ 
            whiteSpace: letter === ' ' ? 'pre' : 'normal',
            display: 'inline-block',
            // Her harf için background-clip'i zorla uygulayalım
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            lineHeight: '1.1',
            paddingBottom: '0.05em'
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default ScrollFloat;
