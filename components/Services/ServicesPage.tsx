import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../../constants';
import { Service } from '../../types';
import { ServiceWidget } from '../services/ServiceWidget';
import { Search, Globe, Shield, Users, Trophy, Box, Building2, Factory, Warehouse, Command, ArrowRight, LayoutGrid, Zap } from 'lucide-react';

interface ServicesPageProps {
  onServiceClick: (service: Service) => void;
  onNavigate: (view: 'contact') => void;
}

const CATEGORIES = ["Tümü", "Güvenlik", "Altyapı", "Yazılım", "İletişim", "Enerji", "Proje"];
const SCENARIOS = [
  { id: 'all', name: 'Tüm Tesis', icon: <LayoutGrid className="w-3 h-3"/> },
  { id: 'factory', name: 'Fabrika', icon: <Factory className="w-3 h-3"/>, matched: ["yangin-alarm", "kamera", "hirsiz-alarm", "gecis", "fiber", "network", "guc-sarj"] },
  { id: 'office', name: 'Ofis', icon: <Building2 className="w-3 h-3"/>, matched: ["network", "web-yazilim", "ip-santral", "gecis", "kamera", "akinsoft"] },
  { id: 'warehouse', name: 'Depo', icon: <Warehouse className="w-3 h-3"/>, matched: ["kamera", "yangin-alarm", "fiber", "hirsiz-alarm", "mobil-uygulama", "akinsoft"] }
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onServiceClick, onNavigate }) => {
  const [filter, setFilter] = useState("Tümü");
  const [search, setSearch] = useState("");
  const [activeScenario, setActiveScenario] = useState('all');

  const filteredServices = useMemo(() => {
    return SERVICES.filter(s => {
      const matchesFilter = filter === "Tümü" || s.category === filter;
      const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || 
                          s.oneLiner.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const isHighlighted = (serviceId: string) => {
    if (activeScenario === 'all') return true;
    const scenario = SCENARIOS.find(sc => sc.id === activeScenario);
    return scenario?.matched?.includes(serviceId);
  };

  const getWidgetSize = (id: string, index: number): 'small' | 'medium' | 'large' | 'tall' => {
    if (index === 0) return 'large'; 
    if (index === 1) return 'medium';
    if (index === 2) return 'tall';
    if (index === 3) return 'small';
    if (index === 5) return 'medium';
    if (index === 11) return 'medium'; // Akinsoft Highlight
    return 'small';
  };

  return (
    <div className="min-h-screen pt-32 pb-32 relative z-10">
      
      <div className="container mx-auto px-6 relative z-10 max-w-[1400px]">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
             <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="flex relative">
                {/* Silver Dot Animation */}
                <span className="w-3 h-3 bg-white rounded-full absolute animate-ping opacity-50" />
                <span className="w-3 h-3 bg-white rounded-full relative z-10 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              </div>
              <span className="text-white/60 font-black uppercase tracking-[0.4em] text-[10px]">
                EKOSİSTEM v2.0
              </span>
            </motion.div>
            
            {/* Chrome Gradient Title */}
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] uppercase select-none relative">
              Profesyonel <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-700 drop-shadow-2xl">Hizmetler.</span>
            </h1>
          </div>
          

        </header>

        {/* Floating Control Dock */}
        <div className="sticky top-28 z-[60] mb-12">
          <div className="mx-auto max-w-5xl glass p-2 rounded-2xl border border-white/10 bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-center gap-2">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto no-scrollbar px-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    filter === cat ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-[1px] h-8 bg-white/10 hidden md:block mx-2" />

            {/* Search */}
            <div className="relative flex-1 w-full md:w-auto group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-white transition-colors" />
               <input 
                 type="text" 
                 placeholder="Hizmetlerde ara..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-10 pr-12 text-xs font-bold text-white outline-none focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-white/20"
               />
               <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 opacity-20">
                  <Command className="w-3 h-3" /> <span className="text-[9px] font-black">K</span>
               </div>
            </div>
          </div>
        </div>

        {/* 🧱 MASONRY GRID */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[260px] grid-flow-dense"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <ServiceWidget 
                key={service.id}
                service={service}
                size={getWidgetSize(service.id, index)}
                isHighlighted={isHighlighted(service.id)}
                onClick={onServiceClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-32 border-t border-white/10 pt-20 flex flex-col items-center text-center relative z-10">
           <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8 uppercase">
              
           </h2>

        </div>

      </div>
    </div>
  );
};
