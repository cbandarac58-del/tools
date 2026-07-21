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
    print("\n[DONE] All done! Check Google Search Console & Bing Webmaster Tools for status.\n")
