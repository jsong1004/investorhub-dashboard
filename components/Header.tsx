
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-dark shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center">
        {/* Placeholder for logo - could be an SVG or img tag */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brand-primary mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
        <h1 className="text-2xl font-bold text-white">InvestorHub</h1>
        <p className="text-sm text-gray-300 ml-4 mt-1">Your hub for smart, transparent investments</p>
      </div>
    </header>
  );
};

export default Header;
