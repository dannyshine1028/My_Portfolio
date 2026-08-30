import Reveal from "./Reveal";

const careers = [
  { company: "株式会社イレーオ", period: "2020年3月〜2021年12月", type: "正社員" },
  { company: "株式会社グレムリン・ワークス", period: "2022年2月〜2025年3月", type: "正社員" },
  { company: "株式会社エニーアップ", period: "2025年3月〜2025年11月", type: "業務委託" },
  { company: "フリーランス", period: "2025年11月〜現在", type: "—" },
];

export default function About() {
  return (
    <section id="about" className="section-block">
      <div className="wrap">
        <div className="section-title-block">
          <p className="section-eyebrow">01 — PROFILE</p>
          <h2 className="section-title">PROFILE</h2>
          <p className="section-desc">プロフィール</p>
        </div>

        <div className="profile-layout">
          <Reveal className="profile-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/profile.jpg" alt="林明のプロフィール写真" />
          </Reveal>
          <Reveal className="profile-body">
            <div className="fact-chips">
              <span className="chip chip-fact">
                <span className="chip-fact-label">ロール</span>
                フルスタックエンジニア
              </span>
              <span className="chip chip-fact">
                <span className="chip-fact-label">稼働形態</span>
                業務委託 / フルリモート
              </span>
            </div>
            <p>
              はじめまして。フルスタックエンジニアの林明（はやし
              あきら）と申します。台湾国立聯合大学 電機資訊學院
              情報工学科を卒業後、株式会社イレーオ・株式会社グレムリン・ワークスで実務を積み、現在はフリーランスとしてWebシステム開発を中心に活動しています。
            </p>
            <p>
              要件定義から設計・実装・運用まで一貫対応し、バックエンドを軸にフロントエンド・インフラ・AI領域まで横断的に担当できます。保守性・拡張性を重視した設計を得意とし、日本語・英語はビジネスレベル、フルリモートでの参画が可能です。
            </p>
            <ul className="profile-meta">
              <li>
                <strong>学歴</strong>
                台湾国立聯合大学 電機資訊學院 情報工学科（2019年10月卒）
              </li>
              <li>
                <strong>住所</strong>
                台湾 台北市 中山区 民泉 ERD 2区域 152番街 22番地
              </li>
            </ul>
            <h3 className="profile-career-title">経歴</h3>
            <ol className="timeline">
              {careers.map((c) => (
                <li className="timeline-item" key={c.company}>
                  <div className="timeline-marker" aria-hidden="true" />
                  <div className="timeline-content">
                    <p className="timeline-period">{c.period}</p>
                    <p className="timeline-company">{c.company}</p>
                    <span className="chip chip-outline">{c.type}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
