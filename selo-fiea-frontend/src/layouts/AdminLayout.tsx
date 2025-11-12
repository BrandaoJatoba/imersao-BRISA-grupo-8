import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationBell } from '../components/NotificationBell';
import { NotificationInbox } from '../components/NotificationInbox';

export const AdminLayout: React.FC = () => {
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  return (
    <>
      <header className="notification-header-area">
        <NotificationBell 
          variant="admin" 
          onClick={() => setIsInboxOpen(prev => !prev)} 
        />
      </header>
      <NotificationInbox 
        variant="admin" 
        isOpen={isInboxOpen} 
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};