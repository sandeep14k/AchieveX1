import React from 'react';

function StudentCalendar() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Calendar & Sessions</h2>
      <p>View and manage your scheduled mentorship sessions.</p>
      
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        textAlign: 'center',
        margin: '2rem 0'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗓️</div>
        <h3>No Sessions Scheduled</h3>
        <p>Your upcoming mentorship sessions will appear here.</p>
        <button style={{
          padding: '1rem 2rem',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer',
          marginTop: '1rem'
        }}>
          Schedule Session
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{ 
            background: '#f8fafc', 
            padding: '1rem', 
            textAlign: 'center',
            fontWeight: '600',
            color: '#374151'
          }}>
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }, (_, i) => (
          <div key={i} style={{ 
            background: 'white', 
            padding: '1rem', 
            minHeight: '80px',
            border: '1px solid #f1f5f9'
          }}>
            {i < 31 ? i + 1 : ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentCalendar;