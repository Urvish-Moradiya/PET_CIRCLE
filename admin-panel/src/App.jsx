import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import PetProfiles from './components/PetProfiles';
import ContentManagement from './components/ContentManagement';
import AdoptionCenter from './components/AdoptionCenter';
import Community from './components/Community';
import Events from './components/Events';
import ExpertLearning from './components/ExpertLearning';
import Settings from './components/Settings';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onItemClick={setActiveTab} />
      <div className="flex-1 flex flex-col">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'pets' && <PetProfiles />}
        {activeTab === 'content' && <ContentManagement />}
        {activeTab === 'adoption' && <AdoptionCenter />}
        {activeTab === 'community' && <Community />}
        {activeTab === 'events' && <Events />}
        {activeTab === 'experts' && <ExpertLearning />}
        {activeTab === 'settings' && <Settings />}
        {activeTab === 'logout' && (
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-2xl font-semibold text-gray-800">Logging out...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;