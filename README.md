# keii-dev.com

GitHub Pages で公開している個人サイト。
Vite + TypeScript + Tailwind CSS で構築。

---

## サイト構成

| URL | 内容 |
|---|---|
| `keii-dev.com/` | トップページ（プロジェクト一覧） |
| `keii-dev.com/poe2/` | Path of Exile 2 のビルド情報・攻略メモ |

---

## 技術スタック

| 技術 | 用途 |
|---|---|
| **Vite** | ビルドツール・開発サーバー |
| **TypeScript** | ロジック（Markdown読み込み・カードUI等） |
| **Tailwind CSS** | スタイリング（ユーティリティクラスベース） |
| **marked** | Markdown → HTML 変換（クライアントサイド） |
| **GitHub Actions** | push 時に自動ビルド → GitHub Pages へデプロイ |

---

## ディレクトリ構成

```
dev/
├── src/                          # ソースコード（HTML / TS / CSS）
│   ├── index.html                #   トップページ
│   ├── main.ts                   #   トップページの JS（フェードイン）
│   ├── style.css                 #   全体の CSS（カラーパレット・フォント定義）
│   └── poe2/
│       ├── index.html            #   PoE2 ページ
│       └── poe2.ts               #   Markdown 読み込み・カード描画ロジック
│
├── public/                       # 静的ファイル（ビルド時にそのまま dist/ へコピー）
│   ├── CNAME                     #   カスタムドメイン設定（keii-dev.com）
│   └── poe2/
│       ├── content.json          #   各セクションの Markdown ファイル一覧
│       ├── builds/               #   ビルドガイド用 .md + 画像
│       │   ├── images/           #     サムネイル画像置き場
│       │   ├── ChaosDoTLich_0.4.md
│       │   └── example-build.md
│       ├── notes/                #   ゲームプレイメモ用 .md
│       │   └── example-note.md
│       └── tips/                 #   Tips・メカニクス用 .md
│           └── example-tip.md
│
├── .github/workflows/deploy.yml  # GitHub Actions デプロイ設定
├── vite.config.ts                # Vite 設定（マルチページ対応）
├── tsconfig.json                 # TypeScript 設定
├── package.json                  # 依存関係・npm スクリプト
└── .gitignore                    # node_modules, dist を除外
```

---

## 開発コマンド

```bash
npm run dev       # ローカル開発サーバー起動（http://localhost:5173）
npm run build     # 本番ビルド（dist/ に出力）
npm run preview   # ビルド結果をローカルで確認
```

---

## デプロイの流れ

1. `main` ブランチに push する
2. GitHub Actions（`.github/workflows/deploy.yml`）が自動実行
3. `npm ci` → `npm run build` → `dist/` を GitHub Pages にデプロイ
4. 数分で `keii-dev.com` に反映

---

## PoE2 セクション：記事の追加・更新方法

### 1. Markdown ファイルを作成

対応するディレクトリに `.md` ファイルを置く：

| セクション | ディレクトリ |
|---|---|
| BUILDS | `public/poe2/builds/` |
| GAMEPLAY NOTES | `public/poe2/notes/` |
| TIPS & MECHANICS | `public/poe2/tips/` |

### 2. Markdown の書き方

```markdown
# 記事タイトル（カードのタイトルになる）

![サムネイル](images/filename.webp)

> 概要テキスト

---

## セクション見出し

本文...
```

**ルール：**
- 最初の `# 見出し` がカードのタイトルとして表示される
- 最初の `![...](...)` 画像がタイトル横のサムネイルになる（任意）
- サムネイルは本文からは自動的に除去される（二重表示にならない）
- 画像は `builds/images/` のように `images/` サブディレクトリに置く
- 画像形式は webp, png, jpg いずれも対応

### 3. content.json にファイル名を追加

`public/poe2/content.json` の対応する配列にファイル名を追記：

```json
{
  "builds": [
    "example-build.md",
    "ChaosDoTLich_0.4.md",
    "new-build.md"           ← 追加
  ],
  "notes": [ ... ],
  "tips": [ ... ]
}
```

### 4. push してデプロイ

```bash
git add public/poe2/
git commit -m "Add new build guide"
git push origin main
```

---

## スタイルのカスタマイズ

### カラーパレット

`src/style.css` の `@theme` ブロックで全ページ共通のカラーを定義：

```css
@theme {
  --color-retro-bg: #f5f0e8;        /* 背景（クリーム） */
  --color-retro-paper: #faf7f2;      /* カード背景（オフホワイト） */
  --color-retro-text: #3b3024;       /* 本文（ダークブラウン） */
  --color-retro-muted: #8a7e6e;      /* 補助テキスト */
  --color-retro-accent: #c07040;     /* アクセント（テラコッタ） */
  --color-retro-border: #d6cdbf;     /* ボーダー */
  ...
}
```

HTML/TS 内では `bg-retro-bg`, `text-retro-accent` 等の Tailwind クラスで参照。
色を変えたい場合はこのファイルだけ修正すれば全ページに反映される。

### フォント

| 用途 | フォント |
|---|---|
| 英語本文 | Inter |
| 日本語 | Noto Sans JP |
| コードブロック | JetBrains Mono |

Google Fonts から読み込み。変更する場合は各 HTML の `<link>` タグと `style.css` の `--font-sans` / `--font-mono` を修正。

---

## 新しいページの追加方法

1. `src/` に新しいディレクトリと `index.html` + `.ts` を作成
2. `vite.config.ts` の `rollupOptions.input` にエントリを追加：
   ```ts
   input: {
     main: resolve(__dirname, "src/index.html"),
     poe2: resolve(__dirname, "src/poe2/index.html"),
     newpage: resolve(__dirname, "src/newpage/index.html"),  // ← 追加
   },
   ```
3. トップページ（`src/index.html`）にリンクを追加
4. push してデプロイ

---

## GitHub 側の設定

- **Settings > Pages > Source**: 「GitHub Actions」を選択（「Deploy from a branch」ではない）
- **CNAME**: `public/CNAME` に `keii-dev.com` を記載済み
