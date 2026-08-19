export default function UseCases({ t }) {
  return (
    <section className="bg-white py-16 px-4 md:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12 text-center">
          {t.useCasesTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 flex flex-col items-center text-center">
            <svg className="w-12 h-12 text-red-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
            </svg>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{t.uc1Title}</h3>
            <p className="text-slate-600 font-medium">{t.uc1Desc}</p>
          </div>

          <div className="p-8 flex flex-col items-center text-center">
            <svg className="w-12 h-12 text-red-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{t.uc2Title}</h3>
            <p className="text-slate-600 font-medium">{t.uc2Desc}</p>
          </div>

          <div className="p-8 flex flex-col items-center text-center">
            <svg className="w-12 h-12 text-red-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{t.uc3Title}</h3>
            <p className="text-slate-600 font-medium">{t.uc3Desc}</p>
          </div>

        </div>
      </div>
    </section>
  );
}
