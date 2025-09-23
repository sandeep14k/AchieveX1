import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import './MentorApplication.css';

const MentorApplication = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    graduationYear: '',
    branch: '',
    currentRole: '',
    experience: '',
    motivation: '',
    availability: '',
    subjects: []
  });

  const subjects = [
    'Physics', 'Chemistry', 'Mathematics', 
    'All Subjects', 'Problem Solving', 'Test Strategy'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectChange = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject) 
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create application document with timestamp-based ID
      const applicationId = `mentor_${Date.now()}`;
      await setDoc(doc(db, 'mentor_applications', applicationId), {
        ...formData,
        status: 'pending',
        submittedAt: serverTimestamp(),
        id: applicationId
      });

      // Show success message
      alert('Application submitted successfully! We will review your application and get back to you within 2-3 business days.');
      navigate('/');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mentor-application">
      <div className="mentor-application-container">
        <div className="application-header">
          <h1>Become a Mentor at AchieveX</h1>
          <p>Join our team of IITian mentors and help shape the future of JEE aspirants</p>
          <button 
            className="back-btn"
            onClick={() => navigate('/')}
            aria-label="Go back to homepage"
          >
            ← Back to Home
          </button>
        </div>

        <div className="application-content">
          <div className="application-info">
            <h2>Why Become a Mentor?</h2>
            <div className="benefits">
              <div className="benefit-item">
                <span className="benefit-icon">💰</span>
                <div>
                  <h3>Earn While Teaching</h3>
                  <p>Competitive compensation for every session</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <div>
                  <h3>Impact Lives</h3>
                  <p>Help students achieve their IIT dreams</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">⏰</span>
                <div>
                  <h3>Flexible Schedule</h3>
                  <p>Choose your availability and work hours</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📈</span>
                <div>
                  <h3>Professional Growth</h3>
                  <p>Develop teaching and mentoring skills</p>
                </div>
              </div>
            </div>
          </div>

          <form className="application-form" onSubmit={handleSubmit}>
            <h2>Application Form</h2>
            
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@domain.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="college">College/University *</label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  required
                  placeholder="IIT Kanpur, IIT Delhi, etc."
                />
              </div>
              <div className="form-group">
                <label htmlFor="graduationYear">Graduation Year *</label>
                <input
                  type="number"
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  required
                  min="2015"
                  max="2030"
                  placeholder="2024"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="branch">Branch/Specialization *</label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                required
                placeholder="Computer Science, Mechanical, Electrical, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="currentRole">Current Role/Position</label>
              <input
                type="text"
                id="currentRole"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleInputChange}
                placeholder="Student, Software Engineer, Researcher, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">Teaching/Mentoring Experience</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Describe your teaching or mentoring experience (if any)"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="motivation">Why do you want to become a mentor? *</label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                required
                placeholder="Share your motivation for helping JEE aspirants"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="availability">Availability (Hours per week) *</label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your availability</option>
                <option value="5-10">5-10 hours per week</option>
                <option value="10-15">10-15 hours per week</option>
                <option value="15-20">15-20 hours per week</option>
                <option value="20+">20+ hours per week</option>
              </select>
            </div>

            <div className="form-group">
              <label>Subjects you can mentor in *</label>
              <div className="subjects-grid">
                {subjects.map(subject => (
                  <label key={subject} className="subject-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.subjects.includes(subject)}
                      onChange={() => handleSubjectChange(subject)}
                    />
                    <span className="checkmark"></span>
                    {subject}
                  </label>
                ))}
              </div>
              {formData.subjects.length === 0 && (
                <p className="field-hint">Please select at least one subject</p>
              )}
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading || formData.subjects.length === 0}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorApplication;