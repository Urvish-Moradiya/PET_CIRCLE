import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import icon from '../assets/image/final.png';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = !!user;
  const userRole = user?.role?.toLowerCase() || 'petowner';

  const navItems = {
    petowner: [
      { path: '/', label: 'Home', icon: 'home' },
      { path: '/adoption', label: 'Adoption', icon: 'heart' },
      { path: '/communities', label: 'Communities', icon: 'users' },
      { path: '/knowledge', label: 'Knowledge', icon: 'book' },
      { path: '/events', label: 'Events', icon: 'calendar-alt' },
      { path: '/pets', label: 'Pet Profiles', icon: 'paw' },
    ],
    petexpert: [
      { path: '/', label: 'Home', icon: 'home' },
      { path: '/knowledge2', label: 'Knowledge', icon: 'book' },
      { path: '/communities', label: 'Communities', icon: 'users' },
      { path: '/events', label: 'Events', icon: 'calendar-alt' },
    ],
  };

  const currentNavItems = userRole === 'petexpert' ? navItems.petexpert : navItems.petowner;

  const handleLoginClick = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="fixed top-0 w-full bg-white shadow-md z-50 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={icon} className="mr-2 h-14 w-14" alt="PetCircle Logo" />
            <span className="text-2xl font-bold bg-gradient-to-r from-fuchsia-600 to-rose-500 bg-clip-text text-transparent">
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
                  `text-gray-600 hover:text-fuchsia-600 flex items-center transition-colors duration-200 ${
                    isActive ? 'text-fuchsia-700 font-semibold' : ''
                  }`
                }
                aria-label={label}
              >
                <i className={`fas fa-${icon} mr-2`}></i>
                {label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/profile"
                  className="flex items-center bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105"
                  aria-label="Profile"
                >
                  <i className="fas fa-user-circle text-xl mr-2"></i>
                  <span>Profile</span>
                </NavLink>
               
              </>
            ) : (
              <button
                onClick={handleLoginClick}
                className="flex items-center bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105"
                aria-label="Login"
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
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t transition-all duration-300">
          <div className="px-4 py-4 space-y-3">
            {currentNavItems.map(({ path, label, icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${
                    isActive
                      ? 'bg-fuchsia-50 text-fuchsia-700 font-semibold'
                      : 'text-gray-600 hover:bg-fuchsia-50 hover:text-fuchsia-600'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
                aria-label={label}
              >
                <i className={`fas fa-${icon} mr-3`}></i>
                {label}
              </NavLink>
            ))}

            {/* Mobile Auth Section */}
            <div className="pt-3 border-t">
              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/profile"
                    className="flex items-center justify-center w-full bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Profile"
                  >
                    <i className="fas fa-user-circle text-xl mr-2"></i>
                    <span>Profile</span>
                  </NavLink>
        
                </>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="flex items-center justify-center w-full bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200"
                  aria-label="Login"
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