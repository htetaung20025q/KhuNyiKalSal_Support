import React, { useState } from 'react';

const EmergencyBloodRequestModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState('mm');
  const [urgency, setUrgency] = useState('အရေးပေါ်');
  
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    bloodType: '',
    bloodBagsCount: '',
    hospitalName: '',
    hospitalAddress: '',
    contactName: '',
    contactPhone: '',
    doctorRecommendation: '',
    extraNotes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    // File drop logic would go here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full max-w-[700px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Slim Header */}
        <div className="bg-[#e50000] text-white py-3 px-6 flex justify-between items-center shrink-0">
          <h2 className="text-[17px] font-medium tracking-wide">
             {step === 1 ? 'အရေးပေါ်သွေးတောင်းခံခြင်း' : 'အချက်အလက်များ ပြန်လည်စစ်ဆေးခြင်း'}
          </h2>
          <div className="flex items-center space-x-5">
             <button 
               onClick={() => setLang(lang === 'mm' ? 'en' : 'mm')} 
               className="text-xs font-medium hover:text-white/80 transition flex items-center space-x-1"
             >
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
               <span>{lang === 'mm' ? 'မြန်မာ' : 'English'}</span>
             </button>
             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition" aria-label="Close">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
             </button>
          </div>
        </div>

        {/* Form Body - scrollable */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
           {step === 1 ? (
              <div className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
                
                {/* Patient Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] text-gray-600 font-medium ml-3">လူနာအမည် *</label>
                    <input 
                      type="text" name="patientName" value={formData.patientName} onChange={handleChange} 
                      className="w-full px-5 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e50000]/20 focus:border-[#e50000] text-gray-800 text-[15px] transition shadow-sm" 
                      placeholder="လူနာအမည် ရိုက်ထည့်ပါ"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] text-gray-600 font-medium ml-3">လူနာအသက် *</label>
                    <input 
                      type="number" name="patientAge" value={formData.patientAge} onChange={handleChange} 
                      className="w-full px-5 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e50000]/20 focus:border-[#e50000] text-gray-800 text-[15px] transition shadow-sm" 
                      placeholder="အသက် (ဥပမာ - ၃၅)"
                    />
                  </div>
                </div>

                {/* Blood Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] text-gray-600 font-medium ml-3">လိုအပ်သောသွေးအမျိုးအစား *</label>
                    <div className="relative">
                      <select 
                        name="bloodType" value={formData.bloodType} onChange={handleChange} 
                        className="w-full px-5 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e50000]/20 focus:border-[#e50000] text-gray-800 text-[15px] transition shadow-sm appearance-none bg-white cursor-pointer"
                      >
                        <option value="">ရွေးချယ်ပါ</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] text-gray-600 font-medium ml-3">လိုအပ်သောသွေးအိတ်အရေအတွက် *</label>
                    <input 
                      type="number" name="bloodBagsCount" value={formData.bloodBagsCount} onChange={handleChange} 
                      className="w-full px-5 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e50000]/20 focus:border-[#e50000] text-gray-800 text-[15px] transition shadow-sm" 
                      placeholder="ဥပမာ - ၂"
                    />
                  </div>
                </div>

                {/* Urgency */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[13px] text-gray-600 font-medium ml-3">အရေးကြီးအဆင့် *</label>
                  <div className="flex items-center space-x-3 bg-gray-50/50 p-1.5 rounded-full border border-gray-100">
                    {['အရေးပေါ်', 'အရေးကြီး', 'သာမန်'].map((level) => (
                      <button 
                        key={level} 
                        type="button" 
                        onClick={() => setUrgency(level)} 
                        className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                          urgency === level 
                            ? 'bg-white text-[#e50000] shadow-sm border border-gray-200/50' 
                            : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hospital Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] text-gray-600 font-medium ml-3">ဆေးရုံအမည် *</label>
                    <input 
                      type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} 
                      className="w-full px-5 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e50000]/20 focus:border-[#e50000] text-gray-800 text-[15px] transition shadow-sm" 
                      placeholder="ဆေးရုံအမည်"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] text-gray-600 font-medium ml-3">ဆေးရုံလိပ်စာ *</label>
                    <input 
                      type="text" name="hospitalAddress" value={formData.hospitalAddress} onChange={handleChange} 
                      className="w-full px-5 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e50000]/20 focus:border-[#e50000] text-gray-800 text-[15px] transition shadow-sm" 
                      placeholder="မြို့နယ် / လမ်း"
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] text-gray-600 font-medium ml-3">ဆက်သွယ်သူအမည် *</label>
                    <input 
                      type="text" name="contactName" value={formData.contactName} onChange={handleChange} 
                      className="w-full px-5 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e50000]/20 focus:border-[#e50000] text-gray-800 text-[15px] transition shadow-sm" 
                      placeholder="အမည်"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] text-gray-600 font-medium ml-3">ဆက်သွယ်ရန်ဖုန်းနံပါတ် *</label>
                    <input 
                      type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} 
                      className="w-full px-5 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e50000]/20 focus:border-[#e50000] text-gray-800 text-[15px] transition shadow-sm" 
                      placeholder="09..."
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] text-gray-600 font-medium ml-3">ဆရာဝန်ထောက်ခံချက် (ရွေးချယ်ရန်)</label>
                    <textarea 
                      name="doctorRecommendation" value={formData.doctorRecommendation} onChange={handleChange} rows="2" 
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e50000]/20 focus:border-[#e50000] text-gray-800 text-[15px] transition shadow-sm resize-none"
                      placeholder="လိုအပ်ပါက ရေးသားနိုင်ပါသည်"
                    ></textarea>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] text-gray-600 font-medium ml-3">နောက်ထပ်မှတ်ချက်များ (ရွေးချယ်ရန်)</label>
                    <textarea 
                      name="extraNotes" value={formData.extraNotes} onChange={handleChange} rows="2" 
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e50000]/20 focus:border-[#e50000] text-gray-800 text-[15px] transition shadow-sm resize-none"
                      placeholder="အခြားပြောလိုသောအရာများ"
                    ></textarea>
                  </div>
                </div>

                {/* File Upload */}
                <div className="flex flex-col space-y-1.5">
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="w-full px-4 py-5 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-[#e50000]/40 transition"
                  >
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                     <p className="text-[13px] text-gray-500 font-medium">ဖိုင်ရွေးပါ သို့မဟုတ် ဤနေရာသို့ ဆွဲချပါ</p>
                  </div>
                </div>

                {/* Action */}
                <div className="pt-3 pb-1">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)} 
                    className="w-full py-3.5 bg-[#1a1f36] text-white rounded-full font-medium text-[15px] hover:bg-[#111424] active:scale-[0.99] transition-all shadow-lg shadow-[#1a1f36]/20 flex justify-center items-center space-x-2"
                  >
                    <span>အကူအညီတောင်းခံမည်</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
                </div>

              </div>
           ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 pb-2">
                
                {/* Data Summary Box */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">လူနာအမည်</p>
                      <p className="text-sm font-semibold text-gray-800">{formData.patientName || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">လူနာအသက်</p>
                      <p className="text-sm font-semibold text-gray-800">{formData.patientAge || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">သွေးအမျိုးအစား</p>
                      <p className="text-[15px] font-bold text-[#e50000]">{formData.bloodType || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">သွေးအိတ်အရေအတွက်</p>
                      <p className="text-sm font-semibold text-gray-800">{formData.bloodBagsCount || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">အရေးကြီးအဆင့်</p>
                      <div className="mt-0.5">
                         <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                            urgency === 'အရေးပေါ်' ? 'bg-red-100 text-red-700' :
                            urgency === 'အရေးကြီး' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                         }`}>
                           {urgency}
                         </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ဆက်သွယ်ရန်ဖုန်း</p>
                      <p className="text-sm font-semibold text-gray-800">{formData.contactPhone || '-'}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200/60 grid grid-cols-1 gap-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ဆေးရုံအမည် & လိပ်စာ</p>
                      <p className="text-sm font-medium text-gray-800">
                         {formData.hospitalName || '-'} 
                         {formData.hospitalAddress && <span className="text-gray-500 font-normal"> ({formData.hospitalAddress})</span>}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alert/Confirmation Box */}
                <div className="bg-red-50/80 border border-red-200 rounded-xl p-4 flex items-start space-x-3.5">
                   <div className="text-red-500 mt-0.5 shrink-0 bg-white p-1 rounded-full shadow-sm">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                   </div>
                   <div>
                     <p className="text-[14px] font-semibold text-red-800 tracking-wide">အချက်အလက်များ မှန်ကန်ကြောင်း အတည်ပြုပါသလား။</p>
                     <p className="text-[13px] text-red-600 mt-1 leading-relaxed">
                        ကျေးဇူးပြု၍ အထက်ပါအချက်အလက်များကို သေချာစွာစစ်ဆေးပါ။ ပေးပို့ပြီးပါက ပြင်ဆင်ရန်ခက်ခဲနိုင်ပါသည်။
                     </p>
                   </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center space-x-3 pt-3">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="px-6 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-full font-medium text-[15px] transition active:scale-[0.98] w-1/3 flex justify-center items-center"
                  >
                    နောက်သို့
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                       // API integration
                       alert('Submitted!');
                       onClose?.();
                    }} 
                    className="flex-1 py-3 bg-[#e50000] text-white rounded-full font-medium text-[15px] hover:bg-[#cc0000] transition active:scale-[0.98] shadow-lg shadow-[#e50000]/20 flex justify-center items-center space-x-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
                    <span>အတည်ပြုပေးပို့မည်</span>
                  </button>
                </div>

              </div>
           )}
        </div>
      </div>
    </div>
  )
}

export default EmergencyBloodRequestModal;
