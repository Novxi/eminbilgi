
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INDUSTRIES } from '../constants';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const IndustrySolutions: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="solutions" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Sektöre Özel <br /> <span className="text-purple-500">Mühendislik Çözümleri</span>
          </h2>
          <p className="text-white/60 text-lg">
            Her sektörün dinamiği farklıdır. İster bir üretim tesisi, ister lüks bir otel zinciri olsun; 
            ihtiyaca yönelik, yönetmeliklere uyumlu altyapılar tasarlıyoruz.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-16">
          {INDUSTRIES.map((industry, idx) => (
            <button
              key={industry.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeIndex === idx 
                ? 'accent-gradient text-white shadow-lg shadow-purple-500/20' 
                : 'glass text-white/50 hover:text-white'
              }`}
            >
              {industry.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={INDUSTRIES[activeIndex].id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="glass p-10 md:p-16 rounded-[40px] border border-white/10"
            >
              <h3 className="text-3xl font-bold text-white mb-6">{INDUSTRIES[activeIndex].name} Çözümleri</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                {INDUSTRIES[activeIndex].description}
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Performans Çıktısı</h4>
                    <p className="text-white/40 text-sm">{INDUSTRIES[activeIndex].kpi}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Uyum & Standartlar</h4>
                    <p className="text-white/40 text-sm">{INDUSTRIES[activeIndex].compliance}</p>
                  </div>
                </div>
              </div>

              <button className="group flex items-center gap-3 text-purple-400 font-bold hover:text-purple-300 transition-colors">
                Detaylı Vaka Analizi 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </AnimatePresence>

          <div className="relative aspect-video rounded-[40px] overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img
                key={INDUSTRIES[activeIndex].id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                src={`https://picsum.photos/seed/${INDUSTRIES[activeIndex].id}/800/600`}
                alt={INDUSTRIES[activeIndex].name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <div className="p-4 glass rounded-2xl border border-white/10 max-w-xs">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Referans Proje</p>
                <p className="text-sm text-white font-semibold">İstanbul'un en büyük {INDUSTRIES[activeIndex].name.toLowerCase()} entegrasyonu tamamlandı.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
