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
      title: 'New Student',
      subtitle: 'Start Your JEE Journey',
      icon: '🎯',
      price: '₹19',
      priceLabel: 'First Session',
      features: [
        'Experience our mentorship approach',
        'Personalized weakness analysis',  
        'Strategic study plan overview',
        'Direct interaction with IITian mentor'
      ],
      cta: 'Book Trial Session',
      highlight: false,
      popular: false
    },
    {
      id: 'enrolled',
      title: 'Enrolled Student',
      subtitle: 'Full Ecosystem Access',
      icon: '🚀',
      price: 'Complete',
      priceLabel: 'Mentorship Program',
      features: [
        'Weekly personalized study planner',
        'Daily task tracking & accountability',
        'Unlimited mentor chat & sessions',
        'Advanced test analysis & feedback',
        'JEE countdown with target tracking',
        'Progress analytics & insights'
      ],
      cta: 'View Plans',
      highlight: true,
      popular: true
    },
    {
      id: 'mentor',
      title: 'IIT Mentor',
      subtitle: 'Shape Future Engineers',
      icon: '👨‍🏫',
      price: 'Earn',
      priceLabel: 'While Teaching',
      features: [
        'Guide JEE aspirants to success',
        'Create personalized study plans',
        'Conduct detailed test analysis',
        'Build mentoring experience',
        'Flexible scheduling options',
        'Competitive compensation'
      ],
      cta: 'Apply as Mentor',
      highlight: false,
      popular: false
    }
  ];

  return (
    <section className="user-types-modern" data-testid="user-types-section">
      <div className="user-types-container-modern">
        
        {/* Header Section */}
        <div className="section-header-modern">
          <h2>Choose Your Path to Success</h2>
          <p>Select your journey and unlock India's most effective JEE mentorship platform</p>
        </div>
        
        {/* User Type Cards */}
        <div className="user-types-grid-modern">
          {userTypes.map(userType => (
            <div 
              key={userType.id} 
              className={`user-type-card-modern ${userType.highlight ? 'highlighted' : ''} ${userType.popular ? 'popular' : ''}`}
              data-testid={`user-type-${userType.id}`}
            >
              {userType.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              
              <div className="card-header-modern">
                <div className="icon-container-modern">
                  <span className="user-type-icon-modern">{userType.icon}</span>
                </div>
                <h3 className="card-title-modern">{userType.title}</h3>
                <p className="card-subtitle-modern">{userType.subtitle}</p>
              </div>
              
              <div className="pricing-section-modern">
                <div className="price-display-modern">
                  <span className="price-main-modern">{userType.price}</span>
                  <span className="price-label-modern">{userType.priceLabel}</span>
                </div>
              </div>
              
              <div className="features-section-modern">
                <ul className="features-list-modern">
                  {userType.features.map((feature, index) => (
                    <li key={index} className="feature-item-modern">
                      <span className="checkmark-modern">✓</span>
                      <span className="feature-text-modern">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="cta-section-modern">
                <button 
                  className={`cta-button-modern ${userType.highlight ? 'primary' : 'secondary'}`}
                  onClick={() => handleButtonClick(userType.id)}
                  data-testid={`${userType.id}-btn`}
                >
                  {userType.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Note */}
        <div className="bottom-note-modern">
          <p>
            <strong>🎓 Expert Guidance:</strong> All our mentors are IIT graduates with proven track records in JEE coaching and student success.
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default UserTypes;