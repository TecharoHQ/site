import {
  INSTRUCTIONS,
  SERVER_NAME,
  SERVER_VERSION,
  SUPPORTED_PROTOCOL_VERSIONS,
  toolDefinitions,
  tools,
} from "@/app/lib/mcp";

// Stateless MCP server over the Streamable HTTP transport. Every response is
// a single JSON body; there are no sessions and no server-sent events.

type JsonRpcId = string | number | null;

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: JsonRpcId;
  method?: string;
  params?: Record<string, unknown>;
};

const result = (id: JsonRpcId, value: unknown) =>
  Response.json({ jsonrpc: "2.0", id, result: value });

const error = (id: JsonRpcId, code: number, message: string, status = 200) =>
  Response.json({ jsonrpc: "2.0", id, error: { code, message } }, { status });

export async function POST(request: Request) {
  let msg: JsonRpcRequest;
  try {
    msg = await request.json();
  } catch {
    return error(null, -32700, "Parse error", 400);
  }
  if (typeof msg !== "object" || msg === null || Array.isArray(msg)) {
    return error(null, -32600, "Invalid Request", 400);
  }

  // Notifications and responses from the client need no reply.
  if (msg.id === undefined) {
    return new Response(null, { status: 202 });
  }
  const id = msg.id;

  switch (msg.method) {
    case "initialize": {
      const requested = msg.params?.protocolVersion;
      const protocolVersion =
        typeof requested === "string" &&
        SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
          ? requested
          : SUPPORTED_PROTOCOL_VERSIONS[0];
      return result(id, {
        protocolVersion,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
        instructions: INSTRUCTIONS,
      });
    }
    case "ping":
      return result(id, {});
    case "tools/list":
      return result(id, { tools: toolDefinitions });
    case "tools/call": {
      const tool = tools.find((t) => t.name === msg.params?.name);
      if (!tool) {
        return error(id, -32602, `Unknown tool: ${String(msg.params?.name)}`);
      }
      const args =
        typeof msg.params?.arguments === "object" &&
        msg.params.arguments !== null
          ? (msg.params.arguments as Record<string, unknown>)
          : {};
      return result(id, {
        content: [{ type: "text", text: tool.text(args) }],
        isError: false,
      });
    }
    default:
      return error(id, -32601, `Method not found: ${String(msg.method)}`);
  }
}

// No server-initiated stream and no sessions to delete.
export function GET() {
  return error(
    null,
    -32000,
    "Method not allowed. POST JSON-RPC to this URL.",
    405,
  );
}

export const DELETE = GET;
