CREATE TABLE IF NOT EXISTS works (
  id SERIAL PRIMARY KEY,
  version TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PROD','BETA','ARCHIVED')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO works (version, date, status, title, description, tags, link) VALUES
('v4.1.0', '2026-06', 'PROD', 'ECサイト基幹システム クラウド移行', 'オンプレミス環境からAWSへ全面移行。可用性99.95%のシステムを実現し、インフラコストを約30%削減。', ARRAY['AWS','Terraform','Docker','ECS'], NULL),
('v3.5.0', '2026-01', 'PROD', 'コーポレートサイト刷新', 'Next.js + TypeScriptでコーポレートサイトをフルリニューアル。表示速度を大幅改善。', ARRAY['Next.js','React','TypeScript'], NULL),
('v3.0.0', '2025-09', 'PROD', '社内業務システム 新規構築', '受発注管理システムをPHP/Laravelでゼロから設計・開発。CI/CDパイプラインを整備し、リリース頻度を週1回に短縮。', ARRAY['PHP','Laravel','MySQL','AWS'], NULL),
('v2.4.0', '2025-02', 'PROD', '監視基盤の刷新', 'Zabbix / Grafanaによる統合監視基盤を構築し、障害検知までの時間を平均70%短縮。', ARRAY['Zabbix','Grafana','Python','FastAPI'], NULL),
('v1.8.0-beta', '2024-11', 'BETA', '社内向けチャットボット（検証中）', '問い合わせ対応を自動化するチャットボットをGo言語で試作し、社内トライアルを実施中。', ARRAY['Go','Docker','API連携'], NULL),
('v1.0.0', '2023-06', 'ARCHIVED', '在庫管理システム（初期案件）', '中小企業向け在庫管理システムの要件定義から実装・保守までを担当。', ARRAY['PHP','MySQL','Linux'], NULL);
