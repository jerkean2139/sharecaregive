import { useState, useEffect, useRef, useCallback } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, testimonials.length]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, testimonials.length]);

  useEffect(() => {
    // Auto-advance the testimonials
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 8000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [goToNext]);

  // Reset timer when manually navigating
  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        goToNext();
      }, 8000);
    }
  }, [goToNext]);

  const handlePrev = useCallback(() => {
    goToPrev();
    resetInterval();
  }, [goToPrev, resetInterval]);

  const handleNext = useCallback(() => {
    goToNext();
    resetInterval();
  }, [goToNext, resetInterval]);

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-xl shadow-md">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#00304f] mb-8">
          What Our Partners Say
        </h2>
        
        <div className="relative overflow-hidden">
          <div 
            className={`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
            aria-live="polite"
          >
            <div className="flex flex-col items-center text-center">
              {testimonials[currentIndex].image && (
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
              )}
              <div className="text-xl italic mb-6 text-gray-700">"{testimonials[currentIndex].content}"</div>
              <div className="font-bold text-[#00304f]">{testimonials[currentIndex].name}</div>
              <div className="text-sm text-gray-600">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  resetInterval();
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#00304f] w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
          
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={handlePrev}
              className="bg-white rounded-full p-1 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00304f]"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={handleNext}
              className="bg-white rounded-full p-1 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00304f]"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
