// ===========================
// 的当てゲーム Web 本気版
// ===========================

// 画面管理
const titleScreen   = document.getElementById("titleScreen");
const galleryScreen = document.getElementById("galleryScreen");
const settingScreen = document.getElementById("settingScreen");
const gameScreen    = document.getElementById("gameScreen");

function showScreen(screenId) {
  [titleScreen, galleryScreen, settingScreen, gameScreen].forEach(s => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

// ボタン取得
const startBtn       = document.getElementById("startBtn");
const galleryBtn     = document.getElementById("galleryBtn");
const settingBtn     = document.getElementById("settingBtn");
const galleryBackBtn = document.getElementById("galleryBackBtn");
const settingBackBtn = document.getElementById("settingBackBtn");
const gameBackBtn    = document.getElementById("gameBackBtn");

// キャンバス
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// BGM & SE
const bgm = new Audio("assets/backBGM.mp3");
bgm.loop = true;
bgm.volume = 0.05; // 初期音量

const hitSound = new Audio("assets/ピコッ.mp3");
hitSound.volume = 0.5;

// 背景画像
const BG_IMAGES = [
  "assets/3d5430c1-e924-4e37-8350-12b9608f346e.jpg", // 0〜9
  "assets/Fi9BU5wUoAAsYAA.jpg",                      // 10〜19
  "assets/FjrkjPBUcAANfdA.jpg",                      // 20〜29
  "assets/FllmRzMaEAAGSth.jpg"                       // 30〜
];
const bgImagesLoaded = [];
let bgLoadedCount = 0;

BG_IMAGES.forEach((src, idx) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    bgLoadedCount++;
  };
  bgImagesLoaded[idx] = img;
});

// ギャラリー画像（同じ画像を再利用）
const galleryImages = [
  "assets/FllmRzMaEAAGSth.jpg",
  "assets/FjrkjPBUcAANfdA.jpg",
  "assets/Fi9BU5wUoAAsYAA.jpg"
];

const galleryContainer = document.getElementById("galleryImages");

function loadGallery() {
  galleryContainer.innerHTML = "";
  galleryImages.forEach(path => {
    const img = document.createElement("img");
    img.src = path;
    galleryContainer.appendChild(img);
  });
}

// 設定画面：音量スライダー
const volumeSlider = document.getElementById("volumeSlider");
volumeSlider.value = bgm.volume;
volumeSlider.addEventListener("input", (e) => {
  const v = parseFloat(e.target.value);
  bgm.volume = v;
  hitSound.volume = Math.min(v * 2, 1); // SEは少し大きめ
});

// ゲームの状態
let score = 0;
let scoreFlashTimer = 0;
let currentTarget = null;
let lastTime = performance.now();
let currentLevelRange = [-1, -1];
let gameRunning = false;

// ターゲットクラス
class Target {
  constructor(speed, visibleTime) {
    this.radius = 30;
    this.speed = speed;
    this.visibleTime = visibleTime;  // ms
    this.visible = true;
    this.x = Math.random() * (WIDTH - this.radius * 2) + this.radius;
    this.y = Math.random() * (HEIGHT - this.radius * 2) + this.radius;

    if (speed === 0) {
      this.dx = 0;
      this.dy = 0;
    } else {
      const angle = Math.random() * Math.PI * 2;
      this.dx = Math.cos(angle) * this.speed;
      this.dy = Math.sin(angle) * this.speed;
    }

    this.nextToggle = performance.now() + this.visibleTime;
  }

  update(delta) {
    // 移動
    if (this.speed > 0) {
      this.x += this.dx;
      this.y += this.dy;

      // 画面端でバウンド
      if (this.x < this.radius || this.x > WIDTH - this.radius) {
        this.dx *= -1;
      }
      if (this.y < this.radius || this.y > HEIGHT - this.radius) {
        this.dy *= -1;
      }
    }

    // 点滅（visible切り替え）
    const now = performance.now();
    if (this.visibleTime < 900000 && now > this.nextToggle) {
      this.visible = !this.visible;
      this.nextToggle = now + this.visibleTime;
    }
  }

  draw(ctx) {
    if (!this.visible) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgb(255,136,172)";
    ctx.fill();
  }

  isHit(mx, my) {
    const dist = Math.hypot(mx - this.x, my - this.y);
    return dist < this.radius;
  }
}

