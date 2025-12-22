import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ServiceItemProps {
  img: string
  title: string
  text: string
  href: string
  isExternal?: boolean
}

function ServiceItem({ img, title, text, href, isExternal = true }: ServiceItemProps) {
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
        img="/my-app/images/test-photo2.svg"
        title="it_test"
        text="貴社のニーズに合わせた高品質なWebサイトを制作します。"
        href="https://tatu1206.github.io/it_test/"
      />
      <ServiceItem
        img="/my-app/images/service-design.svg"
        title="Snow"
        text="ブランドアイデンティティを高めるクリエイティブなデザインを提供します。"
        href="https://tatu1206.github.io/snow/"
      />
      <ServiceItem
        img="/my-app/images/service-print.svg"
        title="NoData"
        text="視覚的に訴求力のある高品質な印刷物を作成します。"
        href="/no-data"
        isExternal={false}
      />
    </div>
  )
}
