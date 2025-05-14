const Footer = () => {
  return (
    <footer
      className="bg-indigo-800 dark:bg-gray-900 text-white py-12"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-yellow-400 mb-4">For Shoppers</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} LocalMarket Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;