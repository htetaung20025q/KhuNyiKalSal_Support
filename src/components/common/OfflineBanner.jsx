import { useState, useEffect } from 'react';

export default function OfflineBanner({ t }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('emergencyGuideSaved') === 'true') {
      setIsSaved(true);
    }
  }, []);

  const handleSaveOffline = () => {
    localStorage.setItem('emergencyGuideSaved', 'true');
    // Save relevant emergency text to LocalStorage
    localStorage.setItem('emergencyGuideContent', JSON.stringify({
      step1Title: t.step1Title,
      step1Desc: t.step1Desc,
      step2Title: t.step2Title,
      step2Desc: t.step2Desc,
      step3Title: t.step3Title,
      step3Desc: t.step3Desc,
      step4Title: t.step4Title,
      step4Desc: t.step4Desc,
      tipsTitle: t.tipsTitle,
      tip1: t.tip1,
      tip2: t.tip2,
      tip3: t.tip3,
      tip4: t.tip4
    }));
    setIsSaved(true);
    alert('Emergency Guide saved for offline access!');
  };

  return (
    <section className="bg-slate-100 py-12 px-4 md:px-8 border-b border-slate-200">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 uppercase tracking-wide">
            {t.offlineAvailable}
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            {t.offlineDesc}
          </p>
        </div>
        <button 
          onClick={handleSaveOffline}
          disabled={isSaved}
          className={`font-bold text-sm uppercase px-6 py-3 rounded-md shadow-md transition-colors outline-none shrink-0 ${isSaved ? 'bg-green-600 text-white cursor-default' : 'bg-slate-800 hover:bg-slate-900 text-white'}`}
        >
          {isSaved ? (t.savedOffline || 'အော့ဖ်လိုင်းအဖြစ် သိမ်းဆည်းပြီး') : t.saveOffline}
        </button>
      </div>
    </section>
  );
}
