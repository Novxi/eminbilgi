
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Trash2, Search, LogOut, ChevronRight, User, Phone, Calendar, Clock, RefreshCw, ArrowLeft } from 'lucide-react';
import { ContactMessage } from '../../types';

interface AdminPanelProps {
  onExit: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    // Load messages from local storage
    const loadMessages = () => {
      const stored = localStorage.getItem('emin_messages');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    };
    loadMessages();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Hatalı Şifre');
    }
  };

  const deleteMessage = (id: string) => {
    if (confirm('Bu mesajı silmek istediğinize emin misiniz?')) {
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      localStorage.setItem('emin_messages', JSON.stringify(updated));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', { 
        day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' 
    }).format(date);
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05060A] flex items-center justify-center relative overflow-hidden">
        {/* Return to Home Button */}
        <button 
          onClick={onExit}
          className="absolute top-8 left-8 flex items-center gap-2 text-white/30 hover:text-white transition-colors z-50 group"
        >
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/5">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Ana Sayfa</span>
        </button>

        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md p-8"
        >
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
            <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-8">
              <Lock className="w-8 h-8 text-white/70" />
            </div>
            
            <h2 className="text-3xl font-black text-white text-center mb-2 tracking-tight">Yönetim Paneli</h2>
            <p className="text-white/40 text-center text-sm mb-8">Sisteme erişmek için güvenlik anahtarını giriniz.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                placeholder="Güvenlik Anahtarı"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-white placeholder:text-white/20 outline-none focus:border-purple-500 transition-colors tracking-widest"
              />
              <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-purple-500 hover:text-white transition-all">
                Giriş Yap
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#05060A] pt-24 pb-12 px-6 flex flex-col h-screen overflow-hidden">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-8 shrink-0">
        <div>
           <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              Gelen Kutusu
           </h1>
           <p className="text-white/40 text-xs mt-1">Toplam {messages.length} mesajınız var.</p>
        </div>
        <button 
           onClick={onExit}
           className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-bold uppercase hover:bg-red-500 hover:text-white transition-colors"
        >
           <LogOut className="w-4 h-4" /> Çıkış & Ana Sayfa
        </button>
      </header>

      <div className="flex flex-1 gap-6 overflow-hidden min-h-0">
         
         {/* Sidebar / Message List */}
         <div className="w-full md:w-1/3 flex flex-col bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
            
            <div className="p-4 border-b border-white/5">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input 
                    type="text" 
                    placeholder="Mesajlarda ara..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-black/20 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 outline-none border border-transparent focus:border-white/10"
                  />
               </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
               {filteredMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-white/30">
                     <Mail className="w-8 h-8 mb-2 opacity-50" />
                     <span className="text-xs">Mesaj bulunamadı</span>
                  </div>
               ) : (
                  filteredMessages.map((msg) => (
                     <div 
                        key={msg.id}
                        onClick={() => setSelectedMessage(msg)}
                        className={`p-4 rounded-xl cursor-pointer transition-all border ${
                           selectedMessage?.id === msg.id 
                           ? 'bg-[#1E4FFF] border-[#1E4FFF] shadow-lg' 
                           : 'bg-white/5 border-transparent hover:bg-white/10'
                        }`}
                     >
                        <div className="flex justify-between items-start mb-1">
                           <h4 className={`font-bold text-sm ${selectedMessage?.id === msg.id ? 'text-white' : 'text-white/90'}`}>
                              {msg.name}
                           </h4>
                           <span className={`text-[10px] ${selectedMessage?.id === msg.id ? 'text-white/70' : 'text-white/40'}`}>
                              {new Date(msg.date).toLocaleDateString()}
                           </span>
                        </div>
                        <p className={`text-xs truncate ${selectedMessage?.id === msg.id ? 'text-white/80' : 'text-white/50'}`}>
                           {msg.message}
                        </p>
                     </div>
                  ))
               )}
            </div>
         </div>

         {/* Detail View */}
         <div className="hidden md:flex flex-1 bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md flex-col relative">
            {selectedMessage ? (
               <>
                  {/* Detail Header */}
                  <div className="p-8 border-b border-white/5 flex justify-between items-start bg-white/5">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                           {selectedMessage.name.charAt(0)}
                        </div>
                        <div>
                           <h2 className="text-xl font-bold text-white">{selectedMessage.name}</h2>
                           <div className="flex items-center gap-3 text-white/50 text-xs mt-1">
                              <span className="flex items-center gap-1"><Mail className="w-3 h-3"/> {selectedMessage.email}</span>
                              <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {selectedMessage.phone}</span>
                           </div>
                        </div>
                     </div>
                     <button 
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="p-2 hover:bg-red-500/20 text-white/30 hover:text-red-500 rounded-lg transition-colors"
                        title="Sil"
                     >
                        <Trash2 className="w-5 h-5" />
                     </button>
                  </div>

                  {/* Message Body */}
                  <div className="flex-1 p-8 overflow-y-auto">
                     <div className="flex items-center gap-2 text-white/30 text-xs mb-6 uppercase tracking-wider font-bold">
                        <Clock className="w-3 h-3" />
                        {formatDate(selectedMessage.date)}
                     </div>
                     <div className="prose prose-invert max-w-none">
                        <p className="text-white/80 leading-relaxed whitespace-pre-wrap text-lg">
                           {selectedMessage.message}
                        </p>
                     </div>
                  </div>
               </>
            ) : (
               <div className="flex-1 flex flex-col items-center justify-center text-white/20">
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                     <Mail className="w-10 h-10" />
                  </div>
                  <p className="text-lg font-medium">Görüntülemek için bir mesaj seçin</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};
