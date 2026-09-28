import type { Locale } from "../i18n/ui";

export type ProfileStat = {
  label: string;
  value: string;
};

export type ProfileCard = {
  platform: string;
  name: string;
  role?: string;
  bio: string;
  fact?: string;
  href: string;
  honors?: readonly string[];
  stats?: readonly ProfileStat[];
  asOf?: string;
};

export type PupbriefLine = {
  name: string;
  href: string;
  after: string;
};

const profiles = {
  zh: [
    {
      platform: "掘金",
      name: "HiSt",
      role: "AI Product Engineer",
      bio: "研究一个工程师如何借助 AI，低成本做出真正有人使用和付费的产品。",
      href: "https://juejin.cn/user/1591748568038823",
      honors: ["2024 年度人气作者 No.82", "优秀创作者"],
      stats: [
        { label: "文章被点赞", value: "1,915" },
        { label: "文章被阅读", value: "170,101" },
        { label: "掘力值", value: "7,003" },
      ],
      asOf: "截至 2026年9月28日",
    },
    {
      platform: "GitHub",
      name: "Trade-Offf",
      bio: "Ignite the soul, surge the world",
      fact: "Alibaba · Hangzhou",
      href: "https://github.com/Trade-Offf",
    },
  ],
  en: [
    {
      platform: "Juejin",
      name: "HiSt",
      role: "AI Product Engineer",
      bio: "Studying how an engineer can use AI to make products people actually use and pay for, without spending much.",
      href: "https://juejin.cn/user/1591748568038823",
      honors: ["2024 Popular Author No. 82", "Outstanding Creator"],
      stats: [
        { label: "Article likes", value: "1,915" },
        { label: "Article views", value: "170,101" },
        { label: "Juejin Power", value: "7,003" },
      ],
      asOf: "As of Sep 28, 2026",
    },
    {
      platform: "GitHub",
      name: "Trade-Offf",
      bio: "Ignite the soul, surge the world",
      fact: "Alibaba · Hangzhou",
      href: "https://github.com/Trade-Offf",
    },
  ],
} as const satisfies Record<Locale, readonly ProfileCard[]>;

const pupbrief = {
  zh: {
    name: "汪汪简报",
    href: "https://pupbrief.com/",
    after: "每天从 AI 和 Crypto 的信源里选出值得看的几条，各配一句判断。",
  },
  en: {
    name: "Pupbrief",
    href: "https://pupbrief.com/",
    after:
      " picks a few AI and Crypto items each day and adds one judgment to each.",
  },
} as const satisfies Record<Locale, PupbriefLine>;

export function getProfiles(locale: Locale): readonly ProfileCard[] {
  return profiles[locale];
}

export function getPupbrief(locale: Locale): PupbriefLine {
  return pupbrief[locale];
}
