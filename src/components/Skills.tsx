import Reveal from "./Reveal";
import { certifications, skillGroups } from "@/data/skills";

function Rate({ value }: { value: number }) {
  return (
    <span className={`rate rate${value}`} aria-label={`スキルレベル ${value} / 5`}>
      ★★★★★
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-block section-alt">
      <div className="wrap">
        <div className="section-title-block">
          <p className="section-eyebrow">02 — SKILL</p>
          <h2 className="section-title">SKILL</h2>
          <p className="section-desc">スキル</p>
        </div>

        <div className="skill-groups">
          {skillGroups.map((group) => (
            <Reveal className="skill-block" key={group.title}>
              <h3>{group.title}</h3>
              <p className="skill-block-desc">{group.description}</p>
              <ul className="skill-pill-list">
                {group.items.map((it) => (
                  <li className="skill-pill" key={it.name}>
                    <span className="skill-pill-name">{it.name}</span>
                    <span className="chip chip-outline skill-pill-years">{it.years}</span>
                    <Rate value={it.rate} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal className="skill-block">
            <h3>保有資格</h3>
            <p className="skill-block-desc">取得している資格です。</p>
            <ul className="chip-row">
              {certifications.map((c) => (
                <li className="chip" key={c}>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
