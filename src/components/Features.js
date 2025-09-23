import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      id: 1,
      title: 'Personalized Syllabus',
      description: 'Focus on your strengths & weaknesses. Why do 100% when 60% gives you 99%ile?',
      icon: '🎯'
    },
    {
      id: 2,
      title: 'Curated Questions',
      description: 'Handpicked by IITians from JEE PYQs and standard reference books. Quality over quantity.',
      icon: '📚'
    },
    {
      id: 3,
      title: '"Sar Pe Danda" Effect',
      description: 'Daily tasks, weekly checks, and strict accountability. Build discipline with IITian mentors.',
      icon: '💪'
    },
    {
      id: 4,
      title: 'Smart Scheduling',
      description: 'Book sessions with mentors based on their availability and your convenience.',
      icon: '📅'
    },
    {
      id: 5,
      title: 'Progress Analytics',
      description: 'Visual dashboards show your improvement across subjects & topics in real-time.',
      icon: '📊'
    },
    {
      id: 6,
      title: 'Study Streaks',
      description: 'Gamified consistency tracking to keep you motivated every single day.',
      icon: '🔥'
    }
  ];

  return (
    <section className="features" data-testid="features-section">
      <div className="features-container">
        <div className="section-header">
          <h2>Our X-Factors</h2>
          <p>What makes AchieveX different from every other JEE platform</p>
        </div>
        
        <div className="features-grid">
          {features.map(feature => (
            <div key={feature.id} className="feature-card" data-testid={`feature-${feature.id}`}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="features-cta">
          <h3>Ready to Transform Your JEE Preparation?</h3>
          <button className="btn-primary" data-testid="explore-features-btn">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;