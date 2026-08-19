import React from 'react';
import { IPhone14Mockup } from '@/components/common';

export default function PhoneMockup({ t }) {
  return (
    <div className="relative flex flex-col items-center">
      
      {/* Ambient Outer Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-red-600/15 via-blue-600/10 to-transparent rounded-[3.5rem] blur-2xl pointer-events-none"></div>

      {/* iPhone 14 Pro Max Frame */}
      <IPhone14Mockup 
        className="w-[280px] sm:w-[300px] md:w-[320px] aspect-[9/19.5] shadow-2xl relative z-10"
        showDynamicIsland={true}
        showHomeIndicator={true}
      >
        <div className="w-full h-full bg-slate-50 relative flex flex-col justify-between pt-7 pb-4 px-4 overflow-hidden select-none">
          
          {/* Subtle Map Grid Pattern */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none" 
            style={{
              backgroundImage: 'radial-gradient(#64748b 1.5px, transparent 1.5px)',
              backgroundSize: '18px 18px'
            }}
          ></div>

          {/* Status Bar */}
          <div className="w-full flex justify-between items-center px-2 pt-1 text-[10px] font-bold text-slate-800 relative z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="flex items-end gap-[1.5px] h-2.5">
                <div className="w-[2px] h-1 bg-slate-800 rounded-sm"></div>
                <div className="w-[2px] h-1.5 bg-slate-800 rounded-sm"></div>
                <div className="w-[2px] h-2 bg-slate-800 rounded-sm"></div>
                <div className="w-[2px] h-2.5 bg-slate-800 rounded-sm"></div>
              </div>
              <span className="text-[9px]">5G</span>
              <div className="w-5 h-2.5 border border-slate-800 rounded-[3px] p-[1px] flex items-center">
                <div className="w-full h-full bg-slate-800 rounded-[1px]"></div>
              </div>
            </div>
          </div>

          {/* App Header Bar */}
          <div className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-xs z-10 flex items-center justify-between border border-slate-200/60 mt-1">
            <span className="font-black text-red-600 text-[11px] tracking-wider">KHU NYI KAL SAL</span>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-200/60">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-bold">ONLINE</span>
            </div>
          </div>

          {/* Location Coordinates Card */}
          <div className="bg-white rounded-xl p-2.5 shadow-sm border border-slate-200/80 flex items-center gap-2.5 z-10">
            <div className="w-7 h-7 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 text-xs">
              📍
            </div>
            <div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Current Coordinates</div>
              <div className="text-[11px] font-bold text-slate-800 mt-0.5">16.7984° N, 96.1495° E</div>
            </div>
          </div>

          {/* Central Pulsing SOS Button */}
          <div className="flex-1 flex flex-col items-center justify-center py-2 relative z-10">
            <div className="w-36 h-36 rounded-full bg-red-100/60 flex items-center justify-center relative">
              {/* Radar pulse ring */}
              <div className="absolute inset-0 bg-red-600 rounded-full opacity-25 animate-ping" style={{ animationDuration: '2.5s' }}></div>
              
              {/* Central Core Button */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-red-500 shadow-xl shadow-red-600/40 flex flex-col items-center justify-center text-white font-black cursor-pointer hover:scale-105 transition-transform border-4 border-white ring-4 ring-red-500/30">
                <span className="text-3xl tracking-widest leading-none">SOS</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-red-100 mt-1">HOLD 3S</span>
              </div>
            </div>
          </div>

          {/* Responders Notification Card */}
          <div className="bg-slate-900 rounded-xl p-3 text-white shadow-md border border-slate-800 z-10">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Responders Notified</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1.5">
                <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px]">🚑</div>
                <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px]">🚒</div>
                <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px]">👮</div>
              </div>
              <div className="text-[10px] font-semibold text-slate-200">+12 nearby units</div>
            </div>
          </div>
          
        </div>
      </IPhone14Mockup>

    </div>
  );
}
