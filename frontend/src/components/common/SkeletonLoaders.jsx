import React from 'react';
import { motion } from 'motion/react';

const shimmer = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: {
      repeat: Infinity,
      ease: 'linear',
      duration: 1.5,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export const SkeletonBase = ({ className = "" }) => (
  <div className={`relative overflow-hidden bg-gray-200 rounded-sm ${className}`}>
    <motion.div
      className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-r from-transparent via-white/50 to-transparent"
      initial="initial"
      animate="animate"
      variants={shimmer}
    />
  </div>
);

export const SkeletonText = ({ className = "h-4 w-1/3", lines = 1 }) => (
  <div className="space-y-2">
    {[...Array(lines)].map((_, i) => (
      <SkeletonBase key={i} className={`${className} ${i === lines - 1 && lines > 1 ? 'w-2/3' : 'w-full'}`} />
    ))}
  </div>
);

export const SkeletonCard = ({ height = "h-24" }) => (
  <motion.div variants={itemVariants} className={`border border-border bg-white p-4 flex flex-col gap-3 ${height}`}>
    <SkeletonBase className="h-3 w-1/2" />
    <SkeletonBase className="h-8 w-3/4 mt-auto" />
  </motion.div>
);

export const SkeletonChart = ({ height = "h-72", title = true }) => (
  <motion.div variants={itemVariants} initial="hidden" animate="show" className="bg-white border border-border p-6 flex flex-col gap-4">
    {title && (
      <div>
        <SkeletonBase className="h-5 w-1/4 mb-2" />
        <SkeletonBase className="h-3 w-1/3" />
      </div>
    )}
    <SkeletonBase className={`w-full ${height}`} />
  </motion.div>
);

export const SkeletonPage = () => (
  <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-12 space-y-6 md:space-y-12 w-full">
    <motion.div variants={itemVariants} className="border border-border bg-white p-5 md:p-8 flex flex-col md:flex-row gap-6 justify-between">
      <div className="w-full max-w-md space-y-4">
        <SkeletonBase className="h-4 w-1/3" />
        <SkeletonBase className="h-16 w-3/4" />
        <SkeletonBase className="h-3 w-full" />
      </div>
    </motion.div>
    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SkeletonCard height="h-32" />
      <SkeletonCard height="h-32" />
      <SkeletonCard height="h-32" />
    </motion.div>
    <SkeletonChart height="h-96" title={false} />
  </motion.div>
);

export const SkeletonGovPortal = () => (
  <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 space-y-6 md:space-y-8 w-full">
    <motion.div variants={itemVariants} className="border-b border-border pb-6 space-y-4">
      <SkeletonBase className="h-6 w-32" />
      <SkeletonBase className="h-10 w-2/3 md:w-1/3" />
      <SkeletonBase className="h-4 w-full md:w-1/2" />
    </motion.div>
    <SkeletonChart height="h-72" />
    <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {[...Array(6)].map((_, i) => <SkeletonCard key={i} height="h-28" />)}
    </motion.div>
    <SkeletonChart height="h-64" />
    <SkeletonChart height="h-[28rem]" />
  </motion.div>
);

export const SkeletonCitizenPortal = () => (
  <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-8 space-y-6 md:space-y-8 w-full">
    <motion.div variants={itemVariants} className="border-b border-border pb-6 space-y-4">
      <SkeletonBase className="h-6 w-32" />
      <SkeletonBase className="h-10 w-2/3 md:w-1/3" />
      <SkeletonBase className="h-4 w-full md:w-1/2" />
    </motion.div>
    <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6">
      <SkeletonBase className="h-24 w-full md:w-2/3" />
      <SkeletonBase className="h-24 w-full md:w-1/3" />
    </motion.div>
    <SkeletonChart height="h-64" />
    <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[...Array(4)].map((_, i) => <SkeletonCard key={i} height="h-24" />)}
    </motion.div>
  </motion.div>
);

export const SkeletonLiveData = () => (
  <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 space-y-6 md:space-y-8 w-full">
    <motion.div variants={itemVariants} className="border-b border-border pb-6 space-y-4">
      <SkeletonBase className="h-6 w-32" />
      <SkeletonBase className="h-10 w-2/3 md:w-1/3" />
      <SkeletonBase className="h-4 w-full md:w-1/2" />
    </motion.div>
    <motion.div variants={itemVariants} className="flex gap-4 mb-4">
      <SkeletonBase className="h-10 w-40" />
      <SkeletonBase className="h-10 w-40" />
    </motion.div>
    <SkeletonChart height="h-96" title={false} />
  </motion.div>
);
