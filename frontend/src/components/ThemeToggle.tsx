import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const iconVariants = {
    rotate: {
      rotate: 360,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  const toggleVariants = {
    light: {
      backgroundColor: "#F1F5F9",
      borderColor: "#E2E8F0"
    },
    dark: {
      backgroundColor: "#334155",
      borderColor: "#475569"
    }
  };

  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`
        relative inline-flex items-center justify-center
        w-12 h-12 rounded-full border-2 transition-all duration-300
        hover:scale-110 active:scale-95
        ${isDarkMode 
          ? 'bg-slate-700 border-slate-600 text-slate-100' 
          : 'bg-slate-50 border-slate-200 text-slate-800'
        }
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isDarkMode 
          ? 'focus:ring-slate-400 focus:ring-offset-slate-800' 
          : 'focus:ring-slate-400 focus:ring-offset-white'
        }
      `}
      variants={toggleVariants}
      animate={isDarkMode ? 'dark' : 'light'}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <motion.div
        variants={iconVariants}
        animate="rotate"
        key={isDarkMode ? 'moon' : 'sun'}
      >
        {isDarkMode ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;