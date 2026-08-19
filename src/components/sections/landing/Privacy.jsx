export default function Privacy({ t }) {
  return (
    <section className="bg-slate-800 text-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          {t.privacyTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <svg className="w-12 h-12 text-white mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
            </svg>
            <h3 className="text-2xl font-bold mb-4">{t.priv1Title}</h3>
            <p className="text-slate-300 font-medium text-lg leading-relaxed">
              {t.priv1Desc}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <svg className="w-12 h-12 text-white mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <h3 className="text-2xl font-bold mb-4">{t.priv2Title}</h3>
            <p className="text-slate-300 font-medium text-lg leading-relaxed">
              {t.priv2Desc}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
