import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './ImpactShowcase.css';

const ImpactShowcase = ({ setActiveSection }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  // Animated counter hook
  const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let startTime = null;
      let animationFrame;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(end * easeOutExpo));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return count;
  };

  // Impact statistics
  const stats = [
    { number: 2847, suffix: '+', label: 'Students Mentored', icon: '👨‍🎓' },
    { number: 342, suffix: '+', label: 'IIT Selections', icon: '🎯' },
    { number: 89, suffix: '%', label: 'Improvement Rate', icon: '📈' },
    { number: 24, suffix: '/7', label: 'Mentor Support', icon: '⏰' }
  ];

  // Success stories
  const successStories = [
    {
      name: 'Arjun Sharma',
      achievement: 'IIT Bombay CSE',
      rank: 'AIR 127',
      improvement: '+289 ranks',
      testimonial: 'AchieveX transformed my preparation strategy completely.',
      image: '🚀'
    },
    {
      name: 'Priya Verma',
      achievement: 'IIT Delhi ECE',
      rank: 'AIR 203',
      improvement: '+412 ranks',
      testimonial: 'The personalized syllabus was a game-changer for me.',
      image: '⭐'
    },
    {
      name: 'Rohit Kumar',
      achievement: 'IIT Kanpur ME',
      rank: 'AIR 156',
      improvement: '+378 ranks',
      testimonial: 'Daily accountability kept me on track throughout.',
      image: '🔥'
    }
  ];

  // Cycle through stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  const handleJoinNow = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  const stat1Count = useCountUp(stats[0].number);
  const stat2Count = useCountUp(stats[1].number);
  const stat3Count = useCountUp(stats[2].number);
  const stat4Count = useCountUp(stats[3].number);

  const statCounts = [stat1Count, stat2Count, stat3Count, stat4Count];

  return (
    <section className="impact-showcase" data-testid="impact-showcase-section">
      <div className="impact-container">
        {/* Header Section */}
        <div className="impact-header">
          <h2>Our Impact Speaks</h2>
          <p>Real results from real students who transformed their JEE journey with AchieveX</p>
        </div>

        {/* Statistics Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`stat-card ${index === currentStatIndex ? 'highlighted' : ''}`}
              data-testid={`stat-${index}`}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">
                {statCounts[index]}{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Success Stories Carousel */}
        <div className="success-stories">
          <h3>Success Stories</h3>
          <div className="stories-grid">
            {successStories.map((story, index) => (
              <div key={index} className="story-card" data-testid={`story-${index}`}>
                <div className="story-header">
                  <div className="story-avatar">{story.image}</div>
                  <div className="story-info">
                    <h4>{story.name}</h4>
                    <p className="story-achievement">{story.achievement}</p>
                  </div>
                </div>
                <div className="story-metrics">
                  <div className="metric">
                    <span className="metric-label">Final Rank</span>
                    <span className="metric-value">{story.rank}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Improvement</span>
                    <span className="metric-value improvement">{story.improvement}</span>
                  </div>
                </div>
                <blockquote className="story-quote">
                  "{story.testimonial}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="impact-cta">
          <div className="cta-content">
            <h3>Ready to Be Our Next Success Story?</h3>
            <p>Join thousands of students who've achieved their IIT dreams with personalized mentorship</p>
          </div>
          <div className="cta-buttons">
            <button 
              className="btn-primary-cta"
              onClick={handleJoinNow}
              data-testid="join-now-btn"
            >
              Start Your Journey
            </button>
            <button 
              className="btn-secondary-cta"
              onClick={() => setActiveSection('testimonials')}
              data-testid="view-testimonials-btn"
            >
              View All Stories
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="trust-indicators">
          <div className="trust-item">
            <span className="trust-icon">🏆</span>
            <span className="trust-text">Top-rated JEE Platform</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <span className="trust-text">100% IITian Mentors</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">⚡</span>
            <span className="trust-text">Proven Methodology</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">💰</span>
            <span className="trust-text">Money-back Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactShowcase;