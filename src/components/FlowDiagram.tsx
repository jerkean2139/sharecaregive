import React from 'react';
import { CreditCard, Building, DollarSign, Heart } from 'lucide-react';

interface FlowDiagramProps {
  type: 'swipe-it-forward' | 'share-care-give';
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({ type }) => {
  const colors = {
    primary: type === 'swipe-it-forward' ? '#00304f' : '#69932f',
    secondary: type === 'swipe-it-forward' ? '#69932f' : '#00304f',
    accent: type === 'swipe-it-forward' ? '#c9f24d' : '#c9f24d',
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-md mx-auto px-2 sm:px-0">
        {/* Flow Lines - Hidden on small screens, visible on larger screens */}
        <svg className="absolute inset-0 w-full h-full hidden sm:block" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M100,80 C100,140 300,140 300,200 C300,260 100,260 100,320" 
            stroke={colors.primary} 
            strokeWidth="3" 
            strokeDasharray="6 4"
            className="animate-pulse"
          />
          <path 
            d="M100,80 C100,140 300,140 300,200 C300,260 100,260 100,320" 
            stroke={colors.accent} 
            strokeWidth="1.5" 
            strokeDasharray="1 12"
          />
        </svg>

        {/* Mobile Flow Lines - Simplified vertical line for small screens */}
        <div className="absolute left-[22px] top-[40px] bottom-[40px] w-[2px] sm:hidden" 
             style={{ background: `linear-gradient(to bottom, ${colors.primary} 60%, ${colors.secondary} 40%)` }}>
        </div>

        {/* Step 1: Business */}
        <div className="relative z-10 flex items-center mb-10 sm:mb-16">
          <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white`} 
               style={{ backgroundColor: colors.primary }}>
            <Building size={20} className="sm:hidden" />
            <Building size={28} className="hidden sm:block" />
          </div>
          <div className="ml-3 sm:ml-4">
            <h4 className="font-bold text-base sm:text-lg">Business Signs Up</h4>
            <p className="text-xs sm:text-sm text-gray-600">Quick 15-minute assessment</p>
          </div>
        </div>

        {/* Step 2: Processing */}
        <div className="relative z-10 flex items-center mb-10 sm:mb-16 ml-0 sm:ml-20">
          <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white`}
               style={{ backgroundColor: colors.primary }}>
            <CreditCard size={20} className="sm:hidden" />
            <CreditCard size={28} className="hidden sm:block" />
          </div>
          <div className="ml-3 sm:ml-4">
            <h4 className="font-bold text-base sm:text-lg">Processing Switch</h4>
            <p className="text-xs sm:text-sm text-gray-600">Optimized payment processing</p>
          </div>
        </div>

        {/* Step 3: Redirection */}
        <div className="relative z-10 flex items-center mb-10 sm:mb-16">
          <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white`}
               style={{ backgroundColor: colors.secondary }}>
            <DollarSign size={20} className="sm:hidden" />
            <DollarSign size={28} className="hidden sm:block" />
          </div>
          <div className="ml-3 sm:ml-4">
            <h4 className="font-bold text-base sm:text-lg">Fee Redirection</h4>
            <p className="text-xs sm:text-sm text-gray-600">Automatic community support</p>
          </div>
        </div>

        {/* Step 4: Non-Profit */}
        <div className="relative z-10 flex items-center ml-0 sm:ml-20">
          <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white`}
               style={{ backgroundColor: colors.secondary }}>
            <Heart size={20} className="sm:hidden" />
            <Heart size={28} className="hidden sm:block" />
          </div>
          <div className="ml-3 sm:ml-4">
            <h4 className="font-bold text-base sm:text-lg">Community Impact</h4>
            <p className="text-xs sm:text-sm text-gray-600">Sustainable funding stream</p>
          </div>
        </div>

        {/* Animated Dots - Hidden on mobile */}
        <div className="absolute top-[80px] left-[100px] w-3 h-3 rounded-full bg-white border-2 border-[#c9f24d] animate-ping hidden sm:block"></div>
        <div className="absolute top-[200px] left-[300px] w-3 h-3 rounded-full bg-white border-2 border-[#c9f24d] animate-ping hidden sm:block" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[320px] left-[100px] w-3 h-3 rounded-full bg-white border-2 border-[#c9f24d] animate-ping hidden sm:block" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};
