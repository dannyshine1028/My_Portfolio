import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="eyebrow">profile</div>
        <h2>プロフィール</h2>
        <div className="about-grid">
          <Reveal className="avatar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/profile.jpg" alt="林明のプロフィール写真" />
          </Reveal>
          <div>
            <Reveal>
              <p>
                台湾・台北を拠点に活動するシステムエンジニアの林明（Lin
                Ming）です。PHP/Laravel、Python/FastAPI、React/Next.jsを中心としたWebアプリケーション開発から、AWSやXserverでのインフラ構築、WordPressやBubbleを使ったCMS・ノーコード開発、Flutterによるモバイルアプリ開発まで、企画から運用まで一貫して対応できることが強みです。Cursor・Claude
                Code・ChatGPTなどのAI開発ツールを積極的に活用し、開発スピードと品質の両立を図っています。日系企業との取引経験もあり、日本語でのコミュニケーションにも対応しています。
              </p>
            </Reveal>
            <Reveal>
              <ul className="spec-list">
                <li>
                  <span className="k">name</span>
                  <span className="v">林明（Lin Ming）</span>
                </li>
                <li>
                  <span className="k">nationality</span>
                  <span className="v">台湾</span>
                </li>
                <li>
                  <span className="k">location</span>
                  <span className="v">台北市 中山区, 台湾</span>
                </li>
                <li>
                  <span className="k">role</span>
                  <span className="v">Systems Engineer / フルスタック開発</span>
                </li>
                <li>
                  <span className="k">availability</span>
                  <span className="v">新規プロジェクト相談可</span>
                </li>
                <li>
                  <span className="k">email</span>
                  <span className="v">itprosomething@gmail.com</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
