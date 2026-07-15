import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaUser, FaCar } from 'react-icons/fa';

const Register = () => {
  const { role } = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user.role}`);
    }
  }, [user, navigate]);

  useEffect(() => {
    // Admin registration should not be public, redirect to user
    if (role !== 'user' && role !== 'driver') {
      navigate('/register/user');
    }
  }, [role, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user types
    if (validationError) setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    const { fullName, email, phone, password, confirmPassword } = formData;

    if (!fullName.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      setValidationError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        fullName,
        email,
        phone,
        password,
        role: role
      });
      toast.success('Registration successful! Welcome to U-CAB.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-sm border-0">
          <div className="card-body p-4 p-md-5 text-center">
            {role === 'driver' ? <FaCar size={48} className="text-success mb-3" /> : <FaUser size={48} className="text-primary mb-3" />}
            <h2 className="card-title mb-1 fw-bold text-capitalize">{role} Registration</h2>
            <p className="text-muted mb-4">Create your {role} account to get started.</p>
            
            {validationError && (
              <div className="alert alert-danger py-2 text-start" role="alert">
                {validationError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} noValidate className="text-start">
              <div className="mb-3">
                <label className="form-label text-muted fw-semibold">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  className="form-control form-control-lg"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label text-muted fw-semibold">Email address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control form-control-lg"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted fw-semibold">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  className="form-control form-control-lg"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted fw-semibold">Password</label>
                <div className="input-group input-group-lg">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary d-flex align-items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-muted fw-semibold">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control form-control-lg"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                className={`btn btn-${role === 'driver' ? 'success' : 'primary'} btn-lg w-100 fw-bold`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                ) : null}
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="mb-0 text-muted">
                Already have an account? <Link to={`/login/${role}`} className={`text-decoration-none fw-semibold text-${role === 'driver' ? 'success' : 'primary'}`}>Login here</Link>
              </p>
            </div>
            <div className="mt-3">
              <Link to="/choose-role" className="text-muted small text-decoration-none">Change Role</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
