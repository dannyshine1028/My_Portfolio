"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Work, WorkStatus } from "@/lib/types";

interface FormState {
  version: string;
  date: string;
  status: WorkStatus;
  title: string;
  description: string;
  tags: string;
  link: string;
  image: string;
}

const emptyForm: FormState = {
  version: "",
  date: "",
  status: "PROD",
  title: "",
  description: "",
  tags: "",
  link: "",
  image: "",
};

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [works, setWorks] = useState<Work[]>([]);
  const [loadingWorks, setLoadingWorks] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formError, setFormError] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setAuthed(!!d.authenticated))
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (authed) loadWorks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  async function loadWorks() {
    setLoadingWorks(true);
    try {
      const res = await fetch("/api/works");
      const data = await res.json();
      setWorks(Array.isArray(data) ? data : []);
    } finally {
      setLoadingWorks(false);
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || "ログインに失敗しました");
        return;
      }
      setAuthed(true);
      setPassword("");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setWorks([]);
  }

  function startEdit(w: Work) {
    setEditingId(w.id);
    setForm({
      version: w.version,
      date: w.date,
      status: w.status,
      title: w.title,
      description: w.description,
      tags: w.tags.join(", "),
      link: w.link || "",
      image: w.image || "",
    });
    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setUploadError("");
  }

  async function handleImageFile(file: File) {
    setUploadError("");
    setUploadingImage(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "アップロードに失敗しました");
        return;
      }
      setForm((f) => ({ ...f, image: data.path }));
    } catch {
      setUploadError("アップロードに失敗しました");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!form.version || !form.date || !form.title || !form.description) {
      setFormError("必須項目を入力してください");
      return;
    }

    const payload = {
      version: form.version,
      date: form.date,
      status: form.status,
      title: form.title,
      description: form.description,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      link: form.link || null,
      image: form.image || null,
    };

    const url = editingId ? `/api/works/${editingId}` : "/api/works";
    const method = editingId ? "PUT" : "POST";

    setSaving(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "保存に失敗しました");
        return;
      }
      setStatusMsg(editingId ? "更新しました" : "追加しました");
      setTimeout(() => setStatusMsg(""), 2500);
      resetForm();
      loadWorks();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("この実績を削除しますか？")) return;
    await fetch(`/api/works/${id}`, { method: "DELETE" });
    loadWorks();
  }

  if (checking) {
    return (
      <div className="admin-wrap">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="admin-wrap">
        <a className="back-link" href="/">
          ← ポートフォリオに戻る
        </a>
        <h1>管理画面ログイン</h1>
        <form className="admin-form" onSubmit={handleLogin}>
          <div>
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" type="submit" disabled={loggingIn}>
              {loggingIn ? "確認中..." : "ログイン"}
            </button>
          </div>
          {loginError && <p className="error-msg">{loginError}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <a className="back-link" href="/">
          ← ポートフォリオに戻る
        </a>
        <button className="btn-secondary" onClick={handleLogout} type="button">
          ログアウト
        </button>
      </div>
      <h1>実績管理</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "実績を編集" : "実績を追加"}</h2>
        <div className="form-row2">
          <div>
            <label htmlFor="version">バージョン</label>
            <input
              id="version"
              value={form.version}
              onChange={(e) => setForm({ ...form, version: e.target.value })}
              placeholder="v1.0.0"
              required
            />
          </div>
          <div>
            <label htmlFor="date">年月</label>
            <input
              id="date"
              type="month"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="form-row2">
          <div>
            <label htmlFor="status">ステータス</label>
            <select
              id="status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as WorkStatus })}
            >
              <option value="PROD">PROD（本番運用中）</option>
              <option value="BETA">BETA（検証中）</option>
              <option value="ARCHIVED">ARCHIVED（終了済み）</option>
            </select>
          </div>
          <div>
            <label htmlFor="link">リンク（任意）</label>
            <input
              id="link"
              type="url"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </div>
        <div>
          <label htmlFor="title">プロジェクト名</label>
          <input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="description">概要</label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="tags">使用技術（カンマ区切り）</label>
          <input
            id="tags"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="Next.js, TypeScript, PostgreSQL"
          />
        </div>
        <div>
          <label htmlFor="image">画像（任意）</label>
          <div
            className={`image-dropzone${dragActive ? " dragging" : ""}${
              form.image ? " has-image" : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleImageFile(file);
            }}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
          >
            {form.image ? (
              <div className="image-preview">
                <img src={form.image} alt="プレビュー" />
                <button
                  type="button"
                  className="image-remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setForm({ ...form, image: "" });
                  }}
                  aria-label="画像を削除"
                >
                  ×
                </button>
              </div>
            ) : (
              <p className="dropzone-hint">
                {uploadingImage
                  ? "アップロード中..."
                  : "画像をドラッグ＆ドロップ、またはクリックして選択"}
              </p>
            )}
          </div>
          <input
            ref={fileInputRef}
            id="image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageFile(file);
              e.target.value = "";
            }}
          />
          {uploadError && <p className="error-msg">{uploadError}</p>}
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={saving || uploadingImage}>
            {saving ? "保存中..." : editingId ? "更新する" : "追加する"}
          </button>
          {editingId && (
            <button className="btn-secondary" type="button" onClick={resetForm}>
              編集をキャンセル
            </button>
          )}
        </div>
        {formError && <p className="error-msg">{formError}</p>}
        {statusMsg && <p className="success-msg">{statusMsg}</p>}
      </form>

      <div className="admin-list">
        <h2>登録済みの実績（{works.length}件）</h2>
        {loadingWorks ? (
          <p>読み込み中...</p>
        ) : works.length === 0 ? (
          <p>まだ実績が登録されていません。</p>
        ) : (
          works.map((w) => (
            <div className="admin-item" key={w.id}>
              <div>
                <div className="admin-item-title">{w.title}</div>
                <div className="admin-item-meta">
                  {w.version} ・ {w.date} ・ {w.status}
                  {w.image ? " ・ 画像あり" : ""}
                </div>
              </div>
              <div className="admin-item-actions">
                <button className="btn-secondary" type="button" onClick={() => startEdit(w)}>
                  編集
                </button>
                <button className="btn-danger" type="button" onClick={() => handleDelete(w.id)}>
                  削除
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
