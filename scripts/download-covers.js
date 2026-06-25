const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '..', 'data', 'books.json');
const coversDir = path.join(__dirname, '..', 'public', 'covers');

if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
}

function titleMatch(searchTitle, resultTitle) {
  const normSearch = normalize(searchTitle);
  const normResult = normalize(resultTitle);
  if (normResult.includes(normSearch)) return true;
  const searchWords = normSearch.split(' ').filter(w => w.length > 2);
  const resultWords = normResult.split(' ');
  let matchCount = 0;
  for (const word of searchWords) {
    if (resultWords.includes(word)) matchCount++;
  }
  return matchCount >= searchWords.length * 0.6;
}

function authorMatch(searchAuthor, resultAuthors) {
  if (!resultAuthors || resultAuthors.length === 0) return true;
  const normSearch = normalize(searchAuthor);
  const searchNames = normSearch.split(' ').filter(w => w.length > 2);
  for (const author of resultAuthors) {
    const normAuthor = normalize(author);
    let matchCount = 0;
    for (const name of searchNames) {
      if (normAuthor.includes(name)) matchCount++;
    }
    if (matchCount >= searchNames.length * 0.5) return true;
  }
  return false;
}

async function searchBook(title, author) {
  const queries = [
    `intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`,
    `${encodeURIComponent(title)}+${encodeURIComponent(author)}`,
    `intitle:${encodeURIComponent(title)}`,
  ];

  for (const query of queries) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5&printType=books&langRestrict=en`;

    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      if (!data.items || data.items.length === 0) continue;

      for (const item of data.items) {
        const vol = item.volumeInfo;
        if (!vol.imageLinks) continue;
        if (!titleMatch(title, vol.title)) continue;
        if (!authorMatch(author, vol.authors)) continue;

        const coverUrl = vol.imageLinks.large || vol.imageLinks.medium || vol.imageLinks.thumbnail;
        if (coverUrl) {
          console.log(`    Matched: ${vol.title} by ${vol.authors?.join(', ')}`);
          return coverUrl;
        }
      }
    } catch (e) {
      console.log(`    Search error: ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 200));
  }

  return null;
}

async function downloadImage(url, filepath) {
  try {
    const cleanUrl = url.replace("http://", "https://").replace("&edge=curl", "");
    const res = await fetch(cleanUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });
    if (!res.ok) return false;
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 2000) return false;
    fs.writeFileSync(filepath, buffer);
    return true;
  } catch (e) {
    return false;
  }
}

async function main() {
  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const coverFilename = `${book.id}.jpg`;
    const coverPath = path.join(coversDir, coverFilename);

    if (fs.existsSync(coverPath) && fs.statSync(coverPath).size > 5000) {
      skipCount++;
      book.coverUrl = `/covers/${coverFilename}`;
      continue;
    }

    console.log(`[${i + 1}/${books.length}] ${book.title}`);

    const coverUrl = await searchBook(book.title, book.author);
    if (coverUrl) {
      const success = await downloadImage(coverUrl, coverPath);
      if (success) {
        book.coverUrl = `/covers/${coverFilename}`;
        successCount++;
        console.log(`  ✓ Downloaded`);
      } else {
        failCount++;
        console.log(`  ✗ Download failed`);
      }
    } else {
      failCount++;
      console.log(`  ✗ No matching cover found`);
    }

    await new Promise(r => setTimeout(r, 300));
  }

  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
  console.log(`\n=== Summary ===`);
  console.log(`Success: ${successCount}`);
  console.log(`Skipped: ${skipCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Total: ${books.length}`);
}

main().catch(console.error);
