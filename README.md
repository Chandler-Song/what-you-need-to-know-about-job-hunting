# 求职指南图书站点 — 配置说明

> 基于 VitePress + Tailwind CSS 构建的在线图书阅读站点。

---

## 目录

- [1. 项目结构配置](#1-项目结构配置)
- [2. 构建工具配置](#2-构建工具配置)
- [3. 站点配置](#3-站点配置)
- [4. 主题配置](#4-主题配置)
- [5. 内容配置](#5-内容配置)
- [6. 组件配置](#6-组件配置)

---

## 1. 项目结构配置

### 目录总览

```
项目根目录/
├── package.json                  # npm 项目配置与依赖声明
├── README.md                     # 本文档
├── book/                         # 原始图书 Markdown 源文件（开发参考）
│   ├── 【图书】《关于求职，你要知道的那些事》.md   # 图书目录总览
│   ── X.Y 小节标题.md            # 各节原始内容
├── docs/                         # VitePress 内容根目录
│   ├── index.md                  # 首页（layout: home + <HomePage />）
│   ├── about.md                  # 关于本书
│   ├── resources.md              # 资源推荐
│   ├── intro/                    # 总序页
│   │   ── index.md
│   ├── appendix/                 # 附录页
│   │   └── index.md
│   ├── chapter-01/               # 第1章目录（每章一个子目录）
│   │   ├── index.md              # 章节索引页（含小节链接导航）
│   │   ├── 01.md                 # 第1节内容
│   │   ├── 02.md                 # 第2节内容
│   │   └── ...
│   ├── chapter-02/ ~ chapter-16/ # 第2~16章（结构同上）
│   ├── public/                   # 静态资源（构建时直接复制到 dist/）
│   │   ├── logo.svg              # 站点 Logo（导航栏 + favicon）
│   │   ├── book-cover.png        # 图书封面 PNG（首页 Hero 区域）
│   │   └── book-cover.svg        # 图书封面 SVG（备用）
│   └── .vitepress/               # VitePress 配置目录
│       ├── config.mts            # 站点主配置文件
│       ├── custom.css            # 全局自定义样式（Tailwind + VitePress 覆盖）
│       ├── postcss.config.js     # PostCSS 插件配置
│       ├── tailwind.config.js    # Tailwind CSS 配置
│       └── theme/                # 自定义主题目录
│           ├── index.ts          # 主题入口（注册组件、扩展默认主题）
│           ├── Layout.vue        # 自定义布局（集成进度条 + 回到顶部）
│           ├── HomePage.vue      # 首页组件（Hero + 目录 + CTA）
│           └── ReadingProgress.vue  # 阅读进度条组件
```

### 各目录/文件职责

| 路径 | 作用 | 注意事项 |
|------|------|----------|
| `docs/` | VitePress 的内容根目录，所有 `.md` 文件放在此处 | 目录名即为路由路径（如 `chapter-01/` → `/chapter-01/`） |
| `docs/public/` | 静态资源目录，构建时原样复制到 `dist/` | 文件通过根路径引用（如 `/logo.svg`），不要加 `public/` 前缀 |
| `docs/.vitepress/` | VitePress 配置与主题目录 | 此目录不会被当作内容渲染 |
| `docs/.vitepress/theme/` | 自定义主题组件目录 | 通过 `theme/index.ts` 统一注册 |
| `docs/.vitepress/dist/` | 构建产物输出目录（自动生成） | 不要手动编辑，可部署到任意静态托管平台 |
| `book/` | 原始图书 Markdown 源文件 | 开发参考用，不参与构建 |

### 章节目录结构

每章使用独立子目录，包含一个索引页和若干节文件：

```
chapter-XX/
├── index.md    # 章节索引页，含该章所有小节的链接导航
├── 01.md       # 第1节（真实内容或占位）
├── 02.md       # 第2节
└── ...
```

- 路由规则：`chapter-01/index.md` → `/chapter-01/`，`chapter-01/01.md` → `/chapter-01/01`
- 当前第1~2章各节为真实内容（从 `book/` 复制），第3~16章为占位内容

---

## 2. 构建工具配置

### 2.1 package.json

```json
{
  "name": "20260609",
  "version": "1.0.0",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "autoprefixer": "^10.5.0",
    "postcss": "^8.5.15",
    "tailwindcss": "^3.4.19",
    "vitepress": "^1.6.4"
  }
}
```

**脚本说明：**

| 命令 | 功能 |
|------|------|
| `npm run docs:dev` | 启动本地开发服务器，支持热更新 |
| `npm run docs:build` | 构建生产版本，输出到 `docs/.vitepress/dist/` |
| `npm run docs:preview` | 本地预览构建产物 |

**依赖说明：**

| 依赖 | 版本 | 用途 |
|------|------|------|
| `vitepress` | ^1.6.4 | 核心静态站点生成器 |
| `tailwindcss` | ^3.4.19 | 原子化 CSS 框架（使用 v3 版本） |
| `postcss` | ^8.5.15 | CSS 后处理器，Tailwind 的运行依赖 |
| `autoprefixer` | ^10.5.0 | 自动添加浏览器厂商前缀 |

**安装命令：**

```bash
npm install vitepress tailwindcss@3 postcss autoprefixer --save-dev
```

> **注意**：Tailwind CSS 使用 v3 版本。v4 的配置方式有重大变化，不兼容当前配置。

### 2.2 PostCSS 配置

文件：`docs/.vitepress/postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

| 参数 | 说明 |
|------|------|
| `tailwindcss: {}` | 启用 Tailwind CSS 插件，空对象表示使用默认配置（自动查找 `tailwind.config.js`） |
| `autoprefixer: {}` | 启用 autoprefixer 插件，空对象表示使用默认浏览器列表 |

> **注意**：此文件必须放在 `.vitepress/` 目录下，因为 VitePress 使用此目录作为 PostCSS 配置的查找根路径。

### 2.3 Tailwind CSS 配置

文件：`docs/.vitepress/tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './**/*.vue',
    './**/*.md',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { /* paper / brand 色阶 */ },
      fontFamily: { /* serif / sans */ },
      maxWidth: { /* reading / home */ },
    },
  },
  plugins: [],
}
```

**配置项详解：**

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `content` | `['./**/*.vue', './**/*.md']` | Tailwind 扫描的文件范围，用于 Tree-shaking 未使用的样式。路径相对于 `.vitepress/` 目录 |
| `darkMode` | `'class'` | 暗色模式策略。`'class'` 表示通过 HTML 元素的 `.dark` 类切换（VitePress 默认使用此方式） |

**自定义色彩体系：**

```js
colors: {
  paper: {                    // 冷灰白色阶，用于背景和文字
    50:  '#f8f9fa',           // 最浅 — 页面背景
    100: '#f0f2f5',
    200: '#e4e7ec',
    300: '#d0d5dd',
    400: '#98a2b3',
    500: '#667085',           // 中间 — 次要文字
    600: '#475467',
    700: '#344054',
    800: '#1d2939',
    900: '#1a1e2e',           // 最深 — 暗色模式背景
  },
  brand: {                    // 深靛蓝色阶，用于品牌色和交互元素
    50:  '#eef2f7',           // 最浅 — 品牌色浅底
    100: '#dce4ef',
    200: '#b9c9df',
    300: '#7b9ec7',           // 暗色模式品牌主色
    400: '#4a7ab0',
    500: '#2d5f94',
    600: '#1a365d',           // 亮色模式品牌主色
    700: '#152c4d',
    800: '#0f2341',
    900: '#061222',           // 最深
  },
}
```

**自定义字体族：**

```js
fontFamily: {
  serif: ['"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
  sans:  ['"Noto Sans SC"', '"Source Han Sans SC"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
}
```

| 字体别名 | 用途 | 在 Tailwind 中使用 |
|----------|------|-------------------|
| `font-serif` | 衬线字体，用于标题、引用块、书籍质感元素 | `class="font-serif"` |
| `font-sans` | 无衬线字体，用于正文和 UI 元素 | `class="font-sans"` |

**自定义最大宽度：**

```js
maxWidth: {
  'reading': '80ch',    // 章节内容区最大宽度（最佳阅读行宽）
  'home':    '1152px',  // 首页最大宽度
}
```

---

## 3. 站点配置

文件：`docs/.vitepress/config.mts`

### 3.1 基础配置

```ts
export default defineConfig({
  lang: 'zh-CN',
  title: '关于求职，你要知道的那些事',
  description: '一个猎头老炮儿的10年血泪真经',
  // ...
})
```

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `lang` | `string` | 站点语言代码，影响 HTML `lang` 属性和搜索分词策略 |
| `title` | `string` | 站点标题，显示在导航栏和浏览器标签页 |
| `description` | `string` | 站点描述，生成 HTML `<meta name="description">` 标签 |

### 3.2 Vite 构建优化配置

```ts
vite: {
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('minisearch') || id.includes('mark.js')) {
            return 'search-vendor'
          }
          if (id.includes('markdown-it') || id.includes('shiki')) {
            return 'markdown-vendor'
          }
        },
      },
    },
  },
},
```

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `chunkSizeWarningLimit` | `2000` | 将警告阈值从默认 500kB 提升至 2000kB。图书站点含 16 章内容 + 本地搜索索引，主包体积较大属正常现象 |
| `manualChunks` | 函数式 | 按模块 ID 智能分组。搜索库（minisearch/mark.js）和 Markdown 渲染库（markdown-it/shiki）单独分包 |

> **注意**：`vue` 和 `vitepress` 被 VitePress 标记为外部模块，不能在 `manualChunks` 中配置，否则会构建报错。

### 3.3 head 配置

```ts
head: [
  ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ['meta', { name: 'theme-color', content: '#f8f9fa' }],
  ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
  ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
  ['link', { href: 'https://fonts.googleapis.com/css2?family=...', rel: 'stylesheet' }],
],
```

| 条目 | 作用 | 参数说明 |
|------|------|----------|
| `link[icon]` | 设置站点 favicon | `href` 指向 `public/` 下的文件，使用根路径 `/` |
| `meta[theme-color]` | 移动端浏览器主题色 | `content` 为十六进制颜色值 |
| `link[preconnect]` | 预连接字体 CDN | 减少字体加载延迟，`crossorigin: ''` 表示空属性值 |
| `link[stylesheet]` | 加载 Google Fonts | 引入 Noto Sans SC + Noto Serif SC |

### 3.4 导航栏配置

```ts
themeConfig: {
  logo: '/logo.svg',
  siteTitle: '求职指南',
  nav: [
    { text: '首页', link: '/' },
    { text: '总序', link: '/intro/' },
    { text: '章节阅读', link: '/chapter-01/' },
    { text: '关于本书', link: '/about' },
    { text: '资源推荐', link: '/resources' },
  ],
  // ...
}
```

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `logo` | `string` | 导航栏左侧 Logo 图片路径，引用 `public/` 下的文件 |
| `siteTitle` | `string` | 导航栏站点标题文字，显示在 Logo 右侧 |
| `nav` | `Array` | 导航链接列表（共 5 项） |

**nav 数组项格式：**

```ts
{ text: '显示文字', link: '/目标路径' }
```

- `link` 不需要 `.html` 后缀，VitePress 自动处理
- 当前页面对应的导航项会自动高亮

### 3.5 侧边栏配置

侧边栏采用**路径前缀匹配 + 全目录统一映射**策略：

```ts
sidebar: sidebarConfig(),
```

`sidebarConfig()` 函数定义一次完整的 5 部分 × 16 章侧边栏，然后映射到所有章节路径：

```ts
function sidebarConfig() {
  const fullSidebar = [
    { text: '总序', items: [...] },
    { text: '第一部分：祛魅——把求职这件事看清楚', collapsed: true, items: [...] },
    { text: '第二部分：备战——上场之前先做人前的功课', collapsed: true, items: [...] },
    { text: '第三部分：出牌——面试是一场有剧本的即兴表演', collapsed: true, items: [...] },
    { text: '第四部分：谈判——Offer只是起点，薪资才是终局', collapsed: true, items: [...] },
    { text: '第五部分：进化——求职只是起点，职业才是终身命题', collapsed: true, items: [...] },
    { text: '附录', items: [...] },
  ]

  const paths = [
    '/intro/',
    '/chapter-01/', '/chapter-02/', '/chapter-03/',
    '/chapter-04/', '/chapter-05/', '/chapter-06/',
    '/chapter-07/', '/chapter-08/', '/chapter-09/',
    '/chapter-10/', '/chapter-11/',
    '/chapter-12/', '/chapter-13/',
    '/chapter-14/', '/chapter-15/', '/chapter-16/',
    '/appendix/',
  ]
  return Object.fromEntries(paths.map(p => [p, fullSidebar]))
}
```

**配置说明：**

| 配置项 | 说明 |
|--------|------|
| 路径映射 | 通过 `Object.fromEntries` 将完整侧边栏映射到 18 个路径 |
| `collapsed: true` | 每个部分默认折叠，VitePress 自动展开当前页面所在分组 |
| `/about`、`/resources` | 不在映射中，因此这些页面无侧边栏 |

**辅助函数 `ch()`：**

```ts
function ch(label, title, link, sections) {
  return {
    text: `${label} ${title}`,
    link,
    collapsed: true,
    items: sections.map(([t, l]) => ({ text: t, link: l })),
  }
}
```

用于快速生成章节分组，参数：章节编号标签、章节标题、索引页链接、小节数组。

**侧边栏项参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| `text` | `string` | 分组标题或导航项文字 |
| `link` | `string` | 导航链接，指向章节索引页或节文件 |
| `items` | `Array` | 分组下的导航项列表 |
| `collapsed` | `boolean` | 是否默认折叠 |

> **关键**：每章的节文件链接格式为 `/chapter-XX/NN`（如 `/chapter-01/01`），指向 `chapter-XX/NN.md` 文件。

### 3.6 页面大纲配置

```ts
outline: {
  level: [2, 3],
  label: '本节目录',
},
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `level` | `[number, number]` | 显示在右侧大纲中的标题级别。`[2, 3]` 表示只显示 h2 和 h3 |
| `label` | `string` | 大纲区域标题文字 |

