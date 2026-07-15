import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FaWallet, FaPlus, FaHistory, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-toastify';

const Wallet = () => {
  const [wallet, setWallet] = useState({ balance: 0, transactions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      setLoading(true);
      const res = await api.get('/wallet');
      if (res.data.data) {
        setWallet(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load wallet');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFunds = async () => {
    const amount = prompt("Enter amount to add to wallet (₹):", "500");
    if (!amount || isNaN(amount) || amount <= 0) return;

    try {
      const res = await api.post('/wallet/add', { amount: Number(amount) });
      setWallet(res.data.data);
      toast.success(`Successfully added ₹${amount} to wallet`);
    } catch (error) {
      toast.error('Failed to add funds');
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  }
  
  return (
    <div>
      <SectionHeader title="My Wallet" description="Manage your funds and payment methods." />
      
      <div className="row g-4 mb-4">
        <div className="col-lg-4">
          <Card className="h-100 bg-primary text-white border-0 shadow-sm text-center py-4">
            <FaWallet size={48} className="opacity-50 mb-3 mx-auto" />
            <h5 className="fw-normal mb-1">Available Balance</h5>
            <h1 className="display-4 fw-bold mb-4">₹{wallet.balance.toFixed(2)}</h1>
            <Button variant="light" className="text-primary fw-bold mx-auto px-4" onClick={handleAddFunds}>
              <FaPlus className="me-2" /> Add Funds
            </Button>
          </Card>
        </div>
        
        <div className="col-lg-8">
          <Card title="Recent Transactions" className="h-100 border-0 shadow-sm">
            <div className="list-group list-group-flush">
              {wallet.transactions.length === 0 ? (
                <div className="text-center py-4 text-muted">No transactions yet</div>
              ) : (
                wallet.transactions.map(t => (
                  <div key={t._id} className="list-group-item d-flex justify-content-between align-items-center py-3 border-light">
                    <div className="d-flex align-items-center gap-3">
                      <div className={`p-2 rounded-circle ${t.type === 'credit' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                        {t.type === 'credit' ? <FaArrowDown /> : <FaArrowUp />}
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">{t.description}</h6>
                        <small className="text-muted">{new Date(t.date).toLocaleDateString()}</small>
                      </div>
                    </div>
                    <h6 className={`mb-0 fw-bold ${t.type === 'credit' ? 'text-success' : 'text-danger'}`}>
                      {t.type === 'credit' ? '+' : '-'}₹{t.amount.toFixed(2)}
                    </h6>
                  </div>
                ))
              )}
            </div>
            <div className="text-center mt-3 border-top pt-3">
              <Button variant="link" className="text-decoration-none">View All History</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
