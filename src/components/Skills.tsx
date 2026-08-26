import Reveal from "./Reveal";
import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="eyebrow">skills</div>
        <h2>スキル</h2>
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <Reveal className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              {group.items.map((it) => (
                <div className="skill-row" key={it.name}>
                  <div className="skill-row-top">
                    <span className="name">
                      <span className={`status-dot ${it.status}`} />
                      {it.name}
                    </span>
                    <span>{it.level}%</span>
                  </div>
                  <div className="gauge">
                    <span style={{ width: `${it.level}%` }} />
                  </div>
                </div>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
