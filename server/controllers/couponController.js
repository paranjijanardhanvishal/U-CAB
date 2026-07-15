import Coupon from '../models/Coupon.js';

export const getActiveCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ isActive: true, expiryDate: { $gt: new Date() } });
    res.status(200).json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching coupons', error: error.message });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ 
      code: code.toUpperCase(), 
      isActive: true, 
      expiryDate: { $gt: new Date() } 
    });

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
    }

    res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error validating coupon', error: error.message });
  }
};
