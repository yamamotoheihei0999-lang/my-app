import React, { useRef } from 'react'

const ChevronLeftIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRightIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const images = [
    { src: '/my-app/images/hero.svg', title: '株式会社たつ - メインビジュアル' },
    { src: '/my-app/images/test-photo1.svg', title: '株式会社たつ - サービス紹介' },
    { src: '/my-app/images/test-photo2.svg', title: '株式会社たつ - 事業内容' },
    { src: '/my-app/images/logo.svg', title: '株式会社たつ - 企業ロゴ' }
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300
      const newScrollPosition = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount 
        : scrollRef.current.scrollLeft + scrollAmount
      
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="hero-carousel">
      <div className="carousel-container">
        <button 
          className="carousel-btn carousel-btn-prev" 
          onClick={() => scroll('left')}
          aria-label="前の画像"
        >
          <ChevronLeftIcon />
        </button>
        
        <div className="carousel-track" ref={scrollRef}>
          {images.map((image, index) => (
            <div key={index} className="carousel-item">
              <img src={image.src} alt={image.title} />
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-btn carousel-btn-next" 
          onClick={() => scroll('right')}
          aria-label="次の画像"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </section>
  )
}
