import { NextResponse } from "next/server";
import { getShopifyProducts } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const requested = Number(url.searchParams.get("first") || 24);
  const first = Number.isInteger(requested) ? Math.min(Math.max(requested, 1), 48) : 24;
  const after = url.searchParams.get("after") || undefined;
  const query = url.searchParams.get("q")?.trim() || undefined;
  try {
    return NextResponse.json(await getShopifyProducts({ first, after, query }), {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch {
    return NextResponse.json({ error: "Products are temporarily unavailable." }, { status: 502 });
  }
}
