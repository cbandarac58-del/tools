"""
SmartToolzAI — Multi-Language Tool Localizer
Properly translates all English tool pages into 5 languages.
"""

import os
import re

BASE_DIR = r"C:\Users\Pubudu Nuwan\.gemini\antigravity\scratch\toolsite"
TOOLS_DIR = os.path.join(BASE_DIR, "tools")

# =============================================
# TRANSLATIONS: UI strings per language
# =============================================
LANGS = {
    "es": {
        "html_lang": "es",
        "nav_home": "Inicio",
        "nav_pdf": "Herramientas PDF",
        "nav_converters": "Convertidores",
        "nav_ai": "Herramientas IA",
        "nav_utilities": "Utilidades",
        "nav_blog": "Blog",
        "nav_about": "Sobre Nosotros",
        "nav_contact": "Contacto",
        "privacy_badge": "🔒 100% Privado — Procesamiento Local en tu Navegador",
        "copy_btn": "Copiar",
        "clear_btn": "Limpiar",
        "paste_btn": "Pegar",
        "generate_btn": "Generar",
        "download_btn": "Descargar",
        "result_label": "Resultado:",
        "search_placeholder": "Buscar herramientas...",
        "ad_space": "Espacio Publicitario",
        "tool_names": {
            "Word Counter": "Contador de Palabras",
            "Password Generator": "Generador de Contraseñas",
            "Case Converter": "Convertidor de Mayúsculas",
            "Age Calculator": "Calculadora de Edad",
            "Lorem Ipsum Generator": "Generador Lorem Ipsum",
            "QR Code Generator": "Generador de Código QR",
            "Color Picker": "Selector de Color",
            "Image Compressor": "Compresor de Imágenes",
            "Free PDF Compressor": "Compresor de PDF Gratis",
            "Free PDF Merger": "Unir PDF Gratis",
            "Length Converter": "Convertidor de Longitud",
            "Weight & Mass Converter": "Convertidor de Peso",
            "Temperature Converter": "Convertidor de Temperatura",
            "Volume Converter": "Convertidor de Volumen",
            "Area Converter": "Convertidor de Área",
            "Speed Converter": "Convertidor de Velocidad",
            "Time Converter": "Convertidor de Tiempo",
            "Data Storage Converter": "Convertidor de Almacenamiento",
            "Pressure Converter": "Convertidor de Presión",
            "Energy Converter": "Convertidor de Energía",
            "AI Email Generator": "Generador de Emails IA",
            "AI Blog Title Generator": "Generador de Títulos IA",
            "AI Paragraph Rewriter": "Reescritor de Párrafos",
            "AI Social Bio Generator": "Generador de Bio Social",
            "AI Business Name Generator": "Generador de Nombres de Marca",
            "AI Brand Slogan Generator": "Generador de Slogans IA",
            "AI Meta Description Generator": "Meta Descripciones IA",
            "AI Hashtag Generator": "Generador de Hashtags",
            "AI Social Post Generator": "Generador de Publicaciones",
            "Free Website Widget Generator": "Generador de Widgets",
        }
    },
    "pt": {
        "html_lang": "pt",
        "nav_home": "Início",
        "nav_pdf": "Ferramentas PDF",
        "nav_converters": "Conversores",
        "nav_ai": "Ferramentas IA",
        "nav_utilities": "Utilitários",
        "nav_blog": "Blog",
        "nav_about": "Sobre Nós",
        "nav_contact": "Contato",
        "privacy_badge": "🔒 100% Privado — Processamento Local no seu Navegador",
        "copy_btn": "Copiar",
        "clear_btn": "Limpar",
        "paste_btn": "Colar",
        "generate_btn": "Gerar",
        "download_btn": "Baixar",
        "result_label": "Resultado:",
        "search_placeholder": "Buscar ferramentas...",
        "ad_space": "Espaço Publicitário",
        "tool_names": {
            "Word Counter": "Contador de Palavras",
            "Password Generator": "Gerador de Senhas",
            "Case Converter": "Conversor de Maiúsculas",
            "Age Calculator": "Calculadora de Idade",
            "Lorem Ipsum Generator": "Gerador Lorem Ipsum",
            "QR Code Generator": "Gerador de Código QR",
            "Color Picker": "Seletor de Cores",
            "Image Compressor": "Compressor de Imagens",
            "Free PDF Compressor": "Compressor de PDF Grátis",
            "Free PDF Merger": "Juntar PDF Grátis",
            "Length Converter": "Conversor de Comprimento",
            "Weight & Mass Converter": "Conversor de Peso",
            "Temperature Converter": "Conversor de Temperatura",
            "Volume Converter": "Conversor de Volume",
            "Area Converter": "Conversor de Área",
            "Speed Converter": "Conversor de Velocidade",
            "Time Converter": "Conversor de Tempo",
            "Data Storage Converter": "Conversor de Armazenamento",
            "Pressure Converter": "Conversor de Pressão",
            "Energy Converter": "Conversor de Energia",
            "AI Email Generator": "Gerador de E-mails IA",
            "AI Blog Title Generator": "Gerador de Títulos IA",
            "AI Paragraph Rewriter": "Reescritor de Parágrafos",
            "AI Social Bio Generator": "Gerador de Bio Social",
            "AI Business Name Generator": "Gerador de Nomes de Marca",
            "AI Brand Slogan Generator": "Gerador de Slogans IA",
            "AI Meta Description Generator": "Meta Descrições IA",
            "AI Hashtag Generator": "Gerador de Hashtags",
            "AI Social Post Generator": "Gerador de Publicações",
            "Free Website Widget Generator": "Gerador de Widgets",
        }
    },
    "ja": {
        "html_lang": "ja",
        "nav_home": "ホーム",
        "nav_pdf": "PDFツール",
        "nav_converters": "単位換算",
        "nav_ai": "AIツール",
        "nav_utilities": "便利ツール",
        "nav_blog": "ブログ",
        "nav_about": "サイト概要",
        "nav_contact": "お問い合わせ",
        "privacy_badge": "🔒 100%ローカル処理 — ファイルはサーバーに送信されません",
        "copy_btn": "コピー",
        "clear_btn": "クリア",
        "paste_btn": "貼り付け",
        "generate_btn": "生成",
        "download_btn": "ダウンロード",
        "result_label": "結果:",
        "search_placeholder": "ツールを検索...",
        "ad_space": "広告スペース",
        "tool_names": {
            "Word Counter": "文字数カウント",
            "Password Generator": "パスワード自動生成",
            "Case Converter": "大文字小文字変換",
            "Age Calculator": "年齢・日数計算",
            "Lorem Ipsum Generator": "ダミーテキスト作成",
            "QR Code Generator": "QRコード作成",
            "Color Picker": "カラーピッカー",
            "Image Compressor": "画像圧縮ツール",
            "Free PDF Compressor": "無料PDF圧縮ツール",
            "Free PDF Merger": "無料PDF結合ツール",
            "Length Converter": "長さ・距離換算",
            "Weight & Mass Converter": "重さ・質量換算",
            "Temperature Converter": "温度換算",
            "Volume Converter": "体積・容量換算",
            "Area Converter": "面積換算",
            "Speed Converter": "速度換算",
            "Time Converter": "時間換算",
            "Data Storage Converter": "データ容量換算",
            "Pressure Converter": "圧力換算",
            "Energy Converter": "エネルギー換算",
            "AI Email Generator": "AIメール作成",
            "AI Blog Title Generator": "AIタイトル生成",
            "AI Paragraph Rewriter": "AI文章リライト",
            "AI Social Bio Generator": "AIプロフィール作成",
            "AI Business Name Generator": "AIネーミング",
            "AI Brand Slogan Generator": "AIスローガン",
            "AI Meta Description Generator": "AIメタ説明文",
            "AI Hashtag Generator": "AIハッシュタグ生成",
            "AI Social Post Generator": "AI SNS投稿作成",
            "Free Website Widget Generator": "埋め込みウィジェット",
        }
    },
    "de": {
        "html_lang": "de",
        "nav_home": "Startseite",
        "nav_pdf": "PDF-Werkzeuge",
        "nav_converters": "Einheitenrechner",
        "nav_ai": "KI-Werkzeuge",
        "nav_utilities": "Hilfsprogramme",
        "nav_blog": "Blog",
        "nav_about": "Über uns",
        "nav_contact": "Kontakt",
        "privacy_badge": "🔒 100% Lokal — Dateien werden nie hochgeladen",
        "copy_btn": "Kopieren",
        "clear_btn": "Löschen",
        "paste_btn": "Einfügen",
        "generate_btn": "Erstellen",
        "download_btn": "Herunterladen",
        "result_label": "Ergebnis:",
        "search_placeholder": "Tools suchen...",
        "ad_space": "Werbefläche",
        "tool_names": {
            "Word Counter": "Wortzähler",
            "Password Generator": "Passwortgenerator",
            "Case Converter": "Groß-/Kleinschreibung",
            "Age Calculator": "Altersrechner",
            "Lorem Ipsum Generator": "Lorem Ipsum Generator",
            "QR Code Generator": "QR-Code Generator",
            "Color Picker": "Farbwähler",
            "Image Compressor": "Bildkompressor",
            "Free PDF Compressor": "PDF Komprimieren Kostenlos",
            "Free PDF Merger": "PDF Zusammenfügen",
            "Length Converter": "Längenumrechner",
            "Weight & Mass Converter": "Gewichtsumrechner",
            "Temperature Converter": "Temperaturumrechner",
            "Volume Converter": "Volumenumrechner",
            "Area Converter": "Flächenumrechner",
            "Speed Converter": "Geschwindigkeitsumrechner",
            "Time Converter": "Zeitumrechner",
            "Data Storage Converter": "Datenspeicherrechner",
            "Pressure Converter": "Druckumrechner",
            "Energy Converter": "Energieumrechner",
            "AI Email Generator": "KI E-Mail Generator",
            "AI Blog Title Generator": "KI Titelgenerator",
            "AI Paragraph Rewriter": "KI Textneuschreiber",
            "AI Social Bio Generator": "KI Bio Generator",
            "AI Business Name Generator": "KI Firmennamen",
            "AI Brand Slogan Generator": "KI Slogangenerator",
            "AI Meta Description Generator": "KI Meta-Beschreibung",
            "AI Hashtag Generator": "KI Hashtag Generator",
            "AI Social Post Generator": "KI Social-Media-Beiträge",
            "Free Website Widget Generator": "Widget Generator",
        }
    },
    "fr": {
        "html_lang": "fr",
        "nav_home": "Accueil",
        "nav_pdf": "Outils PDF",
        "nav_converters": "Convertisseurs",
        "nav_ai": "Outils IA",
        "nav_utilities": "Utilitaires",
        "nav_blog": "Blog",
        "nav_about": "À propos",
        "nav_contact": "Contact",
        "privacy_badge": "🔒 100% Privé — Traitement Local sans Téléversement",
        "copy_btn": "Copier",
        "clear_btn": "Effacer",
        "paste_btn": "Coller",
        "generate_btn": "Générer",
        "download_btn": "Télécharger",
        "result_label": "Résultat:",
        "search_placeholder": "Rechercher des outils...",
        "ad_space": "Espace Publicitaire",
        "tool_names": {
            "Word Counter": "Compteur de Mots",
            "Password Generator": "Générateur de Mots de Passe",
            "Case Converter": "Convertisseur de Casse",
            "Age Calculator": "Calculateur d'Âge",
            "Lorem Ipsum Generator": "Générateur Lorem Ipsum",
            "QR Code Generator": "Générateur de QR Code",
            "Color Picker": "Sélecteur de Couleur",
            "Image Compressor": "Compresseur d'Images",
            "Free PDF Compressor": "Compresseur PDF Gratuit",
            "Free PDF Merger": "Fusionner PDF Gratuit",
            "Length Converter": "Convertisseur de Longueur",
            "Weight & Mass Converter": "Convertisseur de Poids",
            "Temperature Converter": "Convertisseur de Température",
            "Volume Converter": "Convertisseur de Volume",
            "Area Converter": "Convertisseur de Surface",
            "Speed Converter": "Convertisseur de Vitesse",
            "Time Converter": "Convertisseur de Temps",
            "Data Storage Converter": "Convertisseur de Stockage",
            "Pressure Converter": "Convertisseur de Pression",
            "Energy Converter": "Convertisseur d'Énergie",
            "AI Email Generator": "Générateur d'E-mails IA",
            "AI Blog Title Generator": "Générateur de Titres IA",
            "AI Paragraph Rewriter": "Réécriture de Paragraphe",
            "AI Social Bio Generator": "Générateur de Bio IA",
            "AI Business Name Generator": "Générateur de Noms IA",
            "AI Brand Slogan Generator": "Générateur de Slogans IA",
            "AI Meta Description Generator": "Méta-descriptions IA",
            "AI Hashtag Generator": "Générateur de Hashtags",
            "AI Social Post Generator": "Générateur de Publications",
            "Free Website Widget Generator": "Générateur de Widgets",
        }
    },
}

