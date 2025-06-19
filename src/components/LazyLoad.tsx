import { ReactNode, useEffect, useRef, useState } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  placeholder?: ReactNode;
  threshold?: number;
}

export function LazyLoad({ 
  children, 
  placeholder = <div className="h-96 bg-gray-100 animate-pulse rounded-xl"></div>,
  threshold = 0.1
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current; // Store ref value in a variable
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the component is visible, set isVisible to true
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it's visible, we don't need to observe anymore
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold // percentage of the element that needs to be visible
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div ref={ref}>
      {isVisible ? children : placeholder}
    </div>
  );
}
