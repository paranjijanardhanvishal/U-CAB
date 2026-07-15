import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FaCar, FaStar } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-toastify';

const DriverVehicle = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [carName, setCarName] = useState('');
  const [carType, setCarType] = useState('Mini');
  const [carNo, setCarNo] = useState('');
  const [pricePerKm, setPricePerKm] = useState(12);

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const res = await api.get('/drivers/vehicle');
      if (res.data.data) {
        setVehicle(res.data.data);
      }
    } catch (error) {
      console.error('Failed to load vehicle', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVehicle = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/drivers/vehicle', {
        carName, carType, carNo, pricePerKm: Number(pricePerKm)
      });
      setVehicle(res.data.data);
      toast.success('Vehicle saved successfully');
    } catch (error) {
      toast.error('Failed to save vehicle');
    }
  };

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  }
  return (
    <div>
      <SectionHeader title="Vehicle & Ratings" description="Manage your registered vehicle and view passenger ratings." />
      
      <div className="row g-4">
        <div className="col-lg-6">
          <Card title="Vehicle Information" className="border-0 shadow-sm h-100">
            {vehicle ? (
              <>
                <div className="text-center mb-4 pb-4 border-bottom">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{width: '80px', height: '80px'}}>
                    <FaCar size={40} />
                  </div>
                  <h4 className="fw-bold mb-1">{vehicle.carName}</h4>
                  <span className="badge bg-dark px-3 py-2 fs-6 mt-2">{vehicle.carNo}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3 pb-3 border-bottom border-light">
                  <span className="text-muted">Type</span>
                  <span className="fw-medium text-capitalize">{vehicle.carType}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 pb-3 border-bottom border-light">
                  <span className="text-muted">Status</span>
                  <span className={`fw-medium ${vehicle.status === 'Active' ? 'text-success' : 'text-danger'}`}>{vehicle.status}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Base Fare (per km)</span>
                  <span className="fw-medium">₹{vehicle.pricePerKm}</span>
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveVehicle}>
                <div className="mb-3">
                  <label className="form-label">Car Name (e.g. Toyota Camry)</label>
                  <input type="text" className="form-control" value={carName} onChange={e => setCarName(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Car Type</label>
                  <select className="form-select" value={carType} onChange={e => setCarType(e.target.value)}>
                    <option value="Bike">Bike</option>
                    <option value="Mini">Mini</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">License Plate No.</label>
                  <input type="text" className="form-control" value={carNo} onChange={e => setCarNo(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price per Km (₹)</label>
                  <input type="number" className="form-control" value={pricePerKm} onChange={e => setPricePerKm(e.target.value)} required />
                </div>
                <Button type="submit" variant="primary" className="w-100">Save Vehicle</Button>
              </form>
            )}
          </Card>
        </div>
        
        <div className="col-lg-6">
          <Card title="Passenger Ratings" className="border-0 shadow-sm h-100">
            <div className="text-center mb-4">
              <h1 className="display-3 fw-bold mb-0">4.9</h1>
              <div className="text-warning my-2">
                <FaStar size={24}/><FaStar size={24}/><FaStar size={24}/><FaStar size={24}/><FaStar size={24} className="opacity-50"/>
              </div>
              <p className="text-muted">Based on 124 completed trips</p>
            </div>
            
            <h6 className="fw-bold mb-3">Recent Reviews</h6>
            <div className="list-group list-group-flush">
              <div className="list-group-item px-0 py-3 border-light">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-bold text-dark">Great driver, very polite!</span>
                  <span className="text-warning small"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                </div>
                <small className="text-muted">- John D.</small>
              </div>
              <div className="list-group-item px-0 py-3 border-light">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-bold text-dark">Smooth ride to the airport.</span>
                  <span className="text-warning small"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                </div>
                <small className="text-muted">- Sarah M.</small>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverVehicle;
