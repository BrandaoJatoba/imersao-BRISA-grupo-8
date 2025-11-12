import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationBell } from '../components/NotificationBell';
import { NotificationInbox } from '../components/NotificationInbox';

export const IndustryLayout: React.FC = () => {
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  return (
    <>
      <header className="notification-header-area">
        <NotificationBell 
          variant="industry" 
          onClick={() => setIsInboxOpen(prev => !prev)} 
        />
      </header>
      <NotificationInbox 
        variant="industry" 
        isOpen={isInboxOpen} 
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};