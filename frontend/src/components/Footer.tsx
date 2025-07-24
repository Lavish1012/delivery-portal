import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      className="bg-indigo-800 dark:bg-[#1A1A1C] text-white py-12"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-yellow-400 mb-4">For Shoppers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 bg-transparent relative inline-block px-2 py-1 rounded no-underline transition-colors duration-300 ease-in-out cursor-pointer hover:bg-[#D78D3A] hover:text-white focus:bg-[#D78D3A] focus:text-white hover-text">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-200 bg-transparent relative inline-block px-2 py-1 rounded no-underline transition-colors duration-300 ease-in-out cursor-pointer hover:bg-[#D78D3A] hover:text-white focus:bg-[#D78D3A] focus:text-white hover-text">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Smart Bazaar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;