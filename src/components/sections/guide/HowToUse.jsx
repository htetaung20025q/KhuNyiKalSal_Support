import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TimelineStepCard from './TimelineStepCard';

export default function HowToUse() {
  const steps = [
    {
      number: '01.',
      title: 'အသုံးပြုပုံလမ်းညွှန်',
      desc: 'အက်ပ်ကို ဒေါင်းလုဒ်လုပ်ပြီး သင့်ဖုန်းနံပါတ် သို့မဟုတ် အီးမေးလ်ဖြင့် မှတ်ပုံတင်ပါ။',
      imgUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=300&auto=format&fit=crop'
    },
    {
      number: '02.',
      title: 'ကိုယ်ရေးအချက်အလက် ဖြည့်သွင်းပါ',
      desc: 'သွေးအမျိုးအစား၊ အသက်နှင့် အရေးပေါ်ဆက်သွယ်ရန် နံပါတ်များကို ဖြည့်သွင်းပါ။',
      imgUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300&auto=format&fit=crop'
    },
    {
      number: '03.',
      title: 'မြေပုံကို ကြည့်ရှုပါ',
      desc: 'မြေပုံပေါ်တွင် သင့်တည်နေရာနှင့် အနီးနားရှိ အရေးပေါ်ဌာနများကို ကြည့်ရှုပါ။',
      imgUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=300&auto=format&fit=crop'
    },
    {
      number: '04.',
      title: 'SOS ပို့ရန်',
      desc: 'အရေးပေါ်အခြေအနေတွင် SOS ခလုတ်ကို ၃ စက္ကန့်ကြာ ဖိနှိပ်ပါ။',
      imgUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop'
    },
    {
      number: '05.',
      title: 'အကူအညီအမျိုးအစား ရွေးချယ်ပါ',
      desc: 'ဆေးဘက်ဆိုင်ရာ၊ မီးဘေး၊ သို့မဟုတ် ရဲအကူအညီ လိုအပ်သည်ကို ရွေးချယ်ပါ။',
      imgUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=300&auto=format&fit=crop'
    },
    {
      number: '06.',
      title: 'လမ်းညွှန်ချက်များကို လေ့လာပါ',
      desc: 'အော့ဖ်လိုင်း ရှင်းလင်းအကူအညီ လမ်းညွှန်ချက်များကို ဖတ်ရှုပါ။',
      imgUrl: 'https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=300&auto=format&fit=crop'
    },
    {
      number: '07.',
      title: 'စေတနာ့ဝန်ထမ်း ရှာဖွေပါ',
      desc: 'အနီးနားရှိ စေတနာ့ဝန်ထမ်းများကို မြေပုံပေါ်တွင် ရှာဖွေပါ။',
      imgUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=300&auto=format&fit=crop'
    },
    {
      number: '08.',
      title: 'အကူအညီပေးသူများနှင့် ချိတ်ဆက်ပါ',
      desc: 'အကူအညီပေးသူများနှင့် တိုက်ရိုက် စကားပြောပါ သို့မဟုတ် ဖုန်းခေါ်ဆိုပါ။',
      imgUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300&auto=format&fit=crop'
    }
  ];

  // Disable sliding animations on mobile devices to prevent excessive horizontal shifting
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize(); // Set initial value on client-side mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="bg-slate-50 py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            How to use the app <span className="block text-xl md:text-2xl text-slate-500 mt-2 font-semibold tracking-normal font-sans">(အက်ပ်အသုံးပြုပုံ)</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative flex flex-col gap-12 w-full max-w-5xl">
            
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div 
                  key={step.number} 
                  className={`flex w-full md:w-3/4 ${isEven ? 'self-start' : 'self-end'}`}
                  initial={isDesktop ? { opacity: 0, x: isEven ? -150 : 150 } : { opacity: 1, x: 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <TimelineStepCard 
                    stepNumber={step.number.replace('.', '')}
                    title={step.title}
                    description={step.desc}
                    imageUrl={step.imgUrl || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=300&auto=format&fit=crop"}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}