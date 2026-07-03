# 项目改动日志

## [2026-07-02] - 刘煌威

### 文件：app/globals.css

#### 修改内容：
全局视觉系统升级，引入毛玻璃效果、Bento Grid、阴影系统等 open-design.ai 风格的视觉基础设施。

#### 修改前：
```diff
-:root 变量仅包含基础色值（background, foreground, card, muted, primary-start/end, coverage-high/mid/low, border, accent）
-仅包含 .text-gradient, .btn-gradient, .hero-bg 三个自定义类
-深色模式 background 为 #0f172a
```

#### 修改后：
```diff
+新增 CSS 变量：--glass-bg, --glass-border, --glass-shadow, --glow-primary
+新增类：.btn-gradient（增强hover光效+active状态）、.btn-ghost（带边框发光的幽灵按钮）
+新增类：.glass-card（毛玻璃卡片，含hover抬升+发光效果）
+新增类：.glass-surface（毛玻璃导航栏）
+新增类：.glass-pill / .glass-pill-active（毛玻璃筛选标签）
+新增类：.mesh-bg（网格背景图案）
+新增类：.bento-grid / .bento-card-lg（Bento Grid 响应式布局）
+新增类：.input-glow（输入框聚焦光效）
+新增类：.section-divider（渐变分隔线）
+新增类：.orb / .orb-primary / .orb-accent（浮动光球）
+新增类：.grain-overlay（微妙颗粒纹理）
+深色模式 background 调整为更深的 #0a0e1a
+btn-gradient 增加 ::before 伪元素叠加层和 translateY hover 效果
```

#### 修改原因：
复刻 open-design.ai 的设计语言，建立一套完整的视觉系统基础设施，供所有页面和组件使用。

---

## [2026-07-02] - 刘煌威

### 文件：components/Navbar.tsx

#### 修改内容：
导航栏重构，增加移动端汉堡菜单和滚动时视觉变化。

#### 修改前：
```diff
-纯文字 Logo "BookWise"
-无移动端菜单
-固定 bg-background/80 backdrop-blur-md 样式
-桌面端链接直接渲染
```

#### 修改后：
```diff
+Logo 增加渐变色方块图标 + 文字
+新增 scrolled 状态检测（滚动>20px切换为 glass-surface 样式）
+新增 mobileOpen 状态管理汉堡菜单
+桌面端链接增加 rounded-xl 背景 hover 效果
+移动端汉堡按钮带动画（三线变叉号）
+移动端菜单使用 AnimatePresence + 毛玻璃卡片展开
+点击遮罩层关闭菜单
+body overflow 锁定防止背景滚动
```

#### 修改原因：
实现 open-design.ai 级别的导航栏体验，特别是移动端适配和滚动时的毛玻璃效果。

---

## [2026-07-02] - 刘煌威

### 文件：app/page.tsx

#### 修改内容：
首页全面重构，引入 Bento Grid 布局、浮动光球、网格背景等现代视觉效果。

#### 修改前：
```diff
-Hero 区域使用 hero-bg 类 + 浮动小装饰圆
-统计区使用 border-y border-border bg-card 简单容器
-功能展示使用 3 列等分 grid 布局
-步骤展示使用垂直排列带边框的行
-CTA 区域和 Footer 使用简单边框分隔
```

#### 修改后：
```diff
+Hero 区域增加 mesh-bg 和 grain-overlay 背景层
+新增 3 个浮动光球（orb-primary, orb-accent, 渐变光球）
+标签 badge 改用 glass-pill 样式 + ping 动画小点
+次级按钮改用 btn-ghost 样式
+统计区改为 glass-card 容器
+功能展示改为 bento-grid 布局（第一张大卡 span 2 列）
+每个功能卡片使用 glass-card + 渐变背景 hover 效果 + hover 发光
+步骤展示改为 2x2 网格 + glass-card 样式
+CTA 区域包裹在 glass-card 中 + 背景网格
+所有 section 分隔改用 section-divider 渐变线
```

#### 修改原因：
全面复刻 open-design.ai 的布局语言，特别是 Bento Grid 和毛玻璃卡片效果。

---

## [2026-07-02] - 刘煌威

### 文件：components/BookCard.tsx

#### 修改内容：
书籍卡片视觉升级，使用毛玻璃效果和更精致的圆角/阴影。

#### 修改前：
```diff
-使用 bg-card rounded-2xl shadow-sm border border-border
-hover 仅 whileHover={{ y: -6 }}
-封面高度 h-48
```

#### 修改后：
```diff
+使用 glass-card rounded-3xl（毛玻璃+抬升hover）
+封面高度增加到 h-52
+新增底部渐变遮罩层
+标签使用 glass-pill 样式
+难度标签圆角改为 rounded-lg
```

#### 修改原因：
提升卡片视觉质感，与全局毛玻璃系统统一。

---

## [2026-07-02] - 刘煌威

### 文件：components/FilterBar.tsx

#### 修改内容：
筛选栏视觉升级，使用毛玻璃容器和玻璃标签。

#### 修改前：
```diff
-使用 div 容器，无背景
-FilterPill 使用 bg-gradient-to-r 或 bg-card border border-border
```

