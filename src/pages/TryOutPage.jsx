import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IPhone14Mockup } from '@/components/common';

import homeScreen from '@/assets/images/screenshots/photo_6_2026-08-16_22-08-24.jpg';
import sosActiveScreen from '@/assets/images/screenshots/photo_2_2026-08-16_22-08-24.jpg';
import orgsScreen from '@/assets/images/screenshots/image copy.png';
import emergencyTypesScreen from '@/assets/images/screenshots/photo_4_2026-08-16_22-08-24.jpg';
import registerScreen from '@/assets/images/screenshots/photo_5_2026-08-16_22-08-24.jpg';

export default function TryOutPage() {
  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'orgs' | 'types' | 'register'
  const [isSosActive, setIsSosActive] = useState(false);
  const [sosTimer, setSosTimer] = useState(0);

  const handleTriggerSos = () => {
    setIsSosActive(true);
  };

  const handleCancelSos = () => {
    setIsSosActive(false);
  };

  // Determine active picture based on state
  const getActiveImage = () => {
    if (isSosActive) return sosActiveScreen;
    switch (currentTab) {
      case 'orgs':
        return orgsScreen;
      case 'types':
        return emergencyTypesScreen;
      case 'register':
        return registerScreen;
      default:
        return homeScreen;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Disclaimer Banner */}
      <div className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-bold text-center py-3.5 px-4 shadow-lg z-50 sticky top-0 text-sm tracking-tight flex items-center justify-center gap-2">
        <span className="text-base">⚠️</span>
        <span>
          သတိပြုရန်: ဤနေရာသည် အက်ပ်အသုံးပြုပုံကို စမ်းသပ်လေ့လာရန် (Interactive Demo) သက်သက်သာဖြစ်ပြီး၊ တကယ့်အရေးပေါ်အခြေအနေတွင် အလုပ်လုပ်မည်မဟုတ်ပါ။
        </span>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 relative">
        
        {/* Ambient Glow Background Effect */}
        <div className="absolute w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none -top-20"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -bottom-20"></div>

        {/* Header / Navigation Controls */}
        <div className="w-full max-w-5xl flex justify-between items-center mb-6 z-10">
          <Link 
            to="/" 
            className="px-5 py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white rounded-full font-semibold transition-all shadow-md flex items-center gap-2 text-sm hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          {/* Quick Demo Navigation Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-full border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => { setCurrentTab('home'); setIsSosActive(false); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${currentTab === 'home' && !isSosActive ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentTab('orgs'); setIsSosActive(false); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${currentTab === 'orgs' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Rescue Orgs
            </button>
            <button
              onClick={() => { setCurrentTab('types'); setIsSosActive(false); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${currentTab === 'types' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Emergency Types
            </button>
            <button
              onClick={() => { setCurrentTab('register'); setIsSosActive(false); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${currentTab === 'register' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Join / Register
            </button>
          </div>
        </div>

        {/* iPhone 14 Pro Max Simulator Frame */}
        <div className="relative flex flex-col items-center">
          
          <IPhone14Mockup 
            className="w-[330px] md:w-[350px] aspect-[9/19.5] h-[720px]"
            showDynamicIsland={false}
            showHomeIndicator={true}
          >
            {/* Screen View */}
            <div className="w-full h-full relative overflow-hidden bg-black flex flex-col">
              
              {/* App Screen Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={getActiveImage()}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full relative"
                >
                  <img 
                    src={getActiveImage()} 
                    alt="iPhone 14 Pro Max Screen" 
                    className="w-full h-full object-cover object-top select-none"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Island Overlay for SOS state */}
              {isSosActive && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-[240px] animate-in zoom-in-95 fade-in duration-300">
                  <div className="bg-black/95 border border-red-500/40 text-white rounded-full py-1.5 px-4 shadow-2xl flex items-center justify-between backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                      <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">SOS Alerting</span>
                    </div>
                    <button 
                      onClick={handleCancelSos}
                      className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-0.5 rounded-full font-bold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Interactive SOS Hotspot (When on Home screen) */}
              {!isSosActive && currentTab === 'home' && (
                <button
                  onClick={handleTriggerSos}
                  title="Click to activate SOS"
                  className="absolute bottom-[28px] left-1/2 -translate-x-1/2 w-[72px] h-[72px] rounded-full cursor-pointer z-30 opacity-0 hover:opacity-20 bg-red-500 transition-opacity focus:outline-none ring-4 ring-red-400"
                  aria-label="Trigger SOS in simulator"
                ></button>
              )}

              {/* Bottom Interactive Navigation Hotspots */}
              <div className="absolute bottom-0 left-0 right-0 h-[65px] z-20 flex justify-around items-center opacity-0 pointer-events-auto">
                <button 
                  onClick={() => { setCurrentTab('home'); setIsSosActive(false); }} 
                  className="flex-1 h-full cursor-pointer" 
                  aria-label="Home Tab"
                />
                <button 
                  onClick={() => { setCurrentTab('orgs'); setIsSosActive(false); }} 
                  className="flex-1 h-full cursor-pointer" 
                  aria-label="Organizations Tab"
                />
                <button 
                  onClick={() => { setIsSosActive(!isSosActive); }} 
                  className="flex-1 h-full cursor-pointer" 
                  aria-label="SOS Button"
                />
                <button 
                  onClick={() => { setCurrentTab('types'); setIsSosActive(false); }} 
                  className="flex-1 h-full cursor-pointer" 
                  aria-label="Alerts Tab"
                />
                <button 
                  onClick={() => { setCurrentTab('register'); setIsSosActive(false); }} 
                  className="flex-1 h-full cursor-pointer" 
                  aria-label="Register Tab"
                />
              </div>

            </div>
          </IPhone14Mockup>

          {/* Interactive Hint Callout */}
          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-400 text-xs px-4 py-2 rounded-full shadow-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Tip: Click on the central <strong>SOS</strong> button or top tabs to interact with the iPhone 14 Pro Max screen.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
