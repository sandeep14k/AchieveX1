import React from 'react';

function StudentPlanner() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Weekly Planner</h2>
      <p>Your personalized study planner will appear here.</p>
      <div style={{ 
        background: '#f8fafc', 
        padding: '2rem', 
        borderRadius: '8px',
        textAlign: 'center',
        margin: '2rem 0'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
        <h3>Coming Soon</h3>
        <p>Your mentor will create a personalized weekly planner for you.</p>
      </div>
    </div>
  );
}

export default StudentPlanner;