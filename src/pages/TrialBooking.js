import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function TrialBooking() {
  const { userProfile } = useAuth();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Book Your ₹19 Trial Session</h2>
      <p>Get started with a trial session with one of our IIT Kanpur mentors.</p>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '2rem', 
        borderRadius: '8px', 
        margin: '2rem auto', 
        maxWidth: '500px' 
      }}>
        <h3>Trial Session Benefits</h3>
        <ul style={{ textAlign: 'left' }}>
          <li>1-on-1 session with IIT Kanpur graduate</li>
          <li>Personalized study plan assessment</li>
          <li>JEE preparation strategy discussion</li>
          <li>Q&A session for your doubts</li>
        </ul>
        
        <div style={{ margin: '2rem 0' }}>
          <h4>Session Details</h4>
          <p><strong>Duration:</strong> 60 minutes</p>
          <p><strong>Price:</strong> ₹19 (One-time offer)</p>
          <p><strong>Mode:</strong> Online (Google Meet/Zoom)</p>
        </div>
        
        <button style={{
          padding: '1rem 2rem',
          background: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Book Trial Session - ₹19
        </button>
      </div>
    </div>
  );
}

export default TrialBooking;