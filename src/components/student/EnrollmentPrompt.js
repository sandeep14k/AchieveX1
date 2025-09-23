import React from 'react';
import { useNavigate } from 'react-router-dom';

function EnrollmentPrompt() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      textAlign: 'center',
      minHeight: '60vh'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🔒</div>
      
      <h2 style={{ 
        color: '#1e293b',
        fontSize: '2rem',
        marginBottom: '1rem'
      }}>
        Premium Feature
      </h2>
      
      <p style={{
        color: '#64748b',
        fontSize: '1.1rem',
        marginBottom: '2rem',
        maxWidth: '500px',
        lineHeight: '1.6'
      }}>
        This feature is available only for enrolled students. 
        Choose a plan to unlock personalized mentorship, test analysis, 
        progress tracking, and direct chat with IIT Kanpur mentors.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          onClick={() => navigate('/trial-booking')}
          style={{
            padding: '1rem 2rem',
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Book Trial Session - ₹19
        </button>
        
        <button 
          onClick={() => navigate('/enroll')}
          style={{
            padding: '1rem 2rem',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          View Plans & Enroll
        </button>
      </div>
      
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: '#f8fafc',
        borderRadius: '12px',
        maxWidth: '600px'
      }}>
        <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>
          What You Get With Enrollment:
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          textAlign: 'left',
          color: '#374151'
        }}>
          <li style={{ marginBottom: '0.5rem' }}>✅ Weekly personalized study planners</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ Regular test analysis with IIT mentors</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ Direct chat with your assigned mentor</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ Progress tracking and analytics</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ Curated question sets for practice</li>
          <li>✅ 24/7 support and guidance</li>
        </ul>
      </div>
    </div>
  );
}

export default EnrollmentPrompt;