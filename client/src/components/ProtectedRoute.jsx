import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Loader size={48} />
      </div>
    );
  }

  if (!user) {
    // If not logged in, go to choose-role or login depending on intended role
    // For simplicity, just send them to choose-role if no user
    return <Navigate to="/choose-role" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Prevent cross-role access (e.g. user trying to access /driver)
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
