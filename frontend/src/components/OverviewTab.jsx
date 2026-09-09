import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { SkeletonPage } from './common/SkeletonLoaders.jsx';
import { Plane, CalendarDays, Timer, ArrowRight, Quote } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const StatCard = ({ label, value, icon }) => (
  <motion.div variants={itemVariants} className="glass p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl border-t-4 border-t-navy group">
    <div className="flex justify-between items-start mb-6">
      <div className="text-textSecondary text-xs uppercase tracking-wider font-sans font-semibold">{label}</div>
      <div className="p-2 bg-navy/5 rounded-full text-navy group-hover:scale-110 group-hover:bg-navy/10 transition-transform">
        {icon}
      </div>
    </div>
    <div className="font-mono text-4xl text-navy tabular-nums text-right">{value}</div>
  </motion.div>
);

const OverviewTab = ({ indexData }) => {
  const navigate = useNavigate();
  if (!indexData) return <SkeletonPage />;

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-6 py-12 space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
    >
      
      {/* Headline Stat Card */}
      <motion.div variants={itemVariants} className="glass p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-end shadow-lg relative overflow-hidden">
        <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
          <Plane className="w-96 h-96" />
        </div>
        <div className="relative z-10">
          <div className="text-xs font-sans text-saffron font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Udaan Metrics Today
          </div>
          <div className="flex items-baseline gap-4 flex-wrap">
            <h2 className="font-serif text-7xl font-bold text-navy drop-shadow-sm">{indexData.value}</h2>
            <span className="font-mono text-xs font-bold uppercase bg-navy text-white px-3 py-1.5 rounded-full shadow-inner">
              Live Data (Provisional)
            </span>
          </div>
          <p className="font-sans text-sm text-textSecondary mt-6 bg-white/50 inline-block px-4 py-2 rounded-lg border border-border/50">
            Monitoring <strong className="text-navy">{indexData.carriers.length}</strong> Carriers across <strong className="text-navy">{indexData.routes_tracked}</strong> Routes &middot; <strong className="text-navy">{indexData.days_live}</strong> Days of Live Data
          </p>
        </div>
      </motion.div>

      {/* Problem Paragraph */}
      <motion.p variants={itemVariants} className="font-sans text-xl leading-relaxed text-textPrimary max-w-4xl border-l-4 border-navy pl-6 py-2">
        India's CPI still relies on periodic manual checks for airfares, failing to capture extreme intra-day volatility. <strong className="text-navy">Udaan Metrics</strong> scrapes real carrier fares daily to compute an accurate, real-time index.
      </motion.p>

      {/* Stat Row */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Routes Tracked" value={indexData.routes_tracked} icon={<Plane className="w-5 h-5" />} />
        <StatCard label="Days of Live Collection" value={indexData.days_live} icon={<CalendarDays className="w-5 h-5" />} />
        <StatCard label="Advance-Purchase Windows" value={indexData.advance_windows} icon={<Timer className="w-5 h-5" />} />
      </motion.div>

      {/* Pull Quote */}
      <motion.blockquote variants={itemVariants} className="relative glass p-8 rounded-xl my-12 shadow-md">
        <Quote className="absolute top-4 left-4 w-12 h-12 text-saffron/20 -z-10" />
        <p className="font-serif italic text-lg leading-relaxed text-navy max-w-4xl relative z-10">
          "Right now, India's official inflation number treats airfares like it's still 2005 — a few manual price checks a month, even though fares swing 300% in a single day. The Laspeyres-style index computation engine is fully built and actively weights routes against a configuration file. For this demo, the file is populated with estimated placeholder weights. In production, MoSPI would populate this config with exact passenger-volume figures from official DGCA traffic reports to yield the verified index."
        </p>
      </motion.blockquote>

      {/* Link to Live Data */}
      <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
        <button 
          onClick={() => navigate('/live-data')}
          className="font-sans bg-navy text-white font-semibold hover:bg-steel transition-colors group flex items-center gap-3 py-4 px-8 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-saffron/50"
        >
          See the live pipeline <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
      
    </motion.div>
  );
};

export default OverviewTab;
