import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <section className="contact" data-testid="contact-section">
        <div className="contact-container">
          <div className="success-message" data-testid="success-message">
            <div className="success-icon">✓</div>
            <h2>Thank You!</h2>
            <p>We've received your inquiry and will get back to you within 24 hours.</p>
            <button 
              className="btn-primary" 
              onClick={() => setSubmitted(false)}
              data-testid="back-btn"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="contact" data-testid="contact-section">
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Ready to start your JEE journey? Connect with our expert mentors today.</p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 8851607038</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>achievex.work@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">📍</div>
                <div>
                  <h4>Office</h4>
                  <p>Kanpur</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">⏰</div>
                <div>
                  <h4>Hours</h4>
                  <p>Mon-Sun: 9 AM - 9 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit} data-testid="contact-form">
              <h3>Send us a Message</h3>
              
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-testid="name-input"
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-testid="email-input"
                />
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  data-testid="phone-input"
                />
              </div>
              
              <div className="form-group">
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  data-testid="course-select"
                >
                  <option value="">Select Course Interest</option>
                  <option value="foundation">JEE Foundation (Class 11)</option>
                  <option value="advanced">JEE Advanced (Class 12)</option>
                  <option value="crash">JEE Crash Course</option>
                  <option value="consultation">Free Consultation</option>
                </select>
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tell us about your goals and how we can help"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  data-testid="message-textarea"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                data-testid="submit-btn"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;