"""
SmartToolzAI — Auto-Generate Complete Sitemap
Scans all HTML files in the site and builds a full sitemap.xml
including all localized pages, blog articles, and tool pages.
"""
import os

BASE_DIR = r"C:\Users\Pubudu Nuwan\.gemini\antigravity\scratch\toolsite"
BASE_URL = "https://smarttoolzai.com"
OUTPUT = os.path.join(BASE_DIR, "sitemap.xml")

# Priority rules per path pattern
def get_priority(path):
    if path in ("/", "/index.html"):
        return "1.0", "daily"
    if path in ["/es/", "/pt/", "/ja/", "/de/", "/fr/",
                "/es/index.html", "/pt/index.html", "/ja/index.html",
                "/de/index.html", "/fr/index.html"]:
        return "0.9", "weekly"
    if "/tools/pdf-" in path:
        return "0.9", "weekly"
    if "/blog/" in path and "index" not in path:
        return "0.85", "weekly"
    if "/tools/" in path:
        return "0.8", "monthly"
    if "/blog/index" in path:
        return "0.7", "weekly"
    if "/pages/" in path:
        return "0.5", "monthly"
    return "0.7", "monthly"

# Folders and files to exclude
EXCLUDE_DIRS = {".git", "css", "js", "node_modules"}
EXCLUDE_FILES = {"404.html", "robots.txt"}

urls = []

for root, dirs, files in os.walk(BASE_DIR):
    # Skip excluded directories
    dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

    for fname in sorted(files):
        if not fname.endswith(".html"):
            continue
        if fname in EXCLUDE_FILES:
            continue

        full_path = os.path.join(root, fname)
        rel_path = os.path.relpath(full_path, BASE_DIR).replace("\\", "/")

        # Build URL path
        url_path = "/" + rel_path
        # Normalize index.html -> /lang/ etc
        if url_path == "/index.html":
            url_path = "/"

        url = BASE_URL + url_path
        priority, changefreq = get_priority(url_path)
        urls.append((url, priority, changefreq))

# Sort: homepage first, then by priority desc, then alphabetically
urls.sort(key=lambda x: (-float(x[1]), x[0]))

# Write sitemap.xml
lines = ['<?xml version="1.0" encoding="UTF-8"?>']
lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
lines.append('        xmlns:xhtml="http://www.w3.org/1999/xhtml">')

for url, priority, changefreq in urls:
    lines.append(f'  <url>')
    lines.append(f'    <loc>{url}</loc>')
    lines.append(f'    <changefreq>{changefreq}</changefreq>')
    lines.append(f'    <priority>{priority}</priority>')
    lines.append(f'    <lastmod>2026-07-22</lastmod>')
    lines.append(f'  </url>')

lines.append('</urlset>')

content = "\n".join(lines)
with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Sitemap generated: {len(urls)} URLs")
print(f"Output: {OUTPUT}")

# Print breakdown by section
sections = {}
for url, p, c in urls:
    path = url.replace(BASE_URL, "")
    if path == "/" or path == "/index.html":
        section = "Homepage"
    elif path.startswith("/es/blog"):
        section = "ES Blog"
    elif path.startswith("/pt/blog"):
        section = "PT Blog"
    elif path.startswith("/ja/blog"):
        section = "JA Blog"
    elif path.startswith("/de/blog"):
        section = "DE Blog"
    elif path.startswith("/fr/blog"):
        section = "FR Blog"
    elif path.startswith("/blog"):
        section = "EN Blog"
    elif path.startswith("/es/tools"):
        section = "ES Tools"
    elif path.startswith("/pt/tools"):
        section = "PT Tools"
    elif path.startswith("/ja/tools"):
        section = "JA Tools"
    elif path.startswith("/de/tools"):
        section = "DE Tools"
    elif path.startswith("/fr/tools"):
        section = "FR Tools"
    elif path.startswith("/tools"):
        section = "EN Tools"
    elif path.startswith("/es") or path.startswith("/pt") or path.startswith("/ja") or path.startswith("/de") or path.startswith("/fr"):
        section = "Lang Hubs"
    elif path.startswith("/pages"):
        section = "Pages"
    else:
        section = "Other"
    sections[section] = sections.get(section, 0) + 1

print("\nBreakdown:")
for section, count in sorted(sections.items()):
    print(f"  {section}: {count} URLs")
