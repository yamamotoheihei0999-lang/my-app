import React from 'react'
import Hero from '../components/Hero'
import Services from '../components/Services'

export default function Home() {
  return (
    <main id="top">
      <Hero />
      
      <section id="topics" className="topics container">
        <h2 className="section-title">トピックス</h2>
        <div className="topics-content">
          <p>最新情報をお届けします。</p>
        </div>
      </section>

      <section id="services" className="services container">
        <h2 className="section-title">事業内容</h2>
        <Services />
      </section>

      <section id="works" className="works container">
        <h2 className="section-title">事例紹介</h2>
      </section>

      <section id="access" className="access container">
        <h2 className="section-title">アクセス</h2>
      </section>

      <section id="contact" className="contact container">
        <h2 className="section-title">お問い合わせ</h2>
      </section>
    </main>
  )
}
