import { Link } from 'react-router-dom';
import type { Location } from '../types';

interface LocationCardProps {
  location: Location;
  onClick: (location: Location) => void;
}

export function LocationCard({ location, onClick }: LocationCardProps) {
  const getStateIcon = (state: string) => {
    switch (state.toLowerCase()) {
      case 'arkansas':
        return '/images/states/arkansas.svg';
      case 'texas':
        return '/images/states/texas.svg';
      default:
        return '';
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:translate-y-[-5px]"
      onClick={() => onClick(location)}
    >
      <div className="p-6 flex items-center">
        <div className="w-16 h-16 mr-4 flex-shrink-0">
          <img 
            src={getStateIcon(location.state)} 
            alt={`${location.state} outline`} 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{location.city}</h3>
          <p className="text-gray-600">{location.state}</p>
          <Link 
            to={`/community/${location.id}`}
            className="inline-flex items-center mt-2 text-sm font-medium text-[#00304f] hover:text-[#69932f]"
            onClick={(e) => e.stopPropagation()}
          >
            View Community
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
