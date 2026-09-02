import { canAccessAdmin } from "@/lib/admin-access";
import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const notFoundResponse = () =>
  new Response(null, {
    status: 404,
    headers: { "x-robots-tag": "noindex, nofollow" },
  });

const { GET: keystaticGET, POST: keystaticPOST } = makeRouteHandler({
  config,
});

function allow(request: Request): boolean {
  return canAccessAdmin(request.headers.get("host"));
}

export async function GET(request: Request) {
  if (!allow(request)) {
    return notFoundResponse();
  }

  return keystaticGET(request);
}

export async function POST(request: Request) {
  if (!allow(request)) {
    return notFoundResponse();
  }

  return keystaticPOST(request);
}
