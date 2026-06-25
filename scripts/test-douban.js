const fs = require('fs');
const cookie = fs.readFileSync('./.douban-cookie', 'utf8').trim();

async function test() {
  const url = 'https://book.douban.com/j/subject_suggest?q=pride+and+prejudice';
  const res = await fetch(url, {
    headers: {
      'Cookie': cookie,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://book.douban.com/',
      'Accept': 'application/json',
    }
  });
  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Response:', text);
}

test().catch(console.error);