### 3.7 社交链接配置

```ts
socialLinks: [
  { icon: 'github', link: 'https://github.com' },
],
```

| 参数 | 说明 |
|------|------|
| `icon` | 图标名称，支持 `github`、`twitter`、`discord`、`facebook` 等 |
| `link` | 点击跳转的 URL |

> 显示在导航栏右侧。

### 3.8 搜索配置

```ts
search: {
  provider: 'local',
  options: {
    translations: {
      button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
      modal: {
        noResultsText: '无法找到相关结果',
        resetButtonTitle: '清除查询条件',
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
        },
      },
    },
  },
},
```

| 配置项 | 说明 |
|--------|------|
| `provider` | 搜索提供者。`'local'` 为 VitePress 内置本地搜索（无需外部服务） |
| `options.translations` | 搜索界面中文化配置 |
| `button.buttonText` | 导航栏搜索按钮文字 |
| `modal.noResultsText` | 无搜索结果时的提示文字 |
| `modal.resetButtonTitle` | 清除查询按钮文字 |
| `modal.footer.*` | 搜索弹窗底部键盘操作提示文字 |

### 3.9 文档页脚配置

```ts
docFooter: {
  prev: '上一节',
  next: '下一节',
},
```

| 参数 | 说明 |
|------|------|
| `prev` | 上一页按钮文字 |
| `next` | 下一页按钮文字 |

