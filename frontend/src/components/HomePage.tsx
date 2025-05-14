import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMap, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search results with query
    window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
  };

  // Sample categories and trending items (these would come from the backend in a real app)
  const categories = [
    { id: 1, name: 'Electronics', icon: '📱' },
    { id: 2, name: 'Home Goods', icon: '🏠' },
    { id: 3, name: 'Collectibles', icon: '🏆' },
    { id: 4, name: 'Vintage', icon: '🕰️' },
    { id: 5, name: 'Handmade', icon: '🧶' },
    { id: 6, name: 'Books', icon: '📚' }
  ];

  const trendingItems = [
    { id: 1, name: 'Vintage Polaroid Camera', shop: 'RetroTech', distance: '0.8 miles', price: '$75' },
    { id: 2, name: 'Handcrafted Leather Journal', shop: 'Craftsman\'s Corner', distance: '1.2 miles', price: '$35' },
    { id: 3, name: 'Limited Edition Vinyl Record', shop: 'Sound Haven', distance: '2.5 miles', price: '$45' },
    { id: 4, name: 'Antique Brass Compass', shop: 'Timeless Treasures', distance: '3.1 miles', price: '$60' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Rare Items Near You
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Discover unique products from local shops in your neighborhood
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                className="w-full p-4 pr-12 rounded-lg shadow-lg text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
              >
                <FiSearch size={24} />
              </button>
            </form>
            
            {/* Quick Action Buttons */}
            <div className="flex justify-center mt-8 space-x-4">
              <Link to="/map" className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition">
                <span className="mr-2"><FiMap /></span> Browse by Map
              </Link>
              <Link to="/categories" className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition">
                <span className="mr-2"><FiShoppingBag /></span> Shop Categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <Link 
              to={`/category/${category.id}`} 
              key={category.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition p-6 text-center"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-medium text-gray-800">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Items Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Trending Near You</h2>
            <FiTrendingUp size={24} color="#2563eb" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingItems.map(item => (
              <Link to={`/item/${item.id}`} key={item.id} className="group">
                <div className="bg-gray-100 h-48 rounded-lg mb-3 overflow-hidden group-hover:opacity-90 transition">
                  {/* In a real app, this would be an actual image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span>Item Image</span>
                  </div>
                </div>
                <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition">{item.name}</h3>
                <div className="text-sm text-gray-600">{item.shop} • {item.distance}</div>
                <div className="mt-1 font-medium text-blue-600">{item.price}</div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/trending" className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              See All Trending Items
            </Link>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Why Shop Local?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover unique products while supporting local businesses in your community
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Rare Items</h3>
            <p className="text-gray-600">
              Discover unique products that you won't find in big box stores or mainstream online retailers.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏬</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Support Local Shops</h3>
            <p className="text-gray-600">
              Help local businesses thrive by connecting them with the right customers for their unique products.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚶</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Nearby Convenience</h3>
            <p className="text-gray-600">
              Get what you need today from shops in your neighborhood, without waiting for shipping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

