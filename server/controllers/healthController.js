import { sendResponse } from '../utils/response.js';

/**
 * @desc    Check API Health
 * @route   GET /api/health
 * @access  Public
 */
const getHealth = (req, res) => {
  return sendResponse(res, 200, true, 'Ucab API is running smoothly.', {
    timestamp: new Date().toISOString()
  });
};

export { getHealth };
