import { serverCard } from "@/app/lib/mcp-card";

export const dynamic = "force-static";

export function GET() {
  return Response.json(serverCard);
}
