import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { SocketContext } from './SocketContext';
import api from '../services/api';
import { toast } from 'react-toastify';

export const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  
  const [currentRide, setCurrentRide] = useState(null);
  const [loadingRide, setLoadingRide] = useState(true);

  // Fetch current active ride on mount or when user changes
  useEffect(() => {
    const fetchCurrentRide = async () => {
      if (!user) {
        setCurrentRide(null);
        setLoadingRide(false);
        return;
      }
      
      try {
        setLoadingRide(true);
        const res = await api.get('/rides/current');
        if (res.data.data) {
          setCurrentRide(res.data.data);
          
          // Join ride room if we have an active ride
          if (socket && socket.connected) {
            socket.emit('joinRideRoom', res.data.data._id);
          }
        } else {
          setCurrentRide(null);
        }
      } catch (error) {
        console.error('Failed to fetch current ride', error);
      } finally {
        setLoadingRide(false);
      }
    };
    
    fetchCurrentRide();
  }, [user, socket]);

  // Handle socket events
  useEffect(() => {
    if (!socket || !user) return;

    const handleRideStatusUpdated = (updatedRide) => {
      if (currentRide && updatedRide._id === currentRide._id) {
        setCurrentRide(updatedRide);
        
        if (updatedRide.status === 'completed') {
          toast.success('Your ride has been completed!');
          setTimeout(() => setCurrentRide(null), 3000);
        }
      }
    };

    const handleRideCancelled = (cancelledRide) => {
      if (currentRide && cancelledRide._id === currentRide._id) {
        toast.error('The ride has been cancelled.');
        setCurrentRide(null);
      }
    };

    const handleRideAccepted = (acceptedRide) => {
      if (currentRide && acceptedRide._id === currentRide._id) {
        setCurrentRide(acceptedRide);
        toast.success('A driver has accepted your ride!');
      } else if (user.role === 'user' && !currentRide && acceptedRide.user === user._id) {
        setCurrentRide(acceptedRide);
      }
    };

    socket.on('rideStatusUpdated', handleRideStatusUpdated);
    socket.on('rideCancelled', handleRideCancelled);
    socket.on('rideAccepted', handleRideAccepted);

    return () => {
      socket.off('rideStatusUpdated', handleRideStatusUpdated);
      socket.off('rideCancelled', handleRideCancelled);
      socket.off('rideAccepted', handleRideAccepted);
    };
  }, [socket, currentRide, user]);

  return (
    <RideContext.Provider value={{ currentRide, setCurrentRide, loadingRide }}>
      {children}
    </RideContext.Provider>
  );
};
