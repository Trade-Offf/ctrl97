export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

const dictionary = {
  zh: {
    skip: "跳到主要内容",
    navLabel: "栏目",
    menu: "菜单",
    works: "作品",
    notes: "笔记",
    now: "现在",
    about: "关于",
    switchTo: "English",
    theme: "主题切换，稍后可用",
    command: "命令面板，稍后可用",
    eyebrow: "CTRL97 / PERSONAL CONTROL ROOM",
    title: "你好，我是 Rico。",
    description: "一名 AI 产品工程师，正在用 AI 把想法做成真正有人使用的产品。",
    motto: "持续构建，肯定 Chill。",
    status: "BUILDING IN PUBLIC",
    viewWorks: "查看作品",
    readNotes: "阅读笔记",
    nowTitle: "现在",
    worksTitle: "精选作品",
    notesTitle: "最近笔记",
    emptyWorksHome: "新的产品实验正在构建中。",
    emptyNotesHome: "第一篇构建笔记正在路上。",
    emptyWorks: "还没有公开作品。",
    emptyNotes: "还没有公开笔记。",
    worksLead: "这里只放真实做过的产品。标成示例的条目会换掉。",
    notesLead: "笔记按栏目分组。标成示例的文章会换掉。",
    published: "发布于",
    updated: "更新于",
    toc: "目录",
    website: "网站",
    repository: "代码",
    role: "角色",
    stack: "技术",
    aside: "备注",
    record: "记录",
    tagline: "Build, ship, and stay chill.",
    github: "GitHub",
    rss: "RSS",
    name: "Ctrl97",
    person: "Rico",
    statusLabel: {
      building: "构建中",
      shipped: "已上线",
      paused: "暂停",
      archived: "归档",
    },
    categoryLabel: {
      enter: "Ctrl+Enter",
      undo: "Ctrl+Z",
      save: "Ctrl+S",
      find: "Ctrl+F",
    },
    categoryHint: {
      enter: "产品发布与 Ship Log",
      undo: "失败记录与复盘",
      save: "值得保存的方法",
      find: "需求研究与探索",
    },
  },
  en: {
    skip: "Skip to content",
    navLabel: "Sections",
    menu: "Menu",
    works: "Works",
    notes: "Notes",
    now: "Now",
    about: "About",
    switchTo: "中文",
    theme: "Theme switch, not available yet",
    command: "Command menu, not available yet",
    eyebrow: "CTRL97 / PERSONAL CONTROL ROOM",
    title: "Hi, I'm Rico.",
    description:
      "An AI product engineer, using AI to turn ideas into products people actually use.",
    motto: "Build, ship, and stay chill.",
    status: "BUILDING IN PUBLIC",
    viewWorks: "View works",
    readNotes: "Read notes",
    nowTitle: "Now",
    worksTitle: "Featured works",
    notesTitle: "Latest notes",
    emptyWorksHome: "New product experiments are being built.",
    emptyNotesHome: "The first build note is on its way.",
    emptyWorks: "No public works yet.",
    emptyNotes: "No public notes yet.",
    worksLead:
      "Only real products belong here. Entries marked as samples will be replaced.",
    notesLead:
      "Notes are grouped by section. Entries marked as samples will be replaced.",
    published: "Published",
    updated: "Updated",
    toc: "Contents",
    website: "Website",
    repository: "Code",
    role: "Role",
    stack: "Stack",
    aside: "Note",
    record: "Record",
    tagline: "Build, ship, and stay chill.",
    github: "GitHub",
    rss: "RSS",
    name: "Ctrl97",
    person: "Rico",
    statusLabel: {
      building: "Building",
      shipped: "Shipped",
      paused: "Paused",
      archived: "Archived",
    },
    categoryLabel: {
      enter: "Ctrl+Enter",
      undo: "Ctrl+Z",
      save: "Ctrl+S",
      find: "Ctrl+F",
    },
    categoryHint: {
      enter: "Product releases and ship logs",
      undo: "Failures and retrospectives",
      save: "Methods worth keeping",
      find: "Research and exploration",
    },
  },
} as const;

export type Messages = (typeof dictionary)[Locale];

export function useTranslations(locale: Locale): Messages {
  return dictionary[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "zh" ? "en" : "zh";
}

export function readingLabel(locale: Locale, minutes: number): string {
  return locale === "zh" ? `约 ${minutes} 分钟` : `${minutes} min`;
}

export function formatDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-Hans" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
