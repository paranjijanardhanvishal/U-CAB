import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import { FaCar, FaTag, FaShieldAlt } from 'react-icons/fa';

const Notifications = () => {
  const notifications = [
    { type: 'promo', title: 'Weekend Sale is here!', desc: 'Get 20% off all your rides this weekend using code WEEKEND20.', date: '2 hours ago', icon: FaTag, color: 'success', unread: true },
    { type: 'trip', title: 'Rate your last trip', desc: 'How was your ride with Michael? Rate your trip to help us improve.', date: '1 day ago', icon: FaCar, color: 'primary', unread: true },
    { type: 'system', title: 'New Safety Features', desc: 'We have updated our safety guidelines. Please review them before your next ride.', date: '3 days ago', icon: FaShieldAlt, color: 'warning', unread: false },
  ];

  return (
    <div>
      <SectionHeader title="Notifications" />
      
      <Card className="border-0 shadow-sm p-0 overflow-hidden">
        <div className="list-group list-group-flush">
          {notifications.map((notif, idx) => {
            const Icon = notif.icon;
            return (
              <div key={idx} className={`list-group-item list-group-item-action p-4 border-light ${notif.unread ? 'bg-light' : ''}`}>
                <div className="d-flex gap-4">
                  <div className={`mt-1 text-${notif.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                        {notif.title}
                        {notif.unread && <span className="badge bg-primary rounded-pill" style={{width: '8px', height: '8px', padding: 0}}></span>}
                      </h6>
                      <small className="text-muted text-nowrap">{notif.date}</small>
                    </div>
                    <p className="text-muted mb-0">{notif.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  );
};

export default Notifications;
