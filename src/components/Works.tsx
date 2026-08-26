import Reveal from "./Reveal";
import type { Work } from "@/lib/types";

export default function Works({ works }: { works: Work[] }) {
  return (
    <section id="works">
      <div className="wrap">
        <div className="eyebrow">deploy log</div>
        <h2>実績</h2>
        {works.length === 0 ? (
          <p className="works-empty">
            // まだ実績が登録されていません。/admin から追加してください。
          </p>
        ) : (
          <div className="log-list">
            {works.map((w) => (
              <Reveal className="log-entry" key={w.id} data-status={w.status}>
                <div className="log-meta">
                  <span className="version">{w.version}</span>
                  <span>{w.date}</span>
                  <span className={`badge ${w.status}`}>{w.status}</span>
                </div>
                <h3>{w.title}</h3>
                <p>{w.description}</p>
                <div className="tag-row">
                  {w.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                {w.link && (
                  <a className="log-link" href={w.link} target="_blank" rel="noopener noreferrer">
                    詳細を見る →
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
