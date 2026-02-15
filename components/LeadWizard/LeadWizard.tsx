
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WizardStep } from '../../types';
import { ChevronRight, ChevronLeft, Check, Send } from 'lucide-react';

export const LeadWizard: React.FC = () => {
  const [step, setStep] = useState<WizardStep>(WizardStep.SECTOR);
  const [formData, setFormData] = useState({
    sector: '',
    needs: [] as string[],
    scale: '',
    sla: '',
    contact: { name: '', email: '', phone: '' }
  });

  const nextStep = () => setStep(s => Math.min(s + 1, WizardStep.CONTACT));
  const prevStep = () => setStep(s => Math.max(s - 1, WizardStep.SECTOR));

  const renderStep = () => {
    switch(step) {
      case WizardStep.SECTOR:
        return (
          <div className="grid grid-cols-2 gap-4">
            {['Fabrika', 'Otel', 'Ofis', 'Mağaza', 'Site', 'Diğer'].map(s => (
              <button
                key={s}
                onClick={() => { setFormData({ ...formData, sector: s }); nextStep(); }}
                className={`p-6 rounded-2xl border transition-all text-left ${
                  formData.sector === s ? 'accent-gradient border-transparent text-white' : 'glass border-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                <span className="font-bold">{s}</span>
              </button>
            ))}
          </div>
        );
      case WizardStep.NEEDS:
        const needs = ['CCTV İzleme', 'Yangın Alarmı', 'Kartlı Geçiş', 'Network Altyapı', 'Sunucu Odası', 'Bakım/Destek'];
        return (
          <div className="grid grid-cols-2 gap-4">
            {needs.map(n => (
              <button
                key={n}
                onClick={() => {
                  const newNeeds = formData.needs.includes(n) 
                    ? formData.needs.filter(x => x !== n) 
                    : [...formData.needs, n];
                  setFormData({ ...formData, needs: newNeeds });
                }}
                className={`p-6 rounded-2xl border transition-all text-left relative overflow-hidden ${
                  formData.needs.includes(n) ? 'border-purple-500 bg-purple-500/10 text-white' : 'glass border-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                {formData.needs.includes(n) && <Check className="absolute top-4 right-4 w-4 h-4 text-purple-400" />}
                <span className="font-bold">{n}</span>
              </button>
            ))}
            <div className="col-span-2 mt-4">
              <button onClick={nextStep} disabled={formData.needs.length === 0} className="w-full py-4 accent-gradient rounded-xl font-bold disabled:opacity-50">
                Devam Et
              </button>
            </div>
          </div>
        );
      case WizardStep.SCALE:
        return (
          <div className="space-y-4">
            {['< 500 m²', '500 - 2000 m²', '2000 - 10.000 m²', '> 10.000 m²'].map(scale => (
              <button
                key={scale}
                onClick={() => { setFormData({ ...formData, scale }); nextStep(); }}
                className={`w-full p-6 rounded-2xl border transition-all text-center font-bold ${
                  formData.scale === scale ? 'accent-gradient border-transparent text-white' : 'glass border-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                {scale}
              </button>
            ))}
          </div>
        );
      case WizardStep.CONTACT:
        return (
          <div className="space-y-4">
            <input 
              type="text" placeholder="Ad Soyad" 
              className="w-full p-4 rounded-xl glass border border-white/5 text-white outline-none focus:border-purple-500/50 transition-colors"
              onChange={e => setFormData({ ...formData, contact: { ...formData.contact, name: e.target.value }})}
            />
            <input 
              type="email" placeholder="E-posta Adresi" 
              className="w-full p-4 rounded-xl glass border border-white/5 text-white outline-none focus:border-purple-500/50 transition-colors"
              onChange={e => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value }})}
            />
            <input 
              type="tel" placeholder="Telefon Numarası" 
              className="w-full p-4 rounded-xl glass border border-white/5 text-white outline-none focus:border-purple-500/50 transition-colors"
              onChange={e => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value }})}
            />
            <button className="w-full py-5 accent-gradient rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-purple-500/30">
              Ücretsiz Keşif Talebi Oluştur
              <Send className="w-5 h-5" />
            </button>
          </div>
        );
      default: return null;
    }
  };

  const stepLabels = ['Sektör', 'İhtiyaçlar', 'Ölçek', 'İletişim'];

  return (
    <div className="max-w-2xl mx-auto glass p-8 md:p-12 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
        <motion.div 
          className="h-full accent-gradient shadow-[0_0_15px_rgba(124,92,255,0.5)]" 
          animate={{ width: `${((step + 1) / 5) * 100}%` }}
        />
      </div>

      <div className="mb-10 flex justify-between items-center">
        <div>
          <h4 className="text-white font-bold text-2xl mb-1">Teklif Sihirbazı</h4>
          <p className="text-white/40 text-sm">Adım {step + 1}: {stepLabels[step] || 'Sonuç'}</p>
        </div>
        {step > 0 && (
          <button onClick={prevStep} className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white transition-colors">
            <ChevronLeft />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
