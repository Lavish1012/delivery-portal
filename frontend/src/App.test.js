import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';

// Mock the BrowserRouter to use MemoryRouter instead
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    BrowserRouter: ({ children }) => (
      <originalModule.MemoryRouter initialEntries={['/']}>{children}</originalModule.MemoryRouter>
    ),
  };
});

test('renders navigation message on root route', () => {
  render(<App />);
  const messageElement = screen.getByText(/Please navigate to \/customer or \/shopkeeper to access the portals./i);
  expect(messageElement).toBeInTheDocument();
});
