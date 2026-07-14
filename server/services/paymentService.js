import Payment from '../models/Payment.js';
import Ride from '../models/Ride.js';
import { PAYMENT_STATUS, RIDE_STATUS } from '../utils/constants.js';

export const processPayment = async (userId, rideId, paymentMethod) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('Ride not found');
  if (ride.user.toString() !== userId.toString()) throw new Error('Unauthorized');
  
  if (ride.status !== RIDE_STATUS.COMPLETED) {
    throw new Error('Ride is not completed yet');
  }

  const existingPayment = await Payment.findOne({ ride: rideId });
  if (existingPayment && existingPayment.status === PAYMENT_STATUS.SUCCESS) {
    throw new Error('Payment already processed');
  }

  const transactionId = 'TXN' + Math.floor(100000 + Math.random() * 900000);
  
  const payment = await Payment.create({
    ride: rideId,
    user: userId,
    amount: ride.fare,
    status: PAYMENT_STATUS.SUCCESS,
    paymentMethod,
    transactionId,
  });

  return payment;
};

export const getPaymentHistory = async (userId) => {
  return await Payment.find({ user: userId }).populate('ride').sort({ createdAt: -1 });
};
