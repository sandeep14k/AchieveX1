import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Enrollment() {
  const { userProfile } = useAuth();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Choose Your Plan</h2>
      <p>Select the perfect plan for your JEE preparation journey.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '800px', margin: '2rem auto' }}>
        {/* Class 11 Plan */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '2px solid #e5e7eb',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3>Class 11 Plan</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', margin: '1rem 0' }}>
            ₹4,999/month
          </div>
          <ul style={{ textAlign: 'left', margin: '1rem 0' }}>
            <li>4 Test Analysis per month</li>
            <li>Weekly personalized planner</li>
            <li>1-on-1 mentor sessions</li>
            <li>Curated question sets</li>
            <li>Progress tracking</li>
            <li>Chat support</li>
          </ul>
          <button style={{
            padding: '1rem 2rem',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            width: '100%'
          }}>
            Select Class 11 Plan
          </button>
        </div>

        {/* Class 12/Dropper Plan */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '2px solid #ff6b6b',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          position: 'relative'
        }}>
          <div style={{
            background: '#ff6b6b',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            position: 'absolute',
            top: '-10px',
            right: '20px',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}>
            RECOMMENDED
          </div>
          <h3>Class 12/Dropper Plan</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b6b', margin: '1rem 0' }}>
            ₹7,999/month
          </div>
          <ul style={{ textAlign: 'left', margin: '1rem 0' }}>
            <li><strong>6 Test Analysis per month</strong></li>
            <li>Daily personalized planner</li>
            <li>2x mentor sessions per week</li>
            <li>Advanced curated questions</li>
            <li>Detailed progress analytics</li>
            <li>Priority chat support</li>
            <li>Mock test series access</li>
          </ul>
          <button style={{
            padding: '1rem 2rem',
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 'bold'
          }}>
            Select Class 12 Plan
          </button>
        </div>
      </div>

      <div style={{ margin: '3rem 0', padding: '2rem', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3>🎯 Our Guarantee</h3>
        <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>
          "If enrolled, your seat in IIT/NIT is fixed"
        </p>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          *Terms and conditions apply. Based on consistent engagement and following mentor guidance.
        </p>
      </div>
    </div>
  );
}

export default Enrollment;