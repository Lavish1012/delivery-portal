import styled, { css, keyframes } from 'styled-components';

export const FormWrapper = styled.div`
  background: linear-gradient(135deg, #232325 0%, #18181a 100%);
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
  border-radius: 18px;
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 400px;
  width: 100%;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
    max-width: 95vw;
  }
`;

export const Title = styled.h2`
  color: var(--primary, #fff);
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const Subtitle = styled.div`
  color: var(--primary, #fff);
  text-align: center;
  margin: 1.5rem 0 0.5rem 0;
  font-size: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Input = styled.input`
  background: rgba(255,255,255,0.08);
  border: none;
  border-radius: 8px;
  padding: 0.9rem 1rem;
  color: var(--primary, #fff);
  font-size: 1rem;
  margin-bottom: 0.2rem;
  outline: none;
  transition: box-shadow 0.2s, border 0.2s;
  &:focus {
    box-shadow: 0 0 0 2px var(--primary, #6c63ff);
    border: 1px solid var(--primary, #6c63ff);
  }
  &::placeholder {
    color: #bdbdbd;
    opacity: 1;
  }
  &[aria-invalid='true'] {
    border: 1px solid #ff4d4f;
  }
`;

export const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
  min-height: 1.2em;
`;

export const Button = styled.button`
  background: #f4a340;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0.7rem;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  &:hover:not(:disabled), &:focus:not(:disabled) {
    opacity: 0.92;
    background: #e08b1d;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 3px solid #fff;
  border-top: 3px solid var(--primary, #6c63ff);
  border-radius: 50%;
  width: 22px;
  height: 22px;
  animation: ${spin} 0.8s linear infinite;
  margin: 0 auto;
`;

export const SocialButton = styled.button<{ provider: 'google' | 'facebook' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7em;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 0;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  cursor: pointer;
  background: ${({ provider }) =>
    provider === 'google'
      ? 'linear-gradient(90deg, #4285F4 0%, #34A853 100%)'
      : 'linear-gradient(90deg, #3b5998 0%, #8b9dc3 100%)'};
  color: #fff;
  transition: background 0.2s, opacity 0.2s;
  &:hover, &:focus {
    opacity: 0.92;
  }
`;

export const FooterText = styled.div`
  color: #bdbdbd;
  text-align: center;
  margin-top: 1.2rem;
  font-size: 1rem;
`;

export const LinkText = styled.a`
  color: var(--primary, #6c63ff);
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.2em;
  &:hover, &:focus {
    text-decoration: underline;
  }
`; 