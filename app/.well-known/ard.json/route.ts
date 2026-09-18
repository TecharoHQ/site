import catalog from "./ard.json";

// Agentic Resource Discovery catalog. See
// https://agenticresourcediscovery.org/spec/.
export const dynamic = "force-static";

export function GET() {
  return Response.json(catalog);
}
