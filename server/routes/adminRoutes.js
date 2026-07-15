import express from 'express';
import { getStats, getUsers, getDrivers, getRides, getAllCabs, createCab, updateCab, deleteCab } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, admin);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/drivers', getDrivers);
router.get('/rides', getRides);

// Cabs Management
router.get('/cabs', getAllCabs);
router.post('/cabs', createCab);
router.put('/cabs/:id', updateCab);
router.delete('/cabs/:id', deleteCab);

export default router;
