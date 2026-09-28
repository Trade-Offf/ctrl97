import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { siteUrl } from "./src/data/site";

export default defineConfig({
  site: siteUrl,
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/404"),
      i18n: {
        defaultLocale: "zh",
        locales: {
          zh: "zh-Hans",
          en: "en",
        },
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rolldownOptions: {
        onLog(level, log, defaultHandler) {
          // Astro adds this directive while compiling content. These pages do not inject extra assets.
          if (
            log.code === "MODULE_LEVEL_DIRECTIVE" &&
            log.id?.includes("astroPropagatedAssets")
          ) {
            return;
          }
          defaultHandler(level, log);
        },
      },
    },
  },
});
