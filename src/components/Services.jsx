import React from 'react'
import { Link } from 'react-router-dom'

function ServiceItem({ img, title, text, href, isExternal = true }) {
  return (
    <article className="service-item">
      <img src={img} alt={title} />
      <h3 className="service-title">{title}</h3>
      <p className="service-text">{text}</p>
      {isExternal ? (
        <a href={href} className="service-link" target="_blank" rel="noopener noreferrer">詳しく見る</a>
      ) : (
        <Link to={href} className="service-link">詳しく見る</Link>
      )}
    </article>
  )
}

export default function Services() {
  return (
    <div className="service-list">
      <ServiceItem
        img="/my-app/assets/background.jpg"
        title="Web制作"
        text="貴社のニーズに合わせた高品質なWebサイトを制作します。"
        href="https://tatu1206.github.io/it_test/"
      />
      <ServiceItem
        img="/my-app/assets/background1.jpg"
        title="グラフィックデザイン"
        text="ブランドアイデンティティを高めるクリエイティブなデザインを提供します。"
        href="https://tatu1206.github.io/snow/"
      />
      <ServiceItem
        img="/my-app/assets/background2.jpg"
        title="印刷物制作"
        text="視覚的に訴求力のある高品質な印刷物を作成します。"
        href="/no-data"
        isExternal={false}
      />
      <ServiceItem
        img="/my-app/assets/background3.jpg"
        title="的当てゲーム"
        text="楽しい的当てゲームで遊べます。スコアに応じて難易度が上がります。"
        href="/target-game"
        isExternal={false}
      />
    </div>
  )
}
