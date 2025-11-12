import React from 'react';
import { useNotifications } from '../hooks/useNotifications';

interface NotificationProps {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  variant: 'admin' | 'industry' | 'public';
}

export const Notification: React.FC<NotificationProps> = ({ id, message, type, variant }) => {
  const { removeNotification } = useNotifications();

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeNotification(id);
  };

  const variantClass = `notification-${variant}`;
  
  return (
    <div className={`notification-item ${type} ${variantClass}`}>
      <span className="notification-message">{message}</span>
      <button className="notification-close-btn" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};