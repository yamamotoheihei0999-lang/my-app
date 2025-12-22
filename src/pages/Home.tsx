import React from 'react'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="page-layout">
      <main id="top" className="main-content">
        <Hero />
        <section id="services" className="services">
          <h2 className="section-title">事業内容</h2>
          <Services />
        </section>
      </main>
      <Sidebar />
    </div>
  )
}
