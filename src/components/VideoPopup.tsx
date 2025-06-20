
import React, { useState, useEffect } from 'react';

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  onBookCall: () => void;
}

export function VideoPopup({ isOpen, onClose, videoUrl, onBookCall }: VideoPopupProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Prevent body scrolling when popup is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !isMounted) return null;

  const handleBookCall = () => {
    onClose();
    onBookCall();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Watch Our Story</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            title="Close"
            aria-label="Close video popup"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {/* Video Container */}
          <div className="video-container mb-6">
            <video
              className="video-iframe"
              src={videoUrl}
              controls
              autoPlay
              playsInline
            />
          </div>
          
          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-[#00304f] to-[#69932f] text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="mb-4 text-sm opacity-90">
              Schedule a free consultation to learn how your organization can benefit from our platform.
            </p>
            <button
              onClick={handleBookCall}
              className="bg-white text-[#00304f] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
              Book Your Free Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
