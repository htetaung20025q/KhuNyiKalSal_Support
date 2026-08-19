import React from 'react';

export default function StepBlock({ stepNumber, title, description, isLast, t, isActive, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`relative pl-10 md:pl-12 cursor-pointer transition-all duration-300 p-4 rounded-2xl ${
        isActive 
          ? 'bg-white shadow-md border border-red-100 scale-[1.01]' 
          : 'hover:bg-white/60 opacity-80 hover:opacity-100'
      } ${isLast ? '' : 'mb-6 md:mb-8'}`}
    >
      {/* Red Dot on the timeline perfectly aligned with the w-0.5 line at left-10 */}
      <div className={`absolute left-[2px] top-[24px] rounded-full z-10 ring-4 ring-white shadow-sm transition-all ${
        isActive 
          ? 'w-5 h-5 bg-red-600 ring-red-100 scale-110' 
          : 'w-4 h-4 bg-slate-300'
      }`}>
        {isActive && (
          <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-60"></span>
        )}
      </div>
      
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-xs font-black px-2.5 py-1 rounded-md tracking-widest transition-colors ${
            isActive 
              ? 'bg-red-600 text-white shadow-xs' 
              : 'text-slate-600 bg-slate-100'
          }`}>
            0{stepNumber}
          </span>
          <h3 className={`text-base md:text-lg font-black uppercase tracking-wide transition-colors ${
            isActive ? 'text-slate-900' : 'text-slate-700'
          }`}>
            {title}
          </h3>
        </div>
        <p className={`text-sm md:text-base leading-relaxed ml-1 transition-colors ${
          isActive ? 'text-slate-700' : 'text-slate-500'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
}
