import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const workId = searchParams.get("work");
    const size = searchParams.get("size") || "L";

    if (!workId) {
      return NextResponse.json(
        { error: "Missing work ID" },
        { status: 400 }
      );
    }

    const coverUrl = `https://covers.openlibrary.org/w/${workId}-${size}.jpg`;

    const response = await fetch(coverUrl, {
      headers: {
        "User-Agent": "BookWise/1.0 (personal project)",
      },
      cache: "force-cache",
      next: { revalidate: 86400 * 30 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Cover not found" },
        { status: 404 }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=2592000, s-maxage=2592000",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Cover proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cover" },
      { status: 500 }
    );
  }
}
