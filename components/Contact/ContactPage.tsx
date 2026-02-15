
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Copy, Check, Zap, ExternalLink, ArrowRight, Loader2 } from 'lucide-react';
import { ContactMessage } from '../../types';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCopy = (e: React.MouseEvent, text: string, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate Network Delay & Save to LocalStorage
    setTimeout(() => {
      try {
        const newMessage: ContactMessage = {
          id: Date.now().toString(),
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          message: formState.message,
          date: new Date().toISOString(),
          read: false
        };

        const existingMessages = JSON.parse(localStorage.getItem('emin_messages') || '[]');
        localStorage.setItem('emin_messages', JSON.stringify([newMessage, ...existingMessages]));

        setSubmitStatus('success');
        setFormState({ name: '', phone: '', email: '', message: '' });
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
        // Reset status after 3 seconds
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    }, 1500);
  };

  const contactInfo = [
    {
      id: 'phone',
      icon: <Phone className="w-6 h-6" />,
      label: "ÇAĞRI MERKEZİ",
      value: "+90 544 315 48 68",
      sub: "7/24 Teknik Destek",
      link: "tel:+905443154868",
      actionLabel: "ARA",
      color: "from-blue-600 to-cyan-500",
      hexColor: "#3b82f6", // Blue for border
      glow: "group-hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
    },
    {
      id: 'email',
      icon: <Mail className="w-6 h-6" />,
      label: "E-POSTA",
      value: "destek@eminbilgiislem.com",
      sub: "Kurumsal Destek",
      link: "mailto:destek@eminbilgiislem.com",
      actionLabel: "GÖNDER",
      color: "from-purple-600 to-pink-500",
      hexColor: "#a855f7", // Purple for border
      glow: "group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
    },
    {
      id: 'address',
      icon: <MapPin className="w-6 h-6" />,
      label: "OFİS ADRESİ",
      value: "Hürriyet Cad. No:135",
      sub: "",
      link: "",
      actionLabel: "TARİF",
      color: "from-emerald-600 to-teal-500",
      hexColor: "#10b981", // Emerald for border
      glow: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#05060A] text-white pt-32 pb-20 relative z-10 overflow-hidden">
      
      <style>{`
        @keyframes border-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes beam-pulse {
          0%, 100% { opacity: 0.8; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.1); }
        }

        @keyframes shine-sweep {
            0% { left: -100%; opacity: 0; }
            50% { opacity: 0.5; }
            100% { left: 200%; opacity: 0; }
        }

        .premium-border-gradient {
          background: conic-gradient(from 0deg, #2e1065 0%, #000000 40%, #d8b4fe 50%, #a855f7 55%, #000000 65%, #2e1065 100%);
        }
        
        .card-shine:hover::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
            transform: skewX(-20deg);
            animation: shine-sweep 0.75s;
        }
      `}</style>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-purple-900 rounded-full blur-[300px] opacity-[0.1]" />
         <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-indigo-900 rounded-full blur-[250px] opacity-[0.1]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Sistemler Aktif & Online</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Projenizi <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">Hayata Geçirelim</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Uzman ekibimiz sorularınızı yanıtlamak ve size özel çözümler sunmak için hazır. <br className="hidden md:block"/>
            
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Contact Info - PREMIUM LARGE VERSION */}
          <div className="lg:col-span-5 space-y-6 relative z-20 flex flex-col justify-center">
             {contactInfo.map((info, idx) => (
                <motion.a
                  key={info.id}
                  href={info.link}
                  target={info.id === 'address' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="group relative block w-full rounded-[24px] overflow-hidden p-[1px]"
                >
                  {/* ROTATING BORDER BEAM */}
                  <div 
                    className="absolute inset-[-100%]" 
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0 340deg, ${info.hexColor} 360deg)`,
                        animation: 'border-spin 4s linear infinite'
                    }}
                  />
                  
                  {/* Card Container (Inner Content) */}
                  <div className={`
                    relative h-full w-full px-7 py-6 rounded-[23px] overflow-hidden transition-all duration-300
                    bg-[#0A0B10] hover:bg-[#0f1116] card-shine flex items-center gap-6
                  `}>
                     
                     {/* Ambient Glow Background on Hover */}
                     <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${info.color}`} />

                     {/* Icon Box - Large (56px) */}
                     <div className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500
                        bg-white/5 border border-white/10 text-white/70
                        group-hover:text-white group-hover:scale-105 group-hover:bg-gradient-to-br ${info.color} ${info.glow}
                     `}>
                        {info.icon}
                     </div>

                     {/* Text Content */}
                     <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors leading-none">
                           {info.label}
                        </span>
                        <div className="text-lg font-bold text-white truncate leading-tight">
                           {info.value}
                        </div>
                     </div>

                     {/* Action Buttons */}
                     <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#1E4FFF] bg-[#1E4FFF]/10 px-4 py-2 rounded-xl border border-[#1E4FFF]/20 whitespace-nowrap">
                           {info.actionLabel}
                        </div>
                        
                        <button 
                           onClick={(e) => handleCopy(e, info.value, info.id)}
                           className="p-3 rounded-xl hover:bg-white/10 text-white/30 hover:text-white transition-colors"
                           title="Kopyala"
                        >
                           {copied === info.id ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                        </button>
                     </div>
                  </div>
                </motion.a>
             ))}
          </div>

          {/* ⚡⚡ MASSIVE ENERGY BEAM CONTACT CARD ⚡⚡ */}
          <div className="lg:col-span-7 relative group mt-20 lg:mt-0">
             
             {/* --- 🌌 THE MASSIVE PURPLE BEAM --- */}
             <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-full max-w-[400px] h-[600px] pointer-events-none z-0 flex justify-center">
                
                {/* 1. Outer Wide Glow (Atmosphere) */}
                <div 
                   className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/20 to-purple-500/10 blur-[60px]"
                   style={{ animation: 'beam-pulse 4s ease-in-out infinite' }}
                />

                {/* 2. The Main Pillar (Violet Plasma) */}
                <div 
                   className="w-[120px] h-full bg-gradient-to-b from-transparent via-purple-500 to-white blur-[20px] opacity-60"
                   style={{ animation: 'beam-pulse 3s ease-in-out infinite alternate' }}
                />

                {/* 3. The Core (Pure Energy) */}
                <div 
                   className="absolute w-[20px] h-full bg-white blur-[8px] shadow-[0_0_50px_white]"
                />
                
                {/* 4. Particle Dust Rising */}
                <div className="absolute bottom-0 w-full h-64 overflow-hidden opacity-50">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-full blur-[1px]"
                            style={{
                                width: Math.random() * 4 + 1 + 'px',
                                height: Math.random() * 4 + 1 + 'px',
                                left: Math.random() * 100 + '%',
                                bottom: '-10px'
                            }}
                            animate={{
                                y: -300 - Math.random() * 200,
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 2 + Math.random() * 3,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 2
                            }}
                        />
                    ))}
                </div>
             </div>

             {/* --- 💥 IMPACT HORIZON (Where beam hits the card) --- */}
             <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[120%] h-[100px] z-20 pointer-events-none">
                 {/* Wide Purple Wash */}
                 <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[60%] h-[60px] bg-purple-500 blur-[50px] opacity-60 mix-blend-screen" />
             </div>

             {/* 🌟 NEW: GRADIENT BACK GLOW (Kutu Arkası Parlaklık) 🌟 */}
             <div 
                className="absolute inset-8 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 blur-[80px] opacity-40 z-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-60"
             />

             {/* 3) Card Container with Animated Border */}
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="relative rounded-[40px] p-[2px] overflow-hidden z-10"
             >
                {/* Rotating Gradient Border */}
                <div 
                  className="absolute inset-[-50%] premium-border-gradient opacity-100"
                  style={{ animation: 'border-spin 8s linear infinite' }}
                />

                {/* Main Card Content (Inner) */}
                <div className="relative bg-[#0A0B10] rounded-[38.5px] h-full overflow-hidden">
                   
                   <div className="p-8 md:p-12 relative z-10">
                      
                      <div className="flex items-center gap-3 mb-8">
                         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.6)] border border-white/50 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                            <Zap className="w-5 h-5 text-white fill-white relative z-10" />
                         </div>
                         <div>
                           <h3 className="text-2xl font-bold text-white">Hızlı İletişim</h3>
                           <p className="text-[10px] text-purple-300 font-bold uppercase tracking-widest flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping"/> Online
                           </p>
                         </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Ad Soyad</label>
                               <input 
                                 type="text" 
                                 placeholder="Adınız"
                                 value={formState.name}
                                 onChange={(e) => setFormState({...formState, name: e.target.value})}
                                 required
                                 className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 outline-none focus:border-purple-400 focus:bg-purple-500/10 transition-all focus:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Telefon</label>
                               <input 
                                 type="tel" 
                                 placeholder="05..."
                                 value={formState.phone}
                                 onChange={(e) => setFormState({...formState, phone: e.target.value})}
                                 required
                                 className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 outline-none focus:border-purple-400 focus:bg-purple-500/10 transition-all focus:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                               />
                            </div>
                         </div>

                         <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">E-Posta</label>
                            <input 
                              type="email" 
                              placeholder="eposta@adresiniz.com"
                              value={formState.email}
                              onChange={(e) => setFormState({...formState, email: e.target.value})}
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 outline-none focus:border-purple-400 focus:bg-purple-500/10 transition-all focus:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                            />
                         </div>

                         <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Mesajınız</label>
                            <textarea 
                              rows={4}
                              placeholder="Nasıl yardımcı olabiliriz?"
                              value={formState.message}
                              onChange={(e) => setFormState({...formState, message: e.target.value})}
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 outline-none focus:border-purple-400 focus:bg-purple-500/10 transition-all resize-none focus:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                            />
                         </div>

                         <button 
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.8)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin"/> : (submitStatus === 'success' ? 'GÖNDERİLDİ' : 'GÖNDER')} 
                            {!isSubmitting && submitStatus !== 'success' && <Send className="w-4 h-4" />}
                            {submitStatus === 'success' && <Check className="w-4 h-4" />}
                         </button>
                         {submitStatus === 'success' && (
                            <p className="text-center text-green-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                               Mesajınız başarıyla iletildi.
                            </p>
                         )}
                      </form>
                   </div>
                </div>
             </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};
