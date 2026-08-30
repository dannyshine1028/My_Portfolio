"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { VALID_STATUSES, type Work, type WorkStatus } from "@/lib/types";

const STATUS_LABEL: Record<WorkStatus, string> = {
  PROD: "本番運用中",
  BETA: "検証中",
  ARCHIVED: "終了済み",
};

export default function Works({ works }: { works: Work[] }) {
  const [filter, setFilter] = useState<WorkStatus | "ALL">("ALL");
  const filtered = filter === "ALL" ? works : works.filter((w) => w.status === filter);

  return (
    <section id="works" className="section-block">
      <div className="wrap">
        <div className="section-title-block">
          <p className="section-eyebrow">03 — WORKS</p>
          <h2 className="section-title">WORKS</h2>
          <p className="section-desc">実績</p>
        </div>

        {works.length === 0 ? (
          <p className="works-empty">まだ実績が登録されていません。/admin から追加してください。</p>
        ) : (
          <>
            <div className="works-filter">
              <button
                type="button"
                className={`chip chip-filter${filter === "ALL" ? " active" : ""}`}
                onClick={() => setFilter("ALL")}
              >
                すべて
              </button>
              {VALID_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`chip chip-filter${filter === s ? " active" : ""}`}
                  onClick={() => setFilter(s)}
                >
                  {STATUS_LABEL[s]}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="works-empty">該当する実績がありません。</p>
            ) : (
              <div className="works-cards">
                {filtered.map((w) => (
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
                      <span className={`status-badge status-${w.status.toLowerCase()}`}>
                        {STATUS_LABEL[w.status]}
                      </span>
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
          </>
        )}
      </div>
    </section>
  );
}
