import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function DownloadModal({ isOpen, onClose, t }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Dark Dim Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Card - Pure White, Red & Black Design */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative w-full max-w-md bg-white text-black rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] border border-neutral-200 overflow-hidden z-10 flex flex-col"
        >
          {/* Top Red Accent Strip */}
          <div className="h-2 w-full bg-red-600"></div>

          {/* Card Header & Controls */}
          <div className="p-6 sm:p-8 flex flex-col items-start text-left relative">
            
            {/* Top Row: Badge & Close Button */}
            <div className="w-full flex items-center justify-between mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-[11px] font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                <span>RELEASING SOON</span>
              </div>

              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-black text-neutral-600 hover:text-white flex items-center justify-center transition-colors text-sm font-bold"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Typography Header */}
            <h3 className="text-3xl sm:text-4xl font-black text-black tracking-tight leading-none mb-2">
              Stay Tuned.
            </h3>
            
            <h4 className="text-lg sm:text-xl font-black text-red-600 mb-4">
              Something Special is Coming.
            </h4>

            {/* Message Box */}
            <div className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl p-4 mb-6 text-xs sm:text-sm text-neutral-800 leading-relaxed">
              <p className="mb-2 font-medium">
                The official <strong className="text-black font-bold">Khu Nyi Kal Sal</strong> mobile emergency application is preparing for its public launch.
              </p>
              <p className="text-neutral-500 text-[11px] leading-normal">
                Google Play Store နှင့် Apple App Store တို့တွင် မကြာမီ တရားဝင် ဒေါင်းလုဒ်ရယူနိုင်တော့မည် ဖြစ်ပါသည်။
              </p>
            </div>

            {/* Platform Badges (Strict Black & White) */}
            <div className="grid grid-cols-2 gap-3 w-full mb-6">
              <div className="border border-neutral-200 rounded-xl p-3 flex flex-col items-start bg-white">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">Android</span>
                <span className="text-xs font-black text-black mt-0.5">Google Play</span>
              </div>
              <div className="border border-neutral-200 rounded-xl p-3 flex flex-col items-start bg-white">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">iOS</span>
                <span className="text-xs font-black text-black mt-0.5">App Store</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <Link
                to="/guide"
                onClick={onClose}
                className="w-full py-3.5 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-center"
              >
                <span>View User Guide</span>
                <span>→</span>
              </Link>
              
              <button
                onClick={onClose}
                className="w-full py-3.5 px-5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                Got It
              </button>
            </div>

          </div>

          {/* Bottom Clean Bar */}
          <div className="px-6 py-3 bg-neutral-900 text-center text-[10px] font-mono text-neutral-300">
            KHU NYI KAL SAL • 24/7 EMERGENCY SERVICE
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
