import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PageTransition from "./components/PageTransition";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import React from "react";
import ShopkeeperPortal from "./pages/ShopkeeperPortal";
import CustomerPortal from "./pages/CustomerPortal";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-[#FAF6F2] dark:bg-[#1A1A1C] overflow-hidden">
          <CustomCursor />
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } />
              <Route path="/shopkeeper" element={
                <PageTransition>
                  <ShopkeeperPortal />
                </PageTransition>
              } />
              <Route path="/customer" element={
                <PageTransition>
                  <CustomerPortal />
                </PageTransition>
              } />
              <Route path="/login" element={
                <PageTransition>
                  <Login />
                </PageTransition>
              } />
              <Route path="/signup" element={
                <PageTransition>
                  <Signup />
                </PageTransition>
              } />
              {/* Add more routes as needed */}
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Router>
    </DarkModeProvider>
  );
};

export default App;