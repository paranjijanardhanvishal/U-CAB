import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user.role}`);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear field-specific error on change
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone Number is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
    if (formData.password && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error('Please correct the errors in the form');
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      toast.success('Registration successful!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-7">
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h2 className="card-title text-center mb-4 fw-bold">Create an Account</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="regFullName" className="form-label text-muted fw-semibold">Full Name</label>
                <input
                  id="regFullName"
                  type="text"
                  className={`form-control ${validationErrors.fullName ? 'is-invalid' : ''}`}
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder=""
                  aria-invalid={validationErrors.fullName ? 'true' : 'false'}
                />
                {validationErrors.fullName && <div className="invalid-feedback">{validationErrors.fullName}</div>}
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="regEmail" className="form-label text-muted fw-semibold">Email address</label>
                  <input
                    id="regEmail"
                    type="email"
                    className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    autoComplete="email"
                    aria-invalid={validationErrors.email ? 'true' : 'false'}
                  />
                  {validationErrors.email && <div className="invalid-feedback">{validationErrors.email}</div>}
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <label htmlFor="regPhone" className="form-label text-muted fw-semibold">Phone Number</label>
                  <input
                    id="regPhone"
                    type="tel"
                    className={`form-control ${validationErrors.phone ? 'is-invalid' : ''}`}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=""
                    aria-invalid={validationErrors.phone ? 'true' : 'false'}
                  />
                  {validationErrors.phone && <div className="invalid-feedback">{validationErrors.phone}</div>}
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <label htmlFor="regPassword" className="form-label text-muted fw-semibold">Password</label>
                  <div className="input-group">
                    <input
                      id="regPassword"
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder=""
                      autoComplete="new-password"
                      aria-invalid={validationErrors.password ? 'true' : 'false'}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary d-flex align-items-center"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {validationErrors.password && <div className="invalid-feedback d-block">{validationErrors.password}</div>}
                  </div>
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <label htmlFor="regConfirmPassword" className="form-label text-muted fw-semibold">Confirm Password</label>
                  <div className="input-group">
                    <input
                      id="regConfirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`form-control ${validationErrors.confirmPassword ? 'is-invalid' : ''}`}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder=""
                      autoComplete="new-password"
                      aria-invalid={validationErrors.confirmPassword ? 'true' : 'false'}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary d-flex align-items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {validationErrors.confirmPassword && <div className="invalid-feedback d-block">{validationErrors.confirmPassword}</div>}
                  </div>
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
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="mb-0 text-muted">
                Already have an account? <Link to="/login" className="text-decoration-none fw-semibold">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
