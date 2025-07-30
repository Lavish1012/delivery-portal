import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar          from './components/Navbar';
import HomePage        from './pages/Home';
import LoginPage       from './pages/Login.jsx';
import SignupPage      from './pages/Signup.jsx';
import SellerDashboard from './pages/SellerDashboard';
import { DarkModeProvider } from './context/DarkModeContext';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) =>
  localStorage.getItem('token') ? children : <Navigate to="/login" replace />;

export default function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"                     element={<HomePage />} />
          <Route path="/login"                element={<LoginPage />} />
          <Route path="/signup"               element={<SignupPage />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <SellerDashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}
