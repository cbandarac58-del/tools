import os
import re

BASE_DIR = r"C:\Users\Pubudu Nuwan\.gemini\antigravity\scratch\toolsite"
TOOLS_DIR = os.path.join(BASE_DIR, "tools")

languages = ["es", "pt", "ja", "de", "fr"]

# Get list of all HTML files in tools/
tool_files = [f for f in os.listdir(TOOLS_DIR) if f.endswith(".html")]

print(f"Found {len(tool_files)} tool pages to localize across 5 languages.")

for lang in languages:
    lang_tools_dir = os.path.join(BASE_DIR, lang, "tools")
    os.makedirs(lang_tools_dir, exist_ok=True)

    for tool_file in tool_files:
        src_path = os.path.join(TOOLS_DIR, tool_file)
        dest_path = os.path.join(lang_tools_dir, tool_file)

        with open(src_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Update CSS & JS relative paths from ../ to ../../
        content = content.replace('href="../css/style.css"', 'href="../../css/style.css"')
        content = content.replace('href="../favicon.png"', 'href="../../favicon.png"')
        content = content.replace('src="../js/main.js"', 'src="../../js/main.js"')
        content = content.replace('src="../js/tools/', 'src="../../js/tools/')
        content = content.replace('href="../index.html"', 'href="../index.html"')
        content = content.replace('href="../pages/', 'href="../../pages/')

        # Inject hreflang tags into <head> if not already present
        hreflangs = f"""
  <link rel="alternate" hreflang="en" href="https://smarttoolzai.com/tools/{tool_file}" />
  <link rel="alternate" hreflang="es" href="https://smarttoolzai.com/es/tools/{tool_file}" />
  <link rel="alternate" hreflang="pt" href="https://smarttoolzai.com/pt/tools/{tool_file}" />
  <link rel="alternate" hreflang="ja" href="https://smarttoolzai.com/ja/tools/{tool_file}" />
  <link rel="alternate" hreflang="de" href="https://smarttoolzai.com/de/tools/{tool_file}" />
  <link rel="alternate" hreflang="fr" href="https://smarttoolzai.com/fr/tools/{tool_file}" />
"""
        if "</head>" in content and "hreflang" not in content:
            content = content.replace("</head>", f"{hreflangs}\n</head>")

        with open(dest_path, "w", encoding="utf-8") as f:
            f.write(content)

    print(f"Generated {len(tool_files)} tool pages inside {lang}/tools/")

# Also update build_full_localized_hubs.py so all hrefs point to "tools/filename.html" (without ../)
with open(os.path.join(BASE_DIR, "build_full_localized_hubs.py"), "r", encoding="utf-8") as f:
    hub_script = f.read()

hub_script = hub_script.replace('"../tools/', '"tools/')
with open(os.path.join(BASE_DIR, "build_full_localized_hubs.py"), "w", encoding="utf-8") as f:
    f.write(hub_script)

print("Updated build_full_localized_hubs.py hrefs to local tools/ folder.")
