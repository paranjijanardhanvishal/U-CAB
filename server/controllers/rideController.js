import * as rideService from '../services/rideService.js';
import Driver from '../models/Driver.js';
import { sendResponse } from '../utils/response.js';
import { getIo } from '../config/socket.js';

// @desc    Request a new ride
// @route   POST /api/rides
// @access  Private/User
const requestRide = async (req, res, next) => {
  try {
    const { pickupLocation, dropoffLocation } = req.body;
    if (!pickupLocation || !dropoffLocation) {
      res.status(400);
      throw new Error('Pickup and Dropoff locations are required');
    }
    const ride = await rideService.requestRide(req.user._id, req.body);
    
    // Broadcast to all drivers that a new ride is available
    const io = getIo();
    io.emit('newRideRequest', ride);
    
    return sendResponse(res, 201, true, 'Ride requested successfully', ride);
  } catch (error) {
    next(error);
  }
};

// @desc    Get ride by ID
// @route   GET /api/rides/:id
// @access  Private
const getRideById = async (req, res, next) => {
  try {
    const ride = await rideService.getRideById(req.params.id);
    return sendResponse(res, 200, true, 'Ride fetched', ride);
  } catch (error) {
    if (error.message === 'Ride not found') res.status(404);
    next(error);
  }
};

// @desc    Get logged in user rides
// @route   GET /api/rides/myrides
// @access  Private/User
const getMyRides = async (req, res, next) => {
  try {
    const rides = await rideService.getUserRides(req.user._id);
    return sendResponse(res, 200, true, 'Rides fetched', rides);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in driver rides
// @route   GET /api/rides/driver
// @access  Private/Driver
const getDriverRides = async (req, res, next) => {
  try {
    const driver = await Driver.findOne({ user: req.user._id });
    if (!driver) {
      res.status(404);
      throw new Error('Driver profile not found');
    }
    const rides = await rideService.getDriverRides(driver._id);
    return sendResponse(res, 200, true, 'Rides fetched', rides);
  } catch (error) {
    next(error);
  }
};

// @desc    Get available requested rides for drivers
// @route   GET /api/rides/available
// @access  Private/Driver
const getAvailableRides = async (req, res, next) => {
  try {
    const rides = await rideService.getAvailableRides();
    return sendResponse(res, 200, true, 'Available rides fetched', rides);
  } catch (error) {
    next(error);
  }
};

// @desc    Accept a ride
// @route   PUT /api/rides/:id/accept
// @access  Private/Driver
const acceptRide = async (req, res, next) => {
  try {
    const driver = await Driver.findOne({ user: req.user._id });
    if (!driver) {
      res.status(404);
      throw new Error('Driver profile not found');
    }
    const ride = await rideService.acceptRide(req.params.id, driver._id);
    
    const io = getIo();
    io.to(`ride_${ride._id}`).emit('rideAccepted', ride);
    
    return sendResponse(res, 200, true, 'Ride accepted', ride);
  } catch (error) {
    if (error.message === 'Ride not found') res.status(404);
    if (error.message === 'Ride is no longer available') res.status(400);
    next(error);
  }
};

// @desc    Update ride status
// @route   PUT /api/rides/:id/status
// @access  Private
const updateRideStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      res.status(400);
      throw new Error('Status is required');
    }
    const ride = await rideService.updateRideStatus(req.params.id, status);
    
    const io = getIo();
    io.to(`ride_${ride._id}`).emit('rideStatusUpdated', ride);
    
    // Also notify the user specifically
    io.to(`user_${ride.user.toString()}`).emit('rideStatusUpdated', ride);
    
    return sendResponse(res, 200, true, 'Ride status updated', ride);
  } catch (error) {
    if (error.message === 'Ride not found') res.status(404);
    next(error);
  }
};

// @desc    Get current active ride
// @route   GET /api/rides/current
// @access  Private
const getCurrentRide = async (req, res, next) => {
  try {
    const isDriver = req.user.role === 'driver';
    let query = {
      status: { $nin: ['completed', 'cancelled'] }
    };
    
    if (isDriver) {
      const driver = await Driver.findOne({ user: req.user._id });
      if (!driver) return res.status(200).json({ success: true, data: null });
      query.driver = driver._id;
    } else {
      query.user = req.user._id;
    }
    
    // Use the model directly since we don't have a service function for this
    const Ride = (await import('../models/Ride.js')).default;
    const currentRide = await Ride.findOne(query).populate('driver').populate('user', 'fullName phone').sort({ createdAt: -1 });
    
    return sendResponse(res, 200, true, 'Current ride fetched', currentRide);
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel a ride
// @route   PUT /api/rides/:id/cancel
// @access  Private
const cancelRide = async (req, res, next) => {
  try {
    const ride = await rideService.updateRideStatus(req.params.id, 'cancelled');
    
    const io = getIo();
    io.to(`ride_${ride._id}`).emit('rideCancelled', ride);
    // Notify user room
    io.to(`user_${ride.user.toString()}`).emit('rideCancelled', ride);
    
    return sendResponse(res, 200, true, 'Ride cancelled', ride);
  } catch (error) {
    if (error.message === 'Ride not found') res.status(404);
    next(error);
  }
};

export { requestRide, getRideById, getMyRides, getAvailableRides, acceptRide, updateRideStatus, getDriverRides, getCurrentRide, cancelRide };
