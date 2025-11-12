import React from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationContainer } from '../components/NotificationContainer';

export const PublicLayout: React.FC = () => {
  return (
    <>
      <NotificationContainer variant="public" />
      <main>
        <Outlet />
      </main>
    </>
  );
};