import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const LandingHeader = ({ activeSection, setActiveSection, currentUser }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'courses', label: 'Courses' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    try {
      await logout();
      // User will stay on landing page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => setActiveSection('home')} style={{ cursor: 'pointer' }}>
          <h1>AchieveX</h1>
          <span className="tagline">JEE Mentorship</span>
        </div>
        
        <nav className="nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
              data-testid={`nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="header-actions">
          {currentUser ? (
            // Show user menu when logged in
            <div className="user-menu">
              <button className="btn-secondary" onClick={handleDashboard} data-testid="dashboard-btn">
                Dashboard
              </button>
              <button className="btn-outline" onClick={handleLogout} data-testid="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            // Show login/signup when not logged in
            <div className="auth-buttons">
              <button className="btn-secondary" onClick={handleLogin} data-testid="login-btn">
                Login
              </button>
              <button className="btn-primary" onClick={handleSignup} data-testid="signup-btn">
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;