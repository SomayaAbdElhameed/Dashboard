import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function SideBar() {
  const theme = useContext(ThemeContext);
  const darkMode = theme?.darkMode ?? false;
  const toggleTheme = theme?.toggleTheme ?? (() => {});

  return (
    <aside className="sidebar">
      <h2>AdminPanel</h2>
      <nav>
        <button onClick={toggleTheme}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        <a href="#">Dashboard</a>
        <a href="#">Users</a>
        <a href="#">Products</a>
        <a href="#">Analytics</a>
        <a href="#">Settings</a>
      </nav>
    </aside>
  );
}

