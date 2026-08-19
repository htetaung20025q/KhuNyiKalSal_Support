import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { translations } from '@/translations';

// Layout & Common Components
import { Navbar, Footer } from '@/components/layout';
import { NetworkLoader, SupportButton } from '@/components/common';

// Modals
import { 
  FirstAidModal, 
  ChatModal, 
  LegalModals, 
  PrivacyConsentModal,
  DownloadModal
} from '@/components/modals';

// Pages
import { 
  HomePage, 
  UserGuidePage, 
  LearnAppPage, 
  AboutUsPage, 
  TryOutPage, 
  AdminLogin, 
  AdminDashboard, 
  ProtectedRoute 
} from '@/pages';

function MainApp() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'en';
  });
  
  useEffect(() => {
    localStorage.setItem('preferredLanguage', lang);
  }, [lang]);

  const [isFirstAidModalOpen, setIsFirstAidModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative">
      <Navbar lang={lang} setLang={setLang} t={t} onOpenChat={() => setIsChatOpen(true)} />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              t={t} 
              onOpenDownload={() => setIsDownloadModalOpen(true)}
              onOpenFirstAid={() => setIsFirstAidModalOpen(true)} 
            />
          } 
        />
        <Route path="/guide" element={<UserGuidePage t={t} lang={lang} />} />
        <Route path="/learn" element={<LearnAppPage />} />
        <Route path="/about" element={<AboutUsPage />} />
      </Routes>

      <div className={location.pathname === '/guide' ? 'hidden lg:block' : ''}>
        <Footer t={t} onOpenLegal={setActiveLegalModal} />
      </div>
      <FirstAidModal t={t} isOpen={isFirstAidModalOpen} onClose={() => setIsFirstAidModalOpen(false)} />
      <ChatModal t={t} isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <LegalModals t={t} activeModal={activeLegalModal} onClose={() => setActiveLegalModal(null)} />
      <PrivacyConsentModal t={t} />
      <DownloadModal t={t} isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <NetworkLoader>
        <SupportButton />
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/try-out" element={<TryOutPage />} />
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </NetworkLoader>
    </Router>
  );
}

export default App;