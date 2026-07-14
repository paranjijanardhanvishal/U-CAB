import * as userService from '../services/userService.js';
import { sendResponse } from '../utils/response.js';

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateProfile(req.user._id, req.body);
    return sendResponse(res, 200, true, 'Profile updated successfully', updatedUser);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404);
    }
    next(error);
  }
};

export { updateProfile };
