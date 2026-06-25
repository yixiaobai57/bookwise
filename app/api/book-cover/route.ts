import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title");
  const author = searchParams.get("author");

  if (!title) {
    return NextResponse.json({ error: "Missing title" }, { status: 400 });
  }

  const searchQuery = author ? `intitle:${title}+inauthor:${author}` : `intitle:${title}`;

  try {
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=1&printType=books`;

    const res = await fetch(googleBooksUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      next: { revalidate: 86400 * 30 },
    });

    if (!res.ok) {
      throw new Error(`Google Books API failed: ${res.status}`);
    }

    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: "No book found" }, { status: 404 });
    }

    const book = data.items[0];
    const imageLinks = book.volumeInfo?.imageLinks;

    if (!imageLinks) {
      return NextResponse.json({ error: "No cover found" }, { status: 404 });
    }

    let coverUrl = imageLinks.large || imageLinks.medium || imageLinks.thumbnail;

    if (!coverUrl) {
      return NextResponse.json({ error: "No cover found" }, { status: 404 });
    }

    coverUrl = coverUrl.replace("http://", "https://").replace("&edge=curl", "");

    const imageRes = await fetch(coverUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      next: { revalidate: 86400 * 30 },
    });

    if (!imageRes.ok) {
      throw new Error(`Image fetch failed: ${imageRes.status}`);
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
