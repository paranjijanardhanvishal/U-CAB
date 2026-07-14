import * as adminService from '../services/adminService.js';
import { sendResponse } from '../utils/response.js';

export const getStats = async (req, res, next) => {
  try {
    const stats = await adminService.getStats();
    return sendResponse(res, 200, true, 'Admin stats fetched', stats);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    return sendResponse(res, 200, true, 'Users fetched', users);
  } catch (error) {
    next(error);
  }
};

export const getDrivers = async (req, res, next) => {
  try {
    const drivers = await adminService.getAllDrivers();
    return sendResponse(res, 200, true, 'Drivers fetched', drivers);
  } catch (error) {
    next(error);
  }
};

export const getRides = async (req, res, next) => {
  try {
    const rides = await adminService.getAllRides();
    return sendResponse(res, 200, true, 'Rides fetched', rides);
  } catch (error) {
    next(error);
  }
};
