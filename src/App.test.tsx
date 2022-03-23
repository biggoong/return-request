import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app', () => {
  render(<App />);
  const header = screen.getAllByText(/Return Request/gi)[0];
  expect(header).toBeInTheDocument();
});
