import React from 'react';
import './Hero.css';

const Hero = ({ setActiveSection, onGetStarted }) => {
  return (
    <section className="hero" data-testid="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Join AchieveX, <span className="highlight">Achieve Exponentially</span>
          </h1>
          <p className="hero-tagline">
            If enrolled, your seat in IIT/NIT is fixed.
          </p>
          <p className="hero-description">
            Connect directly with IIT Kanpur mentors. Get personalized guidance, curated study material, 
            and accountability systems that ensure smart, consistent, and effective JEE preparation.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <h3>10+</h3>
              <p>IIT Kanpur Mentors</p>
            </div>
            <div className="stat">
              <h3>₹19</h3>
              <p>First Session</p>
            </div>
            <div className="stat">
              <h3>100%</h3>
              <p>Personalized Plans</p>
            </div>
          </div>
          <div className="hero-actions">
            <button 
              className="btn-primary-large" 
              onClick={onGetStarted || (() => setActiveSection('courses'))}
              data-testid="start-learning-btn"
            >
              Book ₹19 Session
            </button>
            <button 
              className="btn-secondary-large" 
              onClick={() => setActiveSection('courses')}
              data-testid="free-consultation-btn"
            >
              View Plans
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card">
            <h4>Direct IIT Kanpur</h4>
            <p>Mentorship</p>
            <span className="badge">10+ Mentors Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;