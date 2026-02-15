
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from '../SplitText';

export const Hero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const yTranslate = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  return (
    <section ref={targetRef} className="relative h-[100svh] min-h-screen flex flex-col items-center justify-center overflow-visible bg-transparent isolate">
      
      {/* 1. KATMAN: Arka Plan Yazısı */}
      <motion.div 
        style={{ y: yTranslate, opacity: 0.8 }}
        className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none select-none"
      >
        <div className="flex flex-col items-center justify-center space-y-0 md:-space-y-6">
          <div className="flex flex-wrap justify-center gap-x-4">
            <SplitText
              text="Sizin"
              className="text-5xl md:text-[100px] font-black tracking-tighter text-gradient-white leading-none opacity-60"
              delay={30}
            />
            <SplitText
              text="Güvenliğiniz,"
              className="text-5xl md:text-[100px] font-black tracking-tighter text-gradient-white leading-none opacity-60"
              delay={30}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-4">
            <SplitText
              text="Bizim"
              className="text-5xl md:text-[100px] font-black tracking-tighter text-accent leading-none"
              delay={50}
            />
            <SplitText
              text="Mühendisliğimiz."
              className="text-5xl md:text-[100px] font-black tracking-tighter text-accent leading-none"
              delay={50}
            />
          </div>
        </div>
      </motion.div>

      {/* 2. KATMAN: Etkileşimli İçerik (Badge ve İstatistikler kaldırıldı) */}
      <div className="container mx-auto px-6 z-20 flex flex-col items-center text-center relative">
        {/* İçerik çıkarıldı, orb'un merkezde daha güçlü görünmesi sağlandı */}
      </div>

      {/* Kaydırma Göstergesi */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30"
      >
        <span className="text-[9px] font-black tracking-[0.4em] text-white uppercase">Keşfet</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};
