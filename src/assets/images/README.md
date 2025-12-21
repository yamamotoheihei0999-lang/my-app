# images

コンポーネントからimportして使用する画像を配置します。

## 使用例

```jsx
import myImage from '../assets/images/photo.jpg'

function MyComponent() {
  return <img src={myImage} alt="説明" />
}
```

## 推奨される画像の種類
- 小〜中サイズの画像
- コンポーネント固有の画像
- アイコンやボタン画像
- バンドルに含めたい画像

## 注意
- 大きな画像（Hero画像など）は `public/images/` に配置推奨
- public配置の画像は `/images/photo.jpg` のように直接パスで参照

