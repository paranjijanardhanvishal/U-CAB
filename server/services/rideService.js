import Ride from '../models/Ride.js';
import Driver from '../models/Driver.js';
import { RIDE_STATUS } from '../utils/constants.js';

export const requestRide = async (userId, rideData) => {
  const { pickupLocation, dropoffLocation, fare, rideType } = rideData;

  const ride = await Ride.create({
    user: userId,
    pickupLocation,
    dropoffLocation,
    fare,
    status: RIDE_STATUS.REQUESTED,
  });

  return ride;
};

export const getRideById = async (rideId) => {
  const ride = await Ride.findById(rideId).populate('user', 'fullName phone').populate('driver');
  if (ride) {
    return ride;
  }
  throw new Error('Ride not found');
};

export const getUserRides = async (userId) => {
  return await Ride.find({ user: userId }).sort({ createdAt: -1 });
};

export const getDriverRides = async (driverId) => {
  return await Ride.find({ driver: driverId }).sort({ createdAt: -1 });
};

export const getAvailableRides = async () => {
  return await Ride.find({ status: RIDE_STATUS.REQUESTED }).populate('user', 'fullName phone').sort({ createdAt: -1 });
};

export const acceptRide = async (rideId, driverId) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('Ride not found');
  if (ride.status !== RIDE_STATUS.REQUESTED) throw new Error('Ride is no longer available');

  ride.driver = driverId;
  ride.status = RIDE_STATUS.ACCEPTED;
  await ride.save();
  return ride;
};

export const updateRideStatus = async (rideId, status) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('Ride not found');
  
  ride.status = status;
  if (status === RIDE_STATUS.STARTED) {
    ride.startTime = new Date();
  } else if (status === RIDE_STATUS.COMPLETED || status === RIDE_STATUS.CANCELLED) {
    ride.endTime = new Date();
  }
  
  await ride.save();
  return ride;
};
