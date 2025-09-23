import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Arjun Sharma',
      achievement: 'IIT Bombay - CSE 2024',
      image: '👨‍🎓',
      quote: "The personalized syllabus approach at AchieveX was a game-changer. My mentor helped me focus on what mattered most. The 'Sar Pe Danda' effect kept me disciplined throughout.",
      course: 'Class 12 Plan'
    },
    {
      id: 2,
      name: 'Priya Patel',
      achievement: 'IIT Delhi - Mechanical 2024',
      image: '👩‍🎓',
      quote: "The curated questions and weekly performance checks helped me improve consistently. The direct mentorship from IIT Kanpur graduates made all the difference.",
      course: 'Class 11 + 12 Plan'
    },
    {
      id: 3,
      name: 'Rahul Singh',
      achievement: 'IIT Kanpur - EE 2024',
      image: '👨‍🎓',
      quote: "Started with the ₹19 session and got convinced immediately. The progress analytics and study streaks kept me motivated. Got into the same IIT as my mentor!",
      course: 'Class 12 Plan'
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      achievement: 'IIT Roorkee - Chemical 2024',
      image: '👩‍🎓',
      quote: "The real-time chat with mentors and test analysis sessions were incredible. The quality over quantity approach helped me crack JEE efficiently.",
      course: 'Class 11 Plan'
    }
  ];

  return (
    <section className="testimonials" data-testid="testimonials-section">
      <div className="testimonials-container">
        <div className="section-header">
          <h2>Success Stories</h2>
          <p>Real students, real results. See how AchieveX helped them crack JEE</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card" data-testid={`testimonial-${testimonial.id}`}>
              <div className="quote-mark">"</div>
              <p className="quote">{testimonial.quote}</p>
              
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.image}</div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p className="achievement">{testimonial.achievement}</p>
                  <span className="course-tag">{testimonial.course}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="testimonials-stats">
          <div className="stat-item">
            <h3>10+</h3>
            <p>IIT Kanpur Mentors</p>
          </div>
          <div className="stat-item">
            <h3>₹19</h3>
            <p>First Session Only</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Personalized Plans</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>Mentor Support</p>
          </div>
        </div>
        
        <div className="testimonials-cta">
          <h3>Ready to Be Our Next Success Story?</h3>
          <button className="btn-primary" data-testid="join-success-btn">
            Join AchieveX Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;