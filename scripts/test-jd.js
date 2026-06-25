async function testJD() {
  const res = await fetch('https://search.jd.com/Search?keyword=pride+and+prejudice+book&enc=utf-8&wq=pride+and+prejudice+book', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Length:', text.length);
  
  const imgRegex = /data-lazy-img="(https?:\/\/[^"]+\.jpg[^"]*)"/gi;
  const matches = [...text.matchAll(imgRegex)].map(m => m[1]);
  
  console.log('Images found:', matches.length);
  matches.slice(0, 5).forEach((m, i) => console.log(`  ${i + 1}. ${m}`));
}

testJD().catch(console.error);
