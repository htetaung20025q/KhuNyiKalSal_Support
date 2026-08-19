import { useEffect } from 'react';

export default function LegalModals({ t, activeModal, onClose }) {
  // activeModal can be 'privacy', 'terms', or null

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeModal]);

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-2xl font-black text-slate-800">
            {activeModal === 'privacy' ? "Privacy Policy" : "Terms and Conditions"}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto prose prose-slate max-w-none flex-1">
          {activeModal === 'privacy' ? (
            <>
              <h3>1. Data Protection and Usage</h3>
              <p>Your privacy and safety are our highest priorities. We clearly state that any personal information, medical data, and real-time location data collected by the Application are safeguarded and utilized <strong>exclusively for the sole purpose of facilitating emergency rescue operations</strong>.</p>
              
              <h3>2. Zero Unconsented Sharing</h3>
              <p>We guarantee that your user information will never be shared, sold, distributed, or monetized. Explicitly, no personal data or location history will be used for marketing, advertising, or any other non-emergency reasons without your direct, explicit permission.</p>

              <h3>3. Security</h3>
              <p>Your personal health information and live coordinates are only broadcasted to verified medical professionals and certified rescue teams at the exact moment you explicitly trigger the SOS button during a certified emergency. All communications are secured using end-to-end encryption to ensure your data remains strictly confidential.</p>
            </>
          ) : (
            <>
              <h3>1. Acceptance of Terms</h3>
              <p>By downloading, accessing, or using the Ku Nyi Kal Sal emergency response application (the "Application"), you expressly agree to be bound by these Terms and Conditions. <strong>The sole and exclusive purpose of this Application is to connect users with certified emergency rescue teams and first responders during critical, life-threatening situations.</strong> If you do not agree to these terms, you must not use this Application.</p>

              <h3>2. User Responsibilities and Obligations</h3>
              <p>As a user of this Application, you are mandated to provide completely accurate, truthful, and up-to-date personal information, including your name, contact details, and relevant medical history. This information is vital for first responders to locate and assist you effectively. Providing false information may delay or prevent emergency assistance.</p>

              <h3>3. Zero-Tolerance Policy on False Alarms</h3>
              <p>The SOS alert system is a critical lifeline. It is strictly forbidden to initiate an SOS alert, trigger the emergency signal, or contact rescue teams for non-emergencies, tests, pranks, or any situation that does not involve immediate danger to life or property.</p>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-xl my-8">
                <h4 className="text-red-700 font-black text-lg flex items-center gap-2 mt-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  LEGAL WARNING: PENALTY FOR FALSE REPORTS
                </h4>
                <p className="text-red-900 font-bold mb-4">Pressing the SOS button without a genuine emergency is a severe criminal offense.</p>
                <p className="text-red-800 text-sm mb-0">Misuse of the SOS feature is classified as a punishable offense. Any false reporting, prank calls, or deliberate generation of fake SOS alerts will result in <strong>immediate account termination</strong>.</p>
                <p className="text-red-800 text-sm mt-2 mb-0">Furthermore, violators will face strict <strong>legal prosecution</strong> and charges for public harassment, public nuisance, and false reporting under the applicable Telecommunications Law and Penal Code. This may result in heavy fines and imprisonment. <strong>Do not test the SOS button.</strong></p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-full transition-colors"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
}
