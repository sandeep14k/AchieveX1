import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { initiatePayuPayment } from '../utils/payuService'; // Import the PayU service
import './TrialBooking.css';

const TrialBooking = () => {
  const { userProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
  
  // This effect checks the URL for a failure message when PayU redirects back
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('payment') === 'failed') {
      setNotification({
        type: 'error',
        message: '❌ Payment failed or was cancelled. Please try again.',
      });
      // Clean up the URL so the message doesn't persist on refresh
      navigate('/trial-booking', { replace: true });
    }
  }, [location, navigate]);

  // Generate available dates (next 10 days, excluding Sundays)
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

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.grade || !formData.selectedDate) {
      setNotification({
        type: 'error',
        message: 'Please fill all required fields and select a date before booking.'
      });
      return;
    }

    setIsProcessing(true);
    setNotification({ type: '', message: '' });

    const paymentData = {
      amount: 19.0, // PayU requires amount as a float or string
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      grade: formData.grade,
      selectedDate: formData.selectedDate,
      goals: formData.goals,
    };

    try {
      // This will redirect the user to the PayU payment page
      await initiatePayuPayment(paymentData);
      // If the redirect is successful, the user is navigated away, 
      // so code below this line won't execute.
    } catch (error) {
      console.error('PayU process failed:', error);
      setNotification({
        type: 'error',
        message: `❌ Error: ${error.message || 'Could not initiate payment.'}`,
      });
      setIsProcessing(false); // Only stop processing if an error occurs before redirect
    }
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
              <h4>🔒 Secure Payment via PayU</h4>
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

            <form className="booking-form" onSubmit={handleBookingSubmit}>
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
                    Processing...
                  </div>
                ) : (
                  `Book Session - Pay ₹19 via PayU`
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