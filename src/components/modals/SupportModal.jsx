import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportModal({ isOpen, onClose }) {
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm font-sans">
          
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={onClose}></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden"
          >
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors outline-none focus:ring-2 focus:ring-slate-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8 mt-2">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Support Our Mission</h3>
              <p className="text-slate-600 text-[0.95rem] leading-relaxed px-1 text-center md:text-left font-medium">
                အရေးပေါ်အခြေအနေများတွင် လိုအပ်နေသူများနှင့် ကူညီပေးနိုင်သူများကို ချိတ်ဆက်ပေးမည့် Khu Nyi Kal Sal Application ကို ပိုမိုကောင်းမွန်စွာ ဖွံ့ဖြိုးတိုးတက်စေရန် သင်တို့၏ ပံ့ပိုးကူညီမှုများ လိုအပ်နေပါသည်။
              </p>
            </div>

            <div className="flex flex-col gap-4">
              
              {/* KBZPay Card */}
              <div className="bg-[#1f4287] p-5 rounded-2xl shadow-md border border-[#16336e] relative overflow-hidden text-white group transition-transform hover:-translate-y-1 duration-300">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500"></div>
                <div className="flex justify-between items-center mb-1 relative z-10">
                  <span className="font-bold tracking-wider text-lg">KBZPay</span>
                  <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full font-bold">Verified</span>
                </div>
                <div className="text-sm text-blue-100 mb-4 font-medium relative z-10">Khu Nyi Kal Sal</div>
                
                <div className="flex items-center justify-between bg-black/20 rounded-xl p-3 backdrop-blur-md border border-white/10 relative z-10">
                  <span className="font-mono text-[1.1rem] tracking-widest font-bold text-white">09 123 456 789</span>
                  <button 
                    onClick={() => handleCopy('09123456789')}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors group/btn"
                    title="Copy Number"
                  >
                    {copiedText === '09123456789' ? (
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    ) : (
                      <svg className="w-5 h-5 text-white/80 group-hover/btn:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* WavePay Card */}
              <div className="bg-gradient-to-r from-[#fcb813] to-[#f9a304] p-5 rounded-2xl shadow-md border border-[#e5a50e] relative overflow-hidden text-[#4a3605] group transition-transform hover:-translate-y-1 duration-300">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/30 rounded-full blur-2xl group-hover:bg-white/50 transition-colors duration-500"></div>
                <div className="flex justify-between items-center mb-1 relative z-10">
                  <span className="font-bold tracking-wider text-lg">WavePay</span>
                  <span className="text-[10px] uppercase tracking-wider bg-[#4a3605]/10 px-2.5 py-1 rounded-full font-bold">Verified</span>
                </div>
                <div className="text-sm font-semibold opacity-90 mb-4 relative z-10">Khu Nyi Kal Sal</div>
                
                <div className="flex items-center justify-between bg-white/30 rounded-xl p-3 border border-white/40 relative z-10 shadow-inner">
                  <span className="font-mono text-[1.1rem] tracking-widest font-bold">09 987 654 321</span>
                  <button 
                    onClick={() => handleCopy('09987654321')}
                    className="p-2 hover:bg-white/40 rounded-lg transition-colors group/btn"
                    title="Copy Number"
                  >
                    {copiedText === '09987654321' ? (
                      <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    ) : (
                      <svg className="w-5 h-5 text-[#4a3605]/80 group-hover/btn:text-[#4a3605]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    )}
                  </button>
                </div>
              </div>

            </div>
            
            <p className="text-center text-xs text-slate-400 mt-6 font-medium">
              100% of your donations go directly to maintaining Khu Nyi Kal Sal.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
