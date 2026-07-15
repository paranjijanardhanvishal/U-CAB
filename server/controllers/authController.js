import * as authService from '../services/authService.js';
import { sendResponse } from '../utils/response.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, phone, password } = req.body;
    // Basic validation
    if (!fullName || !email || !phone || !password) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const userData = await authService.register(req.body);
    return sendResponse(res, 201, true, 'User registered successfully', userData);
  } catch (error) {
    // If it's a known error from service (e.g., user exists), return 400
    if (error.message === 'User already exists') {
      res.status(400);
    }
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      res.status(400);
      throw new Error('Please provide email, password, and role');
    }

    const userData = await authService.login(email, password, role);
    return sendResponse(res, 200, true, 'Login successful', userData);
  } catch (error) {
    if (error.message === 'Invalid email or password' || error.message === 'Invalid role for this login page') {
      res.status(401);
    }
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const userProfile = await authService.getProfile(req.user._id);
    return sendResponse(res, 200, true, 'Profile fetched successfully', userProfile);
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, getProfile };
