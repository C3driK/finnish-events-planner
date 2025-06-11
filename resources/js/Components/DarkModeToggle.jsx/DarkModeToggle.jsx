import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  
  const getInitialTheme = () => localStorage.getItem("theme") === "dark";


  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);


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
      className="px-3 py-1 text-sm border rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
    >
      {isDarkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default DarkModeToggle;
