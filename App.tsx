import React, { useRef, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero/Hero';
import { ServicesScrollSection } from './components/Services/ServicesScrollSection';
import { ParticleSphere } from './components/Hero/ParticleSphere';
import { ServiceDrawer } from './components/services/ServiceDrawer';
import { ServicesPage } from './components/Services/ServicesPage';
import { PortfolioPage } from './components/Portfolio/PortfolioPage';
import { ContactPage } from './components/Contact/ContactPage';
import { AdminPanel } from './components/Admin/AdminPanel';
import { PremiumBackground } from './components/PremiumBackground';
import { Service } from './types';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, animate, useMotionValue } from 'framer-motion';
import { Lock } from 'lucide-react';

const App: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'portfolio' | 'contact' | 'admin'>('home');
  
  const { scrollYProgress: servicesScroll } = useScroll({
    target: servicesRef,
    offset: ["start start", "end end"]
  });

  // Global Sphere Transformations
  const sphereX = useTransform(servicesScroll, [0, 0.05, 0.70, 0.78], ["0vw", "-22vw", "-22vw", "0vw"]);
  const sphereY = useTransform(servicesScroll, [0, 0.05, 0.70, 0.78], ["0vh", "2vh", "2vh", "-5vh"]);
  const sphereScale = useTransform(servicesScroll, [0, 0.45, 0.70, 0.78], [1.15, 0.82, 0.82, 0.7]);
  const sphereOpacity = useTransform(servicesScroll, [0, 0.02, 0.75, 0.78], [0.9, 0.9, 0.9, 0]);

  // Hide particles briefly during initial hero headline entrance, then fade them in
  const introParticles = useMotionValue(0);

  useEffect(() => {
    // Keep hidden at first, then fade in smoothly
    const controls = animate(introParticles, 1, {
      delay: 1.0,      // headline comes in first
      duration: 0.9,   // then particles fade in
      ease: 'easeOut',
    });

    return () => controls.stop();
  }, []);

  // Final opacity = scroll-based opacity * intro fade-in
  const sphereOpacityFinal = useTransform(
    [sphereOpacity, introParticles],
    ([s, i]) => (s as number) * (i as number)
  );

  const rawStep = useTransform(servicesScroll, [0, 0.05, 0.22, 0.28, 0.44, 0.50, 0.66, 0.72, 0.78], [0, 1, 1, 2, 2, 3, 3, 4, 4]);
  const activeStep = useSpring(rawStep, { stiffness: 45, damping: 24 });

  // Prevent background scroll when overlays are open
  useEffect(() => {
    if (currentView !== 'home') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [currentView]);

  const handleAdminExit = () => {
    setCurrentView('home');
    // Force scroll to top to reset animations
    window.scrollTo(0, 0);
  };

  return (
    <div className={`relative min-h-screen ${selectedService ? 'overflow-hidden' : ''}`}>
      
      {/* Standard Tech Background - Fixed Position Context */}
      <AnimatePresence>
        {currentView !== 'portfolio' && currentView !== 'contact' && currentView !== 'admin' && (
          <motion.div 
            className="fixed inset-0 -z-10 pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
             <PremiumBackground />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* HEADER Z-INDEX EN ÜSTTE OLMALI - Hide in Admin Mode */}
      {currentView !== 'admin' && (
        <Header onNavigate={(view) => setCurrentView(view as any)} currentView={currentView} />
      )}

      {/* KALICI KÜRE TABAKASI: Z-INDEX 10 */}
      <div className="fixed inset-0 z-50 pointer-events-none overflow-visible">
        <motion.div 
          animate={{ 
            scale: currentView === 'home' ? 1 : 0.8,
            filter: currentView === 'home' ? 'blur(0px)' : 'blur(20px)'
          }}
          style={{ 
            x: currentView === 'home' ? sphereX : "0vw",
            y: currentView === 'home' ? sphereY : "0vh",
            scale: currentView === 'home' ? sphereScale : 0.8,
            opacity: currentView === 'home' ? sphereOpacityFinal : 0.2,
            height: '100vh',
          }}
          className="absolute inset-0 w-screen h-screen overflow-visible"
        >
          <ParticleSphere activeStep={activeStep} />
        </motion.div>
      </div>
      
      {/* ANA SAYFA İÇERİĞİ: Z-INDEX 20 */}
      <main 
        className={`relative z-20 transition-all duration-700 ${
          currentView === 'home' ? 'opacity-1 scale-100' : 'opacity-0 scale-95 blur-xl pointer-events-none'
        }`}
      >
        <Hero />
        <section id="services" ref={servicesRef}>
          <ServicesScrollSection 
            scrollProgress={servicesScroll} 
            onServiceClick={(s) => setSelectedService(s)} 
            onNavigate={(view) => setCurrentView(view as any)}
          />
        </section>
      </main>

      {/* OVERLAY PAGES (SERVICES, PORTFOLIO, CONTACT, ADMIN): Z-INDEX 80 */}
      <AnimatePresence mode="wait">
        {currentView !== 'home' && (
          <motion.div
            key="overlay-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[80] overflow-y-auto bg-[#05060A]"
          >
            {/* Conditional Backgrounds for Overlays */}
            
            {/* 1. Services Background (Silver/Tech) */}
            {currentView === 'services' && (
              <div className="fixed inset-0 pointer-events-none">
                  <motion.div 
                    animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-white rounded-full blur-[180px] opacity-10 mix-blend-screen"
                  />
                  <div className="absolute inset-0 opacity-[0.05]" 
                    style={{ 
                      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
                      backgroundSize: '60px 60px',
                      maskImage: 'radial-gradient(circle at center, black 30%, transparent 100%)'
                    }} 
                  />
                  <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              </div>
            )}

            {/* Content Rendering */}
            {currentView === 'services' && (
               <ServicesPage onServiceClick={(s) => setSelectedService(s)} />
            )}
            
            {currentView === 'portfolio' && (
               <PortfolioPage />
            )}

            {currentView === 'contact' && (
              <ContactPage />
            )}

            {currentView === 'admin' && (
              <AdminPanel onExit={handleAdminExit} />
            )}

          </motion.div>
        )}
      </AnimatePresence>

      <footer className={`py-16 border-t border-white/5 text-center backdrop-blur-3xl relative z-[90] ${currentView === 'portfolio' ? 'bg-[#0a0a0a]' : 'bg-black/80'}`}>
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-white/20 text-[10px] font-black tracking-[0.4em] uppercase">
            © 2024 EMİN BİLGİ İŞLEM. MÜHENDİSLİK VE GÜVENLİK SİSTEMLERİ.
          </p>
          <button 
             onClick={() => setCurrentView('admin')}
             className="opacity-10 hover:opacity-50 transition-opacity p-2"
             title="Yönetici Girişi"
          >
             <Lock className="w-3 h-3 text-white" />
          </button>
        </div>
      </footer>

      {/* DRAWER EN ÜSTTE OLMALI Z-INDEX 110 */}
      <ServiceDrawer service={selectedService} onClose={() => setSelectedService(null)} />
    </div>
  );
};

export default App;
