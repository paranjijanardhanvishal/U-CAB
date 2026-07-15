import express from 'express';
import { getProfile, updateAvailability, updateLocation, getVehicle, addVehicle, getTrips, getEarnings } from '../controllers/driverController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/availability', protect, updateAvailability);
router.put('/location', protect, updateLocation);

router.get('/vehicle', protect, getVehicle);
router.post('/vehicle', protect, addVehicle);
router.get('/trips', protect, getTrips);
router.get('/earnings', protect, getEarnings);

export default router;
