import React, { useState, useEffect, useMemo } from 'react';
import { motion, useTransform, AnimatePresence, MotionValue } from 'framer-motion';
import { SERVICES } from '../../constants';
import { ServiceCard } from './ServiceCard';
import { Sparkles } from 'lucide-react';
import { Service } from '../../types';
import ScrollFloat from '../ScrollFloat';


export const ServicesScrollSection: React.FC<ServicesScrollSectionProps> = ({
  scrollProgress,
  onServiceClick,
  onNavigate,
  onFinalCTAChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFinalCTA, setShowFinalCTA] = useState(false);

  // Filter specific services requested: 1. Camera, 2. Network, 3. Alarm
  const displayedServices = useMemo(() => {
    const targetIds = ['kamera', 'network', 'hirsiz-alarm'];
    return targetIds
      .map(id => SERVICES.find(s => s.id === id))
      .filter((s): s is Service => !!s);
  }, []);

  useEffect(() => {
    const unsub = scrollProgress.on("change", (latest) => {
      // Adjusted scroll triggers for 3 items
      if (latest < 0.3) setCurrentIndex(0);
      else if (latest < 0.6) setCurrentIndex(1);
      else setCurrentIndex(2);
      
      const nextShowFinalCTA = latest > 0.85;
      setShowFinalCTA(nextShowFinalCTA);
      onFinalCTAChange?.(nextShowFinalCTA);
    });
    return () => {
      unsub();
      onFinalCTAChange?.(false);
    };
  }, [scrollProgress]);

  // Adjusted fade out to match new CTA timing
  const contentOpacity = useTransform(scrollProgress, [0.80, 0.85], [1, 0]);
  const contentY = useTransform(scrollProgress, [0.80, 0.85], [0, -30]);

  return (
    <div className="relative h-[1000vh]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-transparent pointer-events-auto isolate z-[9998]">
        
        <div className="container mx-auto px-6 h-full flex items-center justify-center relative z-[9999] pointer-events-auto">
          
          <AnimatePresence mode="wait">
            {!showFinalCTA ? (
              <motion.div
                key="services-stage"
                style={{ opacity: contentOpacity, y: contentY }}
                className="w-full flex flex-col lg:flex-row items-center justify-between gap-12"
              >
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="max-w-xl relative">
                    <span className="text-[#4CC3FF] font-black tracking-[0.4em] text-[10px] uppercase mb-8 block bg-[#1E4FFF]/10 w-fit px-5 py-2 rounded-full border border-[#1E4FFF]/20 backdrop-blur-xl mx-auto lg:mx-0">
                      UZMANLIK ALANLARI
                    </span>
                    
                    {/* Title with Reflection */}
                    <div className="relative mb-12">
                      <h2 className="text-7xl md:text-[110px] font-black text-white tracking-tighter leading-[0.85] select-none uppercase relative z-10">
                        <span style={{ textShadow: 'none', filter: 'none' }}></span> <br />
                        <span className="text-white/20 italic"></span>
                      </h2>
                    </div>

                    <p className="text-white/40 text-xl md:text-2xl max-w-md leading-relaxed mb-12 font-medium relative z-20">
                      Uçtan uca teknoloji katmanlarında <br /> <span className="text-white">kesintisiz güvenlik ve hız.</span>
                    </p>
                    
                    <div className="flex items-center justify-center lg:justify-start gap-4">
                      {displayedServices.map((_, i) => (
                        <div key={i} className="relative h-[2px] bg-white/5 rounded-full overflow-hidden w-14 md:w-24">
                          <motion.div 
                            animate={{ 
                              width: currentIndex === i ? "100%" : (currentIndex > i ? "100%" : "0%"),
                              backgroundColor: currentIndex === i ? "#1E4FFF" : "rgba(255,255,255,0.05)"
                            }}
                            className="absolute inset-0 rounded-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <div className="w-full max-w-lg">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 80, scale: 0.85, filter: 'blur(30px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -80, scale: 0.85, filter: 'blur(30px)' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full"
                        style={{ 
                          // Card Reflection
                          WebkitBoxReflect: "below 10px linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.2) 100%)"
                        }}
                      >
                        {displayedServices[currentIndex] && (
                          <ServiceCard 
                            service={displayedServices[currentIndex]} 
                            onClick={(s) => onServiceClick(s)}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="cta-stage"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
                className="relative z-[10000] pointer-events-auto w-full max-w-4xl text-center space-y-12 flex flex-col items-center py-20"
                style={{ pointerEvents: 'auto' }}
              >
                <div className="space-y-6 w-full pointer-events-none">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-16 h-16 bg-[#1E4FFF]/10 rounded-[24px] flex items-center justify-center border border-[#1E4FFF]/30 mx-auto mb-8 shadow-[0_0_40px_rgba(30,79,255,0.2)]"
                  >
                    <Sparkles className="w-8 h-8 text-[#4CC3FF]" />
                  </motion.div>

                  <div className="flex flex-col items-center">
                    <div className="py-1 overflow-visible h-[60px] md:h-[90px]">
                      <h3 className="text-5xl md:text-7xl lg:text-[80px] font-black text-white tracking-tighter leading-none uppercase">
                        <ScrollFloat text="Tüm Çözümleri" stagger={0.03} animationDuration={0.8} />
                      </h3>
                    </div>
                    <div className="py-1 overflow-visible h-[60px] md:h-[90px]">
                      <h3 className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tighter leading-none uppercase">
                        <ScrollFloat 
                          text="Detaylandırın."
                          className="text-navy-accent italic" 
                          stagger={0.04} 
                          animationDuration={1} 
                          delay={0.3}
                        />
                      </h3>
                    </div>
                  </div>

                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="text-white/30 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
                  >
                    Geleceğin IT altyapısını bugünden inşa edin. <br />
                    <span className="text-white/60">Global standartlarda mühendislik çözümleri.</span>
                  </motion.p>
                </div>

                <div className="flex flex-col items-center gap-10 pt-4 pointer-events-auto">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="flex gap-10 text-[9px] uppercase tracking-[0.5em] font-black text-white/5"
                  >
                    <span className="hover:text-[#1E4FFF] transition-colors">STRATEJİ</span>
                    <span>•</span>
                    <span className="hover:text-[#4CC3FF] transition-colors">GÜVENLİK</span>
                    <span>•</span>
                    <span className="hover:text-white transition-colors">YEDEKLEME</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <motion.div 
            animate={{ height: showFinalCTA ? 20 : 40 }}
            className="w-[1px] bg-white/10 transition-all duration-1000"
          />
        </div>
      </div>
    </div>
  );
};
