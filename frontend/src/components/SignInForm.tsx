import React, { useState } from 'react';
import { Form, Input, Button, ErrorText, Spinner, FormWrapper, Title, FooterText, LinkText } from './SignInForm.styles';

// Accessible error announcer
const ErrorAnnouncer = ({ error }: { error: string }) => (
  <div role="alert" aria-live="assertive" style={{ position: 'absolute', left: '-9999px', height: '1px', width: '1px', overflow: 'hidden' }}>{error}</div>
);

export const SignUpForm: React.FC = () => {
  const [values, setValues] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Validation logic
  const validate = (field: string, value: string) => {
    if (field === 'email') {
      if (!value) return 'Email is required';
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return 'Invalid email address';
    }
    if (field === 'password') {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
    }
    if (field === 'confirmPassword') {
      if (!value) return 'Please confirm your password';
      if (value !== values.password) return 'Passwords do not match';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((errs) => ({ ...errs, [name]: touched[name] ? validate(name, value) : errs[name] }));
    // If changing password, revalidate confirmPassword
    if (name === 'password' && touched.confirmPassword) {
      setErrors((errs) => ({ ...errs, confirmPassword: validate('confirmPassword', values.confirmPassword) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((errs) => ({ ...errs, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      email: validate('email', values.email),
      password: validate('password', values.password),
      confirmPassword: validate('confirmPassword', values.confirmPassword),
    };
    setErrors(newErrors);
    setTouched({ email: true, password: true, confirmPassword: true });
    if (newErrors.email || newErrors.password || newErrors.confirmPassword) return;
    setLoading(true);
    setSubmitError('');
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1200));
      // Success: redirect or show success message
    } catch (err) {
      setSubmitError('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', background: 'var(--background, #23235b)' }}>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSubmit} aria-labelledby="signup-title" noValidate>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="e.g. youremail@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          required
        />
        {errors.email && touched.email && <ErrorText id="email-error">{errors.email}</ErrorText>}
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          required
        />
        {errors.password && touched.password && <ErrorText id="password-error">{errors.password}</ErrorText>}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
          required
        />
        {errors.confirmPassword && touched.confirmPassword && <ErrorText id="confirmPassword-error">{errors.confirmPassword}</ErrorText>}
        <Button type="submit" disabled={loading} aria-busy={loading} aria-label="Sign up">
          {loading ? <Spinner aria-label="Loading" /> : 'Sign Up'}
        </Button>
        {submitError && <ErrorText role="alert">{submitError}</ErrorText>}
        <ErrorAnnouncer error={submitError} />
      </Form>
      <FooterText>
        Already a member? <LinkText href="/login">Login Now</LinkText>
      </FooterText>
    </FormWrapper>
  );
};

export default SignUpForm; 