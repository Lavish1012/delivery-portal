import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerPortal from './pages/CustomerPortal';
import ShopkeeperPortal from './pages/ShopkeeperPortal';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Delivery Portal</h1>
        </header>
        <main>
          <Routes>
            <Route path="/customer" element={<CustomerPortal />} />
            <Route path="/shopkeeper" element={<ShopkeeperPortal />} />
            <Route
              path="/"
              element={<p>Please navigate to /customer or /shopkeeper to access the portals.</p>}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;