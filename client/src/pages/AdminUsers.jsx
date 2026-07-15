import React, { useState, useEffect, useRef, useCallback } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import api from '../services/api';
import { toast } from 'react-toastify';
import { FaEye, FaEdit, FaTrash, FaSearch, FaUserShield, FaCar, FaUser } from 'react-icons/fa';

// Generate Mock Users
const generateMockUsers = () => {
  const mockUsers = [];
  const firstNames = ['Amit', 'Rahul', 'Priya', 'Sneha', 'Vikram', 'Anjali', 'Karan', 'Neha', 'Ravi', 'Pooja', 'Suresh', 'Anita', 'Deepak', 'Kavita', 'Ramesh', 'Meena', 'Sunil', 'Geeta', 'Sanjay', 'Rekha'];
  const lastNames = ['Sharma', 'Verma', 'Singh', 'Patel', 'Kumar', 'Gupta', 'Jain', 'Shah', 'Mehta', 'Nair', 'Reddy', 'Rao', 'Das', 'Roy', 'Chauhan', 'Yadav', 'Mishra', 'Pandey', 'Tiwari', 'Joshi'];
  const roles = ['user', 'user', 'user', 'user', 'driver', 'driver', 'admin'];

  for (let i = 1; i <= 50; i++) {
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    
    // Registration date between now and 3 months ago
    const regDate = new Date();
    regDate.setDate(regDate.getDate() - Math.floor(Math.random() * 90));

    mockUsers.push({
      _id: `mock_usr_${1000 + i}`,
      fullName: `User ${i} (${fName} ${lName})`,
      email: `user${i}@example.com`,
      phone: `+91 9${Math.floor(Math.random() * 900000000) + 100000000}`,
      role: role,
      status: Math.random() > 0.1 ? 'Active' : 'Blocked',
      createdAt: regDate.toISOString(),
    });
  }
  
  // Sort by date descending
  return mockUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const AdminUsers = () => {
  const [realUsers, setRealUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedCount, setDisplayedCount] = useState(15);
  const observer = useRef();

  // Use mock data if real users <= 1 (meaning only admin exists)
  const [mockUsers] = useState(generateMockUsers());
  const isDemoMode = realUsers.length <= 1;
  const activeUsers = isDemoMode ? mockUsers : realUsers;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/admin/users');
        setRealUsers(res.data.data || []);
      } catch (error) {
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = activeUsers.filter(u => 
    u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone?.includes(searchTerm) ||
    u.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(0, displayedCount);

  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && displayedCount < filteredUsers.length) {
        setDisplayedCount(prev => prev + 15);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, displayedCount, filteredUsers.length]);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin': return <Badge variant="danger"><FaUserShield className="me-1"/> Admin</Badge>;
      case 'driver': return <Badge variant="success"><FaCar className="me-1"/> Driver</Badge>;
      default: return <Badge variant="primary"><FaUser className="me-1"/> User</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    // Mock users have 'status' field. Real users might not, assuming active by default for real.
    const st = status || 'Active';
    return st === 'Active' ? <Badge variant="success">Active</Badge> : <Badge variant="secondary">Blocked</Badge>;
  };

  return (
    <div>
      <SectionHeader 
        title="Manage Users" 
        description="View and manage all registered passengers, drivers, and admins." 
        action={<Button variant="primary">Export CSV</Button>} 
      />
      
      {isDemoMode && !loading && (
        <div className="alert alert-info border-info d-flex align-items-center mb-4 shadow-sm py-2">
          <FaEye className="me-2 text-info fs-5" />
          <span className="fw-medium text-dark">Showing realistic demo data until real records are populated in the database.</span>
        </div>
      )}

      <Card className="border-0 shadow-sm p-0 overflow-hidden">
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
          <div className="position-relative" style={{ maxWidth: '300px', width: '100%' }}>
            <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input 
              type="text" 
              className="form-control ps-5" 
              placeholder="Search by name, email, role..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setDisplayedCount(15); // Reset
              }}
            />
          </div>
          <div className="text-muted small fw-medium">
            Total Records: {filteredUsers.length}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Loading user database...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No users match your search criteria.
          </div>
        ) : (
          <div className="table-responsive">
            <Table headers={['User Info', 'Role', 'Status', 'Registration Date', 'Actions']}>
              {paginatedUsers.map((u, index) => (
                <tr key={u._id} ref={index === paginatedUsers.length - 1 ? lastElementRef : null}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold" style={{width: '40px', height: '40px'}}>
                        {u.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="fw-bold text-dark">{u.fullName}</div>
                        <div className="small text-muted">{u.email}</div>
                        <div className="small text-muted">{u.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>{getRoleBadge(u.role)}</td>
                  <td>{getStatusBadge(u.status)}</td>
                  <td>
                    <div className="text-muted fw-medium">
                      {new Date(u.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button variant="light" size="sm" className="text-primary p-2"><FaEye /></Button>
                      <Button variant="light" size="sm" className="text-success p-2"><FaEdit /></Button>
                      <Button variant="light" size="sm" className="text-danger p-2"><FaTrash /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
            {displayedCount < filteredUsers.length && (
              <div className="text-center py-3">
                <span className="spinner-border spinner-border-sm text-primary" role="status"></span>
                <span className="ms-2 text-muted small">Loading more...</span>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminUsers;
