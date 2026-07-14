import * as driverService from '../services/driverService.js';
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

export { getProfile, updateAvailability, updateLocation };
