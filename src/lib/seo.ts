import type { Locale } from "../i18n/ui";
import { siteUrl } from "../data/site";

type JsonLdNode = Record<string, unknown>;

export function websiteJsonLd(): JsonLdNode {
  return {
    "@type": "WebSite",
    name: "Ctrl97",
    url: siteUrl,
    inLanguage: ["zh-Hans", "en"],
  };
}

export function personJsonLd(): JsonLdNode {
  return {
    "@type": "Person",
    name: "Rico",
    alternateName: "HiSt",
    jobTitle: "AI Product Engineer",
    url: siteUrl,
  };
}

export function blogPostingJsonLd(input: {
  locale: Locale;
  headline: string;
  description: string;
  url: string;
  publishedAt: Date;
  updatedAt?: Date;
}): JsonLdNode {
  return {
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    datePublished: input.publishedAt.toISOString(),
    ...(input.updatedAt ? { dateModified: input.updatedAt.toISOString() } : {}),
    inLanguage: input.locale === "zh" ? "zh-Hans" : "en",
    url: input.url,
    mainEntityOfPage: input.url,
    author: {
      "@type": "Person",
      name: "Rico",
      url: siteUrl,
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Ctrl97",
      url: siteUrl,
    },
  };
}

export function serializeJsonLd(nodes: JsonLdNode[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  }).replace(/</g, "\\u003c");
}
