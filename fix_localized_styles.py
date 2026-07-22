import os

BASE_DIR = r"C:\Users\Pubudu Nuwan\.gemini\antigravity\scratch\toolsite"

def get_head(lang, title, desc, path_depth=1):
    css_prefix = "../" if path_depth == 1 else "../../"
    hreflangs = f"""
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <link rel="alternate" hreflang="en" href="https://smarttoolzai.com/index.html" />
  <link rel="alternate" hreflang="es" href="https://smarttoolzai.com/es/index.html" />
  <link rel="alternate" hreflang="pt" href="https://smarttoolzai.com/pt/index.html" />
  <link rel="alternate" hreflang="ja" href="https://smarttoolzai.com/ja/index.html" />
  <link rel="alternate" hreflang="de" href="https://smarttoolzai.com/de/index.html" />
  <link rel="alternate" hreflang="fr" href="https://smarttoolzai.com/fr/index.html" />
  <link rel="icon" href="{css_prefix}favicon.png" type="image/png">
  <link rel="stylesheet" href="{css_prefix}css/style.css">
"""
    return hreflangs

def get_header(nav_home, nav_converters, nav_ai, nav_about, lang_prefix=""):
    return f"""  <header class="header" id="header">
    <div class="container">
      <a href="{lang_prefix}index.html" class="logo">
        <div class="logo-icon">⚡</div>
        SmartToolz<span class="gradient-text">AI</span>
      </a>
      <nav class="nav-links" id="navLinks">
        <a href="{lang_prefix}index.html#pdf-tools">PDF Tools</a>
        <a href="{lang_prefix}index.html#converters">{nav_converters}</a>
        <a href="{lang_prefix}index.html#ai-tools">{nav_ai}</a>
        <a href="{lang_prefix}index.html#utility-tools">Utilities</a>
      </nav>
      <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>"""

def get_footer():
    return f"""  <footer class="footer">
    <div class="container">
      <div class="footer-bottom">
        <p>© 2026 SmartToolzAI. All rights reserved. 100% Client-Side & Private.</p>
      </div>
    </div>
  </footer>"""

def create_index_page(lang, title, desc, badge_text, hero_title, hero_p, pdf_title, pdf_desc, pdf_comp_title, pdf_comp_desc, pdf_merge_title, pdf_merge_desc, util_title, util_word_title, util_word_desc, util_len_title, util_len_desc):
    return f"""<!DOCTYPE html>
<html lang="{lang}">
<head>
{get_head(lang, title, desc, 1)}
</head>
<body>
{get_header("Home", "Converters", "AI Tools", "About", "./")}

  <main style="padding-top: 5rem;">
    <section class="hero">
      <div class="hero-bg-glow"></div>
      <div class="container">
        <div class="hero-badge animate-in">
          <span class="badge-dot"></span>
          {badge_text}
        </div>
        <h1>{hero_title}</h1>
        <p><span id="totalToolsCount">30+</span> {hero_p}</p>

        <div class="hero-search">
          <span class="search-icon">🔍</span>
          <input type="text" id="toolSearch" placeholder="Search tools...">
        </div>

        <div class="hero-stats">
          <div class="hero-stat">
            <div class="stat-number" id="counterTools">30+</div>
            <div class="stat-label">Free Tools</div>
          </div>
          <div class="hero-stat">
            <div class="stat-number">100%</div>
            <div class="stat-label">Client-Side Private</div>
          </div>
          <div class="hero-stat">
            <div class="stat-number">0s</div>
            <div class="stat-label">Server Wait</div>
          </div>
        </div>
      </div>
    </section>

    <!-- PDF TOOLS -->
    <section class="section" id="pdf-tools">
      <div class="container">
        <div class="section-header animate-in">
          <div class="section-tag">📄 PDF Tools</div>
          <h2>{pdf_title}</h2>
          <p>{pdf_desc}</p>
        </div>

        <div class="tools-grid stagger-children">
          <a href="tools/pdf-compressor.html" class="tool-card" data-tool="{pdf_comp_title}">
            <span class="tool-badge popular">🔥 Popular</span>
            <div class="tool-card-icon red">📉</div>
            <h3>{pdf_comp_title}</h3>
            <p>{pdf_comp_desc}</p>
            <div class="card-arrow">→</div>
          </a>

          <a href="tools/pdf-merger.html" class="tool-card" data-tool="{pdf_merge_title}">
            <span class="tool-badge popular">🔥 Popular</span>
            <div class="tool-card-icon blue">📑</div>
            <h3>{pdf_merge_title}</h3>
            <p>{pdf_merge_desc}</p>
            <div class="card-arrow">→</div>
          </a>
        </div>
      </div>
    </section>

    <!-- UTILITIES -->
    <section class="section" id="utility-tools">
      <div class="container">
        <div class="section-header animate-in">
          <div class="section-tag">🔧 Utilities</div>
          <h2>{util_title}</h2>
        </div>

        <div class="tools-grid stagger-children">
          <a href="tools/word-counter.html" class="tool-card" data-tool="{util_word_title}">
            <div class="tool-card-icon blue">📝</div>
            <h3>{util_word_title}</h3>
            <p>{util_word_desc}</p>
            <div class="card-arrow">→</div>
          </a>

          <a href="tools/length-converter.html" class="tool-card" data-tool="{util_len_title}">
            <div class="tool-card-icon green">📏</div>
            <h3>{util_len_title}</h3>
            <p>{util_len_desc}</p>
            <div class="card-arrow">→</div>
          </a>
        </div>
      </div>
    </section>
  </main>

{get_footer()}
  <script src="../js/main.js"></script>
</body>
</html>"""

