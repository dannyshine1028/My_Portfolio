import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;

  try {
    const store = getStore("work-images");
    const result = await store.getWithMetadata(key, { type: "arrayBuffer" });
    if (!result) {
      return NextResponse.json({ error: "画像が見つかりません" }, { status: 404 });
    }

    const contentType =
      (result.metadata?.contentType as string | undefined) || "application/octet-stream";

    return new NextResponse(result.data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("GET /api/images/[key] failed:", err);
    return NextResponse.json({ error: "画像の取得に失敗しました" }, { status: 500 });
  }
}
