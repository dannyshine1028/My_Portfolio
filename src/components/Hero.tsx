export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-bg"
          src="/assets/images/hero-fv.jpg"
          alt="Webシステム開発のイメージ"
        />
        <div className="hero-veil" aria-hidden="true" />
        <div className="wrap hero-content hero-content-center">
          <p className="hero-eyebrow">Hayashi　Akira&apos;s portfolio</p>
          <h1 className="hero-name">林　明</h1>
          <p className="hero-sub">Fullstack Engineer</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#works">
              実績を見る
            </a>
            <a className="btn btn-ghost" href="#contact">
              お問い合わせ
            </a>
          </div>
        </div>
        <a className="hero-scroll-cue" href="#about" aria-label="次のセクションへスクロール">
          <span />
        </a>
      </div>
    </section>
  );
}
