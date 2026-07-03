"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { saveVocabulary } from "@/lib/storage";

interface ManualInputProps {
  onComplete: (vocabularySize: number) => void;
}

export function ManualInput({ onComplete }: ManualInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const num = parseInt(value, 10);

    if (isNaN(num) || num < 1000 || num > 30000) {
      setError("请输入 1000-30000 之间的数字");
      return;
    }

    saveVocabulary({
      vocabularySize: num,
      testMethod: "manual",
      testedAt: new Date().toISOString(),
    });

    onComplete(num);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-card rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">输入你的词汇量</h2>
        <p className="text-muted mb-8">
          如果你知道自己的词汇量，可以直接输入
        </p>

        <div className="mb-6">
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError("");
            }}
            placeholder="例如：8000"
            min={1000}
            max={30000}
            className="input-glow w-full px-6 py-4 text-2xl text-center rounded-2xl bg-card text-foreground"
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2"
            >
              {error}
            </motion.p>
          )}
        </div>

        <div className="mb-8">
          <input
            type="range"
            min={1000}
            max={30000}
            step={500}
            value={value ? parseInt(value) : 5000}
            onChange={(e) => setValue(e.target.value)}
            className="w-full accent-primary-start dark:accent-primary-end"
          />
          <div className="flex justify-between text-sm text-muted mt-1">
            <span>1,000</span>
            <span>30,000</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="btn-gradient px-8 py-3 rounded-2xl text-lg font-semibold w-full"
        >
          确认 →
        </motion.button>
      </div>
    </motion.div>
  );
}
