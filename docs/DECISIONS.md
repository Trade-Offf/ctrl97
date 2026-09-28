# 决定记录

这里记录已经做出的选择和理由。后续阶段要改方向时，先改本文件，再改实现。日期均为 2026-09-24。

## D1 网站是个人工作台

Ctrl97 是 Rico 的个人主页、产品实验室、作品档案和写作空间。

不按公司官网或求职模板来组织信息。首页不做客户墙、价格表和招聘入口。

## D2 中文默认，英文走 `/en`

网站提供简体中文和英文。Astro i18n 配置为 `defaultLocale: "zh"`、`locales: ["zh", "en"]`、`prefixDefaultLocale: false`。

中文 URL 不带前缀，因为当前协作语言是中文，品牌材料也是中文。英文是同等内容语言，不是附属翻译层。不根据浏览器语言自动跳转，避免静态站点把读者送进没有译文的页面。

若要改成英文默认，在阶段 1 开始前修改本决定。

## D3 缺译文时不回退正文

内容按 `zh` 和 `en` 分目录，相同文件名才是一对翻译。不开启 Astro 的跨语言 fallback。

回退会把中文正文送到英文 URL 上，读者无法判断自己看到的是哪种语言。语言切换在没有译文时回到该语言的栏目首页。

## D4 静态生成

使用 Astro 的默认静态输出。作品和笔记都在构建时确定，没有登录、评论或个性化请求。

静态 HTML 让阅读不依赖客户端 JavaScript，也让 Cloudflare 只需托管文件。出现真正的按需渲染需求之前，不安装 `@astrojs/cloudflare`，不把 `output` 改为 `server`。

## D5 部署物是 `dist/`

优先使用 Cloudflare Workers Static Assets。Cloudflare Pages 托管同一份 `dist/` 同样符合本决定。

二者的差别只在托管入口，不在站点架构。阶段 6 再选定账号里实际使用的产品并写配置。

## D6 客户端框架留到命令面板

页面用 Astro 组件渲染。语言切换是链接，系统外观用 CSS。

只有阶段 5 的命令面板可以引入客户端交互。优先评估不使用 React 的实现；若状态和焦点管理明显更清晰，允许一个 React 岛屿。阶段 5 之前不安装 React。

## D7 字体

界面用 IBM Plex Sans，笔记正文用 Source Serif 4，元信息和代码用 IBM Plex Mono。通过 Fontsource 自托管。

这组字体同时覆盖界面的精确感和长文的阅读感。不使用 Geist，以免站点落入常见的 AI 模板外观。

## D8 品牌绿不作浅色小字

沿用给定色板。另外增加两个令牌：

- 浅色 `--accent-text: #146C48`。它在 `#F7F7F5` 上为 5.99:1，在 `#FFFFFF` 上为 6.43:1。
- 浅色 `--muted-strong: #5E5E5C`。它在 `#F7F7F5` 上为 6.06:1。

`#22A06B` 在浅色背景上是 3.10:1，不能做正文或链接。`#737373` 在 `#F7F7F5` 上是 4.42:1，不能做背景上的文字。实心按钮使用深色文字：浅色主题 `#171717` 在 `#22A06B` 上为 5.39:1，深色主题 `#111110` 在 `#45C28A` 上为 8.40:1。

焦点环使用 `--accent-text`，因为浅色品牌绿只勉强达到非文字对比的 3:1。

## D9 深色试验色

浅色试验色保持 `#FF6B35`。深色试验色定为 `#FF8F66`，在 `#111110` 上为 8.43:1。

给定色板没有深色试验色。`#FF8F66` 只做状态标记，标签仍用正文色。浅色 `#FF6B35` 在浅底上是 2.64:1，同样不能做文字。

## D10 指标必须带来源

首页不留数字展示位。作品可以有可选的 `metrics`，但每一项都必须有 `source` 和 `asOf`。没有来源的用户数、收入、下载量、星标或客户不能写入内容。详见 D15。

## D11 仓库属主不是公开身份

Git 远程是 `git@github.com:Trade-Offf/ctrl97.git`。`Trade-Offf` 只说明仓库属主。

