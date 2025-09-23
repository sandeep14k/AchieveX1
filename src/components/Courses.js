import React from 'react';
import './Courses.css';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'Not Enrolled Student',
      duration: 'Try Before You Buy',
      price: '₹19',
      subtitle: 'First Session',
      features: [
        'Book first mentorship session for just ₹19',
        'Future sessions at ₹49 each',
        'Explore available subscription plans',
        'Get taste of AchieveX methodology'
      ],
      popular: false,
      cta: 'Book ₹19 Session'
    },
    {
      id: 2,
      title: 'Class 11 Plan',
      duration: 'Foundation Building',
      price: 'Custom',
      subtitle: 'Full Ecosystem Access',
      features: [
        '4 Test Analyses with detailed feedback',
        '1:1 mentorship with personalized syllabus',
        'Curated questions from IIT mentors',
        'Weekly performance checks',
        'Daily targets for consistency',
        'Weekly planner + progress tracking'
      ],
      popular: true,
      cta: 'Get Custom Quote'
    },
    {
      id: 3,
      title: 'Class 12 / Dropper Plan',
      duration: 'Maximum Efficiency',
      price: 'Custom',
      subtitle: 'Full Ecosystem Access',
      features: [
        '6 Test Analyses with mentor feedback',
        '1:1 mentorship with personalized syllabus',
        'Special focus on time management',
        'Weekly performance checks',
        'Daily targets + revision strategy',
        'Real-time chat with mentors'
      ],
      popular: false,
      cta: 'Get Custom Quote'
    }
  ];

  return (
    <section className="courses" data-testid="courses-section">
      <div className="courses-container">
        <div className="section-header">
          <h2>Choose Your Path to Success</h2>
          <p>Comprehensive courses designed for every stage of your JEE journey</p>
        </div>
        
        <div className="courses-grid">
          {courses.map(course => (
            <div 
              key={course.id} 
              className={`course-card ${course.popular ? 'popular' : ''}`}
              data-testid={`course-${course.id}`}
            >
              {course.popular && <div className="popular-badge">Most Popular</div>}
              
              <div className="course-header">
                <h3>{course.title}</h3>
                <p className="course-subtitle">{course.subtitle}</p>
                <div className="course-meta">
                  <span className="duration">{course.duration}</span>
                  <span className="price">{course.price}</span>
                </div>
              </div>
              
              <div className="course-features">
                {course.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="checkmark">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <button 
                className={`course-btn ${course.popular ? 'btn-primary' : 'btn-secondary'}`}
                data-testid={`enroll-${course.id}`}
              >
                {course.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="courses-guarantee">
          <h3>🎯 Our Promise</h3>
          <p>If enrolled, your seat in IIT/NIT is fixed. Direct mentorship from IIT Kanpur graduates with proven success stories.</p>
        </div>
      </div>
    </section>
  );
};

export default Courses;