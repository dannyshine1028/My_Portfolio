"use client";

import { useState } from "react";

const links = [
  { href: "#about", label: "PROFILE" },
  { href: "#skills", label: "SKILL" },
  { href: "#works", label: "WORKS" },
  { href: "#contact", label: "CONTACT" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav">
      <div className="wrap nav-inner">
        <a href="#home" className="nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo/logo.png" alt="林明 ロゴ" width={32} height={32} />
          <span className="prompt">Akira Portfolio</span>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((v) => !v)}
        >
          MENU
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
