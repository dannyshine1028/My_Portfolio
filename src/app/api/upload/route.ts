import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";
import { verifySessionToken, ADMIN_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function extensionFor(contentType: string): string {
  switch (contentType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "bin";
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "ファイルが指定されていません" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "対応していない画像形式です（jpg, png, webp, gifのみ）" },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "画像サイズは5MB以下にしてください" }, { status: 400 });
  }

  const key = `${crypto.randomUUID()}.${extensionFor(file.type)}`;

  try {
    const store = getStore("work-images");
    await store.set(key, await file.arrayBuffer(), {
      metadata: { contentType: file.type },
    });
    return NextResponse.json({ path: `/api/images/${key}` }, { status: 201 });
  } catch (err) {
    console.error("POST /api/upload failed:", err);
    return NextResponse.json({ error: "アップロードに失敗しました" }, { status: 500 });
  }
}
