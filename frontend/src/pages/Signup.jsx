import React from 'react';
import SignUpForm from '../components/SignInForm';

// Demo page for SignUpForm
const Signup = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background, #23235b)' }}>
      <SignUpForm />
    </div>
  );
};

export default Signup;
