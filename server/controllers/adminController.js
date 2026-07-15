import * as adminService from '../services/adminService.js';
import Vehicle from '../models/Vehicle.js';
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

export const getAllCabs = async (req, res, next) => {
  try {
    const cabs = await Vehicle.find({}).sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Cabs fetched', cabs);
  } catch (error) {
    next(error);
  }
};

export const createCab = async (req, res, next) => {
  try {
    const cab = await Vehicle.create(req.body);
    return sendResponse(res, 201, true, 'Cab created successfully', cab);
  } catch (error) {
    next(error);
  }
};

export const updateCab = async (req, res, next) => {
  try {
    const cab = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cab) {
      res.status(404);
      throw new Error('Cab not found');
    }
    return sendResponse(res, 200, true, 'Cab updated successfully', cab);
  } catch (error) {
    next(error);
  }
};

export const deleteCab = async (req, res, next) => {
  try {
    const cab = await Vehicle.findByIdAndDelete(req.params.id);
    if (!cab) {
      res.status(404);
      throw new Error('Cab not found');
    }
    return sendResponse(res, 200, true, 'Cab deleted successfully');
  } catch (error) {
    next(error);
  }
};
