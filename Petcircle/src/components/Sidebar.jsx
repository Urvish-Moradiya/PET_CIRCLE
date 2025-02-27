import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Sidebar.css';
import logo from '../assets/image/newlogo.png';

export const Sidebar = ({ userRole, onLogout, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = () => {
    navigate('/login'); // Redirect to login page
  };

  const handleLogout = () => {
    onLogout(); // Log out the user
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div className="container">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-details">
          <img src={logo} alt="Pet Circle" className="icon" />
          <i
            className={`bx ${isSidebarOpen ? 'bx-menu-alt-right' : 'bx-menu'}`}
            id="btn"
            onClick={toggleSidebar}
          />
        </div>
        <ul className="nav-list">
          <li>
            <Link to="/">
              <i className="bx bx-home-alt" />
              <span className="links_name">Home</span>
            </Link>
            <span className="tooltip">Home</span>
          </li>
          <li>
            <Link to="/my-pet">
              <span className="pet">🐻‍❄️</span>
              <span className="links_name">My Pet</span>
            </Link>
            <span className="tooltip">My Pet</span>
          </li>
          <li>
            <Link to="/communities">
              <i className="bx bx-group" />
              <span className="links_name">Communities</span>
            </Link>
            <span className="tooltip">Communities</span>
          </li>
          <li>
            <Link to="/adoption">
              <i className="bx bx-heart" />
              <span className="links_name">Adoption Center</span>
            </Link>
            <span className="tooltip">Adoption</span>
          </li>
          <li>
            <Link to="/events">
              <i className="bx bx-calendar-event" />
              <span className="links_name">Events & Contests</span>
            </Link>
            <span className="tooltip">Events</span>
          </li>
          <li>
            <Link to="/messages">
              <i className="bx bx-message-rounded-dots" />
              <span className="links_name">Messages</span>
            </Link>
            <span className="tooltip">Messages</span>
          </li>
          {userRole === 'expert' && (
            <>
              <li>
                <Link to="/expert/sessions">
                  <i className="bx bx-chalkboard" />
                  <span className="links_name">My Sessions</span>
                </Link>
                <span className="tooltip">Sessions</span>
              </li>
              <li>
                <Link to="/expert/articles">
                  <i className="bx bx-edit" />
                  <span className="links_name">My Articles</span>
                </Link>
                <span className="tooltip">Articles</span>
              </li>
              <li>
                <Link to="/expert/consultations">
                  <i className="bx bx-conversation" />
                  <span className="links_name">Consultations</span>
                </Link>
                <span className="tooltip">Consultations</span>
              </li>
            </>
          )}
          {userRole === 'admin' && (
            <>
              <li>
                <Link to="/admin/dashboard">
                  <i className="bx bx-grid-alt" />
                  <span className="links_name">Dashboard</span>
                </Link>
                <span className="tooltip">Dashboard</span>
              </li>
              <li>
                <Link to="/admin/users">
                  <i className="bx bx-user-check" />
                  <span className="links_name">User Management</span>
                </Link>
                <span className="tooltip">Users</span>
              </li>
            </>
          )}
          <li>
            <Link to="/settings">
              <i className="bx bx-cog" />
              <span className="links_name">Settings</span>
            </Link>
            <span className="tooltip">Settings</span>
          </li>
          <li className="profile">
            <div className="profile-details">
              <img src="profile.jpg" alt="Profile" />
              <div className="name_job">
                <div className="name">User Name</div>
                <div className="job">
                  {userRole === 'admin'
                    ? 'Administrator'
                    : userRole === 'expert'
                    ? 'Pet Expert'
                    : 'Pet Owner'}
                </div>
              </div>
            </div>
            {userRole ? (
              <i
                className="bx bx-log-out"
                id="log_out"
                onClick={handleLogout}
                title="Logout"
              />
            ) : (
              <button
                className="login-button"
                onClick={handleLogin}
                title="Login"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
      <section className="home-section">{children}</section>
    </div>
  );
};
