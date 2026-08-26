import Reveal from "./Reveal";
import type { Work } from "@/lib/types";

export default function Works({ works }: { works: Work[] }) {
  return (
    <section id="works" className="section-block">
      <div className="wrap">
        <div className="section-title-block">
          <h2 className="section-title">WORKS</h2>
          <p className="section-desc">実績</p>
        </div>

        {works.length === 0 ? (
          <p className="works-empty">まだ実績が登録されていません。/admin から追加してください。</p>
        ) : (
          <div className="works-cards">
            {works.map((w) => (
              <Reveal className="work-card" key={w.id}>
                <div className="work-card-image">
                  {w.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={w.image} alt={`${w.title} の画像`} />
                  ) : (
                    <div className="work-card-placeholder" aria-hidden="true">
                      <span>{w.title.slice(0, 1)}</span>
                    </div>
                  )}
                </div>
                <div className="work-card-body">
                  <h3 className="work-card-title">{w.title}</h3>
                  <p className="work-card-date">{w.date}</p>
                  <p className="work-card-desc">{w.description}</p>
                  <p className="work-card-tech">{w.tags.join(" / ")}</p>
                  {w.link && (
                    <a
                      className="work-card-link"
                      href={w.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      詳細を見る
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
