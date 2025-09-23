import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

function DashboardLayout({ children, activeTab, setActiveTab, userRole }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Define navigation items based on user role
  const getNavigationItems = () => {
    const commonItems = [
      { id: 'profile', label: 'Profile', icon: '👤' }
    ];

    switch (userRole) {
      case 'student':
        return [
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'planner', label: 'Planner', icon: '📅' },
          { id: 'test-analysis', label: 'Test Analysis', icon: '📋' },
          { id: 'chat', label: 'Chat', icon: '💬' },
          { id: 'calendar', label: 'Calendar', icon: '🗓️' },
          { id: 'analytics', label: 'Progress', icon: '📈' },
          ...commonItems
        ];
      case 'mentor':
        return [
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'students', label: 'Students', icon: '👥' },
          { id: 'planner-builder', label: 'Planner Builder', icon: '🔨' },
          { id: 'test-review', label: 'Test Review', icon: '📝' },
          { id: 'chat', label: 'Chat', icon: '💬' },
          { id: 'schedule', label: 'Schedule', icon: '⏰' },
          ...commonItems
        ];
      case 'admin':
        return [
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'users', label: 'Users', icon: '👥' },
          { id: 'mentors', label: 'Mentors', icon: '👨‍🏫' },
          { id: 'payments', label: 'Payments', icon: '💰' },
          { id: 'content', label: 'Content', icon: '📚' },
          { id: 'analytics', label: 'Analytics', icon: '📈' },
          ...commonItems
        ];
      default:
        return commonItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="dashboard-layout">
      {/* Mobile Header */}
      <div className="dashboard-mobile-header">
        <button 
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <div className="mobile-header-title">
          <img src="/logo.svg" alt="AchieveX" className="mobile-logo" />
          AchieveX
        </div>
        <div className="mobile-user-avatar">
          {userProfile?.profilePhotoUrl ? (
            <img src={userProfile.profilePhotoUrl} alt={userProfile.name} />
          ) : (
            <div className="avatar-placeholder">{userProfile?.name?.[0]?.toUpperCase()}</div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className={`dashboard-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <img src="/logo.svg" alt="AchieveX" className="sidebar-logo" />
            <span>AchieveX</span>
          </div>
          <button 
            className="sidebar-close-btn desktop-hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">
            {userProfile?.profilePhotoUrl ? (
              <img src={userProfile.profilePhotoUrl} alt={userProfile.name} />
            ) : (
              <div className="avatar-placeholder">{userProfile?.name?.[0]?.toUpperCase()}</div>
            )}
          </div>
          <div className="user-info">
            <div className="user-name">{userProfile?.name}</div>
            <div className="user-role">{userProfile?.role}</div>
            {userProfile?.role === 'student' && (
              <div className={`enrollment-status ${userProfile?.enrolled ? 'enrolled' : 'not-enrolled'}`}>
                {userProfile?.enrolled ? 'Enrolled' : 'Not Enrolled'}
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false); // Close sidebar on mobile after selection
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;