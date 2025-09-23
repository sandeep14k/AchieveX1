import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './StudentOverview.css';

function StudentOverview({ setActiveTab }) {
  const { userProfile, isEnrolled } = useAuth();

  if (!isEnrolled()) {
    return (
      <div className="student-overview">
        <div className="welcome-section">
          <h1>Welcome to AchieveX, {userProfile?.name}! 👋</h1>
          <p className="welcome-subtitle">
            Ready to start your journey towards IIT success?
          </p>
        </div>

        <div className="not-enrolled-cta">
          <div className="cta-card">
            <h2>🚀 Get Started with Your Trial Session</h2>
            <p>
              Experience personalized mentorship from IIT Kanpur graduates for just ₹19!
            </p>
            
            <div className="trial-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">👨‍🏫</span>
                <span>1-on-1 session with IIT mentor</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📋</span>
                <span>Personalized study plan assessment</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💡</span>
                <span>JEE strategy discussion</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">❓</span>
                <span>Q&A for your doubts</span>
              </div>
            </div>
            
            <button 
              className="trial-cta-btn"
              onClick={() => setActiveTab('trial-booking')}
            >
              Book Trial Session - ₹19
            </button>
          </div>

          <div className="enroll-card">
            <h3>📚 Ready to Enroll?</h3>
            <p>
              Choose from our Class 11 or Class 12/Dropper plans and get access to:
            </p>
            <ul>
              <li>Weekly personalized study planners</li>
              <li>Regular test analysis sessions</li>
              <li>Direct chat with your mentor</li>
              <li>Progress tracking & analytics</li>
              <li>Curated question sets</li>
            </ul>
            
            <button 
              className="enroll-cta-btn"
              onClick={() => setActiveTab('enrollment')}
            >
              View Plans & Enroll
            </button>
          </div>
        </div>

        <div className="stats-preview">
          <h3>Why Students Choose AchieveX</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">IIT Kanpur Mentors</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Selection Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Students Mentored</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For enrolled students
  return (
    <div className="student-overview">
      <div className="welcome-section">
        <h1>Welcome back, {userProfile?.name}! 📚</h1>
        <p className="welcome-subtitle">
          Here's your progress overview
        </p>
      </div>

      <div className="enrolled-dashboard">
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <div className="stat-title">Overall Progress</div>
              <div className="stat-value">72%</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <div className="stat-title">Target Rank</div>
              <div className="stat-value">{userProfile?.target_rank || 'Not set'}</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <div className="stat-title">Tests Analyzed</div>
              <div className="stat-value">3/6</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-title">Study Streak</div>
              <div className="stat-value">12 days</div>
            </div>
          </div>
        </div>

        <div className="action-cards">
          <div className="action-card">
            <h3>📅 Today's Tasks</h3>
            <p>3 pending tasks in your planner</p>
            <button onClick={() => setActiveTab('planner')}>
              View Planner
            </button>
          </div>
          
          <div className="action-card">
            <h3>📋 Upload Test</h3>
            <p>Ready for your next test analysis?</p>
            <button onClick={() => setActiveTab('test-analysis')}>
              Upload Test
            </button>
          </div>
          
          <div className="action-card">
            <h3>💬 Chat with Mentor</h3>
            <p>Ask questions anytime</p>
            <button onClick={() => setActiveTab('chat')}>
              Open Chat
            </button>
          </div>
          
          <div className="action-card">
            <h3>📊 View Progress</h3>
            <p>See detailed analytics</p>
            <button onClick={() => setActiveTab('analytics')}>
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentOverview;