import React, { useState } from 'react';

const docData = [
  {
    id: 1,
    title: "Getting Started",
    category: "Basics",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    description: "Welcome to the Learn App. This guide will walk you through the initial setup and basic navigation to help you get up and running quickly. You will learn how to configure your workspace and navigate the main dashboard."
  },
  {
    id: 2,
    title: "User Profile Setup",
    category: "Basics",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
    description: "Learn how to customize your user profile, update your avatar, and manage your personal settings for a better experience. Keeping your profile updated helps your team know more about your role and responsibilities."
  },
  {
    id: 3,
    title: "Core Concepts",
    category: "Basics",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    description: "Understand the fundamental concepts of our platform, including how data flows and the main terminology we use. This foundational knowledge is critical for making the most out of our advanced features."
  },
  {
    id: 4,
    title: "Advanced Search",
    category: "Features",
    imageUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1000&auto=format&fit=crop",
    description: "Discover how to use advanced search filters, regular expressions, and saved queries to find exactly what you're looking for in seconds. You can easily drill down into massive datasets."
  },
  {
    id: 5,
    title: "Real-time Collaboration",
    category: "Features",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    description: "Work together with your team in real-time. This feature allows multiple users to edit and review documents simultaneously, complete with live cursors and in-line comment threads."
  },
  {
    id: 6,
    title: "Analytics Dashboard",
    category: "Features",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    description: "Track your progress and monitor usage statistics with our built-in interactive analytics dashboard. You can export these reports directly to CSV or PDF for your next stakeholder meeting."
  },
  {
    id: 7,
    title: "API Documentation",
    category: "Resources",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    description: "Integrate our platform with your own tools. Explore our comprehensive REST API documentation and code examples. We offer SDKs in Python, Node.js, and Go to streamline your development process."
  },
  {
    id: 8,
    title: "Community Guidelines",
    category: "Resources",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop",
    description: "Read our community guidelines to understand the rules and best practices for interacting with other members of the platform. We strive to maintain a welcoming, inclusive, and professional environment."
  }
];

export default function LearnAppDoc() {
  const [activeItem, setActiveItem] = useState(docData[0]);

  // Group items by category to render them logically in the sidebar
  const groupedData = docData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Main Container */}
      <div className="flex flex-col md:flex-row min-h-[600px] border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
        
        {/* Left Sidebar (25%) */}
        <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 flex flex-col shrink-0">
          <div className="p-6 border-b border-slate-200 bg-white">
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Documentation</h2>
          </div>
          <div className="overflow-y-auto p-4 flex-grow">
            {Object.keys(groupedData).map(category => (
              <div key={category} className="mb-6">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-3 px-3">
                  {category}
                </h3>
                <ul className="space-y-1">
                  {groupedData[category].map(item => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveItem(item)}
                        className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 outline-none ${
                          activeItem.id === item.id
                            ? 'bg-red-50 text-red-600 shadow-sm'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content Area (75%) */}
        <div className="w-full md:w-3/4 p-6 md:p-12 bg-white flex flex-col">
          <div className="max-w-4xl w-full mx-auto">
            
            {/* Header section */}
            <div className="mb-8">
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-red-600 mb-3">
                {activeItem.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                {activeItem.title}
              </h1>
            </div>
            
            {/* Image section */}
            <div className="mb-10 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-100">
              <img 
                src={activeItem.imageUrl} 
                alt={activeItem.title} 
                className="w-full h-auto object-cover aspect-video hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            
            {/* Description section */}
            <div className="prose prose-slate prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed">
                {activeItem.description}
              </p>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}
