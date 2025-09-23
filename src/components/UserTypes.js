import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './UserTypes.css';

const UserTypes = ({ setActiveSection }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Handle different button actions based on user type
  const handleButtonClick = (userTypeId) => {
    switch(userTypeId) {
      case 'not-enrolled':
        // Book ₹19 session - check if user is logged in
        if (currentUser) {
          // User is logged in, redirect to trial booking page
          navigate('/trial-booking');
        } else {
          // User not logged in, redirect to signup page
          navigate('/signup');
        }
        break;
      case 'enrolled':
        // View plans - show courses section
        setActiveSection('courses');
        break;
      case 'mentor':
        // Apply as mentor - redirect to mentor application page
        navigate('/mentor-application');
        break;
      default:
        setActiveSection('contact');
    }
  };

  const userTypes = [
    {
      id: 'not-enrolled',
      title: 'Not Enrolled Student',
      icon: '🎯',
      price: '₹19 First Session',
      features: [
        'Book first mentorship session for just ₹19',
        'Future sessions at ₹49 each',
        'Cannot see/select specific mentors',
        'Can explore and enroll in subscription plans'
      ],
      cta: 'Book ₹19 Session',
      highlight: false
    },
    {
      id: 'enrolled',
      title: 'Enrolled Student',
      icon: '🚀',
      price: 'Full Ecosystem Access',
      features: [
        'Weekly planner with daily to-do tasks',
        '1:1 chat with mentor + session scheduling',
        'Test analysis sessions (auto-scheduled)',
        'Countdown timer for JEE Mains & Advanced',
        'Target rank setting for personalized strategy',
        'Progress tracking and analytics'
      ],
      cta: 'View Plans',
      highlight: true
    },
    {
      id: 'mentor',
      title: 'Mentor (IITian)',
      icon: '👨‍🏫',
      price: 'Become a Mentor',
      features: [
        'View all enrolled students and details',
        'Create weekly planners and assign tasks',
        'Conduct test analysis with written feedback',
        'Chat with students, schedule sessions',
        'Track student progress, goals, consistency',
        'Earn while helping JEE aspirants'
      ],
      cta: 'Apply as Mentor',
      highlight: false
    }
  ];

  return (
    <section className="user-types" data-testid="user-types-section">
      <div className="user-types-container">
        <div className="section-header">
          <h2>Who Can Join AchieveX?</h2>
          <p>Choose your role and get started with personalized JEE mentorship</p>
        </div>
        
        <div className="user-types-grid">
          {userTypes.map(userType => (
            <div 
              key={userType.id} 
              className={`user-type-card ${userType.highlight ? 'highlight' : ''}`}
              data-testid={`user-type-${userType.id}`}
            >
              <div className="user-type-header">
                <div className="user-type-icon">{userType.icon}</div>
                <h3>{userType.title}</h3>
                <p className="user-type-price">{userType.price}</p>
              </div>
              
              <div className="user-type-features">
                {userType.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="checkmark">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <button 
                className={`user-type-btn ${userType.highlight ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleButtonClick(userType.id)}
                data-testid={`${userType.id}-btn`}
              >
                {userType.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="user-types-note">
          <p>
            <strong>Note:</strong> All plans include direct access to IIT Kanpur mentors, 
            personalized guidance, and our proven methodology that has helped students achieve their IIT dreams.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserTypes;