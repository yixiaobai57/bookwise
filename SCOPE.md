# 项目范围与框架

## 基本信息
- 项目名称：BookWise 前端优化
- 确认日期：2026-07-02
- 用户确认：✓

## 技术栈
- 语言：TypeScript
- 框架：Next.js 16 + React 19
- 样式：Tailwind CSS v4 + Framer Motion（已有）
- 工具：无需引入新依赖，全部使用现有技术栈实现

## 设计参考
- 参考网站：open-design.ai/zh/
- 复刻内容：全面复刻其设计语言（布局结构、视觉效果、交互质感、动画过渡）

## 项目结构
```
bookwise-main/
├── app/
│   ├── page.tsx              # 首页（Hero + 功能介绍）→ 重构
│   ├── globals.css            # 全局样式 → 升级
│   ├── layout.tsx             # 根布局 → 微调
│   ├── test/page.tsx          # 词汇测试页 → 优化
│   ├── recommend/page.tsx     # 推荐列表页 → 优化
│   └── book/[id]/page.tsx     # 书籍详情页 → 优化
├── components/
│   ├── Navbar.tsx             # 导航栏 → 重构（移动端适配、交互升级）
│   ├── BookCard.tsx           # 书籍卡片 → 视觉升级
│   ├── CoverageCircle.tsx    # 覆盖率圆环 → 保持
│   ├── BookCover.tsx          # 书籍封面 → 保持
│   ├── FilterBar.tsx          # 筛选栏 → 视觉升级
│   ├── SkeletonCard.tsx      # 骨架屏 → 视觉升级
│   ├── ThemeToggle.tsx       # 主题切换 → 微调
│   ├── VocabularyTest.tsx    # 词汇测试 → 视觉升级
│   ├── ExamInput.tsx          # 考试输入 → 视觉升级
│   ├── ManualInput.tsx        # 手动输入 → 视觉升级
│   └── WordlistImport.tsx     # 词表导入 → 视觉升级
```

## 功能范围

### IN Scope（包含）
- 首页 Hero 区域重构：更大气的视觉层次、渐变背景增强、浮动装饰元素
- 首页 Bento Grid 功能展示区：替代原有的三列等分卡片
- 首页统计区视觉升级
- 首页"如何使用"步骤区视觉升级
- 首页 CTA 区域视觉升级
- 导航栏：增加移动端汉堡菜单、滚动时视觉变化
- 推荐列表页：卡片网格升级、筛选栏视觉优化
- 书籍详情页：整体布局和视觉优化
- 测试页：Tab 切换视觉升级、各输入组件样式升级
- 全局：毛玻璃效果(backdrop-blur)、精致阴影、渐变强化、hover 微交互
- 深色模式适配：所有新增视觉元素在深色模式下表现一致
- 响应式：所有改动在移动端/平板/桌面端均表现良好
- 滚动动画优化：更自然的进入/退出动画

### OUT of Scope（不包含）
- 后端 API 逻辑修改
- 新增功能/页面
- 数据结构变更
- 第三方依赖新增（不引入新的 npm 包）
- SEO 元数据修改
- 封面图片/书籍数据变更

## 接口定义
- 所有组件 Props 接口保持不变
- 页面间路由跳转逻辑不变
- API 调用方式和数据格式不变

## 开发规范
- 编码规范：遵循现有 TypeScript 严格模式
- 命名约定：沿用现有 camelCase 命名
- 样式规范：Tailwind CSS v4 语法，使用 CSS 变量管理主题色
- 动画规范：全部通过 Framer Motion 实现，保持现有动画模式
- 提交规范：每次修改必须记录到 CHANGE_LOG.md

## 锁定的决策
- 配色方案：保持现有深蓝灰配色（primary-start: #1a1a2e, primary-end: #16213e），不改变基础色值
- 技术栈：不引入新依赖，仅用现有 Tailwind CSS + Framer Motion
- 布局策略：采用 open-design.ai 风格的 Bento Grid / 现代网格布局
- 视觉升级方向：毛玻璃效果、精致阴影系统、渐变强化、hover 微交互、浮动装饰
- 页面数量：4个页面全部优化，不遗漏
- 响应式断点：沿用 Tailwind 默认断点（sm/md/lg/xl）
