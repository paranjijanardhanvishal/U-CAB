import mongoose from 'mongoose';
import { RIDE_STATUS } from '../utils/constants.js';

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
    },
    pickupLocation: {
      address: { type: String, required: true },
      state: { type: String },
      city: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
    },
    dropoffLocation: {
      address: { type: String, required: true },
      state: { type: String },
      city: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
    },
    pickupDate: { type: String },
    pickupTime: { type: String },
    dropDate: { type: String },
    dropTime: { type: String },
    fare: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(RIDE_STATUS),
      default: RIDE_STATUS.REQUESTED,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Ride = mongoose.model('Ride', rideSchema);
export default Ride;
