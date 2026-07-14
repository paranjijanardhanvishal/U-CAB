import * as rideService from '../services/rideService.js';
import Driver from '../models/Driver.js';
import { sendResponse } from '../utils/response.js';

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
    return sendResponse(res, 200, true, 'Ride status updated', ride);
  } catch (error) {
    if (error.message === 'Ride not found') res.status(404);
    next(error);
  }
};

export { requestRide, getRideById, getMyRides, getAvailableRides, acceptRide, updateRideStatus };
