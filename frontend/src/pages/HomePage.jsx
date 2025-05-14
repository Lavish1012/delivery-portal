import React from 'react';
import { Link } from 'react-router-dom';

// Import icons (assuming you're using react-icons)
// If you don't have react-icons installed, you'll need to install it with:
// npm install react-icons
import { FaTruck, FaShoppingBag, FaUserCog, FaChartLine } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-gray-900 flex flex-col">
      {/* Hero Section */}
      <section className="bg-hero-gradient dark:bg-accent py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Fast & Reliable Delivery Solutions
              </h1>
              <p className="text-xl text-gray-100 mb-8 max-w-lg">
                Connect with local shops, track your orders, and enjoy seamless delivery experiences all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/login" 
                  className="px-8 py-3 bg-white text-primary font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                >
                  Get Started
                </Link>
                <Link 
                  to="/customer" 
                  className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              {/* Replace with your own image */}
              <img 
                src="https://i.imgur.com/8FcWMHM.png" 
                alt="Delivery illustration" 
                className="w-full max-w-md rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-heading dark:text-white text-center mb-12">
            Why Choose Our Delivery Portal?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-card-gradient dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary text-white rounded-full">
                  <FaTruck size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-heading dark:text-white text-center mb-2">Fast Delivery</h3>
              <p className="text-body dark:text-gray-300 text-center">
                Quick and efficient delivery services with real-time tracking.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-card-gradient dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-secondary text-white rounded-full">
                  <FaShoppingBag size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-heading dark:text-white text-center mb-2">Local Shops</h3>
              <p className="text-body dark:text-gray-300 text-center">
                Connect with nearby stores and discover new products.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-card-gradient dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary text-white rounded-full">
                  <FaUserCog size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-heading dark:text-white text-center mb-2">Easy Management</h3>
              <p className="text-body dark:text-gray-300 text-center">
                Intuitive dashboards for both customers and shopkeepers.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-card-gradient dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-secondary text-white rounded-full">
                  <FaChartLine size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-heading dark:text-white text-center mb-2">Insightful Analytics</h3>
              <p className="text-body dark:text-gray-300 text-center">
                Detailed reports and statistics to grow your business.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-heading dark:text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-body dark:text-gray-300 mb-8">
                  Join our platform today and experience the best delivery service in your area.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/customer" 
                    className="px-8 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                  >
                    Customer Portal
                  </Link>
                  <Link 
                    to="/shopkeeper" 
                    className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition duration-300"
                  >
                    Shopkeeper Dashboard
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 bg-hero-gradient p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Benefits For Everyone
                </h3>
                <ul className="space-y-4 text-white">
                  <li className="flex items-center">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-white text-primary mr-3">✓</span>
                    Fast and reliable deliveries
                  </li>
                  <li className="flex items-center">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-white text-primary mr-3">✓</span>
                    Easy order management
                  </li>
                  <li className="flex items-center">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-white text-primary mr-3">✓</span>
                    Real-time order tracking
                  </li>
                  <li className="flex items-center">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-white text-primary mr-3">✓</span>
                    Secure payment processing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-body dark:text-gray-300">
            © {new Date().getFullYear()} Delivery Portal. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link to="/login" className="text-primary hover:text-secondary dark:text-secondary dark:hover:text-white">
              Login
            </Link>
            <Link to="/customer" className="text-primary hover:text-secondary dark:text-secondary dark:hover:text-white">
              Customer Portal
            </Link>
            <Link to="/shopkeeper" className="text-primary hover:text-secondary dark:text-secondary dark:hover:text-white">
              Shopkeeper Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
