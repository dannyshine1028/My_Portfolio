export interface SkillItem {
  name: string;
  level: number;
  status: "on" | "beta";
}

export interface SkillGroup {
  title: string;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "フロントエンド",
    items: [
      { name: "TypeScript", level: 85, status: "on" },
      { name: "JavaScript", level: 85, status: "on" },
      { name: "React", level: 85, status: "on" },
      { name: "Next.js", level: 80, status: "on" },
      { name: "Nuxt.js", level: 65, status: "beta" },
    ],
  },
  {
    title: "バックエンド",
    items: [
      { name: "PHP / Laravel", level: 85, status: "on" },
      { name: "Python / FastAPI", level: 80, status: "on" },
      { name: "Node.js", level: 80, status: "on" },
      { name: "Java", level: 70, status: "on" },
    ],
  },
  {
    title: "データベース",
    items: [
      { name: "MySQL", level: 85, status: "on" },
      { name: "PostgreSQL", level: 80, status: "on" },
      { name: "Redis", level: 70, status: "on" },
      { name: "NoSQL (MongoDB等)", level: 65, status: "beta" },
    ],
  },
  {
    title: "インフラ / CMS / モバイル",
    items: [
      { name: "AWS", level: 85, status: "on" },
      { name: "Xserver", level: 80, status: "on" },
      { name: "WordPress", level: 80, status: "on" },
      { name: "Bubble", level: 65, status: "beta" },
      { name: "Flutter", level: 60, status: "beta" },
    ],
  },
  {
    title: "AI開発ツール",
    items: [
      { name: "Cursor", level: 90, status: "on" },
      { name: "Claude Code", level: 90, status: "on" },
      { name: "ChatGPT", level: 85, status: "on" },
    ],
  },
];
