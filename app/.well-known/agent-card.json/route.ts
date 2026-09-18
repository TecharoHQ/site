import card from "./agent-card.json";

// Agent-to-Agent (A2A) agent card. See
// https://a2a-protocol.org/latest/specification/.
export const dynamic = "force-static";

export function GET() {
  return Response.json(card);
}
