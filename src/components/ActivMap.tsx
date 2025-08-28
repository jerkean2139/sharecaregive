import React, { useEffect, useRef } from 'react';

interface ActivMapLocation {
  id: string;
  title: string;
  address: string;
  phone?: string;
  url?: string;
  tags: string[];
  lat: number;
  lng: number;
  img?: string;
  icon?: string;
}

interface ActivMapProps {
  locations: ActivMapLocation[];
  onLocationClick?: (location: ActivMapLocation) => void;
}

declare global {
  interface Window {
    google: any;
    $: any;
    MarkerClusterer: any;
  }
}

export function ActivMap({ locations, onLocationClick }: ActivMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Check if script already exists
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        return;
      }

      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBhZn-Oqs8-O9UXgvOakmWrq7jiJkHceKE';
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&language=en&key=${apiKey}&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        loadJQuery();
      };
      script.onerror = () => {
        console.error('Google Maps script failed to load.');
      };
      document.head.appendChild(script);
    };

    const loadJQuery = () => {
      if (window.$) {
        loadMarkerClusterer();
        return;
      }

      const jqueryScript = document.createElement('script');
      jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      jqueryScript.onload = loadMarkerClusterer;
      jqueryScript.onerror = () => {
        console.error('jQuery script failed to load.');
      };
      document.head.appendChild(jqueryScript);
    };

    const loadMarkerClusterer = () => {
      if (window.MarkerClusterer) {
        initializeMap();
        return;
      }

      const clustererScript = document.createElement('script');
      clustererScript.src = '/activmap.2.1.2/jquery-activmap/js/markercluster.min.js';
      clustererScript.onload = initializeMap;
      clustererScript.onerror = () => {
        console.warn('MarkerClusterer not loaded, proceeding without clustering');
        initializeMap();
      };
      document.head.appendChild(clustererScript);
    };

    const initializeMap = () => {
      if (!window.$ || !window.google || !mapRef.current) return;

      // Transform locations to ActivMap format
      const activMapLocations = locations.map(loc => ({
        title: `${loc.title}`,
        address: loc.address,
        phone: loc.phone || '',
        url: loc.url || '#',
        tags: loc.tags,
        lat: loc.lat,
        lng: loc.lng,
        img: loc.img || '/activmap.2.1.2/images/thumb.png',
        icon: loc.icon || '/activmap.2.1.2/images/icons/marker-star.png'
      }));

      // Initialize ActivMap
      window.$('#activmap-canvas').activmap({
        places: activMapLocations,
        lat: 36.0, // Center between Arkansas and Texas
        lng: -96.0,
        zoom: 6,
        cluster: true,
        mapType: 'roadmap',
        posPanel: 'right',
        showPanel: true,
        radius: 0,
        unit: 'km',
        country: 'us',
        allowMultiSelect: true,
        icon: '/activmap.2.1.2/images/icons/marker.png',
        center_icon: '/activmap.2.1.2/images/icons/marker-center.png',
        show_center: true,
        styles: [
          {
            featureType: "administrative.country",
            elementType: "geometry",
            stylers: [
              { visibility: "simplified" },
              { hue: "#69932f" }
            ]
          }
        ]
      });

      // Handle location clicks
      if (onLocationClick) {
        window.$('.activmap-place').on('click', function() {
          const title = window.$(this).find('h3').text();
          const location = locations.find(loc => loc.title === title);
          if (location) {
            onLocationClick(location);
          }
        });
      }
    };

    // Load CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '/activmap.2.1.2/jquery-activmap/css/skin-compact/activmap-compact.css';
    document.head.appendChild(cssLink);

    // Load FontAwesome for icons
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(faLink);

    loadGoogleMaps();

    return () => {
      // Cleanup
      if (window.$ && window.$('#activmap-canvas').data('activmap')) {
        window.$('#activmap-canvas').empty();
      }
    };
  }, [locations, onLocationClick]);

  return (
    <div ref={containerRef} className="activmap-wrapper">
      {/* Search and Filters */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="mb-4">
          <input
            type="text"
            id="activmap-location"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#69932f]"
            placeholder="Search locations..."
          />
        </div>

        {/* Filter checkboxes */}
        <div id="activmap-filters" className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="marker-selector">
            <input type="checkbox" name="marker_type[]" value="nonprofit" id="nonprofit" />
            <label htmlFor="nonprofit" className="flex items-center cursor-pointer">
              <i className="fa fa-heart mr-2 text-[#69932f]"></i>
              Non-Profits
            </label>
          </div>
          <div className="marker-selector">
            <input type="checkbox" name="marker_type[]" value="business" id="business" />
            <label htmlFor="business" className="flex items-center cursor-pointer">
              <i className="fa fa-building mr-2 text-[#00304f]"></i>
              Businesses
            </label>
          </div>
        </div>

        {/* Radius selector */}
        <div className="mt-4">
          <span className="text-sm font-medium">Radius: </span>
          <div className="inline-flex gap-2 text-sm">
            <label><input type="radio" name="activmap_radius" value="0" defaultChecked /> All</label>
            <label><input type="radio" name="activmap_radius" value="50" /> 50km</label>
            <label><input type="radio" name="activmap_radius" value="100" /> 100km</label>
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative">
        <div id="activmap-canvas" ref={mapRef} className="w-full h-96 md:h-[500px] rounded-lg"></div>

        {/* Results panel */}
        <div id="activmap-places" className="mt-4 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div id="activmap-results-num" className="p-4 font-bold text-[#00304f]"></div>
        </div>
      </div>
    </div>
  );
}