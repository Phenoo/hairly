import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";

export const runtime = "nodejs";

function isAuthentic(payload: string, signature: string | null) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const digest = createHmac("sha256", secret).update(payload, "utf8").digest("base64");
  const expected = Buffer.from(digest);
  const received = Buffer.from(signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function POST(request: Request) {
  const payload = await request.text();
  if (!isAuthentic(payload, request.headers.get("x-shopify-hmac-sha256"))) return new Response("Unauthorized", { status: 401 });

  const topic = request.headers.get("x-shopify-topic") || "";
  let handle: string | undefined;
  try { handle = (JSON.parse(payload) as { handle?: string }).handle; } catch { /* Revalidate broad catalogue tags below. */ }

  if (topic.startsWith("products/")) {
    revalidateTag("products", "max");
    if (handle) revalidateTag(`product:${handle}`, "max");
    revalidatePath("/");
    revalidatePath("/shop");
  }
  if (topic.startsWith("collections/")) {
    revalidateTag("collections", "max");
    revalidatePath("/shop");
  }
  return new Response(null, { status: 204 });
}
