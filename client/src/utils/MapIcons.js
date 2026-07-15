import L from 'leaflet';

// Utility for creating SVG icons
const createSvgIcon = (svgString, iconSize, iconAnchor) => {
  return L.divIcon({
    className: 'custom-map-icon',
    html: svgString,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
  });
};

// Current Location (Blue Dot with Pulse)
export const UserLocationIcon = createSvgIcon(
  `<div style="width:20px;height:20px;background:#0d6efd;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(13,110,253,0.5);"></div>`,
  [20, 20],
  [10, 10]
);

// Pickup Location (Green Dot)
export const PickupIcon = createSvgIcon(
  `<div style="width:16px;height:16px;background:#198754;border-radius:50%;border:2px solid white;box-shadow:0 2px 5px rgba(0,0,0,0.3);"></div>`,
  [16, 16],
  [8, 8]
);

// Destination Location (Red Square/Dot)
export const DestinationIcon = createSvgIcon(
  `<div style="width:16px;height:16px;background:#dc3545;border:2px solid white;box-shadow:0 2px 5px rgba(0,0,0,0.3);"></div>`,
  [16, 16],
  [8, 8]
);

// Driver Car Icon
export const DriverCarIcon = createSvgIcon(
  `<div style="background:white;padding:4px;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;width:32px;height:32px;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#212529" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <path d="M9 17h6"/>
      <circle cx="17" cy="17" r="2"/>
    </svg>
  </div>`,
  [32, 32],
  [16, 16]
);