// レベル設定（pygame版に合わせる）
function updateLevelByScore() {
  if (score < 10 && (currentLevelRange[0] !== 0 || currentLevelRange[1] !== 9)) {
    currentLevelRange = [0, 9];
    currentTarget = new Target(0, 999999); // 静止、常時表示
  } else if (score >= 10 && score < 20 && (currentLevelRange[0] !== 10 || currentLevelRange[1] !== 19)) {
    currentLevelRange = [10, 19];
    currentTarget = new Target(3, 2000);
  } else if (score >= 20 && score < 30 && (currentLevelRange[0] !== 20 || currentLevelRange[1] !== 29)) {
    currentLevelRange = [20, 29];
    currentTarget = new Target(6, 1000);
  } else if (score >= 30 && (currentLevelRange[0] !== 30 || currentLevelRange[1] !== 9999)) {
    currentLevelRange = [30, 9999];
    const vt = 500 + Math.random() * 1000;
    currentTarget = new Target(10, vt);
  }
}

// スコアに応じた背景画像インデックス
function getBgIndexByScore() {
  if (score < 10) return 0;
  if (score < 20) return 1;
  if (score < 30) return 2;
  return 3;
}

// ゲームループ
function gameLoop(timestamp) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  if (gameRunning) {
    // 背景描画
    const bgIndex = getBgIndexByScore();
    const bgImg = bgImagesLoaded[bgIndex];
    if (bgImg && bgLoadedCount === BG_IMAGES.length) {
      ctx.drawImage(bgImg, 0, 0, WIDTH, HEIGHT);
    } else {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    // レベル更新＆ターゲット更新
    if (!currentTarget) {
      updateLevelByScore();
    }
    currentTarget.update(delta);
    currentTarget.draw(ctx);

    // スコア表示
    let textColor = "#000000";
    if (scoreFlashTimer > 0) {
      textColor = "rgb(255,100,100)";
      scoreFlashTimer -= delta;
    }

    const scoreText = `⭐ ${score}`;
    ctx.font = "36px sans-serif";

    // 枠線用白アウトライン
    ctx.fillStyle = "#ffffff";
    const metrics = ctx.measureText(scoreText);
    const textWidth = metrics.width;
    const x = WIDTH - textWidth - 20;
    const y = 40;
    [[-1,0],[1,0],[0,-1],[0,1]].forEach(([dx,dy]) => {
      ctx.fillText(scoreText, x + dx, y + dy);
    });

    // 本体
    ctx.fillStyle = textColor;
    ctx.fillText(scoreText, x, y);
  }

  requestAnimationFrame(gameLoop);
}

// キャンバスクリックでヒット判定
canvas.addEventListener("click", (e) => {
  if (!gameRunning || !currentTarget) return;

  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  if (currentTarget.isHit(mx, my) && currentTarget.visible) {
    score += 1;
    scoreFlashTimer = 150; // 約0.15秒フラッシュ
    hitSound.currentTime = 0;
    hitSound.play();

    // スコアに応じて新しいターゲット
    if (score < 10) {
      currentTarget = new Target(0, 999999);
    } else if (score < 20) {
      currentTarget = new Target(3, 2000);
    } else if (score < 30) {
      currentTarget = new Target(6, 1000);
    } else {
      const vt = 500 + Math.random() * 1000;
      currentTarget = new Target(10, vt);
    }

    updateLevelByScore();
  }
});

// 画面遷移ボタンのイベント
startBtn.addEventListener("click", () => {
  showScreen("gameScreen");

  // 初回クリックでBGMをスタート（ブラウザの自動再生制限対策）
  if (bgm.paused) {
    bgm.play().catch(() => {});
  }

  score = 0;
  scoreFlashTimer = 0;
  currentTarget = null;
  currentLevelRange = [-1, -1];
  gameRunning = true;
});

galleryBtn.addEventListener("click", () => {
  loadGallery();
  showScreen("galleryScreen");
});

settingBtn.addEventListener("click", () => {
  showScreen("settingScreen");
});

// 戻る系
galleryBackBtn.addEventListener("click", () => {
  showScreen("titleScreen");
});

settingBackBtn.addEventListener("click", () => {
  showScreen("titleScreen");
});

gameBackBtn.addEventListener("click", () => {
  gameRunning = false;
  showScreen("titleScreen");
});

// ループ開始
requestAnimationFrame(gameLoop);
