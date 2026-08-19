export default function FirstAidModal({ t, isOpen, onClose }) {
  if (!isOpen) return null;

  const categories = [
    { title: t?.fa1Title, desc: t?.fa1Desc },
    { title: t?.fa2Title, desc: t?.fa2Desc },
    { title: t?.fa3Title, desc: t?.fa3Desc },
    { title: t?.fa4Title, desc: t?.fa4Desc },
    { title: t?.fa5Title, desc: t?.fa5Desc },
    { title: t?.fa6Title, desc: t?.fa6Desc },
    { title: t?.fa7Title, desc: t?.fa7Desc },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 flex items-center justify-center p-4 md:p-6 backdrop-blur-sm">
      <div className="bg-slate-50 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-red-600 text-white p-6 flex justify-between items-center shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-widest uppercase">{t?.firstAidTitle || "FIRST AID GUIDE"}</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-red-700/50 hover:bg-red-800 transition-colors flex items-center justify-center outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Body Area - Grid View */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white border-l-4 border-red-600 rounded-r-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-slate-900 font-bold text-lg mb-2">{cat.title}</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-200 p-4 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 transition-colors text-white px-8 py-2.5 font-bold outline-none rounded-lg uppercase tracking-wider text-sm shadow-sm"
          >
            {t?.closeBtn || "CLOSE"}
          </button>
        </div>

      </div>
    </div>
  );
}
