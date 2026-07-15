import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { FaCar, FaHistory, FaWallet, FaTag, FaStar } from 'react-icons/fa';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { RideContext } from '../context/RideContext';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const { currentRide } = useContext(RideContext);
  const [recentRides, setRecentRides] = useState([]);
  const [totalRides, setTotalRides] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/rides/myrides');
        setRecentRides(res.data.data.slice(0, 3));
        setTotalRides(res.data.data.length);
      } catch (error) {
        console.error('Failed to fetch rides', error);
      }
    };
    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div>
      <SectionHeader title="Dashboard" description={`Welcome back, ${user?.fullName || 'User'}!`} />
      
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          {/* Welcome Banner */}
          <div className="card border-0 shadow-sm bg-primary text-white h-100 rounded-4 overflow-hidden position-relative">
            <div className="position-absolute end-0 top-0 h-100 w-50 bg-white" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)', opacity: 0.1 }}></div>
            <div className="card-body p-4 p-lg-5 position-relative z-1 d-flex flex-column justify-content-center">
              <h2 className="fw-bold mb-3">Where are we going today?</h2>
              <p className="mb-4 text-white-50 fs-5" style={{ maxWidth: '400px' }}>
                Book a ride in seconds and get picked up by a top-rated driver.
              </p>
              <div>
                {currentRide && currentRide.status !== 'completed' && currentRide.status !== 'cancelled' ? (
                  <Link to={`/ride-details/${currentRide._id}`}>
                    <Button variant="warning" size="lg" className="fw-bold px-4 shadow-sm text-dark">
                      <FaCar className="me-2" /> View Active Ride
                    </Button>
                  </Link>
                ) : (
                  <Link to="/book-ride">
                    <Button variant="light" size="lg" className="text-primary fw-bold px-4 shadow-sm">
                      <FaCar className="me-2" /> Book a Ride Now
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="d-flex flex-column gap-4 h-100">
            <StatCard 
              title="Wallet Balance" 
              value="₹475.50" 
              icon={FaWallet} 
              color="success" 
              className="flex-grow-1"
            />
            <StatCard 
              title="Total Trips" 
              value={totalRides.toString()} 
              icon={FaHistory} 
              color="primary" 
              className="flex-grow-1"
            />
          </div>
        </div>
      </div>

      <h5 className="fw-bold mb-3 mt-5">Quick Access</h5>
      <div className="row g-3 mb-5">
        {[
          { label: 'My Wallet', icon: FaWallet, path: '/wallet', color: 'success' },
          { label: 'Coupons', icon: FaTag, path: '/coupons', color: 'danger' },
          { label: 'Favorites', icon: FaStar, path: '/favorites', color: 'warning' },
          { label: 'History', icon: FaHistory, path: '/ride-history', color: 'info' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div className="col-6 col-md-3" key={idx}>
              <Link to={item.path} className="text-decoration-none">
                <Card className="border-0 shadow-sm h-100 text-center py-4 hover-bg-light transition-all">
                  <div className={`text-${item.color} mb-3`}>
                    <Icon size={32} />
                  </div>
                  <h6 className="fw-bold text-dark mb-0">{item.label}</h6>
                </Card>
              </Link>
            </div>
          )
        })}
      </div>

      <div className="row g-4">
        <div className="col-md-7">
          <Card title="Recent Trips" className="border-0 shadow-sm h-100" action={<Link to="/ride-history">View All</Link>}>
            <div className="list-group list-group-flush">
              {recentRides.length === 0 ? (
                <div className="text-muted p-3 text-center">No recent trips.</div>
              ) : recentRides.map((ride) => (
                <div key={ride._id} className="list-group-item d-flex justify-content-between align-items-center px-0 py-3 border-light">
                  <div className="d-flex align-items-center gap-3">
                    <Avatar name={ride.driver?.user?.fullName || 'Driver'} size="md" />
                    <div>
                      <h6 className="fw-bold mb-1 text-truncate" style={{maxWidth: '200px'}}>To: {ride.dropoffLocation?.address}</h6>
                      <small className="text-muted">{formatDate(ride.createdAt)} • ₹{ride.fare}</small>
                    </div>
                  </div>
                  <span className={`badge rounded-pill px-3 py-2 ${
                    ride.status === 'completed' ? 'bg-success bg-opacity-10 text-success' : 
                    ride.status === 'cancelled' ? 'bg-danger bg-opacity-10 text-danger' : 
                    'bg-warning bg-opacity-10 text-warning'
                  }`}>
                    {ride.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <div className="col-md-5">
          <Card title="Active Promotions" className="border-0 shadow-sm h-100 bg-light" action={<Link to="/coupons">More</Link>}>
            <div className="bg-white p-3 rounded-3 shadow-sm border border-light-subtle mb-3 d-flex gap-3 align-items-center">
              <div className="bg-primary bg-opacity-10 text-primary p-3 rounded text-center">
                <h5 className="fw-bold mb-0">50%</h5>
                <small>OFF</small>
              </div>
              <div>
                <h6 className="fw-bold mb-1">WELCOME50</h6>
                <p className="small text-muted mb-0">Valid until Oct 31</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-3 shadow-sm border border-light-subtle d-flex gap-3 align-items-center">
              <div className="bg-danger bg-opacity-10 text-danger p-3 rounded text-center">
                <h5 className="fw-bold mb-0">20%</h5>
                <small>OFF</small>
              </div>
              <div>
                <h6 className="fw-bold mb-1">WEEKEND20</h6>
                <p className="small text-muted mb-0">Valid this weekend only</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <style>{`
        .hover-bg-light:hover { background-color: #f8f9fa; transform: translateY(-3px); }
        .transition-all { transition: all 0.3s ease; }
      `}</style>
    </div>
  );
};

export default UserDashboard;
