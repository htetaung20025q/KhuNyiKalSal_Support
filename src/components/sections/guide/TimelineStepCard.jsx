import React, { useState } from 'react';

export default function TimelineStepCard({
  stepNumber = "01",
  title = "Step Title",
  description = "This is a detailed description of the timeline step.",
  imageUrl = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop"
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-8 w-full">
        
        {/* Left Section (Content) */}
        <div className="flex-1 w-full text-center md:text-left flex flex-col items-center md:items-start">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mb-4">
            {stepNumber}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            {title}
          </h3>
          <p className="text-slate-500 text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Right Section (Image Box) - Significantly larger with aspect ratio */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="w-40 md:w-48 aspect-[9/16] flex-shrink-0 rounded-xl border border-slate-200 overflow-hidden relative cursor-pointer group shadow-sm"
        >
          {/* Main Mockup Image */}
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Hover Overlay indicating clickability */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center">
             <div className="opacity-0 group-hover:opacity-100 bg-white/95 p-3 rounded-full shadow-xl transition-opacity duration-300 transform scale-95 group-hover:scale-100">
               {/* Zoom In Icon */}
               <svg className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
               </svg>
             </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal (Lightbox) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 p-4 md:p-12 backdrop-blur-sm transition-opacity"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close Button */}
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50 focus:outline-none"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Image Container */}
          <div 
            className="relative max-h-full max-w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()} /* Prevents click from closing modal if clicking directly on the image */
          >
            <img 
              src={imageUrl} 
              alt={`${title} fullscreen`} 
              className="max-h-[85vh] md:max-h-[90vh] w-auto object-contain bg-black/50"
            />
          </div>
        </div>
      )}
    </>
  );
}
