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

// New User Pages
import Wallet from './pages/Wallet';
import Coupons from './pages/Coupons';
import Favorites from './pages/Favorites';
import Notifications from './pages/Notifications';
import AvailableCabs from './pages/AvailableCabs';

// Driver Pages
import DriverTrips from './pages/DriverTrips';
import DriverEarnings from './pages/DriverEarnings';
import DriverVehicle from './pages/DriverVehicle';

// Admin Pages
import AdminUsers from './pages/AdminUsers';
import AdminDrivers from './pages/AdminDrivers';
import AdminRides from './pages/AdminRides';
import AdminCabs from './pages/AdminCabs';

import ChooseRole from './pages/ChooseRole';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="choose-role" element={<ChooseRole />} />
        <Route path="login/:role" element={<Login />} />
        <Route path="register/:role" element={<Register />} />
        
        {/* Redirect old login/register to choose-role */}
        <Route path="login" element={<ChooseRole />} />
        <Route path="register" element={<ChooseRole />} />
        
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

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
        
        {/* Driver */}
        <Route path="driver" element={<ProtectedRoute allowedRoles={['driver']}><DriverDashboard /></ProtectedRoute>} />
        
        {/* Admin */}
        <Route path="admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      </Route>
      
      {/* Since we want these to show in the DashboardLayout, let's remap them properly */}
      <Route element={<DashboardLayout />}>
        <Route path="/ride-history" element={<ProtectedRoute allowedRoles={['user']}><RideHistory /></ProtectedRoute>} />
        <Route path="/available-cabs" element={<ProtectedRoute allowedRoles={['user']}><AvailableCabs /></ProtectedRoute>} />
        <Route path="/wallet" element={<ProtectedRoute allowedRoles={['user']}><Wallet /></ProtectedRoute>} />
        <Route path="/coupons" element={<ProtectedRoute allowedRoles={['user']}><Coupons /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute allowedRoles={['user']}><Favorites /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute allowedRoles={['user']}><Notifications /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        
        {/* Driver extra routes */}
        <Route path="/driver/trips" element={<ProtectedRoute allowedRoles={['driver']}><DriverTrips /></ProtectedRoute>} />
        <Route path="/driver/earnings" element={<ProtectedRoute allowedRoles={['driver']}><DriverEarnings /></ProtectedRoute>} />
        <Route path="/driver/vehicle" element={<ProtectedRoute allowedRoles={['driver']}><DriverVehicle /></ProtectedRoute>} />

        {/* Admin extra routes */}
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/drivers" element={<ProtectedRoute allowedRoles={['admin']}><AdminDrivers /></ProtectedRoute>} />
        <Route path="/admin/rides" element={<ProtectedRoute allowedRoles={['admin']}><AdminRides /></ProtectedRoute>} />
        <Route path="/admin/cabs" element={<ProtectedRoute allowedRoles={['admin']}><AdminCabs /></ProtectedRoute>} />
      </Route>

    </Routes>
  );
}

export default App;
