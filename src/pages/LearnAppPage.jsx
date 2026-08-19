import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LearnAppPage() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: 0,
      title: 'အရေးပေါ် ရှေးဦးသူနာပြုစုနည်း',
      description: 'First Aid instructions and parameters. Access essential life-saving techniques and step-by-step guides for various emergency situations before professional help arrives.',
      icon: (
        <svg className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v4m-2-2h4"></path>
        </svg>
      ),
    },
    {
      id: 1,
      title: 'အရေးပေါ်ဖုန်းနံပါတ်သို့ ဆက်သွယ်ရန်',
      description: 'Directly call emergency response centers. A quick-access directory to instantly connect with local police, fire departments, and ambulance services with a single tap.',
      icon: (
        <svg className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 00-6-6v0"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: 'သွေးလှူဒါန်းမှု ကွန်ရက်',
      description: 'Connect with blood donors quickly. Request specific blood types in urgent situations or register as a volunteer donor to help those in critical need within your community.',
      icon: (
        <svg className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: 'စေတနာ့ဝန်ထမ်းများ',
      description: 'Connect with local volunteers and organizations. Find nearby assistance for non-medical emergencies, search operations, and community support during challenging times.',
      icon: (
        <svg className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: 'မိုးလေဝသနှင့် သဘာဝဘေးအန္တရာယ် ကြိုတင်သတိပေးချက်',
      description: 'Weather & Natural Disaster Early Warnings. Receive real-time alerts and early warnings for extreme weather and natural disasters to keep yourself and your family safe.',
      icon: (
        <svg className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 18l-2 4m5-4l-2 4M8 18l-2 4"></path>
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-slate-50 py-12 md:py-24 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top Navigation Row with Back to Home */}
        <div className="mb-8 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-full font-semibold text-xs md:text-sm transition-all border border-slate-200 hover:border-red-200 group shadow-xs hover:shadow"
          >
            <svg 
              className="w-4 h-4 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>ပင်မစာမျက်နှာသို့ (Back to Home)</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-slate-900 text-3xl md:text-4xl font-bold mb-4">
            Ku Nyi Kal Sal ၏ အဓိကလုပ်ဆောင်ချက်များ
          </h2>
          <p className="text-slate-600 text-lg">
            အရေးပေါ်အခြေအနေများတွင် သင်နှင့် သင့်မိသားစု လုံခြုံရေးအတွက် မရှိမဖြစ် လိုအပ်မည့် အသက်ကယ်ဝန်ဆောင်မှုများ
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Vertical Menu (Desktop) / Horizontal Tabs (Mobile) */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            {/* Mobile: Horizontal scrollable tab bar */}
            <div className="md:hidden flex overflow-x-auto hide-scrollbar border-b border-slate-200 pb-1 mb-6">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors
                    ${activeTab === feature.id 
                      ? 'text-red-600 border-b-4 border-red-600' 
                      : 'text-slate-500 hover:text-slate-800 border-b-4 border-transparent'
                    }`}
                >
                  {feature.title}
                </button>
              ))}
            </div>

            {/* Desktop: Vertical Sidebar */}
            <div className="hidden md:flex flex-col space-y-2 border-l border-slate-200">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`text-left px-5 py-4 transition-all duration-200 font-semibold text-[15px]
                    ${activeTab === feature.id 
                      ? 'bg-red-50 text-red-600 border-l-4 border-red-600 -ml-[1px]' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-l-4 border-transparent -ml-[1px]'
                    }`}
                >
                  {feature.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Content Display Area */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div 
              key={activeTab} // Using key forces a re-render to trigger the fade-in animation
              className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                
                {/* Icon Placeholder */}
                <div className="flex-shrink-0 bg-red-50 p-6 rounded-2xl shadow-sm border border-red-100">
                  {features[activeTab].icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 leading-tight">
                    {features[activeTab].title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {features[activeTab].description}
                  </p>
                  
                  <div className="mt-8">
                    <button className="text-red-600 font-bold hover:text-red-700 transition-colors inline-flex items-center gap-2 group">
                      ပိုမိုသိရှိရန် (Learn More)
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Custom styles to hide scrollbar on mobile horizontal tabs */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
