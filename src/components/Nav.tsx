"use client";

import { useState } from "react";

const links = [
  { href: "#home", label: "ホーム" },
  { href: "#about", label: "プロフィール" },
  { href: "#skills", label: "スキル" },
  { href: "#works", label: "実績" },
  { href: "#contact", label: "お問い合わせ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav">
      <div className="wrap nav-inner">
        <a href="#home" className="nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo/logo.png" alt="林明 ロゴ" width={26} height={26} />
          <span className="prompt">lin-ming@dev:~$</span>
          <span className="cursor" />
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((v) => !v)}
        >
          --menu
        </button>
        <ul id="navLinks" className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
