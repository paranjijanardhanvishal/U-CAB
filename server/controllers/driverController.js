import * as driverService from '../services/driverService.js';
import Vehicle from '../models/Vehicle.js';
import Ride from '../models/Ride.js';
import { sendResponse } from '../utils/response.js';

// @desc    Get driver profile
// @route   GET /api/drivers/profile
// @access  Private/Driver
const getProfile = async (req, res, next) => {
  try {
    const driver = await driverService.getDriverProfile(req.user._id);
    return sendResponse(res, 200, true, 'Driver profile fetched', driver);
  } catch (error) {
    if (error.message === 'Driver profile not found') {
      res.status(404);
    }
    next(error);
  }
};

// @desc    Update driver availability
// @route   PUT /api/drivers/availability
// @access  Private/Driver
const updateAvailability = async (req, res, next) => {
  try {
    const { isAvailable } = req.body;
    if (typeof isAvailable !== 'boolean') {
      res.status(400);
      throw new Error('isAvailable must be a boolean');
    }
    const driver = await driverService.updateAvailability(req.user._id, isAvailable);
    return sendResponse(res, 200, true, 'Availability updated', driver);
  } catch (error) {
    if (error.message === 'Driver profile not found') {
      res.status(404);
    }
    next(error);
  }
};

// @desc    Update driver location
// @route   PUT /api/drivers/location
// @access  Private/Driver
const updateLocation = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
      res.status(400);
      throw new Error('Please provide latitude and longitude');
    }
    const driver = await driverService.updateLocation(req.user._id, latitude, longitude);
    return sendResponse(res, 200, true, 'Location updated', driver);
  } catch (error) {
    if (error.message === 'Driver profile not found') {
      res.status(404);
    }
    next(error);
  }
};

export const getVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findOne({ driverId: req.user._id });
    return sendResponse(res, 200, true, 'Vehicle fetched', vehicle);
  } catch (error) {
    next(error);
  }
};

export const addVehicle = async (req, res, next) => {
  try {
    const { carName, carType, pricePerKm, carNo } = req.body;
    let vehicle = await Vehicle.findOne({ driverId: req.user._id });
    
    if (vehicle) {
      vehicle.carName = carName || vehicle.carName;
      vehicle.carType = carType || vehicle.carType;
      vehicle.pricePerKm = pricePerKm || vehicle.pricePerKm;
      vehicle.carNo = carNo || vehicle.carNo;
      await vehicle.save();
    } else {
      vehicle = await Vehicle.create({
        driverId: req.user._id,
        carName, carType, pricePerKm, carNo
      });
    }
    return sendResponse(res, 200, true, 'Vehicle saved', vehicle);
  } catch (error) {
    next(error);
  }
};

export const getTrips = async (req, res, next) => {
  try {
    const rides = await Ride.find({ driver: req.user._id }).sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Trips fetched', rides);
  } catch (error) {
    next(error);
  }
};

export const getEarnings = async (req, res, next) => {
  try {
    const rides = await Ride.find({ driver: req.user._id, status: 'completed' });
    const totalEarnings = rides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayEarnings = rides.filter(r => new Date(r.createdAt) >= today).reduce((sum, r) => sum + (r.fare || 0), 0);
    
    return sendResponse(res, 200, true, 'Earnings fetched', { totalEarnings, todayEarnings, ridesCount: rides.length });
  } catch (error) {
    next(error);
  }
};

export { getProfile, updateAvailability, updateLocation };
