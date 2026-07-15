import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import MapComponent from '../components/ui/MapComponent';
import LocationAutocomplete from '../components/ui/LocationAutocomplete';
import { getRoute, reverseGeocode } from '../services/mapService';
import { FaLocationArrow, FaMapMarkerAlt, FaCar, FaMotorcycle, FaCarSide } from 'react-icons/fa';
import { UserLocationIcon, PickupIcon, DestinationIcon, DriverCarIcon } from '../utils/MapIcons';
import { RideContext } from '../context/RideContext';

// Constants for pricing (INR)
const PRICING = {
  bike: { base: 30, perKm: 8, name: 'Bike', icon: FaMotorcycle, timeMultiplier: 0.8 },
  mini: { base: 50, perKm: 12, name: 'Mini', icon: FaCar, timeMultiplier: 1.0 },
  sedan: { base: 80, perKm: 15, name: 'Sedan', icon: FaCarSide, timeMultiplier: 1.0 },
  suv: { base: 120, perKm: 20, name: 'SUV', icon: FaCar, timeMultiplier: 1.1 },
  premium: { base: 180, perKm: 28, name: 'Premium', icon: FaCarSide, timeMultiplier: 1.0 }
};

const BookRide = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useContext(RideContext);

  // If there's an active ride, redirect to ride details
  useEffect(() => {
    if (currentRide && currentRide.status !== 'completed' && currentRide.status !== 'cancelled') {
      navigate(`/ride-details/${currentRide._id}`, { replace: true });
    }
  }, [currentRide, navigate]);
  
  // Form state
  const [pickupText, setPickupText] = useState('');
  const [dropoffText, setDropoffText] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  
  // Map/Route state
  const [route, setRoute] = useState(null); // { polyline, distance, duration }
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [mapBounds, setMapBounds] = useState(null);
  
  // UI state
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [booking, setBooking] = useState(false);
  const [selectedRide, setSelectedRide] = useState('mini');
  const [nearbyDrivers, setNearbyDrivers] = useState([]);

  // Generate some fake nearby drivers when pickup is set
  useEffect(() => {
    if (pickupCoords) {
      const drivers = Array.from({ length: 4 }).map(() => {
        // Random offset around pickup
        const latOffset = (Math.random() - 0.5) * 0.01;
        const lonOffset = (Math.random() - 0.5) * 0.01;
        return {
          id: Math.random().toString(),
          position: [pickupCoords[0] + latOffset, pickupCoords[1] + lonOffset],
        };
      });
      setNearbyDrivers(drivers);
      setMapCenter(pickupCoords);
    }
  }, [pickupCoords]);

  // Fetch route when both coords are set
  useEffect(() => {
    const fetchRoute = async () => {
      if (pickupCoords && dropoffCoords) {
        setLoadingRoute(true);
        const routeData = await getRoute(pickupCoords, dropoffCoords);
        if (routeData) {
          setRoute(routeData);
          setMapBounds([pickupCoords, dropoffCoords]);
        }
        setLoadingRoute(false);
      }
    };
    fetchRoute();
  }, [pickupCoords, dropoffCoords]);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setPickupCoords([latitude, longitude]);
        const address = await reverseGeocode(latitude, longitude);
        setPickupText(address);
      }, (error) => {
        alert("Could not get current location. Please ensure location permissions are granted.");
      });
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!pickupCoords || !dropoffCoords) {
      toast.error('Please select both pickup and dropoff locations');
      return;
    }

    setBooking(true);
    try {
      const price = calculatePrice(selectedRide);
      const payload = {
        pickupLocation: {
          address: pickupText,
          latitude: pickupCoords[0],
          longitude: pickupCoords[1]
        },
        dropoffLocation: {
          address: dropoffText,
          latitude: dropoffCoords[0],
          longitude: dropoffCoords[1]
        },
        fare: parseFloat(price),
        rideType: selectedRide
      };

      const res = await api.post('/rides', payload);
      const ride = res.data.data;
      
      setCurrentRide(ride);
      toast.success('Ride requested successfully!');
      
      navigate(`/ride-details/${ride._id}`, { 
        state: { 
          pickup: pickupText, 
          dropoff: dropoffText,
          route,
          rideType: selectedRide,
          price: price,
          ride: ride
        } 
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to request ride');
    } finally {
      setBooking(false);
    }
  };

  const calculatePrice = (type) => {
    if (!route) return 0;
    const rules = PRICING[type];
    const dist = parseFloat(route.distance);
    return (rules.base + (dist * rules.perKm)).toFixed(2);
  };

  const markers = useMemo(() => {
    const m = [];
    if (pickupCoords) {
      m.push({ position: pickupCoords, popup: "Pickup Location", icon: PickupIcon });
    }
    if (dropoffCoords) {
      m.push({ position: dropoffCoords, popup: "Destination", icon: DestinationIcon });
    }
    
    nearbyDrivers.forEach(driver => {
      m.push({
        position: driver.position,
        icon: DriverCarIcon
      });
    });

    return m;
  }, [pickupCoords, dropoffCoords, nearbyDrivers]);

  return (
    <div className="container-fluid py-4 h-100 d-flex flex-column" style={{ minHeight: 'calc(100vh - 76px)' }}>
      <div className="row g-4 flex-grow-1">
        
        {/* Booking Form Side */}
        <div className="col-lg-4 col-xl-3 d-flex flex-column h-100">
          <SectionHeader title="Book a Ride" className="mb-3" />
          
          <Card className="border-0 shadow-sm flex-grow-1 d-flex flex-column">
            <form onSubmit={handleBook} className="d-flex flex-column h-100">
              
              <div className="mb-4">
                <h5 className="fw-bold mb-3">Where to?</h5>
                <div className="position-relative">
                  <div className="position-absolute bg-secondary opacity-25" style={{ width: '2px', height: '40px', left: '19px', top: '24px' }}></div>
                  
                  <LocationAutocomplete 
                    placeholder="Pickup location" 
                    icon={FaLocationArrow} 
                    value={pickupText}
                    onChange={setPickupText}
                    onSelect={(item) => setPickupCoords([item.lat, item.lon])}
                    onCurrentLocation={handleCurrentLocation}
                    className="mb-2"
                  />
                  
                  <LocationAutocomplete 
                    placeholder="Dropoff destination" 
                    icon={FaMapMarkerAlt} 
                    value={dropoffText}
                    onChange={setDropoffText}
                    onSelect={(item) => setDropoffCoords([item.lat, item.lon])}
                  />
                </div>
              </div>

              {loadingRoute && (
                <div className="text-center py-4 my-auto">
                  <div className="spinner-border text-primary" role="status"></div>
                  <p className="text-muted mt-2 small">Calculating route and fares...</p>
                </div>
              )}

              {route && !loadingRoute && (
                <div className="d-flex flex-column flex-grow-1 overflow-auto pe-2 custom-scrollbar">
                  <div className="d-flex justify-content-between mb-3 text-muted small px-1">
                    <span>{route.distance} km</span>
                    <span>~{route.duration} mins</span>
                  </div>

                  <h6 className="fw-bold mb-3">Select Ride Type</h6>
                  <div className="d-flex flex-column gap-2 mb-4">
                    {Object.entries(PRICING).map(([key, data]) => {
                      const Icon = data.icon;
                      const isSelected = selectedRide === key;
                      const price = calculatePrice(key);
                      const time = Math.round(route.duration * data.timeMultiplier);
                      
                      return (
                        <div 
                          key={key}
                          className={`card border cursor-pointer transition-all ${isSelected ? 'border-primary bg-primary bg-opacity-10' : 'border-light-subtle hover-bg-light'}`}
                          onClick={() => setSelectedRide(key)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="card-body d-flex justify-content-between align-items-center p-3">
                            <div className="d-flex align-items-center gap-3">
                              <Icon size={28} className={isSelected ? 'text-primary' : 'text-secondary'} />
                              <div>
                                <h6 className="fw-bold mb-0">{data.name}</h6>
                                <small className="text-muted">{time} mins away</small>
                              </div>
                            </div>
                            <div className="text-end">
                              <h5 className="fw-bold mb-0">₹{price}</h5>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-auto pt-3 border-top">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="w-100"
                      isLoading={booking}
                    >
                      Book {PRICING[selectedRide].name}
                    </Button>
                  </div>
                </div>
              )}

              {!route && !loadingRoute && (
                <div className="mt-auto pt-4 text-center text-muted">
                  <p className="small mb-0">Enter pickup and dropoff locations to see available rides and fare estimates.</p>
                </div>
              )}

            </form>
          </Card>
        </div>
        
        {/* Map Side */}
        <div className="col-lg-8 col-xl-9" style={{ minHeight: '500px' }}>
          <MapComponent 
            center={mapCenter}
            bounds={mapBounds}
            markers={markers}
            polyline={route?.polyline}
            className="w-100 h-100 rounded-4 shadow-sm border border-2 border-white overflow-hidden"
          />
        </div>
        
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dee2e6; border-radius: 10px; }
        .hover-bg-light:hover { background-color: #f8f9fa; }
        .transition-all { transition: all 0.2s ease; }
      `}</style>
    </div>
  );
};

export default BookRide;
