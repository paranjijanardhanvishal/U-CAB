import User from '../models/User.js';
import Driver from '../models/Driver.js';
import Ride from '../models/Ride.js';
import Payment from '../models/Payment.js';

export const getStats = async () => {
  const usersCount = await User.countDocuments({ role: 'user' });
  const driversCount = await Driver.countDocuments();
  const ridesCount = await Ride.countDocuments();
  const revenueAgg = await Payment.aggregate([
    { $match: { status: 'success' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  
  const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

  return {
    usersCount,
    driversCount,
    ridesCount,
    totalRevenue,
  };
};

export const getAllUsers = async () => {
  return await User.find({}).select('-password').sort({ createdAt: -1 });
};

export const getAllDrivers = async () => {
  return await Driver.find({}).populate('user', '-password').sort({ createdAt: -1 });
};

export const getAllRides = async () => {
  return await Ride.find({}).populate('user', 'fullName email').populate('driver').sort({ createdAt: -1 });
};
