import React from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationContainer } from '../components/NotificationContainer';

export const AdminLayout: React.FC = () => {
  return (
    <>
      <NotificationContainer variant="admin" />
      <main>
        <Outlet />
      </main>
    </>
  );
};