import React from 'react';

export default function IPhone14Mockup({ 
  children, 
  className = "", 
  showDynamicIsland = true,
  islandContent = null,
  showHomeIndicator = true,
  screenClassName = ""
}) {
  return (
    <div className={`relative mx-auto select-none pointer-events-auto ${className}`}>
      {/* External Chassis Frame with metallic shine & realistic bezel */}
      <div className="relative w-full h-full bg-[#1a1a1c] p-[9px] sm:p-[10px] rounded-[2.8rem] sm:rounded-[3.2rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-black/80 flex flex-col box-border">

        {/* Screen Display Border & Inner Glass */}
        <div className={`relative w-full h-full flex-1 bg-black rounded-[2.2rem] sm:rounded-[2.5rem] overflow-hidden flex flex-col ${screenClassName}`}>
          
          {/* Top Speaker Ear-piece Slit */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-900 rounded-full z-40"></div>

          {/* Dynamic Island (iPhone 14 Pro Max signature pill) */}
          {showDynamicIsland && (
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 pointer-events-none">
              {islandContent ? (
                islandContent
              ) : (
                <div className="w-[84px] h-[24px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-md border border-white/5">
                  {/* Camera lens with optical reflection */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#08080a] ring-1 ring-blue-950/60 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-900/40"></div>
                  </div>
                  {/* Proximity / ambient sensor */}
                  <div className="w-2 h-2 rounded-full bg-[#0d0d11]"></div>
                </div>
              )}
            </div>
          )}

          {/* Main Screen Content */}
          <div className="relative w-full h-full flex flex-col overflow-hidden">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          {showHomeIndicator && (
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/70 rounded-full z-40 pointer-events-none shadow-sm backdrop-blur-sm"></div>
          )}

        </div>
      </div>
    </div>
  );
}
