import React, { useState, useEffect, useContext } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { FaMoneyBillWave, FaRoute, FaStar, FaPowerOff, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaCar } from 'react-icons/fa';
import api from '../services/api';
import { SocketContext } from '../context/SocketContext';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { RideContext } from '../context/RideContext';

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [rideRequests, setRideRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [driverProfile, setDriverProfile] = useState(null);
  
  const [animatedEarnings, setAnimatedEarnings] = useState(1250.50);
  const [displayEarnings, setDisplayEarnings] = useState(1250.50);
  const [floatingAmount, setFloatingAmount] = useState(null);

  useEffect(() => {
    if (displayEarnings !== animatedEarnings) {
      const step = (animatedEarnings - displayEarnings) / 20;
      let current = displayEarnings;
      const interval = setInterval(() => {
        current += step;
        if ((step > 0 && current >= animatedEarnings) || (step < 0 && current <= animatedEarnings)) {
          setDisplayEarnings(animatedEarnings);
          clearInterval(interval);
        } else {
          setDisplayEarnings(current);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [animatedEarnings, displayEarnings]);
  const socket = useContext(SocketContext);
  const { currentRide, setCurrentRide } = useContext(RideContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/drivers/profile');
        setDriverProfile(res.data.data);
        setIsOnline(res.data.data.isAvailable);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchAvailableRides = async () => {
      try {
        const res = await api.get('/rides/available');
        setRideRequests(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (isOnline) {
      fetchAvailableRides();
    }
  }, [isOnline]);

  useEffect(() => {
    if (socket && isOnline) {
      socket.on('newRideRequest', (ride) => {
        toast.info('New ride request available!');
        setRideRequests(prev => [ride, ...prev]);
      });

      socket.on('paymentReceived', (data) => {
        const amount = parseFloat(data.amount);
        setFloatingAmount(amount);
        setTimeout(() => {
          setFloatingAmount(null);
          setAnimatedEarnings(prev => prev + amount);
        }, 1200);
      });

      return () => {
        socket.off('newRideRequest');
        socket.off('paymentReceived');
      };
    }
  }, [socket, isOnline]);

  const handleToggleOnline = async () => {
    try {
      const newStatus = !isOnline;
      await api.put('/drivers/availability', { isAvailable: newStatus });
      setIsOnline(newStatus);
      toast.success(`You are now ${newStatus ? 'ONLINE' : 'OFFLINE'}`);
    } catch (error) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  const handleAcceptRide = async (id) => {
    try {
      setLoading(true);
      const res = await api.put(`/rides/${id}/accept`);
      toast.success('Ride accepted!');
      setCurrentRide(res.data.data);
      
      // Navigate to ride details
      navigate(`/ride-details/${id}`, { state: { ride: res.data.data } });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to accept ride');
      // If it failed (e.g. someone else took it), remove it from list
      setRideRequests(prev => prev.filter(r => r._id !== id));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <style>
        {`
          @keyframes floatUpAndFade {
            0% { opacity: 0; transform: translateY(0px) translateX(0); }
            20% { opacity: 1; transform: translateY(-10px) translateX(15px); }
            80% { opacity: 1; transform: translateY(-20px) translateX(25px); }
            100% { opacity: 0; transform: translateY(-30px) translateX(30px); }
          }
        `}
      </style>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <SectionHeader title="Driver Dashboard" description="Manage your rides and earnings." className="mb-0" />
        <Button 
          variant={isOnline ? 'success' : 'secondary'} 
          className="d-flex align-items-center gap-2 px-4 shadow-sm"
          onClick={handleToggleOnline}
        >
          <FaPowerOff /> {isOnline ? 'ONLINE' : 'OFFLINE'}
        </Button>
      </div>
      
      <div className="row g-4 mb-4">
        <div className="col-md-4 position-relative">
          <StatCard title="Today's Earnings" value={`₹${displayEarnings.toFixed(2)}`} icon={FaMoneyBillWave} color="success" />
          
          {floatingAmount !== null && (
            <div className="position-absolute text-success fw-bold fs-3 z-3" style={{
              top: '50%',
              right: '-10px',
              animation: 'floatUpAndFade 1.2s forwards',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              + ₹{floatingAmount.toFixed(2)}
            </div>
          )}
          
          {/* Debug button to easily test animation locally */}
          <button 
            className="btn btn-sm btn-outline-light text-muted border-0 position-absolute bottom-0 end-0 m-2 opacity-50 hover-opacity-100" 
            onClick={() => {
              setFloatingAmount(300);
              setTimeout(() => { setFloatingAmount(null); setAnimatedEarnings(prev => prev + 300); }, 1200);
            }}
          >
            sim
          </button>
        </div>
        <div className="col-md-4">
          <StatCard title="Trips Completed" value="8" icon={FaRoute} color="primary" />
        </div>
        <div className="col-md-4">
          <StatCard title="Current Rating" value="4.9" icon={FaStar} color="warning" />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <Card title="Incoming Ride Requests" className="border-0 shadow-sm h-100">
            {currentRide && currentRide.status !== 'completed' && currentRide.status !== 'cancelled' ? (
              <div className="text-center py-5">
                <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{width: '64px', height: '64px'}}>
                  <FaCar className="text-dark" size={24} />
                </div>
                <h5 className="fw-bold text-dark">You have an active ride</h5>
                <p className="text-muted small mb-4">Complete or cancel your current ride to accept new requests.</p>
                <Link to={`/ride-details/${currentRide._id}`}>
                  <Button variant="warning" className="fw-bold px-4 shadow-sm text-dark">
                    View Active Ride
                  </Button>
                </Link>
              </div>
            ) : !isOnline ? (
              <div className="text-center py-5">
                <div className="bg-secondary bg-opacity-10 text-secondary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{width: '64px', height: '64px'}}>
                  <FaPowerOff size={24} />
                </div>
                <h5 className="fw-bold text-muted">You are currently offline</h5>
                <p className="text-muted small">Go online to receive new ride requests.</p>
              </div>
            ) : rideRequests.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">No ride requests available at the moment.</p>
              </div>
            ) : (
              <div className="list-group list-group-flush">
                {rideRequests.map(req => (
                  <div key={req._id} className="list-group-item px-0 py-4 border-light position-relative">
                    <div className="position-absolute top-0 end-0 mt-3 me-2 badge bg-primary bg-opacity-10 text-primary">Just now</div>
                    
                    <div className="d-flex justify-content-between align-items-start mb-3 pe-5">
                      <div className="d-flex align-items-center gap-3">
                        <Avatar name={req.user?.fullName || 'User'} size="md" />
                        <div>
                          <h6 className="fw-bold mb-0">{req.user?.fullName || 'User'}</h6>
                          <div className="text-muted small d-flex gap-2">
                            <span><FaStar className="text-warning mb-1" /> 4.8</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <h4 className="fw-bold text-success mb-0">₹{req.fare}</h4>
                      </div>
                    </div>
                    
                    <div className="bg-light p-3 rounded-3 mb-3">
                      <div className="d-flex align-items-start gap-3 mb-2">
                        <div className="text-primary mt-1"><FaMapMarkerAlt /></div>
                        <div>
                          <small className="text-muted d-block lh-1">Pickup</small>
                          <span className="fw-medium">{req.pickupLocation?.address}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-start gap-3">
                        <div className="text-danger mt-1"><FaMapMarkerAlt /></div>
                        <div>
                          <small className="text-muted d-block lh-1">Dropoff</small>
                          <span className="fw-medium">{req.dropoffLocation?.address}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="d-flex gap-2">
                      <Button 
                        variant="success" 
                        className="flex-grow-1 py-2 fw-bold" 
                        onClick={() => handleAcceptRide(req._id)}
                        disabled={loading}
                      >
                        <FaCheckCircle className="me-2"/> Accept Request
                      </Button>
                      <Button variant="outline-danger" className="py-2" onClick={() => setRideRequests(prev => prev.filter(r => r._id !== req._id))}>
                        <FaTimesCircle/>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
        
        <div className="col-lg-4">
          <Card title="Current Status" className="border-0 shadow-sm h-100 bg-light">
            <div className="text-center py-4">
              <div className={`spinner-grow text-${isOnline ? 'success' : 'secondary'} mb-3`} role="status" style={{width: '3rem', height: '3rem'}}></div>
              <h5 className="fw-bold mb-1">{isOnline ? 'Searching for riders...' : 'Offline'}</h5>
              <p className="text-muted small">
                {isOnline ? 'You are visible to riders nearby.' : 'Go online to start earning.'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
