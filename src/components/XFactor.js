import React from 'react';
import './XFactor.css';

const XFactor = () => {
  return (
    <section className="x-factor" data-testid="x-factor-section">
      <div className="x-factor-container">
        <div className="x-factor-header">
          <h2 className="x-factor-title">
            What Makes AchieveX <span className="highlight">Different?</span>
          </h2>
          <p className="x-factor-subtitle">
            Our X-Factor: Direct access to IIT Kanpur mentors with a personalized, 
            result-driven approach that guarantees your success.
          </p>
        </div>

        <div className="x-factor-grid">
          <div className="x-factor-card primary">
            <div className="card-icon">
              <div className="icon-circle">🎯</div>
            </div>
            <h3>Direct IIT Kanpur Connection</h3>
            <p>
              Unlike coaching centers with thousands of students, get 1-on-1 guidance 
              from actual IIT Kanpur alumni who understand your journey.
            </p>
            <div className="card-highlight">10+ IIT Kanpur Mentors</div>
          </div>

          <div className="x-factor-card">
            <div className="card-icon">
              <div className="icon-circle">📊</div>
            </div>
            <h3>AI-Powered Test Analysis</h3>
            <p>
              Upload your tests and get detailed analysis with personalized improvement 
              strategies. Know exactly what to study next.
            </p>
            <div className="card-highlight">Real-time Feedback</div>
          </div>

          <div className="x-factor-card">
            <div className="card-icon">
              <div className="icon-circle">💡</div>
            </div>
            <h3>Personalized Study Plans</h3>
            <p>
              No generic courses. Every plan is crafted based on your strengths, 
              weaknesses, and target college preferences.
            </p>
            <div className="card-highlight">100% Customized</div>
          </div>

          <div className="x-factor-card">
            <div className="card-icon">
              <div className="icon-circle">⚡</div>
            </div>
            <h3>Real-time Mentorship</h3>
            <p>
              Stuck on a problem at 11 PM? Chat directly with your mentor for 
              instant help and motivation when you need it most.
            </p>
            <div className="card-highlight">24/7 Support</div>
          </div>

          <div className="x-factor-card">
            <div className="card-icon">
              <div className="icon-circle">🏆</div>
            </div>
            <h3>Guaranteed Results</h3>
            <p>
              If enrolled, your seat in IIT/NIT is fixed. We're so confident in our 
              approach that we guarantee your success.
            </p>
            <div className="card-highlight">IIT/NIT Guarantee</div>
          </div>

          <div className="x-factor-card">
            <div className="card-icon">
              <div className="icon-circle">💰</div>
            </div>
            <h3>Try Before You Commit</h3>
            <p>
              Start with just ₹19 trial session. Experience our mentorship quality 
              before making any major investment.
            </p>
            <div className="card-highlight">₹19 Trial</div>
          </div>
        </div>

        <div className="x-factor-bottom">
          <div className="comparison-highlight">
            <h4>Why Choose AchieveX Over Traditional Coaching?</h4>
            <div className="comparison-grid">
              <div className="comparison-item">
                <span className="comparison-label">Traditional Coaching</span>
                <span className="comparison-vs">vs</span>
                <span className="comparison-label achievex">AchieveX</span>
              </div>
              <div className="comparison-row">
                <span>1 teacher : 100+ students</span>
                <span>⚔️</span>
                <span>1 mentor : 1 student</span>
              </div>
              <div className="comparison-row">
                <span>Generic study material</span>
                <span>⚔️</span>
                <span>Personalized plans</span>
              </div>
              <div className="comparison-row">
                <span>Fixed batch timings</span>
                <span>⚔️</span>
                <span>Flexible scheduling</span>
              </div>
              <div className="comparison-row">
                <span>Expensive fees upfront</span>
                <span>⚔️</span>
                <span>Start with ₹19 trial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default XFactor;