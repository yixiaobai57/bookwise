# BookWise 项目开发日志

## 项目概述
根据英语词汇量 AI 推荐 80% 词汇覆盖率的英文书籍网站。

**技术栈**: Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion  
**仓库**: https://github.com/yixiaobai57/bookwise  
**本地路径**: `d:/AI/vs/bookwise/`  
**部署**: Vercel Serverless (连接 GitHub 自动部署)

---

## 已完成功能

### 1. 词汇测试系统 (`lib/vocabulary.ts`, `app/test/page.tsx`)
- 自适应贝叶斯推算：BAND_SIZE=2000, 10 个频段, 35 题
- 4 种输入方式：在线测试 / 直接输入 / 考试成绩映射 / 导入单词表
- 全部认识时估算 ~8000 词

### 2. 覆盖率计算引擎 (`lib/coverage.ts`)
- 基于词频分布百分比 (wordFrequencyDistribution)，O(1) 计算
- 频段划分：top1000, 1001-2000, 2001-3000, ... 15000+

### 3. 推荐引擎 (`lib/recommend.ts`)
- 遍历 80 本书库，筛选覆盖率 ≥80%
- 支持按分类(category)、难度(difficulty) 筛选

### 4. API 路由
- `POST /api/test` - 贝叶斯词汇量推算 ⚠️ 工作正常
- `POST /api/recommend` - 推荐列表 ⚠️ 工作正常
- `GET /api/gutenberg` - Gutenberg 文本获取 ⚠️ 工作正常
- `POST /api/analyze` - AI 语义分析 ⚠️ 工作正常

### 5. 数据文件
- `data/books.json` - 80 本英文书，含 title/author/category/difficulty/wordCount/coverUrl/description/wordFrequencyDistribution
- `data/coca-frequency.json` - COCA 词频表 2000 词
- `data/exam-mapping.json` - 考试成绩映射 (四级/六级/考研/托福/雅思，0-满分)

### 6. UI 页面
- `/` - 首页：Hero + 统计区 + 功能卡片 + 使用步骤 + CTA
- `/test` - 4 种词汇测试方式，tab 切换，深色模式适配
- `/recommend` - 推荐列表：FilterBar 筛选 + 卡片网格 + 骨架屏加载
- `/book/[id]` - 书籍详情：封面 + 基本信息 + 覆盖率圆环 + 简介 + 阅读建议

### 7. 组件
- `Navbar.tsx` - 导航栏 + 主题切换
- `ThemeToggle.tsx` - 深色/浅色模式切换（localStorage 持久化）
- `BookCard.tsx` - 书籍卡片（封面 + 覆盖率 + 标签）
- `BookCover.tsx` - CSS 渐变封面组件（按分类配色）
- `CoverageCircle.tsx` - SVG 覆盖率圆形进度条
- `FilterBar.tsx` - 筛选标签栏
- `SkeletonCard.tsx` - 骨架屏加载组件
- `VocabularyTest.tsx` - 自适应测试组件
- `ManualInput.tsx` / `ExamInput.tsx` / `WordlistImport.tsx` - 其他输入方式