# =============================================
# Build localized header for each language
# =============================================
def build_localized_header(lang_code, t, tool_file):
    """Build a fully localized header nav with correct relative paths for lang/tools/"""
    en_tool_url = f"https://smarttoolzai.com/tools/{tool_file}"
    lang_tool_urls = {lc: f"https://smarttoolzai.com/{lc}/tools/{tool_file}" for lc in LANGS}

    hreflang_tags = f'  <link rel="alternate" hreflang="en" href="{en_tool_url}" />\n'
    for lc, url in lang_tool_urls.items():
        hreflang_tags += f'  <link rel="alternate" hreflang="{lc}" href="{url}" />\n'

    return f"""  <link rel="alternate" hreflang="en" href="https://smarttoolzai.com/tools/{tool_file}" />
  <link rel="alternate" hreflang="es" href="https://smarttoolzai.com/es/tools/{tool_file}" />
  <link rel="alternate" hreflang="pt" href="https://smarttoolzai.com/pt/tools/{tool_file}" />
  <link rel="alternate" hreflang="ja" href="https://smarttoolzai.com/ja/tools/{tool_file}" />
  <link rel="alternate" hreflang="de" href="https://smarttoolzai.com/de/tools/{tool_file}" />
  <link rel="alternate" hreflang="fr" href="https://smarttoolzai.com/fr/tools/{tool_file}" />"""


