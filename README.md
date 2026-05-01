# 在庫管理アプリ — Inventory Management App

商品の検索・在庫状況の一元管理を想定したWebアプリケーションです。  
ECサイトや小売業のバックオフィスツールをユースケースとして設計しました。

![Nuxt](https://img.shields.io/badge/Nuxt-3-00DC82?style=flat&logo=nuxt.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat&logo=tailwind-css&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D?style=flat&logo=vue.js&logoColor=white)

---

## 概要

担当者が日々の業務で使うことを想定し、**「すぐ探せる・すぐ把握できる」** を重視したUIを設計しています。  
検索・フィルタの組み合わせでスピーディに目的の商品へアクセスでき、在庫状況をダッシュボードでひと目に確認できます。

---

## 機能一覧

### 商品一覧・ダッシュボード

| 機能 | 詳細 |
|---|---|
| 統計サマリー | 全商品数・販売中・販売停止・在庫切れ件数をカードで表示 |
| リアルタイム検索 | 商品名・SKU に対してキー入力のたびに即時絞り込み |
| カテゴリフィルタ | Electronics / Clothing / Food & Drink / Books / Sports / Home & Garden の6カテゴリ |
| ステータスフィルタ | 販売中 / 販売停止 で絞り込み |
| 複合フィルタ | 検索・カテゴリ・ステータスを同時に組み合わせ可能 |
| 件数表示 | フィルタ後の商品件数をリアルタイムに反映 |

### 商品カード

| 項目 | 詳細 |
|---|---|
| 表示情報 | 商品名・SKU・カテゴリ・価格・在庫数・販売ステータス |
| 在庫切れ表示 | 在庫数 0 の商品は「在庫切れ」と強調表示 |
| カテゴリカラー | カテゴリごとにカラーアクセントを付与し、視認性を向上 |

### 商品詳細ページ

| 項目 | 詳細 |
|---|---|
| 表示情報 | 商品名・SKU・カテゴリ・価格・在庫数・商品説明 |
| 在庫ステータス | 在庫切れ / 残りわずか（10個以下）/ 在庫あり の3段階表示 |
| ナビゲーション | 一覧ページへのパンくず形式の戻りリンク |

---

## 技術スタック

| 技術 | バージョン | 採用理由 |
|---|---|---|
| [Nuxt 3](https://nuxt.com/) | ^3.13 | ファイルベースルーティング・Auto Import・SSR対応 |
| [Vue 3](https://vuejs.org/) | ^3.5 | Composition API による関心の分離 |
| [TypeScript](https://www.typescriptlang.org/) | ^5.5 | 型安全性の担保・IDEサポートの向上 |
| [Tailwind CSS](https://tailwindcss.com/) | ^3 | ユーティリティファーストによる高速なUI実装 |

---

## プロジェクト構成

```
inventory-app/
├── types/
│   └── product.ts          # Product / Category / Status の型定義
├── data/
│   └── products.ts         # ダミー商品データ（18件・6カテゴリ）
├── composables/
│   └── useProducts.ts      # 検索・絞り込みのリアクティブロジック
├── components/
│   ├── StatsBar.vue        # 統計サマリーカード
│   ├── FilterBar.vue       # 検索・フィルタUI
│   └── ProductCard.vue     # 商品カードコンポーネント
├── pages/
│   ├── index.vue           # 商品一覧ページ
│   └── products/[id].vue   # 商品詳細ページ
├── app.vue                 # 共通レイアウト（ヘッダー）
└── nuxt.config.ts
```

---

## 設計の考え方

### ロジックとUIの分離

検索・フィルタリングのロジックをすべて `useProducts` composable に集約しています。  
`computed` を使って宣言的に絞り込み結果を導出することで、ページコンポーネント側はデータの受け取りと表示に専念できます。

```ts
// composables/useProducts.ts（抜粋）
const filteredProducts = computed(() => {
  return products.filter((product) => {
    const matchesSearch = !query || product.name.includes(query) || product.sku.includes(query)
    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
    const matchesStatus = !selectedStatus.value || product.status === selectedStatus.value
    return matchesSearch && matchesCategory && matchesStatus
  })
})
```

### 型定義によるデータの一貫性

`Category` と `Status` を union 型として定義し、ダミーデータ・composable・各コンポーネントで共通の型を使用しています。  
入力値の範囲をコンパイル時に制約することで、実装ミスを早期に検出できる構造にしています。

```ts
// types/product.ts
export type Category = 'Electronics' | 'Clothing' | 'Food & Drink' | 'Books' | 'Sports' | 'Home & Garden'
export type Status = 'active' | 'inactive'
```

### コンポーネントの単一責任

`StatsBar` / `FilterBar` / `ProductCard` を独立したコンポーネントとして切り出し、`index.vue` はレイアウトの組み立てのみを担当しています。  
各コンポーネントが明確な責務を持つことで、後から機能を追加・変更する際の影響範囲を最小化しています。

### Vue 3.4+ の `defineModel` 活用

`FilterBar` の双方向データバインディングに `defineModel` を使用し、`emit` の定義を省略しています。  
親コンポーネントからは通常の `v-model` で扱えるため、インターフェースを直感的に保てます。

---

## セットアップ

**必要環境:** Node.js 18以上

```bash
# リポジトリのクローン
git clone <repository-url>
cd inventory-app

# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
# → http://localhost:3000
```

```bash
# プロダクションビルド
npm run build
npm run preview
```

---

## 今後の拡張案

実際のプロダクト化を想定した場合、以下の機能追加が考えられます。

- **バックエンド連携** — REST API または Supabase を接続し、リアルタイムデータを取得
- **CRUD操作** — 商品の新規登録・編集・削除フォームの追加
- **在庫アラート** — 設定した閾値を下回った商品の通知機能
- **CSVエクスポート** — 商品データの一括ダウンロード
- **ページネーション** — 商品数が増えた際のパフォーマンス対応
- **ソート機能** — 価格・在庫数・商品名での並び替え
- **認証** — ロールベースのアクセス制御（管理者 / 閲覧者）
