import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user.role}`);
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    if (!email.trim() || !password) {
      setValidationError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h2 className="card-title text-center mb-4 fw-bold">Welcome Back</h2>
            {validationError && (
              <div className="alert alert-danger py-2" role="alert">
                {validationError}
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label text-muted fw-semibold">Email address</label>
                <input
                  id="loginEmail"
                  type="email"
                  className={`form-control form-control-lg ${validationError && !email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  autoComplete="email"
                  aria-invalid={validationError && !email ? 'true' : 'false'}
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
                    placeholder=""
                    autoComplete="current-password"
                    aria-invalid={validationError && !password ? 'true' : 'false'}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary d-flex align-items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 fw-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : null}
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="mb-0 text-muted">
                Don't have an account? <Link to="/register" className="text-decoration-none fw-semibold">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