> 显示在章节内容页底部，自动链接到上/下一节。

### 3.10 最后更新配置

```ts
lastUpdated: {
  text: '最后更新于',
},
```

| 参数 | 说明 |
|------|------|
| `text` | 最后更新时间的前缀文字 |

---

## 4. 主题配置

### 4.1 主题入口

文件：`docs/.vitepress/theme/index.ts`

```ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import HomePage from './HomePage.vue'
import Layout from './Layout.vue'
import '../custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
  },
} satisfies Theme
```

**配置说明：**

| 配置项 | 说明 |
|--------|------|
| `extends: DefaultTheme` | 继承 VitePress 默认主题（保留导航栏、侧边栏、搜索等基础功能） |
| `Layout` | 替换默认布局为自定义 `Layout.vue`（在默认布局基础上增加进度条和回到顶部） |
| `enhanceApp` | Vue 应用增强钩子，用于注册全局组件 |
| `app.component('HomePage', HomePage)` | 将 `HomePage` 注册为全局组件，可在 Markdown 中直接使用 `<HomePage />` |
| `import '../custom.css'` | 引入全局自定义样式。路径从 `theme/` 指向 `.vitepress/custom.css` |

> **注意**：`import` 路径容易出错。`index.ts` 位于 `theme/` 目录，引用 `.vitepress/` 下的文件需使用 `../` 前缀。

