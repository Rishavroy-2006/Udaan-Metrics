import React from 'react';
import { Github, FileText, Database } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-white mt-12 py-8 px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-sans text-textSecondary text-center md:text-left relative z-10">
      <div className="flex flex-col items-center md:items-start gap-1">
        <div className="font-serif font-bold text-navy text-xl leading-none whitespace-nowrap drop-shadow-sm">Udaan Metrics</div>
        <div className="text-xs">&copy; 2026 SIH Prototype</div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        <a href="#" className="flex items-center gap-2 hover:text-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy group">
          <Github className="w-4 h-4 group-hover:scale-110 transition-transform" /> GitHub Repository
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy group">
          <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" /> Problem Statement 26056
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy group">
          <Database className="w-4 h-4 group-hover:scale-110 transition-transform" /> Data Sources
        </a>
      </div>
      <div className="text-xs max-w-xs md:text-right">
        Built for Smart India Hackathon &middot; Submitted to MoSPI
      </div>
    </footer>
  );
};

export default Footer;
