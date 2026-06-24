"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExamMapping } from "@/lib/types";
import { saveVocabulary } from "@/lib/storage";
import examMappingData from "@/data/exam-mapping.json";

interface ExamInputProps {
  onComplete: (vocabularySize: number) => void;
}

export function ExamInput({ onComplete }: ExamInputProps) {
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [score, setScore] = useState("");
  const [error, setError] = useState("");

  const examData = examMappingData as ExamMapping[];

  const selectedExamData = examData.find((e) => e.exam === selectedExam);

  const handleSubmit = () => {
    if (!selectedExam) {
      setError("请选择考试类型");
      return;
    }

    const numScore = parseFloat(score);
    if (isNaN(numScore)) {
      setError("请输入有效分数");
      return;
    }

    const exam = examData.find((e) => e.exam === selectedExam);
    if (!exam) {
      setError("无效的考试类型");
      return;
    }

    let vocabSize = 0;
    for (const range of exam.scoreRanges) {
      if (numScore >= range.min && numScore <= range.max) {
        const ratio = (numScore - range.min) / (range.max - range.min);
        vocabSize = Math.round(
          range.vocabMin + ratio * (range.vocabMax - range.vocabMin)
        );
        break;
      }
    }

    if (vocabSize === 0) {
      if (numScore < exam.scoreRanges[0].min) {
        vocabSize = exam.scoreRanges[0].vocabMin;
      } else {
        vocabSize = exam.scoreRanges[exam.scoreRanges.length - 1].vocabMax;
      }
    }

    saveVocabulary({
      vocabularySize: vocabSize,
      testMethod: "exam",
      testedAt: new Date().toISOString(),
    });

    onComplete(vocabSize);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto text-center py-12"
    >
      <h2 className="text-2xl font-bold mb-4">考试成绩映射</h2>
      <p className="text-muted mb-8">根据你的考试成绩推算词汇量</p>

      <div className="mb-6">
        <select
          value={selectedExam}
          onChange={(e) => {
            setSelectedExam(e.target.value);
            setError("");
          }}
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-primary-start focus:outline-none transition-colors appearance-none bg-white"
        >
          <option value="">选择考试类型</option>
          {examData.map((exam) => (
            <option key={exam.exam} value={exam.exam}>
              {exam.label}
            </option>
          ))}
        </select>
      </div>

      {selectedExamData && (
        <div className="mb-6">
          <input
            type="number"
            value={score}
            onChange={(e) => {
              setScore(e.target.value);
              setError("");
            }}
            placeholder={`输入${selectedExamData.label}分数`}
            step={selectedExamData.exam === "IELTS" ? 0.5 : 1}
            className="w-full px-6 py-4 text-2xl text-center border-2 border-gray-200 rounded-2xl focus:border-primary-start focus:outline-none transition-colors"
          />
          <p className="text-sm text-muted mt-2">
            分数范围：{selectedExamData.scoreRanges[0].min} -{" "}
            {selectedExamData.scoreRanges[selectedExamData.scoreRanges.length - 1].max}
          </p>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleSubmit}
        className="btn-gradient px-8 py-3 rounded-full text-lg font-semibold"
      >
        确认 →
      </button>
    </motion.div>
  );
}
