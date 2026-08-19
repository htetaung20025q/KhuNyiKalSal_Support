export default function SecurityBadges({ t }) {
  return (
    <section className="bg-slate-900 py-12 px-4 md:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
        
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <span className="text-slate-400 text-sm font-medium tracking-wide">{t.secBadge1}</span>
        </div>

        {/* Separator */}
        <div className="hidden md:block w-1 h-1 rounded-full bg-slate-700"></div>

        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
          </svg>
          <span className="text-slate-400 text-sm font-medium tracking-wide">{t.secBadge2}</span>
        </div>

        {/* Separator */}
        <div className="hidden md:block w-1 h-1 rounded-full bg-slate-700"></div>

        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
          </svg>
          <span className="text-slate-400 text-sm font-medium tracking-wide">{t.secBadge3}</span>
        </div>

      </div>
    </section>
  );
}
