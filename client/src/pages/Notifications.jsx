import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import { FaCar, FaTag, FaShieldAlt, FaInfoCircle, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import api from '../services/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data.data);
    } catch (error) {
      console.error('Failed to load notifications', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id, isRead) => {
    if (isRead) return;
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  const getIconAndColor = (type) => {
    switch (type) {
      case 'success': return { Icon: FaCheckCircle, color: 'success' };
      case 'warning': return { Icon: FaExclamationTriangle, color: 'warning' };
      case 'error': return { Icon: FaExclamationTriangle, color: 'danger' };
      default: return { Icon: FaInfoCircle, color: 'primary' };
    }
  };

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  }

  return (
    <div>
      <SectionHeader title="Notifications" />
      
      <Card className="border-0 shadow-sm p-0 overflow-hidden">
        <div className="list-group list-group-flush">
          {notifications.length === 0 ? (
            <div className="text-center py-5 text-muted">No notifications found</div>
          ) : (
            notifications.map((notif) => {
              const { Icon, color } = getIconAndColor(notif.type);
              return (
                <div 
                  key={notif._id} 
                  className={`list-group-item list-group-item-action p-4 border-light cursor-pointer ${!notif.isRead ? 'bg-light' : ''}`}
                  onClick={() => handleMarkAsRead(notif._id, notif.isRead)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex gap-4">
                    <div className={`mt-1 text-${color}`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                          {notif.title}
                          {!notif.isRead && <span className="badge bg-primary rounded-pill" style={{width: '8px', height: '8px', padding: 0}}></span>}
                        </h6>
                        <small className="text-muted text-nowrap">{new Date(notif.createdAt).toLocaleDateString()}</small>
                      </div>
                      <p className="text-muted mb-0">{notif.message}</p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </Card>
    </div>
  );
};

export default Notifications;
