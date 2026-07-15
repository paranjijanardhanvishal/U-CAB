import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaUser, FaCar, FaUserShield } from 'react-icons/fa';

const Login = () => {
  const { role } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // If already logged in, redirect to respective dashboard
  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user.role}`);
    }
  }, [user, navigate]);

  // If role is invalid, fallback to user or redirect to choose-role
  useEffect(() => {
    if (role !== 'user' && role !== 'driver' && role !== 'admin') {
      navigate('/choose-role');
    }
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    if (!email.trim() || !password) {
      setValidationError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const loggedInUser = await login(email, password, role);
      // Validate that the returned user role matches the attempted login role
      if (loggedInUser.role !== role) {
        toast.error(`Account found, but it is not a ${role} account. Please use the correct login page.`);
        // Assuming logout is available to clear context if role mismatches
        // For now, let's just let it be, but the ProtectedRoute will block them from accessing the wrong dashboard
        navigate(`/dashboard/${loggedInUser.role}`); 
      } else {
        toast.success(`Welcome back!`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'admin': return <FaUserShield size={48} className="text-danger mb-3" />;
      case 'driver': return <FaCar size={48} className="text-success mb-3" />;
      default: return <FaUser size={48} className="text-primary mb-3" />;
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow-sm border-0">
          <div className="card-body p-4 p-md-5 text-center">
            {getRoleIcon()}
            <h2 className="card-title mb-1 fw-bold text-capitalize">{role} Login</h2>
            <p className="text-muted mb-4">Please sign in to your {role} account</p>
            
            {validationError && (
              <div className="alert alert-danger py-2 text-start" role="alert">
                {validationError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} noValidate className="text-start" autoComplete="off">
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label text-muted fw-semibold">Email address</label>
                <input
                  id="loginEmail"
                  type="email"
                  className={`form-control form-control-lg ${validationError && !email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'admin' ? 'admin@admin.com' : 'Enter your email'}
                  autoComplete="off"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="loginPassword" className="form-label text-muted fw-semibold">Password</label>
                <div className="input-group input-group-lg">
                  <input
                    id="loginPassword"
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control ${validationError && !password ? 'is-invalid' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={role === 'admin' ? 'admin123' : 'Enter your password'}
                    autoComplete="new-password"
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
              
              <button
                type="submit"
                className={`btn btn-${role === 'admin' ? 'danger' : role === 'driver' ? 'success' : 'primary'} btn-lg w-100 fw-bold`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : null}
                {isSubmitting ? 'Logging in...' : 'Sign In'}
              </button>
            </form>
            
            {role !== 'admin' && (
              <div className="mt-4 text-center">
                <p className="mb-0 text-muted">
                  Don't have an account? <Link to={`/register/${role}`} className={`text-decoration-none fw-semibold text-${role === 'driver' ? 'success' : 'primary'}`}>Register here</Link>
                </p>
              </div>
            )}
            <div className="mt-3">
              <Link to="/choose-role" className="text-muted small text-decoration-none">Change Role</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
