import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { FaCar, FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminCabs = () => {
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Price sort

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    _id: null,
    driverName: '',
    carModel: '',
    carType: 'Mini',
    carNo: '',
    pricePerKm: 10,
    carImage: ''
  });

  useEffect(() => {
    fetchCabs();
  }, []);

  const fetchCabs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/cabs');
      setCabs(res.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch cabs');
    } finally {
      setLoading(false);
    }
  };

  const filteredCabs = cabs.filter(c => 
    c.carName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.carType?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortOrder === 'asc') return a.pricePerKm - b.pricePerKm;
    return b.pricePerKm - a.pricePerKm;
  });

  const handleOpenModal = (cab = null) => {
    if (cab) {
      setIsEditing(true);
      setFormData({
        _id: cab._id,
        driverName: cab.driverName || '',
        carModel: cab.carName,
        carType: cab.carType,
        carNo: cab.carNo,
        pricePerKm: cab.pricePerKm,
        carImage: cab.carImage || ''
      });
    } else {
      setIsEditing(false);
      setFormData({
        _id: null,
        driverName: '',
        carModel: '',
        carType: 'Mini',
        carNo: '',
        pricePerKm: 10,
        carImage: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        driverName: formData.driverName,
        carName: formData.carModel,
        carType: formData.carType,
        carNo: formData.carNo,
        pricePerKm: Number(formData.pricePerKm),
        carImage: formData.carImage
      };

      if (isEditing) {
        await api.put(`/admin/cabs/${formData._id}`, payload);
        toast.success('Cab updated successfully');
      } else {
        await api.post('/admin/cabs', payload);
        toast.success('Cab added successfully');
      }
      handleCloseModal();
      fetchCabs();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save cab');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this cab?')) return;
    try {
      await api.delete(`/admin/cabs/${id}`);
      toast.success('Cab deleted');
      fetchCabs();
    } catch (error) {
      toast.error('Failed to delete cab');
    }
  };

  return (
    <div>
      <SectionHeader 
        title="Manage Cabs" 
        description="Add, edit, or remove vehicles from the platform."
        action={
          <Button variant="primary" onClick={() => handleOpenModal()}>
            <FaPlus className="me-2" /> Add Cab
          </Button>
        }
      />

      {/* Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
        <div className="position-relative" style={{ maxWidth: '400px', width: '100%' }}>
          <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          <input 
            type="text" 
            className="form-control ps-5" 
            placeholder="Search by car name or type..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="light" 
          className="fw-bold text-primary" 
          onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
        >
          Sort Price: {sortOrder === 'asc' ? 'Low to High ↑' : 'High to Low ↓'}
        </Button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
      ) : filteredCabs.length === 0 ? (
        <div className="text-center py-5 text-muted">No cabs found. Add one to get started.</div>
      ) : (
        <div className="row g-4">
          {filteredCabs.map(cab => (
            <div key={cab._id} className="col-md-6 col-lg-4 col-xl-3">
              <Card className="h-100 border-0 shadow-sm p-0 overflow-hidden">
                <div style={{ height: '160px', backgroundColor: '#f8f9fa' }} className="d-flex align-items-center justify-content-center">
                  {cab.carImage ? (
                    <img src={cab.carImage} alt={cab.carName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <FaCar size={60} className="text-muted opacity-25" />
                  )}
                </div>
                <div className="p-3 bg-white">
                  <div className="mb-2 d-flex justify-content-between align-items-start">
                    <h5 className="fw-bold mb-0 text-truncate" style={{ maxWidth: '70%' }}>{cab.carName}</h5>
                    <Badge variant="primary">{cab.carType}</Badge>
                  </div>
                  <div className="small text-muted mb-3">
                    <div><strong>Driver:</strong> {cab.driverName || 'Not Assigned'}</div>
                    <div><strong>Plate:</strong> {cab.carNo}</div>
                    <div className="text-success mt-1 fw-bold fs-6">₹{cab.pricePerKm}/Km</div>
                  </div>
                  <div className="d-flex gap-2">
                    <Button variant="dark" className="flex-grow-1 py-2 fw-bold" onClick={() => handleOpenModal(cab)}>
                      <FaEdit className="me-1" /> Edit
                    </Button>
                    <Button variant="danger" className="py-2" onClick={() => handleDelete(cab._id)}>
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-light border-0">
                <h5 className="modal-title fw-bold">{isEditing ? 'Edit Car Data' : 'Add Car'}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input type="text" className="form-control bg-light border-0 py-2" placeholder="Driver Name" value={formData.driverName} onChange={e => setFormData({...formData, driverName: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control bg-light border-0 py-2" placeholder="Car Model (e.g. Maruti Swift)" value={formData.carModel} onChange={e => setFormData({...formData, carModel: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <select className="form-select bg-light border-0 py-2" value={formData.carType} onChange={e => setFormData({...formData, carType: e.target.value})}>
                      <option value="Bike">Bike</option>
                      <option value="Mini">Mini</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control bg-light border-0 py-2" placeholder="Car No (e.g. MH 12 XY 5678)" value={formData.carNo} onChange={e => setFormData({...formData, carNo: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <input type="number" className="form-control bg-light border-0 py-2" placeholder="Price per Km" value={formData.pricePerKm} onChange={e => setFormData({...formData, pricePerKm: e.target.value})} required />
                  </div>
                  <div className="mb-4">
                    <label className="form-label small text-muted">Car Image URL</label>
                    <input type="text" className="form-control bg-light border-0 py-2" placeholder="https://example.com/car.jpg" value={formData.carImage} onChange={e => setFormData({...formData, carImage: e.target.value})} />
                  </div>
                  <Button type="submit" variant="primary" className="w-100 py-3 fw-bold">
                    {isEditing ? 'Update Car' : 'Submit Car'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCabs;
