import React from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { Notification } from './Notification';
import './Notification.css'; 

interface NotificationInboxProps {
  isOpen: boolean;
  variant: 'admin' | 'industry' | 'public';
}

export const NotificationInbox: React.FC<NotificationInboxProps> = ({ isOpen, variant }) => {
  const { notifications, clearNotifications } = useNotifications();

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`notification-inbox ${variant}`}>
      <div className="inbox-header">
        <h3>Notificações</h3>
        {notifications.length > 0 && (
          <button onClick={clearNotifications} className="inbox-clear-btn">
            Limpar tudo
          </button>
        )}
      </div>
      <div className="inbox-list">
        {notifications.length === 0 ? (
          <p className="inbox-empty">Nenhuma notificação</p>
        ) : (
          notifications.map(notification => (
            <Notification
              key={notification.id}
              id={notification.id}
              message={notification.message}
              type={notification.type}
              variant={variant}
            />
          ))
        )}
      </div>
    </div>
  );
};