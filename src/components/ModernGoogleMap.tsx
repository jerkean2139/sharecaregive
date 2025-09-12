import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import type { Location } from '../types';

interface ModernGoogleMapProps {
  locations: Location[];
  onLocationClick: (location: Location) => void;
}

declare global {
  interface Window {
    google: any;
    initMap?: () => void;
  }
}

export function ModernGoogleMap({ locations, onLocationClick }: ModernGoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Check if script is already loading
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        // Wait for it to load
        const checkGoogle = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkGoogle);
            initializeMap();
          }
        }, 100);
        return;
      }

      // Load Google Maps
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initializeMap();
      };
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      // Create map centered on US
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.0902, lng: -95.7129 }, // Center of USA
        zoom: 4,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#c8d7e3" }]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ],
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      });

      setMap(mapInstance);

      // Create info window
      infoWindowRef.current = new window.google.maps.InfoWindow();

      // Add markers
      addMarkers(mapInstance);
    };

    const addMarkers = (mapInstance: any) => {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Create bounds to fit all markers
      const bounds = new window.google.maps.LatLngBounds();

      locations.forEach((location) => {
        const position = { lat: location.latitude, lng: location.longitude };
        
        // Custom marker with modern look
        const marker = new window.google.maps.Marker({
          position,
          map: mapInstance,
          title: `${location.city}, ${location.state}`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#00304f',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          },
          animation: window.google.maps.Animation.DROP
        });

        // Add click listener
        marker.addListener('click', () => {
          // Bounce animation
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => marker.setAnimation(null), 750);

          // Update info window
          const content = `
            <div style="padding: 12px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #00304f; font-size: 16px; font-weight: 600;">
                ${location.city}, ${location.state}
              </h3>
              <button 
                onclick="window.handleLocationClick('${location.id}')"
                style="
                  background: linear-gradient(to right, #00304f, #69932f);
                  color: white;
                  border: none;
                  padding: 8px 16px;
                  border-radius: 6px;
                  cursor: pointer;
                  font-size: 14px;
                  width: 100%;
                  margin-top: 8px;
                "
              >
                View Community →
              </button>
            </div>
          `;
          
          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open(mapInstance, marker);

          setSelectedLocation(location);
        });

        markersRef.current.push(marker);
        bounds.extend(position);
      });

      // Fit map to show all markers
      if (locations.length > 0) {
        mapInstance.fitBounds(bounds);
        // Don't zoom in too much for single marker
        if (locations.length === 1) {
          mapInstance.setZoom(10);
        }
      }
    };

    // Add global handler for button clicks in info windows
    (window as any).handleLocationClick = (locationId: string) => {
      const location = locations.find(l => l.id === locationId);
      if (location) {
        onLocationClick(location);
      }
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      delete (window as any).handleLocationClick;
    };
  }, [locations, onLocationClick]);

  // Update markers when locations change
  useEffect(() => {
    if (map && window.google) {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Create bounds
      const bounds = new window.google.maps.LatLngBounds();

      locations.forEach((location) => {
        const position = { lat: location.latitude, lng: location.longitude };
        
        const marker = new window.google.maps.Marker({
          position,
          map,
          title: `${location.city}, ${location.state}`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#00304f',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          },
          animation: window.google.maps.Animation.DROP
        });

        marker.addListener('click', () => {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => marker.setAnimation(null), 750);

          const content = `
            <div style="padding: 12px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #00304f; font-size: 16px; font-weight: 600;">
                ${location.city}, ${location.state}
              </h3>
              <button 
                onclick="window.handleLocationClick('${location.id}')"
                style="
                  background: linear-gradient(to right, #00304f, #69932f);
                  color: white;
                  border: none;
                  padding: 8px 16px;
                  border-radius: 6px;
                  cursor: pointer;
                  font-size: 14px;
                  width: 100%;
                  margin-top: 8px;
                "
              >
                View Community →
              </button>
            </div>
          `;
          
          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open(map, marker);
          setSelectedLocation(location);
        });

        markersRef.current.push(marker);
        bounds.extend(position);
      });

      if (locations.length > 0) {
        map.fitBounds(bounds);
        if (locations.length === 1) {
          map.setZoom(10);
        }
      }
    }
  }, [locations, map, onLocationClick]);

  return (
    <div className="w-full">
      {/* Map Container with Gradient Border */}
      <div className="relative p-1 bg-gradient-to-r from-[#00304f] via-[#69932f] to-[#00304f] rounded-2xl shadow-2xl">
        <div className="relative rounded-xl overflow-hidden bg-white">
          <div 
            ref={mapRef}
            className="w-full h-[500px] bg-gray-100"
            style={{ minHeight: '500px' }}
          />
        
        {/* Map Controls Overlay */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#00304f]" />
            <span className="text-sm font-medium text-gray-700">
              {locations.length} Location{locations.length !== 1 ? 's' : ''} Available
            </span>
          </div>
        </div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
            <div className="text-xs text-gray-600">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-[#00304f]"></div>
                <span>Active Community</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Click markers for details
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Cards Below Map */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((location) => (
          <div
            key={location.id}
            className={`
              bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all
              hover:shadow-lg hover:scale-[1.02] border-2
              ${selectedLocation?.id === location.id ? 'border-[#69932f]' : 'border-gray-200'}
            `}
            onClick={() => {
              setSelectedLocation(location);
              // Center map on this location
              if (map) {
                map.setCenter({ lat: location.latitude, lng: location.longitude });
                map.setZoom(12);
                // Trigger marker click
                const marker = markersRef.current.find(m => 
                  m.getTitle() === `${location.city}, ${location.state}`
                );
                if (marker) {
                  window.google.maps.event.trigger(marker, 'click');
                }
              }
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-[#00304f]">
                  {location.city}
                </h3>
                <p className="text-gray-600">{location.state}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLocationClick(location);
                  }}
                  className="mt-3 inline-flex items-center gap-2 text-[#69932f] hover:text-[#00304f] transition-colors"
                >
                  <span className="text-sm font-medium">View Details</span>
                  <Navigation className="h-4 w-4" />
                </button>
              </div>
              <div className="bg-gradient-to-br from-[#00304f] to-[#69932f] text-white rounded-full p-2">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}