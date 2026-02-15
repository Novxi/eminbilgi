
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Service } from '../../types';
import { getIcon } from '../../constants';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

interface ServiceWidgetProps {
  service: Service;
  size: 'small' | 'medium' | 'large' | 'tall';
  onClick: (service: Service) => void;
  isHighlighted?: boolean;
}

// 🎨 ID-Based Unique Micro-Scenes with Vibrant Colors
const VisualPattern = ({ serviceId }: { serviceId: string }) => {
  switch (serviceId) {
    case 'akinsoft': // Akınsoft Special Branding
       return (
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-green-900/20" />
            
            {/* Animated Stylized 'A' Logo Shape */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
               <motion.div 
                 animate={{ y: [-5, 5, -5] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="w-32 h-32 relative"
               >
                  {/* Stylized geometric shapes resembling Akinsoft branding */}
                  <div className="absolute bottom-0 left-0 w-8 h-24 bg-blue-500 rounded-tr-3xl transform -skew-x-12" />
                  <div className="absolute bottom-0 left-10 w-8 h-32 bg-sky-400 rounded-tr-3xl transform -skew-x-12" />
                  <div className="absolute bottom-0 right-0 w-8 h-24 bg-green-500 rounded-tl-3xl transform skew-x-12" />
               </motion.div>
            </div>

            {/* Floating Binary/Data Particles */}
            {[1, 2, 3, 4].map(i => (
               <motion.div
                 key={i}
                 className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]"
                 style={{ 
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%` 
                 }}
                 animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                 transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: i * 0.5 }}
               />
            ))}
         </div>
       );

    case 'yangin-alarm': // Expansive Pulse (Heat/Smoke) -> ORANGE/RED
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
              transition={{ duration: 3, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full border border-orange-500/40 bg-orange-500/10 shadow-[0_0_30px_rgba(249,115,22,0.2)]"
            />
          ))}
        </div>
      );

    case 'web-yazilim': // Code Blocks -> BLUE/INDIGO
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 right-8 w-32 h-20 border border-blue-400/30 rounded-lg bg-blue-500/10 backdrop-blur-sm p-2 flex flex-col gap-2 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
          >
             <div className="w-full h-2 bg-blue-400/40 rounded-full" />
             <div className="w-2/3 h-2 bg-blue-400/20 rounded-full" />
             <div className="w-1/2 h-2 bg-blue-400/20 rounded-full" />
          </motion.div>
          <motion.div
            animate={{ x: [0, -200] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-4 left-0 flex gap-4 whitespace-nowrap font-mono text-[10px] text-blue-300/60"
          >
             <span>import &#123; Future &#125; from 'emin-bilgi';</span>
             <span>&lt;SecureSystem /&gt;</span>
             <span>const speed = 100;</span>
          </motion.div>
        </div>
      );

    case 'mobil-uygulama': // Floating UI Elements -> VIOLET/PINK
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-32 h-56 border border-purple-400/50 rounded-[2rem] relative shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-purple-400/50 rounded-b-xl" />
              </div>
           </div>
           {[1, 2, 3].map(i => (
             <motion.div
               key={i}
               className="absolute w-10 h-10 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-xl backdrop-blur-md shadow-lg shadow-fuchsia-500/10"
               style={{ 
                  left: `${20 + i * 20}%`, 
                  top: '50%' 
               }}
               animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }}
               transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
             />
           ))}
        </div>
      );

    case 'kamera': // Scanning Lens / Focus -> CYAN/TEAL
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
           {/* Crosshair corners */}
           <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-cyan-400" />
           <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-cyan-400" />
           <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-cyan-400" />
           <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-cyan-400" />
           
           {/* Scanning Line - Cyan */}
           <motion.div 
             animate={{ top: ["0%", "100%", "0%"] }}
             transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
             className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]"
           />
        </div>
      );

    case 'hirsiz-alarm': // Laser Grid -> RED
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <motion.div 
             animate={{ rotate: [0, 90] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
             className="absolute -bottom-[50%] -left-[20%] w-[150%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(239,68,68,0.1)_40deg,transparent_80deg)] origin-bottom"
           />
           {[1, 2].map(i => (
             <motion.div
               key={i}
               animate={{ x: ["-100%", "200%"] }}
               transition={{ duration: 2, delay: i, repeat: Infinity, ease: "linear" }}
               className="absolute top-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent transform -rotate-12 shadow-[0_0_10px_#ef4444]"
             />
           ))}
        </div>
      );

    case 'fiber': // Light Speed -> BLUE/SKY
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {[...Array(5)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full opacity-60 shadow-[0_0_8px_#38bdf8]"
               style={{ top: `${20 + i * 15}%`, left: -100, width: 100 }}
               animate={{ x: [0, 800] }}
               transition={{ duration: 1 + Math.random(), delay: Math.random() * 2, repeat: Infinity, ease: "easeIn" }}
             />
           ))}
        </div>
      );

    case 'network': // Connected Nodes -> INDIGO/BLUE
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
           <div className="absolute inset-0" 
             style={{ 
               backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.3) 1px, transparent 1px)', 
               backgroundSize: '30px 30px' 
             }} 
           />
           {[1, 2, 3].map(i => (
             <motion.div
               key={i}
               className="absolute w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_15px_#818cf8]"
               animate={{ 
                 x: [Math.random() * 200, Math.random() * 200],
                 y: [Math.random() * 200, Math.random() * 200],
                 opacity: [0.2, 1, 0.2]
               }}
               transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
             />
           ))}
        </div>
      );

    case 'gecis': // Scanning Gate -> EMERALD
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center gap-2 opacity-30">
           {[...Array(8)].map((_, i) => (
             <motion.div
               key={i}
               animate={{ height: ["20%", "80%", "20%"], opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
               className="w-4 bg-emerald-400 rounded-sm shadow-[0_0_10px_#34d399]"
             />
           ))}
        </div>
      );

    case 'ip-santral': // Audio Waveform -> VIOLET
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-end justify-center gap-1 pb-4 opacity-40">
           {[...Array(12)].map((_, i) => (
             <motion.div
               key={i}
               animate={{ height: [10, Math.random() * 100 + 20, 10] }}
               transition={{ duration: 0.8, delay: i * 0.05, repeat: Infinity, ease: "easeInOut" }}
               className="w-2 bg-gradient-to-t from-violet-500 to-transparent rounded-t-full shadow-[0_0_10px_#8b5cf6]"
             />
           ))}
        </div>
      );

    case 'guc-sarj': // Rising Energy -> GREEN/LIME
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {[...Array(8)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute bottom-0 w-1.5 h-1.5 bg-lime-400 rounded-full shadow-[0_0_10px_#a3e635]"
               style={{ left: `${Math.random() * 100}%` }}
               animate={{ y: [0, -300], opacity: [1, 0] }}
               transition={{ duration: 2 + Math.random(), delay: Math.random(), repeat: Infinity, ease: "linear" }}
             />
           ))}
        </div>
      );

    case 'elektrik-proje': // Blueprint -> AMBER/YELLOW
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <motion.div 
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 3, repeat: Infinity }}
             className="absolute inset-0 border-2 border-dashed border-amber-500/30 m-4 rounded-xl"
           />
           <div className="absolute inset-0" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(245,158,11,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.1) 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }} 
           />
           <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute right-4 bottom-4 w-20 h-20 border border-amber-500/20 rounded-full border-dashed"
           />
        </div>
      );

    default: // Fallback -> SLATE
      return (
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
           {[...Array(5)].map((_, i) => (
             <motion.div
                key={i}
                className="absolute top-0 w-[1px] bg-slate-400 h-20"
                style={{ left: `${20 * i}%` }}
                animate={{ y: ["-100%", "500%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
             />
           ))}
        </div>
      );
  }
};

export const ServiceWidget: React.FC<ServiceWidgetProps> = ({ service, size, onClick, isHighlighted = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    if (service.link) {
      window.open(service.link, '_blank');
    } else {
      onClick(service);
    }
  };

  const sizeClasses = {
    small: "md:col-span-1 md:row-span-1 h-[260px]",
    medium: "md:col-span-2 md:row-span-1 h-[260px]",
    large: "md:col-span-2 md:row-span-2 h-[540px]",
    tall: "md:col-span-1 md:row-span-2 h-[540px]"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isHighlighted ? 1 : 0.3,
        scale: isHighlighted ? 1 : 0.95,
        filter: isHighlighted ? 'grayscale(0%) blur(0px)' : 'grayscale(100%) blur(2px)'
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className={`relative ${sizeClasses[size]} w-full z-10 p-0`}
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="relative w-full h-full group cursor-pointer"
      >
        <div 
          className="relative h-full w-full rounded-[32px] overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/40 hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.15)]"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          
          <VisualPattern serviceId={service.id} />
          
          {/* Silver/White Glare Effect */}
          <motion.div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 mix-blend-overlay"
              style={{
                  background: useTransform(
                    [x, y],
                    ([latestX, latestY]: any[]) => `radial-gradient(circle at ${latestX * 100 + 50}% ${latestY * 100 + 50}%, rgba(255,255,255,0.3), transparent 50%)`
                  )
              }}
          />

          <div className="relative z-30 h-full p-8 flex flex-col justify-between">
            
            {/* Header (Icon) */}
            <div className="flex justify-between items-start flex-shrink-0">
              <motion.div 
                animate={{ 
                  backgroundColor: isHovered ? '#FFFFFF' : 'rgba(255,255,255,0.05)',
                  color: isHovered ? '#000000' : 'rgba(255,255,255,0.5)',
                  scale: isHovered ? 1.1 : 1
                }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 transition-colors duration-300 shadow-lg"
              >
                {getIcon(service.icon, "w-6 h-6")}
              </motion.div>

              {size === 'large' && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_white]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white">Aktif</span>
                </div>
              )}

              {/* External Link Indicator for Akinsoft etc */}
              {service.link && (
                 <div className="absolute top-8 right-8 text-white/30 group-hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5" />
                 </div>
              )}
            </div>

            {/* Main Content */}
            <div className="relative flex flex-col justify-end flex-1 min-h-0">
              <motion.h3 
                animate={{ y: isHovered ? -10 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`font-black text-white tracking-tighter uppercase leading-[0.9] mb-2 flex-shrink-0 subpixel-antialiased origin-bottom-left ${size === 'large' ? 'text-4xl md:text-5xl' : 'text-2xl'}`}
              >
                {service.title}
              </motion.h3>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: isHovered || size === 'large' ? 'auto' : 0, 
                  opacity: isHovered || size === 'large' ? 1 : 0 
                }}
                className="overflow-hidden"
              >
                  <p className="text-white/60 text-xs font-medium leading-relaxed mb-4 line-clamp-3">
                    {service.oneLiner}
                  </p>
              </motion.div>

              {/* Action Button: White/Silver */}
              <motion.div 
                  animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
                  className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest mt-1 flex-shrink-0 h-4"
              >
                  <span>{service.link ? 'Ziyaret Et' : 'İncele'}</span>
                  <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </div>

            {/* Footer Tags */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2 items-center justify-between flex-shrink-0">
              <div className="flex gap-1.5 flex-wrap">
                {service.microMetrics?.slice(0, 2).map((metric, i) => (
                  <span key={i} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-white/40 uppercase tracking-wide group-hover:text-black group-hover:bg-white transition-colors">
                    {metric}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
