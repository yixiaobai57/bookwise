async function testDangdang() {
  const res = await fetch('http://search.dangdang.com/?key=pride+and+prejudice&act=input', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Length:', text.length);
  console.log('\n--- First 2000 chars ---');
  console.log(text.substring(0, 2000));
}

testDangdang().catch(console.error);
