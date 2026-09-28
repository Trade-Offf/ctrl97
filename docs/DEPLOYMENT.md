# 部署

Ctrl97 部署到 Cloudflare，主域名是 `https://ctrl97.com`。

站点是静态 HTML。不安装 `@astrojs/cloudflare`，也不把 Astro 的 `output` 改成 `server`。构建产物是 `dist/`。

优先用 Cloudflare Workers Static Assets。已有 Pages 项目时，上传同一份 `dist/` 也可以。配置文件是仓库根目录的 `wrangler.json`。

## 版本

| 项 | 要求 |
| --- | --- |
| Node.js | 22.12 或更高。`.nvmrc` 为 `22` |
| pnpm | 10.26。`package.json` 的 `packageManager` 与此一致 |
| 构建命令 | `pnpm build` |
| 输出目录 | `dist` |

Cloudflare 的构建环境把 Node 设为 22。使用 pnpm 10.26，不要改用 npm 或 yarn。

## 环境变量

静态构建不读取密钥，也不需要 `PUBLIC_` 变量。

`https://ctrl97.com` 写在 `src/data/site.ts` 的 `siteUrl`，并传给 `astro.config.ts` 的 `site`。改域名时只改这一处，然后重新构建。不要把仓库地址或个人账号放进环境变量来拼页面。

## Workers Static Assets

1. 安装并登录 Wrangler：`pnpm dlx wrangler login`。
2. 在仓库根目录执行 `pnpm build`。
3. 执行 `pnpm dlx wrangler deploy`。

`wrangler.json` 把 `./dist` 当作静态资源，未知路径返回根目录的 `404.html`。中文 404 页里的脚本会把误入的 `/en/...` 地址转到 `/en/404/`。

部署完成后，在 Cloudflare 控制台打开这个 Worker，进入 Settings → Domains & Routes，添加自定义域 `ctrl97.com`。DNS 由 Cloudflare 代理，云朵打开。

## Pages

如果账号里已经有 Pages 项目，用同一份构建：

| 项 | 值 |
| --- | --- |
| 生产分支 | `main` |
| 构建命令 | `pnpm build` |
| 输出目录 | `dist` |
| Node | 22 |
| 根目录 | 仓库根目录 |

Pages 会读取 `dist/_redirects` 和 `dist/_headers`。Astro 会把 `public/` 里的这两个文件复制进 `dist/`。

## 域名、HTTPS 与 www

主域名只用 `https://ctrl97.com`。

1. 域名的 DNS 放在 Cloudflare。
2. 为 `ctrl97.com` 和 `www.ctrl97.com` 都打开代理（橙色云朵）。
3. SSL/TLS 使用 Full (strict)。
4. 打开 Always Use HTTPS。
5. 打开 Automatic HTTPS Rewrites。

`www.ctrl97.com` 永久跳到主域名。`public/_redirects` 写的是：

```text
https://www.ctrl97.com/* https://ctrl97.com/:splat 301
```

再在 Cloudflare 加一条 Redirect Rule，作为同一跳转的备份：请求主机名等于 `www.ctrl97.com` 时，301 到 `https://ctrl97.com` 并保留路径和查询字符串。不要用 302。

不要把 `www` 设成另一份站点。规范链接、Open Graph 和 sitemap 都使用不带 `www` 的地址。

## 发布后核对

- `https://ctrl97.com/robots.txt` 允许抓取，并指向 `https://ctrl97.com/sitemap-index.xml`。
- sitemap 同时包含中文和英文页面，不包含 `/404` 和草稿。
- `https://ctrl97.com/rss.xml` 与 `https://ctrl97.com/en/rss.xml` 都能打开，且只列出对应语言的已发布笔记。
- 随意访问一个不存在的路径，得到 404，而不是目录列表。
