"""
SmartToolzAI — Mass Search Engine Submission Script
Submits ALL site URLs to:
  - IndexNow API (covers Bing, Yandex, Seznam, Naver, Baidu partners)
  - Google Ping (sitemap ping)
  - Bing Webmaster API

Run this script every time you add new pages!
Usage: python submit_to_search_engines.py
"""

import urllib.request
import urllib.parse
import json
import time

# ===========================
# CONFIGURATION
# ===========================
SITE_URL = "https://smarttoolzai.com"
SITEMAP_URL = "https://smarttoolzai.com/sitemap.xml"
INDEXNOW_KEY = "a8f3c9d2e1b47605f9e2d8c3a1b47605"
KEY_LOCATION = f"{SITE_URL}/{INDEXNOW_KEY}.txt"

# All URLs to submit
ALL_URLS = [
    "https://smarttoolzai.com/",
    # AI Tools
    "https://smarttoolzai.com/tools/ai-email-generator.html",
    "https://smarttoolzai.com/tools/ai-title-generator.html",
    "https://smarttoolzai.com/tools/ai-hashtag-generator.html",
    "https://smarttoolzai.com/tools/ai-post-generator.html",
    "https://smarttoolzai.com/tools/ai-paragraph-rewriter.html",
    "https://smarttoolzai.com/tools/ai-bio-generator.html",
    "https://smarttoolzai.com/tools/ai-business-name-generator.html",
    "https://smarttoolzai.com/tools/ai-slogan-generator.html",
    "https://smarttoolzai.com/tools/ai-meta-description-generator.html",
    # Utility Tools
    "https://smarttoolzai.com/tools/word-counter.html",
    "https://smarttoolzai.com/tools/password-generator.html",
    "https://smarttoolzai.com/tools/case-converter.html",
    "https://smarttoolzai.com/tools/age-calculator.html",
    "https://smarttoolzai.com/tools/lorem-generator.html",
    "https://smarttoolzai.com/tools/qr-generator.html",
    "https://smarttoolzai.com/tools/color-picker.html",
    "https://smarttoolzai.com/tools/image-compressor.html",
    "https://smarttoolzai.com/tools/embed-widget.html",
    "https://smarttoolzai.com/tools/pdf-compressor.html",
    "https://smarttoolzai.com/tools/pdf-merger.html",
    # Unit Converters
    "https://smarttoolzai.com/tools/length-converter.html",
    "https://smarttoolzai.com/tools/weight-converter.html",
    "https://smarttoolzai.com/tools/temperature-converter.html",
    "https://smarttoolzai.com/tools/volume-converter.html",
    "https://smarttoolzai.com/tools/area-converter.html",
    "https://smarttoolzai.com/tools/speed-converter.html",
    "https://smarttoolzai.com/tools/time-converter.html",
    "https://smarttoolzai.com/tools/data-storage-converter.html",
    "https://smarttoolzai.com/tools/pressure-converter.html",
    "https://smarttoolzai.com/tools/energy-converter.html",
    # Pages
    "https://smarttoolzai.com/pages/about.html",
    "https://smarttoolzai.com/pages/contact.html",
    "https://smarttoolzai.com/pages/privacy-policy.html",
    "https://smarttoolzai.com/pages/terms.html",
    # Blog Pages
    "https://smarttoolzai.com/blog/index.html",
    "https://smarttoolzai.com/blog/km-to-miles.html",
    "https://smarttoolzai.com/blog/celsius-to-fahrenheit.html",
    "https://smarttoolzai.com/blog/kg-to-lbs.html",
    "https://smarttoolzai.com/blog/liters-to-gallons.html",
    "https://smarttoolzai.com/blog/feet-to-meters.html",
    "https://smarttoolzai.com/blog/mph-to-kmh.html",
    "https://smarttoolzai.com/blog/mb-to-gb.html",
    "https://smarttoolzai.com/blog/inches-to-cm.html",
    "https://smarttoolzai.com/blog/psi-to-bar.html",
    "https://smarttoolzai.com/blog/calories-to-joules.html",
    # Spanish (es/)
    "https://smarttoolzai.com/es/index.html",
    "https://smarttoolzai.com/es/tools/pdf-compressor.html",
    "https://smarttoolzai.com/es/tools/pdf-merger.html",
    "https://smarttoolzai.com/es/tools/word-counter.html",
    "https://smarttoolzai.com/es/tools/length-converter.html",
    # Portuguese (pt/)
    "https://smarttoolzai.com/pt/index.html",
    "https://smarttoolzai.com/pt/tools/pdf-compressor.html",
    "https://smarttoolzai.com/pt/tools/pdf-merger.html",
    "https://smarttoolzai.com/pt/tools/word-counter.html",
    "https://smarttoolzai.com/pt/tools/length-converter.html",
    # Japanese (ja/)
    "https://smarttoolzai.com/ja/index.html",
    "https://smarttoolzai.com/ja/tools/pdf-compressor.html",
    "https://smarttoolzai.com/ja/tools/pdf-merger.html",
    "https://smarttoolzai.com/ja/tools/word-counter.html",
    "https://smarttoolzai.com/ja/tools/length-converter.html",
    # German (de/) & French (fr/)
    "https://smarttoolzai.com/de/index.html",
    "https://smarttoolzai.com/de/tools/pdf-compressor.html",
    "https://smarttoolzai.com/fr/index.html",
    "https://smarttoolzai.com/fr/tools/pdf-compressor.html",
]

