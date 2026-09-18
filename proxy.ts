import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  markdownPageFor,
  markdownPath,
  renderMarkdown,
} from "@/app/lib/markdown";

const aiBotUA =
  /GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-User|Claude-SearchBot|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|Applebot-Extended|ora-agent|DeepSeekBot|meta-externalagent|MistralAI-User|cohere-ai/i;

// Returns the q-value the Accept header gives to mediaType, falling back to
// type/* and */* wildcards. Returns 0 if the type is not accepted.
function acceptQ(accept: string, mediaType: string): number {
  const [type] = mediaType.split("/");
  let best = -1;
  let bestSpecificity = -1;
  for (const part of accept.split(",")) {
    const [range, ...params] = part.trim().toLowerCase().split(";");
    const specificity =
      range === mediaType ? 2 : range === `${type}/*` ? 1 : range === "*/*" ? 0 : -1;
    if (specificity <= bestSpecificity) continue;
    const q = params
      .map((p) => p.trim())
      .find((p) => p.startsWith("q="));
    best = q ? Number.parseFloat(q.slice(2)) || 0 : 1;
    bestSpecificity = specificity;
  }
  return Math.max(best, 0);
}

function wantsMarkdown(request: NextRequest): boolean {
  const accept = request.headers.get("accept") ?? "";
  const md = acceptQ(accept, "text/markdown");
  // Only an explicit text/markdown range counts; */* alone means HTML.
  if (md > 0 && accept.toLowerCase().includes("text/markdown")) {
    return md >= acceptQ(accept, "text/html");
  }
  return aiBotUA.test(request.headers.get("user-agent") ?? "");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const page = markdownPageFor(pathname);
  if (!page) return NextResponse.next();

  const explicitMd = pathname.endsWith(".md");
  const isGet = request.method === "GET" || request.method === "HEAD";

  if (isGet && (explicitMd || wantsMarkdown(request))) {
    return new NextResponse(
      request.method === "HEAD" ? null : renderMarkdown(page),
      {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: "Accept, User-Agent",
          Link: `<https://techaro.lol${page}>; rel="canonical"`,
        },
      },
    );
  }

  // Next.js overwrites Vary on app page responses (see
  // next/dist/build/templates/app-page.js), so HTML cannot carry
  // `Vary: Accept` from here.
  const response = NextResponse.next();
  response.headers.set(
    "Link",
    `<${markdownPath(page)}>; rel="alternate"; type="text/markdown"`,
  );
  return response;
}

export const config = {
  matcher: [
    "/",
    "/index.md",
    "/products",
    "/products.md",
    "/testimonials",
    "/testimonials.md",
    "/contact",
    "/contact.md",
  ],
};
