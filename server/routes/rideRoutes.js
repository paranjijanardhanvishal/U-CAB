import express from 'express';
import { 
  requestRide, 
  getRideById, 
  getMyRides, 
  getAvailableRides, 
  acceptRide, 
  updateRideStatus,
  getDriverRides,
  getCurrentRide,
  cancelRide
} from '../controllers/rideController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, requestRide);

router.get('/myrides', protect, getMyRides);
router.get('/driver', protect, getDriverRides);
router.get('/available', protect, getAvailableRides);
router.get('/current', protect, getCurrentRide);

router.route('/:id')
  .get(protect, getRideById);

router.put('/:id/accept', protect, acceptRide);
router.put('/:id/status', protect, updateRideStatus);
router.put('/:id/cancel', protect, cancelRide);

export default router;
