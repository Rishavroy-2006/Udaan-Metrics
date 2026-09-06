import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Info, ChevronRight } from 'lucide-react';

export default function MoreMenuTab() {
  const menuItems = [
    { name: 'Methodology', path: '/methodology', icon: BookOpen, description: 'How we calculate the index' },
    { name: 'About', path: '/about', icon: Info, description: 'Project background & team' },
  ];

  return (
    <div className="flex-1 bg-gray-50 flex flex-col p-4 md:p-8">
      <div className="max-w-2xl w-full mx-auto">
        <h2 className="text-2xl font-bold font-serif mb-6 text-navy">More Options</h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {menuItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center p-4 hover:bg-blue-50 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                <item.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <ChevronRight className="text-gray-400" size={20} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