# ===========================
# 1. IndexNow Submission
# Covers: Bing, Yandex, Naver, Seznam, Baidu (partners)
# ===========================
def submit_indexnow():
    print("\n" + "="*50)
    print("[INDEXNOW] Submitting to Bing/Yandex/Naver...")
    print("="*50)

    payload = {
        "host": "smarttoolzai.com",
        "key": INDEXNOW_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": ALL_URLS
    }

    endpoints = [
        "https://api.indexnow.org/indexnow",
        "https://www.bing.com/indexnow",
        "https://yandex.com/indexnow",
    ]

    for endpoint in endpoints:
        try:
            data = json.dumps(payload).encode("utf-8")
            req = urllib.request.Request(
                endpoint,
                data=data,
                headers={
                    "Content-Type": "application/json; charset=utf-8",
                    "User-Agent": "SmartToolzAI-Indexer/1.0"
                },
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                status = response.getcode()
                print(f"  [OK] {endpoint} -> HTTP {status}")
        except Exception as e:
            print(f"  [WARN] {endpoint} -> {e}")
        time.sleep(1)

# ===========================
# 2. Google Sitemap Ping
# ===========================
def ping_google():
    print("\n" + "="*50)
    print("[GOOGLE] Sitemap Ping...")
    print("="*50)
    try:
        ping_url = f"https://www.google.com/ping?sitemap={urllib.parse.quote(SITEMAP_URL)}"
        req = urllib.request.Request(ping_url, headers={"User-Agent": "SmartToolzAI-Indexer/1.0"})
        with urllib.request.urlopen(req, timeout=10) as response:
            print(f"  [OK] Google Sitemap Ping -> HTTP {response.getcode()}")
    except Exception as e:
        print(f"  [WARN] Google Ping failed -> {e}")

# ===========================
# 3. Bing Sitemap Ping
# ===========================
def ping_bing():
    print("\n" + "="*50)
    print("[BING] Sitemap Ping...")
    print("="*50)
    try:
        ping_url = f"https://www.bing.com/ping?sitemap={urllib.parse.quote(SITEMAP_URL)}"
        req = urllib.request.Request(ping_url, headers={"User-Agent": "SmartToolzAI-Indexer/1.0"})
        with urllib.request.urlopen(req, timeout=10) as response:
            print(f"  [OK] Bing Sitemap Ping -> HTTP {response.getcode()}")
    except Exception as e:
        print(f"  [WARN] Bing Ping failed -> {e}")

# ===========================
# 4. Summary
# ===========================
def print_summary():
    print("\n" + "="*50)
    print("SEARCH ENGINE COVERAGE SUMMARY")
    print("="*50)
    print("  [OK] Google        -- via sitemap ping")
    print("  [OK] Bing          -- via IndexNow + sitemap ping")
    print("  [OK] Yandex        -- via IndexNow")
    print("  [OK] DuckDuckGo    -- uses Bing index (auto)")
    print("  [OK] Yahoo         -- uses Bing index (auto)")
    print("  [OK] Naver (Korea) -- via IndexNow")
    print("  [OK] Seznam (CZ)   -- via IndexNow")
    print(f"\n  Total URLs submitted: {len(ALL_URLS)}")
    print("\n  Pages may appear in search within 24-72 hours")
    print("="*50)

# ===========================
# RUN ALL
# ===========================
if __name__ == "__main__":
    import sys
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

    print("SmartToolzAI -- Search Engine Mass Submission")
    print(f"   Site: {SITE_URL}")
    print(f"   URLs to submit: {len(ALL_URLS)}")

    submit_indexnow()
    time.sleep(2)
    ping_google()
    time.sleep(1)
    ping_bing()
    print_summary()
    print("\n[DONE
    "https://smarttoolzai.com/es/tools/age-calculator.html",
    "https://smarttoolzai.com/es/tools/ai-bio-generator.html",
    "https://smarttoolzai.com/es/tools/ai-business-name-generator.html",
    "https://smarttoolzai.com/es/tools/ai-email-generator.html",
    "https://smarttoolzai.com/es/tools/ai-hashtag-generator.html",
    "https://smarttoolzai.com/es/tools/ai-meta-description-generator.html",
    "https://smarttoolzai.com/es/tools/ai-paragraph-rewriter.html",
    "https://smarttoolzai.com/es/tools/ai-post-generator.html",
    "https://smarttoolzai.com/es/tools/ai-slogan-generator.html",
    "https://smarttoolzai.com/es/tools/ai-title-generator.html",
    "https://smarttoolzai.com/es/tools/area-converter.html",
    "https://smarttoolzai.com/es/tools/case-converter.html",
    "https://smarttoolzai.com/es/tools/color-picker.html",
    "https://smarttoolzai.com/es/tools/data-storage-converter.html",
    "https://smarttoolzai.com/es/tools/embed-widget.html",
    "https://smarttoolzai.com/es/tools/energy-converter.html",
    "https://smarttoolzai.com/es/tools/image-compressor.html",
    "https://smarttoolzai.com/es/tools/lorem-generator.html",
    "https://smarttoolzai.com/es/tools/password-generator.html",
    "https://smarttoolzai.com/es/tools/pressure-converter.html",
    "https://smarttoolzai.com/es/tools/qr-generator.html",
    "https://smarttoolzai.com/es/tools/speed-converter.html",
    "https://smarttoolzai.com/es/tools/temperature-converter.html",
    "https://smarttoolzai.com/es/tools/time-converter.html",
    "https://smarttoolzai.com/es/tools/volume-converter.html",
    "https://smarttoolzai.com/es/tools/weight-converter.html",
    "https://smarttoolzai.com/pt/tools/age-calculator.html",
    "https://smarttoolzai.com/pt/tools/ai-bio-generator.html",
    "https://smarttoolzai.com/pt/tools/ai-business-name-generator.html",
    "https://smarttoolzai.com/pt/tools/ai-email-generator.html",
    "https://smarttoolzai.com/pt/tools/ai-hashtag-generator.html",
    "https://smarttoolzai.com/pt/tools/ai-meta-description-generator.html",
    "https://smarttoolzai.com/pt/tools/ai-paragraph-rewriter.html",
    "https://smarttoolzai.com/pt/tools/ai-post-generator.html",
    "https://smarttoolzai.com/pt/tools/ai-slogan-generator.html",
    "https://smarttoolzai.com/pt/tools/ai-title-generator.html",
    "https://smarttoolzai.com/pt/tools/area-converter.html",
    "https://smarttoolzai.com/pt/tools/case-converter.html",
    "https://smarttoolzai.com/pt/tools/color-picker.html",
    "https://smarttoolzai.com/pt/tools/data-storage-converter.html",
    "https://smarttoolzai.com/pt/tools/embed-widget.html",
    "https://smarttoolzai.com/pt/tools/energy-converter.html",
    "https://smarttoolzai.com/pt/tools/image-compressor.html",
    "https://smarttoolzai.com/pt/tools/lorem-generator.html",
    "https://smarttoolzai.com/pt/tools/password-generator.html",
    "https://smarttoolzai.com/pt/tools/pressure-converter.html",
    "https://smarttoolzai.com/pt/tools/qr-generator.html",
    "https://smarttoolzai.com/pt/tools/speed-converter.html",
    "https://smarttoolzai.com/pt/tools/temperature-converter.html",
    "https://smarttoolzai.com/pt/tools/time-converter.html",
    "https://smarttoolzai.com/pt/tools/volume-converter.html",
    "https://smarttoolzai.com/pt/tools/weight-converter.html",
    "https://smarttoolzai.com/ja/tools/age-calculator.html",
    "https://smarttoolzai.com/ja/tools/ai-bio-generator.html",
    "https://smarttoolzai.com/ja/tools/ai-business-name-generator.html",
    "https://smarttoolzai.com/ja/tools/ai-email-generator.html",
    "https://smarttoolzai.com/ja/tools/ai-hashtag-generator.html",
    "https://smarttoolzai.com/ja/tools/ai-meta-description-generator.html",
    "https://smarttoolzai.com/ja/tools/ai-paragraph-rewriter.html",
    "https://smarttoolzai.com/ja/tools/ai-post-generator.html",
    "https://smarttoolzai.com/ja/tools/ai-slogan-generator.html",
    "https://smarttoolzai.com/ja/tools/ai-title-generator.html",
    "https://smarttoolzai.com/ja/tools/area-converter.html",
    "https://smarttoolzai.com/ja/tools/case-converter.html",
    "https://smarttoolzai.com/ja/tools/color-picker.html",
    "https://smarttoolzai.com/ja/tools/data-storage-converter.html",
    "https://smarttoolzai.com/ja/tools/embed-widget.html",
    "https://smarttoolzai.com/ja/tools/energy-converter.html",
    "https://smarttoolzai.com/ja/tools/image-compressor.html",
    "https://smarttoolzai.com/ja/tools/lorem-generator.html",
    "https://smarttoolzai.com/ja/tools/password-generator.html",
    "https://smarttoolzai.com/ja/tools/pressure-converter.html",
    "https://smarttoolzai.com/ja/tools/qr-generator.html",
    "https://smarttoolzai.com/ja/tools/speed-converter.html",
    "https://smarttoolzai.com/ja/tools/temperature-converter.html",
    "https://smarttoolzai.com/ja/tools/time-converter.html",
    "https://smarttoolzai.com/ja/tools/volume-converter.html",
    "https://smarttoolzai.com/ja/tools/weight-converter.html",
    "https://smarttoolzai.com/de/tools/age-calculator.html",
    "https://smarttoolzai.com/de/tools/ai-bio-generator.html",
    "https://smarttoolzai.com/de/tools/ai-business-name-generator.html",
    "https://smarttoolzai.com/de/tools/ai-email-generator.html",
    "https://smarttoolzai.com/de/tools/ai-hashtag-generator.html",
    "https://smarttoolzai.com/de/tools/ai-meta-description-generator.html",
    "https://smarttoolzai.com/de/tools/ai-paragraph-rewriter.html",
    "https://smarttoolzai.com/de/tools/ai-post-generator.html",
    "https://smarttoolzai.com/de/tools/ai-slogan-generator.html",
    "https://smarttoolzai.com/de/tools/ai-title-generator.html",
    "https://smarttoolzai.com/de/tools/area-converter.html",
    "https://smarttoolzai.com/de/tools/case-converter.html",
    "https://smarttoolzai.com/de/tools/color-picker.html",
    "https://smarttoolzai.com/de/tools/data-storage-converter.html",
    "https://smarttoolzai.com/de/tools/embed-widget.html",
    "https://smarttoolzai.com/de/tools/energy-converter.html",
    "https://smarttoolzai.com/de/tools/image-compressor.html",
    "https://smarttoolzai.com/de/tools/length-converter.html",
    "https://smarttoolzai.com/de/tools/lorem-generator.html",
    "https://smarttoolzai.com/de/tools/password-generator.html",
    "https://smarttoolzai.com/de/tools/pdf-merger.html",
    "https://smarttoolzai.com/de/tools/pressure-converter.html",
    "https://smarttoolzai.com/de/tools/qr-generator.html",
    "https://smarttoolzai.com/de/tools/speed-converter.html",
    "https://smarttoolzai.com/de/tools/temperature-converter.html",
    "https://smarttoolzai.com/de/tools/time-converter.html",
    "https://smarttoolzai.com/de/tools/volume-converter.html",
    "https://smarttoolzai.com/de/tools/weight-converter.html",
    "https://smarttoolzai.com/de/tools/word-counter.html",
    "https://smarttoolzai.com/fr/tools/age-calculator.html",
    "https://smarttoolzai.com/fr/tools/ai-bio-generator.html",
    "https://smarttoolzai.com/fr/tools/ai-business-name-generator.html",
    "https://smarttoolzai.com/fr/tools/ai-email-generator.html",
    "https://smarttoolzai.com/fr/tools/ai-hashtag-generator.html",
    "https://smarttoolzai.com/fr/tools/ai-meta-description-generator.html",
    "https://smarttoolzai.com/fr/tools/ai-paragraph-rewriter.html",
    "https://smarttoolzai.com/fr/tools/ai-post-generator.html",
    "https://smarttoolzai.com/fr/tools/ai-slogan-generator.html",
    "https://smarttoolzai.com/fr/tools/ai-title-generator.html",
    "https://smarttoolzai.com/fr/tools/area-converter.html",
    "https://smarttoolzai.com/fr/tools/case-converter.html",
    "https://smarttoolzai.com/fr/tools/color-picker.html",
    "https://smarttoolzai.com/fr/tools/data-storage-converter.html",
    "https://smarttoolzai.com/fr/tools/embed-widget.html",
    "https://smarttoolzai.com/fr/tools/energy-converter.html",
    "https://smarttoolzai.com/fr/tools/image-compressor.html",
    "https://smarttoolzai.com/fr/tools/length-converter.html",
    "https://smarttoolzai.com/fr/tools/lorem-generator.html",
    "https://smarttoolzai.com/fr/tools/password-generator.html",
    "https://smarttoolzai.com/fr/tools/pdf-merger.html",
    "https://smarttoolzai.com/fr/tools/pressure-converter.html",
    "https://smarttoolzai.com/fr/tools/qr-generator.html",
    "https://smarttoolzai.com/fr/tools/speed-converter.html",
    "https://smarttoolzai.com/fr/tools/temperature-converter.html",
    "https://smarttoolzai.com/fr/tools/time-converter.html",
    "https://smarttoolzai.com/fr/tools/volume-converter.html",
    "https://smarttoolzai.com/fr/tools/weight-converter.html",
    "https://smarttoolzai.com/fr/tools/word-counter.html",
]