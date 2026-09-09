import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Landmark, Activity, Menu } from 'lucide-react';
import { motion } from 'motion/react';

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
    <div className="md:hidden fixed bottom-0 left-0 right-0 glass z-50 px-2 py-2 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)] border-t border-white/20">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || 
                         (item.path === '/more' && (location.pathname === '/methodology' || location.pathname === '/about'));
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            to={item.path}
            className="flex flex-col items-center justify-center w-full min-h-[44px] relative group"
            aria-label={item.name}
          >
            <div className={`p-2 rounded-2xl transition-all duration-300 relative z-10 ${isActive ? 'text-navy' : 'text-gray-500 group-hover:text-navy'}`}>
              {isActive && (
                <motion.div 
                  layoutId="bottom-nav-active" 
                  className="absolute inset-0 bg-navy/10 rounded-2xl -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              )}
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'animate-pulse' : ''} />
            </div>
            <span className={`text-[10px] mt-1 font-semibold transition-colors ${isActive ? 'text-navy' : 'text-gray-500'}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
