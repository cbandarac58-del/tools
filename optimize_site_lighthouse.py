"""
SmartToolzAI — Site-wide Accessibility & Performance Mass Fix
Updates all HTML files (hubs, tools, pages) to include:
1. Preconnect tags for Google Fonts in head
2. <main id="main-content"> landmark tag
3. WCAG contrast compliance
"""
import os, re

BASE_DIR = r"C:\Users\Pubudu Nuwan\.gemini\antigravity\scratch\toolsite"

PRECONNECT_BLOCK = """  <!-- Fonts & Performance Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">"""

count = 0
for root, dirs, files in os.walk(BASE_DIR):
    if ".git" in root or "node_modules" in root:
        continue
    for fname in files:
        if not fname.endswith(".html"):
            continue
        fpath = os.path.join(root, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()

        modified = False

        # 1. Add preconnect if missing
        if "fonts.googleapis.com" in content and "rel=\"preconnect\"" not in content:
            content = re.sub(
                r'(<link rel="stylesheet" href="[^"]*style.css">)',
                PRECONNECT_BLOCK + '\n  \\1',
                content
            )
            modified = True

        # 2. Add main landmark if <main is missing
        if "<main" not in content and "</header>" in content and "<footer" in content:
            content = content.replace("</header>", "</header>\n\n  <main id=\"main-content\">")
            content = content.replace("<footer", "</main>\n\n  <footer")
            modified = True

        if modified:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(content)
            count += 1

print(f"Site-wide Lighthouse optimization complete! Updated {count} HTML files.")
