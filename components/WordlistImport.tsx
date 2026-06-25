"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { saveVocabulary } from "@/lib/storage";
import cocaData from "@/data/coca-frequency.json";
import { CocabEntry } from "@/lib/types";

interface WordlistImportProps {
  onComplete: (vocabularySize: number) => void;
}

export function WordlistImport({ onComplete }: WordlistImportProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const processText = (inputText: string): string[] => {
    const words = inputText.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];
    return Array.from(new Set(words));
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("请输入或粘贴单词列表");
      return;
    }

    setIsProcessing(true);

    try {
      const uniqueWords = processText(text);

      if (uniqueWords.length < 10) {
        setError("请输入至少 10 个不同的英文单词");
        setIsProcessing(false);
        return;
      }

      const cocaSet = new Set(
        (cocaData as CocabEntry[]).map((e) => e.word.toLowerCase())
      );

      const matchedWords = uniqueWords.filter((w) => cocaSet.has(w));

      const vocabSize = Math.max(
        1000,
        Math.min(matchedWords.length * 10, 30000)
      );

      saveVocabulary({
        vocabularySize: vocabSize,
        testMethod: "wordlist",
        testedAt: new Date().toISOString(),
        knownWords: matchedWords,
      });

      onComplete(vocabSize);
    } catch (err) {
      setError("处理文本时出错，请重试");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setText(content);
      setError("");
    };
    reader.readAsText(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto text-center py-12"
    >
      <h2 className="text-2xl font-bold mb-4">导入单词表</h2>
      <p className="text-muted mb-8">
        粘贴你背过的单词，或上传单词文件
      </p>

      <div className="mb-6">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
          placeholder="粘贴英文单词列表，用空格、换行或逗号分隔..."
          rows={6}
          className="w-full px-6 py-4 border-2 border-border rounded-2xl focus:border-primary-start focus:outline-none transition-colors resize-none bg-card text-foreground"
        />
      </div>

      <div className="mb-6">
        <label className="block">
          <span className="sr-only">选择文件</span>
          <input
            type="file"
            accept=".txt,.csv,.tsv"
            onChange={handleFileUpload}
            className="block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-start/10 file:text-primary-start hover:file:bg-primary-start/20"
          />
        </label>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className="btn-gradient px-8 py-3 rounded-full text-lg font-semibold disabled:opacity-50"
      >
        {isProcessing ? "处理中..." : "确认 →"}
      </button>
    </motion.div>
  );
}
