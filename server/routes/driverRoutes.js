import express from 'express';
import { getProfile, updateAvailability, updateLocation } from '../controllers/driverController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/availability', protect, updateAvailability);
router.put('/location', protect, updateLocation);

export default router;
