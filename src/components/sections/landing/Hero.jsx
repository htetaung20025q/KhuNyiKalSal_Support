import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero({ t, onOpenDownload, onOpenFirstAid }) {
  return (
    <section className="bg-slate-900 text-white py-16 md:py-24 px-4 md:px-8 min-h-[400px] md:min-h-[450px] flex items-center relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full flex flex-col items-start text-left relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-widest mb-4">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          24/7 National Emergency Service
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 max-w-3xl leading-[1.1]">
          {t.heroTitle || "STAY SAFE. GET HELP FAST."}
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl font-medium text-slate-300 max-w-2xl mb-10 leading-relaxed">
          {t.heroSub || "Know what to do when every second matters. Be prepared for any emergency with real-time response."}
        </p>

        <div className="flex flex-row items-center gap-3.5 w-full sm:w-auto mt-2">
          {/* User Guide Button */}
          <Link 
            to="/guide"
            className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm md:text-base tracking-wider uppercase px-5 sm:px-8 py-3.5 sm:py-4 min-h-[48px] rounded-full shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] transition-all outline-none flex items-center justify-center gap-2 text-center"
          >
            <span>{t.userGuide || "USER GUIDE"}</span>
            <span className="text-sm">→</span>
          </Link>

          {/* Download App Button */}
          <button 
            onClick={onOpenDownload}
            className="flex-1 sm:flex-none bg-slate-800/90 hover:bg-slate-700 text-white font-black text-xs sm:text-sm md:text-base tracking-wider uppercase px-5 sm:px-8 py-3.5 sm:py-4 min-h-[48px] rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all outline-none flex items-center justify-center gap-2 text-center border border-slate-700 hover:border-slate-600 cursor-pointer"
          >
            <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{t.navDownload || "DOWNLOAD APP"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
