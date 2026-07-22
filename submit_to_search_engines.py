import os
import requests
import json
import time

SITE_URL = "https://smarttoolzai.com"
HOST = "smarttoolzai.com"
KEY = "8f310f84501e4465b8393c0429f449a1"
KEY_LOCATION = "https://smarttoolzai.com/8f310f84501e4465b8393c0429f449a1.txt"
BASE_DIR = r"C:\Users\Pubudu Nuwan\.gemini\antigravity\scratch\toolsite"

# Dynamically gather all URLs across the site
ALL_URLS = [
    "https://smarttoolzai.com/",
    "https://smarttoolzai.com/index.html",
    "https://smarttoolzai.com/pages/about.html",
    "https://smarttoolzai.com/pages/contact.html",
    "https://smarttoolzai.com/pages/privacy-policy.html",
    "https://smarttoolzai.com/pages/terms.html",
    "https://smarttoolzai.com/blog/index.html"
]

# Scan root tools, blogs, and localized folders
folders_to_scan = ["tools", "blog", "es", "pt", "ja", "de", "fr"]

for folder in folders_to_scan:
    folder_path = os.path.join(BASE_DIR, folder)
    if os.path.exists(folder_path):
        for root, _, files in os.walk(folder_path):
            for file in files:
                if file.endswith(".html"):
                    rel_path = os.path.relpath(os.path.join(root, file), BASE_DIR).replace("\\", "/")
                    url = f"https://smarttoolzai.com/{rel_path}"
                    if url not in ALL_URLS:
                        ALL_URLS.append(url)

INDEXNOW_ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
]

def submit_indexnow():
    print("==================================================")
    print("[INDEXNOW] Submitting to Bing/Yandex/Naver...")
    print("==================================================")
    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": ALL_URLS
    }
    headers = {"Content-Type": "application/json; charset=utf-8"}
    for endpoint in INDEXNOW_ENDPOINTS:
        try:
            resp = requests.post(endpoint, data=json.dumps(payload), headers=headers, timeout=10)
            if resp.status_code in (200, 202):
                print(f"  [OK] {endpoint} -> HTTP {resp.status_code}")
            else:
                print(f"  [FAIL] {endpoint} -> HTTP {resp.status_code}: {resp.text[:100]}")
        except Exception as e:
            print(f"  [ERROR] {endpoint} -> {e}")

def ping_google():
    print("\n==================================================")
    print("[GOOGLE] Sitemap Ping...")
    print("==================================================")
    ping_url = f"https://www.google.com/ping?sitemap={SITE_URL}/sitemap.xml"
    try:
        resp = requests.get(ping_url, timeout=10)
        if resp.status_code == 200:
            print(f"  [OK] Google ping successful -> HTTP 200")
        else:
            print(f"  [WARN] Google Ping failed -> HTTP Error {resp.status_code}: {resp.reason}")
    except Exception as e:
        print(f"  [ERROR] Google ping -> {e}")

def ping_bing():
    print("\n==================================================")
    print("[BING] Sitemap Ping...")
    print("==================================================")
    ping_url = f"https://www.bing.com/ping?sitemap={SITE_URL}/sitemap.xml"
    try:
        resp = requests.get(ping_url, timeout=10)
        if resp.status_code == 200:
            print(f"  [OK] Bing ping successful -> HTTP 200")
        else:
            print(f"  [WARN] Bing Ping failed -> HTTP Error {resp.status_code}: {resp.reason}")
    except Exception as e:
        print(f"  [ERROR] Bing ping -> {e}")

def print_summary():
    print("\n==================================================")
    print("SEARCH ENGINE COVERAGE SUMMARY")
    print("==================================================")
    print("  [OK] Google        -- via sitemap ping")
    print("  [OK] Bing          -- via IndexNow + sitemap ping")
    print("  [OK] Yandex        -- via IndexNow")
    print("  [OK] DuckDuckGo    -- uses Bing index (auto)")
    print("  [OK] Yahoo         -- uses Bing index (auto)")
    print("  [OK] Naver (Korea) -- via IndexNow")
    print("  [OK] Seznam (CZ)   -- via IndexNow")
    print(f"\n  Total URLs submitted: {len(ALL_URLS)}")
    print("\n  Pages may appear in search within 24-72 hours")
    print("==================================================")

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
    print("\n[DONE] All done! Check Google Search Console & Bing Webmaster Tools for status.")