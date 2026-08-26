export type WorkStatus = "PROD" | "BETA" | "ARCHIVED";

export interface Work {
  id: number;
  version: string;
  date: string;
  status: WorkStatus;
  title: string;
  description: string;
  tags: string[];
  link: string | null;
  /** public配下のパス例: /assets/images/works/sample.jpg */
  image: string | null;
}

export interface WorkInput {
  version: string;
  date: string;
  status: WorkStatus;
  title: string;
  description: string;
  tags: string[];
  link?: string | null;
  image?: string | null;
}

export const VALID_STATUSES: WorkStatus[] = ["PROD", "BETA", "ARCHIVED"];
