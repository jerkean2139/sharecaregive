import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/animations.css';
import '../styles/carousel.css';

interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
}

interface PartnerCarouselProps {
  partners: Partner[];
  title: string;
}

export function PartnerCarousel({ partners, title }: PartnerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Responsive number of visible partners based on screen size
  const [visiblePartners, setVisiblePartners] = useState(3);
  const totalSlides = Math.ceil(partners.length / visiblePartners);
  
  // Update visible partners count based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisiblePartners(1);
      } else if (window.innerWidth < 1024) {
        setVisiblePartners(2);
      } else {
        setVisiblePartners(3);
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [isAnimating, totalSlides]);
  
  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [isAnimating, totalSlides]);
  
  // Auto advance carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentIndex, goToNext]);
  
  // Reset animation state after transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isAnimating]);
  
  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNext();
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right
      goToPrev();
    }
  };
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-[#00304f] mb-4">{title}</h3>
      
      <div className="relative">
        <div 
          ref={carouselRef}
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="carousel-container"
            data-position={currentIndex}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="carousel-slide">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {partners
                    .slice(
                      slideIndex * visiblePartners, 
                      slideIndex * visiblePartners + visiblePartners
                    )
                    .map((partner) => (
                      <div 
                        key={partner.id} 
                        className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg"
                      >
                        <div className="p-4">
                          <div className="flex items-center mb-3">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-md overflow-hidden mr-3 flex-shrink-0">
                              <img 
                                src={partner.logo} 
                                alt={partner.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-sm sm:text-base">{partner.name}</h4>
                              <a 
                                href={partner.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs sm:text-sm text-[#69932f] hover:underline"
                              >
                                Visit Website
                              </a>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-700">{partner.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation arrows - hidden on small screens */}
        {partners.length > visiblePartners && (
          <>
            <button 
              onClick={goToPrev}
              className="hidden sm:flex absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 w-10 h-10 rounded-full bg-white shadow-md items-center justify-center text-gray-600 hover:text-[#00304f] focus:outline-none z-10"
              disabled={isAnimating}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={goToNext}
              className="hidden sm:flex absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 w-10 h-10 rounded-full bg-white shadow-md items-center justify-center text-gray-600 hover:text-[#00304f] focus:outline-none z-10"
              disabled={isAnimating}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
        
        {/* Pagination dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 mx-1 rounded-full focus:outline-none ${
                  currentIndex === index ? 'bg-[#00304f]' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
