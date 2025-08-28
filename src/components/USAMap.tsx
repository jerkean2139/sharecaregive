import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import type { Location } from '../types';
import { ActivMap } from './ActivMap';
import { SimpleMap } from './SimpleMap';

interface USAMapProps {
  locations: Location[];
  onLocationClick: (location: Location) => void;
}

const states = {
  AL: { name: 'Alabama', coords: '680,350' },
  AK: { name: 'Alaska', coords: '150,500' },
  AZ: { name: 'Arizona', coords: '200,300' },
  AR: { name: 'Arkansas', coords: '550,320' },
  CA: { name: 'California', coords: '100,270' },
  CO: { name: 'Colorado', coords: '300,250' },
  CT: { name: 'Connecticut', coords: '850,170' },
  DE: { name: 'Delaware', coords: '820,220' },
  FL: { name: 'Florida', coords: '700,420' },
  GA: { name: 'Georgia', coords: '700,350' },
  HI: { name: 'Hawaii', coords: '250,450' },
  ID: { name: 'Idaho', coords: '200,150' },
  IL: { name: 'Illinois', coords: '580,250' },
  IN: { name: 'Indiana', coords: '620,240' },
  IA: { name: 'Iowa', coords: '520,220' },
  KS: { name: 'Kansas', coords: '450,280' },
  KY: { name: 'Kentucky', coords: '650,270' },
  LA: { name: 'Louisiana', coords: '550,380' },
  ME: { name: 'Maine', coords: '870,120' },
  MD: { name: 'Maryland', coords: '800,230' },
  MA: { name: 'Massachusetts', coords: '850,160' },
  MI: { name: 'Michigan', coords: '620,180' },
  MN: { name: 'Minnesota', coords: '520,150' },
  MS: { name: 'Mississippi', coords: '600,350' },
  MO: { name: 'Missouri', coords: '520,270' },
  MT: { name: 'Montana', coords: '300,120' },
  NE: { name: 'Nebraska', coords: '420,230' },
  NV: { name: 'Nevada', coords: '150,220' },
  NH: { name: 'New Hampshire', coords: '850,140' },
  NJ: { name: 'New Jersey', coords: '820,200' },
  NM: { name: 'New Mexico', coords: '300,320' },
  NY: { name: 'New York', coords: '800,160' },
  NC: { name: 'North Carolina', coords: '750,300' },
  ND: { name: 'North Dakota', coords: '420,120' },
  OH: { name: 'Ohio', coords: '670,230' },
  OK: { name: 'Oklahoma', coords: '450,320' },
  OR: { name: 'Oregon', coords: '120,150' },
  PA: { name: 'Pennsylvania', coords: '750,200' },
  RI: { name: 'Rhode Island', coords: '870,170' },
  SC: { name: 'South Carolina', coords: '720,320' },
  SD: { name: 'South Dakota', coords: '420,170' },
  TN: { name: 'Tennessee', coords: '650,300' },
  TX: { name: 'Texas', coords: '400,370' },
  UT: { name: 'Utah', coords: '220,250' },
  VT: { name: 'Vermont', coords: '830,140' },
  VA: { name: 'Virginia', coords: '750,260' },
  WA: { name: 'Washington', coords: '150,100' },
  WV: { name: 'West Virginia', coords: '720,250' },
  WI: { name: 'Wisconsin', coords: '550,170' },
  WY: { name: 'Wyoming', coords: '300,180' }
};

// Helper function to find state code by name
const getStateCodeByName = (stateName: string): string | null => {
  const entry = Object.entries(states).find(([_, state]) => state.name === stateName);
  return entry ? entry[0] : null;
};

const programStates = ['Arkansas', 'Texas']

const generateStateColor = (stateName: string) => {
  // Create consistent hue from state name hash
  const hash = stateName.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;

  // Use a more consistent color scheme for program states
  if (programStates.includes(stateName)) {
    return '#e6f2ff'; // Light blue for program states
  }

  return `hsl(${hue}, 70%, 85%)`; // Light pastel colors for other states
};

const locations = [
  { 
    name: 'Conway, AR', 
    coordinates: [-92.4426, 35.0887] as [number, number],
    url: '/locations/conway-arkansas',
    state: 'Arkansas'
  },
  { 
    name: 'Amarillo, TX', 
    coordinates: [-101.8313, 35.2220] as [number, number],
    url: '/locations/amarillo-texas',
    state: 'Texas'
  }
]