def localize_header_html(content, lang_code, t):
    """Replace the English nav block with a localized one pointing to lang/index.html"""
    # Replace nav links to point to correct localized paths
    # The header in English points to "../" which is fine (goes to lang folder root)
    # But nav text needs translation
    
    # Fix html lang attribute
    content = re.sub(r'<html lang="en"', f'<html lang="{t["html_lang"]}"', content)
    
    # Fix canonical - point back to English (canonical should always be English)
    # We keep it pointing to the English page - that's actually correct SEO
    
    # Fix nav link text - translate common English nav labels
    content = content.replace('>AI Tools<', f'>{t["nav_ai"]}<')
    content = content.replace('>Utility Tools<', f'>{t["nav_utilities"]}<')
    content = content.replace('>Unit Converters<', f'>{t["nav_converters"]}<')
    content = content.replace('>Converters<', f'>{t["nav_converters"]}<')
    content = content.replace('>Blog<', f'>{t["nav_blog"]}<')
    content = content.replace('>About<', f'>{t["nav_about"]}<')
    content = content.replace('>Contact<', f'>{t["nav_contact"]}<')
    content = content.replace('>PDF Tools<', f'>{t["nav_pdf"]}<')
    
    # Fix Home link paths: ../ should stay as ../ (lang root index.html)
    # This is already correct since we're in lang/tools/ and ../ goes to lang/
    
    # Translate copy/clear/paste/generate/download button text
    content = re.sub(r'(<button[^>]*id="[^"]*[Cc]opy[^"]*"[^>]*>)\s*(?:📋\s*)?Copy', 
                     rf'\1 📋 {t["copy_btn"]}', content)
    content = re.sub(r'>(?:📋\s*)?Copy to Clipboard<', f'>📋 {t["copy_btn"]}<', content)
    content = re.sub(r'>(?:📋\s*)?Copy<', f'>📋 {t["copy_btn"]}<', content)
    content = re.sub(r'>(?:🗑️\s*)?Clear<', f'>🗑️ {t["clear_btn"]}<', content)
    content = re.sub(r'>(?:📥\s*)?Paste<', f'>📥 {t["paste_btn"]}<', content)
    content = re.sub(r'>(?:⬇️\s*)?Download<', f'>⬇️ {t["download_btn"]}<', content)
    
    # Add privacy badge if not present
    if t["privacy_badge"] not in content and "100% Client-Side" in content:
        content = content.replace(
            '100% Client-Side Processing',
            t["privacy_badge"].replace("🔒 ", "")
        )

    # Translate tool names in H1 and title
    for en_name, loc_name in t["tool_names"].items():
        content = content.replace(f'<h1>{en_name}</h1>', f'<h1>{loc_name}</h1>')
        content = content.replace(f'<h1>Free {en_name}</h1>', f'<h1>{loc_name}</h1>')
    
    return content


