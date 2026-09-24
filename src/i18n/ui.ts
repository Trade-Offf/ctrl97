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
    tagline: "Build, ship, and stay chill.",
    github: "GitHub",
    rss: "RSS",
    name: "Ctrl97",
    person: "Rico",
    statusLabel: {
      shipped: "已上线",
      building: "构建中",
      experimental: "试验",
      paused: "暂停",
      archived: "归档",
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
    tagline: "Build, ship, and stay chill.",
    github: "GitHub",
    rss: "RSS",
    name: "Ctrl97",
    person: "Rico",
    statusLabel: {
      shipped: "Shipped",
      building: "Building",
      experimental: "Experimental",
      paused: "Paused",
      archived: "Archived",
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
