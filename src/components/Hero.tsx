"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

const terminalLines = [
  { plain: "$ whoami", html: '<span class="prompt-char">$</span> whoami' },
  {
    plain: "林明 (Lin Ming) — Systems Engineer",
    html: '<span class="out">林明 (Lin Ming) — Systems Engineer</span>',
  },
  { plain: "$ status --current", html: '<span class="prompt-char">$</span> status --current' },
  {
    plain: "[OK] 新規プロジェクトのご相談を受付中です",
    html: '<span class="status-ok">[OK]</span> <span class="muted">新規プロジェクトのご相談を受付中です</span>',
  },
];

export default function Hero() {
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = termRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      el.innerHTML = terminalLines.map((l) => `<p class="terminal-line">${l.html}</p>`).join("");
      return;
    }

    let cancelled = false;

    async function typeAll() {
      for (const line of terminalLines) {
        if (cancelled) return;
        const p = document.createElement("p");
        p.className = "terminal-line";
        el!.appendChild(p);
        const cursor = document.createElement("span");
        cursor.className = "type-cursor";
        for (let i = 0; i <= line.plain.length; i++) {
          if (cancelled) return;
          p.textContent = line.plain.slice(0, i);
          p.appendChild(cursor);
          await new Promise((r) => setTimeout(r, 18));
        }
        p.innerHTML = line.html;
        await new Promise((r) => setTimeout(r, 220));
      }
    }

    typeAll();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="wrap">
        <div className="terminal">
          <div className="terminal-bar">
            <span className="dot red" />
            <span className="dot amber" />
            <span className="dot green" />
            <span className="terminal-title">/home/lin-ming — profile.sh</span>
          </div>
          <div className="terminal-body" ref={termRef} aria-live="polite" />
        </div>

        <div className="hero-cta">
          <a href="#works" className="btn btn-primary">
            実績を見る
          </a>
          <a href="#contact" className="btn btn-ghost">
            お問い合わせ
          </a>
        </div>

        <div className="stat-grid">
          <Reveal className="stat-card">
            <div className="label">
              <span className="pulse" />
              実務経験
            </div>
            <div className="value">5+ 年</div>
          </Reveal>
          <Reveal className="stat-card">
            <div className="label">
              <span className="pulse" />
              稼働実績
            </div>
            <div className="value">20+ 件</div>
          </Reveal>
          <Reveal className="stat-card">
            <div className="label">
              <span className="pulse" />
              対応クラウド
            </div>
            <div className="value">AWS / Xserver</div>
          </Reveal>
          <Reveal className="stat-card">
            <div className="label">
              <span className="pulse" />
              対応言語
            </div>
            <div className="value">日 / 中 / 英</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
