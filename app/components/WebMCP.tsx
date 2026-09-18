"use client";

import { useEffect } from "react";

// Read-only WebMCP tools for browser agents. See
// https://github.com/webmachinelearning/webmcp.

const products = [
  {
    name: "Anubis",
    description:
      "Open-source bot protection for the web. Uses proof-of-work challenges to stop automated abuse while letting real users through.",
    price: "Free and open source. Self-hosted.",
    status: "available",
    url: "https://anubis.techaro.lol",
  },
  {
    name: "BotStopper",
    description:
      "Commercial bot protection built on Anubis. Enterprise features, managed deployment, and dedicated support.",
    price: "US$50 per month. Custom invoicing costs extra. See https://techaro.lol/pricing.md.",
    status: "coming soon",
    url: null,
  },
];

type ModelContext = {
  registerTool: (tool: {
    name: string;
    description: string;
    inputSchema: object;
    annotations?: { readOnlyHint?: boolean };
    execute: () => Promise<{ content: { type: "text"; text: string }[] }>;
  }) => unknown;
  unregisterTool?: (name: string) => void;
};

export default function WebMCP() {
  useEffect(() => {
    const modelContext: ModelContext | undefined =
      (document as unknown as { modelContext?: ModelContext }).modelContext ??
      (navigator as unknown as { modelContext?: ModelContext }).modelContext;
    if (!modelContext) return;

    try {
      modelContext.registerTool({
        name: "list_products",
        description:
          "List Techaro's products with descriptions, pricing, and availability. Read-only. Do not use this site to contact Techaro; see /agents.md.",
        inputSchema: { type: "object", properties: {} },
        annotations: { readOnlyHint: true },
        async execute() {
          return {
            content: [{ type: "text", text: JSON.stringify(products, null, 2) }],
          };
        },
      });
    } catch {
      // Already registered (e.g. React strict mode double effect).
    }

    return () => modelContext.unregisterTool?.("list_products");
  }, []);

  return null;
}
