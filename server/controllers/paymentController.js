import * as paymentService from '../services/paymentService.js';
import { sendResponse } from '../utils/response.js';

// @desc    Process simulated payment
// @route   POST /api/payments
// @access  Private/User
const makePayment = async (req, res, next) => {
  try {
    const { rideId, paymentMethod } = req.body;
    if (!rideId) {
      res.status(400);
      throw new Error('Ride ID is required');
    }
    const payment = await paymentService.processPayment(req.user._id, rideId, paymentMethod || 'Card');
    return sendResponse(res, 201, true, 'Payment successful', payment);
  } catch (error) {
    if (error.message === 'Ride not found') res.status(404);
    if (error.message === 'Unauthorized') res.status(401);
    if (error.message === 'Ride is not completed yet' || error.message === 'Payment already processed') res.status(400);
    next(error);
  }
};

// @desc    Get user payment history
// @route   GET /api/payments/history
// @access  Private/User
const getPaymentHistory = async (req, res, next) => {
  try {
    const payments = await paymentService.getPaymentHistory(req.user._id);
    return sendResponse(res, 200, true, 'Payment history fetched', payments);
  } catch (error) {
    next(error);
  }
};

export { makePayment, getPaymentHistory };
