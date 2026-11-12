"""
Рендер прототипа empty state (mascot.html) в mp4 через headless Chromium: кадр за кадром по времени.

Запуск:
  python render.py grid dark        → empty_states_grid_dark.mp4  (1920×1080, 6 сцен сеткой)
  python render.py grid light       → empty_states_grid_light.mp4
  python render.py app dark         → empty_states_app_dark.mp4   (1080×1920, сцены по очереди как в приложении)
  python render.py stills grid dark 0.5 1.2 ...  → PNG-кадры в stills/ для быстрой проверки поз
"""
import os
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
FPS = 60
SIZES = {"grid": (1920, 1080, 1), "app": (540, 960, 2), "solo": (1920, 1080, 1)}


def open_page(p, mode, theme):
    w, h, dpr = SIZES[mode]
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=dpr)
    # solo: theme — имя сцены (обе темы рисуются рядом)
    query = f"?mode=solo&scene={theme}" if mode == "solo" else f"?mode={mode}&theme={theme}"
    page.goto((HERE / "mascot.html").as_uri() + query)
    page.evaluate("document.fonts.ready")
    return browser, page


def stills(mode, theme, times):
    out = HERE / "stills"
    out.mkdir(exist_ok=True)
    with sync_playwright() as p:
        browser, page = open_page(p, mode, theme)
        for t in times:
            page.evaluate(f"renderAt({t})")
            page.screenshot(path=str(out / f"{mode}_{theme}_{t:05.2f}.png"))
        browser.close()


def video(mode, theme):
    dst = HERE / (f"anim_{theme}.mp4" if mode == "solo" else f"empty_states_{mode}_{theme}.mp4")
    with sync_playwright() as p:
        browser, page = open_page(p, mode, theme)
        duration = page.evaluate("window.DURATION")
        frames = int(round(duration * FPS))
        ff = subprocess.Popen(
            [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error",
             "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "png", "-i", "-",
             "-c:v", "libx264", "-preset", "slow", "-crf", "12", "-tune", "film", "-x264-params", "aq-mode=3", "-pix_fmt", "yuv420p",
             "-movflags", "+faststart", str(dst)],
            stdin=subprocess.PIPE,
        )
        for i in range(frames):
            page.evaluate(f"renderAt({i / FPS})")
            ff.stdin.write(page.screenshot(type="png"))
            if i % 300 == 0:
                print(f"{mode}/{theme}: {i}/{frames}", flush=True)
        ff.stdin.close()
        ff.wait()
        browser.close()
    print("готово:", dst, f"{os.path.getsize(dst) / 1e6:.1f} МБ")


if __name__ == "__main__":
    if sys.argv[1] == "stills":
        stills(sys.argv[2], sys.argv[3], [float(x) for x in sys.argv[4:]])
    else:
        video(sys.argv[1], sys.argv[2])
