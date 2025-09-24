import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CashfreePayments from '../utils/cashfree';
import './TrialBooking.css';

const TrialBooking = () => {
  const { userProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: userProfile?.displayName || '',
    email: userProfile?.email || '',
    phone: '',
    grade: '',
    selectedDate: '',    
    goals: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });
  
  // Generate available dates (next 7 days, excluding Sundays)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        });
      }
    }
    
    return dates;
  };

  const [availableDates] = useState(generateAvailableDates());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const initiateCashfreePayment = async () => {
    try {
      setIsProcessing(true);
      setNotification({ type: '', message: '' }); // Clear previous notifications

      // Prepare payment data
      const paymentData = {
        amount: 19,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        note: 'AchieveX Trial Session - JEE Mentorship',
        sessionData: {
          date: formData.selectedDate,
          grade: formData.grade,
          goals: formData.goals
        }
      };

      // Initialize payment using Cashfree utility
      const paymentResult = await CashfreePayments.initializePayment(paymentData);

      if (paymentResult.success) {
        // Handle successful payment
        setNotification({
          type: 'success',
          message: `🎉 Payment Successful! Your booking ID is ${paymentResult.bookingId}. You will receive a confirmation email shortly.`
        });
        
        // Reset form
        setFormData(prev => ({
          ...prev,
          phone: '',
          grade: '',
          selectedDate: '',          
          goals: ''
        }));
        
      } else {
        // Handle payment failure
        const errorMessage = paymentResult.error?.message || 'Payment failed or was cancelled by user.';
        setNotification({
          type: 'error',
          message: `❌ Payment Failed: ${errorMessage} Please try again or contact support.`
        });
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      setNotification({
        type: 'error',
        message: 'Something went wrong with the payment. Please try again or contact support.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.grade || !formData.selectedDate) {
      setNotification({
        type: 'error',
        message: 'Please fill all required fields and select a date before booking.'
      });
      return;
    }

    initiateCashfreePayment();
  };

  return (
    <div className="trial-booking">
      <div className="trial-booking-container">
        
        {/* Header */}
        <div className="trial-booking-header">
          <h1 className="trial-booking-title">
            Book Your <span className="highlight">₹19 Trial Session</span>
          </h1>
          <p className="trial-booking-subtitle">
            Experience personalized JEE mentorship with IIT Kanpur graduates. 
            Transform your preparation strategy in just 60 minutes.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="trial-booking-grid">
          
          {/* Session Details Card */}
          <div className="session-details-card">
            <div className="card-header">
              <div className="card-icon">🎯</div>
              <h2 className="card-title">Trial Session Details</h2>
              <p className="card-subtitle">
                Get a taste of our personalized mentorship approach
              </p>
            </div>

            <ul className="benefits-list">
              <li><span className="checkmark">✓</span> 1-on-1 session with IIT Kanpur graduate</li>
              <li><span className="checkmark">✓</span> Personalized weakness analysis & study plan</li>
              <li><span className="checkmark">✓</span> JEE preparation strategy discussion</li>
              <li><span className="checkmark">✓</span> Live doubt resolution session</li>
              <li><span className="checkmark">✓</span> Goal setting & timeline planning</li>
            </ul>

            <div className="session-meta">
              <h4>Session Information</h4>
              <div className="meta-grid">
                <div className="meta-item">
                  <div className="label">Duration</div>
                  <div className="value">60 Minutes</div>
                </div>
                <div className="meta-item">
                  <div className="label">Mode</div>
                  <div className="value">Online</div>
                </div>
                <div className="meta-item">
                  <div className="label">Platform</div>
                  <div className="value">Google Meet</div>
                </div>
                <div className="meta-item">
                  <div className="label">Language</div>
                  <div className="value">Hindi/English</div>
                </div>
              </div>
            </div>

            <div className="price-highlight">
              <div className="price-tag">₹19</div>
            </div>

            <div className="payment-info">
              <h4>🔒 Secure Payment via Cashfree</h4>
              <div className="payment-features">
                <div className="payment-feature">
                  <span className="icon">💳</span>
                  <span>All payment methods accepted</span>
                </div>
                <div className="payment-feature">
                  <span className="icon">🛡️</span>
                  <span>100% secure transactions</span>
                </div>
                <div className="payment-feature">
                  <span className="icon">💰</span>
                  <span>Instant refund policy</span>
                </div>
                <div className="payment-feature">
                  <span className="icon">📱</span>
                  <span>UPI, Cards, Net Banking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form Card */}
          <div className="booking-form-card">
            <div className="card-header">
              <div className="card-icon">📅</div>
              <h2 className="card-title">Schedule Your Session</h2>
              <p className="card-subtitle">
                Fill in your details and choose your preferred time
              </p>
            </div>

            {notification.message && (
              <div className={`notification ${notification.type}`}>
                {notification.message}
                <button 
                  className="notification-close" 
                  onClick={() => setNotification({ type: '', message: '' })}
                >×</button>
              </div>
            )}

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="grade" className="form-label">Current Grade/Status *</label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select your current grade</option>
                  <option value="11th">11th Grade</option>
                  <option value="12th">12th Grade</option>
                  <option value="12th-passed">12th Passed (Dropper)</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="selectedDate" className="form-label">Preferred Date *</label>
                <select
                  id="selectedDate"
                  name="selectedDate"
                  value={formData.selectedDate}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a date</option>
                  {availableDates.map(date => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="goals" className="form-label">Your JEE Goals (Optional)</label>
                <textarea
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Tell us about your JEE goals and what you'd like to discuss..."
                  rows="3"
                />
              </div>

              <button 
                type="submit" 
                className="booking-button"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="payment-processing">
                    <div className="spinner"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Book Session - Pay ₹19 via Cashfree`
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Trust Section */}
        <div className="trust-section">
          <h3>Why Students Trust AchieveX?</h3>
          <div className="trust-indicators">
            <div className="trust-indicator">
              <div className="icon">🎓</div>
              <h4>IIT Kanpur Mentors</h4>
              <p>Learn directly from graduates who've cracked JEE with top ranks</p>
            </div>
            <div className="trust-indicator">
              <div className="icon">📈</div>
              <h4>Proven Results</h4>
              <p>95%+ students see improvement in first month</p>
            </div>
            <div className="trust-indicator">
              <div className="icon">🔒</div>
              <h4>Money-back Guarantee</h4>
              <p>100% refund if not satisfied with your trial session</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialBooking;