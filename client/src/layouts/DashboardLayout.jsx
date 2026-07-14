import React, { useState } from 'react';
import Sidebar from '../components/ui/Sidebar';
import Topbar from '../components/ui/Topbar';
import { Outlet, useLocation } from 'react-router-dom';
import { FaUser, FaCar, FaHistory, FaTachometerAlt } from 'react-icons/fa';

// TEMP_DEV_BYPASS: We are hardcoding links for now to test the UI
const getLinksForRole = (pathname) => {
  if (pathname.includes('/dashboard/admin')) {
    return [
      { path: '/dashboard/admin', label: 'Dashboard', icon: FaTachometerAlt, exact: true },
      { path: '/dashboard/admin/users', label: 'Users', icon: FaUser },
      { path: '/dashboard/admin/rides', label: 'Rides', icon: FaCar },
    ];
  }
  if (pathname.includes('/dashboard/driver')) {
    return [
      { path: '/dashboard/driver', label: 'Dashboard', icon: FaTachometerAlt, exact: true },
      { path: '/ride-history', label: 'My Rides', icon: FaHistory },
      { path: '/profile', label: 'Profile', icon: FaUser },
    ];
  }
  // Default user links
  return [
    { path: '/dashboard/user', label: 'Dashboard', icon: FaTachometerAlt, exact: true },
    { path: '/book-ride', label: 'Book a Ride', icon: FaCar },
    { path: '/ride-history', label: 'Ride History', icon: FaHistory },
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
