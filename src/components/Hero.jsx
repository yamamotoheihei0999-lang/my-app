import React from 'react'

export default function Hero() {
  return (
    <section className="hero container" aria-hidden="false">
      <picture>
        <source media="(min-width:1200px)" srcSet="/images/photo-1-1600.svg" />
        <source media="(min-width:768px)" srcSet="/images/photo-1-1024.svg" />
        <img src="/images/photo-1.jpg" alt="メインビジュアル" loading="lazy" />
      </picture>
    </section>
  )
}
