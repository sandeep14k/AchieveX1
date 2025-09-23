import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, requiredRole, requiresEnrollment = false }) {
  const { currentUser, userProfile } = useAuth();

  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If user profile not loaded yet, show loading
  if (!userProfile) {
    return <div className="loading">Loading...</div>;
  }

  // Check role requirement
  if (requiredRole && userProfile.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check enrollment requirement
  if (requiresEnrollment && !userProfile.enrolled) {
    return <Navigate to="/enroll" replace />;
  }

  return children;
}

export default ProtectedRoute;