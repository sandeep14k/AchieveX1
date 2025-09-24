import React from 'react';
import './XFactor.css';

const XFactor = () => {
  return (
    <section className="x-factor" data-testid="x-factor-section">
      <div className="x-factor-container">
        <div className="x-factor-header">
          <h2 className="x-factor-title">
            Our 3 <span className="highlight">X-Factors</span>
          </h2>
          <p className="x-factor-subtitle">
            Why AchieveX students crack JEE with 60% effort while others struggle with 100%? 
            These three game-changing strategies make all the difference.
          </p>
        </div>

        <div className="x-factor-grid">
          <div className="x-factor-card primary" data-testid="personalized-syllabus">
            <div className="card-icon">
              <div className="icon-circle">🎯</div>
            </div>
            <div className="card-number">1</div>
            <h3>Personalized Syllabus</h3>
            <p className="card-tagline">
              Focus on your strengths & weaknesses. <br/>
              <strong>Why do 100% when 60% gives you 99%ile?</strong>
            </p>
            <p>
              Skip what you already know. Master what you don't. Our AI-powered analysis 
              creates a study plan that targets your exact weak spots, eliminating 
              wasted time on topics you've already conquered.
            </p>
            <div className="card-highlight">Smart Study, Not Hard Study</div>
          </div>

          <div className="x-factor-card secondary" data-testid="curated-questions">
            <div className="card-icon">
              <div className="icon-circle">💎</div>
            </div>
            <div className="card-number">2</div>
            <h3 className='card-heading2'>Curated Questions</h3>
            <p className="card-tagline">
              Handpicked by IITians from JEE PYQs and standard reference books. <br/>
              <strong>Quality over quantity.</strong>
            </p>
            <p>
              Why solve 1000 random problems when 100 carefully selected ones can 
              teach you everything? Our IIT mentors hand-pick questions that cover 
              maximum concepts with minimum effort.
            </p>
            <div className="card-highlight">500+ Premium Questions</div>
          </div>

          <div className="x-factor-card accent" data-testid="sar-pe-danda">
            <div className="card-icon">
              <div className="icon-circle">⚡</div>
            </div>
            <div className="card-number">3</div>
            <h3>"Sar Pe Danda" Effect</h3>
            <p className="card-tagline">
              Daily tasks, weekly checks, and strict accountability. <br/>
              <strong>Build discipline with IITian mentors.</strong>
            </p>
            <p>
              No more procrastination. Your personal IIT mentor ensures you complete 
              daily targets, tracks your progress weekly, and keeps you accountable 
              every step of the way. Discipline is the key to success.
            </p>
            <div className="card-highlight">Daily Accountability</div>
          </div>
        </div>

        <div className="x-factor-bottom">
          <div className="comparison-highlight">
            <h4>The AchieveX Advantage vs Traditional Coaching</h4>
            <div className="comparison-grid">
              <div className="comparison-item">
                <span className="comparison-label">Traditional Coaching</span>
                <span className="comparison-vs">vs</span>
                <span className="comparison-label achievex">AchieveX</span>
              </div>
              <div className="comparison-row">
                <span>Study entire syllabus blindly</span>
                <span>⚡</span>
                <span>Focus only on your weak areas</span>
              </div>
              <div className="comparison-row">
                <span>Thousands of random questions</span>
                <span>⚡</span>
                <span>Curated questions by IITians</span>
              </div>
              <div className="comparison-row">
                <span>No accountability after class</span>
                <span>⚡</span>
                <span>Daily tasks & strict monitoring</span>
              </div>
              <div className="comparison-row">
                <span>Same approach for everyone</span>
                <span>⚡</span>
                <span>Personalized strategy for each student</span>
              </div>
            </div>
          </div>
          
          <div className="stats-showcase">
            <div className="stat-item">
              <div className="stat-number">60%</div>
              <div className="stat-label">Study Time Reduction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99%ile</div>
              <div className="stat-label">Target Achievement</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Daily Accountability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default XFactor;