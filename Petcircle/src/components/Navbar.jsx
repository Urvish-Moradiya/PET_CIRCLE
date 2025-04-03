import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import icon from '../assets/image/final.png';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  // Check if user is logged in by checking authToken in localStorage
  const isLoggedIn = !!localStorage.getItem('authToken');
  const navigate = useNavigate();

  // Get user data and role
  const userData = isLoggedIn ? JSON.parse(localStorage.getItem('userData') || '{}') : {};
  const userRole = userData.role || 'petOwner'; // Default to 'petOwner' if no role

  // Define navigation items for different roles
  const navItems = {
    petOwner: [
      { path: '/', label: 'Home', icon: 'home' },
      { path: '/adoption', label: 'Adoption', icon: 'heart' },
      { path: '/communities', label: 'Communities', icon: 'users' },
      { path: '/knowledge', label: 'Knowledge', icon: 'book' },
      { path: '/events', label: 'Events', icon: 'calendar-alt' },
      { path: '/pets', label: 'Pet Profiles', icon: 'paw' }
    ],
    petExpert: [
      { path: '/', label: 'Home', icon: 'home' },
      { path: '/knowledge', label: 'Knowledge', icon: 'book' },
      { path: '/communities', label: 'Communities', icon: 'users' },
      { path: '/events', label: 'Events', icon: 'calendar-alt' }
    ]
  };

  // Select navigation items based on role
  const currentNavItems = userRole === 'petExpert' ? navItems.petExpert : navItems.petOwner;

  const handleLoginClick = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={icon} className="mr-2 h-10 w-10" alt="PetCircle Logo" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              PetCircle
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {currentNavItems.map(({ path, label, icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-gray-600 hover:text-fuchsia-600 cursor-pointer flex items-center transition-colors duration-200 ${
                    isActive ? 'text-purple-700 font-semibold' : ''
                  }`
                }
              >
                <i className={`fas fa-${icon} mr-2`}></i>
                {label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <NavLink
                to="/profile"
                className="flex items-center bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105"
              >
                <i className="fas fa-user-circle text-xl mr-2"></i>
                <span>Profile</span>
              </NavLink>
            ) : (
              <button
                onClick={handleLoginClick}
                className="flex items-center bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105"
              >
                <i className="fas fa-sign-in-alt text-xl mr-2"></i>
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-fuchsia-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-slideDown">
          <div className="px-4 py-4 space-y-3">
            {currentNavItems.map(({ path, label, icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    isActive ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-600 hover:bg-fuchsia-50 hover:text-fuchsia-600'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <i className={`fas fa-${icon} mr-3`}></i>
                {label}
              </NavLink>
            ))}
            
            {/* Mobile Auth Section */}
            <div className="pt-3 border-t">
              {isLoggedIn ? (
                <NavLink
                  to="/profile"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-user-circle text-xl mr-2"></i>
                  <span>Profile</span>
                </NavLink>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200"
                >
                  <i className="fas fa-sign-in-alt text-xl mr-2"></i>
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;