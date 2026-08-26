"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const contactJson: Record<string, string> = {
  name: "林明 (Lin Ming)",
  email: "itprosomething@gmail.com",
  location: "台北市 中山区, 台湾",
  status: "available_for_projects",
};

export default function Contact() {
  const [hint, setHint] = useState("クリックでコピー");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("itprosomething@gmail.com");
      setHint("コピーしました ✓");
    } catch {
      setHint("コピーできませんでした");
    }
    setTimeout(() => setHint("クリックでコピー"), 2000);
  }

  const entries = Object.entries(contactJson);

  return (
    <section id="contact">
      <div className="wrap">
        <div className="eyebrow">contact</div>
        <h2>お問い合わせ</h2>
        <div className="contact-grid">
          <Reveal className="json-card">
            <div>
              <span className="method">GET</span> /contact
            </div>
            <div>{"{"}</div>
            {entries.map(([k, v], i) => (
              <div key={k} className="json-line">
                &ldquo;<span className="k">{k}</span>&rdquo;: &ldquo;
                <span className="s">{v}</span>&rdquo;
                {i < entries.length - 1 ? "," : ""}
              </div>
            ))}
            <div>{"}"}</div>
          </Reveal>

          <Reveal className="contact-actions">
            <a
              className="btn btn-primary"
              href="mailto:itprosomething@gmail.com"
              style={{ textAlign: "center" }}
            >
              メールを送る
            </a>
            <button className="copy-btn" type="button" onClick={copyEmail}>
              <span>itprosomething@gmail.com</span>
              <span className="hint">{hint}</span>
            </button>
            <p className="contact-note">
              公開ページには詳細な住所は掲載していません。契約時に必要な情報は、上記メールにてご連絡ください。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
