"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const bentoFeatures = [
  {
    title: "AI 词汇测试",
    description: "自适应贝叶斯推算，30 个词精准评估你的词汇水平。基于 COCA 词频表，科学准确。",
    icon: "🧠",
    large: true,
    gradient: "from-primary-start/8 via-transparent to-primary-end/5",
  },
  {
    title: "智能覆盖率计算",
    description: "词形还原 + AI 语义分析，精确计算每本书的词汇覆盖率。",
    icon: "📊",
    large: false,
    gradient: "from-primary-start/6 via-transparent to-transparent",
  },
  {
    title: "个性化推荐",
    description: "自动筛选 80% 覆盖率的书籍，让英文阅读成为享受。",
    icon: "📚",
    large: false,
    gradient: "from-primary-end/6 via-transparent to-transparent",
  },
];

const steps = [
  {
    step: "01",
    title: "测试词汇量",
    desc: "通过自适应测试了解你的英语词汇水平",
    icon: "📝",
  },
  {
    step: "02",
    title: "AI 分析匹配",
    desc: "系统自动计算你对每本书的词汇覆盖率",
    icon: "🔬",
  },
  {
    step: "03",
    title: "获取推荐",
    desc: "获得词汇覆盖率 ≥80% 的书籍推荐列表",
    icon: "📋",
  },
  {
    step: "04",
    title: "开始阅读",
    desc: "选择感兴趣的书，享受流畅的英文阅读体验",
    icon: "📖",
  },
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
      {/* ─── Hero Section ─── */}
      <section
        ref={heroRef}
        className="hero-bg mesh-bg grain-overlay w-full min-h-[92vh] flex items-center justify-center relative overflow-hidden"
      >
        {/* Floating orbs */}
        <motion.div
          className="orb orb-primary absolute w-[500px] h-[500px] -top-40 -left-40"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="orb orb-accent absolute w-[400px] h-[400px] -bottom-32 -right-32"
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="orb absolute w-[200px] h-[200px] top-1/3 right-1/4 bg-gradient-to-br from-primary-start/20 to-primary-end/10"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="glass-pill inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-primary-start">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-start opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-start" />
              </span>
              AI 驱动的英文阅读推荐
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8"
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
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            AI 智能分析，每次推荐 80% 词汇覆盖率的书籍，
            <br className="hidden md:block" />
            让英文阅读不再是痛苦的查词过程
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/test"
              className="btn-gradient inline-block px-10 py-4 rounded-2xl text-lg font-semibold"
            >
              开始测试 →
            </Link>
            <Link
              href="/recommend"
              className="btn-ghost inline-block px-10 py-4 rounded-2xl text-lg font-semibold text-foreground"
            >
              浏览书籍
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Stats Section ─── */}
      <section className="w-full py-20 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="glass-card rounded-3xl p-8 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-1.5">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bento Features Section ─── */}
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

        <div className="bento-grid">
          {bentoFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: "easeOut",
              }}
              className={`glass-card rounded-3xl p-8 overflow-hidden relative group ${
                feature.large ? "bento-card-lg" : ""
              }`}
            >
              {/* Gradient background accent */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-primary-start/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── How It Works Section ─── */}
      <section className="w-full py-24">
        <div className="section-divider absolute left-0 right-0" />
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              如何使用
            </h2>
            <p className="text-muted text-lg">
              简单四步，开启你的英文阅读之旅
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 group"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{s.icon}</span>
                      <h3 className="text-lg font-semibold">{s.title}</h3>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="w-full py-24 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="absolute inset-0 hero-bg mesh-bg grain-overlay" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-2xl mx-auto px-6 text-center"
        >
          <div className="glass-card rounded-3xl p-10 md:p-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              准备好了吗？
            </h2>
            <p className="text-muted text-lg mb-8">
              测试你的词汇量，找到最适合你的英文书
            </p>
            <Link
              href="/test"
              className="btn-gradient inline-block px-10 py-4 rounded-2xl text-lg font-semibold"
            >
              立即开始 →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="w-full py-8 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-muted">
            BookWise — AI 驱动的英文阅读推荐平台
          </p>
        </div>
      </footer>
    </div>
  );
}
