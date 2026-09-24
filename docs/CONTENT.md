# 内容规范

本文件定义作品、笔记和单页的内容模型，以及中英双语如何配对。没有真实材料时，集合保持为空。

## 语言

网站从第一天起提供简体中文和英文。

- 界面文案两种语言同时存在，放在类型化词典里，不写进内容文件。
- 作品、笔记、Now 和 About 按语言分目录。
- 语言取自目录名 `zh` 或 `en`，不在 frontmatter 里再写 `locale`。
- 缺少翻译时，不显示另一种语言的正文，也不机器翻译后充数。
- 语言切换：同一 slug 的译文存在时链到译文；不存在时链到该语言的栏目首页。

默认语言是中文。若要改成英文默认，在阶段 1 开始前改 [DECISIONS.md](DECISIONS.md) 的对应决定。

## 目录

```text
src/content/works/zh/*.mdx
src/content/works/en/*.mdx
src/content/notes/zh/*.mdx
src/content/notes/en/*.mdx
src/content/pages/zh/now.mdx
src/content/pages/zh/about.mdx
src/content/pages/en/now.mdx
src/content/pages/en/about.mdx
```

文件名是 slug，使用小写英文和连字符，例如 `field-notes.mdx`。两种语言的同一件作品或同一篇文章使用同一个文件名。这个文件名是翻译配对键。

阶段 4 才创建 Now 和 About。当前作品和笔记里只有标明「示例内容 / 待替换 / 不代表真实数据」的占位条目。

## Works

路径：`src/content/works/{zh,en}/*.mdx`

```ts
const work = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.coerce.date(),
  status: z.enum(["building", "shipped", "paused", "archived"]),
  featured: z.boolean().default(false),
  role: z.string().min(1).optional(),
  stack: z.array(z.string().min(1)).default([]),
  cover: z.string().min(1).optional(),
  website: z.string().url().optional(),
  repository: z.string().url().optional(),
  note: z.string().min(1).optional(),
  metrics: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
        source: z.string().url(),
        asOf: z.coerce.date(),
      }),
    )
    .optional(),
  draft: z.boolean().default(false),
});
```

| 字段 | 含义 |
| --- | --- |
| `title` | 产品的真实名称 |
| `description` | 列表和 SEO 使用的说明 |
| `publishedAt` | 公开或开始记录的日期 |
| `status` | 当前状态，只用下面的固定词汇 |
| `featured` | 是否出现在首页精选。默认否 |
| `role` | Rico 实际担任的角色。没有就省略 |
| `stack` | 实际使用的技术。没有就省略 |
| `cover` | 真实界面图的路径。没有就省略 |
| `website` | 可访问的产品地址。没有就省略 |
| `repository` | 可公开的代码仓库。私有仓库不写 |
| `note` | 一句补充事实。没有就省略 |
| `metrics` | 可选。每一项必须同时有来源 URL 和日期。没有来源就不能写 |
| `draft` | 草稿不进入列表、RSS 和生产构建 |

状态词汇：

| 值 | 中文 | 英文 |
| --- | --- | --- |
| `building` | 构建中 | Building |
| `shipped` | 已上线 | Shipped |
| `paused` | 暂停 | Paused |
| `archived` | 归档 | Archived |

正文用 MDX。只写可核实的事实。没有来源的用户数、收入、下载量和客户不写。首页不展示 `metrics`。

列表按状态分组，顺序是 building、shipped、paused、archived。空组不显示。组内按 `publishedAt` 倒序。

首页只取 `featured: true` 且非草稿的作品，按 `publishedAt` 倒序，最多 3 件。没有精选时显示空状态。

## Notes

路径：`src/content/notes/{zh,en}/*.mdx`

```ts
const note = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  category: z.enum(["enter", "undo", "save", "find"]),
  tags: z.array(z.string().min(1)).default([]),
  cover: z.string().min(1).optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});
```