// ErrorBoundary component to catch errors during rendering
class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Caught error in ErrorBoundary: ", error, errorInfo);
    // Switch to simple map
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      // Return null to let parent handle fallback
      return null;
    }

    return this.props.children; 
  }
}


export function USAMap({ locations: propsLocations, onLocationClick }: USAMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [clickedLocation, setClickedLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [useSimpleMap, setUseSimpleMap] = useState(false); // Fallback to simple map

  // Filter locations based on search query
  const filteredLocations = useMemo(() => {
    if (!searchQuery) return propsLocations;

    const query = searchQuery.toLowerCase();
    return propsLocations.filter(location => 
      location.city.toLowerCase().includes(query) || 
      location.state.toLowerCase().includes(query)
    );
  }, [propsLocations, searchQuery]);

  const handleStateClick = (stateCode: string) => {
    // Toggle selected state
    if (selectedState === stateCode) {
      setSelectedState(null);
    } else {
      setSelectedState(stateCode);

      // Filter locations by the selected state
      const stateName = states[stateCode as keyof typeof states].name;
      const stateLocations = propsLocations.filter(loc => loc.state === stateName);

      if (stateLocations.length === 1) {
        // If only one location in this state, navigate directly to it
        onLocationClick(stateLocations[0]);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredState) {
      setTooltipPosition({
        x: e.clientX,
        y: e.clientY - 40
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
    setTooltipPosition(null);
  };

  const handleMarkerClick = (location: typeof locations[0]) => {
    // Find the corresponding location in our data
    const matchingLocation = propsLocations.find(
      loc => loc.city === location.name.split(',')[0] && 
             loc.state === location.state
    );

    if (matchingLocation) {
      setClickedLocation(location.name);

      // Simulate click animation
      setTimeout(() => {
        setClickedLocation(null);
        onLocationClick(matchingLocation);
      }, 300);
    }
  };

  // Transform locations for ActivMap
  const activMapLocations = filteredLocations.map(location => ({
    id: location.id,
    title: `${location.city}, ${location.state}`,
    address: `${location.city}, ${location.state}`,
    phone: '',
    url: `#/community/${location.id}`,
    tags: ['nonprofit'],
    lat: location.latitude,
    lng: location.longitude,
    img: '/activmap.2.1.2/images/thumb.png',
    icon: '/activmap.2.1.2/images/icons/marker-star.png'
  }));

  // Remove this effect since we don't need to set locations anymore
  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading map...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="w-full">
      {useSimpleMap ? (
        <SimpleMap 
          locations={activMapLocations}
          onLocationClick={(location) => {
            const originalLocation = propsLocations.find(loc => loc.id === location.id);
            if (originalLocation) {
              onLocationClick(originalLocation);
            }
          }}
        />
      ) : (
        <ErrorBoundary onError={() => setUseSimpleMap(true)}>
          <ActivMap 
            locations={activMapLocations}
            onLocationClick={(location) => {
              const originalLocation = propsLocations.find(loc => loc.id === location.id);
              if (originalLocation) {
                onLocationClick(originalLocation);
              }
            }}
          />
        </ErrorBoundary>
      )}

      {/* Location list under map */}
      {filteredLocations.length > 0 && (
        <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-2">Available Locations:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredLocations.map((location) => {
              // Highlight Conway, Arkansas and Amarillo, Texas
              const isHighlighted = 
                (location.city === 'Conway' && location.state === 'Arkansas') || 
                (location.city === 'Amarillo' && location.state === 'Texas');

              return (
                <div 
                  key={location.id}
                  className={`${
                    isHighlighted 
                      ? 'bg-[#00304f]/10 border-l-4 border-[#00304f]' 
                      : 'bg-white border border-gray-200'
                  } p-3 rounded-md shadow-sm hover:shadow-md cursor-pointer transition-shadow`}
                  onClick={() => onLocationClick(location)}
                >
                  <p className={`font-medium ${isHighlighted ? 'text-[#00304f]' : 'text-gray-700'}`}>
                    {location.city}
                  </p>
                  <p className="text-sm text-gray-500">{location.state}</p>
                  {isHighlighted && (
                    <p className="text-xs text-[#69932f] mt-1">Click to view community</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}