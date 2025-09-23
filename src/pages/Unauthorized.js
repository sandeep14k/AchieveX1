import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚫</div>
      <h1>Access Denied</h1>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        You don't have permission to access this page.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link 
          to="/" 
          style={{
            padding: '0.75rem 1.5rem',
            background: '#667eea',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '500'
          }}
        >
          Go Home
        </Link>
        <Link 
          to="/dashboard" 
          style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: '#667eea',
            textDecoration: 'none',
            border: '2px solid #667eea',
            borderRadius: '8px',
            fontWeight: '500'
          }}
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;