import React, { useState, useEffect } from 'react';
import FirestoreService from '../utils/firestoreService';
import './TrialBookingsAdmin.css';

const TrialBookingsAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadBookingsData();
  }, []);

  const loadBookingsData = async () => {
    try {
      setLoading(true);
      const result = await FirestoreService.getBookingAnalytics();
      
      if (result.success) {
        setBookings(result.bookings);
        setAnalytics(result.analytics);
      } else {
        throw new Error('Failed to load bookings');
      }
    } catch (err) {
      console.error('Error loading bookings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    // Handle Firestore timestamp
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'completed': return '#8b5cf6';
      case 'cancelled': return '#ef4444';
      case 'payment_failed': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'success': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'failed': return '#ef4444';
      case 'refunded': return '#6366f1';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading trial bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        <h2>Error Loading Data</h2>
        <p>{error}</p>
        <button onClick={loadBookingsData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Trial Bookings Dashboard</h1>
        <button onClick={loadBookingsData} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {analytics && (
        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="analytics-icon">📊</div>
            <div className="analytics-content">
              <h3>Total Bookings</h3>
              <p className="analytics-number">{analytics.totalBookings}</p>
            </div>
          </div>
          
          <div className="analytics-card">
            <div className="analytics-icon">✅</div>
            <div className="analytics-content">
              <h3>Confirmed</h3>
              <p className="analytics-number">{analytics.confirmedBookings}</p>
            </div>
          </div>
          
          <div className="analytics-card">
            <div className="analytics-icon">⏳</div>
            <div className="analytics-content">
              <h3>Pending</h3>
              <p className="analytics-number">{analytics.pendingBookings}</p>
            </div>
          </div>
          
          <div className="analytics-card">
            <div className="analytics-icon">💰</div>
            <div className="analytics-content">
              <h3>Revenue</h3>
              <p className="analytics-number">₹{analytics.totalRevenue}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bookings-table-container">
        <h2>Recent Bookings</h2>
        <div className="bookings-table">
          <div className="table-header">
            <div className="header-cell">Student</div>
            <div className="header-cell">Session Date</div>
            <div className="header-cell">Grade</div>
            <div className="header-cell">Session Status</div>
            <div className="header-cell">Payment Status</div>
            <div className="header-cell">Amount</div>
            <div className="header-cell">Created</div>
            <div className="header-cell">Actions</div>
          </div>
          
          {bookings.length === 0 ? (
            <div className="no-bookings">
              <p>No bookings found</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="table-row">
                <div className="table-cell">
                  <div className="student-info">
                    <strong>{booking.studentName}</strong>
                    <small>{booking.studentEmail}</small>
                  </div>
                </div>
                <div className="table-cell">
                  {booking.sessionDate ? 
                    new Date(booking.sessionDate).toLocaleDateString('en-IN') : 
                    'Not set'
                  }
                </div>
                <div className="table-cell">{booking.grade}</div>
                <div className="table-cell">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(booking.sessionStatus) }}
                  >
                    {booking.sessionStatus}
                  </span>
                </div>
                <div className="table-cell">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getPaymentStatusColor(booking.paymentStatus) }}
                  >
                    {booking.paymentStatus}
                  </span>
                </div>
                <div className="table-cell">₹{booking.amount}</div>
                <div className="table-cell">
                  {formatDate(booking.createdAt)}
                </div>
                <div className="table-cell">
                  <button 
                    className="action-btn view-btn"
                    onClick={() => handleBookingClick(booking)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for booking details */}
      {showModal && selectedBooking && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Booking Details</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-section">
                  <h4>Student Information</h4>
                  <p><strong>Name:</strong> {selectedBooking.studentName}</p>
                  <p><strong>Email:</strong> {selectedBooking.studentEmail}</p>
                  <p><strong>Phone:</strong> {selectedBooking.studentPhone}</p>
                  <p><strong>Grade:</strong> {selectedBooking.grade}</p>
                  {selectedBooking.goals && (
                    <p><strong>Goals:</strong> {selectedBooking.goals}</p>
                  )}
                </div>
                
                <div className="detail-section">
                  <h4>Session Information</h4>
                  <p><strong>Date:</strong> {selectedBooking.sessionDate}</p>
                  <p><strong>Status:</strong> 
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(selectedBooking.sessionStatus) }}
                    >
                      {selectedBooking.sessionStatus}
                    </span>
                  </p>
                  {selectedBooking.mentorAssigned && (
                    <p><strong>Mentor:</strong> {selectedBooking.mentorAssigned.name}</p>
                  )}
                  {selectedBooking.googleMeetLink && (
                    <p><strong>Meet Link:</strong> 
                      <a href={selectedBooking.googleMeetLink} target="_blank" rel="noopener noreferrer">
                        Join Meeting
                      </a>
                    </p>
                  )}
                </div>
                
                <div className="detail-section">
                  <h4>Payment Information</h4>
                  <p><strong>Order ID:</strong> {selectedBooking.orderId}</p>
                  <p><strong>Payment ID:</strong> {selectedBooking.paymentId || 'N/A'}</p>
                  <p><strong>Amount:</strong> ₹{selectedBooking.amount}</p>
                  <p><strong>Status:</strong> 
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getPaymentStatusColor(selectedBooking.paymentStatus) }}
                    >
                      {selectedBooking.paymentStatus}
                    </span>
                  </p>
                  {selectedBooking.paymentMethod && (
                    <p><strong>Method:</strong> {selectedBooking.paymentMethod}</p>
                  )}
                </div>
                
                <div className="detail-section">
                  <h4>Timestamps</h4>
                  <p><strong>Created:</strong> {formatDate(selectedBooking.createdAt)}</p>
                  <p><strong>Updated:</strong> {formatDate(selectedBooking.updatedAt)}</p>
                  {selectedBooking.paidAt && (
                    <p><strong>Paid At:</strong> {formatDate(selectedBooking.paidAt)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrialBookingsAdmin;