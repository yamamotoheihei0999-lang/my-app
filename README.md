# my-app

React + Vite アプリケーション。

開発:

```
npm install
npm run dev
```
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## 画像の置き場所（推奨）

- コンポーネントから import して使う画像: `src/assets/images/` に配置します（ビルド時にバンドラが処理します）。
  - 例: `import hero from './assets/images/sample-photo.svg'`  
    `<img src={hero} alt="メインビジュアル" loading="lazy" />`

- 直接 URL で参照する静的ファイル（OG 画像、固定パスで配るもの）: `public/images/` に配置します。
  - 例: `<meta property="og:image" content="/images/og-image.svg" />`

- 命名規則や最適化: 小文字・ハイフンで命名し、できれば WebP などで最適化してください。

### 画像最適化のメモ
- 本番では `cwebp` や `imagemin`、`sharp` などで WebP / JPEG を生成し、ブレークポイントごとに適切なサイズを用意してください。
- 例の実装では `public/images/photo-1-1600.webp` / `photo-1-1024.webp` といった WebP を優先し、フォールバックで JPEG を指定しています。