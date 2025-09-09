"use client";
import { useState, useEffect } from "react";
import styles from "./DarkModeToggle.module.css";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Dark Mode aus localStorage laden
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      const darkMode = JSON.parse(savedDarkMode);
      setIsDarkMode(darkMode);
      document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.setAttribute("data-theme", newDarkMode ? "dark" : "light");
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  return (
    <button 
      className={styles.toggle} 
      onClick={toggleDarkMode}
      title={isDarkMode ? "Light Mode aktivieren" : "Dark Mode aktivieren"}
    >
      <span className={styles.icon}>
        {isDarkMode ? "☀️" : "🌙"}
      </span>
      <span className={styles.text}>
        {isDarkMode ? "Light" : "Dark"}
      </span>
    </button>
  );
}
