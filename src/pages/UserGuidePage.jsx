import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IPhone14Mockup } from '@/components/common';

import pic1Register from '@/assets/images/screenshots/ug_pic1_register.jpg';
import pic2Login from '@/assets/images/screenshots/ug_pic2_login.jpg';
import pic3Home from '@/assets/images/screenshots/ug_pic3_home.jpg';
import pic4Org from '@/assets/images/screenshots/ug_pic4_org.jpg';
import pic5Family from '@/assets/images/screenshots/ug_pic5_family.jpg';
import pic6SosHold from '@/assets/images/screenshots/ug_pic6_sos_hold.jpg';
import pic7SosType from '@/assets/images/screenshots/ug_pic7_sos_type.jpg';
import pic8Settings from '@/assets/images/screenshots/ug_pic8_settings.jpg';
import pic9BloodDonation from '@/assets/images/screenshots/ug_pic9_blood_donation.jpg';

export default function UserGuidePage({ t, lang }) {
  const isMm = lang === 'mm';

  const topics = [
    {
      id: 'pic1_register',
      stepNumber: '01',
      category: isMm ? "အကောင့်သစ်ဖွင့်ခြင်း" : "Registration",
      title: isMm ? "ကူညီကယ်ဆယ်တွင် အကောင့်သစ်ဖွင့်ခြင်း (Register)" : "Create Your Account (Register)",
      content: isMm 
        ? "အရေးပေါ်အကူအညီများ အလျင်အမြန်ရရှိနိုင်ရန် သင့်အမည်၊ အီးမေးလ်၊ လျှို့ဝှက်နံပါတ်၊ ဖုန်းနံပါတ်၊ သွေးအမျိုးအစားနှင့် ကျန်းမာရေးမှတ်တမ်းများကို ဖြည့်သွင်းပြီး အကောင့်ဖွင့်ပါ။"
        : "Create your emergency account by providing your Full Name, Email, Password, Phone Number, Blood Type, and medical conditions.",
      tip: isMm 
        ? "အကြံပြုချက်: သွေးအမျိုးအစားကို မှန်ကန်စွာ ဖြည့်သွင်းပါ။" 
        : "Tip: Fill in your correct blood type for rapid medical response.",
      imgUrl: pic1Register
    },
    {
      id: 'pic2_login',
      stepNumber: '02',
      category: isMm ? "အကောင့်ဝင်ရောက်ခြင်း" : "Authentication",
      title: isMm ? "အကောင့်သို့ လုံခြုံစွာ ဝင်ရောက်ခြင်း (Login)" : "Sign In to Khu Nyi Kal Sal (Login)",
      content: isMm 
        ? "မှတ်ပုံတင်ထားသော အီးမေးလ်နှင့် လျှို့ဝှက်နံပါတ်ဖြင့် အကောင့်သို့ လုံခြုံစွာ ဝင်ရောက်ပြီး ၂၄/၇ အရေးပေါ် ကယ်ဆယ်ရေးဝန်ဆောင်မှုများကို စတင်အသုံးပြုပါ။"
        : "Log in with your registered credentials to access 24/7 emergency response features and contacts.",
      tip: isMm 
        ? "အကြံပြုချက်: Forgot Password မှတစ်ဆင့် ပြန်လည်ရယူနိုင်ပါသည်။" 
        : "Tip: Use Forgot Password to recover your account safely.",
      imgUrl: pic2Login
    },
    {
      id: 'pic3_home',
      stepNumber: '03',
      category: isMm ? "ပင်မစာမျက်နှာနှင့် မြေပုံ" : "Live Radar Map",
      title: isMm ? "မြေပုံ အစမ်းကြည့်ရှုခြင်းနှင့် အမြန်လုပ်ဆောင်ချက်များ" : "Live Radar Map & Quick Actions",
      content: isMm 
        ? "အနီးနားရှိ ကယ်ဆယ်ရေးစခန်းများကို မြေပုံပေါ်တွင် ကြည့်ရှုနိုင်ပြီး မြေပုံဖွင့်ရန်၊ ကယ်ဆယ်ရေးအဖွဲ့များ၊ မိသားစုအဖွဲ့၊ သွေးလှူဒါန်းရန်နှင့် အရေးပေါ် SOS ခလုတ်ကြီးကို အသုံးပြုနိုင်ပါသည်။"
        : "View nearby rescue checkpoints on the live radar, access quick shortcuts, or trigger the central SOS alert.",
      tip: isMm 
        ? "အကြံပြုချက်: တည်နေရာ (GPS) ကို အမြဲ ဖွင့်ထားပေးပါ။" 
        : "Tip: Keep GPS enabled to see nearest rescue checkpoints.",
      imgUrl: pic3Home
    },
    {
      id: 'pic4_org',
      stepNumber: '04',
      category: isMm ? "ကယ်ဆယ်ရေးအဖွဲ့များ" : "Rescue Directory",
      title: isMm ? "ကယ်ဆယ်ရေးအဖွဲ့အစည်းများ ရှာဖွေဆက်သွယ်ခြင်း" : "Rescue Organizations Directory",
      content: isMm 
        ? "အနီးအနားရှိ အတည်ပြုပြီး ကယ်ဆယ်ရေးအဖွဲ့အစည်းများကို အကွာအဝေးနှင့် လွှမ်းခြုံဧရိယာအလိုက် ရှာဖွေပြီး ဖုန်းတိုက်ရိုက်ခေါ်ဆိုနိုင်သလို မြေပုံလမ်းညွှန်ကိုလည်း ရယူနိုင်ပါသည်။"
        : "Browse verified local rescue teams by distance and directly initiate calls or navigate to stations.",
      tip: isMm 
        ? "အကြံပြုချက်: ဖုန်းခေါ်ဆိုရန် ခလုတ်ဖြင့် တိုက်ရိုက်ခေါ်ဆိုနိုင်ပါသည်။" 
        : "Tip: Tap call icon to dial rescue dispatchers directly.",
      imgUrl: pic4Org
    },
    {
      id: 'pic5_family',
      stepNumber: '05',
      category: isMm ? "မိသားစု အဖွဲ့" : "Family Safety",
      title: isMm ? "မိသားစု အဖွဲ့ ဖန်တီးချိတ်ဆက်ခြင်း" : "Family Emergency Safety Group",
      content: isMm 
        ? "အရေးပေါ်အခြေအနေများတွင် မိသားစုဝင်များအချင်းချင်း အချိန်နှင့်တပြေးညီ SOS သတိပေးချက်များကို ချက်ချင်းလက်ခံရရှိနိုင်ရန် မိသားစုအဖွဲ့အသစ် ဖန်တီးပါ။"
        : "Create a dedicated family group to instantly broadcast and receive real-time SOS alerts among family members.",
      tip: isMm 
        ? "အကြံပြုချက်: Invite Code ဖြင့် အလွယ်တကူ ချိတ်ဆက်နိုင်ပါသည်။" 
        : "Tip: Share your group invite code with family members.",
      imgUrl: pic5Family
    },
    {
      id: 'pic6_sos_hold',
      stepNumber: '06',
      category: isMm ? "အရေးပေါ် SOS ခေါ်ဆိုခြင်း" : "SOS Trigger",
      title: isMm ? "အရေးပေါ် SOS ခေါ်ဆိုရန် (၃) စက္ကန့်ကြာ ဖိထားပါ" : "Hold for 3 Seconds to Trigger SOS",
      content: isMm 
        ? "မတော်တဆ မှားယွင်းနှိပ်မိခြင်းမှ ကာကွယ်ရန် ပင်မစာမျက်နှာ အောက်ခြေရှိ SOS ခလုတ်နီကြီးကို (၃) စက္ကန့်ကြာ ဖိထားပါ။ ကောင်တာပြည့်သွားပါက အရေးပေါ် အကူအညီတောင်းခံခြင်း စတင်ပါမည်။"
        : "Press and hold the central red SOS button for 3 seconds to activate an emergency alert without accidental triggers.",
      tip: isMm 
        ? "အကြံပြုချက်: ၃ စက္ကန့် မပြည့်မီ လက်လွှတ်လိုက်ပါက ပယ်ဖျက်သွားပါမည်။" 
        : "Tip: Release before 3 seconds to cancel the countdown.",
      imgUrl: pic6SosHold
    },
    {
      id: 'pic7_sos_type',
      stepNumber: '07',
      category: isMm ? "အရေးပေါ် အမျိုးအစား" : "Emergency Category",
      title: isMm ? "အရေးပေါ် အခြေအနေ အမျိုးအစား ရွေးချယ်ခြင်း" : "Choose Your Emergency Type",
      content: isMm 
        ? "မိမိကြုံတွေ့နေရသော အရေးပေါ်အခြေအနေနှင့် ကိုက်ညီသည့် အမျိုးအစား (မီးဘေး၊ ဆေးဘက်ဆိုင်ရာ၊ ယာဉ်မတော်တဆ သို့မဟုတ် သဘာဝဘေး) ကို ရွေးချယ်၍ သက်ဆိုင်ရာ ကယ်ဆယ်ရေးအဖွဲ့များထံ ချက်ချင်း ပေးပို့ပါ။"
        : "Select the specific emergency category (Fire, Medical, Accident, or Natural Disaster) for targeted response.",
      tip: isMm 
        ? "အကြံပြုချက်: မှန်ကန်သော အမျိုးအစားရွေးချယ်ခြင်းဖြင့် အမြန်ဆုံး အကူအညီရရှိမည်။" 
        : "Tip: Select the exact type so appropriate units respond.",
      imgUrl: pic7SosType
    },
    {
      id: 'pic8_settings',
      stepNumber: '08',
      category: isMm ? "ပိုမိုသိရှိရန်နှင့် ဆက်တင်များ" : "More & Settings",
      title: isMm ? "ကိုယ်ရေးအချက်အလက်နှင့် ဝန်ဆောင်မှုစုံ ပင်မစာမျက်နှာ" : "Profile, Settings & All Services",
      content: isMm 
        ? "မိမိ၏ အကောင့်အချက်အလက်များ၊ သွေးအမျိုးအစား၊ ဖုန်းနံပါတ်နှင့် ဆက်တင်များကို စီမံနိုင်ပြီး ရှေးဦးသူနာပြုစုနည်း၊ ကယ်ဆယ်ရေးအဖွဲ့များ၊ မိသားစုအဖွဲ့နှင့် သတိပေးချက်မှတ်တမ်းများကို တစ်နေရာတည်းတွင် ဝင်ရောက်ကြည့်ရှုနိုင်ပါသည်။"
        : "Manage your profile, blood type, offline First Aid guides, family groups, and notification history all in one place.",
      tip: isMm 
        ? "အကြံပြုချက်: ရှေးဦးသူနာပြုစုနည်း (First Aid) ကို အော့ဖ်လိုင်း လေ့လာနိုင်ပါသည်။" 
        : "Tip: Offline First Aid guides are accessible here anytime.",
      imgUrl: pic8Settings
    },
    {
      id: 'pic9_blood_donation',
      stepNumber: '09',
      category: isMm ? "သွေးလှူဒါန်းခြင်း ဗဟိုဌာန" : "Blood Donation Hub",
      title: isMm ? "သွေးလှူဒါန်းခြင်းနှင့် အရေးပေါ် သွေးတောင်းခံခြင်း" : "Blood Donation & Emergency Requests",
      content: isMm 
        ? "သွေးလှူရှင်အဖြစ် မိမိ၏ သွေးအမျိုးအစား၊ ဆေးမှတ်တမ်းများ ဖြည့်သွင်း၍ စာရင်းပေးသွင်းနိုင်သလို အရေးပေါ် သွေးလိုအပ်သည့်အခါ သွေးတောင်းခံခြင်းနှင့် လှူဒါန်းမှု မှတ်တမ်းများကိုလည်း လွယ်ကူစွာ စီမံနိုင်ပါသည်။"
        : "Register as a volunteer donor, submit urgent blood requests during emergencies, and track donation records.",
      tip: isMm 
        ? "အကြံပြုချက်: အနီးဆုံး ဆေးရုံ/သွေးလှူဘဏ်များကို အလိုအလျောက် ချိတ်ဆက်ပေးပါသည်။" 
        : "Tip: Connects directly with nearby hospitals and blood banks.",
      imgUrl: pic9BloodDonation
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);
  const isManualScrolling = useRef(false);

  // Preload all screenshot images in background for instant zero-lag switching
  useEffect(() => {
    topics.forEach((topic) => {
      const img = new Image();
      img.src = topic.imgUrl;
    });
  }, []);

  // Desktop/Laptop scroll tracking: Detect which step card is in reading area
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrolling.current) return;
      if (window.innerWidth < 1024) return;

      const triggerY = window.innerHeight * 0.38;
      let closestIdx = 0;
      let minDistance = Infinity;

      stepRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height * 0.35;
        const dist = Math.abs(cardCenter - triggerY);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStep = (idx) => {
    setActiveIndex(idx);
    isManualScrolling.current = true;
    if (stepRefs.current[idx]) {
      stepRefs.current[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      isManualScrolling.current = false;
    }, 700);
  };

  const handleNext = () => {
    if (activeIndex < topics.length - 1) {
      if (window.innerWidth >= 1024) {
        scrollToStep(activeIndex + 1);
      } else {
        setActiveIndex((prev) => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      if (window.innerWidth >= 1024) {
        scrollToStep(activeIndex - 1);
      } else {
        setActiveIndex((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased text-slate-800 flex flex-col">
      
      {/* Top Sticky Header Bar with Back Button and Quick Jump Navigator */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2">
          
          {/* Back to Home Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-full font-bold text-xs sm:text-sm transition-all border border-slate-200 hover:border-red-200 group shrink-0"
          >
            <svg 
              className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>{isMm ? "ပင်မစာမျက်နှာ" : "Back"}</span>
          </Link>

          {/* Quick Step Jump Pills (Clean No-Scrollbar Container) */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar hide-scrollbar py-0.5 px-1.5 bg-slate-100/90 rounded-full border border-slate-200">
            {topics.map((topic, idx) => (
              <button
                key={topic.id}
                onClick={() => {
                  if (window.innerWidth >= 1024) {
                    scrollToStep(idx);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-black transition-all shrink-0 ${
                  activeIndex === idx 
                    ? 'bg-red-600 text-white shadow-xs scale-105' 
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                }`}
                title={topic.title}
              >
                {topic.stepNumber}
              </button>
            ))}
          </div>

          {/* Step Counter Badge */}
          <div className="flex items-center text-[11px] sm:text-xs font-bold text-slate-500 shrink-0">
            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-md font-extrabold">
              {topics[activeIndex].stepNumber}/09
            </span>
          </div>

        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* MOBILE VIEW (< 1024px): 100% Screen-Fit, No-Scroll   */}
      {/* ---------------------------------------------------- */}
      <div className="lg:hidden flex-1 flex flex-col justify-between p-3 h-[calc(100dvh-54px)] max-h-[calc(100dvh-54px)] overflow-hidden w-full max-w-md mx-auto">
        
        {/* Slightly Bigger Mobile Phone Mockup (Fit to screen) */}
        <div className="flex-1 min-h-0 flex items-center justify-center py-1 relative">
          {/* Subtle Glow Backdrop */}
          <div className="absolute -inset-2 bg-gradient-to-r from-red-500/15 to-blue-500/15 rounded-[2.5rem] blur-md pointer-events-none"></div>

          <div className="h-full max-h-[49dvh] aspect-[9/19.5] relative mx-auto">
            <IPhone14Mockup 
              className="w-full h-full shadow-lg" 
              showDynamicIsland={false}
              showHomeIndicator={false}
            >
              <div className="w-full h-full relative bg-black">
                <img 
                  key={topics[activeIndex].id}
                  src={topics[activeIndex].imgUrl} 
                  alt={topics[activeIndex].title} 
                  loading="eager"
                  className="w-full h-full object-cover object-top select-none pointer-events-none transition-opacity duration-150"
                />
              </div>
            </IPhone14Mockup>
          </div>
        </div>

        {/* Compact Screen-Fit Step Card */}
        <div className="w-full bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 shrink-0">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
              {topics[activeIndex].category}
            </span>
            <span className="text-[10px] font-extrabold text-slate-400">
              Step {topics[activeIndex].stepNumber} of 09
            </span>
          </div>

          <h3 className="text-sm font-black text-slate-900 mb-1 leading-tight line-clamp-1">
            {topics[activeIndex].title}
          </h3>

          <p className="text-slate-600 text-xs leading-snug mb-2 line-clamp-2">
            {topics[activeIndex].content}
          </p>

          {/* Navigation Prev / Next Buttons */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 border transition-all ${
                activeIndex === 0 
                  ? 'opacity-35 bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs active:scale-95'
              }`}
            >
              ← {isMm ? "ရှေ့အဆင့်" : "Prev"}
            </button>

            <button
              onClick={handleNext}
              disabled={activeIndex === topics.length - 1}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all ${
                activeIndex === topics.length - 1 
                  ? 'opacity-35 bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-xs active:scale-95'
              }`}
            >
              {isMm ? "နောက်အဆင့်" : "Next"} →
            </button>
          </div>
        </div>

      </div>

      {/* ---------------------------------------------------- */}
      {/* LAPTOP & DESKTOP VIEW (>= 1024px)                     */}
      {/* ---------------------------------------------------- */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6 lg:px-8 py-12 flex-1 w-full">
        
        {/* Desktop Page Hero Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3.5 py-1.5 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            {isMm ? "အသုံးပြုပုံ အဆင့်ဆင့် လမ်းညွှန်" : "Step-by-Step User Guide"}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mt-3 mb-3 tracking-tight">
            {isMm ? "ကူညီကယ်ဆယ် အက်ပ်အသုံးပြုနည်း" : "How to Use Khu Nyi Kal Sal"}
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            {isMm 
              ? "မှတ်ပုံတင်ခြင်းမှစ၍ မြေပုံကြည့်ရှုခြင်း၊ အရေးပေါ် SOS ခေါ်ဆိုခြင်း၊ ကယ်ဆယ်ရေးအဖွဲ့များ၊ မိသားစုအဖွဲ့နှင့် သွေးလှူဒါန်းခြင်း ဝန်ဆောင်မှုများအထိ အသေးစိတ် လေ့လာပါ"
              : "Learn how to register, explore live rescue maps, activate SOS alerts, connect with response organizations, protect your family, and access blood donation services."}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8 xl:gap-12 relative items-start">
          
          {/* Left Column: Interactive Scrolling Topic Cards (7 cols) */}
          <div className="col-span-7 flex flex-col space-y-12 pb-32 pt-4">
            {topics.map((topic, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={topic.id}
                  ref={(el) => (stepRefs.current[idx] = el)}
                  onClick={() => scrollToStep(idx)}
                  className={`p-8 rounded-3xl transition-all duration-300 cursor-pointer border-2 relative ${
                    isActive 
                      ? 'bg-white shadow-xl border-red-500 ring-4 ring-red-500/10 scale-[1.01]' 
                      : 'bg-white/60 hover:bg-white shadow-sm border-slate-200/80 hover:border-slate-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* Active Indicator Left Accent Bar */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeLeftBar"
                      className="absolute -left-1 top-8 bottom-8 w-2 bg-red-600 rounded-full"
                    />
                  )}

                  {/* Step Header */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-black px-3 py-1.5 rounded-lg transition-colors ${
                        isActive ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {topic.stepNumber}
                      </span>
                      <span className={`text-xs font-black uppercase tracking-wider transition-colors ${
                        isActive ? 'text-red-600' : 'text-slate-400'
                      }`}>
                        {topic.category}
                      </span>
                    </div>

                    {isActive && (
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                        {isMm ? "လက်ရှိ အဆင့်" : "Active Screen"}
                      </span>
                    )}
                  </div>

                  {/* Topic Title */}
                  <h2 className={`text-xl xl:text-2xl font-black mb-3 transition-colors ${
                    isActive ? 'text-slate-900' : 'text-slate-700'
                  }`}>
                    {topic.title}
                  </h2>

                  {/* Topic Content */}
                  <p className={`text-base leading-relaxed mb-5 transition-colors ${
                    isActive ? 'text-slate-700' : 'text-slate-500'
                  }`}>
                    {topic.content}
                  </p>

                  {/* Quick Tip Box */}
                  {topic.tip && (
                    <div className={`p-3.5 rounded-xl text-xs font-medium flex items-start gap-2.5 transition-colors ${
                      isActive 
                        ? 'bg-amber-50 border border-amber-200 text-amber-900' 
                        : 'bg-slate-100 border border-slate-200 text-slate-600'
                    }`}>
                      <span className="text-base shrink-0">💡</span>
                      <span className="leading-relaxed">{topic.tip}</span>
                    </div>
                  )}

                  {/* Bottom Action Hint */}
                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-400">
                      {isMm ? "ဖုန်းမျက်နှာပြင်တွင် စမ်းသပ်ကြည့်ရှုပါ" : "Simulated in live phone mockup"}
                    </span>
                    {idx < topics.length - 1 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToStep(idx + 1);
                        }}
                        className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group"
                      >
                        <span>{isMm ? "နောက်အဆင့်သို့" : "Next Step"}</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs font-bold text-slate-600 hover:text-red-600 flex items-center gap-1"
                      >
                        <span>{isMm ? "ထိပ်ဆုံးသို့ ပြန်သွားရန်" : "Back to Top"}</span>
                        <span>↑</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Rock-Solid Fixed/Sticky iPhone 14 Simulator (5 cols) */}
          <div className="col-span-5 sticky top-24 self-start flex flex-col items-center justify-start z-30 pt-1">
            
            {/* Ambient Background Glow Effect */}
            <div className="absolute w-72 h-72 bg-red-500/15 rounded-full blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

            {/* Screen Header Badge */}
            <div className="mb-2.5 px-3.5 py-1 bg-white/95 backdrop-blur-md rounded-full border border-slate-200 shadow-xs flex items-center gap-2 text-xs font-bold text-slate-700 z-10">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Step {topics[activeIndex].stepNumber}: {topics[activeIndex].category}</span>
            </div>

            {/* iPhone 14 Pro Max Simulator Frame - Perfectly Scaled & Sticky */}
            <div className="relative w-[265px] xl:w-[285px] aspect-[9/19.5] max-h-[calc(100vh-8.5rem)] shadow-2xl z-10">
              <IPhone14Mockup 
                className="w-full h-full" 
                showDynamicIsland={false}
                showHomeIndicator={false}
              >
                <div className="w-full h-full relative bg-black select-none">
                  <img 
                    key={topics[activeIndex].id}
                    src={topics[activeIndex].imgUrl} 
                    alt={topics[activeIndex].title} 
                    loading="eager"
                    className="w-full h-full object-cover object-top select-none pointer-events-none transition-opacity duration-150"
                  />
                </div>
              </IPhone14Mockup>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
