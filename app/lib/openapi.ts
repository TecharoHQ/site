import { SITE } from "@/app/lib/jsonld";
import { INSTRUCTIONS, SERVER_VERSION, tools } from "@/app/lib/mcp";

// OpenAPI 3.1 document for the REST view of the MCP tools, served at
// /openapi.json. It is built from the tool list so the two never drift.

const errorResponse = (description: string) => ({
  description,
  content: {
    "application/json": { schema: { $ref: "#/components/schemas/Error" } },
  },
});

const responses = {
  "200": {
    description: "Static text that points to the website.",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/ToolResult" },
      },
    },
  },
  "400": errorResponse("The arguments do not match the tool's input schema."),
};

export const openApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "Techaro tools API",
    version: SERVER_VERSION,
    description: `REST view of the tools on the Techaro MCP server (${SITE}/mcp). ${INSTRUCTIONS}`,
    contact: { name: "Techaro", url: `${SITE}/contact` },
  },
  externalDocs: { description: "Agent guide", url: `${SITE}/agents.md` },
  servers: [{ url: SITE }],
  // No authentication.
  security: [],
  paths: Object.fromEntries(
    tools.map((tool) => {
      const { properties } = tool.inputSchema;
      const base = {
        tags: ["tools"],
        summary: tool.title,
        description: tool.description,
        responses,
      };
      return [
        `/api/tools/${tool.name}`,
        {
          get: {
            ...base,
            operationId: tool.name,
            parameters: Object.entries(properties).map(([name, schema]) => ({
              name,
              in: "query",
              required: false,
              description: schema.description,
              schema,
            })),
          },
          post: {
            ...base,
            operationId: `${tool.name}_post`,
            requestBody: {
              required: false,
              content: { "application/json": { schema: tool.inputSchema } },
            },
          },
        },
      ];
    }),
  ),
  components: {
    schemas: {
      ToolResult: {
        type: "object",
        properties: {
          tool: { type: "string", description: "Name of the tool called." },
          text: { type: "string", description: "The tool's text output." },
        },
        required: ["tool", "text"],
      },
      Error: {
        type: "object",
        properties: { error: { type: "string" } },
        required: ["error"],
      },
    },
  },
  tags: [{ name: "tools", description: "Read-only tools. No authentication." }],
};
