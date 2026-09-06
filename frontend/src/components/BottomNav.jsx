import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Landmark, Activity, Menu } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/', icon: Home },
    { name: 'Citizen', path: '/citizen-portal', icon: Users },
    { name: 'Gov', path: '/gov-portal', icon: Landmark },
    { name: 'Live Data', path: '/live-data', icon: Activity },
    { name: 'More', path: '/more', icon: Menu },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 py-2 flex justify-between items-center shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || 
                         (item.path === '/more' && (location.pathname === '/methodology' || location.pathname === '/about'));
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            to={item.path}
            className="flex flex-col items-center justify-center w-full min-h-[44px]"
            aria-label={item.name}
          >
            <div className={`p-1 rounded-full transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
