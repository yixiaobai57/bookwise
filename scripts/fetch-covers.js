const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const books = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'books.json'), 'utf8'));
const coversDir = path.join(__dirname, '..', 'public', 'covers');

if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, {
      headers: {
        'User-Agent': 'BookWise/1.0 (personal project)',
        'Accept': 'application/json',
      },
      timeout: 10000,
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`JSON parse error: ${e.message}`));
        }
      });
    }).on('error', reject)
      .on('timeout', function() {
        this.destroy(new Error('Request timeout'));
      });
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, {
      headers: {
        'User-Agent': 'BookWise/1.0 (personal project)',
      },
      timeout: 15000,
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(destPath);
      });
      fileStream.on('error', reject);
    }).on('error', reject)
      .on('timeout', function() {
        this.destroy(new Error('Download timeout'));
      });
  });
}

async function getWikipediaCover(bookTitle, bookAuthor) {
  const searchQueries = [
    encodeURIComponent(bookTitle),
    encodeURIComponent(`${bookTitle} (novel)`),
    encodeURIComponent(`${bookTitle} (book)`),
    encodeURIComponent(`${bookTitle} by ${bookAuthor}`),
  ];

  for (const query of searchQueries) {
    try {
      const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;
      const data = await fetchJson(summaryUrl);
      
      if (data.thumbnail && data.thumbnail.source) {
        const thumbUrl = data.thumbnail.source;
        const largeUrl = thumbUrl.replace(/\/thumb\//, '/').replace(/\/\d+px-[^/]+$/, '');
        return { url: largeUrl, thumbUrl: thumbUrl };
      }
    } catch (e) {
    }
  }
  return null;
}

async function getWikimediaCommonsCover(bookTitle, bookAuthor) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=500&titles=${encodeURIComponent(bookTitle)}&pilimit=1`;
    const data = await fetchJson(searchUrl);
    
    if (data.query && data.query.pages) {
      const pages = data.query.pages;
      for (const pageId in pages) {
        if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
          return { url: pages[pageId].thumbnail.source };
        }
      }
    }
  } catch (e) {
  }
  return null;
}

async function main() {
  console.log(`Fetching covers for ${books.length} books...\n`);
  
  let successCount = 0;
  let failCount = 0;
  const failedBooks = [];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const destPath = path.join(coversDir, `${book.id}.jpg`);
    
    if (fs.existsSync(destPath)) {
      console.log(`[${i + 1}/${books.length}] ${book.id}: already exists, skipping`);
      successCount++;
      continue;
    }

    process.stdout.write(`[${i + 1}/${books.length}] ${book.id}... `);
    
    let coverInfo = null;
    
    try {
      coverInfo = await getWikipediaCover(book.title, book.author);
      
      if (!coverInfo) {
        coverInfo = await getWikimediaCommonsCover(book.title, book.author);
      }
      
      if (coverInfo && coverInfo.url) {
        await downloadImage(coverInfo.url, destPath);
        
        const stats = fs.statSync(destPath);
        if (stats.size < 1000) {
          fs.unlinkSync(destPath);
          throw new Error('Image too small, probably invalid');
        }
        
        book.coverUrl = `/covers/${book.id}.jpg`;
        successCount++;
        console.log(`OK (${(stats.size / 1024).toFixed(1)} KB)`);
      } else {
        failCount++;
        failedBooks.push(book.id);
        console.log('NO COVER FOUND');
      }
    } catch (e) {
      failCount++;
      failedBooks.push(book.id);
      console.log(`FAILED: ${e.message}`);
    }
    
    await new Promise(r => setTimeout(r, 300));
  }

  fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'books.json'),
    JSON.stringify(books, null, 2)
  );

  console.log(`\n========== Summary ==========`);
  console.log(`Total: ${books.length} books`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  if (failedBooks.length > 0) {
    console.log(`Failed books: ${failedBooks.join(', ')}`);
  }
  console.log('==============================');
}

main().catch(console.error);
