import os

BASE_DIR = r"C:\Users\Pubudu Nuwan\.gemini\antigravity\scratch\toolsite"
SITEMAP_PATH = os.path.join(BASE_DIR, "sitemap.xml")

languages = ["es", "pt", "ja", "de", "fr"]

# Read existing sitemap lines
with open(SITEMAP_PATH, "r", encoding="utf-8") as f:
    sitemap = f.read()

# Generate new URL entries
new_urls = []
for lang in languages:
    lang_dir = os.path.join(BASE_DIR, lang, "tools")
    if os.path.exists(lang_dir):
        for tool_file in os.listdir(lang_dir):
            if tool_file.endswith(".html"):
                url = f"https://smarttoolzai.com/{lang}/tools/{tool_file}"
                if url not in sitemap:
                    new_urls.append(f'  <url><loc>{url}</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>')

if new_urls:
    insert_pos = sitemap.rfind("</urlset>")
    updated_sitemap = sitemap[:insert_pos] + "\n" + "\n".join(new_urls) + "\n</urlset>"
    with open(SITEMAP_PATH, "w", encoding="utf-8") as f:
        f.write(updated_sitemap)
    print(f"Added {len(new_urls)} new localized tool URLs to sitemap.xml!")

# Also update submit_to_search_engines.py
SUBMIT_PATH = os.path.join(BASE_DIR, "submit_to_search_engines.py")
with open(SUBMIT_PATH, "r", encoding="utf-8") as f:
    submit_code = f.read()

new_submit_urls = []
for lang in languages:
    lang_dir = os.path.join(BASE_DIR, lang, "tools")
    if os.path.exists(lang_dir):
        for tool_file in os.listdir(lang_dir):
            if tool_file.endswith(".html"):
                url = f"https://smarttoolzai.com/{lang}/tools/{tool_file}"
                if url not in submit_code:
                    new_submit_urls.append(f'    "{url}",')

if new_submit_urls:
    insert_pos = submit_code.rfind("]")
    updated_submit = submit_code[:insert_pos] + "\n" + "\n".join(new_submit_urls) + "\n]"
    with open(SUBMIT_PATH, "w", encoding="utf-8") as f:
        f.write(updated_submit)
    print(f"Added {len(new_submit_urls)} new URLs to submit_to_search_engines.py!")
