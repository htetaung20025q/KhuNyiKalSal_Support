import { useState } from 'react';

export default function DonorRegistrationForm({ lang, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    phone: '',
    bloodType: '',
    address: '',
    neverDonated: false,
    lastDonationDate: '',
    weight: '',
    availableForEmergency: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [finalConfirmation, setFinalConfirmation] = useState(''); // 'yes' or 'no'

  const t = {
    fullName: lang === 'mm' ? "အမည်အပြည့်အစုံ" : "Full Name",
    age: lang === 'mm' ? "အသက်" : "Age",
    gender: lang === 'mm' ? "လိင်" : "Gender",
    male: lang === 'mm' ? "ကျား" : "Male",
    female: lang === 'mm' ? "မ" : "Female",
    other: lang === 'mm' ? "အခြား" : "Other",
    phone: lang === 'mm' ? "ဖုန်းနံပါတ်" : "Phone Number",
    bloodType: lang === 'mm' ? "သွေးအမျိုးအစား" : "Blood Type",
    address: lang === 'mm' ? "လက်ရှိနေရပ်လိပ်စာ" : "Current Address",
    lastDonation: lang === 'mm' ? "နောက်ဆုံးသွေးလှူခဲ့သည့်နေ့" : "Last Blood Donation Date",
    neverDonated: lang === 'mm' ? "ကျွန်တော်/ကျွန်မ သွေးတစ်ခါမှမလှူဖူးပါ" : "I have never donated blood before",
    weight: lang === 'mm' ? "ကိုယ်အလေးချိန်" : "Weight (kg)",
    weightHint: lang === 'mm' ? "အနည်းဆုံး ၄၅ ကီလိုဂရမ် လိုအပ်သည်" : "Minimum 45 kg required",
    available: lang === 'mm' ? "အရေးပေါ်သွေးလှူရန် အသင့်ရှိပါသလား" : "Available for Emergency Blood Donation",
    yes: lang === 'mm' ? "ဟုတ်ကဲ့" : "Yes",
    no: lang === 'mm' ? "မဟုတ်ပါ" : "No",
    next: lang === 'mm' ? "ရှေ့ဆက်မည်" : "Next Step",
    back: lang === 'mm' ? "နောက်သို့" : "Back",
    submit: lang === 'mm' ? "အတည်ပြုပေးပို့မည်" : "Submit Registration",
    summaryTitle: lang === 'mm' ? "အချက်အလက်များ ပြန်လည်စစ်ဆေးခြင်း" : "Registration Summary",
    finalQuestion: lang === 'mm' ? "လိုအပ်ချိန်တွင် သွေးလှူဒါန်းရန် သင်အသင့်ရှိနိုင်ပါသလား။" : "Are you sure you are willing and available to donate blood when needed?",
    selectOption: lang === 'mm' ? "ရွေးချယ်ပါ..." : "Select...",
    successTitle: lang === 'mm' ? "မှတ်ပုံတင်ခြင်း အောင်မြင်ပါသည်!" : "Registration Successful!",
    successMsg: lang === 'mm' ? "ကူညီကယ်ဆယ်တွင် ပါဝင်ပေးသည့်အတွက် ကျေးဇူးတင်ပါသည်။" : "Thank you for registering as a volunteer donor.",
    dateError: lang === 'mm' ? "⚠️ သွေးလှူ၍မရသေးပါ။ နောက်ဆုံးသွေးလှူပြီးသည်မှ ၃ ရက်ပြည့်အောင် စောင့်ပါ။" : "⚠️ You cannot donate blood yet. Please wait until 3 full days have passed since your last donation.",
  };

  const checkDateRestriction = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(dateString);
    selected.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - selected) / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  const isDateRestricted = !formData.neverDonated && checkDateRestriction(formData.lastDonationDate);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (finalConfirmation !== 'yes') return;
    
    setIsSubmitting(true);
    
    const payload = {
      name: formData.fullName,
      age: parseInt(formData.age, 10),
      gender: formData.gender,
      phone: formData.phone,
      blood_group: formData.bloodType,
      address: formData.address,
      last_donation_date: formData.lastDonationDate || null,
      never_donated: formData.neverDonated,
      weight: parseInt(formData.weight, 10),
      ready_for_emergency: formData.availableForEmergency === 'yes'
    };

    // Simulate network delay for demo purposes
    setTimeout(() => {
      setIsSubmitting(false);
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

  if (step === 2) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-in slide-in-from-right-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">{t.summaryTitle}</h3>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div className="text-slate-500">{t.fullName}:</div><div className="font-medium text-slate-900">{formData.fullName}</div>
            <div className="text-slate-500">{t.age}:</div><div className="font-medium text-slate-900">{formData.age}</div>
            <div className="text-slate-500">{t.bloodType}:</div><div className="font-bold text-red-600">{formData.bloodType}</div>
            <div className="text-slate-500">{t.phone}:</div><div className="font-medium text-slate-900">{formData.phone}</div>
            <div className="text-slate-500">{t.weight}:</div><div className="font-medium text-slate-900">{formData.weight} kg</div>
          </div>
        </div>

        <div className="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm">
          <p className="font-bold text-red-700 text-center text-lg mb-4 leading-snug">
            {t.finalQuestion}
          </p>
          <div className="flex gap-4 justify-center">
            <label className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 cursor-pointer transition-colors ${finalConfirmation === 'yes' ? 'bg-red-600 border-red-600 text-white' : 'bg-white border-red-200 text-red-700 hover:border-red-600'}`}>
              <input type="radio" name="finalConfirmation" value="yes" className="hidden" checked={finalConfirmation === 'yes'} onChange={(e) => setFinalConfirmation(e.target.value)} />
              <span className="font-bold">{t.yes}</span>
            </label>
            <label className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 cursor-pointer transition-colors ${finalConfirmation === 'no' ? 'bg-slate-600 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-slate-500'}`}>
              <input type="radio" name="finalConfirmation" value="no" className="hidden" checked={finalConfirmation === 'no'} onChange={(e) => setFinalConfirmation(e.target.value)} />
              <span className="font-bold">{t.no}</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <button type="button" onClick={() => setStep(1)} className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
            {t.back}
          </button>
          <button 
            type="submit" 
            disabled={finalConfirmation !== 'yes' || isSubmitting}
            className={`flex-1 font-bold text-white py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${finalConfirmation === 'yes' ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-300 cursor-not-allowed'} ${isSubmitting ? 'opacity-70' : ''}`}
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : t.submit}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleNext} className="flex flex-col gap-5 animate-in slide-in-from-left-4">
      
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">{t.fullName} *</label>
        <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none" placeholder="Enter your full name" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">{t.age} *</label>
          <input required type="number" min="18" max="65" name="age" value={formData.age} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none" placeholder="18-65" />
          <p className="text-xs text-red-500 mt-1 hidden peer-invalid:block">Must be between 18 and 65</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">{t.gender} *</label>
          <select required name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none bg-white">
            <option value="" disabled>{t.selectOption}</option>
            <option value="Male">{t.male}</option>
            <option value="Female">{t.female}</option>
            <option value="Other">{t.other}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">{t.phone} *</label>
          <input required type="tel" minLength="9" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none" placeholder="+95 9..." />
        </div>
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
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">{t.address} *</label>
        <textarea required name="address" value={formData.address} onChange={handleChange} rows="2" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none" placeholder="Your full address"></textarea>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <label className="block text-sm font-bold text-slate-700 mb-2">{t.lastDonation}</label>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input type="checkbox" name="neverDonated" checked={formData.neverDonated} onChange={handleChange} className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-600" />
            <span className="font-medium">{t.neverDonated}</span>
          </label>
          {!formData.neverDonated && (
            <div className="flex flex-col gap-1">
              <input required={!formData.neverDonated} type="date" name="lastDonationDate" value={formData.lastDonationDate} onChange={handleChange} className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${isDateRestricted ? 'border-red-500 focus:ring-red-600 bg-red-50' : 'border-slate-300 focus:ring-red-600'}`} />
              {isDateRestricted && (
                <p className="text-sm font-bold text-red-600 mt-1">{t.dateError}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">{t.weight} *</label>
          <input required type="number" min="45" name="weight" value={formData.weight} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-600 outline-none" placeholder="kg" />
          <p className="text-xs text-slate-500 mt-1">{t.weightHint}</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">{t.available} *</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input required type="radio" name="availableForEmergency" value="yes" checked={formData.availableForEmergency === 'yes'} onChange={handleChange} className="w-4 h-4 text-red-600 border-slate-300 focus:ring-red-600" />
              <span>{t.yes}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button 
          type="submit" 
          disabled={isDateRestricted}
          className={`w-full font-bold py-4 rounded-xl shadow-lg transition-colors text-lg ${isDateRestricted ? 'bg-slate-400 text-slate-200 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
        >
          {t.next}
        </button>
      </div>

    </form>
  );
}
