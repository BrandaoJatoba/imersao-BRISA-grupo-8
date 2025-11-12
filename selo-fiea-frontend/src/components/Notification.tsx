import React, { useEffect, useState } from 'react';
import { useNotifications } from '../hooks/useNotifications';

interface NotificationProps {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  variant: 'admin' | 'industry' | 'public';
}

export const Notification: React.FC<NotificationProps> = ({ id, message, type, variant }) => {
  const { removeNotification } = useNotifications();
  const [exiting, setExiting] = useState(false);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      removeNotification(id);
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const variantClass = `notification-${variant}`;
  
  return (
    <div 
      className={`notification ${type} ${variantClass} ${exiting ? 'exit' : 'enter'}`}
      onClick={handleClose}
    >
      {message}
      <button className="notification-close-btn">&times;</button>
    </div>
  );
};