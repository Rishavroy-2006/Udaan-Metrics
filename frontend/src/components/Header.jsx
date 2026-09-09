import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { SkeletonText } from './common/SkeletonLoaders.jsx';
import { LineChart, Users, Landmark, Activity, BookOpen, Info, PlaneTakeoff } from 'lucide-react';

const Header = ({ lastUpdated }) => {
  const location = useLocation();
  const tabs = [
    { name: 'Overview', path: '/', icon: <LineChart className="w-4 h-4" /> },
    { name: 'Citizen Portal', path: '/citizen-portal', icon: <Users className="w-4 h-4" /> },
    { name: 'Gov Portal', path: '/gov-portal', icon: <Landmark className="w-4 h-4" /> },
    { name: 'Live Data', path: '/live-data', icon: <Activity className="w-4 h-4" /> },
    { name: 'Methodology', path: '/methodology', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="glass-dark text-white px-6 py-4 flex flex-col md:flex-row md:items-center justify-between shadow-lg sticky top-0 z-50 gap-4 md:gap-0 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 w-full">
        <Link to="/" className="flex items-center gap-2 group focus:outline-none">
          <PlaneTakeoff className="w-7 h-7 text-saffron group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          <h1 className="font-serif text-2xl font-bold tracking-tight text-gradient-saffron">Udaan Metrics</h1>
        </Link>
        <nav className="hidden md:flex gap-2 overflow-x-auto pb-2 md:pb-0 items-center">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.name}
                to={tab.path}
                className={`relative py-2 px-4 rounded-full text-sm font-sans tracking-wide transition-colors focus:outline-none flex items-center gap-2 ${
                  isActive 
                    ? 'text-white font-medium' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="header-active-tab"
                    className="absolute inset-0 bg-white/20 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.icon} {tab.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="text-xs font-sans text-gray-300 flex items-center gap-2 whitespace-nowrap bg-black/20 px-3 py-1.5 rounded-full border border-white/10">
        <Activity className="w-3 h-3 text-green-400" />
        Data as of: {lastUpdated ? new Date(lastUpdated).toLocaleDateString() : <SkeletonText className="inline-block h-3 w-20 ml-1 align-middle" />}
      </div>
    </header>
  );
};

export default Header;
