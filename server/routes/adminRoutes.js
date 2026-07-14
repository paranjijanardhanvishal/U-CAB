import express from 'express';
import { getStats, getUsers, getDrivers, getRides } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, admin);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/drivers', getDrivers);
router.get('/rides', getRides);

export default router;
