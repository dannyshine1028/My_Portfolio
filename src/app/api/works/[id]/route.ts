import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@netlify/database";
import { verifySessionToken, ADMIN_COOKIE } from "@/lib/auth";
import { VALID_STATUSES, type WorkStatus } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthed(req: NextRequest): boolean {
  return verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const { id } = await context.params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) {
    return NextResponse.json({ error: "不正なIDです" }, { status: 400 });
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
      UPDATE works
      SET version = ${version}, date = ${date}, status = ${status}, title = ${title},
          description = ${description}, tags = ${tags ?? []}, link = ${link || null},
          image = ${image || null}
      WHERE id = ${numId}
      RETURNING id, version, date, status, title, description, tags, link, image
    `;
    if (!rows.length) {
      return NextResponse.json({ error: "見つかりません" }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("PUT /api/works/[id] failed:", err);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const { id } = await context.params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) {
    return NextResponse.json({ error: "不正なIDです" }, { status: 400 });
  }

  try {
    const db = getDatabase();
    await db.sql`DELETE FROM works WHERE id = ${numId}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/works/[id] failed:", err);
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}
