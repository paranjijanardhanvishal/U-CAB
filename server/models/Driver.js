import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    licenseNumber: {
      type: String,
      required: true,
    },
    vehicleMake: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    vehiclePlate: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    currentLocation: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    rating: {
      type: Number,
      default: 5.0,
    },
  },
  {
    timestamps: true,
  }
);

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;
