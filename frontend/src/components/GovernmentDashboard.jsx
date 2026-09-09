import React from 'react';
import { motion } from 'motion/react';
import { Shield, FileCheck } from 'lucide-react';
import ProtectedRoute from './gov/ProtectedRoute.jsx';
import NationalTrendChart from './gov/NationalTrendChart.jsx';
import ProvenancePanel from './gov/ProvenancePanel.jsx';
import ContributionBreakdown from './gov/ContributionBreakdown.jsx';
import RouteHeatmap from './gov/RouteHeatmap.jsx';

/**
 * GovernmentDashboard — Main container for the MoSPI / DGCA Policy Portal
 *
 * Answers: "What is airfare inflation doing, and why?"
 */

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const GovernmentDashboard = () => {
  return (
    <ProtectedRoute>
      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 space-y-8"
      >

        {/* Portal Header */}
        <div className="border-b border-border pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-navy text-white font-mono text-xs px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-3 h-3" /> Gov Portal
                </span>
                <span className="bg-saffron/10 text-saffron font-sans text-xs px-3 py-1.5 rounded-full border border-saffron/20 uppercase tracking-wider font-bold">
                  Prototype
                </span>
              </div>
              <h2 className="font-serif text-4xl text-navy font-bold drop-shadow-sm">
                MoSPI Airfare Inflation Intelligence
              </h2>
              <p className="font-sans text-base text-textSecondary mt-2">
                Real-time DGCA-weighted index, route-level decomposition, and data provenance audit
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-sans text-textSecondary bg-white border border-border px-3 py-2 rounded-lg shadow-sm">
              <FileCheck className="w-4 h-4 text-green" />
              Audit-logged session (demo mode)
            </div>
          </div>
        </div>

        {/* 1. National Trend */}
        <NationalTrendChart />

        {/* 2. Data Provenance */}
        <ProvenancePanel />

        {/* 3. Route Contribution */}
        <ContributionBreakdown />

        {/* 4. Route Heatmap + Volatility Signals */}
        <RouteHeatmap />

        {/* Footer Note */}
        <div className="text-xs font-sans text-textSecondary border-t border-border pt-4 flex flex-col md:flex-row justify-between gap-2">
          <span>
            Udaan Metrics Government Portal &middot; SIH Problem Statement 26056 &middot; Submitted to MoSPI
          </span>
          <span className="italic">
            Data refreshed daily via automated scraping pipeline &middot; Weights pending official DGCA traffic report
          </span>
        </div>

      </motion.div>
    </ProtectedRoute>
  );
};

export default GovernmentDashboard;
