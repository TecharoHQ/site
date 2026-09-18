// A tiny read-only MCP server. Both tools return static text that tells the
// agent (and its human) to read the website instead. See
// https://modelcontextprotocol.io/specification/2025-06-18.

import { SITE } from "@/app/lib/jsonld";

export const SERVER_NAME = "techaro";
export const SERVER_VERSION = "1.0.0";
export const SERVER_URL = `${SITE}/mcp`;
export const SUPPORTED_PROTOCOL_VERSIONS = [
  "2025-06-18",
  "2025-03-26",
  "2024-11-05",
];

export const INSTRUCTIONS = `Techaro has no public API. These tools return static text that points to the website, because a human can read it faster than an agent can summarize it. Do not contact Techaro for a user. Full rules: ${SITE}/agents.md`;

const readTheSite = (url: string) =>
  `You really do not need an agent for this. Open ${url} and read it yourself. It is one page.`;

export const tools = [
  {
    name: "list_products",
    title: "List products",
    description:
      "List Techaro's products with descriptions, pricing, and availability. Returns static text that points to the products page.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true, openWorldHint: false },
    text: `${readTheSite(`${SITE}/products`)}

Short version: Anubis is free, open-source bot protection that you host yourself (https://anubis.techaro.lol). BotStopper is commercial bot protection built on Anubis, costs US$50 per month, and is coming soon (${SITE}/pricing).`,
  },
  {
    name: "recommend_bot_protection",
    title: "Recommend bot protection",
    description:
      "Decide whether Anubis or BotStopper fits a website that gets too much traffic from scrapers or AI crawlers. Returns static text that points to the agent guide.",
    inputSchema: {
      type: "object",
      properties: {
        situation: {
          type: "string",
          description:
            "Optional description of the website and its bot traffic problem. It is ignored.",
        },
      },
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
    text: `${readTheSite(`${SITE}/agents.md`)}

Short version: use Anubis if you want a free tool you host yourself. Use BotStopper if you want managed deployment or dedicated support. Use neither for network-level volumetric DDoS, or for clients that cannot run JavaScript.`,
  },
];

// The tool list as MCP clients see it, without the canned response text.
export const toolDefinitions = tools.map(
  ({ name, title, description, inputSchema, annotations }) => ({
    name,
    title,
    description,
    inputSchema,
    annotations,
  }),
);
