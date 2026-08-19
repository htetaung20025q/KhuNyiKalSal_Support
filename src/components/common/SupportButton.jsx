import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SupportModal from '@/components/modals/SupportModal';

export default function SupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isGuidePage = location.pathname === '/guide';

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`${isGuidePage ? 'hidden lg:flex' : 'flex'} fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 md:py-4 md:px-8 rounded-full shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 transform hover:scale-105 transition-all duration-300`}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        <span className="hidden md:block text-lg">Support Khu Nyi Kal Sal</span>
        <span className="md:hidden text-xs">Support Us</span>
      </button>

      <SupportModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
