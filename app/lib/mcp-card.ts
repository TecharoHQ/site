import { SITE } from "@/app/lib/jsonld";
import {
  INSTRUCTIONS,
  SERVER_NAME,
  SERVER_URL,
  SERVER_VERSION,
  toolDefinitions,
} from "@/app/lib/mcp";

// MCP server card served at /.well-known/mcp/server-card.json and
// /.well-known/mcp.json so agents can find the server without a URL.
export const serverCard = {
  name: SERVER_NAME,
  title: "Techaro",
  version: SERVER_VERSION,
  kind: "product",
  description:
    "Read-only information about Techaro's bot protection products, Anubis and BotStopper. The tools return static text that points to the website.",
  icon: `${SITE}/img/logo_waffle.svg`,
  websiteUrl: SITE,
  documentationUrl: `${SITE}/agents.md`,
  serverUrl: SERVER_URL,
  url: SERVER_URL,
  transport: "streamable-http",
  authentication: { required: false },
  instructions: INSTRUCTIONS,
  capabilities: { tools: true, resources: false, prompts: false },
  tools: toolDefinitions,
};
