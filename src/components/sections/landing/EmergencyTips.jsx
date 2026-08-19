export default function EmergencyTips({ t }) {
  const tips = [
    { text: t.tip1, icon: "M13 10V3L4 14h7v7l9-11h-7z" }, // Lightning bolt
    { text: t.tip2, icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }, // Location marker
    { text: t.tip3, icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }, // Users
    { text: t.tip4, icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" } // Heart
  ];

  return (
    <section className="bg-slate-50 py-12 md:py-16 px-4 md:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-8 text-center uppercase tracking-widest">
          {t.tipsTitle}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {tips.map((tip, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tip.icon}></path>
                  {idx === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>}
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-700 leading-snug pt-1">
                {tip.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