### 8. 配色与深色模式
- CSS 变量定义在 `app/globals.css`，`data-theme="dark"` 切换
- 防闪烁脚本在 `app/layout.tsx`
- 按钮：质感黑色渐变 (#1a1a2e → #16213e)，深色模式反色

### 9. 任务完成验证 Hook
- 位置：`~/.claude/settings.json` 的 `hooks.stop`
- 脚本：`~/.claude/hooks/task-verify.sh`
- 检查：是否有待办未完成 / git 未提交变更

---

## ⚠️ 未完成 / 待办

### 问题 1：书籍封面图片 —— 当前状态：CSS 渐变替代，需要真实封面

**用户要求**：每本推荐书籍显示真实书籍封面图片（电子版或纸质版图片）

**已尝试的方案（均失败）**：

1. ❌ Open Library API (`https://covers.openlibrary.org/b/id/{cover_i}-L.jpg`)
   - 图片加载返回 `naturalWidth: 0`，网络超时

2. ❌ Open Library 工作 ID (`https://covers.openlibrary.org/w/OLxxxxW-L.jpg`)
   - 80 本书的 coverUrl 已写入 books.json，但浏览器加载失败（超时/跨域/被墙）

3. ❌ Google Books API (`https://www.googleapis.com/books/v1/volumes?q=...`)
   - 80 次调用全部返回无结果（可能是网络限制或 API 被屏蔽）

4. ❌ 豆瓣搜索 (`https://search.douban.com/book/subject_search?...`)
   - curl 收到 302 重定向，需要登录 cookie
   - browser 直接跳转到 `sec.douban.com` 登录页
   - 豆瓣 API (`https://www.douban.com/j/search?q=...`) 返回 403

5. ❌ Google Images 搜索
   - browser 无法访问 google.com（连接超时）

6. ❌ 豆瓣图片直链 (`https://img1.doubanio.com/view/subject/l/public/{id}.jpg`)
   - 不知道每本书的 doubanio subject ID
   - curl 访问 `https://book.douban.com/subject/1141406/` 返回量很小(1054 字节)，疑似反爬

7. ⚠️ Wikipedia API 脚本 (`scripts/fetch-covers.js`)
   - 已编写好，尚未运行（被用户中断）

**当前 hack 方案**：
- `BookCover.tsx`：按分类生成 CSS 渐变封面（小说=蓝, 科幻=紫, 历史=琥珀...）
- 无外部依赖，美观但非真实封面

**建议的解决方向**：
1. 运行 Wikipedia API 脚本 `node scripts/fetch-covers.js`（已写好，最可能成功）
2. 或用浏览器访问 Wikipedia 逐页面手动保存封面
3. 或找可用的国内镜像源（Google Books 镜像、Open Library 镜像）
4. 或购买小型封面 API 服务

### 问题 2：GitHub README 截图
- 已推送到仓库的 `screenshots/` 目录
- 用户反馈 GitHub 渲染不了，原因不明
- screenshot 路径：`screenshots/homepage.png` 等在 README.md 中

---

## 项目文件结构
```
d:/AI/vs/
├── README.md                    # GitHub 首页 README
├── screenshots/                 # 4 张截图
│   ├── homepage.png
│   ├── test-page.png
│   ├── recommend-page.png
│   └── book-detail.png
├── bookwise/
│   ├── README.md
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── tailwind 配置在 globals.css (v4 用 @theme)
│   ├── app/
│   │   ├── globals.css          # CSS 变量 + Tailwind
│   │   ├── layout.tsx           # 根布局 + 防闪烁脚本
│   │   ├── page.tsx             # 首页
│   │   ├── test/page.tsx        # 词汇测试
│   │   ├── recommend/page.tsx   # 推荐列表
│   │   ├── book/[id]/page.tsx   # 书籍详情
│   │   └── api/                 # 4 个 API route
│   ├── components/              # 12 个组件
│   ├── lib/                     # 核心算法
│   │   ├── types.ts
│   │   ├── vocabulary.ts
│   │   ├── coverage.ts
│   │   ├── recommend.ts
│   │   ├── storage.ts
│   │   ├── gutenberg.ts
│   │   └── ai-analyze.ts
│   ├── data/                    # 数据文件
│   │   ├── books.json           # 80 本书
│   │   ├── coca-frequency.json  # COCA 2000 词
│   │   └── exam-mapping.json    # 考试映射
│   ├── scripts/
│   │   ├── add-covers.js        # 添加封面 URL 到 books.json
│   │   ├── fetch-covers.js      # ⚠️ 从 Wikipedia 下载封面（未运行）
│   │   └── fetch-douban-covers.js  # ❌ 豆瓣方案（失败）
│   └── public/covers/           # ⚠️ 封面图片目录（空，待填充）
├── docs/
│   ├── superpowers/specs/       # 设计文档
│   └── superpowers/plans/       # 实现计划
└── .git/
```

---

## 运行方式
```bash
cd d:/AI/vs/bookwise
npm run dev       # 开发模式 → http://localhost:3000
npm run build     # 构建
```

## Git 状态
- 当前分支：main
- 远程：https://github.com/yixiaobai57/bookwise.git
- 最新 commit：`29eae3d` - "fix: replace broken Open Library covers with CSS-generated book covers"
- 未推送：无（已 push 到 GitHub）
- 未提交：无

## 最后中断位置
用户尝试下载书籍封面，我编写了 Wikipedia API 下载脚本 (`scripts/fetch-covers.js`)，用户中断执行，要求生成日志文件。

---

## 接手建议
1. 先 `cd d:/AI/vs/bookwise && npm run dev` 启动项目看效果
2. 封面问题：运行 `node scripts/fetch-covers.js`（从 Wikipedia 下载），或找其他图片来源
3. 如果 Wikipedia 也不通，考虑用国内可访问的图源（如豆瓣图片镜像站）
4. 封面下载后放到 `public/covers/` 目录，文件名格式 `{book-id}.jpg`
5. 修改 `BookCard.tsx` 和 `app/book/[id]/page.tsx` 使用 `<img src="/covers/{book.id}.jpg">`
