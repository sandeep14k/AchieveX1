import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LandingHeader from '../components/LandingHeader';
import Hero from '../components/Hero';
import XFactor from '../components/XFactor';
import UserTypes from '../components/UserTypes';
import Features from '../components/Features';
import Courses from '../components/Courses';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function LandingPage() {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // If user is logged in, show option to go to dashboard
  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="landing-page">
      <LandingHeader 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        currentUser={currentUser}
      />
      <main>
        {activeSection === 'home' && (
          <>
            <Hero 
              setActiveSection={setActiveSection} 
              onGetStarted={handleGetStarted}
            />
            <XFactor />
            <UserTypes setActiveSection={setActiveSection} />
          </>
        )}
        {activeSection === 'features' && <Features />}
        {activeSection === 'courses' && <Courses />}
        {activeSection === 'testimonials' && <Testimonials />}
        {activeSection === 'contact' && <Contact />}
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;