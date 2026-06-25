"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-gradient">BookWise</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/test"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            词汇测试
          </Link>
          <Link
            href="/recommend"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            推荐书籍
          </Link>
          <Link
            href="/test"
            className="btn-gradient px-4 py-2 rounded-full text-sm font-medium"
          >
            开始测试
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
