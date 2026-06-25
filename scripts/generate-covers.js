const fs = require('fs');
const path = require('path');

const books = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'books.json'), 'utf8'));

const categoryPrompts = {
  小说: "book cover art, classic novel, hardcover book, literary style, elegant design, high quality",
  科幻: "book cover art, science fiction, futuristic design, space, technology, neon lights, cinematic",
  历史: "book cover art, historical novel, ancient civilizations, classic design, parchment style, vintage",
  哲学: "book cover art, philosophy book, abstract design, minimalist, intellectual, elegant",
  传记: "book cover art, biography, portrait style, inspiring, human story, elegant design",
  科普: "book cover art, science book, educational, modern design, diagrams, clean layout",
  教材: "book cover art, textbook, academic, clean design, professional, educational",
};

books.forEach((book) => {
  const prompt = encodeURIComponent(`${book.title} by ${book.author}, ${categoryPrompts[book.category] || categoryPrompts['小说']}, book cover, professional design, high resolution`);
  book.coverUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${prompt}&image_size=portrait_4_3`;
});

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'books.json'),
  JSON.stringify(books, null, 2)
);

console.log(`Updated covers for ${books.length} books!`);
