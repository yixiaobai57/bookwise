"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CocabEntry, TestSession } from "@/lib/types";
import {
  createTestSession,
  selectNextWord,
  processAnswer,
  estimateVocabularySize,
  isTestComplete,
} from "@/lib/vocabulary";
import { saveVocabulary } from "@/lib/storage";
import cocaData from "@/data/coca-frequency.json";

interface VocabularyTestProps {
  onComplete: (vocabularySize: number) => void;
}

export function VocabularyTest({ onComplete }: VocabularyTestProps) {
  const [session, setSession] = useState<TestSession>(createTestSession());
  const [currentWord, setCurrentWord] = useState<CocabEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<{
    size: number;
    confidence: number;
  } | null>(null);

  const loadNextWord = useCallback(
    (currentSession: TestSession) => {
      const nextWord = selectNextWord(currentSession, cocaData as CocabEntry[]);
      setCurrentWord(nextWord);
    },
    []
  );

  useEffect(() => {
    loadNextWord(session);
  }, [session, loadNextWord]);

  const handleAnswer = async (known: boolean) => {
    if (!currentWord || isLoading) return;

    setIsLoading(true);

    const newSession = processAnswer(session, currentWord.word, known);
    setSession(newSession);

    if (isTestComplete(newSession)) {
      const estimate = estimateVocabularySize(
        newSession.answers,
        cocaData as CocabEntry[]
      );
      setResult(estimate);
      setIsComplete(true);

      saveVocabulary({
        vocabularySize: estimate.size,
        testMethod: "adaptive",
        testedAt: new Date().toISOString(),
        knownWords: newSession.answers
          .filter((a) => a.known)
          .map((a) => a.word),
      });

      onComplete(estimate.size);
    } else {
      loadNextWord(newSession);
    }

    setIsLoading(false);
  };

  if (isComplete && result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <h2 className="text-2xl font-bold mb-4">测试完成！</h2>
        <div className="mb-8">
          <div className="text-6xl font-bold text-gradient mb-2">
            {result.size.toLocaleString()}
          </div>
          <p className="text-muted">预估词汇量</p>
        </div>
        <div className="mb-8">
          <div className="text-lg text-muted">
            置信度：{(result.confidence * 100).toFixed(0)}%
          </div>
        </div>
        <button
          onClick={() => onComplete(result.size)}
          className="btn-gradient px-8 py-3 rounded-full text-lg font-semibold"
        >
          查看推荐书籍 →
        </button>
      </motion.div>
    );
  }

  if (!currentWord) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-start mx-auto mb-4"></div>
        <p className="text-muted">加载中...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted mb-2">
          <span>进度</span>
          <span>{session.answers.length + 1} / 35</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-start to-primary-end"
            initial={{ width: 0 }}
            animate={{
              width: `${((session.answers.length + 1) / 35) * 100}%`,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord.word}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-center py-12"
        >
          <div className="text-5xl md:text-6xl font-bold mb-12">
            {currentWord.word}
          </div>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => handleAnswer(true)}
              disabled={isLoading}
              className="px-12 py-4 rounded-2xl text-lg font-semibold bg-green-50 text-green-700 border-2 border-green-200 hover:bg-green-100 hover:border-green-300 transition-all duration-200 disabled:opacity-50"
            >
              认识 ✅
            </button>
            <button
              onClick={() => handleAnswer(false)}
              disabled={isLoading}
              className="px-12 py-4 rounded-2xl text-lg font-semibold bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 disabled:opacity-50"
            >
              不认识 ❌
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
