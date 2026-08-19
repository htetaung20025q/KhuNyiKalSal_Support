import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ lang, setLang, t, onOpenChat, onOpenRegistration }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 w-full border-b border-slate-100">
      <div className="w-full px-4 md:px-8 py-5 flex justify-between items-center">
        
        {/* Left: Logo */}
        <Link to="/" className="hover:opacity-80 transition-opacity flex justify-start">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="KHU NYI KAL SAL Logo" className="w-12 h-12 md:w-14 md:h-14 object-contain" />
            <div className="flex flex-col items-start justify-center">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-red-600 leading-tight">
                KHU NYI KAL SAL
              </span>
              <div className="flex items-center justify-start gap-1.5 mt-0.5">
                <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest text-red-600 leading-none">
                  24/7 EMERGENCY SERVICE
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Mobile Right: Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 -mr-2 outline-none flex items-center justify-center">
            {isMenuOpen ? (
              <svg className="w-8 h-8 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-red-600">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="7" y1="8" x2="17" y2="8"></line>
                <line x1="7" y1="12" x2="14" y2="12"></line>
                <line x1="7" y1="16" x2="17" y2="16"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Right */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          
          {/* About Us Link */}
          <Link 
            to="/about" 
            className="text-base font-bold text-slate-800 hover:text-red-600 transition-colors py-2"
          >
            {t.aboutUs || "ကျွန်ုပ်တို့အကြောင်း (About Us)"}
          </Link>



          {/* Language Toggle */}
          <div className="flex items-center text-base py-2">
            <span 
              onClick={() => setLang('en')}
              className={`cursor-pointer transition-colors ${lang === 'en' ? 'text-red-600 font-bold' : 'text-slate-400 font-medium hover:text-slate-600'}`}
            >
              EN
            </span>
            <span className="text-gray-300 mx-3 select-none">/</span>
            <span 
              onClick={() => setLang('mm')}
              className={`cursor-pointer transition-colors ${lang === 'mm' ? 'text-red-600 font-bold' : 'text-slate-400 font-medium hover:text-slate-600'}`}
            >
              MM
            </span>
          </div>
        </nav>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-md flex flex-col p-4 gap-4 h-auto z-40">
          <div className="flex flex-col border-b border-slate-200 pb-4">
            <Link 
              to="/about" 
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-left py-2 mb-1 text-sm font-semibold text-slate-800 hover:text-red-600 transition-colors outline-none"
            >
              {t.aboutUs || "ကျွန်ုပ်တို့အကြောင်း (About Us)"}
            </Link>
          </div>
          


          <div className="flex items-center gap-2">
            <div className="text-xs uppercase text-slate-500 font-bold mr-2">Language:</div>
            <div className="flex items-center text-sm">
              <span 
                onClick={() => { setLang('en'); setIsMenuOpen(false); }}
                className={`cursor-pointer transition-colors ${lang === 'en' ? 'text-red-600 font-bold' : 'text-slate-400 font-medium hover:text-slate-600'}`}
              >
                EN
              </span>
              <span className="text-gray-300 mx-2 select-none">/</span>
              <span 
                onClick={() => { setLang('mm'); setIsMenuOpen(false); }}
                className={`cursor-pointer transition-colors ${lang === 'mm' ? 'text-red-600 font-bold' : 'text-slate-400 font-medium hover:text-slate-600'}`}
              >
                MM
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
