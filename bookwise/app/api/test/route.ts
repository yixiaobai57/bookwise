import { NextResponse } from "next/server";
import { TestAnswer } from "@/lib/types";
import { estimateVocabularySize } from "@/lib/vocabulary";
import cocaData from "@/data/coca-frequency.json";

interface RequestBody {
  answers: TestAnswer[];
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    if (!body.answers || !Array.isArray(body.answers) || body.answers.length === 0) {
      return NextResponse.json(
        { error: "请提供有效的测试答案" },
        { status: 400 }
      );
    }

    const validAnswers = body.answers.filter(
      (a) =>
        typeof a.word === "string" &&
        typeof a.known === "boolean" &&
        a.word.length > 0
    );

    if (validAnswers.length === 0) {
      return NextResponse.json(
        { error: "没有有效的答案" },
        { status: 400 }
      );
    }

    const result = estimateVocabularySize(validAnswers, cocaData);

    return NextResponse.json({
      vocabularySize: result.size,
      confidence: result.confidence,
      totalAnswers: validAnswers.length,
    });
  } catch (error) {
    console.error("Test API error:", error);
    return NextResponse.json(
      { error: "服务器内部错误" },
      { status: 500 }
    );
  }
}
