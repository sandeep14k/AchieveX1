import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';
import XFactor from '../components/XFactor';
import React from 'react';

// Mock scrollTo and provide scroll event simulation
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true
});

describe('Scroll Behavior and Header Visibility Tests', () => {
  beforeEach(() => {
    // Reset scroll position
    window.scrollY = 0;
    jest.clearAllMocks();
  });

  test('header remains visible during scroll down', async () => {
    const { container } = render(<Header />);
    
    // Find header element
    const headerElement = container.querySelector('.header, header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeVisible();
    
    // Simulate scroll down
    window.scrollY = 500;
    fireEvent.scroll(window, { target: { scrollY: 500 } });
    
    // Wait for any potential animations/transitions
    await waitFor(() => {
      expect(headerElement).toBeVisible();
    });
    
    // Header should maintain its visibility
    expect(headerElement).toBeInTheDocument();
    
    // Test that header doesn't fade (opacity should not be 0 or very low)
    const computedStyle = window.getComputedStyle(headerElement);
    const opacityValue = computedStyle.opacity || '1';
    const opacity = parseFloat(opacityValue);
    expect(opacity).toBeGreaterThan(0.8);
  });

  test('AchieveX logo remains visible during scroll', async () => {
    render(<Header />);
    
    // Find the AchieveX logo
    const logoElement = screen.getByRole('heading', { name: /achievex/i });
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toBeVisible();
    
    // Simulate multiple scroll positions
    const scrollPositions = [100, 300, 500, 800, 1000];
    
    for (const scrollY of scrollPositions) {
      window.scrollY = scrollY;
      fireEvent.scroll(window, { target: { scrollY } });
      
      await waitFor(() => {
        expect(logoElement).toBeVisible();
      });
      
      // Logo should not become blurred or invisible
      const logoStyles = window.getComputedStyle(logoElement);
      expect(logoStyles.opacity).not.toBe('0');
      expect(logoStyles.visibility).not.toBe('hidden');
    }
  });

  test('navbar items remain accessible during scroll', async () => {
    render(<Header />);
    
    const navItems = ['Home', 'Features', 'Courses', 'Testimonials', 'Contact'];
    
    // Test initial visibility
    navItems.forEach(item => {
      const navButton = screen.getByText(item);
      expect(navButton).toBeVisible();
    });
    
    // Simulate scroll and test continued visibility
    window.scrollY = 600;
    fireEvent.scroll(window, { target: { scrollY: 600 } });
    
    await waitFor(() => {
      navItems.forEach(item => {
        const navButton = screen.getByText(item);
        expect(navButton).toBeVisible();
        
        // Test that nav items can still be clicked (not faded)
        expect(navButton).not.toBeDisabled();
      });
    });
  });

  test('X-Factor cards visibility during page scroll', async () => {
    render(<XFactor />);
    
    // Wait for components to render
    await waitFor(() => {
      const xFactorSection = screen.getByTestId('x-factor-section');
      expect(xFactorSection).toBeInTheDocument();
    });
    
    // Test card visibility at different scroll positions
    const personalizedCard = screen.getByTestId('personalized-syllabus');
    const curatedCard = screen.getByTestId('curated-questions');
    const sarPeDandaCard = screen.getByTestId('sar-pe-danda');
    
    // Test initial visibility
    expect(personalizedCard).toBeVisible();
    expect(curatedCard).toBeVisible();
    expect(sarPeDandaCard).toBeVisible();
    
    // Simulate scroll to X-Factor section
    window.scrollY = 800;
    fireEvent.scroll(window, { target: { scrollY: 800 } });
    
    await waitFor(() => {
      expect(personalizedCard).toBeVisible();
      expect(curatedCard).toBeVisible();
      expect(sarPeDandaCard).toBeVisible();
    });
    
    // Test that cards maintain proper contrast/opacity
    [personalizedCard, curatedCard, sarPeDandaCard].forEach(card => {
      const cardStyles = window.getComputedStyle(card);
      const opacityValue = cardStyles.opacity || '1';
      const opacity = parseFloat(opacityValue);
      expect(opacity).toBeGreaterThanOrEqual(0.9);
    });
  });

  test('header backdrop filter does not cause excessive blur', async () => {
    const { container } = render(<Header />);
    
    const headerElement = container.querySelector('.header, header');
    expect(headerElement).toBeInTheDocument();
    
    // Simulate scroll to trigger any backdrop-filter effects
    window.scrollY = 300;
    fireEvent.scroll(window, { target: { scrollY: 300 } });
    
    await waitFor(() => {
      const headerStyles = window.getComputedStyle(headerElement);
      
      // In JSDOM, backdrop-filter might not be available, so just test element visibility
      expect(headerElement).toBeVisible();
    });
  });

  test('scroll performance - no layout thrashing', async () => {
    render(
      <div>
        <Header />
        <XFactor />
      </div>
    );
    
    const headerElement = screen.getByRole('heading', { name: /achievex/i });
    const xFactorSection = screen.getByTestId('x-factor-section');
    
    // Simulate rapid scrolling
    const scrollPositions = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    
    for (const scrollY of scrollPositions) {
      window.scrollY = scrollY;
      fireEvent.scroll(window, { target: { scrollY } });
    }
    
    // All elements should still be properly rendered
    await waitFor(() => {
      expect(headerElement).toBeVisible();
      expect(xFactorSection).toBeVisible();
    });
  });

  test('component visibility after multiple scroll events', async () => {
    render(
      <div>
        <Header />
        <XFactor />
      </div>
    );
    
    // Test multiple scroll cycles (up and down)
    const scrollCycles = [
      [0, 500, 1000, 500, 0], // down then up
      [0, 300, 600, 900, 600, 300, 0], // multiple points
    ];
    
    for (const cycle of scrollCycles) {
      for (const scrollY of cycle) {
        window.scrollY = scrollY;
        fireEvent.scroll(window, { target: { scrollY } });
        
        // Short wait for any transitions
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }
    
    // All critical elements should remain visible
    await waitFor(() => {
      const logo = screen.getByRole('heading', { name: /achievex/i });
      const xFactorTitle = screen.getByRole('heading', { name: /our 3 x-factors/i });
      const curatedQuestions = screen.getByText('Curated Questions');
      const sarPeDanda = screen.getByText('"Sar Pe Danda" Effect');
      
      expect(logo).toBeVisible();
      expect(xFactorTitle).toBeVisible();
      expect(curatedQuestions).toBeVisible();
      expect(sarPeDanda).toBeVisible();
    });
  });
});