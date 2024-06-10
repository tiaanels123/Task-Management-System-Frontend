import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', async () => {
  await act(async () => {
    render(<App />);
  });
  const welcomeElement = screen.getByText(/Welcome to the Task Management System/i);
  expect(welcomeElement).toBeInTheDocument();
});
