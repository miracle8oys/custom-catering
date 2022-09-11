import { useEffect, useState } from "react";

const DarkMode = () => {
  const [changeTheme, setChangeTheme] = useState<number>(0);
  const [darkModeStatus, setDarkModeStatus] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("dark-mode") === "true") {
      document.documentElement.classList.add("dark");
      setDarkModeStatus(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [changeTheme]);

  function darkMode(status: string) {
    const colorTheme = localStorage.getItem("dark-mode");
    if (!colorTheme || colorTheme === "false") {
      localStorage.setItem("dark-mode", "true");
    }

    if (colorTheme === "true") {
      localStorage.setItem("dark-mode", "false");
    }
    setChangeTheme((current) => current + 1);
    console.log(status);
  }

  return (
    <>
      <label
        htmlFor="default-toggle"
        className="inline-flex relative items-center cursor-pointer ml-3 mt-5 mb-3"
      >
        {darkModeStatus ? (
          <input
            onChange={(e) => darkMode(e.target.value)}
            type="checkbox"
            defaultChecked
            value="true"
            id="default-toggle"
            className="sr-only peer"
          />
        ) : (
          <input
            onChange={(e) => darkMode(e.target.value)}
            type="checkbox"
            value="true"
            id="default-toggle"
            className="sr-only peer"
          />
        )}

        <div className="w-11 h-6 bg-secondary bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-button dark:peer-focus:ring-blue rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-secondary peer-checked:bg-blue"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Dark Mode
        </span>
      </label>
    </>
  );
};

export default DarkMode;
