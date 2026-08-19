import { useState } from 'react';
import SOSModal from '@/components/modals/SOSModal';


export default function FloatingCallButton({ t }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        title="Emergency SOS"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-red-600/30 outline-none px-6 py-4 gap-3 hover:scale-105 active:scale-95 transition-transform border-2 border-white ring-4 ring-slate-50 group cursor-pointer"
      >
        <span className="font-black text-xl tracking-widest uppercase">SOS</span>
        <svg className="w-6 h-6 animate-pulse group-hover:animate-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>
      </button>

      <SOSModal t={t} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
