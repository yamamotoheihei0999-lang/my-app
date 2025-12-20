import React from 'react'
import hero from '../assets/hero.svg'

export default function Hero() {
  return (
    <section className="hero container" aria-hidden="false">
      <img src={hero} alt="メインビジュアル" />
    </section>
  )
}
