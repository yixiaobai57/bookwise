const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '..', 'data', 'books.json');
const coversDir = path.join(__dirname, '..', 'public', 'covers');
const cookiePath = path.join(__dirname, '..', '.douban-cookie');

if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

let doubanCookie = '';
if (fs.existsSync(cookiePath)) {
  doubanCookie = fs.readFileSync(cookiePath, 'utf8').trim();
}

if (!doubanCookie) {
  console.error('请先在 .douban-cookie 文件中填入豆瓣登录后的 Cookie');
  console.error('获取方法：');
  console.error('  1. 在浏览器登录 https://book.douban.com');
  console.error('  2. 按 F12 打开开发者工具');
  console.error('  3. 切换到 Network 标签，刷新页面');
  console.error('  4. 点击任意一个请求，找到 Request Headers 里的 Cookie');
  console.error('  5. 复制全部 Cookie 内容，粘贴到 .douban-cookie 文件中');
  process.exit(1);
}

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]/g, ' ').replace(/\s+/g, ' ').trim();
}

async function searchDouban(title, titleCN, author) {
  const queries = [
    `${title} ${author}`,
    `${titleCN} ${author}`,
    title,
    titleCN,
  ];

  for (const query of queries) {
    if (!query || query.trim().length === 0) continue;

    const url = `https://book.douban.com/j/subject_suggest?q=${encodeURIComponent(query)}`;

    try {
      const res = await fetch(url, {
        headers: {
          'Cookie': doubanCookie,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://book.douban.com/',
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'X-Requested-With': 'XMLHttpRequest',
        }
      });

      if (!res.ok) {
        console.log(`    HTTP ${res.status} for query: ${query}`);
        continue;
      }

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        continue;
      }

      if (!Array.isArray(data) || data.length === 0) continue;

      for (const item of data) {
        const normTitle = normalize(item.title || '');
        const normSearchTitle = normalize(title);
        const normSearchCN = normalize(titleCN || '');

        let match = false;
        if (normTitle.includes(normSearchTitle) || normSearchTitle.includes(normTitle)) match = true;
        if (normSearchCN && (normTitle.includes(normSearchCN) || normSearchCN.includes(normTitle))) match = true;

        if (match && item.pic) {
          console.log(`    Matched: ${item.title}`);
          return item.pic.replace('/s/', '/l/');
        }
      }
    } catch (e) {
      console.log(`    Search error: ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 500));
  }

  return null;
}

async function downloadImage(url, filepath) {
  try {
    const res = await fetch(url, {
      headers: {
        'Cookie': doubanCookie,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://book.douban.com/',
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

    const coverUrl = await searchDouban(book.title, book.titleCN, book.author);
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

    await new Promise(r => setTimeout(r, 800));
  }

  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
  console.log(`\n=== Summary ===`);
  console.log(`Success: ${successCount}`);
  console.log(`Skipped: ${skipCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Total: ${books.length}`);
}

main().catch(console.error);
