import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
  it('shows validation errors and submits', async () => {
    render(<SignInForm />);
    // Try submitting empty form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();

    // Enter invalid email
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'bademail' } });
    fireEvent.blur(screen.getByLabelText(/email/i));
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();

    // Enter valid email and password
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    // Loading spinner should appear
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    // Wait for loading to finish
    await waitFor(() => expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument(), { timeout: 2000 });
  });
}); 