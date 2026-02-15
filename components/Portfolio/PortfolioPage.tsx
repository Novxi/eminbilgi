
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { CASE_STUDIES } from '../../constants';
import { ArrowUpRight, Diamond, Crown } from 'lucide-react';

const LuxuryCard: React.FC<{ study: any; index: number }> = ({ study, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mb-40 last:mb-0 group cursor-pointer"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        
        {/* Number & Title Section */}
        <div className="md:col-span-4 order-2 md:order-1 relative z-10 px-6 md:px-0">
          <div className="flex items-start gap-6">
             <span className="font-serif text-6xl md:text-8xl text-[#D4AF37]/20 font-medium leading-none select-none">
               0{index + 1}
             </span>
             <div>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '60px' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-[1px] bg-[#D4AF37] mb-6"
                />
                <h3 className="text-3xl md:text-5xl font-serif text-white mb-4 leading-tight">
                  {study.title}
                </h3>
                <p className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.3em] mb-8">
                  {study.industry} — {study.client}
                </p>
                <div className="text-white/40 font-serif italic text-lg leading-relaxed mb-8">
                   "Mühendislik sınırlarının zorlandığı, estetiğin fonksiyonla buluştuğu nokta."
                </div>
                
                <div className="flex gap-8 border-t border-white/10 pt-6">
                   {study.stats.map((stat: any, i: number) => (
                      <div key={i}>
                         <div className="text-[#D4AF37] font-bold text-xl font-serif">{stat.value}</div>
                         <div className="text-white/20 text-[9px] uppercase tracking-widest">{stat.label}</div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:col-span-8 order-1 md:order-2 relative">
          <div className="relative aspect-[16/9] overflow-hidden bg-white/5 rounded-sm">
             {/* Gold Frame Border */}
             <div className="absolute inset-4 border border-[#D4AF37]/30 z-20 pointer-events-none transition-all duration-700 group-hover:inset-0 group-hover:border-[#D4AF37]/80" />
             
             <motion.img 
                src={study.image} 
                alt={study.title}
                className="w-full h-full object-cover grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out"
                whileHover={{ scale: 1.05 }}
             />
             
             {/* Hover Reveal Content */}
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
                <div className="w-24 h-24 rounded-full border border-[#D4AF37] flex items-center justify-center bg-black/50 backdrop-blur-sm transform scale-50 group-hover:scale-100 transition-all duration-500 delay-100">
                    <ArrowUpRight className="w-8 h-8 text-[#D4AF37]" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const PortfolioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] relative z-10 overflow-hidden">
      
      {/* 🏛️ LUXURY BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
         {/* Deep Onyx Gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-black" />
         
         {/* Gold Ambient Glow */}
         <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#D4AF37] rounded-full blur-[250px] opacity-[0.03]" />
         <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#C0C0C0] rounded-full blur-[250px] opacity-[0.02]" />
         
         {/* Vertical Gold Lines (Architectural Grid) */}
         <div className="absolute inset-0 container mx-auto px-6 flex justify-between opacity-[0.03]">
            <div className="w-[1px] h-full bg-[#D4AF37]" />
            <div className="w-[1px] h-full bg-[#D4AF37]" />
            <div className="w-[1px] h-full bg-[#D4AF37]" />
         </div>

         {/* Grain */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-32">
        
        {/* Header - Editorial Style */}
        <header className="mb-40 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="inline-flex flex-col items-center gap-4 mb-8"
            >
              <Crown className="w-8 h-8 text-[#D4AF37] stroke-[1px]" />
              <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">
                Mühendislikte Elaganslık
              </span>
            </motion.div>
            
            <h1 className="text-6xl md:text-9xl font-serif italic text-white mb-6 relative z-10 mix-blend-difference">
              Başyapıtlar.
            </h1>
            
            <motion.div 
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: "circOut" }}
               className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"
            />
        </header>

        {/* Projects Gallery */}
        <div className="max-w-6xl mx-auto">
             {CASE_STUDIES.map((study, index) => (
               <LuxuryCard key={study.id} study={study} index={index} />
             ))}
        </div>

        {/* Footer Signature */}
        <div className="mt-40 pt-20 border-t border-[#D4AF37]/20 flex flex-col items-center text-center">
            <div className="w-16 h-16 border border-[#D4AF37] rounded-full flex items-center justify-center mb-8 rotate-45">
               <Diamond className="w-6 h-6 text-[#D4AF37] -rotate-45" />
            </div>
            <h3 className="font-serif text-3xl md:text-5xl text-white mb-6 italic">
              "Biz sadece sistem kurmuyoruz<br/> Efsaneler Yaratıyoruz"
            </h3>

        </div>

      </div>
    </div>
  );
};
