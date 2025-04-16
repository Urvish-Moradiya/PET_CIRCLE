import React from 'react';

const Sidebar = ({ activeTab, onItemClick }) => {
  const sidebarItems = [
    {
      key: 'dashboard',
      title: 'Dashboard',
      icon: 'fa-chart-line',
      bottom: false,
    },
    {
      key: 'users',
      title: 'User Management',
      icon: 'fa-users',
      bottom: false,
    },
    {
      key: 'pets',
      title: 'Pet Profiles',
      icon: 'fa-paw',
      bottom: false,
    },
    {
      key: 'content',
      title: 'Content Management',
      icon: 'fa-newspaper',
      bottom: false,
    },
    {
      key: 'adoption',
      title: 'Adoption Center',
      icon: 'fa-home',
      bottom: false,
    },
    {
      key: 'community',
      title: 'Community',
      icon: 'fa-comments',
      bottom: false,
    },
    {
      key: 'events',
      title: 'Events',
      icon: 'fa-calendar',
      bottom: false,
    },
    {
      key: 'experts',
      title: 'Expert & Learning',
      icon: 'fa-graduation-cap',
      bottom: false,
    },
    {
      key: 'settings',
      title: 'Settings',
      icon: 'fa-cog',
      bottom: true,
    },
    {
      key: 'logout',
      title: 'Logout',
      icon: 'fa-sign-out-alt',
      bottom: true,
    },
  ];

  const mainItems = sidebarItems.filter(item => !item.bottom);
  const bottomItems = sidebarItems.filter(item => item.bottom);

  return (
    <div className="w-64 bg-indigo-800 text-white shadow-lg h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold flex items-center">
          <i className="fas fa-paw mr-2"></i>
          Pet Community
        </h1>
        <p className="text-indigo-200 text-sm mt-1">Admin Panel</p>
      </div>
      <nav className="mt-6 flex-1 flex flex-col justify-between">
        <div>
          {mainItems.map(item => (
            <div
              key={item.key}
              className={`px-6 py-3 flex items-center cursor-pointer ${
                activeTab === item.key
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-100 hover:bg-indigo-700'
              }`}
              onClick={() => onItemClick(item.key)}
            >
              <i className={`fas ${item.icon} w-5 text-center`}></i>
              <span className="ml-3">{item.title}</span>
              {activeTab === item.key && (
                <i className="fas fa-circle text-xs ml-auto"></i>
              )}
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-indigo-700">
          {bottomItems.map(item => (
            <div
              key={item.key}
              className={`px-6 py-3 flex items-center cursor-pointer ${
                activeTab === item.key
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-100 hover:bg-indigo-700'
              }`}
              onClick={() => onItemClick(item.key)}
            >
              <i className={`fas ${item.icon} w-5 text-center`}></i>
              <span className="ml-3">{item.title}</span>
              {activeTab === item.key && (
                <i className="fas fa-circle text-xs ml-auto"></i>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;