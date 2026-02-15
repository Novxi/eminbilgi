
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, MapPin, Clock, Activity, FileText } from 'lucide-react';
import { Service } from '../../types';
import { getIcon } from '../../constants';

interface ServiceDrawerProps {
  service: Service | null;
  onClose: () => void;
}

export const ServiceDrawer: React.FC<ServiceDrawerProps> = ({ service, onClose }) => {
  const steps = [
    { title: "Analiz", desc: "Saha Keşfi" },
    { title: "Tasarım", desc: "Proje Çizimi" },
    { title: "Montaj", desc: "Kurulum" },
    { title: "Test", desc: "Devreye Alma" }
  ];

  return (
    <AnimatePresence>
      {service && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[111] w-full max-w-2xl bg-[#05060A] border-l border-white/10 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#1E4FFF]/10 rounded-full blur-[100px]" />

            {/* Header / Sticky Top */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center relative z-20 bg-[#05060A]/80 backdrop-blur-xl">
               <button 
                  onClick={onClose} 
                  className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors"
                >
                  <div className="p-2 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                     <X className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Kapat</span>
                </button>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E4FFF]/10 border border-[#1E4FFF]/20">
                   <Activity className="w-3 h-3 text-[#1E4FFF]" />
                   <span className="text-[9px] font-black text-[#1E4FFF] uppercase tracking-widest">Canlı Hizmet</span>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
              
              {/* Hero Section */}
              <div className="p-10 md:p-14 pb-0">
                <div className="w-24 h-24 rounded-[32px] bg-[#1E4FFF] flex items-center justify-center text-white shadow-[0_10px_40px_-10px_#1E4FFF] mb-8">
                  {getIcon(service.icon, "w-10 h-10")}
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-6">
                  {service.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed max-w-lg">
                  {service.longDescription.split('.')[0]}.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-px bg-white/5 border-y border-white/5 mt-12">
                 {service.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="bg-[#05060A] p-8 hover:bg-[#0A0B10] transition-colors">
                       <CheckCircle2 className="w-6 h-6 text-[#1E4FFF] mb-4" />
                       <h4 className="text-white font-bold text-sm uppercase tracking-wide">{f}</h4>
                    </div>
                 ))}
              </div>

              {/* Process Roadmap */}
              <div className="p-10 md:p-14">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">Uygulama Süreci</h3>
                 <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -z-10" />
                    {steps.map((step, i) => (
                       <div key={i} className="flex flex-col items-center gap-3 bg-[#05060A] px-2 z-10">
                          <div className="w-3 h-3 rounded-full bg-[#1E4FFF] border-4 border-[#05060A]" />
                          <div className="text-center">
                             <div className="text-white font-bold text-xs uppercase">{step.title}</div>
                             <div className="text-white/30 text-[9px] font-bold uppercase tracking-wider">{step.desc}</div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Long Description */}
              <div className="p-10 md:p-14 pt-0">
                 <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                    <h3 className="flex items-center gap-3 text-white font-bold mb-4">
                       <FileText className="w-5 h-5 text-white/50" />
                       Teknik Özellikler
                    </h3>
                    <p className="text-white/50 leading-relaxed text-sm">
                       {service.longDescription}
                    </p>
                 </div>
              </div>

            </div>

            {/* Sticky Bottom CTA */}
            <div className="p-8 border-t border-white/10 bg-[#05060A] relative z-20">
               <button className="w-full py-5 bg-white text-black rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#1E4FFF] hover:text-white transition-colors flex items-center justify-center gap-3">
                  Teklif İste <ArrowRight className="w-4 h-4"/>
               </button>
               <div className="flex justify-between items-center mt-4 px-2">
                  <div className="flex items-center gap-2 text-[9px] font-bold text-white/30 uppercase tracking-wider">
                     <Clock className="w-3 h-3" /> Ortalama Yanıt: 1 Saat
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-bold text-white/30 uppercase tracking-wider">
                     <MapPin className="w-3 h-3" /> Tüm Türkiye
                  </div>
               </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
