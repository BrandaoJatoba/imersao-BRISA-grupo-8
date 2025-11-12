import React from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { Notification } from './Notification';
import './Notification.css';

interface NotificationContainerProps {
  variant: 'admin' | 'industry' | 'public';
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({ variant }) => {
  const { notifications } = useNotifications();

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          variant={variant}
        />
      ))}
    </div>
  );
};