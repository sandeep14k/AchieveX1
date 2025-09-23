import React from 'react';

function ProgressAnalytics() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Progress Analytics</h2>
      <p>Track your performance and improvement over time.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', margin: '2rem 0' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3>Overall Progress</h3>
          <div style={{ 
            background: '#e2e8f0', 
            height: '10px', 
            borderRadius: '5px', 
            overflow: 'hidden',
            marginBottom: '1rem'
          }}>
            <div style={{ 
              background: 'linear-gradient(90deg, #667eea, #764ba2)', 
              height: '100%', 
              width: '72%',
              borderRadius: '5px'
            }}></div>
          </div>
          <p style={{ margin: 0, color: '#64748b' }}>72% Complete</p>
        </div>
        
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3>Subject-wise Performance</h3>
          {['Physics', 'Chemistry', 'Mathematics'].map(subject => (
            <div key={subject} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>{subject}</span>
                <span>{subject === 'Physics' ? '85%' : subject === 'Chemistry' ? '78%' : '92%'}</span>
              </div>
              <div style={{ background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ 
                  background: subject === 'Mathematics' ? '#10b981' : subject === 'Physics' ? '#3b82f6' : '#f59e0b',
                  height: '100%', 
                  width: subject === 'Physics' ? '85%' : subject === 'Chemistry' ? '78%' : '92%',
                  borderRadius: '3px'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
        <h3>Detailed Analytics Coming Soon</h3>
        <p>Advanced performance tracking, weak area identification, and improvement suggestions will be available here.</p>
      </div>
    </div>
  );
}

export default ProgressAnalytics;