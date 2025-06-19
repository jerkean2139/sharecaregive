import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/variables.css';

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 bg-white ${scrolled ? 'shadow-md' : 'shadow-sm'} transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="/images/logo.jpeg" 
                alt="Share Care Give Logo" 
                className="h-16 sm:h-24 md:h-32 lg:h-40 w-auto mt-6 sm:mt-7 md:mt-8 lg:mt-9"
              />
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link
                to="/swipe-it-forward"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/swipe-it-forward')
                    ? 'border-[#69932f] text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } transition-colors duration-200`}
                aria-current={isActive('/swipe-it-forward') ? "page" : "false"}
              >
                Swipe It Forward
              </Link>
              <Link
                to="/share-care-give"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/share-care-give')
                    ? 'border-[#00304f] text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } transition-colors duration-200`}
                aria-current={isActive('/share-care-give') ? "page" : "false"}
              >
                Share Care Give
              </Link>
              <a 
                href="#contact"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors duration-200"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00304f]"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden animate-fadeIn`}
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1 border-t border-gray-200">
          <Link
            to="/swipe-it-forward"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/swipe-it-forward')
                ? 'border-[#69932f] text-[#69932f] bg-[#69932f]/10'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
            aria-current={isActive('/swipe-it-forward') ? "page" : "false"}
          >
            Swipe It Forward
          </Link>
          <Link
            to="/share-care-give"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/share-care-give')
                ? 'border-[#00304f] text-[#00304f] bg-[#00304f]/10'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
            aria-current={isActive('/share-care-give') ? "page" : "false"}
          >
            Share Care Give
          </Link>
          <a 
            href="#contact"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}