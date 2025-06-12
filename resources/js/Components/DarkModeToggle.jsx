import useDarkMode from '@/hooks/useDarkMode';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
  onClick={handleToggle}
  className="px-3 py-1 rounded border text-sm bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white transition duration-300"
>
  {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
  );
};

export default DarkModeToggle;