### 4.2 全局样式

文件：`docs/.vitepress/custom.css`

采用 Tailwind 三层架构组织：

#### @layer base — CSS 变量 + 全局重置

```css
@layer base {
  :root {
    --vp-c-brand-1: #1a365d;     /* 品牌主色（亮色） */
    --vp-c-bg: #f8f9fa;           /* 页面背景色（亮色） */
    --vp-c-text-1: #1a1a2e;       /* 主文字色（亮色） */
    --color-progress: #1a365d;    /* 进度条颜色（亮色） */
    --color-brand-primary: #1a365d;
    /* ... 更多变量 */
  }
  .dark {
    --vp-c-brand-1: #7b9ec7;     /* 品牌主色（暗色） */
    --vp-c-bg: #12141a;           /* 页面背景色（暗色） */
    --vp-c-text-1: #e0e2e8;       /* 主文字色（暗色） */
    --color-progress: #7b9ec7;    /* 进度条颜色（暗色） */
    /* ... 更多变量 */
  }
}
```

**核心 CSS 变量对照表（亮色/暗色）：**

| 变量名 | 亮色值 | 暗色值 | 用途 |
|--------|--------|--------|------|
| `--vp-c-brand-1` | `#1a365d` | `#7b9ec7` | VitePress 品牌主色 |
| `--vp-c-bg` | `#f8f9fa` | `#12141a` | 页面背景 |
| `--vp-c-bg-soft` | `#f0f2f5` | `#1a1e2e` | 卡片/区块背景 |
| `--vp-c-text-1` | `#1a1a2e` | `#e0e2e8` | 主文字 |
| `--vp-c-text-2` | `#475467` | `#a0b4cc` | 次要文字 |
| `--vp-c-border` | `#d0d5dd` | `#2d3548` | 边框色 |
| `--color-progress` | `#1a365d` | `#7b9ec7` | 阅读进度条颜色 |
| `--color-brand-primary` | `#1a365d` | `#7b9ec7` | 组件品牌色 |
| `--color-blockquote-bg` | `rgba(26,54,93,0.05)` | `rgba(123,158,199,0.08)` | 引用块背景 |
| `--color-blockquote-border` | `#1a365d` | `#7b9ec7` | 引用块左边框 |

