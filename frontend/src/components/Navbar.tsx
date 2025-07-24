import { useDarkMode } from "../context/DarkModeContext";
import { ChevronDown, Download, Menu, Moon, ShoppingBag, Store, Sun, UserCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };
  
  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeInOut" 
      }
    }
  };
  
  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.2, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      }
    }
  };
  
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`sticky top-0 z-50 ${scrolled ? 'bg-opacity-90 backdrop-blur-sm' : ''} bg-[#1A1A1C] dark:bg-[#1A1A1C] border-b border-[#2B2B2E] text-white transition-all duration-300`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-white">
            Smart <span className="text-[#D78D3A]">Bazaar</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Buyers Dropdown */}
          <div className="relative group">
            <button 
              className="flex items-center px-3 py-2 rounded-md hover:bg-[#2B2B2E] transition-colors text-[#F2F2F2] group"
              onClick={() => toggleDropdown('buyers')}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              <span>Buyers</span>
              <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${activeDropdown === 'buyers' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#2B2B2E] ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out transform origin-top-left ${activeDropdown === 'buyers' ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
              <div className="py-1">
                <Link to="/buyers/browse" className="block px-4 py-2 text-sm text-[#F2F2F2] hover:bg-[#3A3A3D] hover:text-[#D78D3A]">Browse Products</Link>
                <Link to="/buyers/orders" className="block px-4 py-2 text-sm text-[#F2F2F2] hover:bg-[#3A3A3D] hover:text-[#D78D3A]">My Orders</Link>
                <Link to="/buyers/wishlist" className="block px-4 py-2 text-sm text-[#F2F2F2] hover:bg-[#3A3A3D] hover:text-[#D78D3A]">Wishlist</Link>
              </div>
            </div>
          </div>
          
          {/* Sellers Dropdown */}
          <motion.div 
            className="relative group"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button 
              className="flex items-center px-3 py-2 rounded-md hover:bg-[#2B2B2E] transition-colors text-[#F2F2F2] group"
              onClick={() => toggleDropdown('sellers')}
            >
              <Store className="h-4 w-4 mr-1" />
              <span>Sellers</span>
              <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${activeDropdown === 'sellers' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#2B2B2E] ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out transform origin-top-left ${activeDropdown === 'sellers' ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
              <div className="py-1">
                <Link to="/sellers/dashboard" className="block px-4 py-2 text-sm text-[#F2F2F2] hover:bg-[#3A3A3D] hover:text-[#D78D3A]">Dashboard</Link>
                <Link to="/sellers/products" className="block px-4 py-2 text-sm text-[#F2F2F2] hover:bg-[#3A3A3D] hover:text-[#D78D3A]">Manage Products</Link>
                <Link to="/sellers/orders" className="block px-4 py-2 text-sm text-[#F2F2F2] hover:bg-[#3A3A3D] hover:text-[#D78D3A]">Orders</Link>
              </div>
            </div>
          </motion.div>
          
          <Link 
            to="/download" 
            className="flex items-center px-3 py-2 rounded-md hover:bg-[#2B2B2E] transition-colors text-[#F2F2F2]"
          >
            <Download className="h-4 w-4 mr-1" />
            <span>Download App</span>
          </Link>
          
          <Link 
            to="/login" 
            className="flex items-center px-4 py-2 ml-2 bg-[#D78D3A] hover:bg-[#C07C33] text-white font-medium rounded-md transition-colors"
          >
            <UserCircle className="h-4 w-4 mr-1" />
            <span>Sign In</span>
          </Link>
          <Link 
            to="/signup" 
            className="flex items-center px-4 py-2 ml-2 bg-transparent border border-[#D78D3A] text-[#D78D3A] font-medium rounded-md transition-colors hover:bg-[#D78D3A] hover:text-white"
          >
            <UserCircle className="h-4 w-4 mr-1" />
            <span>Sign Up</span>
          </Link>
        </div>

        {/* Mobile Menu & Dark Mode Toggle */}
        <div className="flex items-center space-x-3">
          <button
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full bg-[#2B2B2E] text-white hover:bg-[#3A3A3D] focus:outline-none focus:ring-2 focus:ring-[#D78D3A]"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          {/* Mobile menu button */}
          <button
            aria-label="Toggle Mobile Menu"
            className="md:hidden p-2 rounded-full bg-[#2B2B2E] text-white hover:bg-[#3A3A3D] focus:outline-none focus:ring-2 focus:ring-[#D78D3A]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-4 py-3 space-y-1 bg-[#1A1A1C] border-t border-[#2B2B2E]">
          {/* Mobile Buyers Menu */}
          <motion.div className="py-2" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <button
              className="flex items-center w-full px-3 py-2 rounded-md hover:bg-[#2B2B2E] transition-colors text-[#F2F2F2]"
              onClick={() => toggleDropdown('mobile-buyers')}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              <span>Buyers</span>
              <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${activeDropdown === 'mobile-buyers' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'mobile-buyers' && (
              <div className="pl-6 mt-1 space-y-1">
                <Link to="/buyers/browse" className="block px-4 py-2 text-sm text-[#F2F2F2] hover:bg-[#3A3A3D] hover:text-[#D78D3A]">Browse Products</Link>
                <Link to="/buyers/orders" className="block px-4 py-2 text-sm text-[#F2F2F2] hover:bg-[#3A3A3D] hover:text-[#D78D3A]">My Orders</Link>
                <Link to="/buyers/wishlist" className="block px-4 py-2 text-sm text-[#F2F2F2] hover:bg-[#3A3A3D] hover:text-[#D78D3A]">Wishlist</Link>
              </div>
            )}
          </motion.div>

          {/* Mobile Sellers Menu */}
          <motion.div className="py-2" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <button
              className="flex items-center w-full px-3 py-2 rounded-md hover:bg-[#2B2B2E] transition-colors text-[#F2F2F2]"
              onClick={() => toggleDropdown('mobile-sellers')}
            >
              <Store className="h-4 w-4 mr-1" />
              <span>Sellers</span>
              <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${activeDropdown === 'mobile-sellers' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'mobile-sellers' && (
              <div className="pl-6 mt-1 space-y-1">
                <Link to="/sellers/dashboard" className="block px-4 py-2 text-sm text-[#F2F2F2] hover:bg-[#3A3A3D] hover:text-[#D78D3A]">Dashboard</Link>
                <Link to="/sellers/products" className="block px-4 py-2 text-sm text-[#F2F2F2] hover:bg-[#3A3A3D] hover:text-[#D78D3A]">Manage Products</Link>
                <Link to="/sellers/orders" className="block px-4 py-2 text-sm text-[#F2F2F2] hover:bg-[#3A3A3D] hover:text-[#D78D3A]">Orders</Link>
              </div>
            )}
          </motion.div>

          <Link 
            to="/download" 
            className="flex items-center px-3 py-2 rounded-md hover:bg-[#2B2B2E] transition-colors text-[#F2F2F2]"
          >
            <Download className="h-4 w-4 mr-1" />
            <span>Download App</span>
          </Link>

          <Link 
            to="/login" 
            className="flex items-center px-4 py-2 ml-2 bg-[#D78D3A] hover:bg-[#C07C33] text-white font-medium rounded-md transition-colors"
          >
            <UserCircle className="h-4 w-4 mr-1" />
            <span>Sign In</span>
          </Link>
          <Link 
            to="/signup" 
            className="flex items-center px-4 py-2 ml-2 bg-transparent border border-[#D78D3A] text-[#D78D3A] font-medium rounded-md transition-colors hover:bg-[#D78D3A] hover:text-white"
          >
            <UserCircle className="h-4 w-4 mr-1" />
            <span>Sign Up</span>
          </Link>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;