| 字段 | 含义 |
| --- | --- |
| `title` | 文章标题 |
| `description` | 列表和 SEO 使用的摘要 |
| `publishedAt` | 真实发布日期 |
| `updatedAt` | 有实质修改时才写，并在详情页显示 |
| `category` | 栏目，只用下面的固定词汇 |
| `tags` | 少量分类词 |
| `cover` | 真实配图路径。没有就省略 |
| `featured` | 是否标记为精选。默认否。首页最近笔记不按这个字段过滤 |
| `draft` | 草稿不进入列表、RSS 和生产构建 |

栏目：

| 值 | 标记 | 含义 |
| --- | --- | --- |
| `enter` | Ctrl+Enter | 产品发布与 Ship Log |
| `undo` | Ctrl+Z | 失败记录与复盘 |
| `save` | Ctrl+S | 值得保存的方法 |
| `find` | Ctrl+F | 需求研究与探索 |

列表取非草稿，按栏目分组，组内按 `publishedAt` 倒序。空组不显示。首页最近笔记取非草稿，按 `publishedAt` 倒序，最多 3 篇。没有笔记时显示空状态。

详情页计算阅读时间，生成二级和三级标题目录，并用 Shiki 高亮代码。同时显示发布日期；有 `updatedAt` 时再显示更新时间。

笔记不是作品更新日志。产品状态变化写在对应的 Work 里。

## Now 与 About

二者属于 `pages` 集合，不进入作品流或笔记流。

```ts
const page = z.object({
  title: z.string(),
  description: z.string().max(200),
  updated: z.coerce.date().optional(),
});
```

`now` 必须有 `updated`，并在页面上显示。阶段 4 实现时校验：id 以 `/now` 结尾的条目缺少 `updated` 则构建失败。`about` 的 `updated` 可省略。

Now 的正文是当前快照。可以按「在做」「在读」「在用」组织，但每一句都要是当时的事实。About 的正文只包含可核实介绍。

## 界面词典

词典路径预定为 `src/i18n/ui.ts`。每个键都要有 `zh` 和 `en`。阶段 2 创建词典。已批准的文案如下，后续不另写一套语气。

| 键 | 中文 | 英文 |
| --- | --- | --- |
| `nav.works` | 作品 | Works |
| `nav.notes` | 笔记 | Notes |
| `nav.now` | 现在 | Now |
| `nav.about` | 关于 | About |
| `empty.works` | 还没有公开作品。 | No public works yet. |
| `empty.notes` | 还没有公开笔记。 | No public notes yet. |
| `empty.featured` | 还没有挑出来放在首页的作品。 | Nothing is featured on the home page yet. |
| `empty.now` | 这一页还没有写。 | This page has not been written yet. |
| `empty.about` | 介绍还没有写。 | The introduction has not been written yet. |
| `notFound` | 这个地址没有页面。 | There is no page at this address. |
| `updated` | 更新于 | Updated |
| `skip` | 跳到主要内容 | Skip to content |
| `language.zh` | 中文 | 中文 |
| `language.en` | English | English |

品牌句不进词典的可替换文案，直接使用 [PRODUCT.md](PRODUCT.md) 中的原文。

## 草稿与发布

`draft: true` 的作品和笔记只在非生产环境可见，生产构建排除。未完成的翻译保持草稿，或不创建文件。不要为了让语言切换有目标而发布空译文。

## 禁止虚构的数据

内容文件和页面都不得出现下列未证实信息：

- 用户数、日活、下载量、等待名单人数
- 收入、利润、估值、融资
- 星标数、排名、奖项、媒体语录
- 客户标志、推荐人姓名
- 未提供的城市、雇主、学校、邮箱和社交账号

Rico 日后若要公开一个数字，写成作品的 `metrics` 项，并同时写明 `source` 和 `asOf`。没有来源的数字不能进入内容。首页不做数字展示。

## 待人工补充

下面各项确认前，相关位置保持空状态或只显示已确认事实：

- About 的中文简介和英文简介
- 可公开的邮箱与社交链接
- 头像或照片
- 每件作品的中英事实：名称、摘要、角色、年份、状态、链接
- 笔记正文
- Now 的当前事实和更新日期
- 是否把英文改成默认语言

已确认、现在就可以使用的事实见 [PRODUCT.md](PRODUCT.md) 的品牌一节。
