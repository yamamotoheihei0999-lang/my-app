import React from 'react'

export default function Hero() {
  return (
    <section className="hero container" aria-hidden="false">
      <picture>
        {/* WebP first for browsers that support it */}
        <source media="(min-width:1200px)" type="image/webp" srcSet="/images/photo-1-1600.webp" />
        <source media="(min-width:768px)" type="image/webp" srcSet="/images/photo-1-1024.webp" />
        {/* Fallback to JPEG for older browsers */}
        <source media="(min-width:1200px)" type="image/jpeg" srcSet="/images/photo-1-1600.jpg" />
        <source media="(min-width:768px)" type="image/jpeg" srcSet="/images/photo-1-1024.jpg" />
        <img src="/images/photo-1.jpg" alt="メインビジュアル" loading="lazy" />
      </picture>
    </section>
  )
}
