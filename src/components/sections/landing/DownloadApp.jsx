export default function DownloadApp({ t }) {
  return (
    <section className="bg-slate-900 py-16 md:py-24 px-4 md:px-8 text-center text-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">
          {t.downloadAppHeading}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          {/* App Store Button Placeholder */}
          <a href="#appstore" className="bg-black hover:bg-slate-800 text-white border border-slate-700 rounded-xl px-6 py-3 flex items-center gap-3 transition-colors min-w-[200px]">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
            </svg>
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-slate-300">Download on the</div>
              <div className="text-lg font-semibold leading-tight">App Store</div>
            </div>
          </a>
          
          {/* Google Play Button Placeholder */}
          <a href="#playstore" className="bg-black hover:bg-slate-800 text-white border border-slate-700 rounded-xl px-6 py-3 flex items-center gap-3 transition-colors min-w-[200px]">
            <svg className="w-8 h-8" viewBox="0 0 466 512">
              <path fill="#EA4335" d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z"/>
              <path fill="#FBBC04" d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z"/>
              <path fill="#34A853" d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z"/>
              <path fill="#4285F4" d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z"/>
            </svg>
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-slate-300">GET IT ON</div>
              <div className="text-lg font-semibold leading-tight">Google Play</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
