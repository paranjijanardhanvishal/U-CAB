import { useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  // TEMP_DEV_BYPASS: Authentication is temporarily bypassed for UI development.
  // We simply return the children directly without checking user context or roles.
  
  /* 
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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }
  */

  return children;
};

export default ProtectedRoute;