#### 修改后：
```diff
+外层使用 glass-card rounded-2xl 容器
+分类和难度之间使用 section-divider 分隔
+FilterPill 使用 glass-pill / glass-pill-active 样式
+圆角改为 rounded-xl
```

#### 修改原因：
与全局玻璃质感统一，提升筛选交互体验。

---

## [2026-07-02] - 刘煌威

### 文件：components/SkeletonCard.tsx

#### 修改内容：
骨架屏视觉升级。

#### 修改前：
```diff
-使用 bg-card rounded-2xl shadow-sm border border-border
-封面使用纯 bg-border
```

#### 修改后：
```diff
+使用 glass-card rounded-3xl
+封面使用渐变 bg-gradient-to-br from-border to-accent
+内部元素圆角改为 rounded-lg
```

#### 修改原因：
与 BookCard 视觉风格保持一致。

---

## [2026-07-02] - 刘煌威

### 文件：app/recommend/page.tsx

#### 修改内容：
推荐列表页视觉升级。

#### 修改前：
```diff
-空状态/未测试状态使用裸 div 背景
-标题区无视觉层次
-筛选栏和卡片无额外视觉增强
```

#### 修改后：
```diff
+未测试状态使用 glass-card rounded-3xl 容器
+标题增加 text-gradient 高亮
+词汇量数字使用 glass-pill 标签
+所有卡片/筛选栏通过 BookCard/FilterBar 组件升级已获视觉增强
```

#### 修改原因：
统一全站视觉质感。

---

## [2026-07-02] - 刘煌威

### 文件：app/book/[id]/page.tsx

#### 修改内容：
书籍详情页视觉升级。

#### 修改前：
```diff
-封面使用 h-64
-整体使用 bg-card rounded-3xl shadow-sm border border-border
-阅读建议使用 bg-accent 简单背景
-分隔使用 border-t border-border
```

#### 修改后：
```diff
+封面增加到 h-72 + 增加渐变遮罩
+容器使用 glass-card
+标签使用 glass-pill
+覆盖率圆环包裹在 glass-card 中
+分隔使用 section-divider
+阅读建议使用 glass-card + border-l-4 颜色指示器
+返回按钮增加 hover 动画（箭头左移）
```

#### 修改原因：
提升详情页信息层次和视觉精致度。

---

## [2026-07-02] - 刘煌威

### 文件：app/test/page.tsx

#### 修改内容：
测试页 Tab 切换和布局视觉升级。

#### 修改前：
```diff
-Tab 容器使用 bg-accent rounded-2xl p-1.5 border border-border
```

#### 修改后：
```diff
+Tab 容器使用 glass-card rounded-2xl p-1.5
+Tab 标签在移动端隐藏图标（hidden sm:inline）
```

#### 修改原因：
与全局玻璃质感统一。

---

## [2026-07-02] - 刘煌威

### 文件：components/VocabularyTest.tsx

#### 修改内容：
词汇测试组件视觉升级。

#### 修改前：
```diff
-测试完成使用裸 div 布局
-进度计数使用纯文本
-词汇展示使用裸 div
-按钮使用简单的 rounded-2xl bg-green-50 / bg-gray-50
```

#### 修改后：
```diff
+测试完成使用 glass-card rounded-3xl 容器
+置信度使用 glass-pill 标签
+进度计数使用 glass-pill 标签
+词汇展示使用 glass-card rounded-3xl 容器
+按钮增加 hover 阴影和微抬升效果（whileHover scale+y）
```

#### 修改原因：
提升测试交互的视觉反馈丰富度。

---

## [2026-07-02] - 刘煌威

### 文件：components/ManualInput.tsx

#### 修改内容：
手动输入组件视觉升级。

#### 修改前：
```diff
-使用裸 div 布局
-输入框使用 border-2 border-border
-按钮单独放置
```

#### 修改后：
```diff
+使用 glass-card rounded-3xl 容器
+输入框使用 input-glow 样式（聚焦发光）
+按钮全宽 + whileHover/whileTap 动画
```

#### 修改原因：
统一全站组件容器风格和输入交互体验。

---

## [2026-07-02] - 刘煌威

### 文件：components/ExamInput.tsx

#### 修改内容：
考试成绩输入组件视觉升级。

#### 修改前：
```diff
-使用裸 div 布局
-select 和 input 使用 border-2 border-border
```

#### 修改后：
```diff
+使用 glass-card rounded-3xl 容器
+select 和 input 使用 input-glow 样式
+下拉框出现时增加 motion 动画
+按钮全宽 + whileHover/whileTap 动画
```

#### 修改原因：
统一输入组件视觉风格。

---

## [2026-07-02] - 刘煌威

### 文件：components/WordlistImport.tsx

#### 修改内容：
词表导入组件视觉升级。

#### 修改前：
```diff
-使用裸 div 布局
-textarea 使用 border-2 border-border
```

#### 修改后：
```diff
+使用 glass-card rounded-3xl 容器
+textarea 使用 input-glow 样式
+文件上传按钮圆角改为 rounded-xl
+按钮全宽 + whileHover/whileTap 动画
```

#### 修改原因：
统一输入组件视觉风格。
