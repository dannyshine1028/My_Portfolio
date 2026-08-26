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
          <h2 className="section-title">SKILL</h2>
          <p className="section-desc">スキル</p>
        </div>

        <div className="skill-table-groups">
          {skillGroups.map((group) => (
            <Reveal className="skill-block" key={group.title}>
              <h3>{group.title}</h3>
              <p className="skill-block-desc">{group.description}</p>
              <div className="table-wrap">
                <table className="skill-table">
                  <thead>
                    <tr>
                      <th>技術</th>
                      <th>経験年数</th>
                      <th>スキル</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((it) => (
                      <tr key={it.name}>
                        <td>{it.name}</td>
                        <td>{it.years}</td>
                        <td>
                          <Rate value={it.rate} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          ))}

          <Reveal className="skill-block">
            <h3>保有資格</h3>
            <p className="skill-block-desc">取得している資格です。</p>
            <div className="table-wrap">
              <table className="skill-table cert-table">
                <thead>
                  <tr>
                    <th>資格</th>
                  </tr>
                </thead>
                <tbody>
                  {certifications.map((c) => (
                    <tr key={c}>
                      <td>{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
