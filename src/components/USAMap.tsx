import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import type { Location } from '../types';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import usStates from 'us-atlas/states-10m.json';

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

export function USAMap({ locations: propsLocations, onLocationClick }: USAMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [clickedLocation, setClickedLocation] = useState<string | null>(null);
  
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

  return (
    <div className="w-full">
      {/* Search bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#69932f] focus:border-[#69932f] sm:text-sm"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Map container */}
      <div 
        className="relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{
            scale: 1000
          }}
          className="w-full h-[400px] md:h-[500px]"
        >
          <Geographies geography={usStates}>
            {({ geographies }: { geographies: any[] }) => (
              <>
                {geographies.map((geo: any) => {
                  const stateName = geo.properties.name;
                  const stateCode = getStateCodeByName(stateName);
                  const isActive = programStates.includes(stateName);
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => stateCode && handleStateClick(stateCode)}
                      onMouseEnter={() => {
                        setHoveredState(stateName);
                      }}
                      onMouseLeave={() => {
                        setHoveredState(null);
                      }}
                      style={{
                        default: {
                          fill: generateStateColor(stateName),
                          stroke: "#FFFFFF",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: isActive ? "#b3d9ff" : "#F5F5F5",
                          stroke: "#FFFFFF",
                          strokeWidth: 1,
                          outline: "none",
                          cursor: "pointer"
                        },
                        pressed: {
                          fill: isActive ? "#80bfff" : "#E0E0E0",
                          stroke: "#FFFFFF",
                          strokeWidth: 1,
                          outline: "none",
                        }
                      }}
                    />
                  );
                })}
              </>
            )}
          </Geographies>
          
          {/* Location markers */}
          {locations.map((loc) => (
            <Marker 
              key={loc.name} 
              coordinates={loc.coordinates}
              onClick={() => handleMarkerClick(loc)}
              onMouseEnter={() => setHoveredLocation(loc.name)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              <g>
                {/* Ping animation when hovered */}
                {hoveredLocation === loc.name && (
                  <circle
                    r={10}
                    fill="rgba(215, 42, 26, 0.3)"
                    stroke="none"
                    className="animate-ping"
                  />
                )}
                
                {/* Main marker circle */}
                <circle
                  r={6}
                  fill={hoveredLocation === loc.name ? '#d72a1a' : '#00304f'}
                  stroke="#fff"
                  strokeWidth={2}
                  className="cursor-pointer shadow-lg transition-all duration-300"
                  style={{
                    filter: hoveredLocation === loc.name ? 'drop-shadow(0 0 4px rgba(215, 42, 26, 0.7))' : 'none',
                    transform: clickedLocation === loc.name ? 'scale(0.9)' : 'scale(1)'
                  }}
                />
                
                {/* Location name label */}
                <text
                  textAnchor="middle"
                  y={-15}
                  className={`
                    fill-[#00304f] text-sm font-semibold pointer-events-none 
                    transition-all duration-300
                    ${hoveredLocation === loc.name ? 'opacity-100' : 'opacity-0'}
                  `}
                  style={{
                    textShadow: '0px 0px 2px white, 0px 0px 4px white'
                  }}
                >
                  {loc.name}
                </text>
              </g>
            </Marker>
          ))}
        </ComposableMap>
        
        {/* State name tooltip */}
        {hoveredState && tooltipPosition && (
          <div 
            className="absolute bg-black/70 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap"
            style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
          >
            {hoveredState}
          </div>
        )}
      </div>
      
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