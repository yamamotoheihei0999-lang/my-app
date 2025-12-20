import React from 'react'
import Hero from '../components/Hero'
import Services from '../components/Services'

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <section id="services" className="services container">
        <h2 className="section-title">事業内容</h2>
        <Services />
      </section>
    </main>
  )
}
