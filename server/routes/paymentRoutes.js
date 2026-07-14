import express from 'express';
import { makePayment, getPaymentHistory } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, makePayment);
router.get('/history', protect, getPaymentHistory);

export default router;
