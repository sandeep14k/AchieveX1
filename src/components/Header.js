import React from 'react';
import './Header.css';

const Header = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'courses', label: 'Courses' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
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
          <button className="btn-secondary" data-testid="login-btn">
            Login
          </button>
          <button className="btn-primary" data-testid="signup-btn">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;