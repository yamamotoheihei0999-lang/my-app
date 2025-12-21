import React from 'react'
import photo1_1600webp from '/images/photo-1-1600.webp'
import photo1_1024webp from '/images/photo-1-1024.webp'
import photo1_1600jpg from '/images/photo-1-1600.jpg'
import photo1_1024jpg from '/images/photo-1-1024.jpg'
import photo1 from '/images/photo-1.jpg'

export default function Hero() {
  return (
    <section className="hero container" aria-hidden="false">
      <picture>
        {/* WebP first for browsers that support it */}
        <source media="(min-width:1200px)" type="image/webp" srcSet={photo1_1600webp} />
        <source media="(min-width:768px)" type="image/webp" srcSet={photo1_1024webp} />
        {/* Fallback to JPEG for older browsers */}
        <source media="(min-width:1200px)" type="image/jpeg" srcSet={photo1_1600jpg} />
        <source media="(min-width:768px)" type="image/jpeg" srcSet={photo1_1024jpg} />
        <img src={photo1} alt="メインビジュアル" loading="lazy" />
      </picture>
    </section>
  )
}
