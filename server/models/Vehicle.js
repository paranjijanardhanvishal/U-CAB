import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    driverName: {
      type: String,
      default: '',
    },
    carImage: {
      type: String, // URL to image
      default: '',
    },
    carName: {
      type: String,
      required: true,
    },
    carType: {
      type: String,
      enum: ['Bike', 'Mini', 'Sedan', 'SUV', 'Premium'],
      required: true,
    },
    pricePerKm: {
      type: Number,
      required: true,
    },
    carNo: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Maintenance', 'Inactive'],
      default: 'Active',
    }
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
