const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '..', 'data', 'books.json');
const coversDir = path.join(__dirname, '..', 'public', 'covers');

if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

async function searchBook(title, author) {
  const searchQuery = author ? `intitle:${title}+inauthor:${author}` : `intitle:${title}`;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=1&printType=books`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      const imageLinks = data.items[0].volumeInfo?.imageLinks;
      if (imageLinks) {
        return imageLinks.large || imageLinks.medium || imageLinks.thumbnail;
      }
    }
  } catch (e) {
    console.log(`  Search error: ${e.message}`);
  }
  return null;
}

async function downloadImage(url, filepath) {
  try {
    const res = await fetch(url.replace("http://", "https://").replace("&edge=curl", ""));
    if (!res.ok) return false;
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filepath, buffer);
    return true;
  } catch (e) {
    console.log(`  Download error: ${e.message}`);
    return false;
  }
}

async function main() {
  let successCount = 0;
  let skipCount = 0;

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const coverFilename = `${book.id}.jpg`;
    const coverPath = path.join(coversDir, coverFilename);

    if (fs.existsSync(coverPath)) {
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
        console.log(`  ✗ Download failed`);
      }
    } else {
      console.log(`  ✗ No cover found`);
    }

    await new Promise(r => setTimeout(r, 300));
  }

  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
  console.log(`\nDone! Downloaded: ${successCount}, Skipped: ${skipCount}, Total: ${books.length}`);
}

main().catch(console.error);
