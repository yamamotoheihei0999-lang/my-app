import React from 'react'

const FolderIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)

const FireIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 23a7.5 7.5 0 0 1-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14 1 0 2.5 0 5-2.47.27.773.5 1.604.5 2.47A7.5 7.5 0 0 1 12 23z" />
  </svg>
)

const TagIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
)

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">
          <FolderIcon size={18} />
          <span>カテゴリー</span>
        </h3>
        <ul className="sidebar-list">
          <li><a href="#">無料ブラウザゲーム</a></li>
          <li><a href="#">体験版</a></li>
          <li><a href="#">PR</a></li>
          <li><a href="#">レビュー</a></li>
          <li><a href="#">お知らせ</a></li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">
          <FireIcon size={18} />
          <span>人気記事</span>
        </h3>
        <ul className="sidebar-post-list">
          <li className="sidebar-post-item">
            <a href="#">
              <span className="post-title">サンプル記事タイトル1</span>
            </a>
          </li>
          <li className="sidebar-post-item">
            <a href="#">
              <span className="post-title">サンプル記事タイトル2</span>
            </a>
          </li>
          <li className="sidebar-post-item">
            <a href="#">
              <span className="post-title">サンプル記事タイトル3</span>
            </a>
          </li>
          <li className="sidebar-post-item">
            <a href="#">
              <span className="post-title">サンプル記事タイトル4</span>
            </a>
          </li>
          <li className="sidebar-post-item">
            <a href="#">
              <span className="post-title">サンプル記事タイトル5</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">
          <TagIcon size={18} />
          <span>タグ</span>
        </h3>
        <div className="sidebar-tags">
          <a href="#" className="tag-item">React</a>
          <a href="#" className="tag-item">TypeScript</a>
          <a href="#" className="tag-item">JavaScript</a>
          <a href="#" className="tag-item">CSS</a>
          <a href="#" className="tag-item">HTML</a>
          <a href="#" className="tag-item">Vite</a>
          <a href="#" className="tag-item">Node.js</a>
          <a href="#" className="tag-item">Web開発</a>
        </div>
      </div>
    </aside>
  )
}