在 Rico 确认之前，网站不把它写成 GitHub 主页、作者名或页脚链接。

## D12 包管理与类型

使用 pnpm 和 TypeScript strict。内容模型用 Astro Content Collections 的 `glob` loader 与 Zod 校验，定义放在 `src/content.config.ts`。

选择 pnpm 是为了锁文件稳定、安装可重复。选择 Content Collections 是为了在构建期挡住缺字段和错误类型，而不是到了页面才发现内容坏了。

## D13 阶段不提前

功能按阶段交付：规范、工程骨架、设计系统与首页、作品和笔记、辅助页面、品牌交互、SEO 与部署。

每一阶段单独提交。文档没有写到的个人事实，保持空状态，不临时编造。

## D14 已安装的版本与首页栏宽

阶段 2 安装的是 Astro 7.3.4、Tailwind CSS 4.3.3、TypeScript 5.9。Node 需要 22.12 或更高。

首页内容宽度是 880px，阅读宽度是 720px。控件圆角 8px，卡片圆角 12px。这是阶段 2 的页面规格。后续页面沿用 880px 栏宽，除非另有决定。

页脚的 GitHub 是文字链接，指向仓库 `https://github.com/Trade-Offf/ctrl97`。页面上不写属主名称。RSS 只占位，不是可用订阅。

## D15 作品与笔记的内容模型

阶段 3 的页面规格替换阶段 0 写在 CONTENT.md 里的字段。实现以更新后的 CONTENT.md 为准。

作品字段是 title、description、publishedAt、status、featured、role、stack、cover、website、repository、note、metrics、draft。状态只有 building、shipped、paused、archived。不再使用 experimental、summary、year、url、repo、tags、order。

笔记增加 category、cover、featured。栏目只有 enter、undo、save、find。列表按状态或栏目分组，空组不显示。首页精选作品只读 `featured` 且非草稿的作品；首页最近笔记读非草稿笔记，不要求 featured。

`draft: true` 不出现在列表、未来的 RSS 和生产构建里。开发环境仍可打开草稿详情，用来核对过滤。

语言切换在对方存在同一 slug 时进入该页，否则进入栏目索引。hreflang 只在两种语言都有对应地址时输出。

当前仓库里的作品和笔记都是版式示例。标题、摘要和正文必须标明示例内容、待替换、不代表真实数据。不把它们当成 Rico 的产品或文章。

## D16 Now、About 与 404

Now 从 `src/data/now.ts` 读取。更新日期是文件里的 `nowUpdated`，构建脚本不把当天日期写进去。页面上写明这是手写快照。四栏在有具体事实之前保持「待补充」。

About 从 `src/data/about.ts` 读取，只使用已经确认的称呼、历史网名、品牌含义、职位、2020 年 7 月开始工作，以及关注方向。不写公司、学历、奖项和产品数据。联系方式一节在邮箱和社交账号确认前保持待补充。页脚的仓库链接仍不写成个人身份。

404 的中文主句是「这一步好像走错了。」返回上一页是这一页上的链接：有站内来源时回到上一页，没有时回到首页。页面可以提示 Ctrl+Z，但不监听这个快捷键。

## D17 命令面板与主题

阶段 5 不安装 React。命令面板和主题切换用一段原生脚本。页面仍是静态 HTML。

主题存在 `localStorage` 的 `ctrl97-theme`。只接受 `light` 和 `dark`。没有这个值时跟随系统。`<head>` 里的内联脚本在样式之前写入 `data-theme`，避免刷新时闪一下。

首页状态灯的句子是 `src/data/site.ts` 里的 `Building in public`。圆点不闪烁。中英文首页用同一句。

命令面板只索引当前语言的非草稿作品和笔记。Ctrl 或 Command 加 K 在输入框、文本域、下拉框和可编辑区域里不生效。

## D18 发布用静态资源和真实订阅

阶段 6 继续用静态 `dist/`。发布时的 Astro 版本是 7.3.5。部署入口是 Cloudflare Workers Static Assets，配置在 `wrangler.json`。不安装 `@astrojs/cloudflare`，不把 `output` 改成 `server`。已有 Pages 项目时可以上传同一份 `dist/`。

