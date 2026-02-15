
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// Added ArrowRight import
import { ArrowRight } from 'lucide-react';
import { getIcon } from '../../constants';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
  onClick: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(service)}
      className="relative group h-[520px] w-full cursor-pointer"
    >
      <div className="absolute inset-0 bg-[#1E4FFF]/5 rounded-[40px] transition-opacity duration-700 opacity-0 group-hover:opacity-100 blur-2xl" />
      
      <div className="glass h-full w-full rounded-[40px] p-12 flex flex-col justify-between overflow-hidden relative border border-white/5 group-hover:border-[#1E4FFF]/30 transition-all duration-500">
        <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-[#1E4FFF]/5 blur-[80px] rounded-full group-hover:bg-[#1E4FFF]/10 transition-colors duration-700" />
        
        <div style={{ transform: 'translateZ(60px)' }}>
          <div className="w-20 h-20 rounded-[28px] bg-white/5 flex items-center justify-center mb-10 border border-white/10 text-white/40 group-hover:scale-110 group-hover:bg-[#1E4FFF] group-hover:text-white group-hover:border-transparent transition-all duration-700 shadow-2xl">
            {getIcon(service.icon, "w-10 h-10")}
          </div>
          <h3 className="text-3xl font-black text-white mb-6 tracking-tight leading-none uppercase">{service.title}</h3>
          <p className="text-white/40 leading-relaxed text-base font-medium max-w-[90%] group-hover:text-white/60 transition-colors">
            {service.description}
          </p>
        </div>

        <div className="space-y-8" style={{ transform: 'translateZ(40px)' }}>
          <div className="flex items-center gap-3">
            {service.metrics?.map((m, idx) => (
              <div key={idx} className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black mb-1">{m.label}</div>
                <div className="text-lg font-black text-white">{m.value}</div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.3em] text-[#4CC3FF] group-hover:text-white transition-colors">
            <span>KEŞFEDİN</span>
            <motion.div 
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
