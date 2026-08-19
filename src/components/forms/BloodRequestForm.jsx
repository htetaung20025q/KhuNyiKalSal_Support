import { useState } from 'react';

export default function BloodRequestForm({ lang, onClose }) {
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    hospitalName: '',
    hospitalAddress: '',
    bloodType: '',
    units: '1',
    urgency: 'Normal',
    attendantName: '',
    contactNumber: '',
    doctorRecommendation: '',
    additionalNotes: ''
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = {
    patientName: lang === 'mm' ? "လူနာအမည်" : "Patient Name",
    patientAge: lang === 'mm' ? "လူနာအသက်" : "Patient Age",
    hospitalName: lang === 'mm' ? "ဆေးရုံအမည်" : "Hospital Name",
    hospitalAddress: lang === 'mm' ? "ဆေးရုံလိပ်စာ" : "Hospital Address",
    bloodType: lang === 'mm' ? "လိုအပ်သောသွေးအမျိုးအစား" : "Blood Type Needed",
    units: lang === 'mm' ? "လိုအပ်သောသွေးအိတ်အရေအတွက်" : "Blood Units Required",
    urgency: lang === 'mm' ? "အရေးတကြီးအဆင့်" : "Urgency Level",
    critical: lang === 'mm' ? "အရေးပေါ်" : "Critical",
    urgent: lang === 'mm' ? "အရေးကြီး" : "Urgent",
    normal: lang === 'mm' ? "သာမန်" : "Normal",
    criticalWarning: lang === 'mm' ? "ဤသည်မှာ အရေးပေါ်အခြေအနေဖြစ်သည်။ အချက်အလက်အားလုံးကို ထပ်မံစစ်ဆေးပါ။" : "This is a CRITICAL request. Please double-check all details.",
    attendantName: lang === 'mm' ? "ဆက်သွယ်သူအမည်" : "Attendant's Name",
    contactNumber: lang === 'mm' ? "ဆက်သွယ်ရန်နံပါတ်" : "Contact Number",
    doctorRecommendation: lang === 'mm' ? "ဆရာဝန်ထောက်ခံချက်" : "Doctor's Recommendation (Optional)",
    additionalNotes: lang === 'mm' ? "နောက်ထပ်မှတ်ချက်များ" : "Additional Notes (Optional)",
    selectOption: lang === 'mm' ? "ရွေးချယ်ပါ..." : "Select...",
    submitBtn: lang === 'mm' ? "အကူအညီတောင်းခံမည်" : "Request Blood",
    confirmTitle: lang === 'mm' ? "သတိပေးချက်" : "Warning",
    confirmMsg: lang === 'mm' ? "အချက်အလက်အမှားများ ပေးပို့ခြင်းသည် အရေးပေါ်စောင့်ရှောက်မှုကို နှောင့်နှေးစေနိုင်သည်။ ပေးထားသော အချက်အလက်အားလုံး မှန်ကန်ကြောင်း သေချာပါသလား။" : "Submitting false or inaccurate information can delay emergency care. Are you sure all the information provided is correct?",
    confirmYes: lang === 'mm' ? "သေချာပါသည်" : "Confirm",
    confirmNo: lang === 'mm' ? "ပြန်လည်ပြင်ဆင်မည်" : "Cancel",
    successTitle: lang === 'mm' ? "ပေးပို့မှု အောင်မြင်ပါသည်!" : "Request Submitted!",
    successMsg: lang === 'mm' ? "ကျွန်ုပ်တို့၏ အဖွဲ့မှ အမြန်ဆုံး ဆက်သွယ်ပေးပါမည်။" : "Your request has been sent. Our team will contact you shortly."
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    const payload = {
      name: formData.patientName,
      age: parseInt(formData.patientAge, 10),
      need_blood: formData.bloodType,
      blood_bags_quantity: parseInt(formData.units, 10),
      emergency_level: formData.urgency,
      hospital_name: formData.hospitalName,
      hospital_address: formData.hospitalAddress,
      contact_person_name: formData.attendantName,
      contact_number: formData.contactNumber,
      doctor_recommendation: formData.doctorRecommendation || null,
      additional_notes: formData.additionalNotes || null
    };

    // Simulate network delay for demo purposes
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmModal(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        onClose();
      }, 2500);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{t.successTitle}</h3>
        <p className="text-slate-500">{t.successMsg}</p>
      </div>
    );
  }

  const isCritical = formData.urgency === 'Critical';

  return (
    <div className="relative">
      <form 
        onSubmit={handleInitialSubmit} 
        className={`flex flex-col gap-5 transition-all duration-300 ${isCritical ? 'p-4 rounded-xl border-2 border-red-500 bg-red-50/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : ''}`}
      >
        
        {isCritical && (
          <div className="bg-red-600 text-white p-3 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <svg className="w-6 h-6 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <p className="font-bold text-sm leading-relaxed">{t.criticalWarning}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">{t.patientName} *</label>
            <input required type="text" name="patientName" value={formData.patientName} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">{t.patientAge} *</label>
            <input required type="number" min="1" max="120" name="patientAge" value={formData.patientAge} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">{t.bloodType} *</label>
            <select required name="bloodType" value={formData.bloodType} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none bg-white">
              <option value="" disabled>{t.selectOption}</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">{t.units} *</label>
            <input required type="number" min="1" max="10" name="units" value={formData.units} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">{t.urgency} *</label>
          <div className="flex flex-wrap gap-4 mt-1">
            <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-colors ${formData.urgency === 'Critical' ? 'bg-red-50 border-red-600 text-red-700' : 'bg-white border-slate-200 text-slate-600 hover:border-red-300'}`}>
              <input type="radio" name="urgency" value="Critical" className="hidden" checked={formData.urgency === 'Critical'} onChange={handleChange} />
              <span className="font-bold">{t.critical}</span>
            </label>
            <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-colors ${formData.urgency === 'Urgent' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-slate-200 text-slate-600 hover:border-orange-300'}`}>
              <input type="radio" name="urgency" value="Urgent" className="hidden" checked={formData.urgency === 'Urgent'} onChange={handleChange} />
              <span className="font-bold">{t.urgent}</span>
            </label>
            <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-colors ${formData.urgency === 'Normal' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'}`}>
              <input type="radio" name="urgency" value="Normal" className="hidden" checked={formData.urgency === 'Normal'} onChange={handleChange} />
              <span className="font-bold">{t.normal}</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">{t.hospitalName} *</label>
            <input required type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">{t.hospitalAddress} *</label>
            <textarea required name="hospitalAddress" value={formData.hospitalAddress} onChange={handleChange} rows="1" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none"></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">{t.attendantName} *</label>
            <input required type="text" name="attendantName" value={formData.attendantName} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">{t.contactNumber} *</label>
            <input required type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">{t.doctorRecommendation}</label>
          <textarea name="doctorRecommendation" value={formData.doctorRecommendation} onChange={handleChange} rows="2" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none"></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">{t.additionalNotes}</label>
          <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows="2" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none"></textarea>
        </div>

        <div className="mt-2">
          <button type="submit" className={`w-full font-bold text-white py-4 rounded-xl shadow-lg transition-colors text-lg ${isCritical ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
            {t.submitBtn}
          </button>
        </div>
      </form>

      {/* Double Confirmation Modal */}
      {showConfirmModal && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {/* Internal Backdrop */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl" onClick={() => !isSubmitting && setShowConfirmModal(false)}></div>
          
          <div className="relative bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 md:p-8 w-[90%] max-w-sm text-center animate-in zoom-in-95">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t.confirmTitle}</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {t.confirmMsg}
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : t.confirmYes}
              </button>
              <button 
                onClick={() => setShowConfirmModal(false)}
                disabled={isSubmitting}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition-colors"
              >
                {t.confirmNo}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
