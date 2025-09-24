import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CashfreePayments from '../utils/cashfree';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [bookingData, setBookingData] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const orderId = searchParams.get('order_id');
        const status = searchParams.get('status');
        
        if (status === 'SUCCESS' && orderId) {
          // Verify payment with Cashfree
          const verification = await CashfreePayments.verifyPayment(orderId);
          
          if (verification.success) {
            // Get booking data from localStorage (in production, fetch from backend)
            const storedBooking = localStorage.getItem('lastBooking');
            if (storedBooking) {
              setBookingData(JSON.parse(storedBooking));
            }
          }
        }
      } catch (error) {
        console.error('Payment verification error:', error);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleBookAnother = () => {
    navigate('/trial-booking');
  };

  if (isVerifying) {
    return (
      <div className="payment-success">
        <div className="payment-success-container">
          <div className="verification-spinner">
            <div className="spinner-large"></div>
            <h2>Verifying Payment...</h2>
            <p>Please wait while we confirm your booking.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="payment-success">
        <div className="payment-success-container">
          <div className="error-state">
            <div className="error-icon">❌</div>
            <h2>Payment Verification Failed</h2>
            <p>We couldn't verify your payment. Please contact support.</p>
            <button onClick={handleGoToDashboard} className="btn-primary">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-success">
      <div className="payment-success-container">
        
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon">🎉</div>
          <h1>Payment Successful!</h1>
          <p>Your trial session has been booked successfully.</p>
        </div>

        {/* Booking Details Card */}
        <div className="booking-details-card">
          <h3>📋 Booking Confirmation</h3>
          
          <div className="detail-grid">
            <div className="detail-item">
              <span className="label">Booking ID</span>
              <span className="value">{bookingData.orderId}</span>
            </div>
            <div className="detail-item">
              <span className="label">Payment ID</span>
              <span className="value">{bookingData.paymentId}</span>
            </div>
            <div className="detail-item">
              <span className="label">Amount Paid</span>
              <span className="value">₹{bookingData.amount}</span>
            </div>
            <div className="detail-item">
              <span className="label">Session Date</span>
              <span className="value">{bookingData.sessionDetails?.date}</span>
            </div>
            <div className="detail-item">
              <span className="label">Session Time</span>
              <span className="value">{bookingData.sessionDetails?.timeSlot}</span>
            </div>
            <div className="detail-item">
              <span className="label">Status</span>
              <span className="value confirmed">✅ Confirmed</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="next-steps-card">
          <h3>📬 What happens next?</h3>
          
          <div className="steps-list">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Confirmation Email</h4>
                <p>You'll receive a confirmation email with Google Meet link within 5 minutes.</p>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Mentor Assignment</h4>
                <p>An IIT Kanpur mentor will be assigned and will contact you before the session.</p>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Session Reminder</h4>
                <p>We'll send you a reminder 1 hour and 10 minutes before your session.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={handleGoToDashboard} className="btn-primary">
            Go to Dashboard
          </button>
          <button onClick={handleBookAnother} className="btn-secondary">
            Book Another Session
          </button>
        </div>

        {/* Support Info */}
        <div className="support-info">
          <p>
            <strong>Need help?</strong> Contact us at{' '}
            <a href="mailto:support@achievex.in">support@achievex.in</a> or{' '}
            <a href="tel:+919876543210">+91 98765 43210</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;