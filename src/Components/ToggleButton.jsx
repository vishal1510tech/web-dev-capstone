import { useEffect, useState } from "react";

function ToggleButton() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`w-16 h-8 flex items-center rounded-full p-1 transition duration-300 ${
          darkMode ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition duration-300 ${
            darkMode ? "translate-x-8" : ""
          }`}
        />
      </button>

      <span className="font-semibold">
        {darkMode ? "Dark Mode" : "Light Mode"}
      </span>
    </div>
  );
}

export default ToggleButton;