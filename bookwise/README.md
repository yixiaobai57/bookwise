# BookWise 📚

> 根据英语词汇量 AI 推荐 80% 词汇覆盖率的英文书籍

BookWise 帮助中国英语学习者找到适合自己词汇水平的全英文书籍。通过自适应词汇测试推算你的词汇量，然后自动筛选出词汇覆盖率 ≥80% 的书籍，让英文阅读不再是痛苦的查词过程。

## ✨ 核心功能

- **🧠 自适应词汇测试** — 基于 COCA 词频表的贝叶斯推算，30 词精准评估词汇量
- **📊 多种输入方式** — 支持在线测试、直接输入、考试成绩映射（四六级/考研/托福/雅思）、导入单词表
- **📈 智能覆盖率计算** — 按词频分布精确计算每本书的词汇覆盖率
- **📚 个性化推荐** — 80 本经典英文书，按覆盖率排序，支持难度/分类筛选
- **🌙 深色模式** — 支持浅色/深色主题切换，自动保存偏好

## 🛠️ 技术栈

- **框架**: Next.js 16 + React 19 + TypeScript
- **样式**: Tailwind CSS v4 + Framer Motion
- **数据**: COCA 词频表 + Open Library 封面
- **部署**: Vercel Serverless

## 🚀 本地运行

```bash
# 1. 克隆仓库
git clone https://github.com/yixiaobai57/bookwise.git
cd bookwise

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

打开 http://localhost:3000 即可预览。

## 📁 项目结构

```
bookwise/
├── app/
│   ├── page.tsx              # 首页
│   ├── test/page.tsx         # 词汇测试页
│   ├── recommend/page.tsx    # 推荐列表页
│   ├── book/[id]/page.tsx    # 书籍详情页
│   └── api/                  # API 路由
├── components/               # UI 组件
├── lib/                      # 核心算法
├── data/                     # 数据文件
│   ├── books.json            # 80 本精选书库
│   ├── coca-frequency.json   # COCA 词频表
│   └── exam-mapping.json     # 考试成绩映射
└── scripts/                  # 工具脚本
```

## 🌐 部署到 Vercel

1. 推送代码到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "New Project" → 导入 GitHub 仓库
4. 点击 "Deploy" 即可

## 📖 书籍来源

- **精选书库**: 80 本经典英文书，涵盖小说、科幻、历史、哲学、科普、传记等分类
- **难度分级**: 四级 / 六级 / 考研 / 托福 / 雅思
- **封面图片**: 来自 [Open Library](https://openlibrary.org)

## 📄 许可证

MIT License
