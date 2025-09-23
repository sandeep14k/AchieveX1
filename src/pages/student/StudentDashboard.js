import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import StudentOverview from '../../components/student/StudentOverview';
import StudentPlanner from '../../components/student/StudentPlanner';
import TestAnalysis from '../../components/student/TestAnalysis';
import StudentChat from '../../components/student/StudentChat';
import StudentCalendar from '../../components/student/StudentCalendar';
import ProgressAnalytics from '../../components/student/ProgressAnalytics';
import StudentProfile from '../../components/student/StudentProfile';
import EnrollmentPrompt from '../../components/student/EnrollmentPrompt';

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { userProfile, isEnrolled } = useAuth();

  // If user is not enrolled, show enrollment prompt for certain tabs
  if (!isEnrolled() && ['planner', 'test-analysis', 'chat', 'calendar', 'analytics'].includes(activeTab)) {
    return (
      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} userRole="student">
        <EnrollmentPrompt />
      </DashboardLayout>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <StudentOverview setActiveTab={setActiveTab} />;
      case 'planner':
        return <StudentPlanner />;
      case 'test-analysis':
        return <TestAnalysis />;
      case 'chat':
        return <StudentChat />;
      case 'calendar':
        return <StudentCalendar />;
      case 'analytics':
        return <ProgressAnalytics />;
      case 'profile':
        return <StudentProfile />;
      default:
        return <StudentOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} userRole="student">
      {renderContent()}
    </DashboardLayout>
  );
}

export default StudentDashboard;