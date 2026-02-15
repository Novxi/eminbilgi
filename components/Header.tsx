
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command, ArrowRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (view: 'home' | 'services' | 'portfolio' | 'contact' | 'admin') => void;
  currentView?: 'home' | 'services' | 'portfolio' | 'contact' | 'admin';
  logoSrc?: string;
  logoAlt?: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentView = 'home', logoSrc = '/images/logo.png', logoAlt = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // 50px aşağı inince navbar form değiştirsin
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ana Sayfa', view: 'home', id: 'home' },
    { name: 'Hizmetler', view: 'services', id: 'services' },
    { name: 'Portföy', view: 'portfolio', id: 'portfolio' },
    { name: 'İletişim', view: 'contact', id: 'contact' },
  ];

  const handleLinkClick = (view: any) => {
    onNavigate?.(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none"
      >
        <motion.div
          layout
          className={`
            pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            flex items-center justify-between
            ${isScrolled 
              ? 'mt-4 w-[90%] md:w-[85%] max-w-5xl rounded-full bg-[#05060A]/60 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] py-3 px-6' 
              : 'w-full py-8 px-6 md:px-12 bg-transparent border-transparent'
            }
          `}
        >
          {/* --- LOGO --- */}
          <div 
            onClick={() => onNavigate?.('home')}
            className="flex items-center cursor-pointer group"
          >
            <div className="relative w-[76px] h-[76px] md:w-[96px] md:h-[96px] flex items-center justify-center">
              {/* Logo Glow */}
              <div className="absolute inset-0 bg-[#1E4FFF] rounded-2xl blur-[34px] opacity-25 group-hover:opacity-45 transition-opacity duration-500" />

              {/* Logo (no frame) */}
              <img
                src={logoSrc}
                alt={logoAlt}
                className="relative z-10 w-full h-full object-contain"
                draggable={false}
              />
            </div>
          </div>

          {/* --- DESKTOP NAV --- */}
          <nav 
            className="hidden md:flex items-center gap-2 relative p-1 rounded-full"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.view)}
                  onMouseEnter={() => setHoveredTab(link.id)}
                  className={`
                    relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-colors duration-300
                    ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}
                  `}
                >
                  {/* Active/Hover Background Pill */}
                  {hoveredTab === link.id && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Active Indicator Dot */}
                  {isActive && (
                     <motion.div 
                        layoutId="active-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1E4FFF] rounded-full shadow-[0_0_8px_#1E4FFF]"
                     />
                  )}

                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* --- ACTIONS --- */}
          <div className="flex items-center gap-4">
            {/* Command Hint (Desktop only) -> NOW ADMIN BUTTON */}
            <button 
              onClick={() => onNavigate?.('admin')}
              className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer ${isScrolled ? 'opacity-0 w-0 overflow-hidden px-0 border-0' : 'opacity-100'}`}
              title="Yönetim Paneli"
            >
              <Command className="w-3 h-3" />
              <span className="text-[10px] font-bold">K</span>
            </button>

            {/* Premium CTA Button */}
            <button 
              onClick={() => onNavigate?.('contact')}
              className="group relative px-6 py-2.5 rounded-full overflow-hidden bg-[#1E4FFF] text-white shadow-[0_0_20px_-5px_#1E4FFF] hover:shadow-[0_0_30px_-5px_#1E4FFF] transition-all duration-300"
            >
              {/* Shimmer Effect */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              
              <div className="relative flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider">Teklif Al</span>
                <Sparkles className="w-3 h-3 fill-white/50 text-white animate-pulse" />
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-24 z-[90] p-6 rounded-[32px] bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/10 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-[#1E4FFF]/20 rounded-full blur-[80px] pointer-events-none" />
            
            <nav className="flex flex-col gap-2 relative z-10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleLinkClick(link.view)}
                  className={`
                    w-full p-4 rounded-2xl text-left flex items-center justify-between group transition-all
                    ${currentView === link.view 
                      ? 'bg-white/10 border border-white/10 text-white' 
                      : 'hover:bg-white/5 text-white/50 hover:text-white border border-transparent'
                    }
                  `}
                >
                  <span className="text-lg font-bold tracking-tight">{link.name}</span>
                  {currentView === link.view && <ArrowRight className="w-5 h-5 text-[#1E4FFF]" />}
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => handleLinkClick('contact')}
                className="mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-[#1E4FFF] to-[#4CC3FF] text-white font-black uppercase tracking-widest shadow-lg shadow-blue-500/20"
              >
                Hemen Başlayın
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        @keyframes shine {
          100% {
            left: 125%;
          }
        }
        .animate-shine {
          animation: shine 1s;
        }
      `}</style>
    </>
  );
};
