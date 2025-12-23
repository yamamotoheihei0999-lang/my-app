import React, { useState } from 'react'

export default function IdcsGame() {
  const [cookieInput, setcookieInput] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setResult('')

    // シミュレーション: 実際のAPIコールの代わりにダミー処理
    setTimeout(() => {
      setResult(`セッション確認完了！\n\n入力されたCookie情報を処理しました。\n\n接続ステータス: 成功\nセッション有効期限: 24時間`)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="page-layout">
      <main className="idcs-game-container">
        <h1 className="game-title">IDCS Session Tool</h1>
        <p className="game-description">
          Oracle Identity Cloud Serviceのセッション管理ツールです。
          Cookie情報を入力してセッションを確認できます。
        </p>

        <div className="game-card">
          <h2 className="section-title">Cookie情報を入力</h2>
          <form onSubmit={handleSubmit} className="cookie-form">
            <div className="form-group">
              <label htmlFor="cookie-input">Cookie値:</label>
              <textarea
                id="cookie-input"
                className="cookie-textarea"
                value={cookieInput}
                onChange={(e) => setcookieInput(e.target.value)}
                placeholder="ORA_OCIS_REQ=... などのCookie情報を入力してください"
                rows="6"
                required
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? '処理中...' : 'セッション確認'}
            </button>
          </form>

          {result && (
            <div className="result-box">
              <h3>結果:</h3>
              <pre>{result}</pre>
            </div>
          )}
        </div>

        <div className="game-info">
          <h3>使い方</h3>
          <ol>
            <li>ブラウザの開発者ツールでCookie情報を取得</li>
            <li>上のテキストエリアにCookie値を貼り付け</li>
            <li>「セッション確認」ボタンをクリック</li>
            <li>セッションの状態が表示されます</li>
          </ol>
          
          <p className="github-link-text">
            詳しい使い方は
            <a 
              href="https://github.com/yamamotoheihei0999-lang/idcs-session-reuse" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-link"
            >
              GitHubリポジトリ
            </a>
            をご覧ください。
          </p>
        </div>
      </main>
    </div>
  )
}
