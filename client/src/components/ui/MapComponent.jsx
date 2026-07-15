import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure CSS is loaded

// Fix for default Leaflet markers in Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to dynamically update map view bounds
const MapBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
};

// Component to recenter map
const MapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom() || 13, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

/**
 * A highly reusable map component.
 * @param {Array} center [lat, lng] for initial center
 * @param {Number} zoom Initial zoom level
 * @param {Array} markers Array of { position: [lat, lng], popup: "text", icon: customLIcon }
 * @param {Array} polyline Array of [lat, lng] arrays for drawing a route
 * @param {Array} bounds Optional [ [lat,lng], [lat,lng] ] to fit bounds
 */
const MapComponent = ({ 
  center = [51.505, -0.09], 
  zoom = 13, 
  markers = [], 
  polyline = [],
  bounds = null,
  className = "w-100 h-100 rounded-3 shadow-sm",
  style = { minHeight: '400px' }
}) => {
  return (
    <div className={className} style={{ position: 'relative', zIndex: 1, ...style }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%', borderRadius: 'inherit' }}
        scrollWheelZoom={true}
        zoomControl={false} // Hide default zoom control to make it look cleaner, or reposition it
      >
        {/* Modern Navigation Style Map Tile Layer (CartoDB Positron) */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {markers.map((marker, idx) => (
          <Marker 
            key={idx} 
            position={marker.position} 
            icon={marker.icon || new L.Icon.Default()}
          >
            {marker.popup && <Popup>{marker.popup}</Popup>}
          </Marker>
        ))}

        {polyline && polyline.length > 0 && (
          <>
            {/* White outline for shadow effect */}
            <Polyline positions={polyline} color="#ffffff" weight={10} opacity={0.8} lineCap="round" lineJoin="round" />
            {/* Thick blue route line */}
            <Polyline positions={polyline} color="#006AFF" weight={5} opacity={1} lineCap="round" lineJoin="round" />
          </>
        )}

        {bounds && <MapBounds bounds={bounds} />}
        {center && !bounds && <MapCenter center={center} />}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