# Generate index pages for es, pt, ja, de, fr
languages = {
    "es": {
        "title": "Herramientas Gratis de IA y Utilidades Online — SmartToolzAI",
        "desc": "30+ herramientas gratis en línea para comprimir PDF, contar palabras, convertir unidades y generar textos con IA. 100% privado y sin registro.",
        "badge": "100% Gratis — Sin Registro Requerido",
        "hero_title": 'Potencia tu Trabajo con <span class="gradient-text">Herramientas IA</span> y Utilidades',
        "hero_p": "herramientas gratis online. 100% privado, procesamiento local en tu navegador.",
        "pdf_title": "Herramientas PDF Gratis",
        "pdf_desc": "Procesamiento 100% local en tu navegador sin subir archivos a servidores",
        "pdf_comp_title": "Compresor de PDF Gratis",
        "pdf_comp_desc": "Comprimir archivos PDF en línea sin perder calidad. 100% privado y sin límites.",
        "pdf_merge_title": "Unir PDF Gratis",
        "pdf_merge_desc": "Combinar varios archivos PDF en un solo documento. Reordenar páginas e instantáneo.",
        "util_title": "Utilidades Web Populares",
        "util_word_title": "Contador de Palabras",
        "util_word_desc": "Conteo en tiempo real de palabras, caracteres y párrafos. Análisis de palabras clave.",
        "util_len_title": "Convertidor de Longitud",
        "util_len_desc": "Convierte kilómetros, millas, metros, pies y pulgadas al instante."
    },
    "pt": {
        "title": "Ferramentas Grátis de IA e Utilitários Online — SmartToolzAI",
        "desc": "30+ ferramentas online grátis para comprimir PDF, contar palavras, converter unidades e gerar textos com IA. 100% privado e sem registro.",
        "badge": "100% Grátis — Sem Registro Necessário",
        "hero_title": 'Aumente sua Produtividade com <span class="gradient-text">Ferramentas de IA</span>',
        "hero_p": "ferramentas online grátis. 100% privado, processamento local no seu navegador.",
        "pdf_title": "Ferramentas PDF Grátis",
        "pdf_desc": "Processamento 100% local no seu navegador sem enviar arquivos para servidores",
        "pdf_comp_title": "Compressor de PDF Grátis",
        "pdf_comp_desc": "Comprimir arquivos PDF online sem perder qualidade. 100% privado e sem limites.",
        "pdf_merge_title": "Juntar PDF Grátis",
        "pdf_merge_desc": "Combinar vários arquivos PDF em um único documento. Reordenar páginas instantaneamente.",
        "util_title": "Utilitários Web Populares",
        "util_word_title": "Contador de Palavras",
        "util_word_desc": "Contagem em tempo real de palavras, caracteres e parágrafos.",
        "util_len_title": "Conversor de Comprimento",
        "util_len_desc": "Converta quilômetros, milhas, metros, pés e polegadas instantaneamente."
    },
    "ja": {
        "title": "完全無料のAI＆便利Webツール集 — SmartToolzAI",
        "desc": "PDF圧縮、PDF結合、文字数カウント、AIメール作成など30種類以上のツールが登録不要・完全無料で使えます。100%ローカル処理で安心。",
        "badge": "100%完全無料 — 登録・ログイン不要",
        "hero_title": '<span class="gradient-text">AI＆便利Webツール</span>で作業を圧倒的に効率化',
        "hero_p": "種類以上のWebツールが完全無料。ブラウザ内での100%ローカル処理で安心安全。",
        "pdf_title": "無料PDFツール集",
        "pdf_desc": "ファイル送信ゼロ！お使いのブラウザ内での完全ローカル処理",
        "pdf_comp_title": "無料PDF圧縮ツール",
        "pdf_comp_desc": "PDFファイルを画質を損なわずに無料圧縮。ファイル送信なし・100%ローカル処理で安心。",
        "pdf_merge_title": "無料PDF結合ツール",
        "pdf_merge_desc": "複数のPDFファイルを1つに無料結合。順番並び替え可能・登録不要。",
        "util_title": "人気ユーティリティツール",
        "util_word_title": "無料文字数カウント",
        "util_word_desc": "リアルタイムで文字数・単語数・行数をカウント。読了時間も一瞬で分析。",
        "util_len_title": "無料長さ・距離換算",
        "util_len_desc": "km、マイル、メートル、フィート、インチを一瞬で正確に単位換算。"
    },
    "de": {
        "title": "Kostenlose KI- & Online-Werkzeuge — SmartToolzAI",
        "desc": "30+ kostenlose Online-Tools für PDF komprimieren, Wortzähler, Einheiten umrechnen und KI-Texte. 100% privat ohne Anmeldung.",
        "badge": "100% Kostenlos — Keine Anmeldung Erforderlich",
        "hero_title": 'Steigern Sie Ihre Arbeit mit <span class="gradient-text">KI-Tools</span>',
        "hero_p": "kostenlose Online-Tools. 100% privat, lokale Verarbeitung in Ihrem Browser.",
        "pdf_title": "Kostenlose PDF-Tools",
        "pdf_desc": "100% lokale Verarbeitung in Ihrem Browser ohne Datei-Uploads",
        "pdf_comp_title": "Kostenloser PDF Komprimierer",
        "pdf_comp_desc": "PDF-Dateien kostenlos online verkleinern ohne Qualitätsverlust. 100% privat.",
        "pdf_merge_title": "Kostenloser PDF Zusammenfügen",
        "pdf_merge_desc": "Mehrere PDF-Dateien in ein Dokument zusammenfügen. Seiten neu anordnen.",
        "util_title": "Beliebte Web-Tools",
        "util_word_title": "Wortzähler",
        "util_word_desc": "Echtzeit-Zählung von Wörtern, Zeichen und Absätzen.",
        "util_len_title": "Längenumrechner",
        "util_len_desc": "Rechnen Sie Kilometer, Meilen, Meter und Fuß sofort um."
    },
    "fr": {
        "title": "Outils IA et Utilitaires En Ligne Gratuits — SmartToolzAI",
        "desc": "30+ outils en ligne gratuits pour compresser PDF, compter les mots, convertir les unités et générer des textes IA. 100% privé sans inscription.",
        "badge": "100% Gratuit — Sans Inscription Requise",
        "hero_title": 'Boostez Votre Travail Avec Nos <span class="gradient-text">Outils IA</span>',
        "hero_p": "outils en ligne gratuits. 100% privé, traitement local dans votre navigateur.",
        "pdf_title": "Outils PDF Gratuits",
        "pdf_desc": "Traitement 100% local dans votre navigateur sans téléversement sur serveur",
        "pdf_comp_title": "Compresseur PDF Gratuit",
        "pdf_comp_desc": "Compresser des fichiers PDF en ligne gratuitement sans perte de qualité. 100% privé.",
        "pdf_merge_title": "Fusionner PDF Gratuit",
        "pdf_merge_desc": "Combiner plusieurs fichiers PDF en un seul document. Réorganiser les pages.",
        "util_title": "Utilitaires Web Populaires",
        "util_word_title": "Compteur de Mots",
        "util_word_desc": "Comptage en temps réel des mots, caractères et paragraphes.",
        "util_len_title": "Convertisseur de Longueur",
        "util_len_desc": "Convertissez instantanément kilomètres, miles, mètres et pieds."
    }
}

