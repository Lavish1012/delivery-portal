import React from 'react';
import { FiMapPin, FiShoppingBag, FiTrendingUp, FiPhone, FiMail, FiMapPin as FiMapPinFooter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF6F2] to-[#F3ECE7] dark:from-[#1A1A1C] dark:to-[#2B2B2E]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-[#2D2D2D] dark:text-[#F2F2F2]">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Connect with <span className="text-[#D78D3A] dark:text-[#FFA94D]">Local Shops</span> in Your Neighborhood
            </h1>
            <p className="text-xl text-[#6A6A6A] dark:text-[#BDBDBD] mb-8">
              Discover products from trusted local shopkeepers, order with ease, and support your community's growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/customer" className="bg-[#D78D3A] hover:bg-[#c07c33] text-[#FAF6F2] px-8 py-4 rounded-lg font-semibold shadow-lg hover-grow dark:bg-[#FFA94D] dark:hover:bg-[#e89a45] dark:text-[#1A1A1C] transition-all duration-300 transform hover:scale-105">
                Shop as Customer
              </Link>
              <Link to="/shopkeeper" className="bg-[#3A3A3D] hover:bg-[#2D2D2D] text-[#F3ECE7] px-8 py-4 rounded-lg font-semibold shadow-lg hover-grow dark:bg-[#F8F3EF]/10 dark:hover:bg-[#F8F3EF]/20 dark:text-[#F2F2F2] transition-all duration-300 transform hover:scale-105">
                Shopkeeper Portal
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            {/* Placeholder for hero image - can be replaced with actual image */}
            <div className="w-full max-w-lg h-96 bg-[#E0DCD6]/20 rounded-2xl backdrop-blur-sm shadow-2xl flex items-center justify-center dark:bg-[#3A3A3A]/20">
              <span className="text-[#6A6A6A] dark:text-[#BDBDBD]/70 text-lg">Shop Local, Connect Better</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[#FAF6F2] dark:bg-[#1A1A1C] py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#2D2D2D] dark:text-[#F2F2F2]">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#F3ECE7] to-[#FAF6F2] dark:from-[#2B2B2E] dark:to-[#1A1A1C] p-8 rounded-xl shadow-lg hover-card border border-[#E0DCD6] dark:border-[#3A3A3A]">
              <div className="text-[#D78D3A] dark:text-[#FFA94D] mb-4 hover-icon">
                <FiMapPin size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#2D2D2D] dark:text-[#F2F2F2]">Location-Based Discovery</h3>
              <p className="text-[#6A6A6A] dark:text-[#BDBDBD]">Find nearby shops and products in real-time. Get directions and support your local community.</p>
            </div>
            <div className="bg-gradient-to-br from-[#F3ECE7] to-[#FAF6F2] dark:from-[#2B2B2E] dark:to-[#1A1A1C] p-8 rounded-xl shadow-lg hover-card border border-[#E0DCD6] dark:border-[#3A3A3A]">
              <div className="text-[#D78D3A] dark:text-[#FFA94D] mb-4 hover-icon">
                <FiShoppingBag size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#2D2D2D] dark:text-[#F2F2F2]">Smart Inventory Management</h3>
              <p className="text-[#6A6A6A] dark:text-[#BDBDBD]">Shopkeepers can easily manage their inventory, track sales, and update product availability.</p>
            </div>
            <div className="bg-gradient-to-br from-[#F3ECE7] to-[#FAF6F2] dark:from-[#2B2B2E] dark:to-[#1A1A1C] p-8 rounded-xl shadow-lg hover-card border border-[#E0DCD6] dark:border-[#3A3A3A]">
              <div className="text-[#D78D3A] dark:text-[#FFA94D] mb-4 hover-icon">
                <FiTrendingUp size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#2D2D2D] dark:text-[#F2F2F2]">Business Analytics</h3>
              <p className="text-[#6A6A6A] dark:text-[#BDBDBD]">Get insights into your business performance with detailed analytics and customer behavior data.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
