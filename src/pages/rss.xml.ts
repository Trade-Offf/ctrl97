import type { APIContext } from "astro";
import { notesFeed } from "../lib/feed";

export function GET(context: APIContext): Promise<Response> {
  return notesFeed(context, "zh");
}