> **修改色彩体系**：需同时修改 `:root` 和 `.dark` 两套变量值，确保双主题一致。

#### @layer components — 组件样式

通过 Tailwind `@apply` 指令定义组件类：

| 类名 | 用途 |
|------|------|
| `.reading-progress` | 阅读进度条（fixed 定位，3px 高） |
| `.back-to-top` | 回到顶部按钮（圆形，响应式尺寸） |
| `.chapter-card` | 章节卡片（圆角、边框、hover 上浮） |
| `.endorsement-card` | 推荐卡片 |
| `.btn-primary` | 主按钮（品牌色背景） |
| `.btn-outline` | 描边按钮（品牌色边框） |

#### VitePress 样式覆盖

```css
/* 导航栏毛玻璃 */
.VPNav { backdrop-filter: blur(12px) !important; }

/* 首页隐藏侧边栏和大纲 */
.VPDoc:has(.VPHome) .VPDocAside,
.VPDoc:has(.VPHome) .aside,
.VPDoc:has(.VPHome) .VPDocAsideOutline,
.VPDoc:has(.VPHome) .VPLocalNav {
  display: none !important;
}
.VPDoc:has(.VPHome) .content-container { max-width: 1152px !important; }
.VPDoc:has(.VPHome) .content { max-width: 100% !important; }
.VPDoc:has(.VPHome) .main { max-width: 1152px !important; }

/* 章节内容区最大宽度 */
.vp-doc { max-width: 80ch; }

/* 引用块：左侧品牌色边框 + 浅底 + 圆角 + 衬线字体 */
.vp-doc blockquote { border-left: 3px solid var(--color-blockquote-border); }

/* 表格：衬线加粗表头 + 品牌色底边框 + 行悬停高亮 */
.vp-doc table th { border-bottom: 2px solid var(--color-brand-primary); }

/* 分隔线：渐变淡入淡出 */
.vp-doc hr { background: linear-gradient(to right, transparent, mid-color, transparent); }

/* 响应式字号 */
@media (max-width: 960px) { .vp-doc h1 { font-size: 1.6rem; } }
@media (max-width: 640px) { .vp-doc { font-size: 0.94rem; } }
```

