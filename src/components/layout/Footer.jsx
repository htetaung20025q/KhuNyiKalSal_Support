import { Link } from 'react-router-dom';
import { FaFacebook, FaTiktok } from 'react-icons/fa';

export default function Footer({ t, onOpenLegal }) {
  const hotlines = [
    { name: t.police, number: "199" },
    { name: t.hospital, number: "192" },
    { name: t.fire, number: "191" },
    { name: t.redcross, number: "+95 1 383 681" }
  ];

  return (
    <footer className="bg-slate-900 pt-20 pb-12 px-4 md:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Legal Warning */}
        <div className="max-w-5xl mx-auto pb-12 px-4 text-center">
          <h2 className="text-slate-300 font-semibold uppercase tracking-wider mb-2 text-xs">
            {t.legalTitle}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.legalDesc}
          </p>
        </div>
        
        {/* Multi-Column Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* About Us */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold mb-2">{t.aboutUs}</h3>
            <Link to="/about" className="text-left text-slate-400 hover:text-red-500 transition-colors duration-200 cursor-pointer">{t.aboutUs}</Link>
            <span className="text-slate-500 cursor-not-allowed opacity-50 pointer-events-none">{t.callCenter}</span>
          </div>
          {/* Services */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold mb-2">{t.services}</h3>
            <span className="text-slate-500 cursor-not-allowed opacity-50 pointer-events-none">{t.sosAlert}</span>
            <span className="text-slate-500 cursor-not-allowed opacity-50 pointer-events-none">{t.locationSharing}</span>
          </div>
          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold mb-2">{t.resources}</h3>
            <span className="text-slate-500 cursor-not-allowed opacity-50 pointer-events-none">{t.firstAidGuide}</span>
          </div>
          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold mb-2">{t.legal}</h3>
            <span className="text-slate-500 cursor-not-allowed opacity-50 pointer-events-none">{t.privacyLink}</span>
            <span className="text-slate-500 cursor-not-allowed opacity-50 pointer-events-none">{t.termsLink}</span>
          </div>
        </div>

        {/* Bottom Area: Social Icons */}
        <div className="flex justify-center md:justify-end items-center gap-6">
          <div className="flex items-center gap-4 md:mr-36">
            <a href="https://www.facebook.com/share/1BaGjLaNNv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <FaTiktok className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-slate-800">
          <div className="text-slate-400 text-sm font-medium">
            {t.copyright}
          </div>
          <div className="text-slate-400 text-sm font-medium">
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-white">{t.privacyLink}</button> | <button onClick={() => onOpenLegal('terms')} className="hover:text-white">{t.termsLink}</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
