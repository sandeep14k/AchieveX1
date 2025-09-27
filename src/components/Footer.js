import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>AchieveX</h3>
              <p>Your path to JEE success</p>
            </div>
            <p className="footer-description">
              Empowering students to achieve their IIT dreams through expert mentorship and strategic guidance.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" data-testid="facebook-link">📘</a>
              <a href="#" className="social-link" data-testid="twitter-link">🐦</a>
              <a href="#" className="social-link" data-testid="instagram-link">📷</a>
              <a href="#" className="social-link" data-testid="youtube-link">📹</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Courses</h4>
            <ul className="footer-links">
              <li><a href="#" data-testid="foundation-link">JEE Foundation</a></li>
              <li><a href="#" data-testid="advanced-link">JEE Advanced</a></li>
              <li><a href="#" data-testid="crash-link">Crash Course</a></li>
              <li><a href="#" data-testid="mock-tests-link">Mock Tests</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="#" data-testid="study-material-link">Study Material</a></li>
              <li><a href="#" data-testid="previous-papers-link">Previous Papers</a></li>
              <li><a href="#" data-testid="video-lectures-link">Video Lectures</a></li>
              <li><a href="#" data-testid="doubt-forum-link">Doubt Forum</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#" data-testid="help-center-link">Help Center</a></li>
              <li><a href="#" data-testid="contact-support-link">Contact Support</a></li>
              <li><a href="#" data-testid="faq-link">FAQ</a></li>
              <li><a href="#" data-testid="feedback-link">Feedback</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p className="contact-item">
                <span className="contact-icon">📞</span>
                +91 8851607038
              </p>
              <p className="contact-item">
                <span className="contact-icon">📧</span>
                achievex.work@gmail.com
              </p>
              <p className="contact-item">
                <span className="contact-icon">📍</span>
                Kanpur
              </p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} AchieveX. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#" data-testid="privacy-link">Privacy Policy</a>
              <a href="#" data-testid="terms-link">Terms of Service</a>
              <a href="#" data-testid="cookies-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;