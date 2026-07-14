import { FaSpinner } from 'react-icons/fa';

const Loader = ({ size = 24, color = 'text-primary' }) => {
  return (
    <div className={`d-flex justify-content-center align-items-center ${color}`} role="status">
      <FaSpinner className="fa-spin" size={size} aria-label="Loading" />
    </div>
  );
};

export default Loader;
