import pygame
import random
import sys
import math

# 初期化
pygame.init()

# 画面のサイズ
screen_width = 800
screen_height = 600
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("的当てゲーム")

# サウンドのロード
hit_sound = pygame.mixer.Sound("ピコッ.mp3")  # ヒット時の効果音
background_music = pygame.mixer.Sound("backBGM.mp3")  # 背景音楽

# 背景音楽の音量を設定する
background_music.set_volume(0.01)  # 1%の音量

# サウンドの再生
background_music.play(-1)  # -1を渡すことでループ再生

# 色
white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)
target = (255,136,172)

# 背景画像を読み込む
background_image = pygame.image.load("background.jpg")
background_image = pygame.transform.scale(background_image, (screen_width, screen_height))

# 時計
clock = pygame.time.Clock()

# 的のクラス
class Target:
    def __init__(self, speed, visible_time):
        self.radius = 30
        self.x = random.randint(self.radius, screen_width - self.radius)
        self.y = random.randint(self.radius, screen_height - self.radius)
        self.color = target
        self.dx = random.choice([-1, 1]) * speed
        self.dy = random.choice([-1, 1]) * speed
        self.visible = True
        self.visible_interval = visible_time
        self.next_toggle_time = pygame.time.get_ticks() + visible_time

    def move(self):
        if self.dx == 0 and self.dy == 0:
            return  # 移動しない場合は何もしない
        self.x += self.dx
        self.y += self.dy
        if self.x <= self.radius or self.x >= screen_width - self.radius:
            self.dx *= -1
        if self.y <= self.radius or self.y >= screen_height - self.radius:
            self.dy *= -1

    def update_visibility(self):
        now = pygame.time.get_ticks()
        if now >= self.next_toggle_time:
            self.visible = not self.visible
            self.next_toggle_time = now + self.visible_interval  # 次の切り替えタイミングを更新

    def update(self):
        self.move()
        self.update_visibility()

    def draw(self):
        if self.visible:
            pygame.draw.circle(screen, self.color, (self.x, self.y), self.radius)

#難易度
class Level:
    def __init__(self, target_speed, target_count):
        self.target_speed = target_speed  # 的の移動速度
        self.target_count = target_count  # 的の数

# レベルを定義する
easy_level = Level(target_speed=0, target_count=1)  # 簡単なレベル
medium_level = Level(target_speed=1, target_count=1)  # 普通のレベル
hard_level = Level(target_speed=2, target_count=15)  # 難しいレベル

