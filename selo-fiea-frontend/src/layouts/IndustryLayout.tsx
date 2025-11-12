import React from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationContainer } from '../components/NotificationContainer';

export const IndustryLayout: React.FC = () => {
  return (
    <>
      <NotificationContainer variant="industry" />
      <main>
        <Outlet />
      </main>
    </>
  );
};