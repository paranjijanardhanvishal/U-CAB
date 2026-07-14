import express from 'express';
import { 
  requestRide, 
  getRideById, 
  getMyRides, 
  getAvailableRides, 
  acceptRide, 
  updateRideStatus 
} from '../controllers/rideController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, requestRide);

router.get('/myrides', protect, getMyRides);
router.get('/available', protect, getAvailableRides);

router.route('/:id')
  .get(protect, getRideById);

router.put('/:id/accept', protect, acceptRide);
router.put('/:id/status', protect, updateRideStatus);

export default router;
