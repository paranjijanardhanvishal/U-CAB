import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FaWallet, FaPlus, FaHistory, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Wallet = () => {
  const transactions = [
    { id: 1, type: 'credit', amount: 50.00, desc: 'Added via Credit Card', date: 'Oct 24, 2026' },
    { id: 2, type: 'debit', amount: 12.50, desc: 'Ride to Market St', date: 'Oct 23, 2026' },
    { id: 3, type: 'credit', amount: 10.00, desc: 'Referral Bonus', date: 'Oct 20, 2026' },
  ];

  return (
    <div>
      <SectionHeader title="My Wallet" description="Manage your funds and payment methods." />
      
      <div className="row g-4 mb-4">
        <div className="col-lg-4">
          <Card className="h-100 bg-primary text-white border-0 shadow-sm text-center py-4">
            <FaWallet size={48} className="opacity-50 mb-3 mx-auto" />
            <h5 className="fw-normal mb-1">Available Balance</h5>
            <h1 className="display-4 fw-bold mb-4">₹475.50</h1>
            <Button variant="light" className="text-primary fw-bold mx-auto px-4">
              <FaPlus className="me-2" /> Add Funds
            </Button>
          </Card>
        </div>
        
        <div className="col-lg-8">
          <Card title="Recent Transactions" className="h-100 border-0 shadow-sm">
            <div className="list-group list-group-flush">
              {transactions.map(t => (
                <div key={t.id} className="list-group-item d-flex justify-content-between align-items-center py-3 border-light">
                  <div className="d-flex align-items-center gap-3">
                    <div className={`p-2 rounded-circle ${t.type === 'credit' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                      {t.type === 'credit' ? <FaArrowDown /> : <FaArrowUp />}
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">{t.desc}</h6>
                      <small className="text-muted">{t.date}</small>
                    </div>
                  </div>
                  <h6 className={`mb-0 fw-bold ${t.type === 'credit' ? 'text-success' : 'text-danger'}`}>
                    {t.type === 'credit' ? '+' : '-'}₹{t.amount.toFixed(2)}
                  </h6>
                </div>
              ))}
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
