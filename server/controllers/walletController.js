import Wallet from '../models/Wallet.js';

export const getWallet = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.user._id });
    
    if (!wallet) {
      wallet = await Wallet.create({ userId: req.user._id, balance: 0, transactions: [] });
    }
    
    // Sort transactions by date descending
    wallet.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({ success: true, data: wallet });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching wallet', error: error.message });
  }
};

export const addFunds = async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    let wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet) {
      wallet = new Wallet({ userId: req.user._id, balance: 0, transactions: [] });
    }

    wallet.balance += Number(amount);
    wallet.transactions.push({
      type: 'credit',
      amount: Number(amount),
      description: `Added funds via ${paymentMethod || 'Card'}`,
      date: new Date()
    });

    await wallet.save();

    res.status(200).json({ success: true, data: wallet, message: 'Funds added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error adding funds', error: error.message });
  }
};
