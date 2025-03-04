import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/Home.css';
import logo from '../../assets/image/newlogo.png'
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome for icons

const Home = () => {
  return (
    <div className="home-container">
      {/* Top header with contact and social links */}
      <div className="top-header">
        <div className="contact-info">
          <i className="fas fa-phone"></i> +00 1234 567 &nbsp;|&nbsp;
          <i className="fas fa-envelope"></i> youremail@email.com
        </div>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-dribbble"></i></a>
        </div>
      </div>

      {/* Hero Section with Overlay */}
      <header className="hero-section">
        <div className="overlay"></div>
        <div className="content">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Connect with pet lovers worldwide</h1>
          <button className="learn-more-btn">Learn More</button>
        </div>
      </header>

      {/* Card Section */}
      <div className="card-container">
        <div className="card">
          <div className="icon">&#128062;</div>
          <h3>Communities</h3>
          <p>We offer the best walking service for your pet.</p>
          <Link to="/communities">
            <button className="btn">Explore</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">&#128062;</div>
          <h3>Adoption Center</h3>
          <p>Our daycare will keep your pet happy while you're away.</p>
          <Link to="/adoption">
            <button className="btn">Explore</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">&#128062;</div>
          <h3>Events</h3>
          <p>We offer top-notch grooming services for your pet.</p>
          <Link to="/events">
            <button className="btn">Explore</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
