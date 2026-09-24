# 技术架构

本文件描述阶段 1 及之后要落地的工程结构。阶段 0 不安装依赖，不创建 `src/`。

后续阶段开始前先读完 `docs/`。与本文件冲突的实现，先改决定记录，再改代码。

## 基线

阶段 1 使用当时的最新稳定版，不锁 beta。撰写本文件时，Astro 最新稳定版是 7.3.x；安装时以 `pnpm create astro` 得到的版本为准，并记入 [DECISIONS.md](DECISIONS.md)。

- Astro，默认静态输出
- TypeScript，`strict: true`
- Tailwind CSS，使用官方集成的当前稳定版
- MDX
- Astro Content Collections
- pnpm
- Lucide，只以静态 SVG 引入
- 部署目标是 Cloudflare 上的静态资源

除命令面板外，不把 React 放进客户端。能用 `.astro` 完成的界面不用框架岛屿。

## 目标结构

阶段 1 创建骨架。页面内容按后续阶段再填。

```text
src/
  components/
  content.config.ts
  content/
    works/zh/
    works/en/
    notes/zh/
    notes/en/
  data/
    now.ts
    about.ts
    site.ts
  i18n/ui.ts
  layouts/BaseLayout.astro
  lib/content.ts
  lib/seo.ts
  pages/
    index.astro
    404.astro
    works/index.astro
    works/[slug].astro
    notes/index.astro
    notes/[slug].astro
    now.astro
    about.astro
    en/index.astro
    en/404.astro
    en/works/index.astro
    en/works/[slug].astro
    en/notes/index.astro
    en/notes/[slug].astro
    en/now.astro
    en/about.astro
  styles/global.css
public/
astro.config.ts
package.json
pnpm-lock.yaml
tsconfig.json
```

`src/pages` 下的文件保持薄封装：解析当前语言，渲染共享组件。中英文不复制布局实现。

RSS 路由在阶段 6 添加：`src/pages/rss.xml.ts` 与 `src/pages/en/rss.xml.ts`。

## 国际化

在 `astro.config.ts` 使用 Astro 内置 i18n：

```ts
i18n: {
  defaultLocale: "zh",
  locales: ["zh", "en"],
  routing: {
    prefixDefaultLocale: false,
  },
}
```

| 语言 | URL | `<html lang>` |
| --- | --- | --- |
| 简体中文，默认 | `/`、`/works`、`/notes`、`/now`、`/about` | `zh-Hans` |
| 英文 | `/en`、`/en/works`、`/en/notes`、`/en/now`、`/en/about` | `en` |

不根据 `Accept-Language` 跳转。访问 `/` 的人看到中文。

链接使用 `astro:i18n` 的 `getRelativeLocaleUrl`，不手写前缀。

内容集合在 `src/content.config.ts` 用 `glob` loader 定义，schema 以 [CONTENT.md](CONTENT.md) 为准。作品 id 形如 `zh/field-notes`，slug 是最后一段。相同 slug 才是一对翻译。

不配置跨语言 fallback。英文 URL 没有对应文件时返回该语言的 404，不改写出中文正文。

## 渲染与交互边界

构建输出静态 HTML。阅读首页、作品、笔记、Now 和 About 不依赖客户端 JavaScript。

| 能力 | 阶段 | 客户端脚本 |
| --- | --- | --- |
| 跟随系统外观 | 2 | 无。只用 CSS `prefers-color-scheme` |
| 语言切换 | 2 | 无。普通链接 |
| 主题手动切换 | 5 | 一段防闪烁内联脚本，外加切换控件 |
| 命令面板 | 5 | 允许一个 React 岛屿，或不用 React 的等价实现 |

阶段 5 之前不安装 React。命令面板的文案来自界面词典，两种语言都要有。

## SEO

阶段 6 做 sitemap 和 RSS。下面的要求从有页面开始就遵守。

- `site` 设为 `https://ctrl97.com`。
- 每页有唯一的 `<title>` 和 meta description。首页标题是 `Ctrl97`。其他页面是 `{页面名} — Ctrl97`。
- description 来自该页的 `description`、`summary`，或已批准的空状态句子。不用 lorem，不编一段介绍。
- 每页输出自己的 canonical。
- Open Graph 包含 `og:title`、`og:description`、`og:url`、`og:type`、`og:locale`。中文 `zh_CN`，英文 `en_US`。
- 两种语言都存在同一内容时，输出成对的 `hreflang`，并让 `x-default` 指向中文 URL。缺译文时不输出那一条 alternate。
- 每页一个 `h1`。
- 阶段 6 生成 sitemap，两种语言都收录。
- 阶段 6 的 RSS 只收录对应语言的已发布笔记。
- 不输出评分、价格或虚假的 `aggregateRating` 结构化数据。

## 可访问性

目标是 WCAG 2.2 AA。

- 对比度遵守 [DESIGN.md](DESIGN.md)。
- 提供「跳到主要内容」。
- 使用 `header`、`main`、`footer` 和导航的 landmark。
- 焦点始终可见。
- 语言切换、导航和阶段 5 的命令面板可用键盘完成。
- 控件点击区域至少 24px；顶栏链接和按钮的高度做到 40px。
- 状态同时有文字和颜色。
- 遵守 `prefers-reduced-motion`。
- 图片有替代文本。封面若是装饰，替代文本为空，旁边仍有作品名称。

## 性能

- 首屏内容在 HTML 里，不等待客户端水合。
- 字体自托管并子集化，避免布局大幅跳动。
- 图片经 `astro:assets` 输出，带宽度和高度。
- 不接入分析脚本，直到 Rico 明确要求。
- 阶段 6 再跑 Lighthouse。首页的 Performance、Accessibility、Best Practices、SEO 都以 95 分为验收目标。该数字是目标，不是已经测得的结果。

## 部署

静态站点不需要 `@astrojs/cloudflare`。构建产物是 `dist/`。

优先用 Cloudflare Workers Static Assets 托管 `dist/`。已有 Pages 项目时，上传同一份 `dist/` 也可以。出现按需渲染之前，不把 `output` 改成 `server`，不安装 Cloudflare 适配器。

阶段 6 才添加部署配置和域名。阶段 0 不创建 `wrangler` 配置。

## 阶段对照

| 阶段 | 工程产物 |
| --- | --- |
| 0 | `docs/*.md` |
| 1 | Astro 骨架、严格 TypeScript、Tailwind、空目录、可构建 |
| 2 | 全局样式、基础布局、词典、首页 |
| 3 | Works、Notes、Content Collections、MDX |
| 4 | Now、About、两种语言的 404 |
| 5 | 命令面板、主题切换 |
| 6 | RSS、sitemap、Cloudflare、验收 |

每个阶段结束时运行该阶段的检查，并单独提交。不把后一阶段的功能提前写进前一阶段。
