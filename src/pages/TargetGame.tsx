import { useEffect, useRef, useState } from 'react';

interface Target {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  speed: number;
  visible: boolean;
  visibleTime: number;
  nextToggle: number;
}

const TargetGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screen, setScreen] = useState<'title' | 'gallery' | 'settings' | 'game'>('title');
  const [score, setScore] = useState(0);
  const [volume, setVolume] = useState(0.05);
  
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const hitSoundRef = useRef<HTMLAudioElement | null>(null);
  const gameRunningRef = useRef(false);
  const currentTargetRef = useRef<Target | null>(null);
  const scoreFlashTimerRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number>(0);

  const WIDTH = 760;
  const HEIGHT = 560;

  // 背景画像のパス
  const BG_IMAGES = [
    '/my-app/assets/3d5430c1-e924-4e37-8350-12b9608f346e.jpg',
    '/my-app/assets/Fi9BU5wUoAAsYAA.jpg',
    '/my-app/assets/FjrkjPBUcAANfdA.jpg',
    '/my-app/assets/FllmRzMaEAAGSth.jpg'
  ];

  const galleryImages = [
    '/my-app/assets/FllmRzMaEAAGSth.jpg',
    '/my-app/assets/FjrkjPBUcAANfdA.jpg',
    '/my-app/assets/Fi9BU5wUoAAsYAA.jpg'
  ];

  const bgImagesLoadedRef = useRef<HTMLImageElement[]>([]);

  // BGM・SEの初期化
  useEffect(() => {
    bgmRef.current = new Audio('/my-app/assets/backBGM.mp3');
    bgmRef.current.loop = true;
    bgmRef.current.volume = volume;

    hitSoundRef.current = new Audio('/my-app/assets/ピコッ.mp3');
    hitSoundRef.current.volume = 0.5;

    // 背景画像の読み込み
    BG_IMAGES.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      bgImagesLoadedRef.current[idx] = img;
    });

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  // 音量変更
  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = volume;
    }
    if (hitSoundRef.current) {
      hitSoundRef.current.volume = Math.min(volume * 2, 1);
    }
  }, [volume]);

  // ターゲット生成
  const createTarget = (speed: number, visibleTime: number): Target => {
    const radius = 30;
    const x = Math.random() * (WIDTH - radius * 2) + radius;
    const y = Math.random() * (HEIGHT - radius * 2) + radius;
    
    let dx = 0, dy = 0;
    if (speed > 0) {
      const angle = Math.random() * Math.PI * 2;
      dx = Math.cos(angle) * speed;
      dy = Math.sin(angle) * speed;
    }

    return {
      x, y, radius, dx, dy, speed,
      visible: true,
      visibleTime,
      nextToggle: performance.now() + visibleTime
    };
  };

  // ターゲット更新
  const updateTarget = (target: Target, _delta: number): void => {
    if (target.speed > 0) {
      target.x += target.dx;
      target.y += target.dy;

      if (target.x < target.radius || target.x > WIDTH - target.radius) {
        target.dx *= -1;
      }
      if (target.y < target.radius || target.y > HEIGHT - target.radius) {
        target.dy *= -1;
      }
    }

    const now = performance.now();
    if (target.visibleTime < 900000 && now > target.nextToggle) {
      target.visible = !target.visible;
      target.nextToggle = now + target.visibleTime;
    }
  };

  // ターゲット描画
  const drawTarget = (ctx: CanvasRenderingContext2D, target: Target): void => {
    if (!target.visible) return;
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgb(255,136,172)';
    ctx.fill();
  };

  // ヒット判定
  const isHit = (target: Target, mx: number, my: number): boolean => {
    const dist = Math.hypot(mx - target.x, my - target.y);
    return dist < target.radius;
  };

  // スコアに応じた背景インデックス
  const getBgIndexByScore = (s: number): number => {
    if (s < 10) return 0;
    if (s < 20) return 1;
    if (s < 30) return 2;
    return 3;
  };

  // スコアに応じたターゲット生成
  const getTargetByScore = (s: number): Target => {
    if (s < 10) return createTarget(0, 999999);
    if (s < 20) return createTarget(3, 2000);
    if (s < 30) return createTarget(6, 1000);
    const vt = 500 + Math.random() * 1000;
    return createTarget(10, vt);
  };

  // ゲームループ
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = (timestamp: number) => {
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // キャンバスをクリア
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      if (gameRunningRef.current && screen === 'game') {
        // 背景描画
        const bgIndex = getBgIndexByScore(score);
        const bgImg = bgImagesLoadedRef.current[bgIndex];
        if (bgImg && bgImg.complete) {
          ctx.drawImage(bgImg, 0, 0, WIDTH, HEIGHT);
        }

        // ターゲット更新
        if (!currentTargetRef.current) {
          currentTargetRef.current = getTargetByScore(score);
        }
        updateTarget(currentTargetRef.current, delta);
        drawTarget(ctx, currentTargetRef.current);

        // スコア表示
        let textColor = '#000000';
        if (scoreFlashTimerRef.current > 0) {
          textColor = 'rgb(255,100,100)';
          scoreFlashTimerRef.current -= delta;
        }

        const scoreText = `⭐ ${score}`;
        ctx.font = '36px sans-serif';

        // アウトライン
        ctx.fillStyle = '#ffffff';
        const metrics = ctx.measureText(scoreText);
        const textWidth = metrics.width;
        const x = WIDTH - textWidth - 20;
        const y = 40;
        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy]) => {
          ctx.fillText(scoreText, x + dx, y + dy);
        });

        ctx.fillStyle = textColor;
        ctx.fillText(scoreText, x, y);
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [screen, score]);

  // キャンバスクリック
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameRunningRef.current || !currentTargetRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (isHit(currentTargetRef.current, mx, my) && currentTargetRef.current.visible) {
      const newScore = score + 1;
      setScore(newScore);
      scoreFlashTimerRef.current = 150;
      
      if (hitSoundRef.current) {
        hitSoundRef.current.currentTime = 0;
        hitSoundRef.current.play();
      }

      currentTargetRef.current = getTargetByScore(newScore);
    }
  };

  // スタートボタン
  const handleStart = () => {
    setScreen('game');
    if (bgmRef.current && bgmRef.current.paused) {
      bgmRef.current.play().catch(() => {});
    }
    setScore(0);
    scoreFlashTimerRef.current = 0;
    currentTargetRef.current = null;
    gameRunningRef.current = true;
  };

  // ゲーム終了
  const handleBackToTitle = () => {
    gameRunningRef.current = false;
    setScreen('title');
  };

  return (
    <div style={styles.container}>
      {/* タイトル画面 */}
      {screen === 'title' && (
        <div style={styles.screen}>
          <h1 style={styles.title}>的当てゲーム</h1>
          <div style={styles.centerButtons}>
            <button style={{...styles.button, ...styles.primaryButton}} onClick={handleStart}>
              スタート
            </button>
            <button style={{...styles.button, ...styles.secondaryButton}} onClick={() => setScreen('gallery')}>
              ギャラリー
            </button>
            <button style={{...styles.button, ...styles.secondaryButton}} onClick={() => setScreen('settings')}>
              設定
            </button>
          </div>
        </div>
      )}

      {/* ギャラリー画面 */}
      {screen === 'gallery' && (
        <div style={styles.screen}>
          <h2 style={styles.subtitle}>ギャラリー</h2>
          <div style={styles.galleryContainer}>
            {galleryImages.map((src, idx) => (
              <img key={idx} src={src} alt={`Gallery ${idx + 1}`} style={styles.galleryImage} />
            ))}
          </div>
          <button style={{...styles.button, ...styles.secondaryButton, ...styles.backButton}} onClick={() => setScreen('title')}>
            戻る
          </button>
        </div>
      )}

      {/* 設定画面 */}
      {screen === 'settings' && (
        <div style={styles.screen}>
          <h2 style={styles.subtitle}>設定</h2>
          <div style={styles.settingRow}>
            <p>音量調整</p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={styles.slider}
            />
          </div>
          <button style={{...styles.button, ...styles.secondaryButton, ...styles.backButton}} onClick={() => setScreen('title')}>
            戻る
          </button>
        </div>
      )}

      {/* ゲーム画面 */}
      {screen === 'game' && (
        <div style={styles.screen}>
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            onClick={handleCanvasClick}
            style={styles.canvas}
          />
          <button style={{...styles.button, ...styles.secondaryButton, ...styles.backButton}} onClick={handleBackToTitle}>
            タイトルに戻る
          </button>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    margin: 0,
    background: '#000',
    fontFamily: '"Meiryo", sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    color: '#fff',
    padding: '20px'
  },
  screen: {
    width: '800px',
    height: '600px',
    boxSizing: 'border-box',
    background: '#222',
    border: '2px solid #fff',
    position: 'relative',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: '40px',
    textAlign: 'center'
  },
  subtitle: {
    marginTop: '40px',
    textAlign: 'center'
  },
  centerButtons: {
    textAlign: 'center',
    marginTop: '40px'
  },
  button: {
    fontSize: '20px',
    padding: '10px 24px',
    margin: '10px',
    cursor: 'pointer',
    borderRadius: '8px',
    border: 'none'
  },
  primaryButton: {
    background: '#ff88aa',
    color: '#222'
  },
  secondaryButton: {
    background: '#555',
    color: '#fff'
  },
  backButton: {
    position: 'absolute',
    bottom: '20px',
    left: '20px'
  },
  canvas: {
    border: '2px solid #fff',
    background: '#000',
    display: 'block',
    margin: '0 auto',
    cursor: 'crosshair'
  },
  galleryContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '40px',
    flexWrap: 'wrap'
  },
  galleryImage: {
    width: '200px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '2px solid #fff'
  },
  settingRow: {
    marginTop: '60px',
    textAlign: 'center'
  },
  slider: {
    width: '60%'
  }
};

export default TargetGame;