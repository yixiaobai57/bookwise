"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const features = [
  {
    title: "AI 词汇测试",
    description: "自适应算法，30 个词精准推算你的词汇量",
    icon: "📝",
  },
  {
    title: "智能覆盖率计算",
    description: "词形还原 + AI 语义分析，精确计算每本书的词汇覆盖率",
    icon: "📊",
  },
  {
    title: "个性化推荐",
    description: "自动筛选 80% 覆盖率的书籍，让阅读不再痛苦",
    icon: "📚",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6"
        >
          找到适合你
          <span className="text-gradient">词汇量</span>
          的英文书
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-lg text-muted max-w-2xl mx-auto mb-10"
        >
          AI 智能分析，每次推荐 80% 词汇覆盖率的书籍，让英文阅读成为享受
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <Link
            href="/test"
            className="btn-gradient inline-block px-8 py-4 rounded-full text-lg font-semibold"
          >
            开始测试 →
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="bg-card rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
