import mongoose from 'mongoose';
import { PAYMENT_STATUS } from '../utils/constants.js';

const paymentSchema = new mongoose.Schema(
  {
    ride: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Ride',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
    paymentMethod: {
      type: String,
      default: 'Cash',
    },
    transactionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