主域名是 `https://ctrl97.com`。`www.ctrl97.com` 用 301 跳到这个地址。构建不需要环境变量。

sitemap 收录两种语言的已构建页面，排除 404。RSS 分语言输出，只收录非草稿笔记。页脚的 RSS 从此指向这两个地址，不再是占位文字。

结构化数据只写已经确认的事实：`WebSite` 使用品牌名和域名；`Person` 只写 Rico、历史网名 HiSt、职位 AI Product Engineer 和站点地址；笔记使用 `BlogPosting`，字段来自该篇的标题、摘要和日期。不写评分、价格、邮箱、社交账号，也不把仓库属主写成作者身份。没有真实配图时不输出图片字段。

## D19 掘金、GitHub 与汪汪简报

About 的联系方式放两张卡片。掘金卡片使用公开主页上的 HiSt、职位和简介，并记下 2026 年 9 月 28 日看到的荣誉和数字：2024 年度人气作者 No.82、优秀创作者、文章被点赞 1,915、文章被阅读 170,101、掘力值 7,003。不写粉丝数。

GitHub 卡片使用公开主页上的 Trade-Offf、简介，以及 Alibaba · Hangzhou。这个登录名只出现在卡片上，不代替 Rico。页脚的仓库链接仍指向 `https://github.com/Trade-Offf/ctrl97`，页面上仍不写属主名。

汪汪简报只在「我正在做什么」放一句和 `https://pupbrief.com/`。没有核实过的发布日期，所以不放进作品集合，也不写用户数或是否收费。

## D20 掘金文章进入笔记

2026 年 9 月 28 日从 `https://juejin.cn/user/1591748568038823/posts` 取到 32 篇已发布文章，原文、发布日和更新日期都来自掘金。中文笔记用文章 id 做 slug，并链回掘金原文。英文没有译文，所以英文笔记列表是空的。

配图在当天从掘金下载到 `public/notes-media/`。掘金给出的图片地址第二天就会失效，所以不直接引用那些临时链接。

栏目按现有四类做了归组：产品上线记到 Ctrl+Enter，年终回顾记到 Ctrl+Z，方法和手册记到 Ctrl+S，其余探索记到 Ctrl+F。这是站内分组，不是掘金原来的分类。

已发布的示例笔记撤下。示例作品仍留在作品页，并标明待替换，不再出现在首页精选。首页同时放上掘金和 GitHub 两张卡片。Now 里 Building、Shipping、Writing 改成汪汪简报和这些笔记；Learning 仍是待补充。

## D21 去掉关于页和现在页

关于和现在不再单独成页，导航和命令面板里也不再出现。文章作者地址改回首页。

首页用 2026 年 9 月 28 日从 `https://github.com/Trade-Offf` 记下的公开仓库做卡片，只放当时星标不少于 4 的 8 个：typhoon-bavi-tracker 40、responsiveWebsite 17、NextPPT 15、QuizPort 12、Rax2Taro 10、The-Nth-Me 7、gyroDemo 4、CS-studyAbroad 4。简介用仓库描述；QuizPort 和 The-Nth-Me 的仓库描述是空的，改用各自 README 里的那一句。不把其余 0 星仓库写进来充数。

## D22 作品页只放星标多于 10 的仓库

首页不再罗列仓库。作品页改为这批仓库里星标大于 10 的四个，按星标从高到低：typhoon-bavi-tracker 40、responsiveWebsite 17、NextPPT 15、QuizPort 12。正好 10 星的 Rax2Taro 不放上去。示例作品改成草稿，不再出现在作品列表里。

笔记列表改成按发布时间从新到旧的一条名单，不再按栏目拆成四组。文章页不再重复摘要，也不再把掘金标签铺成一排。

## D23 GitHub 卡片去掉公司信息

GitHub 卡片不再写 Alibaba · Hangzhou。Rico 已经离职，这行不能再当近况。卡片改用本人提供的横幅，图里的句子是「我们能成为这个时代的维京海盗 / We could be the Vikings of our day.」。Trade-Offf 仍只出现在这张卡片上。

