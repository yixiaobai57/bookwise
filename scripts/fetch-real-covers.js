const fs = require('fs');
const path = require('path');

const books = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'books.json'), 'utf8'));

async function searchBook(title, author) {
  const query = encodeURIComponent(`${title} ${author}`);
  const url = `https://openlibrary.org/search.json?q=${query}&limit=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.docs && data.docs.length > 0) {
      const doc = data.docs[0];
      if (doc.cover_i) {
        return `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
      }
      if (doc.key) {
        const workId = doc.key.replace('/works/', '');
        return `https://covers.openlibrary.org/w/${workId}-L.jpg`;
      }
    }
  } catch (e) {
    console.log(`  Search failed for ${title}: ${e.message}`);
  }
  return null;
}

async function main() {
  let successCount = 0;

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    console.log(`[${i + 1}/${books.length}] Searching: ${book.title}`);

    const coverUrl = await searchBook(book.title, book.author);
    if (coverUrl) {
      book.coverUrl = coverUrl;
      successCount++;
      console.log(`  ✓ Found: ${coverUrl}`);
    } else {
      console.log(`  ✗ No cover found`);
    }

    await new Promise(r => setTimeout(r, 500));
  }

  fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'books.json'),
    JSON.stringify(books, null, 2)
  );

  console.log(`\nDone! Found covers for ${successCount}/${books.length} books`);
}

main().catch(console.error);
