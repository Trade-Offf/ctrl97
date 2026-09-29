export type RepositoryCard = {
  name: string;
  description?: string;
  stars: number;
  language?: string;
  year: string;
  href: string;
  website?: string;
  cover?: string;
  coverAlt?: string;
};

/** 作品页上的公开仓库。星标大于 10，从高到低。快照 2026-09-28。 */
export const repositoriesAsOf = "2026-09-28";

export const repositories = [
  {
    name: "typhoon-bavi-tracker",
    description:
      "实时台风路径追踪（巴威） + 城市波及倒计时 + 应急指南 · Cloudflare Workers 边缘架构",
    stars: 40,
    language: "TypeScript",
    year: "2026",
    href: "https://github.com/Trade-Offf/typhoon-bavi-tracker",
    website: "https://chinaupdated.com",
    cover: "/works/typhoon.webp",
    coverAlt: "typhoon-bavi-tracker",
  },
  {
    name: "NextPPT",
    description:
      "Your AI already wrote deck.html — NextPPT is the scissors after that. Click to fix one word without another prompt, drag layers like PowerPoint, export PPTX/PDF locally. No account, no upload. Free & open source.",
    stars: 15,
    language: "HTML",
    year: "2026",
    href: "https://github.com/Trade-Offf/NextPPT",
    website: "https://next-ppt.com/",
    cover: "/works/nextppt.webp",
    coverAlt: "NextPPT",
  },
  {
    name: "QuizPort",
    description: "用 AI 模拟真实面试，语音实时对话，即时反馈优化",
    stars: 12,
    language: "TypeScript",
    year: "2025",
    href: "https://github.com/Trade-Offf/QuizPort",
    website: "https://quizport.vercel.app",
    cover: "/works/quizport.webp",
    coverAlt: "QuizPort",
  },
] as const satisfies readonly RepositoryCard[];
