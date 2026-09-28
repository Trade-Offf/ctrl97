import type { Locale } from "../i18n/ui";

export type AboutSection = {
  id: "who" | "name" | "doing" | "work" | "contact";
  title: string;
  paragraphs: string[];
};

const aboutSections = {
  zh: [
    {
      id: "who",
      title: "我是谁",
      paragraphs: [
        "别人叫我 Rico。HiSt 是我以前的网名。Ctrl97 是我现在的个人品牌。",
        "我是 AI Product Engineer，2020 年 7 月开始工作。我关注 AI 产品、产品工程和独立构建。",
      ],
    },
    {
      id: "name",
      title: "为什么叫 Ctrl97",
      paragraphs: ["Ctrl 来自程序员的控制键。97 来自 1997 年。"],
    },
    {
      id: "doing",
      title: "我正在做什么",
      paragraphs: [
        "我在用 AI 把想法做成真正有人使用的产品。",
        "眼下可公开的现状，写在 {now}。",
        "持续构建，肯定 Chill。",
      ],
    },
    {
      id: "work",
      title: "工作与技能",
      paragraphs: [
        "职位是 AI Product Engineer。工作从 2020 年 7 月开始。重心是 AI 产品、产品工程和独立构建。",
      ],
    },
    {
      id: "contact",
      title: "联系方式",
      paragraphs: ["公开的邮箱还待补充。社交账号在下面。"],
    },
  ],
  en: [
    {
      id: "who",
      title: "Who I am",
      paragraphs: [
        "People call me Rico. HiSt is the handle I used before. Ctrl97 is my personal brand now.",
        "I am an AI Product Engineer. I started working in July 2020. I focus on AI products, product engineering, and building independently.",
      ],
    },
    {
      id: "name",
      title: "Why Ctrl97",
      paragraphs: [
        "Ctrl comes from the control key programmers use. 97 comes from 1997.",
      ],
    },
    {
      id: "doing",
      title: "What I am doing",
      paragraphs: [
        "I use AI to turn ideas into products people actually use.",
        "What I can say in public right now is on {now}.",
        "Build, ship, and stay chill.",
      ],
    },
    {
      id: "work",
      title: "Work and craft",
      paragraphs: [
        "The role is AI Product Engineer. The work started in July 2020. The focus is AI products, product engineering, and independent building.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "A public email is still to be added. The social accounts are below.",
      ],
    },
  ],
} as const satisfies Record<Locale, readonly AboutSection[]>;

export function getAboutSections(locale: Locale): readonly AboutSection[] {
  return aboutSections[locale];
}
