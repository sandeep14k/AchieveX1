import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Onboarding() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const handleComplete = () => {
    navigate('/dashboard');
  };

  return (
    <div className="onboarding-container" style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Welcome to AchieveX, {userProfile?.name}!</h2>
      <p>Let's get you started on your IIT journey.</p>
      
      <div style={{ margin: '2rem 0' }}>
        <h3>Quick Setup</h3>
        <p>Your profile has been created with the following details:</p>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <li><strong>Class:</strong> {userProfile?.class}</li>
          <li><strong>Email:</strong> {userProfile?.email}</li>
          <li><strong>Role:</strong> {userProfile?.role}</li>
          <li><strong>Status:</strong> {userProfile?.enrolled ? 'Enrolled' : 'Not Enrolled'}</li>
        </ul>
      </div>

      <button 
        onClick={handleComplete}
        style={{
          padding: '1rem 2rem',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default Onboarding;