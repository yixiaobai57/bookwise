import { NextResponse } from "next/server";
import { analyzeBookDifficulty } from "@/lib/ai-analyze";

interface RequestBody {
  bookId: string;
  textSnippet?: string;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    if (!body.bookId) {
      return NextResponse.json(
        { error: "请提供书籍 ID" },
        { status: 400 }
      );
    }

    const textSnippet =
      body.textSnippet ||
      "This is a sample text for analysis. The quick brown fox jumps over the lazy dog. Reading books is a great way to improve your vocabulary and understanding of the English language.";

    const result = await analyzeBookDifficulty(textSnippet);

    return NextResponse.json({
      bookId: body.bookId,
      ...result,
    });
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json(
      { error: "分析失败" },
      { status: 500 }
    );
  }
}
