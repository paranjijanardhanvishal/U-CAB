import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Protected Pages (Currently bypassed)
import UserDashboard from './pages/UserDashboard';
import DriverDashboard from './pages/DriverDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import BookRide from './pages/BookRide';
import RideHistory from './pages/RideHistory';
import RideDetails from './pages/RideDetails';
import Payment from './pages/Payment';

import ProtectedRoute from './components/ProtectedRoute';
import DevLinks from './pages/DevLinks'; // TEMP_DEV_BYPASS

function App() {
  return (
    <Routes>
      {/* Public Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        
        {/* TEMP_DEV_BYPASS */}
        <Route path="dev" element={<DevLinks />} />

        {/* Standalone pages inside MainLayout (Not dashboard wrapped) */}
        <Route path="book-ride" element={<ProtectedRoute allowedRoles={['user']}><BookRide /></ProtectedRoute>} />
        <Route path="ride-details/:id" element={<ProtectedRoute><RideDetails /></ProtectedRoute>} />
        <Route path="payment/:id" element={<ProtectedRoute allowedRoles={['user']}><Payment /></ProtectedRoute>} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Dashboard Layout (Rhybus-inspired Admin interface) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* User */}
        <Route path="user" element={<ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>} />
        <Route path="../ride-history" element={<ProtectedRoute allowedRoles={['user', 'driver']}><RideHistory /></ProtectedRoute>} />
        <Route path="../profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        
        {/* Driver */}
        <Route path="driver" element={<ProtectedRoute allowedRoles={['driver']}><DriverDashboard /></ProtectedRoute>} />
        
        {/* Admin */}
        <Route path="admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      </Route>
      
      {/* Since we want ride-history and profile to show in the DashboardLayout, let's remap them properly */}
      <Route element={<DashboardLayout />}>
        <Route path="/ride-history" element={<ProtectedRoute allowedRoles={['user', 'driver']}><RideHistory /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Route>

    </Routes>
  );
}

export default App;
