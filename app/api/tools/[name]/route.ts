import type { NextRequest } from "next/server";
import { tools, validateArgs } from "@/app/lib/mcp";

// REST view of the MCP tools. GET takes arguments as query parameters and
// POST takes them as a JSON object. The OpenAPI document at /openapi.json
// describes both.

const failure = (message: string, status: number) =>
  Response.json({ error: message }, { status });

function call(name: string, args: Record<string, unknown>) {
  const tool = tools.find((t) => t.name === name);
  if (!tool) return failure(`Unknown tool: ${name}`, 404);
  const invalid = validateArgs(tool, args);
  if (invalid) return failure(invalid, 400);
  return Response.json({ tool: tool.name, text: tool.text(args) });
}

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/api/tools/[name]">,
) {
  const { name } = await ctx.params;
  return call(name, Object.fromEntries(request.nextUrl.searchParams));
}

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/tools/[name]">,
) {
  const { name } = await ctx.params;
  const text = await request.text();
  let args: unknown = {};
  if (text.trim() !== "") {
    try {
      args = JSON.parse(text);
    } catch {
      return failure("Request body is not valid JSON", 400);
    }
  }
  if (typeof args !== "object" || args === null || Array.isArray(args)) {
    return failure("Request body must be a JSON object", 400);
  }
  return call(name, args as Record<string, unknown>);
}
