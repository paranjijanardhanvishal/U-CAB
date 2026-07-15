import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/ui/BackButton';

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-main">
      <Navbar />
      <main className="flex-grow-1">
        <div className="container mt-3 mb-1">
          <BackButton />
        </div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
