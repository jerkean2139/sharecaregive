import React, { useRef, useEffect, useState } from 'react';
import '../styles/animations.css';
import '../styles/video-hero.css';

interface VideoHeroProps {
  pageName?: 'share-care-give' | 'swipe-it-forward';
}

export const VideoHero: React.FC<VideoHeroProps> = ({ pageName = 'share-care-give' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const videoSources = {
    'share-care-give': 'https://storage.googleapis.com/msgsndr/8XkoyELbiXSbGW3Km2v9/media/674f2d924c5990381abfa668.mp4',
    'swipe-it-forward': 'https://storage.googleapis.com/msgsndr/8XkoyELbiXSbGW3Km2v9/media/673e3d6205ed2422a685fbb1.mp4'
  };

  const headlines = {
    'share-care-give': 'Empower Your Non-Profit with Share Care Give',
    'swipe-it-forward': 'Turn Every Swipe Into Community Impact'
  };

  const subheadlines = {
    'share-care-give': 'Create sustainable funding streams through community partnerships',
    'swipe-it-forward': 'Watch how businesses redirect credit card fees to local causes — at zero extra cost!'
  };

  const backgroundColors = {
    'share-care-give': 'bg-[#00304f]',
    'swipe-it-forward': 'bg-[#69932f]'
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoLoaded = () => {
        setIsVideoLoaded(true);
      };

      video.addEventListener('loadeddata', handleVideoLoaded);

      // If video is already loaded
      if (video.readyState >= 3) {
        setIsVideoLoaded(true);
      }

      return () => {
        video.removeEventListener('loadeddata', handleVideoLoaded);
      };
    }
  }, []);

  // Scroll to main video section
  const scrollToMainVideo = () => {
    const videoSection = document.getElementById('main-video-section');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] overflow-hidden ${backgroundColors[pageName]}`}>
      {/* Video Background */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          src={videoSources[pageName]}
          muted={true}
          loop
          playsInline
          autoPlay
          poster={`/images/${pageName}-poster.jpg`}
        />
      </div>

      {/* Loading placeholder */}
      <div className={`absolute inset-0 bg-gradient-to-r ${pageName === 'share-care-give' ? 'from-[#002538] to-[#00304f]' : 'from-[#557624] to-[#69932f]'} transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-overlay"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-8 py-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-center max-w-[90%] md:max-w-[80%] animate-fadeIn pb-1">
          {headlines[pageName]}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-md md:max-w-2xl text-center mb-6 sm:mb-8 animate-slideUp">
          {subheadlines[pageName]}
        </p>

        {/* Video Control - Play Button Only */}
        <button 
          className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center gap-2 group animate-fadeIn hover:scale-105 transform transition-transform duration-300"
          onClick={scrollToMainVideo}
          aria-label="Watch video"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#c9f24d] transition-colors">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span className="font-medium text-sm sm:text-base">Watch Video</span>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-70">
          <path d="M12 5v14"></path>
          <path d="m19 12-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
};