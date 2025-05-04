import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerPortal from './pages/CustomerPortal';
import ShopkeeperPortal from './pages/ShopkeeperPortal';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/customer" element={<CustomerPortal />} />
        <Route path="/shopkeeper" element={<ShopkeeperPortal />} />
      </Routes>
    </Router>
  );
};

export default App;