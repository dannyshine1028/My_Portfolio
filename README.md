# 林明 | Systems Engineer Portfolio (Next.js + DB版)

Next.js（App Router）+ TypeScript + PostgreSQLで構築した、システムエンジニア向けポートフォリオサイトです。
実績（プロジェクト）データはデータベースに保存され、`/admin` ページからパスワード認証で追加・編集・削除できます。

## 技術構成

- **フロントエンド**: Next.js 16 (App Router) / React 19 / TypeScript
- **API**: Next.js Route Handlers（Node.jsランタイム）
- **データベース**: PostgreSQL（Netlify DB を利用。`@netlify/database` 経由でアクセス）
- **認証**: 管理画面用の簡易パスワード認証（署名付きCookieセッション）
- **デプロイ先**: Netlify（`@netlify/plugin-nextjs` で自動構成）

## ファイル構成（抜粋）

```
/
├── netlify.toml                     … Netlifyのビルド・プラグイン設定
├── netlify/database/migrations/     … DBスキーマ・初期データ（マイグレーション）
├── src/
│   ├── app/
│   │   ├── page.tsx                 … トップページ（DBから実績を取得）
│   │   ├── admin/page.tsx           … 管理画面（ログイン＋実績CRUD）
│   │   ├── api/works/               … 実績の一覧取得・追加API
│   │   ├── api/works/[id]/          … 実績の更新・削除API
│   │   └── api/admin/               … ログイン・ログアウト・セッション確認API
│   ├── components/                  … 各セクションのUIコンポーネント
│   ├── data/skills.ts               … スキル一覧データ
│   └── lib/                         … 型定義・認証ロジック
└── public/assets/                   … ロゴ・プロフィール写真
```

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Netlify CLIの準備（データベースを使うために必須）

このプロジェクトは Netlify DB（マネージドPostgreSQL）を使うため、ローカル開発でも [Netlify CLI](https://docs.netlify.com/cli/get-started/) 経由で動かすことを推奨します。

```bash
npm install -g netlify-cli
netlify login
netlify link   # 既存のNetlifyサイトと連携（未作成の場合は `netlify init`）
```

### 3. データベースの作成

```bash
netlify database init
```

このコマンドで Postgres データベースが作成され、`netlify/database/migrations/0001_init.sql` のマイグレーションが自動的に適用されます（`works` テーブルの作成とサンプル実績データの投入）。

> **注意**: Netlify DBの利用には Credit-based プラン（従量課金プラン）への加入が必要な場合があります。詳細は Netlify のダッシュボードでご確認ください。

### 4. 環境変数の設定

`.env.example` を参考に、Netlifyのサイト設定（Site settings → Environment variables）に以下を追加してください。

| 変数名 | 説明 |
|---|---|
| `ADMIN_PASSWORD` | `/admin` ページのログインパスワード |
| `SESSION_SECRET` | セッションCookie署名用の秘密鍵（`openssl rand -hex 32` などで生成） |

ローカル開発では `netlify env:set` で設定するか、`.env` ファイル（`.gitignore`済み）に記載してください。

```bash
netlify env:set ADMIN_PASSWORD "任意の強力なパスワード"
netlify env:set SESSION_SECRET "$(openssl rand -hex 32)"
```

### 5. ローカルで起動

```bash
netlify dev
```

`netlify dev` を使うことで、Next.jsの開発サーバーとデータベース接続情報（`NETLIFY_DB_URL`）が自動的に連携されます。ブラウザで `http://localhost:8888` を開いてください。

（`npm run dev` で `next dev` を単体起動した場合、データベースには接続できません。実績セクションは空表示になりますが、他の部分は問題なく確認できます。）

## Netlifyへのデプロイ

### GitHub連携（推奨）

1. このプロジェクトを `dannyshine1028/My_Portfolio` リポジトリにpushします。
2. [Netlify](https://app.netlify.com) → **Add new site → Import an existing project** からリポジトリを選択します。
3. ビルド設定は `netlify.toml` に定義済みなのでそのままでOKです。
4. **Site settings → Environment variables** で `ADMIN_PASSWORD` と `SESSION_SECRET` を設定します。
5. **Deploy site** をクリックすると自動デプロイされます。データベースが未作成の場合は、初回デプロイ後に `netlify database init` を実行してください。

以後は `main` ブランチへのpushごとに自動で再デプロイされます。

## 管理画面（実績の追加・編集・削除）

1. `https://（あなたのサイト）/admin` にアクセスします。
2. 設定した `ADMIN_PASSWORD` でログインします。
3. フォームから実績を追加、または一覧から「編集」「削除」を行えます。
4. 保存内容はすべてデータベースに反映され、トップページの「実績」セクションに即座に表示されます。

## 画像・ロゴについて

- **プロフィール写真**: `public/assets/images/profile.jpg`（正方形にトリミング済み）。差し替える場合は同名で上書きしてください。
- **ロゴ**: `<LM/>` をモチーフにした新しいモノグラムロゴを作成し、`public/assets/logo/` に格納しています（SVGソースおよび各サイズのPNG・favicon）。ナビゲーションバーとブラウザタブに反映済みです。

## スキル・実績データの編集

- **スキル**: `src/data/skills.ts` を編集してください（フロントエンド、バックエンド、データベース、インフラ/CMS/モバイル、AI開発ツールの5カテゴリ）。
- **実績**: `/admin` から追加するか、`netlify/database/migrations/` に新しいマイグレーションファイルを追加してデータを投入することもできます。

## 掲載情報について（プライバシーに関する注記）

公開ページには番地までの詳細な住所は掲載せず、市区レベル（台北市 中山区）のみを表示しています。契約時など詳細な住所が必要な場合は、メール（itprosomething@gmail.com）でのやり取りをおすすめします。