for lang, data in languages.items():
    html_content = create_index_page(
        lang, data["title"], data["desc"], data["badge"], data["hero_title"],
        data["hero_p"], data["pdf_title"], data["pdf_desc"], data["pdf_comp_title"],
        data["pdf_comp_desc"], data["pdf_merge_title"], data["pdf_merge_desc"],
        data["util_title"], data["util_word_title"], data["util_word_desc"],
        data["util_len_title"], data["util_len_desc"]
    )
    filepath = os.path.join(BASE_DIR, lang, "index.html")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Successfully generated styled index for {lang}")

# Generate PDF Compressor pages with full UI for es, pt, ja, de, fr
def create_pdf_compressor_page(lang, title, desc, heading, privacy_text, dropzone_text, btn_text):
    return f"""<!DOCTYPE html>
<html lang="{lang}">
<head>
{get_head(lang, title, desc, 2)}
</head>
<body>
{get_header("Home", "Converters", "AI Tools", "About", "../")}

  <main style="padding-top: 6rem; padding-bottom: 4rem;">
    <div class="container" style="max-width: 900px;">
      <div class="tool-header" style="text-align: center; margin-bottom: 2rem;">
        <span class="tool-badge popular" style="margin-bottom: 1rem; display: inline-block;">🔒 100% Client-Side Privacy</span>
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">{heading}</h1>
        <p style="color: rgba(255,255,255,0.7);">{desc}</p>
        <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); color: #4ade80; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.9rem; margin-top: 1rem; display: inline-block;">
          {privacy_text}
        </div>
      </div>

      <div class="tool-card" style="padding: 2rem; border-radius: 16px;">
        <div class="dropzone" id="pdfDropzone" style="border: 2px dashed rgba(79, 70, 229, 0.4); border-radius: 12px; padding: 3rem; text-align: center; cursor: pointer; transition: all 0.3s ease; background: rgba(79, 70, 229, 0.05);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">📄</div>
          <h3 style="margin-bottom: 0.5rem;">{dropzone_text}</h3>
          <p style="color: rgba(255,255,255,0.5); font-size: 0.9rem;">PDF Files Only</p>
          <input type="file" id="pdfInput" accept="application/pdf" style="display: none;">
        </div>

        <div id="fileInfo" style="display: none; margin-top: 1.5rem; background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span id="fileName" style="font-weight: 600;">document.pdf</span>
            <span id="fileSize" style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">0 MB</span>
          </div>
        </div>

        <div style="margin-top: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: rgba(255,255,255,0.8);">Compression Profile:</label>
          <select id="compressionLevel" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white;">
            <option value="recommended" style="background: #1e1b4b;">Recommended Compression (Balanced Quality & Size)</option>
            <option value="high" style="background: #1e1b4b;">High Compression (Smaller Size)</option>
            <option value="low" style="background: #1e1b4b;">Low Compression (Best Quality)</option>
          </select>
        </div>

        <button id="btnCompress" disabled style="width: 100%; margin-top: 1.5rem; padding: 1rem; border-radius: 8px; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; border: none; font-weight: 700; font-size: 1.1rem; cursor: pointer; opacity: 0.5; transition: all 0.3s ease;">
          ⚡ {btn_text}
        </button>

        <div id="resultContainer" style="display: none; margin-top: 2rem; text-align: center; padding: 1.5rem; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 12px;">
          <div style="font-size: 1.5rem; font-weight: 700; color: #4ade80; margin-bottom: 0.5rem;">🎉 Compression Complete!</div>
          <p id="savingsText" style="color: rgba(255,255,255,0.8); margin-bottom: 1rem;">Saved 45% of file size!</p>
          <a id="btnDownload" href="#" download style="display: inline-block; padding: 0.75rem 2rem; background: #22c55e; color: white; border-radius: 25px; font-weight: 700; text-decoration: none;">
            ⬇️ Download Compressed PDF
          </a>
        </div>
      </div>
    </div>
  </main>

{get_footer()}
  <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
  <script src="../../js/main.js"></script>
  <script src="../../js/tools/pdf-compressor.js"></script>
</body>
</html>"""

