import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import eyeOpen from '../eye-open.svg';
import eyeClose from '../eye-close.svg';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordCriteria = [
  { label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { label: '1 uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { label: '1 lowercase letter', test: (v) => /[a-z]/.test(v) },
  { label: '1 number', test: (v) => /[0-9]/.test(v) },
  { label: '1 special character', test: (v) => /[^A-Za-z0-9]/.test(v) },
];

const AuthPage = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    location: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState('');

  const isEmailValid = emailRegex.test(form.email);
  const passwordChecks = passwordCriteria.map((c) => c.test(form.password));
  const isPasswordValid = passwordChecks.every(Boolean);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (!isEmailValid) throw new Error('Invalid email format');
      if (!isPasswordValid) throw new Error('Password does not meet criteria');
      if (mode === 'signup' && (!form.name || (form.role === 'shopkeeper' && !form.location))) {
        throw new Error('Please fill all required fields');
      }
      if (mode === 'login') {
        const res = await axios.post('/api/auth/login', { email: form.email, password: form.password });
        setSuccess('Login successful! Redirecting...');
        localStorage.setItem('token', res.data.token);
        setTimeout(() => window.location.reload(), 1200);
      } else {
        await axios.post('/api/auth/signup', form);
        setSuccess('Registration successful! You can now sign in.');
        setMode('login');
        setForm({ name: '', email: '', password: '', role: 'customer', location: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const glassClass = 'bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl';
  const inputClass = 'w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#D78D3A] transition-all placeholder-transparent';
  const labelClass = 'absolute left-4 top-2 text-gray-300 text-sm pointer-events-none transition-all duration-200';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1A1C] to-[#2B2B2E]">
      <motion.div
        className={`relative w-full max-w-md p-8 rounded-2xl ${glassClass}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        <AnimatePresence mode="wait">
          <motion.h2
            key={mode}
            className="text-3xl font-extrabold text-white mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {mode === 'login' ? 'Sign In to Smart Bazaar' : 'Create Your Account'}
          </motion.h2>
        </AnimatePresence>
        <form onSubmit={handleSubmit} className="space-y-6 relative">
          {mode === 'signup' && (
            <div className="relative">
              <input
                type="text"
                name="name"
                autoComplete="off"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                required
                onFocus={() => setTouched((t) => ({ ...t, name: true }))}
              />
              <label className={`${labelClass} ${form.name || touched.name ? 'text-xs -top-3 left-2 bg-[#1A1A1C] px-1' : ''}`}>Name</label>
            </div>
          )}
          <div className="relative">
            <input
              type="email"
              name="email"
              autoComplete="off"
              value={form.email}
              onChange={handleChange}
              className={inputClass + (touched.email && !isEmailValid ? ' border-red-400' : '')}
              required
              onFocus={() => setTouched((t) => ({ ...t, email: true }))}
            />
            <label className={`${labelClass} ${form.email || touched.email ? 'text-xs -top-3 left-2 bg-[#1A1A1C] px-1' : ''}`}>Email</label>
            {touched.email && !isEmailValid && <span className="text-xs text-red-400 absolute right-2 top-3">Invalid</span>}
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="off"
              value={form.password}
              onChange={handleChange}
              className={inputClass + (touched.password && !isPasswordValid ? ' border-red-400' : '')}
              required
              onFocus={() => setTouched((t) => ({ ...t, password: true }))}
            />
            <label className={`${labelClass} ${form.password || touched.password ? 'text-xs -top-3 left-2 bg-[#1A1A1C] px-1' : ''}`}>Password</label>
            <button
              type="button"
              className="absolute right-3 top-3 focus:outline-none"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
            >
              <img src={showPassword ? eyeOpen : eyeClose} alt={showPassword ? 'Hide' : 'Show'} className="w-5 h-5 opacity-80" />
            </button>
            {mode === 'signup' && (
              <div className="mt-2 space-y-1">
                {passwordCriteria.map((c, i) => (
                  <div key={c.label} className="flex items-center text-xs gap-1">
                    <span className={passwordChecks[i] ? 'text-green-400' : 'text-red-400'}>
                      {passwordChecks[i] ? '✔' : '✖'}
                    </span>
                    <span className={passwordChecks[i] ? 'text-green-400' : 'text-red-400'}>{c.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {mode === 'signup' && (
            <div className="relative">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className={inputClass + ' pr-8'}
              >
                <option value="customer">Customer</option>
                <option value="shopkeeper">Shopkeeper</option>
              </select>
              <label className={`${labelClass} text-xs -top-3 left-2 bg-[#1A1A1C] px-1`}>Role</label>
            </div>
          )}
          {mode === 'signup' && form.role === 'shopkeeper' && (
            <div className="relative">
              <input
                type="text"
                name="location"
                autoComplete="off"
                value={form.location}
                onChange={handleChange}
                className={inputClass}
                required
                onFocus={() => setTouched((t) => ({ ...t, location: true }))}
              />
              <label className={`${labelClass} ${form.location || touched.location ? 'text-xs -top-3 left-2 bg-[#1A1A1C] px-1' : ''}`}>Shop Location</label>
            </div>
          )}
          <motion.button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#D78D3A] hover:bg-[#C07C33] text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center"
            whileTap={{ scale: 0.97 }}
            disabled={loading}
          >
            {loading ? (
              <motion.span
                className="loader border-2 border-t-2 border-t-white border-[#D78D3A] rounded-full w-5 h-5 inline-block mr-2 animate-spin"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
            ) : null}
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </motion.button>
          <AnimatePresence>
            {error && (
              <motion.div
                className="text-red-400 text-center mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                className="text-green-400 text-center mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        <div className="mt-6 text-center">
          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.span
                key="to-signup"
                className="text-gray-300 text-sm cursor-pointer hover:text-[#D78D3A] transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}
              >
                Don&apos;t have an account? <span className="underline">Sign Up</span>
              </motion.span>
            ) : (
              <motion.span
                key="to-login"
                className="text-gray-300 text-sm cursor-pointer hover:text-[#D78D3A] transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
              >
                Already have an account? <span className="underline">Sign In</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;