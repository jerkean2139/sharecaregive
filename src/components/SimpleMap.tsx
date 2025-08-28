
import React, { useEffect, useRef } from 'react';

interface SimpleMapLocation {
  id: string;
  title: string;
  address: string;
  lat: number;
  lng: number;
}

interface SimpleMapProps {
  locations: SimpleMapLocation[];
  onLocationClick?: (location: SimpleMapLocation) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export function SimpleMap({ locations, onLocationClick }: SimpleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      // Create map centered between Arkansas and Texas
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 33.0, lng: -96.0 },
        zoom: 6,
        mapTypeId: 'roadmap'
      });

      mapInstanceRef.current = map;

      // Add markers for each location
      locations.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.title
        });

        // Add click listener
        marker.addListener('click', () => {
          if (onLocationClick) {
            onLocationClick(location);
          }
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div>
              <h3>${location.title}</h3>
              <p>${location.address}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    };

    // Load Google Maps if not already loaded
    if (window.google && window.google.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyBhZn-Oqs8-O9UXgvOakmWrq7jiJkHceKE'}`;
      script.async = true;
      script.onload = initMap;
      script.onerror = () => {
        console.error('Failed to load Google Maps');
      };
      document.head.appendChild(script);
    }
  }, [locations, onLocationClick]);

  return (
    <div className="w-full">
      <div 
        ref={mapRef} 
        className="w-full h-96 bg-gray-200 rounded-lg"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}
