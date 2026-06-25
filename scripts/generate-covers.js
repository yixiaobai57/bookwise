const fs = require('fs');
const path = require('path');

const books = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'books.json'), 'utf8'));

books.forEach((book, index) => {
  const seed = index + 1;
  book.coverUrl = `https://picsum.photos/seed/${seed}/400/600`;
});

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'books.json'),
  JSON.stringify(books, null, 2)
);

console.log(`Updated covers for ${books.length} books!`);
i