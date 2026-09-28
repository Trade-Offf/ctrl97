import type { APIRoute } from "astro";
import { siteUrl } from "../data/site";

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? siteUrl;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap-index.xml\n`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
