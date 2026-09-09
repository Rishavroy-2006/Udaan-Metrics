import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Radio } from 'lucide-react';
import RouteSelector from './citizen/RouteSelector.jsx';
import FareTrajectoryChart from './citizen/FareTrajectoryChart.jsx';
import BookNowWaitSignal from './citizen/BookNowWaitSignal.jsx';
import AlertsSignup from './citizen/AlertsSignup.jsx';

/**
 * CitizenDashboard — Main container for the Citizen / Traveller Fare Intelligence Portal
 *
 * Answers: "Should I book now or wait?"
 */

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const CitizenDashboard = () => {
  const [selectedRoute, setSelectedRoute] = useState('DEL-BOM');

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-6 py-8 space-y-8"
    >

      {/* Portal Header */}
      <div className="border-b border-border pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-steel text-white font-mono text-xs px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider flex items-center gap-2">
                <Users className="w-3 h-3" /> Citizen Portal
              </span>
              <span className="bg-green/10 text-green font-sans text-xs px-3 py-1.5 rounded-full border border-green/20 uppercase tracking-wider font-bold flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse" /> Live Data
              </span>
            </div>
            <h2 className="font-serif text-4xl text-navy font-bold drop-shadow-sm">
              Personalized Airfare Trajectory & Decision Portal
            </h2>
            <p className="font-sans text-base text-textSecondary mt-2">
              Track route-level fare trajectories against historical baselines and know when to book.
            </p>
          </div>

          <div className="text-xs font-sans text-textSecondary bg-white border border-border px-4 py-2 rounded-lg shadow-sm">
            Active Corridor: <span className="font-mono text-navy font-bold text-sm ml-1">{selectedRoute}</span>
          </div>
        </div>
      </div>

      {/* 1. Corridor Selector */}
      <RouteSelector
        selectedRoute={selectedRoute}
        onSelectRoute={setSelectedRoute}
      />

      {/* 2. Traffic Light Book Now vs Wait Signal */}
      <BookNowWaitSignal
        selectedRoute={selectedRoute}
      />

      {/* 3. Fare Trajectory Chart + Seasonal Baseline Overlay */}
      <FareTrajectoryChart
        selectedRoute={selectedRoute}
      />

      {/* 4. Price Alert Subscription UI */}
      <AlertsSignup
        selectedRoute={selectedRoute}
      />


    </motion.div>
  );
};

export default CitizenDashboard;