### 4.3 色彩体系速查

在 Tailwind 类中使用自定义色彩：

```html
<!-- paper 色阶 -->
<div class="bg-paper-50">页面背景</div>
<div class="text-paper-600">次要文字</div>

<!-- brand 色阶 -->
<div class="bg-brand-600">品牌主色背景（亮色模式）</div>
<div class="text-brand-300">品牌色文字（暗色模式）</div>
<div class="border-brand-200">品牌色边框</div>
```

---

## 5. 内容配置

### 5.1 首页 index.md

```md
---
layout: home
---

<HomePage />
```

**配置说明：**

| 配置项 | 说明 |
|--------|------|
| `layout: home` | 使用 VitePress 的 `home` 布局，配合 CSS 选择器 `.VPDoc:has(.VPHome)` 隐藏侧边栏和大纲，实现全宽展示 |
| `<HomePage />` | 渲染自定义首页组件。因为已在 `theme/index.ts` 中注册为全局组件，可直接使用 |

> **注意**：首页内容完全由 `HomePage.vue` 组件控制。如需修改首页展示内容，编辑 `HomePage.vue` 中的 `parts` 数据。

### 5.2 章节文件结构

**目录命名规则：**

| 目录名 | 路由 | 说明 |
|--------|------|------|
| `chapter-01/` | `/chapter-01/` | 第1章：你以为你在找工作，其实你在做什么？ |
| `chapter-02/` | `/chapter-02/` | 第2章：市场不骗人，只是你没看懂它 |
| `chapter-03/` | `/chapter-03/` | 第3章：人性的暗面在招聘里 |
| ... | ... | ... |
| `chapter-16/` | `/chapter-16/` | 第16章：写给特殊处境的人 |
| `intro/` | `/intro/` | 总序 |
| `appendix/` | `/appendix/` | 附录 |

**章节索引页模板（`chapter-XX/index.md`）：**

```md
# 第X章 章节标题

- [X.1 第一节完整标题](/chapter-XX/01)
- [X.2 第二节完整标题](/chapter-XX/02)
- [X.3 第三节完整标题](/chapter-XX/03)
```

**节文件模板（`chapter-XX/NN.md`）：**

```md
# X.N 节标题

正文内容...

---

## X.N.1 子标题（可选）

更多内容...

::: tip 小贴士
提示内容（蓝色边框提示框）
:::

::: warning 注意
警告内容（黄色边框警告框）
:::

> 引用块内容（左侧品牌色边框 + 浅底）

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据 | 数据 | 数据 |
```

**支持的 Markdown 语法：**

| 语法 | 渲染效果 | 样式特点 |
|------|----------|----------|
| `# h1` ~ `### h3` | 标题 | h1/h2/h3 有响应式字号调整 |
| `::: tip` | 提示框 | 蓝色边框，圆角 8px |
| `::: warning` | 警告框 | 黄色边框，圆角 8px |
| `::: danger` | 危险框 | 红色边框，圆角 8px |
| `> 引用` | 引用块 | 左侧 3px 品牌色边框 + 浅底 + 衬线字体 |
| `\| 表格 \|` | 表格 | 衬线加粗表头 + 品牌色底边框 + 行悬停高亮 |
| `` ```code``` `` | 代码块 | 圆角 8px + 上下间距 1.5em |
| `---` | 分隔线 | 渐变淡入淡出效果 |

