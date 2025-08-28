
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load CSS first
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '/activmap.2.1.2/jquery-activmap/css/skin-compact/activmap-compact.css';
    if (!document.querySelector(`link[href="${cssLink.href}"]`)) {
      document.head.appendChild(cssLink);
    }

    // Load FontAwesome
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    if (!document.querySelector(`link[href="${faLink.href}"]`)) {
      document.head.appendChild(faLink);
    }

    const initActivMap = () => {
      if (!window.$ || !window.google || !window.google.maps) {
        console.error('Dependencies not loaded');
        return;
      }

      // Transform locations to ActivMap format
      const activMapLocations = locations.map(loc => ({
        title: loc.title,
        address: loc.address,
        phone: loc.phone || '',
        url: loc.url || '#',
        tags: loc.tags,
        lat: loc.lat,
        lng: loc.lng,
        img: loc.img || '/activmap.2.1.2/images/thumb.png',
        icon: loc.icon || '/activmap.2.1.2/images/icons/marker-star.png'
      }));

      // Initialize ActivMap with original plugin
      window.$('#activmap-canvas').activmap({
        places: activMapLocations,
        lat: 36.0, // Center between Arkansas and Texas  
        lng: -96.0,
        zoom: 6,
        cluster: true,
        mapType: 'roadmap',
        posPanel: 'left',
        showPanel: true,
        radius: 0,
        unit: 'km',
        country: 'us',
        allowMultiSelect: true,
        icon: '/activmap.2.1.2/images/icons/marker.png',
        center_icon: '/activmap.2.1.2/images/icons/marker-center.png',
        show_center: true
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

    const loadScripts = () => {
      const scripts = [
        {
          src: 'https://code.jquery.com/jquery-3.6.0.min.js',
          check: () => window.$
        },
        {
          src: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&language=en&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBhZn-Oqs8-O9UXgvOakmWrq7jiJkHceKE'}`,
          check: () => window.google && window.google.maps
        },
        {
          src: '/activmap.2.1.2/jquery-activmap/js/markercluster.min.js',
          check: () => window.MarkerClusterer
        },
        {
          src: '/activmap.2.1.2/jquery-activmap/js/jquery-activmap.min.js',
          check: () => window.$ && window.$.fn.activmap
        }
      ];

      let loadedCount = 0;

      scripts.forEach((scriptConfig, index) => {
        if (scriptConfig.check()) {
          loadedCount++;
          if (loadedCount === scripts.length) {
            initActivMap();
          }
          return;
        }

        const existingScript = document.querySelector(`script[src="${scriptConfig.src}"]`);
        if (existingScript) return;

        const script = document.createElement('script');
        script.src = scriptConfig.src;
        script.async = true;
        script.onload = () => {
          loadedCount++;
          if (loadedCount === scripts.length) {
            setTimeout(initActivMap, 100);
          }
        };
        script.onerror = () => {
          console.error(`Failed to load script: ${scriptConfig.src}`);
        };
        document.head.appendChild(script);
      });

      // Check if all are already loaded
      if (scripts.every(s => s.check())) {
        initActivMap();
      }
    };

    loadScripts();

    return () => {
      // Cleanup
      if (window.$ && window.$('#activmap-canvas').length) {
        window.$('#activmap-canvas').empty();
      }
    };
  }, [locations, onLocationClick]);

  return (
    <div ref={containerRef} id="activmap-wrapper">
      {/* Search and Filters Panel */}
      <div id="activmap-ui-wrapper">
        <div id="activmap-search">
          <input 
            id="activmap-location" 
            type="text" 
            placeholder="Search location..." 
          />
          <a className="activmap-action" id="activmap-geolocate" href="#" title="Geolocate">
            <i className="fa fa-crosshairs"></i>
          </a>
          <a className="activmap-action" id="activmap-reset" href="#" title="Reset">
            <i className="fa fa-ban"></i>  
          </a>
          <a className="activmap-action" id="activmap-target" href="#" title="Target">
            <i className="fa fa-bullseye"></i>
          </a>
        </div>

        <div id="activmap-filters">
          <div className="marker-selector">
            <input type="checkbox" name="marker_type[]" value="nonprofit" id="nonprofit" />
            <label htmlFor="nonprofit">
              <i className="fa fa-heart"></i> Non-Profits
            </label>
          </div>
          <div className="marker-selector">
            <input type="checkbox" name="marker_type[]" value="business" id="business" />
            <label htmlFor="business">
              <i className="fa fa-building"></i> Businesses
            </label>
          </div>
          
          {/* Radius selector */}
          <div className="radius-selector">
            <span>Radius: </span>
            <label><input type="radio" name="activmap_radius" value="0" defaultChecked /> All</label>
            <label><input type="radio" name="activmap_radius" value="50" /> 50km</label>
            <label><input type="radio" name="activmap_radius" value="100" /> 100km</label>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div id="activmap-places">
        <div id="activmap-results-num"></div>
      </div>

      {/* Map Container */}
      <div id="activmap-container">
        <div id="activmap-canvas"></div>
      </div>
    </div>
  );
}
