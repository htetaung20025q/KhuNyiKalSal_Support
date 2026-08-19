import React, { useState, useEffect } from 'react';

export default function PrivacyConsentModal({ t }) {
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Check localStorage when component mounts
    const hasConsented = localStorage.getItem('hasAgreedToEmergencyTerms');
    if (!hasConsented) {
      setShowModal(true);
      
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem('hasAgreedToEmergencyTerms', 'true');
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 flex flex-col relative overflow-hidden animate-fade-in-up">
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-red-600"></div>
        
        <div className="flex items-start md:items-center gap-3 mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 text-red-600 rounded-full flex shrink-0 items-center justify-center border border-red-200 shadow-sm mt-1 md:mt-0">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-red-600 uppercase tracking-wide leading-snug">
            LEGAL WARNING / <br className="block md:hidden" /> ဥပဒေရေးရာ သတိပေးချက်
          </h2>
        </div>
        
        <div className="text-slate-700 mb-8 space-y-5 max-h-[50vh] overflow-y-auto pr-2">
          <p className="text-sm md:text-base leading-relaxed text-justify">
            <strong className="text-red-600 font-bold">WARNING:</strong> Creating false emergency alerts, making prank calls to rescue teams, or intentionally misusing the "Help & Rescue" platform to cause public panic is a serious offense. Offenders may be prosecuted under the Telecommunications Law and the Penal Code for public disturbance and the dissemination of false information and may face substantial fines and imprisonment. Please use this application only for genuine emergencies.
          </p>
          <div className="w-full h-px bg-slate-200"></div>
          <p className="text-sm md:text-base leading-relaxed text-justify font-mm">
            <strong className="text-red-600 font-bold">သတိပေးချက် -</strong> အရေးပေါ်အချက်ပေးမှု အတုများ ဖန်တီးခြင်း၊ ကယ်ဆယ်ရေးအဖွဲ့များထံ အလကား ဖုန်းခေါ်ဆိုခြင်း၊ သို့မဟုတ် အများပြည်သူ ထိတ်လန့်စေရန် 'ကူညီကယ်ဆယ်' ပလပ်ဖောင်းကို တမင်တကာ လွဲမှားစွာ အသုံးပြုခြင်းသည် ပြင်းထန်သော ပြစ်မှုဖြစ်သည်။ ကျူးလွန်သူများအား ဆက်သွယ်ရေးဥပဒေနှင့် ရာဇသတ်ကြီးဥပဒေတို့အရ အများပြည်သူအား နှောင့်ယှက်ခြင်းနှင့် သတင်းအမှားပေးပို့ခြင်းတို့အတွက် တရားစွဲဆိုမည်ဖြစ်ပြီး ကြီးလေးသော ဒဏ်ငွေနှင့် ထောင်ဒဏ်များ ချမှတ်နိုင်သည်။ ဤအက်ပ်ကို စစ်မှန်သော အရေးပေါ်အခြေအနေများအတွက်သာ အသုံးပြုပါ။
          </p>
        </div>

        <button 
          onClick={handleAgree}
          disabled={countdown > 0}
          className={`w-full font-bold py-4 rounded-xl shadow-md transition-all duration-300 text-lg flex items-center justify-center gap-2 ${
            countdown === 0
              ? 'bg-red-600 hover:bg-red-700 text-white opacity-100 cursor-pointer shadow-red-500/30'
              : 'bg-gray-600 text-gray-300 opacity-50 cursor-not-allowed shadow-none'
          }`}
        >
          I Agree <span className="font-sans font-semibold tracking-normal text-base">(သဘောတူပါသည်)</span>
          {countdown > 0 && <span className="tabular-nums">- {countdown}s</span>}
        </button>
      </div>
    </div>
  );
}
