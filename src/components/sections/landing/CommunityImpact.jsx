import React from 'react';

const CommunityImpact = () => {
  const activities = [
    {
      id: 1,
      title: 'Emergency Response Training in Rural Areas to help communities build resilience against disasters',
      date: 'August 12, 2026',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1170&q=80',
      link: '#',
    },
    {
      id: 2,
      title: 'Blood Donation Drive Reaches 500+ Donors',
      date: 'July 28, 2026',
      image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1283&q=80',
      link: '#',
    },
    {
      id: 3,
      title: 'Local Volunteers Assist in Flood Relief Efforts across multiple townships',
      date: 'July 15, 2026',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1170&q=80',
      link: '#',
    },
    {
      id: 4,
      title: 'New First Aid Workshops for Schools',
      date: 'June 30, 2026',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1128&q=80',
      link: '#',
    },
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 text-left">
          Activities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-48 object-cover" 
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-sm text-gray-500">{activity.date}</p>
                <h3 className="text-base font-semibold text-gray-900 mt-2 line-clamp-2">
                  {activity.title}
                </h3>
                <div className="mt-auto pt-4">
                  <a href={activity.link} className="text-red-600 font-semibold inline-block hover:underline">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="border border-gray-400 px-8 py-2.5 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition-colors">
            More Activities
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;