### 5.3 关于页 about.md

- 使用默认 `doc` 布局
- 因不匹配侧边栏路径映射，实际无侧边栏内容
- 内容结构自由，包含：写作初衷、作者介绍、本书特色、内容概览、联系方式

### 5.4 资源页 resources.md

- 同样使用默认 `doc` 布局，无侧边栏
- 包含五大类资源推荐和推荐阅读表格

### 5.5 添加新章节

如需添加新内容，需同步修改以下文件：

1. 创建 `docs/chapter-XX/index.md`（章节索引页）和 `docs/chapter-XX/NN.md`（节文件）
2. 在 `config.mts` 的 `sidebarConfig()` 中：
   - 将新章节添加到 `fullSidebar` 对应部分的 `items` 数组
   - 将新路径 `'/chapter-XX/'` 添加到 `paths` 数组
3. 在 `HomePage.vue` 的 `parts` 数据中添加新章节卡片

---

## 6. 组件配置

### 6.1 HomePage.vue

文件：`docs/.vitepress/theme/HomePage.vue`

首页组件包含三个区域：Hero、目录导航、CTA。

#### 数据配置

**parts 数组** — 按部分组织的目录数据（5 大部分 × 16 章）：

```ts
const parts = [
  {
    name: '祛魅——把求职这件事看清楚',   // 部分名称
    chapters: [                            // 该部分下的章节列表
      {
        chapterId: 'chapter-01',           // 章节唯一 ID
        label: '第1章',                    // 章节标签
        icon: '',                        // 章节图标（emoji）
        title: '你以为你在找工作，其实你在做什么？',  // 卡片标题
        link: '/chapter-01/',              // 章节索引页链接
        sections: [                        // 小节链接列表
          { sectionId: '1.1', title: '1.1 求职的本质：信息不对称的双向筛选', link: '/chapter-01/01' },
          // ... 更多小节
        ],
      },
      // ... 更多章节
    ],
  },
  // ... 共 5 个部分
]
```

**字段说明：**

| 字段 | 类型 | 必填 | 约束 |
|------|------|------|------|
| `parts[].name` | `string` | 是 | 部分标题，显示在目录区域 |
| `parts[].chapters` | `Array` | 是 | 该部分下的章节列表 |
| `chapters[].chapterId` | `string` | 是 | 取值：`chapter-01` ~ `chapter-16` |
| `chapters[].label` | `string` | 是 | 显示在卡片顶部（如 `第1章`） |
| `chapters[].icon` | `string` | 是 | emoji 字符 |
| `chapters[].title` | `string` | 是 | 卡片标题 |
| `chapters[].link` | `string` | 是 | 格式：`/chapter-XX/`（指向章节索引页） |
| `chapters[].sections` | `Array` | 是 | 小节列表，首页卡片最多展示前 3 节 |
| `sections[].sectionId` | `string` | 是 | 格式：`X.Y` |
| `sections[].title` | `string` | 是 | 小节标题（含编号前缀） |
| `sections[].link` | `string` | 是 | 格式：`/chapter-XX/NN`（指向节文件） |

> **重要**：`parts` 数据必须与 `config.mts` 中的侧边栏配置保持一致（章节标题、小节名称、链接路径），否则首页与侧边栏信息不匹配。

#### 目录卡片交互

- 整卡可点击跳转至章节索引页（`<a>` 标签包裹）
- 小节链接使用 `@click.stop` 阻止事件冒泡，点击小节不会触发整卡跳转
- 每卡最多展示 3 节 + "还有 N 节…"入口（当小节数 > 3 时）

#### 响应式断点

| 视口宽度 | 布局变化 |
|----------|----------|
| > 960px | Hero 横向排列，目录 3 列网格（≤2 章用 2 列） |
| ≤ 960px | Hero 纵向居中，3 列→2 列，封面缩小至 240px |
| ≤ 640px | 目录 1 列，按钮全宽纵向排列，封面缩小至 200px |

