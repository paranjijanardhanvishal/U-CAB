import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', // For dev
      methods: ['GET', 'POST']
    }
  });

  // Socket authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // Contains id
      next();
    } catch (err) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.id}`);
    
    // Join a room specific to the user's ID
    socket.join(`user_${socket.user.id}`);

    // Ride Flow Events
    socket.on('joinRideRoom', (rideId) => {
      socket.join(`ride_${rideId}`);
      console.log(`User ${socket.user.id} joined ride room: ride_${rideId}`);
    });

    socket.on('driverLocationUpdate', (data) => {
      const { rideId, location } = data;
      // Broadcast driver location to the ride room
      io.to(`ride_${rideId}`).emit('locationUpdated', location);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.id}`);
    });
  });

  return io;
};

export const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
