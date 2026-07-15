import express from 'express';
import { getActiveCoupons, validateCoupon } from '../controllers/couponController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getActiveCoupons);

router.route('/validate')
  .post(protect, validateCoupon);

export default router;
