import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import StudentDashboard from './student/StudentDashboard';
import MentorDashboard from './mentor/MentorDashboard';
import AdminDashboard from './admin/AdminDashboard';
import './Dashboard.css';

function Dashboard() {
  const { userProfile, loading } = useAuth();

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (!userProfile) {
    return <div className="dashboard-error">Error loading user profile</div>;
  }

  // Route to appropriate dashboard based on user role
  switch (userProfile.role) {
    case 'student':
      return <StudentDashboard />;
    case 'mentor':
      return <MentorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return (
        <div className="dashboard-error">
          <h2>Unknown Role</h2>
          <p>Your account role is not recognized. Please contact support.</p>
        </div>
      );
  }
}

export default Dashboard;