-- 既存DBのサンプル実績を履歴書・スキルシートベースの内容に差し替え
TRUNCATE TABLE works RESTART IDENTITY;

INSERT INTO works (version, date, status, title, description, tags, link) VALUES
('v6.0.0', '2026-06', 'PROD', '選挙ポスター掲示板マップ／アクションボード', '全国約12万件・700超自治体の選挙ポスター掲示板を地図上で可視化し、ボランティアの貼付進捗・完了報告・エラー対応を行うWebプラットフォームを企画から設計・開発まで一貫担当。大規模データでもスマホ中心の操作性を確保し、運営工数を大幅に削減。', ARRAY['Nuxt.js','Laravel 12','PHP 8.3','MySQL','AWS ECS','EC2'], NULL),
('v5.2.0', '2025-09', 'PROD', '建設機械向け音声AI Bot', '建機オペレーター向けに、音声入力からAI応答までをリアルタイム処理するハンズフリー対話システムを単独で要件定義〜運用まで担当。操作時の手入力を不要化し、現場の情報確認工数を約60%削減。', ARRAY['Next.js','TypeScript','Node.js','Azure OpenAI','Realtime API'], NULL),
('v5.0.0', '2025-05', 'PROD', 'BtoB卸売向け予約注文管理システム', 'Excel＋メール運用をWeb化し、在庫確認・予約注文・納期調整・請求までを一元管理。注文処理時間を平均70%短縮、注文エラー率を15%→2%未満に改善。設計およびバックエンド主担当。', ARRAY['Laravel 11','Vue 3','Inertia.js','MySQL','Redis','AWS'], NULL),
('v4.8.0', '2025-07', 'PROD', 'Salesforce再設計・基幹システムAPI連携', '営業・請求管理の効率化を目的に、Salesforceのオブジェクト再設計、Flow自動化、Apex実装、基幹・会計システムとのREST API連携を1名で担当。手作業業務を約60%削減。', ARRAY['Salesforce','Apex','Flow Builder','REST API'], NULL),
('v4.2.0', '2025-01', 'PROD', '生産管理システム リニューアル', 'Java 8 + StrutsのレガシーをSpring Boot + Vue.jsへ刷新。REST API・JWT認証・Spring Batchによる夜間集計を実装し、レスポンス平均40%短縮、月次集計を3人日→0.5人日に削減。', ARRAY['Java 17','Spring Boot','Vue.js','Oracle','Docker','AWS'], NULL),
('v3.5.0', '2024-06', 'PROD', 'ROOV compass / ROOV walk（3D空間体験）', 'Three.jsとFirebaseで建物内部の3Dモデル閲覧・家具配置・壁色変更・動画撮影を支援するデジタルツイン体験を単独開発。', ARRAY['Nuxt.js','Three.js','Firebase','Firestore'], 'https://roov.space/vr/wxgP4ooKkGn'),
('v2.8.0', '2023-05', 'PROD', '旅行特化AIガイドサイト', 'ChatGPT連携の旅行ガイドサービスで、SEO対策・Insight改善・API開発を担当。サブリーダーとしてページ設計から実装まで推進。', ARRAY['Ruby on Rails','Nuxt.js','Vue.js','MySQL','SEO'], 'http://travel.ava-intel.com'),
('v2.0.0', '2022-05', 'ARCHIVED', '衣装レンタル・運送管理システム（Studio Arc）', 'バックエンド部門のPMとして顧客折衝・要件定義〜運用保守を担当。チームマネジメント、インシデント対応、PL/SQLチューニングも実施。', ARRAY['Java','Spring Boot','Laravel','Vue.js','Oracle','PostgreSQL'], 'https://www.arc-web.com/'),
('v1.4.0', '2021-08', 'ARCHIVED', 'Adidas / Reebok ECサイト バックエンド保守・機能追加', '日本のAdidasShop・Reebok ECの通知・メール・在庫管理機能追加や管理画面改修を担当。大規模ECの既存コード把握とチーム開発を経験。', ARRAY['Java','C#','Spring Boot','React'], 'https://shop.adidas.jp/'),
('v1.0.0', '2021-01', 'ARCHIVED', '在庫管理システム開発（ロジレス）', '入荷・出荷・在庫管理システムのDB設計・プロジェクト設計を主担当。注文からの発注書発行、入荷自動登録などを実装。', ARRAY['PHP','Laravel','MySQL','AWS EC2'], 'https://www.logiless.com/');
