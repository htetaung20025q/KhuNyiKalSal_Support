import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import FeedbackSuccessModal from '@/components/modals/FeedbackSuccessModal';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const AboutUsPage = () => {
  const [feedback, setFeedback] = useState({ user_name: '', user_email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useRef();

  const handleChange = (e) => {
    if (error) setError(null);
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    // Check for offline status before attempting to send
    if (!navigator.onLine) {
      setError("Network error. Please check your connection and try again.");
      setIsSending(false);
      return;
    }

    emailjs.sendForm('service_khunyikalsal', 'template_btlr7je', form.current, 'kAxjlSzNpoe7n_4wf')
      .then((result) => {
        toast.success('Success! Your feedback has been sent.');
        e.target.reset();
        setFeedback({ user_name: '', user_email: '', message: '' });
        setShowSuccessModal(true);
      }, (error) => {
        toast.error('Failed to send feedback. Please try again.');
        setError(error.text || "Network error or failed to send email.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      
      {/* Back to Home Button */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between">
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

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        
        {/* About Us Section */}
        <div className="p-6 sm:p-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Khu Nyi Kal Sal <span className="text-red-600">Emergency App</span>
          </h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Support Khu Nyi Kal Sal — Build a Stronger Local Community Together
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            <strong>Khu Nyi Kal Sal (ကူညီကယ်ဆယ်)</strong> is an emergency-focused platform created to help people connect with local volunteers, blood donors, organizations, and community support when assistance is needed.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our goal is simple: use technology to make local connections stronger and help people find the right support more easily during difficult moments and the people who do not have the nearest emergency service contacts.
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-3">How You Can Help</h3>
          <p className="text-gray-600 mb-3">
            Your support can help us continue developing the platform and establishing stronger local connections. You can support Khu Nyi Kal Sal by:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
            <li>Supporting app development</li>
            <li>Helping us connect with local communities</li>
            <li>Joining as a volunteer</li>
            <li>Introducing local organizations to the platform</li>
            <li>Sharing Khu Nyi Kal Sal with others</li>
            <li>Supporting by testing Application</li>
          </ul>

          <h3 className="text-lg font-bold text-gray-800 mb-3">Be Part of Khu Nyi Kal Sal</h3>
          <p className="text-gray-600 italic border-l-4 border-red-500 pl-4">
            Join us in building a platform where people, volunteers, donors, and local organizations can connect when support is needed.<br/><br/>
            <span className="font-semibold text-red-600">Connecting Communities. Supporting People. Building Together.</span>
          </p>
        </div>

        {/* Feedback Section */}
        <div className="p-6 sm:p-8 bg-gray-50">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Share Your Feedback</h3>
          <p className="text-gray-600 mb-6">
            Your feedback helps us improve Khu Nyi Kal Sal to serve the community better.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form ref={form} onSubmit={handleSubmit} className={`space-y-4 transition-opacity duration-300 ${isSending ? 'opacity-60' : 'opacity-100'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  value={feedback.user_name}
                  onChange={handleChange}
                  disabled={isSending}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  value={feedback.user_email}
                  onChange={handleChange}
                  disabled={isSending}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Feedback</label>
              <textarea
                name="message"
                id="message"
                rows="4"
                required
                value={feedback.message}
                onChange={handleChange}
                disabled={isSending}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Let us know how we can improve..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Feedback...
                </span>
              ) : (
                "Submit Feedback"
              )}
            </button>
          </form>
        </div>

      </div>
      
      <FeedbackSuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </div>
  );
};

export default AboutUsPage;
