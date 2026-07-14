import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import Loader from '../components/Loader';

const RideDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRideDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchRideDetails = async () => {
    try {
      const res = await api.get(`/rides/${id}`);
      setRide(res.data.data);
    } catch (error) {
      toast.error('Failed to load ride details');
      navigate('/dashboard/user');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    navigate(`/payment/${id}`);
  };

  if (loading) return <div className="mt-5"><Loader size={48} /></div>;
  if (!ride) return null;

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h4 className="mb-0 fw-bold">Ride Details</h4>
            <span className={`badge ${ride.status === 'completed' ? 'bg-success' : ride.status === 'cancelled' ? 'bg-danger' : 'bg-warning text-dark'} fs-6`}>
              {ride.status.toUpperCase()}
            </span>
          </div>
          <div className="card-body p-4">
            <div className="row mb-4">
              <div className="col-md-6">
                <h6 className="text-muted text-uppercase small fw-bold">Pickup</h6>
                <p className="fs-5">{ride.pickupLocation.address}</p>
              </div>
              <div className="col-md-6">
                <h6 className="text-muted text-uppercase small fw-bold">Dropoff</h6>
                <p className="fs-5">{ride.dropoffLocation.address}</p>
              </div>
            </div>
            
            <hr />
            
            <div className="row mb-4">
              <div className="col-md-6">
                <h6 className="text-muted text-uppercase small fw-bold">Driver Info</h6>
                {ride.driver ? (
                  <p className="mb-0">{/* Assuming populated correctly, for MVP we might just have ID or simulated name */}
                    Driver Assigned
                  </p>
                ) : (
                  <p className="mb-0 text-muted fst-italic">Waiting for driver assignment...</p>
                )}
              </div>
              <div className="col-md-6 text-md-end mt-3 mt-md-0">
                <h6 className="text-muted text-uppercase small fw-bold">Fare Estimation</h6>
                <h2 className="fw-bold text-primary mb-0">${ride.fare.toFixed(2)}</h2>
              </div>
            </div>

            {ride.status === 'completed' && (
              <div className="mt-4 pt-3 border-top text-end">
                <button className="btn btn-success btn-lg fw-bold px-5" onClick={handlePayment}>
                  Proceed to Payment
                </button>
              </div>
            )}
            
            {ride.status === 'requested' && (
              <div className="mt-4 pt-3 border-top text-center">
                 <p className="text-muted mb-0"><span className="spinner-border spinner-border-sm me-2" role="status"></span> Searching for nearby drivers...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetails;
