export interface SkillItem {
  name: string;
  years: string;
  /** 1〜5 の評価 */
  rate: 1 | 2 | 3 | 4 | 5;
}

export interface SkillGroup {
  title: string;
  description: string;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "フロントエンド",
    description: "SPA・管理画面を中心に、React / Vue 系で実装しています。",
    items: [
      { name: "TypeScript / JavaScript", years: "6年", rate: 5 },
      { name: "React / Next.js", years: "6年", rate: 5 },
      { name: "Vue.js / Nuxt.js", years: "6年", rate: 5 },
      { name: "HTML5 / CSS", years: "7年", rate: 5 },
    ],
  },
  {
    title: "バックエンド",
    description: "API設計・実装を軸に、複数言語・FWで対応しています。",
    items: [
      { name: "PHP / Laravel", years: "6年", rate: 5 },
      { name: "Java / Spring Boot", years: "4年", rate: 4 },
      { name: "Go", years: "3年", rate: 4 },
      { name: "Python / Django", years: "3年", rate: 4 },
      { name: "Ruby on Rails", years: "3年", rate: 3 },
      { name: "C# / .NET", years: "3年", rate: 3 },
      { name: "Node.js / NestJS", years: "5年", rate: 5 },
    ],
  },
  {
    title: "データベース",
    description: "設計からチューニングまで対応可能です。",
    items: [
      { name: "MySQL", years: "6年", rate: 5 },
      { name: "PostgreSQL", years: "4年", rate: 4 },
      { name: "Oracle / SQL Server", years: "3年", rate: 3 },
      { name: "Redis / MongoDB", years: "3年", rate: 3 },
    ],
  },
  {
    title: "インフラ・クラウド",
    description: "AWS を中心に、GCP / Azure / Firebase も利用しています。",
    items: [
      { name: "AWS (EC2 / S3 / RDS / Lambda 等)", years: "6年", rate: 5 },
      { name: "GCP / Firebase", years: "4年", rate: 4 },
      { name: "Azure / OpenAI API", years: "3年", rate: 4 },
      { name: "Docker / Xserver", years: "6年", rate: 5 },
    ],
  },
  {
    title: "その他",
    description: "CMS・業務効率化・AI連携も対応しています。",
    items: [
      { name: "WordPress", years: "6年", rate: 5 },
      { name: "Salesforce (Apex / Flow)", years: "4年", rate: 4 },
      { name: "EC-CUBE", years: "3年", rate: 3 },
      { name: "Git / GitHub Actions", years: "6年", rate: 5 },
    ],
  },
];

export const certifications = [
  "基本情報技術者",
  "ITパスポート",
  "PHP8上級者",
  "Ruby技術者",
  "HTML5プロフェッショナル",
];
