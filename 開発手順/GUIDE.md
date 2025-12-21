# 開発手順書（初心者向け）

このドキュメントは、React + Vite プロジェクトの開発手順を初心者向けに解説します。

## 📋 目次
1. [環境準備](#環境準備)
2. [プロジェクト構成](#プロジェクト構成)
3. [開発の流れ](#開発の流れ)
4. [主要機能の実装](#主要機能の実装)
5. [よく使うコマンド](#よく使うコマンド)
6. [トラブルシューティング](#トラブルシューティング)

---

## 🛠️ 環境準備

### 必要なツール
- **Node.js** (v20以上推奨)
- **Git**
- **VS Code** (推奨エディタ)

### 初回セットアップ

1. **リポジトリをクローン**
```bash
git clone <あなたのリポジトリURL>
cd my-app
```

2. **依存関係をインストール**
```bash
npm install
```

3. **開発サーバーを起動**
```bash
npm run dev
```
→ ブラウザで `http://localhost:5173` を開いてサイトを確認

---

## 📁 プロジェクト構成

```
my-app/
├── public/               # 静的ファイル（画像など）
│   └── images/          # 画像ファイル
├── src/                 # ソースコード
│   ├── assets/         # バンドルされる静的リソース
│   ├── components/     # 再利用可能なコンポーネント
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   └── Footer.jsx
│   ├── pages/          # ページコンポーネント
│   │   ├── Home.jsx
│   │   └── NoData.jsx
│   ├── styles/         # CSSファイル
│   │   ├── reset.css
│   │   └── style.css
│   ├── App.jsx         # ルートコンポーネント
│   ├── main.jsx        # エントリーポイント
│   └── index.css       # グローバルCSS
├── scripts/            # ビルドスクリプト
│   └── image-build.cjs # 画像最適化スクリプト
├── package.json        # 依存関係と npm スクリプト
├── vite.config.js      # Vite設定
└── index.html          # HTMLテンプレート
```

### 各フォルダの役割

- **public/** - ビルド時にそのままコピーされる静的ファイル（画像、favicon等）
- **src/components/** - ヘッダー、フッターなど再利用可能なUI部品
- **src/pages/** - 各ページの大枠を定義するコンポーネント
- **src/styles/** - CSSファイル（リセットCSS、共通スタイル）
- **scripts/** - 開発補助スクリプト（画像最適化など）

---

## 🔄 開発の流れ

### 基本的なワークフロー

1. **機能追加・変更**
   - エディタでファイルを編集
   - 保存すると自動でブラウザがリロード（HMR）

2. **動作確認**
   - ブラウザで `http://localhost:5173` を確認
   - エラーがあればターミナルとブラウザのコンソールをチェック

3. **変更をコミット**
```bash
git add .
git commit -m "変更内容の説明"
```

4. **リモートにプッシュ**
```bash
git push
```

---

## ⚙️ 主要機能の実装

### 1. 新しいページの追加

**例：お問い合わせページを作成**

#### ステップ1: ページコンポーネントを作成
`src/pages/Contact.jsx` を作成：
```jsx
import React from 'react'

export default function Contact() {
  return (
    <main className="container">
      <h2>お問い合わせ</h2>
      <p>お問い合わせフォームをここに配置します。</p>
    </main>
  )
}
```

#### ステップ2: ルーティングに追加
`src/App.jsx` を編集：
```jsx
import Contact from './pages/Contact'

// Routes の中に追加
<Route path="/contact" element={<Contact />} />
```

#### ステップ3: ナビゲーションリンクを追加
`src/components/Header.jsx` で：
```jsx
<li><Link to="/contact">お問い合わせ</Link></li>
```

---

### 2. 画像の追加・変更

#### 方法1: public フォルダに配置（推奨）

1. 画像を `public/images/` に配置
2. コンポーネントで参照：
```jsx
<img src="/images/your-image.jpg" alt="説明" />
```

#### 方法2: src/assets に配置（import して使う）

1. 画像を `src/assets/images/` に配置
2. コンポーネントで import：
```jsx
import myImage from '../assets/images/your-image.jpg'
<img src={myImage} alt="説明" />
```

#### 画像の最適化

レスポンシブ対応の画像を自動生成：
```bash
npm run images:build
```
→ `public/images/photo-1.jpg` から複数サイズの WebP/JPEG を生成

---

### 3. スタイルの変更

#### グローバルスタイルを変更
`src/styles/style.css` を編集：
```css
/* 例：サービスカードの背景色を変更 */
.service-item {
  background: #f9f9f9;
}
```

#### コンポーネント固有のスタイル
新しいCSSファイルを作成して import：
```jsx
import './MyComponent.css'
```

---

### 4. 新しいコンポーネントの作成

**例：ボタンコンポーネント**

`src/components/Button.jsx` を作成：
```jsx
import React from 'react'

export default function Button({ children, onClick, href }) {
  if (href) {
    return <a href={href} className="btn">{children}</a>
  }
  return <button onClick={onClick} className="btn">{children}</button>
}
```

使用例：
```jsx
import Button from './components/Button'

<Button href="/contact">お問い合わせ</Button>
```

---

## 🖥️ よく使うコマンド

### 開発中

```bash
# 開発サーバー起動
npm run dev

# リンター（コード品質チェック）実行
npm run lint

# 本番ビルド
npm run build

# ビルド結果をプレビュー
npm run preview

# 画像最適化
npm run images:build
```

### Git操作

```bash
# 変更状況を確認
git status

# 変更をステージング
git add .

# コミット
git commit -m "変更内容の説明"

# リモートにプッシュ
git push

# 最新の変更を取得
git pull

# ブランチを作成
git checkout -b feature/new-feature
```

---

## 🐛 トラブルシューティング

### よくある問題と解決方法

#### 1. npm コマンドが動かない（PowerShell）

**問題**: `npm` コマンドで「スクリプトの実行が無効」エラー

**解決策**:
```bash
# cmd を使う
cmd /c "npm run dev"

# または管理者権限でPowerShellの実行ポリシーを変更
Set-ExecutionPolicy RemoteSigned
```

#### 2. ポート 5173 が使用中

**問題**: 開発サーバーが起動しない

**解決策**:
```bash
# 別のポートを指定
npm run dev -- --port 3000
```

#### 3. 画像が表示されない

**確認項目**:
- 画像のパスが正しいか（`/images/` から始まる）
- ファイル名が正確か（大文字小文字を含む）
- 画像が `public/images/` に存在するか

#### 4. コンポーネントが反映されない

**解決策**:
1. ブラウザをハードリロード（Ctrl + Shift + R）
2. 開発サーバーを再起動
```bash
# Ctrl+C で停止
npm run dev
```

#### 5. ビルドエラー

**解決策**:
```bash
# node_modules を削除して再インストール
rm -rf node_modules
npm install
```

---

## 📚 さらに学ぶために

### 公式ドキュメント
- [React 公式ドキュメント](https://ja.react.dev/)
- [Vite 公式ドキュメント](https://ja.vitejs.dev/)
- [React Router](https://reactrouter.com/)

### 推奨リソース
- [MDN Web Docs](https://developer.mozilla.org/ja/) - HTML/CSS/JavaScript
- [JavaScript Primer](https://jsprimer.net/) - JavaScript基礎

---

## 💡 開発のヒント

### コードを書く前に
1. どの機能を追加するか明確にする
2. 既存のコンポーネントを再利用できないか確認
3. 小さな変更から始める

### デバッグのコツ
1. エラーメッセージを最後まで読む
2. ブラウザの開発者ツール（F12）を活用
3. `console.log()` で値を確認

### コミットメッセージの書き方
```bash
# 良い例
git commit -m "feat: サービス一覧に画像を追加"
git commit -m "fix: ヘッダーのリンク先を修正"
git commit -m "styles: ボタンの余白を調整"

# 避けるべき例
git commit -m "修正"
git commit -m "あああ"
```

---

## ✅ チェックリスト

新機能を追加したら確認：

- [ ] ローカルで動作確認済み
- [ ] リンターエラーがない（`npm run lint`）
- [ ] ビルドが成功する（`npm run build`）
- [ ] 他のページに影響がない
- [ ] レスポンシブ対応（モバイル表示も確認）
- [ ] 変更内容をコミットメッセージに記載

---

## 🆘 困ったときは

1. **エラーメッセージをコピー**してGoogle検索
2. このドキュメントの「トラブルシューティング」を確認
3. Git で前の状態に戻す：
```bash
git checkout .  # 未コミットの変更を破棄
git reset --hard HEAD  # 最後のコミットに戻る
```

---

**最終更新**: 2025年12月21日
