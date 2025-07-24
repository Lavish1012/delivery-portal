
import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-market-primary" />
              <span className="text-lg font-bold">LocalMarket<span className="text-market-primary">Connect</span></span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Connecting local shoppers with nearby businesses. Find what you need, when you need it, from stores just around the corner.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-market-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-market-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-market-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">For Shoppers</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">How It Works</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Find Nearby Shops</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Download App</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Safety Tips</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">For Businesses</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Join as a Shop</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Business Dashboard</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Inventory Management</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Marketing Tools</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">About Us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Careers</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-market-primary text-sm">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} LocalMarket Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
