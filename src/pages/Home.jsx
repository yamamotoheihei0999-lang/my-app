import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Services from '../components/Services.jsx'
import Sidebar from '../components/Sidebar.jsx'

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
