"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "AI 词汇测试",
    description: "自适应算法，30 个词精准推算你的词汇量，支持多种输入方式",
    icon: "🧠",
    detail: "基于 COCA 词频表的贝叶斯推算，科学准确",
  },
  {
    title: "智能覆盖率计算",
    description: "词形还原 + AI 语义分析，精确计算每本书的词汇覆盖率",
    icon: "📊",
    detail: "覆盖 80 本经典英文书，实时计算你的阅读适配度",
  },
  {
    title: "个性化推荐",
    description: "自动筛选 80% 覆盖率的书籍，让英文阅读成为享受",
    icon: "📚",
    detail: "按难度、分类多维度筛选，找到最适合你的书",
  },
];

const steps = [
  { step: "01", title: "测试词汇量", desc: "通过自适应测试了解你的英语词汇水平" },
  { step: "02", title: "AI 分析匹配", desc: "系统自动计算你对每本书的词汇覆盖率" },
  { step: "03", title: "获取推荐", desc: "获得词汇覆盖率 ≥80% 的书籍推荐列表" },
  { step: "04", title: "开始阅读", desc: "选择感兴趣的书，享受流畅的英文阅读体验" },
];

const stats = [
  { number: "80+", label: "精选英文书" },
  { number: "2,000", label: "COCA 高频词" },
  { number: "80%", label: "目标覆盖率" },
  { number: "4种", label: "测试方式" },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="hero-bg w-full min-h-[90vh] flex items-center justify-center relative"
      >
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-start/10 text-primary-start text-sm font-medium border border-primary-start/20">
              🚀 AI 驱动的英文阅读推荐
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6"
          >
            找到适合你
            <br />
            <span className="text-gradient">词汇量</span>
            的英文书
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10"
          >
            AI 智能分析，每次推荐 80% 词汇覆盖率的书籍，
            <br className="hidden md:block" />
            让英文阅读不再是痛苦的查词过程
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center gap-4"
          >
            <Link
              href="/test"
              className="btn-gradient inline-block px-8 py-4 rounded-full text-lg font-semibold"
            >
              开始测试 →
            </Link>
            <Link
              href="/recommend"
              className="inline-block px-8 py-4 rounded-full text-lg font-semibold border border-border hover:bg-accent transition-colors"
            >
              浏览书籍
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary-start/5 blur-xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-primary-end/5 blur-xl"
          animate={{ y: [0, 20, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-primary-start/3 blur-lg"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 border-y border-border bg-card">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">核心功能</h2>
          <p className="text-muted text-lg">
            三步找到最适合你词汇量的英文书
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow group"
            >
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-3">
                {feature.description}
              </p>
              <p className="text-xs text-primary-start">{feature.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-card py-24 border-y border-border">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">如何使用</h2>
            <p className="text-muted text-lg">简单四步，开启你的英文阅读之旅</p>
          </motion.div>

          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-6 p-6 rounded-2xl border border-border hover:border-primary-start/30 transition-colors"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center text-white font-bold text-lg">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                  <p className="text-muted text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto px-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            准备好了吗？
          </h2>
          <p className="text-muted text-lg mb-8">
            测试你的词汇量，找到最适合你的英文书
          </p>
          <Link
            href="/test"
            className="btn-gradient inline-block px-10 py-4 rounded-full text-lg font-semibold"
          >
            立即开始 →
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-muted">
          <p>BookWise — AI 驱动的英文阅读推荐平台</p>
        </div>
      </footer>
    </div>
  );
}
