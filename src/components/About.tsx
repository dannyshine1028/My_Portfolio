import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section-block">
      <div className="wrap">
        <div className="section-title-block">
          <h2 className="section-title">PROFILE</h2>
          <p className="section-desc">プロフィール</p>
        </div>

        <div className="profile-layout">
          <Reveal className="profile-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/profile.jpg" alt="林明のプロフィール写真" />
          </Reveal>
          <Reveal className="profile-body">
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
              <li className="profile-meta-block">
                <strong>経歴</strong>
                <div className="table-wrap">
                  <table className="skill-table career-table">
                    <thead>
                      <tr>
                        <th>会社</th>
                        <th>期間</th>
                        <th>雇用形態</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>株式会社イレーオ</td>
                        <td>2020年3月〜2021年12月</td>
                        <td>正社員</td>
                      </tr>
                      <tr>
                        <td>株式会社グレムリン・ワークス</td>
                        <td>2022年2月〜2025年3月</td>
                        <td>正社員</td>
                      </tr>
                      <tr>
                        <td>株式会社エニーアップ</td>
                        <td>2025年3月〜2025年11月</td>
                        <td>業務委託</td>
                      </tr>
                      <tr>
                        <td>フリーランス</td>
                        <td>2025年11月〜現在</td>
                        <td>—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li>
                <strong>住所</strong>
                台湾 台北市 中山区 民泉 ERD 2区域 152番街 22番地
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
