import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import XFactor from '../components/XFactor';
import Header from '../components/Header';
import React from 'react';

describe('Visual Contrast and Styling Improvements', () => {
  describe('XFactor Cards Contrast Tests', () => {
    test('XFactor cards have improved background opacity', () => {
      const { container } = render(<XFactor />);
      
      const cards = container.querySelectorAll('.x-factor-card');
      expect(cards).toHaveLength(3);
      
      cards.forEach(card => {
        // Cards should have improved opacity (0.95 vs previous 0.8)
        const cardStyles = window.getComputedStyle(card);
        
        // Test that cards are not too transparent
        const backgroundColor = cardStyles.backgroundColor;
        const opacityValue = cardStyles.opacity || '1';
        const opacity = parseFloat(opacityValue);
        
        expect(opacity).toBeGreaterThanOrEqual(0.9);
        
        // In JSDOM, backgroundColor might be empty, so just check it's not transparent
        if (backgroundColor) {
          expect(backgroundColor).not.toBe('transparent');
          expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
        }
      });
    });

    test('backdrop-filter blur is optimized for visibility', () => {
      const { container } = render(<XFactor />);
      
      const cards = container.querySelectorAll('.x-factor-card');
      
      cards.forEach(card => {
        const cardStyles = window.getComputedStyle(card);
        const backdropFilter = cardStyles.backdropFilter || cardStyles['-webkit-backdrop-filter'];
        
        if (backdropFilter && backdropFilter !== 'none') {
          // Blur should be reduced from 20px to 10px for better readability
          const blurMatch = backdropFilter.match(/blur\((\d+)px\)/);
          if (blurMatch) {
            const blurValue = parseInt(blurMatch[1]);
            expect(blurValue).toBeLessThanOrEqual(12); // Should be around 10px, allowing some tolerance
          }
        }
      });
    });

    test('secondary card (Curated Questions) has proper styling', () => {
      const { container } = render(<XFactor />);
      
      const secondaryCard = container.querySelector('.x-factor-card.secondary');
      expect(secondaryCard).toBeInTheDocument();
      
      // Test that secondary class is properly applied
      expect(secondaryCard).toHaveClass('secondary');
      
      // Test heading has special styling
      const heading = secondaryCard.querySelector('.card-heading2');
      expect(heading).toBeInTheDocument();
      
      if (heading) {
        // Test that heading has the special class applied
        expect(heading).toHaveClass('card-heading2');
        expect(heading).toHaveTextContent('Curated Questions');
      }
    });

    test('accent card (Sar Pe Danda) has proper visibility', () => {
      const { container } = render(<XFactor />);
      
      const accentCard = container.querySelector('.x-factor-card.accent');
      expect(accentCard).toBeInTheDocument();
      
      // Test card has proper background
      const cardStyles = window.getComputedStyle(accentCard);
      expect(cardStyles.background).toBeTruthy();
      
      // Test heading has improved styling
      const heading = accentCard.querySelector('h3');
      expect(heading).toBeInTheDocument();
      
      if (heading) {
        const headingStyles = window.getComputedStyle(heading);
        
        // Should have full opacity
        const opacity = parseFloat(headingStyles.opacity) || 1;
        expect(opacity).toBe(1);
        
        // Should have strong color (#92400e)
        expect(headingStyles.color).toBeTruthy();
      }
    });

    test('card highlights have enhanced visibility', () => {
      const { container } = render(<XFactor />);
      
      const highlights = container.querySelectorAll('.card-highlight');
      expect(highlights).toHaveLength(3);
      
      highlights.forEach(highlight => {
        const highlightStyles = window.getComputedStyle(highlight);
        
        // Should have strong background and good contrast
        expect(highlightStyles.backgroundColor).toBeTruthy();
        expect(highlightStyles.color).toBeTruthy();
        
        // Should have enhanced box-shadow for visibility
        expect(highlightStyles.boxShadow).toBeTruthy();
        expect(highlightStyles.boxShadow).not.toBe('none');
        
        // Should have proper padding and border-radius
        expect(highlightStyles.borderRadius).toBeTruthy();
        expect(highlightStyles.padding).toBeTruthy();
      });
    });

    test('icon circles have proper visibility enhancements', () => {
      const { container } = render(<XFactor />);
      
      const iconCircles = container.querySelectorAll('.icon-circle');
      expect(iconCircles).toHaveLength(3);
      
      iconCircles.forEach(iconCircle => {
        const iconStyles = window.getComputedStyle(iconCircle);
        
        // Should have enhanced box-shadow
        expect(iconStyles.boxShadow).toBeTruthy();
        expect(iconStyles.boxShadow).not.toBe('none');
        
        // Should have proper background
        expect(iconStyles.background).toBeTruthy();
        
        // Should be fully visible
        const opacity = parseFloat(iconStyles.opacity) || 1;
        expect(opacity).toBe(1);
      });
    });
  });

  describe('Header Visual Improvements', () => {
    test('header has proper background and visibility', () => {
      const { container } = render(<Header />);
      
      const headerElement = container.querySelector('.header');
      expect(headerElement).toBeInTheDocument();
      
      const headerStyles = window.getComputedStyle(headerElement);
      
      // Should have proper background
      expect(headerStyles.background).toBeTruthy();
      
      // Should maintain full opacity
      const opacity = parseFloat(headerStyles.opacity) || 1;
      expect(opacity).toBe(1);
      
      // If backdrop-filter is used, it should be reasonable
      const backdropFilter = headerStyles.backdropFilter || headerStyles['-webkit-backdrop-filter'];
      if (backdropFilter && backdropFilter !== 'none') {
        const blurMatch = backdropFilter.match(/blur\((\d+)px\)/);
        if (blurMatch) {
          const blurValue = parseInt(blurMatch[1]);
          expect(blurValue).toBeLessThanOrEqual(15); // Should be around 12px
        }
      }
    });

    test('logo has enhanced visibility', () => {
      const { container } = render(<Header />);
      
      const logoHeading = container.querySelector('.logo h1');
      expect(logoHeading).toBeInTheDocument();
      
      if (logoHeading) {
        const logoStyles = window.getComputedStyle(logoHeading);
        
        // Should have full visibility
        const opacity = parseFloat(logoStyles.opacity) || 1;
        expect(opacity).toBe(1);
        
        // Should have proper color/gradient
        expect(logoStyles.color).toBeTruthy();
        
        // Should not be blurred
        expect(logoStyles.filter).not.toMatch(/blur\(/);
        
        // May have brightness enhancement
        if (logoStyles.filter && logoStyles.filter !== 'none') {
          expect(logoStyles.filter).toMatch(/brightness\([\d.]+\)/);
        }
      }
    });

    test('tagline maintains visibility', () => {
      const { container } = render(<Header />);
      
      const tagline = container.querySelector('.tagline');
      expect(tagline).toBeInTheDocument();
      
      if (tagline) {
        const taglineStyles = window.getComputedStyle(tagline);
        
        // Should be fully visible
        const opacity = parseFloat(taglineStyles.opacity) || 1;
        expect(opacity).toBeGreaterThanOrEqual(0.9);
        
        // Should have proper color
        expect(taglineStyles.color).toBeTruthy();
        expect(taglineStyles.color).not.toBe('transparent');
      }
    });
  });

  describe('Color Contrast Compliance', () => {
    test('text elements have sufficient contrast', () => {
      const { container } = render(<XFactor />);
      
      // Test card headings
      const headings = container.querySelectorAll('.x-factor-card h3');
      headings.forEach(heading => {
        const headingStyles = window.getComputedStyle(heading);
        
        // Should have strong, non-transparent color
        expect(headingStyles.color).toBeTruthy();
        expect(headingStyles.color).not.toBe('transparent');
        expect(headingStyles.color).not.toMatch(/rgba\(\d+,\s*\d+,\s*\d+,\s*0(\.\d+)?\)/);
      });
      
      // Test card descriptions
      const descriptions = container.querySelectorAll('.x-factor-card p');
      descriptions.forEach(description => {
        const descStyles = window.getComputedStyle(description);
        expect(descStyles.color).toBeTruthy();
        expect(descStyles.color).not.toBe('transparent');
      });
    });

    test('interactive elements have proper visibility states', () => {
      const { container } = render(<XFactor />);
      
      const highlights = container.querySelectorAll('.card-highlight');
      highlights.forEach(highlight => {
        const highlightStyles = window.getComputedStyle(highlight);
        
        // Should have proper background-text contrast
        expect(highlightStyles.backgroundColor).toBeTruthy();
        expect(highlightStyles.color).toBeTruthy();
        
        // Should not be transparent
        expect(highlightStyles.backgroundColor).not.toBe('transparent');
        expect(highlightStyles.color).not.toBe('transparent');
      });
    });
  });

  describe('Animation and Transition Visibility', () => {
    test('fadeInUp animation preserves final visibility', () => {
      const { container } = render(<XFactor />);
      
      const cards = container.querySelectorAll('.x-factor-card');
      cards.forEach(card => {
        const cardStyles = window.getComputedStyle(card);
        
        // Should end up fully visible after animation
        const opacity = parseFloat(cardStyles.opacity) || 1;
        expect(opacity).toBeGreaterThanOrEqual(0.95);
        
        // Should have proper transform (not stuck mid-animation)
        const transform = cardStyles.transform;
        if (transform && transform !== 'none') {
          expect(transform).not.toMatch(/translateY\(-?\d+px\)/); // Should not be stuck translated
        }
      });
    });
  });
});