import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title");
  const author = searchParams.get("author");

  if (!title) {
    return NextResponse.json({ error: "Missing title" }, { status: 400 });
  }

  try {
    const query = encodeURIComponent(`${title} ${author || ""}`);
    const searchUrl = `https://openlibrary.org/search.json?q=${query}&limit=1`;

    const searchRes = await fetch(searchUrl, {
      next: { revalidate: 86400 * 30 },
    });

    if (!searchRes.ok) {
      throw new Error(`Search failed: ${searchRes.status}`);
    }

    const data = await searchRes.json();

    let coverUrl = null;

    if (data.docs && data.docs.length > 0) {
      const doc = data.docs[0];

      if (doc.cover_i) {
        coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
      } else if (doc.isbn && doc.isbn.length > 0) {
        coverUrl = `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-L.jpg`;
      } else if (doc.key) {
        const workId = doc.key.replace("/works/", "");
        coverUrl = `https://covers.openlibrary.org/w/${workId}-L.jpg`;
      }
    }

    if (!coverUrl) {
      return NextResponse.json({ error: "No cover found" }, { status: 404 });
    }

    const imageRes = await fetch(coverUrl, {
      next: { revalidate: 86400 * 30 },
    });

    if (!imageRes.ok || imageRes.headers.get("content-length") === "0") {
      return NextResponse.json({ error: "Cover image not available" }, { status: 404 });
    }

    const imageBuffer = await imageRes.arrayBuffer();
    const contentType = imageRes.headers.get("content-type") || "image/jpeg";

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=2592000, s-maxage=2592000",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cover", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
