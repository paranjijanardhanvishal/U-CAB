import React, { useState } from 'react';
import Sidebar from '../components/ui/Sidebar';
import Topbar from '../components/ui/Topbar';
import { Outlet, useLocation } from 'react-router-dom';
import { FaUser, FaCar, FaHistory, FaTachometerAlt, FaWallet, FaTag, FaStar, FaBell } from 'react-icons/fa';

// TEMP_DEV_BYPASS: We are hardcoding links for now to test the UI
const getLinksForRole = (pathname) => {
  if (pathname.includes('/admin')) {
    return [
      { path: '/dashboard/admin', label: 'Dashboard', icon: FaTachometerAlt, exact: true },
      { path: '/admin/users', label: 'Users', icon: FaUser },
      { path: '/admin/rides', label: 'Rides', icon: FaCar },
    ];
  }
  // Driver links
  if (pathname.includes('/driver')) {
    return [
      { path: '/dashboard/driver', label: 'Dashboard', icon: FaTachometerAlt, exact: true },
      { path: '/driver/trips', label: 'Trip History', icon: FaHistory },
      { path: '/driver/earnings', label: 'Earnings', icon: FaWallet },
      { path: '/driver/vehicle', label: 'Vehicle Info', icon: FaCar },
      { path: '/profile', label: 'Profile', icon: FaUser },
    ];
  }
  // Default user links
  return [
    { path: '/dashboard/user', label: 'Dashboard', icon: FaTachometerAlt, exact: true },
    { path: '/book-ride', label: 'Book a Ride', icon: FaCar },
    { path: '/ride-history', label: 'Ride History', icon: FaHistory },
    { path: '/wallet', label: 'Wallet', icon: FaWallet },
    { path: '/coupons', label: 'Coupons', icon: FaTag },
    { path: '/favorites', label: 'Favorites', icon: FaStar },
    { path: '/notifications', label: 'Notifications', icon: FaBell },
    { path: '/profile', label: 'Profile', icon: FaUser },
  ];
};

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const links = getLinksForRole(location.pathname);

  // Determine role title from path for mock
  let userTitle = 'Passenger';
  if (location.pathname.includes('/admin')) userTitle = 'Admin';
  if (location.pathname.includes('/driver')) userTitle = 'Driver';

  return (
    <div className="d-flex bg-main min-vh-100">
      <Sidebar 
        links={links} 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        title="Ucab Platform"
      />
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: 0, transition: 'margin 0.3s' }}>
        <style>{`
          @media (min-width: 768px) {
            .flex-grow-1 { margin-left: 260px !important; }
          }
        `}</style>
        <Topbar toggleSidebar={toggleSidebar} userTitle={userTitle} />
        <main className="p-4 flex-grow-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
