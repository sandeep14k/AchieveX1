import { render, screen } from '@testing-library/react';
import App from './App';

test('renders AchieveX homepage', () => {
  render(<App />);
  
  // Test for main tagline
  const taglineElement = screen.getByText('If enrolled, your seat in IIT/NIT is fixed.');
  expect(taglineElement).toBeInTheDocument();
  
  // Test for hero section
  const heroSection = screen.getByTestId('hero-section');
  expect(heroSection).toBeInTheDocument();
  
  // Test for user types section
  const userTypesSection = screen.getByTestId('user-types-section');
  expect(userTypesSection).toBeInTheDocument();
  
  // Test for Book ₹19 Session button
  const bookButton = screen.getByTestId('start-learning-btn');
  expect(bookButton).toHaveTextContent('Book ₹19 Session');
});
