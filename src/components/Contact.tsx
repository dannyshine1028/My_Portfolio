"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const EMAIL = "itprosomething@gmail.com";
const CROWDWORKS_URL = "https://crowdworks.jp/public/employees/3957628";

export default function Contact() {
  const [hint, setHint] = useState("メールをコピー");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setHint("コピーしました");
    } catch {
      setHint("コピーに失敗しました");
    }
    setTimeout(() => setHint("メールをコピー"), 2000);
  }

  return (
    <section id="contact" className="section-block section-alt">
      <div className="wrap">
        <div className="section-title-block">
          <h2 className="section-title">CONTACT</h2>
          <p className="section-desc">お問い合わせ</p>
        </div>

        <Reveal className="contact-simple">
          <p>
            ご依頼・ご相談がありましたら、メールまたは CrowdWorks
            からお気軽にご連絡ください。
          </p>
          <ul className="contact-channels">
            <li>
              <a href={`mailto:${EMAIL}`}>
                <span className="contact-channel-label">Mail</span>
                <span className="contact-channel-value">{EMAIL}</span>
              </a>
            </li>
            <li>
              <a href={CROWDWORKS_URL} target="_blank" rel="noopener noreferrer">
                <span className="contact-channel-label">CrowdWorks</span>
                <span className="contact-channel-value">プロフィールを見る</span>
              </a>
            </li>
          </ul>
          <button className="btn btn-primary" type="button" onClick={copyEmail}>
            {hint}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
