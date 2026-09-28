# Ctrl97

Rico 的个人主页。站点是 Astro 静态页面，中文在根路径，英文在 `/en`。

线上地址是 [https://ctrl97.com](https://ctrl97.com)。

## 本地

需要 Node.js 22.12 或更高。`.nvmrc` 写的是 `22`。包管理器用 pnpm 10.26。

```sh
pnpm install
pnpm dev
```

常用检查：

```sh
pnpm lint
pnpm format:check
pnpm astro check
pnpm build
```

构建产物在 `dist/`。部署步骤见 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)。
