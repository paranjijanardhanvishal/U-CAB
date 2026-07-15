import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import MapComponent from '../components/ui/MapComponent';
import { FaPhoneAlt, FaCommentDots, FaShieldAlt, FaStar, FaCarSide } from 'react-icons/fa';
import L from 'leaflet';
import api from '../services/api';
import { SocketContext } from '../context/SocketContext';
import { RideContext } from '../context/RideContext';
import { toast } from 'react-toastify';
import { UserLocationIcon, PickupIcon, DestinationIcon, DriverCarIcon } from '../utils/MapIcons';

const RIDE_STATUSES = [
  'Searching Driver',
  'Driver Assigned',
  'Driver Arriving',
  'Driver Reached Pickup',
  'Ride Started',
  'Ride In Progress',
  'Ride Completed'
];

const STATUS_MAP = {
  'requested': 0,
  'accepted': 1,
  'arriving': 2,
  'arrived': 3,
  'started': 4,
  'in_progress': 5,
  'completed': 6,
  'cancelled': -1
};

const RideDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useContext(SocketContext);
  const { currentRide, setCurrentRide } = useContext(RideContext);

  const [rideData, setRideData] = useState(location.state?.ride || currentRide || null);
  const [statusIndex, setStatusIndex] = useState(0);
  const [driverLocation, setDriverLocation] = useState(null);
  const [loading, setLoading] = useState(!rideData);

  useEffect(() => {
    // If RideContext has the current ride, use it
    if (currentRide && currentRide._id === id) {
      setRideData(currentRide);
      setStatusIndex(STATUS_MAP[currentRide.status] || 0);
      setLoading(false);
      return;
    }

    const fetchRide = async () => {
      try {
        const res = await api.get(`/rides/${id}`);
        setRideData(res.data.data);
      } catch (error) {
        toast.error('Failed to load ride details');
      } finally {
        setLoading(false);
      }
    };

    if (!rideData) {
      fetchRide();
    } else {
      setStatusIndex(STATUS_MAP[rideData.status] || 0);
    }
  }, [id, currentRide]);

  useEffect(() => {
    if (socket && rideData) {
      socket.emit('joinRideRoom', rideData._id);

      socket.on('locationUpdated', (loc) => {
        setDriverLocation(loc);
      });

      return () => {
        socket.off('locationUpdated');
      };
    }
  }, [socket, rideData]);

  const status = statusIndex >= 0 ? RIDE_STATUSES[statusIndex] : 'Cancelled';
  const isDriverAssigned = statusIndex >= 1;
  const isCompleted = statusIndex === RIDE_STATUSES.length - 1;

  // Simulate driver movement on map if route exists
  useEffect(() => {
    if (isDriverAssigned && location.state?.route?.polyline?.length > 0) {
      const routePath = location.state.route.polyline;
      
      if (statusIndex === 1 || statusIndex === 2) {
        const pickup = routePath[0];
        setDriverLocation([pickup[0] + 0.005, pickup[1] + 0.005]);
      } else if (statusIndex === 3) {
        setDriverLocation(routePath[0]);
      } else if (statusIndex === 4 || statusIndex === 5) {
        const midPoint = routePath[Math.floor(routePath.length / 2)];
        setDriverLocation(midPoint);
      } else if (isCompleted) {
        setDriverLocation(routePath[routePath.length - 1]);
      }
    }
  }, [statusIndex, isDriverAssigned, isCompleted, location.state]);

  const handlePayment = () => {
    navigate(`/payment/${id}`, { state: { price: rideData.fare, route: location.state?.route } });
  };

  const handleCancelRide = async () => {
    try {
      setLoading(true);
      await api.put(`/rides/${id}/status`, { status: 'cancelled' });
      toast.success('Ride cancelled successfully');
      setRideData({ ...rideData, status: 'cancelled' });
      setStatusIndex(-1);
      setCurrentRide(null);
    } catch (error) {
      toast.error('Failed to cancel ride');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  }

  if (!rideData) {
    return <div className="text-center py-5">Ride not found.</div>;
  }

  const markers = [];
  if (location.state?.route?.polyline?.length > 0) {
    markers.push({ position: location.state.route.polyline[0], popup: "Pickup", icon: PickupIcon });
    markers.push({ position: location.state.route.polyline[location.state.route.polyline.length - 1], popup: "Dropoff", icon: DestinationIcon });
  } else {
    // Use fallback coordinates if route not available from state
    if (rideData.pickupLocation?.latitude && rideData.pickupLocation?.longitude) {
      markers.push({ position: [rideData.pickupLocation.latitude, rideData.pickupLocation.longitude], popup: "Pickup", icon: PickupIcon });
    }
    if (rideData.dropoffLocation?.latitude && rideData.dropoffLocation?.longitude) {
      markers.push({ position: [rideData.dropoffLocation.latitude, rideData.dropoffLocation.longitude], popup: "Dropoff", icon: DestinationIcon });
    }
  }

  if (driverLocation) {
    markers.push({ position: driverLocation, icon: DriverCarIcon, popup: "Driver" });
  }

  const progressPercentage = statusIndex >= 0 ? (statusIndex / (RIDE_STATUSES.length - 1)) * 100 : 0;

  return (
    <div className="container-fluid py-4 h-100 d-flex flex-column" style={{ minHeight: 'calc(100vh - 76px)' }}>
      <div className="row g-4 flex-grow-1">
        
        {/* Tracking Sidebar */}
        <div className="col-lg-4 col-xl-3 d-flex flex-column h-100">
          <Card className="border-0 shadow-sm flex-grow-1 d-flex flex-column overflow-hidden">
            
            {/* Status Header */}
            <div className={`text-white p-4 text-center position-relative ${statusIndex === -1 ? 'bg-danger' : 'bg-primary'}`}>
              <h4 className="fw-bold mb-1">{status}</h4>
              <p className="text-white-50 mb-3 small">
                {isCompleted ? 'You have reached your destination' : statusIndex === -1 ? 'Ride was cancelled' : 'Estimated arrival: 5 mins'}
              </p>
              
              <div className="progress mx-auto bg-white bg-opacity-25" style={{ height: '6px', maxWidth: '200px' }}>
                <div 
                  className={`progress-bar transition-all ${statusIndex === -1 ? 'bg-danger' : 'bg-white'}`} 
                  role="progressbar" 
                  style={{ width: `${progressPercentage}%` }}
                  aria-valuenow={progressPercentage} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
            </div>

            <div className="p-4 d-flex flex-column flex-grow-1 overflow-auto custom-scrollbar">
              
              {/* Driver Info */}
              {isDriverAssigned ? (
                <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded-3">
                  <div className="d-flex align-items-center gap-3">
                    <Avatar name={rideData.driver?.user?.fullName || 'Driver'} size="lg" />
                    <div>
                      <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
                        {rideData.driver?.user?.fullName || 'Driver'} <span className="badge bg-warning text-dark"><FaStar className="me-1"/>4.9</span>
                      </h6>
                      <small className="text-muted">{rideData.driver?.vehicle?.model || 'Toyota Camry'} • {rideData.driver?.vehicle?.plateNumber || 'XYZ-1234'}</small>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <button className="btn btn-outline-primary btn-sm rounded-circle p-2 lh-1"><FaPhoneAlt /></button>
                    <button className="btn btn-outline-secondary btn-sm rounded-circle p-2 lh-1"><FaCommentDots /></button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 mb-4">
                  {statusIndex !== -1 && (
                    <>
                      <div className="spinner-border text-primary mb-3" role="status"></div>
                      <p className="text-muted small">We are finding the closest driver for you...</p>
                    </>
                  )}
                </div>
              )}

              {/* Ride Details */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Ride Details</h6>
                
                <div className="position-relative ms-2">
                  <div className="position-absolute bg-secondary opacity-25" style={{ width: '2px', height: '100%', left: '7px', top: '10px' }}></div>
                  
                  <div className="d-flex gap-3 mb-4 position-relative">
                    <div className="bg-white border border-primary border-2 rounded-circle mt-1" style={{ width: '16px', height: '16px', zIndex: 1 }}></div>
                    <div>
                      <small className="text-muted d-block lh-1">Pickup</small>
                      <span className="fw-medium">{rideData.pickupLocation.address}</span>
                    </div>
                  </div>
                  
                  <div className="d-flex gap-3 position-relative">
                    <div className="bg-primary rounded-circle mt-1" style={{ width: '16px', height: '16px', zIndex: 1 }}></div>
                    <div>
                      <small className="text-muted d-block lh-1">Dropoff</small>
                      <span className="fw-medium">{rideData.dropoffLocation.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fare & Payment */}
              <div className="mt-auto">
                <div className="bg-light p-3 rounded-3 mb-3 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <FaCarSide className="text-secondary" size={24} />
                    <div>
                      <h6 className="mb-0 fw-bold">{location.state?.rideType || 'Ride'}</h6>
                      <small className="text-muted">Cash / Card</small>
                    </div>
                  </div>
                  <h4 className="fw-bold mb-0">₹{rideData.fare}</h4>
                </div>
                
                {isCompleted ? (
                  <Button variant="success" size="lg" className="w-100 fw-bold shadow-sm" onClick={handlePayment}>
                    Proceed to Payment
                  </Button>
                ) : statusIndex !== -1 ? (
                  <Button variant="outline-danger" size="lg" className="w-100 fw-bold" onClick={handleCancelRide}>
                    Cancel Ride
                  </Button>
                ) : null}
              </div>
            </div>
            
            <div className="bg-light p-3 border-top d-flex justify-content-center align-items-center gap-2 text-muted small cursor-pointer hover-text-primary transition-all">
              <FaShieldAlt /> Share trip status
            </div>
          </Card>
        </div>
        
        {/* Map Side */}
        <div className="col-lg-8 col-xl-9" style={{ minHeight: '400px' }}>
          <MapComponent 
            center={markers.length > 0 ? markers[0].position : [51.505, -0.09]} 
            markers={markers}
            route={location.state?.route?.polyline || null}
            bounds={markers.length > 0 ? markers.map(m => m.position) : null}
          />
        </div>
        
      </div>
    </div>
  );
};

export default RideDetails;
