import axios from 'axios';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';
const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1/driving';

/**
 * Search for a location using OpenStreetMap Nominatim API
 * @param {string} query Location text query
 * @returns {Promise<Array>} Array of location results
 */
export const searchLocation = async (query) => {
  if (!query || query.length < 3) return [];
  
  try {
    const response = await axios.get(NOMINATIM_BASE_URL, {
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit: 5,
      }
    });
    
    return response.data.map(item => ({
      name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      raw: item
    }));
  } catch (error) {
    console.error("Geocoding error:", error);
    return [];
  }
};

/**
 * Fetch a route between two coordinates using OSRM API
 * @param {Array} start [lat, lon]
 * @param {Array} end [lat, lon]
 * @returns {Promise<Object>} Route data containing polyline and distance/duration
 */
export const getRoute = async (start, end) => {
  try {
    // OSRM expects coordinates in lon,lat order
    const url = `${OSRM_BASE_URL}/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
    const response = await axios.get(url);
    
    if (response.data.code !== 'Ok') {
      throw new Error("No route found");
    }

    const route = response.data.routes[0];
    
    // GeoJSON returns coordinates in [lon, lat], Leaflet polyline expects [lat, lon]
    const polyline = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
    
    return {
      polyline,
      distance: (route.distance / 1000).toFixed(1), // in km
      duration: Math.round(route.duration / 60), // in minutes
    };
  } catch (error) {
    console.error("Routing error:", error);
    return null;
  }
};

/**
 * Reverse geocode a latitude and longitude to get an address
 * @param {Number} lat 
 * @param {Number} lon 
 * @returns {Promise<string>}
 */
export const reverseGeocode = async (lat, lon) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat,
        lon,
        format: 'json'
      }
    });
    return response.data.display_name;
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
  }
};
