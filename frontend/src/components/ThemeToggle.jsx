import React from 'react';

const ThemeToggle = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;