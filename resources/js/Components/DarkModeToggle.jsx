 
import { useState, useEffect } from "react";
 
const DarkModeToggle = () => {
 
  const savedTheme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === "dark");
 
  useEffect(() => {
    const root = document.documentElement;
 
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
 
 
  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
 
  return (
    <button
      onClick={handleToggle}
      className="px-3 py-1 rounded border text-sm bg-gray-200 dark:bg-gray-800 dark:text-white"
    >
      {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};
 
export default DarkModeToggle;