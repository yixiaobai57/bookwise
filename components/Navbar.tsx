"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/test", label: "词汇测试" },
  { href: "/recommend", label: "推荐书籍" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-surface shadow-lg"
            : "bg-background/60 backdrop-blur-md border-b border-border"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white text-sm font-bold">B</span>
            </div>
            <span className="text-lg font-bold text-gradient">BookWise</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 rounded-xl text-sm font-medium text-muted hover:text-foreground transition-colors group"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 rounded-xl bg-primary-start/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}

            <Link
              href="/test"
              className="btn-gradient ml-3 px-5 py-2 rounded-xl text-sm font-semibold"
            >
              开始测试
            </Link>

            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-10 h-10 rounded-xl bg-accent border border-border flex items-center justify-center hover:bg-primary-start/5 transition-colors"
              aria-label="菜单"
            >
              <div className="flex flex-col gap-1.5 items-center justify-center w-5">
                <motion.span
                  animate={{
                    rotate: mobileOpen ? 45 : 0,
                    y: mobileOpen ? 7 : 0,
                  }}
                  className="block h-0.5 w-5 bg-foreground rounded-full origin-center transition-transform"
                />
                <motion.span
                  animate={{ opacity: mobileOpen ? 0 : 1 }}
                  className="block h-0.5 w-5 bg-foreground rounded-full"
                />
                <motion.span
                  animate={{
                    rotate: mobileOpen ? -45 : 0,
                    y: mobileOpen ? -7 : 0,
                  }}
                  className="block h-0.5 w-5 bg-foreground rounded-full origin-center transition-transform"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-16 left-4 right-4 z-50 glass-card rounded-2xl p-4 md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground font-medium hover:bg-primary-start/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-2"
                >
                  <Link
                    href="/test"
                    onClick={() => setMobileOpen(false)}
                    className="btn-gradient block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold"
                  >
                    开始测试 →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
