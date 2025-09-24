import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';
import XFactor from '../XFactor';
import React from 'react';

// Mock window.scrollTo for scroll behavior tests
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

describe('UI Visibility Fixes', () => {
  describe('Header Component', () => {
    test('renders AchieveX logo with proper visibility', () => {
      render(<Header />);
      
      // Test that AchieveX logo is visible
      const logo = screen.getByRole('heading', { name: /achievex/i });
      expect(logo).toBeInTheDocument();
      expect(logo).toBeVisible();
      
      // Test tagline is visible
      const tagline = screen.getByText('JEE Mentorship');
      expect(tagline).toBeInTheDocument();
      expect(tagline).toBeVisible();
    });

    test('navigation items are visible and clickable', () => {
      const mockSetActiveSection = jest.fn();
      render(<Header setActiveSection={mockSetActiveSection} />);
      
      // Test all navigation items are visible
      const navItems = ['Home', 'Features', 'Courses', 'Testimonials', 'Contact'];
      navItems.forEach(item => {
        const navButton = screen.getByText(item);
        expect(navButton).toBeInTheDocument();
        expect(navButton).toBeVisible();
        
        // Test clickability
        fireEvent.click(navButton);
        expect(mockSetActiveSection).toHaveBeenCalled();
      });
    });

    test('header action buttons are visible', () => {
      render(<Header />);
      
      const loginButton = screen.getByTestId('login-btn');
      const signupButton = screen.getByTestId('signup-btn');
      
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toBeVisible();
      expect(signupButton).toBeInTheDocument();
      expect(signupButton).toBeVisible();
    });

    test('header maintains opacity during scroll simulation', () => {
      const { container } = render(<Header />);
      const headerElement = container.querySelector('.header');
      
      expect(headerElement).toBeInTheDocument();
      
      // Simulate scroll event
      fireEvent.scroll(window, { target: { scrollY: 500 } });
      
      // Header should still be visible after scroll
      expect(headerElement).toBeVisible();
      
      // Test computed styles for opacity
      const headerStyles = window.getComputedStyle(headerElement);
      const opacityValue = headerStyles.opacity || '1';
      expect(parseFloat(opacityValue)).toBeGreaterThan(0.8);
    });
  });

  describe('XFactor Component', () => {
    test('renders X-Factors section with proper visibility', () => {
      render(<XFactor />);
      
      // Test section title
      const title = screen.getByRole('heading', { name: /our 3 x-factors/i });
      expect(title).toBeInTheDocument();
      expect(title).toBeVisible();
      
      // Test subtitle
      const subtitle = screen.getByText(/why achievex students crack jee/i);
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toBeVisible();
    });

    test('Personalized Syllabus card is properly visible', () => {
      render(<XFactor />);
      
      const card = screen.getByTestId('personalized-syllabus');
      expect(card).toBeInTheDocument();
      expect(card).toBeVisible();
      
      // Test card content
      const heading = screen.getByText('Personalized Syllabus');
      expect(heading).toBeInTheDocument();
      expect(heading).toBeVisible();
      
      const tagline = screen.getByText(/why do 100% when 60% gives you 99%ile/i);
      expect(tagline).toBeInTheDocument();
      expect(tagline).toBeVisible();
      
      const highlight = screen.getByText('Smart Study, Not Hard Study');
      expect(highlight).toBeInTheDocument();
      expect(highlight).toBeVisible();
    });

    test('Curated Questions card displays properly without fade', () => {
      render(<XFactor />);
      
      const card = screen.getByTestId('curated-questions');
      expect(card).toBeInTheDocument();
      expect(card).toBeVisible();
      
      // Test card content - this was previously fading/invisible
      const heading = screen.getByText('Curated Questions');
      expect(heading).toBeInTheDocument();
      expect(heading).toBeVisible();
      
      // Test that heading has proper CSS class for visibility
      expect(heading).toHaveClass('card-heading2');
      
      const tagline = screen.getByText(/quality over quantity/i);
      expect(tagline).toBeInTheDocument();
      expect(tagline).toBeVisible();
      
      const highlight = screen.getByText('500+ Premium Questions');
      expect(highlight).toBeInTheDocument();
      expect(highlight).toBeVisible();
      
      // Test card has proper secondary class for contrast
      expect(card).toHaveClass('secondary');
    });

    test('"Sar Pe Danda" Effect card shows properly without fade', () => {
      render(<XFactor />);
      
      const card = screen.getByTestId('sar-pe-danda');
      expect(card).toBeInTheDocument();
      expect(card).toBeVisible();
      
      // Test card content - this was previously fading
      const heading = screen.getByText('"Sar Pe Danda" Effect');
      expect(heading).toBeInTheDocument();
      expect(heading).toBeVisible();
      
      const tagline = screen.getByText(/build discipline with iitian mentors/i);
      expect(tagline).toBeInTheDocument();
      expect(tagline).toBeVisible();
      
      // Use getAllByText since "Daily Accountability" appears twice
      const highlights = screen.getAllByText('Daily Accountability');
      expect(highlights[0]).toBeInTheDocument();
      expect(highlights[0]).toBeVisible();
      
      // Test card has proper accent class for visibility
      expect(card).toHaveClass('accent');
    });

    test('all X-Factor cards have proper contrast and visibility styles', () => {
      const { container } = render(<XFactor />);
      
      const cards = container.querySelectorAll('.x-factor-card');
      expect(cards).toHaveLength(3);
      
      cards.forEach(card => {
        expect(card).toBeVisible();
        
        // Test that cards don't have excessive blur or low opacity
        const cardStyles = window.getComputedStyle(card);
        
        // In JSDOM, opacity might be empty string, so handle it
        const opacityValue = cardStyles.opacity || '1';
        const opacity = parseFloat(opacityValue);
        expect(opacity).toBeGreaterThanOrEqual(0.9);
      });
    });

    test('card highlights are visible with proper contrast', () => {
      const { container } = render(<XFactor />);
      
      const highlights = container.querySelectorAll('.card-highlight');
      expect(highlights).toHaveLength(3);
      
      highlights.forEach(highlight => {
        expect(highlight).toBeVisible();
        
        // Test that highlight elements have proper styling
        const highlightStyles = window.getComputedStyle(highlight);
        expect(highlightStyles.opacity).not.toBe('0');
      });
    });

    test('comparison section is visible', () => {
      render(<XFactor />);
      
      const comparisonTitle = screen.getByText('The AchieveX Advantage vs Traditional Coaching');
      expect(comparisonTitle).toBeInTheDocument();
      expect(comparisonTitle).toBeVisible();
      
      // Test comparison rows are visible
      const achievexAdvantage = screen.getByText('Focus only on your weak areas');
      expect(achievexAdvantage).toBeInTheDocument();
      expect(achievexAdvantage).toBeVisible();
    });

    test('stats showcase is properly displayed', () => {
      render(<XFactor />);
      
      // Test stats are visible
      const studyTimeReduction = screen.getByText('60%');
      const targetAchievement = screen.getByText('99%ile');
      const dailyAccountability = screen.getByText('100%');
      
      expect(studyTimeReduction).toBeInTheDocument();
      expect(studyTimeReduction).toBeVisible();
      expect(targetAchievement).toBeInTheDocument();
      expect(targetAchievement).toBeVisible();
      expect(dailyAccountability).toBeInTheDocument();
      expect(dailyAccountability).toBeVisible();
    });
  });

  describe('CSS Classes and Styling Integration', () => {
    test('header has proper CSS classes for visibility', () => {
      const { container } = render(<Header />);
      const headerElement = container.querySelector('.header');
      
      expect(headerElement).toHaveClass('header');
      
      const logoElement = container.querySelector('.logo h1');
      expect(logoElement).toBeInTheDocument();
    });

    test('XFactor cards have proper CSS classes for improved visibility', () => {
      const { container } = render(<XFactor />);
      
      // Test primary card
      const primaryCard = container.querySelector('.x-factor-card.primary');
      expect(primaryCard).toBeInTheDocument();
      expect(primaryCard).toHaveClass('primary');
      
      // Test secondary card (Curated Questions)
      const secondaryCard = container.querySelector('.x-factor-card.secondary');
      expect(secondaryCard).toBeInTheDocument();
      expect(secondaryCard).toHaveClass('secondary');
      
      // Test accent card (Sar Pe Danda)
      const accentCard = container.querySelector('.x-factor-card.accent');
      expect(accentCard).toBeInTheDocument();
      expect(accentCard).toHaveClass('accent');
    });

    test('special heading classes are applied correctly', () => {
      const { container } = render(<XFactor />);
      
      // Test that Curated Questions heading has the special class
      const curatedQuestionsHeading = container.querySelector('.card-heading2');
      expect(curatedQuestionsHeading).toBeInTheDocument();
      expect(curatedQuestionsHeading).toHaveTextContent('Curated Questions');
    });
  });

  describe('Responsive Design Visibility', () => {
    test('components remain visible on smaller screens', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });
      
      render(<XFactor />);
      
      // Test that all cards are still visible on mobile
      const personalizedCard = screen.getByTestId('personalized-syllabus');
      const curatedCard = screen.getByTestId('curated-questions');
      const sarPeDandaCard = screen.getByTestId('sar-pe-danda');
      
      expect(personalizedCard).toBeVisible();
      expect(curatedCard).toBeVisible();
      expect(sarPeDandaCard).toBeVisible();
    });
  });
});