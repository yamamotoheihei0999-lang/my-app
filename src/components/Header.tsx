import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/style.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner container">
        <div className="site-logo">
          <img src="/my-app/images/logo.svg" alt="株式会社たつ ロゴ" />
          <h1 className="site-title">株式会社たつ</h1>
        </div>

        <nav className="global-nav" aria-label="グローバルナビゲーション">
          <ul className="nav-list">
            <li><Link to="/">トップ</Link></li>
            <li><a href="#topics">トピックス</a></li>
            <li><a href="#access">アクセス</a></li>
            <li><a href="#contact">お問い合わせ</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
