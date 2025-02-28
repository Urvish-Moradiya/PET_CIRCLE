import React from 'react';
import { Sidebar } from './Sidebar';

const MainLayout = ({children }) => {
  return (
    <div className="app-container">
      <Sidebar>
        {children}
      </Sidebar>
    </div>
  );
};
export default MainLayout