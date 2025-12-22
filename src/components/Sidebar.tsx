import React from 'react'
import { FolderIcon, FireIcon, TagIcon } from './Icons'

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
          <FireIcon size={18} />
          <span>人気記事</span>
        
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">人気記事</h3>
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
          <TagIcon size={18} />
          <span>タグ</span>
        

      <div className="sidebar-section">
        <h3 className="sidebar-title">タグ</h3>
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
