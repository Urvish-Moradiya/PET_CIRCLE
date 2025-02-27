import React from 'react';
import { Sidebar } from './Sidebar';

const MainLayout = ({ user, onLogout, children }) => {
  return (
    <div className="app-container">
      <Sidebar userRole={user?.role} onLogout={onLogout}>
        {children}
      </Sidebar>
    </div>
  );
};
export default MainLayout