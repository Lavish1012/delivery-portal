import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, ShoppingBag, Store } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate   = useNavigate();
  const signedIn   = !!localStorage.getItem('token');

  const Item: React.FC<{ to: string; label: string }> = ({ to, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 md:py-0 md:px-0 text-sm font-medium 
         ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}
         hover:text-blue-600 dark:hover:text-blue-400`
      }
      onClick={() => setMobileOpen(false)}
    >
      {label}
    </NavLink>
  );

  /* ------------- MARK-UP ------------- */
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90
                       border-b border-gray-200 dark:border-gray-700 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
          Smart <span className="text-[#D78D3A]">Bazaar</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Item to="/"          label="Home" />
          {signedIn && <Item to="/dashboard" label="Dashboard" />}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium">
              Buyers <ShoppingBag className="h-4 w-4" />
            </button>
            {/* Dropdown */}
            <div className="absolute left-0 top-full hidden group-hover:block
                            bg-white dark:bg-gray-800 rounded shadow-lg mt-2 min-w-[10rem]">
              <Item to="/buyers/browse"   label="Browse Products" />
              <Item to="/buyers/orders"   label="My Orders" />
              <Item to="/buyers/wishlist" label="Wishlist" />
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium">
              Sellers <Store className="h-4 w-4" />
            </button>
            {/* Dropdown */}
            <div className="absolute left-0 top-full hidden group-hover:block
                            bg-white dark:bg-gray-800 rounded shadow-lg mt-2 min-w-[10rem]">
              <Item to="/dashboard"            label="Dashboard" />
              <Item to="/dashboard/inventory"  label="Products"   />
              <Item to="/dashboard/billing"    label="Billing"    />
            </div>
          </div>
        </nav>

        {/* Right-side controls */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Toggle dark mode"
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700
                       text-gray-800 dark:text-gray-200 hover:bg-gray-200
                       dark:hover:bg-gray-600 transition">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t
                        border-gray-200 dark:border-gray-700">
          <Item to="/"          label="Home" />
          {signedIn && <Item to="/dashboard" label="Dashboard" />}
          <Item to="/buyers/browse"   label="Browse Products" />
          <Item to="/buyers/orders"   label="My Orders" />
          <Item to="/buyers/wishlist" label="Wishlist" />
          <Item to="/dashboard/inventory" label="Products" />
          <Item to="/dashboard/billing"   label="Billing"  />
        </div>
      )}
    </header>
  );
};

export default Navbar;
