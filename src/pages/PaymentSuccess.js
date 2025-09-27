import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FirestoreService from '../utils/firestoreService'; // Correctly import your Firestore service
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [bookingData, setBookingData] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const confirmPayment = async () => {
      // PayU sends back many parameters. We primarily need the transaction ID ('txnid').
      const txnid = searchParams.get('txnid');
      const status = searchParams.get('status');
      const paymentId = searchParams.get('mihpayid'); // This is the PayU payment ID

      if (status === 'success' && txnid) {
        try {
          // Update the booking in Firestore from 'pending' to 'success'
          const paymentDetails = {
            paymentId: paymentId,
            paymentMethod: 'PayU',
          };
          const updatedBookingResult = await FirestoreService.updateBookingOnSuccess(txnid, paymentDetails);
          
          if (updatedBookingResult.success) {
            setBookingData(updatedBookingResult.booking);
          } else {
            setError("Could not find or update your booking details.");
          }
        } catch (err) {
          console.error('Payment confirmation error:', err);
          setError(err.message);
        }
      } else {
        // This case handles if someone lands on the page without correct parameters
        setError("Invalid payment confirmation link.");
      }
      
      setIsVerifying(false);
    };

    confirmPayment();
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

  if (error || !bookingData) {
    return (
      <div className="payment-success">
        <div className="payment-success-container">
          <div className="error-state">
            <div className="error-icon">❌</div>
            <h2>Payment Verification Failed</h2>
            <p>{error || "We couldn't verify your payment. Please contact support."}</p>
            <button onClick={handleGoToDashboard} className="btn-primary">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Format the date for display
  const formattedDate = bookingData.sessionDate 
    ? new Date(bookingData.sessionDate).toLocaleDateString('en-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })
    : 'Not selected';

  return (
    <div className="payment-success">
      <div className="payment-success-container">
        
        <div className="success-header">
          <div className="success-icon">🎉</div>
          <h1>Payment Successful!</h1>
          <p>Your trial session has been booked successfully.</p>
        </div>

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
              <span className="value">{formattedDate}</span>
            </div>
            <div className="detail-item">
              <span className="label">Status</span>
              <span className="value confirmed">✅ Confirmed</span>
            </div>
          </div>
        </div>

        <div className="next-steps-card">
          <h3>📬 What happens next?</h3>
          <div className="steps-list">
            <div className="step-item"><div className="step-number">1</div><div className="step-content"><h4>Confirmation Email</h4><p>You'll receive a confirmation email with a Google Meet link within 5 minutes.</p></div></div>
            <div className="step-item"><div className="step-number">2</div><div className="step-content"><h4>Mentor Assignment</h4><p>An IIT Kanpur mentor will be assigned and will contact you before the session.</p></div></div>
            <div className="step-item"><div className="step-number">3</div><div className="step-content"><h4>Session Reminder</h4><p>We'll send you a reminder before your session.</p></div></div>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={handleGoToDashboard} className="btn-primary">Go to Dashboard</button>
          <button onClick={handleBookAnother} className="btn-secondary">Book Another Session</button>
        </div>

        <div className="support-info">
          <p><strong>Need help?</strong> Contact us at <a href="mailto:support@achievex.in">support@achievex.in</a></p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;