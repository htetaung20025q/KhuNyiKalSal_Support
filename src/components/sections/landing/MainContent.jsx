import React, { useState, useEffect } from 'react';
import StepBlock from './StepBlock';
import PhoneMockup from './PhoneMockup';

export default function MainContent({ t }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const steps = [
    {
      id: 1,
      title: t.step1Title,
      description: t.step1Desc
    },
    {
      id: 2,
      title: t.step2Title,
      description: t.step2Desc
    },
    {
      id: 3,
      title: t.step3Title,
      description: t.step3Desc
    },
    {
      id: 4,
      title: t.step4Title,
      description: t.step4Desc
    }
  ];

  // Auto-cycle through steps every 4 seconds when user is not manually clicking
  useEffect(() => {
    if (isUserInteracting) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 4) + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [isUserInteracting]);

  const handleSelectStep = (stepId) => {
    setIsUserInteracting(true);
    setActiveStep(stepId);
  };

  return (
    <main className="max-w-7xl mx-auto py-12 md:py-24 px-4 md:px-8">
      <div className="flex flex-col md:grid md:grid-cols-12 gap-10 md:gap-16 relative items-start">
        
        {/* Left Column: Timeline UI (7 cols) */}
        <div className="md:col-span-7 order-2 md:order-1 relative z-10 pt-4 md:pt-0">
          <div className="mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
              {t.flowTitle || "HOW IT WORKS"}
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              {t.heroTitle || "Stay Safe. Get Help Fast."}
            </h2>
          </div>

          {/* Continuous vertical timeline line */}
          <div className="absolute left-[20px] top-[140px] bottom-10 w-0.5 bg-slate-200"></div>
          
          <div className="flex flex-col relative pt-2">
            {steps.map((step, index) => (
              <StepBlock 
                key={step.id} 
                stepNumber={step.id} 
                title={step.title} 
                description={step.description}
                isLast={index === steps.length - 1} 
                t={t}
                isActive={activeStep === step.id}
                onClick={() => handleSelectStep(step.id)}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Phone Mockup (Top on Mobile, Sticky on Desktop) (5 cols) */}
        <div className="md:col-span-5 order-1 md:order-2 relative md:sticky md:top-24 z-20 w-full flex justify-center">
          <PhoneMockup t={t} />
        </div>

      </div>
    </main>
  );
}
