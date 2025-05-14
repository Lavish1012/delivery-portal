import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiShoppingBag, 
  FiTruck, 
  FiClock, 
  FiHeart, 
  FiArrowRight, 
  FiMail,
  FiMapPin,
  FiStar,
  FiPackage
} from 'react-icons/fi';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Simple Background */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              The fastest way to get your favorite items delivered
            </h1>
            <p className="text-xl mb-8">
              Shop from local stores and get everything delivered to your doorstep in minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/shop-locator" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-50"
              >
                Find Nearby Shops
              </Link>
              <Link 
                to="/sign-up" 
                className="bg-red-500 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-red-600"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">Why Choose Our Service</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-5">
                <span className="text-indigo-600"><FiShoppingBag size={24} /></span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Local Shopping</h3>
              <p className="text-slate-600">
                Support local businesses by shopping from nearby stores with a wide selection of products.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-5">
                <span className="text-teal-600"><FiTruck size={24} /></span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Fast Delivery</h3>
              <p className="text-slate-600">
                Get your items delivered quickly with our efficient delivery network of local couriers.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-5">
                <span className="text-rose-600"><FiClock size={24} /></span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Real-time Tracking</h3>
              <p className="text-slate-600">
                Follow your delivery in real-time and know exactly when your items will arrive.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-5">
                <span className="text-amber-600"><FiHeart size={24} /></span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Personalized Service</h3>
              <p className="text-slate-600">
                Enjoy personalized recommendations based on your preferences and shopping history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">How It Works</h2>
            
            <div className="relative">
              {/* Step Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-indigo-200 -translate-y-1/2 z-0"></div>
              
              {/* Steps */}
              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">Find Local Shops</h3>
                  <p className="text-slate-600">
                    Browse through a variety of shops in your area to find what you need.
                  </p>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">Place Your Order</h3>
                  <p className="text-slate-600">
                    Add items to your cart and proceed to checkout with secure payment options.
                  </p>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-rose-600 text-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">Receive Delivery</h3>
                  <p className="text-slate-600">
                    Your items will be delivered to your doorstep, often within the same day.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link to="/shop-locator" className="inline-flex items-center bg-indigo-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl">
                Start Shopping Now
                <span className="ml-2"><FiArrowRight /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800">Popular Categories</h2>
          <p className="text-xl text-center mb-12 text-slate-600 max-w-3xl mx-auto">
            Explore our most popular shopping categories from local stores near you
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Category 1 */}
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-w-3 aspect-h-2 bg-gradient-to-r from-indigo-500 to-purple-600">
                <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-indigo-600 opacity-75 group-hover:opacity-90 transition"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center flex-col p-6">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Electronics</h3>
                <Link to="/category/electronics" className="bg-white/90 text-indigo-700 py-2 px-4 rounded-lg font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now
                </Link>
              </div>
            </div>
            
            {/* Category 2 */}
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-w-3 aspect-h-2 bg-gradient-to-r from-rose-500 to-red-600">
                <div className="w-full h-full bg-gradient-to-br from-rose-400 to-rose-600 opacity-75 group-hover:opacity-90 transition"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center flex-col p-6">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Fashion</h3>
                <Link to="/category/fashion" className="bg-white/90 text-rose-700 py-2 px-4 rounded-lg font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now
                </Link>
              </div>
            </div>
            
            {/* Category 3 */}
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-w-3 aspect-h-2 bg-gradient-to-r from-teal-500 to-emerald-600">
                <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 opacity-75 group-hover:opacity-90 transition"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center flex-col p-6">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Grocery</h3>
                <Link to="/category/grocery" className="bg-white/90 text-teal-700 py-2 px-4 rounded-lg font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now
                </Link>
              </div>
            </div>
            
            {/* Category 4 */}
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-w-3 aspect-h-2 bg-gradient-to-r from-amber-500 to-yellow-600">
                <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 opacity-75 group-hover:opacity-90 transition"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center flex-col p-6">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Home Goods</h3>
                <Link to="/category/home" className="bg-white/90 text-amber-700 py-2 px-4 rounded-lg font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/categories" className="text-indigo-600 font-medium text-lg inline-flex items-center hover:text-indigo-800 transition">
              View All Categories
              <span className="ml-2"><FiArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative">
              <div className="absolute -top-4 left-6">
                <div className="inline-flex bg-indigo-600 p-2 rounded-full text-white">
                  <FiStar size={16} />
                </div>
              </div>
              <div className="flex flex-col h-full">
                <div className="mb-4 pt-2">
                  <div className="flex text-amber-400 mb-2">
                    <FiStar size={16} />
                    <FiStar size={16} />
                    <FiStar size={16} />
                    <FiStar size={16} />
                    <FiStar size={16} />
                  </div>
                  <p className="text-slate-700 mb-4">
                    "Amazing service! Got my delivery within an hour of ordering. The app is super easy to use and the delivery updates were great!"
                  </p>
                  <div className="mt-auto">
                    <p className="font-medium text-slate-800">Sarah Johnson</p>
                    <p className="text-slate-600 text-sm">Regular Customer</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative">
              <div className="absolute -top-4 left-6">
                <div className="inline-flex bg-teal-600 p-2 rounded-full text-white">
                  <FiStar size={16} />
                </div>
              </div>
              <div className="flex flex-col h-full">
                <div className="mb-4 pt-2">
                  <div className="flex text-amber-400 mb-2">
                    <FiStar size={16} />
                    <FiStar size={16} />
                    <FiStar size={16} />
                    <FiStar size={16} />
                    <FiStar size={16} />
                  </div>
                  <p className="text-slate-700 mb-4">
                    "I love how I can support local businesses through this app. The item selection is great and delivery is always on time!"
                  </p>
                  <div className="mt-auto">
                    <p className="font-medium text-slate-800">Michael Roberts</p>
                    <p className="text-slate-600 text-sm">Local Shopper</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative">
              <div className="absolute -top-4 left-6">
                <div className="inline-flex bg-rose-600 p-2 rounded-full text-white">
                  <FiStar size={16} />
                </div>
              </div>
              <div className="flex flex-col h-full">
                <div className="mb-4 pt-2">
                  <div className="flex text-amber-400 mb-2">
                    <FiStar size={16} />
                    <FiStar size={16} />
                    <FiStar size={16} />
                    <FiStar size={16} />
                    <FiStar size={16} />
                  </div>
                  <p className="text-slate-700 mb-4">
                    "The customer service is exceptional. When I had an issue with my order, they resolved it immediately. Highly recommend!"
                  </p>
                  <div className="mt-auto">
                    <p className="font-medium text-slate-800">Emily Chen</p>
                    <p className="text-slate-600 text-sm">Weekly Shopper</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">DeliveryPortal</h3>
              <p className="text-slate-300 mb-6">
                Your one-stop solution for local shopping and quick delivery.
              </p>
              <div className="flex space-x-4">
                <Link to="/about" className="text-slate-300 hover:text-white transition">About</Link>
                <Link to="/contact" className="text-slate-300 hover:text-white transition">Contact</Link>
                <Link to="/careers" className="text-slate-300 hover:text-white transition">Careers</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="flex flex-col space-y-2">
                <Link to="/shop-locator" className="text-slate-300 hover:text-white transition">Find Shops</Link>
                <Link to="/track-order" className="text-slate-300 hover:text-white transition">Track Order</Link>
                <Link to="/become-partner" className="text-slate-300 hover:text-white transition">Become a Partner</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="flex flex-col space-y-2 text-slate-300">
                <a href="mailto:support@deliveryportal.com" className="flex items-center hover:text-white transition">
                  <span className="mr-2"><FiMail /></span> support@deliveryportal.com
                </a>
                <span className="flex items-center">
                  <span className="mr-2"><FiMapPin /></span> 123 Delivery Street, City
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} DeliveryPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