pdf_tools_info = {
    "es": {
        "title": "Compresor de PDF Gratis Online (Sin Limites, 100% Privado) — SmartToolzAI",
        "desc": "Comprimir archivos PDF gratis online sin perder calidad. 100% privado, procesamiento local en tu navegador.",
        "heading": "Compresor de PDF Gratis",
        "privacy": "🔒 Procesamiento 100% en tu Navegador — Tus archivos NUNCA se suben a ningún servidor",
        "dropzone": "Arrastra y suelta tu archivo PDF aquí o haz clic para buscar",
        "btn": "Comprimir PDF Ahora"
    },
    "pt": {
        "title": "Compressor de PDF Grátis Online (Sem Limites, 100% Privado) — SmartToolzAI",
        "desc": "Comprimir arquivos PDF grátis online sem perder qualidade. 100% privado, processamento local no navegador.",
        "heading": "Compressor de PDF Grátis",
        "privacy": "🔒 Processamento 100% no Navegador — Seus arquivos NUNCA são enviados para servidores",
        "dropzone": "Arraste e solte seu arquivo PDF aqui ou clique para selecionar",
        "btn": "Comprimir PDF Agora"
    },
    "ja": {
        "title": "無料PDF圧縮ツール (容量制限なし・完全ローカル処理) — SmartToolzAI",
        "desc": "PDFファイルを画質を損なわずに無料圧縮。ファイル送信なし・100%ローカル処理で安心・安全。",
        "heading": "無料PDF圧縮ツール",
        "privacy": "🔒 ブラウザ内100%ローカル処理 — ファイルがサーバーに送信されることは一切ありません",
        "dropzone": "ここにPDFファイルをドラッグ＆ドロップ、またはクリックして選択",
        "btn": "今すぐPDFを圧縮"
    },
    "de": {
        "title": "PDF Komprimieren Kostenlos Online (100% Privat) — SmartToolzAI",
        "desc": "PDF-Dateien kostenlos online verkleinern ohne Qualitätsverlust. 100% lokal im Browser ohne Upload.",
        "heading": "PDF Komprimierer Kostenlos",
        "privacy": "🔒 100% Lokale Verarbeitung im Browser — Ihre Dateien werden NIE hochgeladen",
        "dropzone": "PDF-Datei hierher ziehen oder klicken zum Auswählen",
        "btn": "PDF Jetzt Komprimieren"
    },
    "fr": {
        "title": "Compresser PDF Gratuit En Ligne (100% Privé) — SmartToolzAI",
        "desc": "Compresser un fichier PDF gratuitement sans perte de qualité. 100% traitement local sans téléchargement sur serveur.",
        "heading": "Compresseur PDF Gratuit",
        "privacy": "🔒 Traitement 100% Local dans le Navigateur — Vos fichiers ne sont JAMAIS envoyés sur un serveur",
        "dropzone": "Glissez-déposez votre fichier PDF ici ou cliquez pour choisir",
        "btn": "Compresser le PDF Maintenant"
    }
}

for lang, info in pdf_tools_info.items():
    html_content = create_pdf_compressor_page(
        lang, info["title"], info["desc"], info["heading"], info["privacy"],
        info["dropzone"], info["btn"]
    )
    filepath = os.path.join(BASE_DIR, lang, "tools", "pdf-compressor.html")
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Successfully generated styled PDF Compressor for {lang}")
