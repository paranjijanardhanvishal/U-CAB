import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="text-muted mb-4">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary btn-lg fw-bold">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
