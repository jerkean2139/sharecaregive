import { useState, useEffect } from 'react';

interface CalendarPopupProps {
  isOpen: boolean;
  onClose: () => void;
  embedCode?: string;
}

export function CalendarPopup({ isOpen, onClose, embedCode }: CalendarPopupProps) {
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

  // Placeholder embed code until the actual one is provided
  const defaultEmbedCode = '<iframe src="https://calendly.com/placeholder/15min" width="100%" height="600" frameborder="0"></iframe>';
  const calendarEmbed = embedCode || defaultEmbedCode;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Schedule Your Free Assessment</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            title="Close"
            aria-label="Close calendar popup"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <div dangerouslySetInnerHTML={{ __html: calendarEmbed }} />
        </div>
      </div>
    </div>
  );
}
