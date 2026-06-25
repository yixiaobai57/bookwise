import { NextResponse } from "next/server";
import { getRecommendations } from "@/lib/recommend";

interface RequestBody {
  vocabularySize: number;
  targetCoverage?: number;
  category?: string;
  difficulty?: string;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    if (
      typeof body.vocabularySize !== "number" ||
      body.vocabularySize < 1000 ||
      body.vocabularySize > 30000
    ) {
      return NextResponse.json(
        { error: "词汇量必须在 1000-30000 之间" },
        { status: 400 }
      );
    }

    const targetCoverage = body.targetCoverage ?? 0.8;
    const filters: { category?: string; difficulty?: string } = {};

    if (body.category) {
      filters.category = body.category;
    }
    if (body.difficulty) {
      filters.difficulty = body.difficulty;
    }

    const recommendations = getRecommendations(
      body.vocabularySize,
      targetCoverage,
      filters
    );

    return NextResponse.json({
      recommendations,
      total: recommendations.length,
      vocabularySize: body.vocabularySize,
      targetCoverage,
    });
  } catch (error) {
    console.error("Recommend API error:", error);
    return NextResponse.json(
      { error: "服务器内部错误" },
      { status: 500 }
    );
  }
}
