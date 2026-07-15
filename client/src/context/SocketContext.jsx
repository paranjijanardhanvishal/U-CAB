import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Only connect if user is logged in and has a token
    if (user && user.token) {
      const socketInstance = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000', {
        auth: {
          token: user.token,
        },
      });

      setSocket(socketInstance);

      socketInstance.on('connect', () => {
        console.log('Connected to socket server');
      });

      socketInstance.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message);
      });

      return () => {
        socketInstance.disconnect();
      };
    } else if (socket) {
      // Disconnect if user logs out
      socket.disconnect();
      setSocket(null);
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