#### 封面交互效果

```css
.cover-img:hover {
  transform: translateY(-8px) rotate(-1.5deg);  /* 上移 8px + 微旋转 */
  box-shadow: 0 18px 48px rgba(0,0,0,0.25);     /* 阴影增强 */
}
```

### 6.2 Layout.vue

文件：`docs/.vitepress/theme/Layout.vue`

自定义布局组件，包装 VitePress 默认 Layout，增加阅读进度条和回到顶部按钮。

#### 配置参数

```ts
const showBackToTop = ref(false)

function handleScroll() {
  showBackToTop.value = window.scrollY > 400  // 滚动超过 400px 显示
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })  // 平滑滚动
}
```

| 参数 | 默认值 | 说明 |
|------|--------|------|
| 滚动阈值 | `400px` | 页面滚动超过此距离后显示回到顶部按钮 |
| 滚动行为 | `'smooth'` | 点击后平滑滚动至顶部 |

**回到顶部按钮响应式：**

| 视口宽度 | 位置 | 尺寸 |
|----------|------|------|
| > 960px | 距底部 32px、距右侧 32px | 44×44px |
| ≤ 960px | 距底部 20px、距右侧 20px | 40×40px |

#### 插槽使用

```html
<Layout>
  <template #layout-bottom>
    <ReadingProgress />
    <button class="back-to-top">...</button>
  </template>
</Layout>
```

使用 VitePress 默认 Layout 的 `layout-bottom` 插槽注入自定义内容。

### 6.3 ReadingProgress.vue

文件：`docs/.vitepress/theme/ReadingProgress.vue`

阅读进度条组件，显示在页面顶部。

#### 工作原理

```ts
const progress = ref(0)
const isHome = computed(() => route.path === '/' || route.path === '/index.html')

function updateProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
}
```

| 参数 | 说明 |
|------|------|
| `progress` | 当前阅读进度百分比（0-100） |
| `isHome` | 是否为首页（首页不显示进度条） |
| 计算公式 | `scrollY / (scrollHeight - innerHeight) × 100` |

#### 样式配置

```css
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  z-index: 50;
  background-color: var(--color-progress);  /* 亮色 #1a365d / 暗色 #7b9ec7 */
  transition: none;  /* 无过渡动画，保证 60fps */
}
```

| 属性 | 值 | 说明 |
|------|-----|------|
| 高度 | `3px` | 进度条高度 |
| 颜色 | `var(--color-progress)` | 跟随主题色变化 |
| 过渡 | `none` | 禁用 CSS 过渡，确保滚动时无延迟 |
| z-index | `50` | 确保在导航栏之上 |

#### 首页隐藏逻辑

```html
<div v-if="!isHome" class="reading-progress" :style="{ width: progress + '%' }" />
```

通过 `v-if="!isHome"` 判断路由路径，首页（`/` 或 `/index.html`）不渲染进度条。

---

## 配置注意事项总结

1. **侧边栏与首页数据同步**：`config.mts` 的 `fullSidebar` 和 `HomePage.vue` 的 `parts` 数组必须保持一致
2. **路径映射完整性**：新增章节路径必须同时添加到 `paths` 数组，否则该页面无侧边栏
3. **双主题变量**：修改色彩时须同步更新 `:root` 和 `.dark` 两套 CSS 变量
4. **Tailwind 版本**：当前使用 Tailwind CSS v3，不可直接升级到 v4
5. **静态资源引用**：`public/` 下的文件通过根路径引用（`/logo.svg`），不加 `public/` 前缀
6. **主题入口路径**：`theme/index.ts` 引用 `.vitepress/` 下的文件需使用 `../` 相对路径
7. **首页布局**：`index.md` 必须使用 `layout: home`（非 `page`），CSS 选择器 `.VPDoc:has(.VPHome)` 才能正确匹配
8. **manualChunks 限制**：`vue` 和 `vitepress` 被 VitePress 外部化，不能在 `manualChunks` 中配置
9. **新章节添加**：需同步修改 3 个位置 — Markdown 文件目录、`config.mts`（fullSidebar + paths）、`HomePage.vue`（parts）
