import { NextResponse } from "next/server";
import { fetchGutenbergText } from "@/lib/gutenberg";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json(
        { error: "请提供 Gutenberg 书籍 ID" },
        { status: 400 }
      );
    }

    const gutenbergId = parseInt(idParam, 10);

    if (isNaN(gutenbergId) || gutenbergId <= 0) {
      return NextResponse.json(
        { error: "无效的 Gutenberg ID" },
        { status: 400 }
      );
    }

    const result = await fetchGutenbergText(gutenbergId);

    return NextResponse.json({
      textLength: result.text.length,
      uniqueWordsCount: result.uniqueWords.length,
      wordCount: result.wordCount,
      sampleText: result.text.substring(0, 500),
      uniqueWordsSample: result.uniqueWords.slice(0, 100),
    });
  } catch (error) {
    console.error("Gutenberg API error:", error);
    return NextResponse.json(
      { error: "获取 Gutenberg 文本失败" },
      { status: 500 }
    );
  }
}