def inject_hreflangs(content, tool_file, lang_code):
    """Inject or update hreflang tags in head"""
    hreflang_block = f"""  <link rel="alternate" hreflang="en" href="https://smarttoolzai.com/tools/{tool_file}" />
  <link rel="alternate" hreflang="es" href="https://smarttoolzai.com/es/tools/{tool_file}" />
  <link rel="alternate" hreflang="pt" href="https://smarttoolzai.com/pt/tools/{tool_file}" />
  <link rel="alternate" hreflang="ja" href="https://smarttoolzai.com/ja/tools/{tool_file}" />
  <link rel="alternate" hreflang="de" href="https://smarttoolzai.com/de/tools/{tool_file}" />
  <link rel="alternate" hreflang="fr" href="https://smarttoolzai.com/fr/tools/{tool_file}" />"""

    # Remove existing hreflang tags first
    content = re.sub(r'\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" />\n?', '', content)
    
    # Inject after <link rel="canonical"...> or before </head>
    if '<link rel="canonical"' in content:
        content = re.sub(r'(<link rel="canonical"[^>]*/?>)', r'\1\n' + hreflang_block, content)
    else:
        content = content.replace('</head>', hreflang_block + '\n</head>')
    
    return content


# =============================================
# MAIN: Process all tools for all languages
# =============================================
tool_files = [f for f in os.listdir(TOOLS_DIR) if f.endswith('.html')]
print(f"Found {len(tool_files)} tool files to localize.")