def gallery_screen():
    # 表示する画像のリスト
    gallery_images = [
        "FllmRzMaEAAGSth.jpg",
        "FjrkjPBUcAANfdA.jpg",
        "Fi9BU5wUoAAsYAA.jpg"
    ]

    # 読み込んでリサイズ（例: 幅200 x 高さ150）
    loaded_images = [pygame.transform.scale(pygame.image.load(img), (200, 150)) for img in gallery_images]

    while True:
        screen.fill(white)

        # タイトル
        font = pygame.font.Font("PixelMplus10-Regular.ttf", 48)
        title_text = font.render("ギャラリー", True, black)
        screen.blit(title_text, (screen_width // 2 - title_text.get_width() // 2, 50))

        # 横に画像を並べて描画
        start_x = 100  # 最初の画像のX座標
        y = 200        # 画像のY座標

        for img in loaded_images:
            screen.blit(img, (start_x, y))
            start_x += img.get_width() + 30  # 次の画像の位置をずらす（30px 間隔）

        # 戻るボタン
        font = pygame.font.Font("PixelMplus10-Regular.ttf", 24)
        return_button = pygame.Rect(screen_width // 2 - 100, 500, 200, 40)
        pygame.draw.rect(screen, black, return_button)
        return_text = font.render("戻る", True, white)
        screen.blit(return_text, (return_button.centerx - return_text.get_width() // 2, return_button.centery - return_text.get_height() // 2))

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                if return_button.collidepoint(event.pos):
                    title_screen()  # タイトル画面に戻る
                    return           # ギャラリー画面ループを終了

        pygame.display.update()

def setting_screen():
    while True:
        screen.fill(white)  # 背景を白で塗りつぶす

        # タイトルを描画
        font = pygame.font.Font("PixelMplus10-Regular.ttf", 48)
        title_text = font.render("設定", True, black)
        screen.blit(title_text, (screen_width // 2 - title_text.get_width() // 2, 200))

        # 音量調整用のスライダーを描画
        font = pygame.font.Font("PixelMplus10-Regular.ttf", 24)
        volume_text = font.render("音量調整", True, black)
        screen.blit(volume_text, (screen_width // 2 - 100, 300))
        
        # 背景音楽の音量を調整するスライダー
        background_music_volume_slider = pygame.Rect(screen_width // 2 - 100, 350, 200, 20)
        pygame.draw.rect(screen, black, background_music_volume_slider)
        background_music_volume = background_music.get_volume()
        background_music_slider_pos = ((background_music_volume_slider.width - 10) * background_music_volume) + background_music_volume_slider.left
        pygame.draw.circle(screen, white, (int(background_music_slider_pos), background_music_volume_slider.centery), 10)

        # returnボタンを描画
        font = pygame.font.Font("PixelMplus10-Regular.ttf", 24)
        return_button = pygame.Rect(screen_width // 2 - 100, 430, 200, 30)
        pygame.draw.rect(screen, black, return_button)
        return_text = font.render("戻る", True, white)
        screen.blit(return_text, (return_button.centerx - return_text.get_width() // 2, return_button.centery - return_text.get_height() // 2))

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                # 背景音楽の音量を調整する
                if background_music_volume_slider.collidepoint(event.pos):
                    slider_x = event.pos[0]
                    background_music_volume = max(0, min(1, (slider_x - background_music_volume_slider.left) / background_music_volume_slider.width))
                    background_music.set_volume(background_music_volume)
                elif return_button.collidepoint(event.pos):
                    title_screen()  # タイトル画面へ遷移

        pygame.display.update()

# ゲームループ
def game_loop():
    score = 0
    score_flash_timer = 0
    target = None
    background_images = ["Fi9BU5wUoAAsYAA.jpg", "FjrkjPBUcAANfdA.jpg", "FllmRzMaEAAGSth.jpg"]
    current_level = None
    current_level_score_range = (-1, -1)

    running = True
    while running:
        # レベルごとのターゲット生成（初回 or スコア変化時のみ）
        if score < 10 and current_level_score_range != (0, 9):
            current_level = easy_level
            current_level_score_range = (0, 9)
            target = Target(speed=0, visible_time=999999)  # 静止・常に表示
        elif 10 <= score < 20 and current_level_score_range != (10, 19):
            current_level = medium_level
            current_level_score_range = (10, 19)
            target = Target(speed=3, visible_time=2000)
        elif 20 <= score < 30 and current_level_score_range != (20, 29):
            current_level = hard_level
            current_level_score_range = (20, 29)
            target = Target(speed=6, visible_time=1000)
        elif score >= 30 and current_level_score_range != (30, 9999):
            current_level = hard_level
            current_level_score_range = (30, 9999)
            target = Target(speed=10, visible_time=random.randint(500, 1500))

        # 背景の切り替え
        if score < 10:
            background_image = pygame.image.load("3d5430c1-e924-4e37-8350-12b9608f346e.jpg")
        elif score < 20:
            background_image = pygame.image.load(background_images[0])
        elif score < 30:
            background_image = pygame.image.load(background_images[1])
        else:
            background_image = pygame.image.load(background_images[2])
        background_image = pygame.transform.scale(background_image, (screen_width, screen_height))

        screen.blit(background_image, (0, 0))  # 背景画像を描画

        # 戻るボタン
        font = pygame.font.Font("PixelMplus10-Regular.ttf", 24)
        back_button = pygame.Rect(10, screen_height - 50, 100, 40)
        pygame.draw.rect(screen, black, back_button)
        back_text = font.render("戻る", True, white)
        screen.blit(back_text, (back_button.centerx - back_text.get_width() // 2,
                                back_button.centery - back_text.get_height() // 2))

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.MOUSEBUTTONDOWN:
                mouse_x, mouse_y = pygame.mouse.get_pos()

                # 戻るボタン
                if back_button.collidepoint(event.pos):
                    title_screen()
                    return

                # 的の当たり判定
                if target.visible:
                    distance = math.hypot(mouse_x - target.x, mouse_y - target.y)
                    if distance < target.radius:
                        score += 1
                        hit_sound.play()
                        score_flash_timer = 15

                        # スコアによって新しい的を生成
                        if score < 10:
                            target = Target(0, 999999)
                        elif score < 20:
                            target = Target(3, 2000)
                        elif score < 30:
                            target = Target(6, 1000)
                        else:
                            target = Target(10, random.randint(500, 1500))

        # 的の動作・描画
        target.update()
        target.draw()

        # スコア表示
        font = pygame.font.Font("PixelMplus10-Regular.ttf", 36)
        score_text = f"⭐ {score}"  # ⭐ 絵文字を使う

        # フラッシュ（明るく点滅）
        if score_flash_timer > 0:
            text_color = (255, 100, 100)  # ピンク系に点滅
            score_flash_timer -= 1
        else:
            text_color = black

        text_render = font.render(score_text, True, text_color)

        # 表示位置（画面右上）
        text_x = screen_width - text_render.get_width() - 20
        text_y = 20

        # 白い縁取りを描く（上下左右に白を描いてから本体）
        outline_color = white
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            outline = font.render(score_text, True, outline_color)
            screen.blit(outline, (text_x + dx, text_y + dy))

        # 描画
        screen.blit(text_render, (text_x, text_y))

        pygame.display.update()
        clock.tick(30)


# タイトル画面
def title_screen():
    while True:
        screen.fill(white)  # 背景を白で塗りつぶす

        # タイトルを描画
        font = pygame.font.Font("PixelMplus10-Regular.ttf", 48)
        title_text = font.render("的当てゲーム", True, black)
        screen.blit(title_text, (screen_width // 2 - title_text.get_width() // 2, 200))

        # スタートボタンを描画
        start_button = pygame.Rect(screen_width // 2 - 100, 300, 200, 50)
        pygame.draw.rect(screen, black, start_button)
        font = pygame.font.Font("PixelMplus10-Regular.ttf", 36)
        start_text = font.render("スタート", True, white)
        screen.blit(start_text, (start_button.centerx - start_text.get_width() // 2, start_button.centery - start_text.get_height() // 2))

        # ギャラリーボタンを描画
        gallery_button = pygame.Rect(screen_width // 2 - 100, 400, 200, 50)
        pygame.draw.rect(screen, black, gallery_button)
        gallery_text = font.render("ギャラリー", True, white)
        screen.blit(gallery_text, (gallery_button.centerx - gallery_text.get_width() // 2, gallery_button.centery - gallery_text.get_height() // 2))

        # 設定を描画
        setting_button = pygame.Rect(screen_width // 2 + 100, 400, 200, 50)
        pygame.draw.rect(screen, white, setting_button)
        setting_text = font.render("設定", True, black)
        screen.blit(setting_text, (setting_button.centerx - setting_text.get_width() // 2, setting_button.centery - setting_text.get_height() // 2))
        pygame.display.update()

        # イベント処理
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                if start_button.collidepoint(event.pos):
                    game_loop()  # ゲーム画面へ遷移
                elif gallery_button.collidepoint(event.pos):
                    gallery_screen()  # ギャラリー画面へ遷移
                elif setting_button.collidepoint(event.pos):
                    setting_screen()  # 設定画面へ遷移

# タイトル画面を表示
title_screen()