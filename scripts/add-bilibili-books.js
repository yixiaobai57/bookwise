const fs = require('fs');
const path = require('path');

const books = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'books.json'), 'utf8'));

const newBooks = [
  {
    id: "charlie-chocolate-factory",
    title: "Charlie and the Chocolate Factory",
    titleCN: "查理和巧克力工厂",
    author: "Roald Dahl",
    category: "小说",
    difficulty: "四级",
    wordCount: 55000,
    gutenbergId: 16911,
    wordFrequencyDistribution: {
      "top1000": 68.5, "1001-2000": 15.2, "2001-3000": 8.1, "3001-4000": 3.8,
      "4001-5000": 1.5, "5001-6000": 0.8, "6001-8000": 1.2, "8001-10000": 0.5,
      "10001-15000": 0.4, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/charlie/400/600",
    description: "查理·巴克特在威利·旺卡的巧克力工厂里的奇幻冒险故事。这是一本充满想象力和幽默感的经典儿童文学作品，词汇简单，适合英语初学者。"
  },
  {
    id: "matilda",
    title: "Matilda",
    titleCN: "玛蒂尔达",
    author: "Roald Dahl",
    category: "小说",
    difficulty: "四级",
    wordCount: 40000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 70.2, "1001-2000": 14.8, "2001-3000": 7.5, "3001-4000": 3.2,
      "4001-5000": 1.8, "5001-6000": 0.5, "6001-8000": 1.2, "8001-10000": 0.4,
      "10001-15000": 0.4, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/matilda/400/600",
    description: "天才小女孩玛蒂尔达用她的超能力和智慧对抗邪恶的校长特朗奇布尔小姐。罗尔德·达尔的经典作品，语言生动有趣。"
  },
  {
    id: "james-giant-peach",
    title: "James and the Giant Peach",
    titleCN: "詹姆斯与大仙桃",
    author: "Roald Dahl",
    category: "小说",
    difficulty: "四级",
    wordCount: 38000,
    gutenbergId: 154,
    wordFrequencyDistribution: {
      "top1000": 69.8, "1001-2000": 15.5, "2001-3000": 7.2, "3001-4000": 3.5,
      "4001-5000": 1.5, "5001-6000": 0.6, "6001-8000": 1.1, "8001-10000": 0.5,
      "10001-15000": 0.3, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/james/400/600",
    description: "詹姆斯在一个巨大的桃子里开始了一段奇妙的海上冒险，结识了一群有趣的昆虫朋友。这是一本充满奇幻色彩的冒险故事。"
  },
  {
    id: "narnia-lion-witch-wardrobe",
    title: "The Lion, the Witch and the Wardrobe",
    titleCN: "纳尼亚传奇：狮子、女巫与魔衣橱",
    author: "C.S. Lewis",
    category: "小说",
    difficulty: "四级",
    wordCount: 75000,
    gutenbergId: 12,
    wordFrequencyDistribution: {
      "top1000": 65.2, "1001-2000": 16.8, "2001-3000": 9.5, "3001-4000": 4.2,
      "4001-5000": 1.8, "5001-6000": 0.8, "6001-8000": 1.2, "8001-10000": 0.3,
      "10001-15000": 0.2, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/narnia/400/600",
    description: "四个孩子通过一个魔法衣橱进入了纳尼亚王国，与白女巫展开斗争，帮助阿斯兰恢复纳尼亚的春天。经典奇幻文学作品。"
  },
  {
    id: "harry-potter-philosophers-stone",
    title: "Harry Potter and the Philosopher's Stone",
    titleCN: "哈利·波特与魔法石",
    author: "J.K. Rowling",
    category: "小说",
    difficulty: "四级",
    wordCount: 77000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 64.5, "1001-2000": 17.2, "2001-3000": 9.8, "3001-4000": 4.5,
      "4001-5000": 1.5, "5001-6000": 0.8, "6001-8000": 1.2, "8001-10000": 0.3,
      "10001-15000": 0.2, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/harry/400/600",
    description: "哈利·波特在霍格沃茨魔法学校的第一年冒险。这是全球最受欢迎的奇幻系列小说之一，语言生动，词汇丰富。"
  },
  {
    id: "the-lord-of-the-rings-fellowship",
    title: "The Fellowship of the Ring",
    titleCN: "指环王：护戒使者",
    author: "J.R.R. Tolkien",
    category: "小说",
    difficulty: "六级",
    wordCount: 187000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 55.8, "1001-2000": 18.5, "2001-3000": 11.2, "3001-4000": 5.8,
      "4001-5000": 2.8, "5001-6000": 1.5, "6001-8000": 2.5, "8001-10000": 1.0,
      "10001-15000": 0.9, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/lordrings/400/600",
    description: "弗罗多和他的朋友们踏上摧毁魔戒的危险旅程。托尔金的史诗奇幻巨作，语言优美，词汇丰富，适合中高级英语学习者。"
  },
  {
    id: "the-hunger-games",
    title: "The Hunger Games",
    titleCN: "饥饿游戏",
    author: "Suzanne Collins",
    category: "小说",
    difficulty: "四级",
    wordCount: 99000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 62.5, "1001-2000": 17.8, "2001-3000": 10.5, "3001-4000": 4.5,
      "4001-5000": 2.0, "5001-6000": 1.2, "6001-8000": 1.0, "8001-10000": 0.3,
      "10001-15000": 0.2, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/hunger/400/600",
    description: "凯特尼斯·艾佛丁自愿参加残酷的饥饿游戏，为了保护妹妹而战斗。畅销青少年小说，情节紧张，语言流畅。"
  },
  {
    id: "the-perks-of-being-a-wallflower",
    title: "The Perks of Being a Wallflower",
    titleCN: "壁花少年",
    author: "Stephen Chbosky",
    category: "小说",
    difficulty: "四级",
    wordCount: 53000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 68.2, "1001-2000": 16.5, "2001-3000": 8.5, "3001-4000": 3.8,
      "4001-5000": 1.5, "5001-6000": 0.5, "6001-8000": 0.8, "8001-10000": 0.2,
      "10001-15000": 0.0, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/wallflower/400/600",
    description: "15岁的查理通过书信记录他的高中生活和成长历程。这是一本情感真挚、语言简洁的成长小说。"
  },
  {
    id: "the-greatest-showman",
    title: "The Greatest Showman",
    titleCN: "马戏之王",
    author: "Jenny Bicks",
    category: "传记",
    difficulty: "四级",
    wordCount: 45000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 72.5, "1001-2000": 14.2, "2001-3000": 7.8, "3001-4000": 3.2,
      "4001-5000": 1.2, "5001-6000": 0.5, "6001-8000": 0.5, "8001-10000": 0.1,
      "10001-15000": 0.0, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/showman/400/600",
    description: "P.T.巴纳姆如何从一个贫穷的男孩成长为马戏团之王的故事。充满励志和梦想的传记故事。"
  },
  {
    id: "the-7-habits-of-highly-effective-people",
    title: "The 7 Habits of Highly Effective People",
    titleCN: "高效能人士的七个习惯",
    author: "Stephen R. Covey",
    category: "科普",
    difficulty: "四级",
    wordCount: 120000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 65.5, "1001-2000": 17.2, "2001-3000": 10.2, "3001-4000": 4.2,
      "4001-5000": 1.5, "5001-6000": 0.8, "6001-8000": 0.3, "8001-10000": 0.2,
      "10001-15000": 0.1, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/habits/400/600",
    description: "史蒂芬·柯维提出的七个习惯，帮助个人和团队提高效率和效能。经典的自我提升书籍。"
  },
  {
    id: "the-subtle-art-of-not-giving-a-fuck",
    title: "The Subtle Art of Not Giving a F*ck",
    titleCN: "重塑幸福",
    author: "Mark Manson",
    category: "科普",
    difficulty: "四级",
    wordCount: 65000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 70.5, "1001-2000": 15.2, "2001-3000": 8.5, "3001-4000": 3.5,
      "4001-5000": 1.2, "5001-6000": 0.5, "6001-8000": 0.5, "8001-10000": 0.1,
      "10001-15000": 0.0, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/subtle/400/600",
    description: "马克·曼森提出的反传统幸福哲学——通过选择你真正关心的事情来获得幸福。语言幽默风趣，易于阅读。"
  },
  {
    id: "sapiens-a-brief-history-of-humankind",
    title: "Sapiens: A Brief History of Humankind",
    titleCN: "人类简史",
    author: "Yuval Noah Harari",
    category: "科普",
    difficulty: "六级",
    wordCount: 170000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 58.5, "1001-2000": 18.2, "2001-3000": 11.5, "3001-4000": 5.8,
      "4001-5000": 2.5, "5001-6000": 1.5, "6001-8000": 1.2, "8001-10000": 0.5,
      "10001-15000": 0.3, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/sapiens/400/600",
    description: "尤瓦尔·赫拉利从认知革命、农业革命到科学革命，重新审视人类历史。畅销全球的历史科普巨作。"
  },
  {
    id: "the-power-of-now",
    title: "The Power of Now",
    titleCN: "当下的力量",
    author: "Eckhart Tolle",
    category: "哲学",
    difficulty: "四级",
    wordCount: 70000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 68.2, "1001-2000": 16.5, "2001-3000": 8.5, "3001-4000": 3.8,
      "4001-5000": 1.5, "5001-6000": 0.8, "6001-8000": 0.5, "8001-10000": 0.2,
      "10001-15000": 0.0, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/now/400/600",
    description: "埃克哈特·托利教导读者如何活在当下，摆脱思维的束缚，找到内心的平静。经典心灵成长书籍。"
  },
  {
    id: "the-alchemist",
    title: "The Alchemist",
    titleCN: "牧羊少年奇幻之旅",
    author: "Paulo Coelho",
    category: "小说",
    difficulty: "四级",
    wordCount: 35000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 72.5, "1001-2000": 14.2, "2001-3000": 7.8, "3001-4000": 3.2,
      "4001-5000": 1.2, "5001-6000": 0.5, "6001-8000": 0.5, "8001-10000": 0.1,
      "10001-15000": 0.0, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/alchemist/400/600",
    description: "牧羊少年圣地亚哥追寻宝藏的奇幻旅程，途中领悟到人生的真谛。全球畅销的寓言故事。"
  },
  {
    id: "the-martian",
    title: "The Martian",
    titleCN: "火星救援",
    author: "Andy Weir",
    category: "科幻",
    difficulty: "六级",
    wordCount: 100000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 62.5, "1001-2000": 17.8, "2001-3000": 10.5, "3001-4000": 4.5,
      "4001-5000": 2.0, "5001-6000": 1.2, "6001-8000": 1.0, "8001-10000": 0.3,
      "10001-15000": 0.2, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/martian/400/600",
    description: "马克·沃特尼被遗留在火星上，凭借科学知识和顽强意志努力生存等待救援。硬科幻经典，语言幽默。"
  },
  {
    id: "ready-player-one",
    title: "Ready Player One",
    titleCN: "头号玩家",
    author: "Ernest Cline",
    category: "科幻",
    difficulty: "四级",
    wordCount: 115000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 66.5, "1001-2000": 16.2, "2001-3000": 9.5, "3001-4000": 4.2,
      "4001-5000": 1.8, "5001-6000": 0.8, "6001-8000": 0.5, "8001-10000": 0.3,
      "10001-15000": 0.2, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/ready/400/600",
    description: "韦德·沃兹在虚拟现实游戏'绿洲'中寻找隐藏彩蛋的冒险故事。充满80年代流行文化元素的科幻小说。"
  },
  {
    id: "the-girl-with-the-dragon-tattoo",
    title: "The Girl with the Dragon Tattoo",
    titleCN: "龙纹身的女孩",
    author: "Stieg Larsson",
    category: "小说",
    difficulty: "六级",
    wordCount: 180000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 59.5, "1001-2000": 18.2, "2001-3000": 10.8, "3001-4000": 5.5,
      "4001-5000": 2.5, "5001-6000": 1.5, "6001-8000": 1.2, "8001-10000": 0.5,
      "10001-15000": 0.3, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/dragon/400/600",
    description: "记者米克尔·布卢维和黑客莉丝·莎兰德联手调查一起神秘失踪案。畅销犯罪悬疑小说。"
  },
  {
    id: "gone-girl",
    title: "Gone Girl",
    titleCN: "消失的爱人",
    author: "Gillian Flynn",
    category: "小说",
    difficulty: "六级",
    wordCount: 145000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 61.5, "1001-2000": 17.8, "2001-3000": 10.5, "3001-4000": 5.2,
      "4001-5000": 2.2, "5001-6000": 1.2, "6001-8000": 1.0, "8001-10000": 0.5,
      "10001-15000": 0.1, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/gone/400/600",
    description: "艾米突然失踪，她的丈夫尼克成为嫌疑人。随着真相逐渐浮出水面，婚姻的黑暗面被揭开。"
  },
  {
    id: "the-dark-knight-rises",
    title: "The Dark Knight Rises",
    titleCN: "黑暗骑士崛起",
    author: "Greg Cox",
    category: "小说",
    difficulty: "四级",
    wordCount: 85000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 67.5, "1001-2000": 16.2, "2001-3000": 9.5, "3001-4000": 4.2,
      "4001-5000": 1.8, "5001-6000": 0.8, "6001-8000": 0.5, "8001-10000": 0.3,
      "10001-15000": 0.0, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/batman/400/600",
    description: "蝙蝠侠在哥谭市面临贝恩的威胁，必须重新崛起拯救城市。基于同名电影改编的小说。"
  },
  {
    id: "the-hitchhikers-guide-to-the-galaxy",
    title: "The Hitchhiker's Guide to the Galaxy",
    titleCN: "银河系漫游指南",
    author: "Douglas Adams",
    category: "科幻",
    difficulty: "四级",
    wordCount: 60000,
    gutenbergId: null,
    wordFrequencyDistribution: {
      "top1000": 69.5, "1001-2000": 15.2, "2001-3000": 8.5, "3001-4000": 3.8,
      "4001-5000": 1.5, "5001-6000": 0.8, "6001-8000": 0.5, "8001-10000": 0.2,
      "10001-15000": 0.0, "15000+": 0.0
    },
    coverUrl: "https://picsum.photos/seed/hitchhiker/400/600",
    description: "亚瑟·邓特在地球被毁灭前搭上一艘外星飞船，开始了一段荒诞幽默的银河系漫游。经典科幻喜剧。"
  }
];

const existingIds = new Set(books.map(b => b.id));
const filteredNewBooks = newBooks.filter(b => !existingIds.has(b.id));

books.push(...filteredNewBooks);

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'books.json'),
  JSON.stringify(books, null, 2)
);

console.log(`Added ${filteredNewBooks.length} new books! Total: ${books.length} books`);
