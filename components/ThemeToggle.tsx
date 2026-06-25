"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("bookwise-theme") as "light" | "dark" | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initial = stored || preferred;
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("bookwise-theme", next);
  };

  if (!mounted) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      className="relative w-14 h-7 rounded-full bg-border p-0.5 transition-colors duration-300"
      aria-label="切换深色/浅色模式"
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-xs"
        animate={{ x: theme === "dark" ? 26 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === "light" ? "☀️" : "🌙"}
      </motion.div>
    </motion.button>
  );
}