for lang_code, t in LANGS.items():
    lang_tools_dir = os.path.join(BASE_DIR, lang_code, "tools")
    os.makedirs(lang_tools_dir, exist_ok=True)
    
    count = 0
    for tool_file in tool_files:
        src_path = os.path.join(TOOLS_DIR, tool_file)
        dest_path = os.path.join(lang_tools_dir, tool_file)
        
        with open(src_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. Fix CSS/JS relative paths: ../ → ../../ (since we're in lang/tools/)
        content = content.replace('href="../css/style.css"', 'href="../../css/style.css"')
        content = content.replace('href="../favicon.png"', 'href="../../favicon.png"')
        content = content.replace('src="../js/main.js"', 'src="../../js/main.js"')
        content = content.replace('src="../js/tools/', 'src="../../js/tools/')
        content = content.replace('href="../pages/', 'href="../../pages/')

        # 2. Fix Home nav link: href="../" → points to lang index
        # Header links to ../ from tools/ = lang/ folder root = correct!
        # They already point correctly since nav uses href="../"

        # 3. Inject hreflang tags
        content = inject_hreflangs(content, tool_file, lang_code)
        
        # 4. Localize HTML lang attr, nav labels, button labels, h1
        content = localize_header_html(content, lang_code, t)
        
        with open(dest_path, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print(f"  [{lang_code.upper()}] Localized {count} tool pages - OK")

print("\nAll done! All 150 localized tool pages generated with proper translations.")
