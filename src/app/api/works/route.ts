import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@netlify/database";
import { verifySessionToken, ADMIN_COOKIE } from "@/lib/auth";
import { VALID_STATUSES, type WorkStatus } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDatabase();
    const rows = await db.sql`
      SELECT id, version, date, status, title, description, tags, link, image
      FROM works
      ORDER BY date DESC, id DESC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/works failed:", err);
    return NextResponse.json(
      { error: "データベースに接続できませんでした" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "リクエストが不正です" }, { status: 400 });
  }

  const { version, date, status, title, description, tags, link, image } = body as {
    version?: string;
    date?: string;
    status?: string;
    title?: string;
    description?: string;
    tags?: string[];
    link?: string;
    image?: string;
  };

  if (!version || !date || !status || !title || !description) {
    return NextResponse.json({ error: "必須項目が未入力です" }, { status: 400 });
  }
  if (!VALID_STATUSES.includes(status as WorkStatus)) {
    return NextResponse.json({ error: "ステータスの値が不正です" }, { status: 400 });
  }

  try {
    const db = getDatabase();
    const rows = await db.sql`
      INSERT INTO works (version, date, status, title, description, tags, link, image)
      VALUES (${version}, ${date}, ${status}, ${title}, ${description}, ${tags ?? []}, ${link || null}, ${image || null})
      RETURNING id, version, date, status, title, description, tags, link, image
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (err) {
    console.error("POST /api/works failed:", err);
    return NextResponse.json({ error: "保存に失敗しました" }, { status: 500 });
  }
}
