import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { FaHistory, FaCar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RideHistory = () => {
  return (
    <div>
      <SectionHeader 
        title="Ride History" 
        description="View your past trips and receipts."
      />
      
      <Card className="h-100">
        <EmptyState 
          icon={FaHistory} 
          title="You haven't taken any rides yet" 
          description="When you take a ride with Ucab, your receipts and trip details will appear here."
          action={
            <Link to="/book-ride">
              <Button variant="primary">Book your first ride</Button>
            </Link>
          }
          className="py-5"
        />
      </Card>
    </div>
  );
};

export default RideHistory;
