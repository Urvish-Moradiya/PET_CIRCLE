import React from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../assets/image/final.png'

const Navbar = ({ isMenuOpen, setIsMenuOpen, setShowLoginModal }) => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={icon} className='mr-2'/>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">PetCircle</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: '/', label: 'Home', icon: 'home' },
              { path: '/adoption', label: 'Adoption', icon: 'heart' },
              { path: '/communities', label: 'Communities', icon: 'users' },
              { path: '/knowledge', label: 'Knowledge', icon: 'book' },
              { path: '/events', label: 'Events', icon: 'calendar-alt' },
              { path: '/pets', label: 'Pet Profiles', icon: 'paw' }
            ].map(({ path, label, icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-gray-600 hover:text-fuchsia-600 cursor-pointer relative group ${
                    isActive ? 'text-purple-700 font-semibold' : ''
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center">
                      <i className={`fas fa-${icon} mr-2`}></i>
                      {label}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform origin-left transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setShowLoginModal(true)}
              className="!rounded-button bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap transform hover:scale-105 transition-transform"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Login
            </button>
            <NavLink
              to="/profile"
              className="bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white px-6 py-2 rounded-full cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap transform hover:scale-105 transition-transform"
            >
              <i className="fas fa-user mr-2"></i>
              Profile
            </NavLink>
          </div>
          <button
            className="md:hidden text-gray-600 hover:text-fuchsia-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {[
              { path: '/', label: 'Home', icon: 'home' },
              { path: '/adoption', label: 'Adoption', icon: 'heart' },
              { path: '/communities', label: 'Communities', icon: 'users' },
              { path: '/knowledge', label: 'Knowledge', icon: 'book' },
              { path: '/events', label: 'Events', icon: 'calendar-alt' },
              { path: '/pets', label: 'Pet Profiles', icon: 'paw' }
            ].map(({ path, label, icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-2 rounded-lg ${
                    isActive ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-600 hover:bg-fuchsia-50 hover:text-fuchsia-600'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <i className={`fas fa-${icon} mr-2`}></i>{label}
              </NavLink>
            ))}
            <div className="pt-2 border-t space-y-2">
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  setIsMenuOpen(false);
                }}
                className="!rounded-button w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 whitespace-nowrap"
              >
                <i className="fas fa-sign-in-alt mr-2"></i>Login
              </button>
              <button
                to="/profile"
                className="block w-full text-center bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white px-4 py-1 rounded-lg whitespace-nowrap"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-user mr-2"></i>Profile
                </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;