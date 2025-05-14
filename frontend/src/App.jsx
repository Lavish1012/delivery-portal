import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import CustomerPortal from './pages/CustomerPortal';
import ShopkeeperPortal from './pages/ShopkeeperPortal';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import OrderManagement from './pages/OrderManagement';
import SearchPage from './pages/SearchPage';
import ShopkeeperAnalytics from './pages/ShopkeeperAnalytics';
import SearchBar from './components/SearchBar';
import Notifications from './components/Notifications';


const App = () => {
  return (
    <Router>
      <div>
        <nav className="p-4 bg-gray-800 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Delivery Portal</h1>
            <div className="flex items-center space-x-4">
              <SearchBar placeholder="Search orders, items, users..." />
              <Notifications />
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer" element={<CustomerPortal />} />
          <Route path="/shopkeeper" element={<ShopkeeperPortal />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/analytics" element={<ShopkeeperAnalytics />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;