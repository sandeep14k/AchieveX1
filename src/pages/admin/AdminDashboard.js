import React from 'react';

function AdminDashboard() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ 
        background: '#f8fafc', 
        padding: '3rem', 
        borderRadius: '12px', 
        margin: '2rem 0' 
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚙️</div>
        <h2>Admin Panel</h2>
        <p>Administrative features are coming soon.</p>
        <p>You'll be able to manage users, mentors, payments, and system settings.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;