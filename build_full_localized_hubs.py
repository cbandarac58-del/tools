import os

BASE_DIR = r"C:\Users\Pubudu Nuwan\.gemini\antigravity\scratch\toolsite"

def get_head(lang, title, desc):
    return f"""<!DOCTYPE html>
<html lang="{lang}">
<head>
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
  <link rel="icon" href="../favicon.png" type="image/png">
  <link rel="stylesheet" href="../css/style.css">
</head>"""

def get_header(pdf_t, conv_t, ai_t, util_t):
    return f"""  <header class="header" id="header">
    <div class="container">
      <a href="index.html" class="logo">
        <div class="logo-icon">⚡</div>
        SmartToolz<span class="gradient-text">AI</span>
      </a>
      <nav class="nav-links" id="navLinks">
        <a href="#pdf-tools">{pdf_t}</a>
        <a href="#utility-tools">{util_t}</a>
        <a href="#converters">{conv_t}</a>
        <a href="#ai-tools">{ai_t}</a>
      </nav>
      <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>"""

# Translations for all 30 tools per language
translations = {
    "es": {
        "title": "Herramientas Gratis de IA y Utilidades Online — SmartToolzAI",
        "desc": "30+ herramientas gratis en línea para comprimir PDF, contar palabras, convertir unidades y generar textos con IA. 100% privado.",
        "badge": "100% Gratis — Sin Registro Requerido",
        "hero_h1": 'Potencia tu Trabajo con <span class="gradient-text">Herramientas IA</span> y Utilidades',
        "hero_p": "herramientas gratis online. 100% privado, procesamiento local en tu navegador.",
        "search_ph": "Buscar herramientas... (PDF, contar palabras, conversor)",
        "nav": ["Herramientas PDF", "Convertidores", "Herramientas IA", "Utilidades"],
        "sec_pdf": ("📄 Herramientas PDF", "Herramientas PDF Gratis", "Procesamiento 100% local sin subir archivos a servidores"),
        "pdf_items": [
            ("tools/pdf-compressor.html", "Compresor de PDF Gratis", "Comprimir archivos PDF gratis online sin perder calidad. 100% privado y sin límites.", "red", "📉", "🔥 Popular"),
            ("tools/pdf-merger.html", "Unir PDF Gratis", "Combinar varios archivos PDF en un solo documento. Reordenar páginas e instantáneo.", "blue", "📑", "🔥 Popular")
        ],
        "sec_util": ("🔧 Utilidades Web", "Utilidades Web Gratis", "Herramientas esenciales para texto, desarrollo, diseño e imágenes"),
        "util_items": [
            ("tools/word-counter.html", "Contador de Palabras", "Conteo en tiempo real de palabras, caracteres y párrafos. Análisis de densidad de palabras clave.", "blue", "📝", "🔥 Popular"),
            ("tools/password-generator.html", "Generador de Contraseñas", "Crea contraseñas seguras y aleatorias con longitud personalizable.", "green", "🔐", ""),
            ("tools/case-converter.html", "Convertidor de Mayúsculas", "Convierte texto a MAYÚSCULAS, minúsculas, Title Case, camelCase y snake_case.", "purple", "🔤", ""),
            ("tools/age-calculator.html", "Calculadora de Edad", "Calcula tu edad exacta en años, meses, días, horas y cuenta regresiva de cumpleaños.", "orange", "🎂", ""),
            ("tools/lorem-generator.html", "Generador Lorem Ipsum", "Genera texto de relleno Lorem Ipsum personalizado para diseño y desarrollo.", "blue", "📄", ""),
            ("tools/qr-generator.html", "Generador de Código QR", "Crea códigos QR personalizados para enlaces, textos y Wi-Fi con descarga PNG.", "teal", "📱", ""),
            ("tools/color-picker.html", "Selector de Color", "Elige colores, convierte HEX/RGB/HSL y genera paletas armoniosas.", "pink", "🎨", ""),
            ("tools/image-compressor.html", "Compresor de Imágenes", "Comprime imágenes hasta un 80% más pequeñas sin perder calidad.", "red", "🖼️", ""),
            ("tools/embed-widget.html", "Generador de Widgets", "Incrusta convertidores o herramientas directamente en tu sitio web gratis.", "purple", "🧩", "✨ Nuevo")
        ],
        "sec_conv": ("📐 Convertidores", "Convertidores de Unidades", "Conversiones instantáneas y precisas de longitud, peso, temperatura y más"),
        "conv_items": [
            ("tools/length-converter.html", "Convertidor de Longitud", "Km a millas, metros a pies, cm a pulgadas al instante.", "blue", "📏", "🔥 Popular"),
            ("tools/weight-converter.html", "Convertidor de Peso", "Kilogramos a libras, gramos a onzas, toneladas al instante.", "green", "⚖️", ""),
            ("tools/temperature-converter.html", "Convertidor de Temperatura", "Celsius a Fahrenheit, Kelvin y Rankine al instante.", "orange", "🌡️", ""),
            ("tools/volume-converter.html", "Convertidor de Volumen", "Litros a galones, mililitros a onzas fluidas.", "purple", "🧪", ""),
            ("tools/area-converter.html", "Convertidor de Área", "Metros cuadrados a pies cuadrados, hectáreas a acres.", "teal", "📐", ""),
            ("tools/speed-converter.html", "Convertidor de Velocidad", "Km/h a mph, m/s a nudos al instante.", "red", "🚀", ""),
            ("tools/time-converter.html", "Convertidor de Tiempo", "Segundos, minutos, horas, días, semanas y años.", "yellow", "⏱️", ""),
            ("tools/data-storage-converter.html", "Convertidor de Almacenamiento", "Megabytes a Gigabytes, Terabytes a Bytes.", "blue", "💾", ""),
            ("tools/pressure-converter.html", "Convertidor de Presión", "Bar a PSI, Pascales a Atmósferas.", "pink", "🌡️", ""),
            ("tools/energy-converter.html", "Convertidor de Energía", "Julios a Calorías, Kilovatios-hora a BTU.", "green", "⚡", "")
        ],
        "sec_ai": ("🤖 Herramientas IA", "Generadores de Texto con IA", "Herramientas impulsadas por plantillas inteligentes para contenido rápido"),
        "ai_items": [
            ("tools/ai-email-generator.html", "Generador de Emails IA", "Crea correos profesionales y efectivos para cualquier ocasión.", "purple", "📧", "✨ IA"),
            ("tools/ai-title-generator.html", "Generador de Títulos IA", "Genera títulos atractivos y optimizados para blogs y artículos.", "blue", "✍️", "✨ IA"),
            ("tools/ai-paragraph-rewriter.html", "Reescritor de Párrafos", "Reescribe y mejora tus párrafos con diferentes tonos.", "green", "📝", "✨ IA"),
            ("tools/ai-bio-generator.html", "Generador de Bio Social", "Crea biografías atractivas para Instagram, X y LinkedIn.", "pink", "👤", "✨ IA"),
            ("tools/ai-business-name-generator.html", "Generador de Nombres de Marca", "Encuentra nombres de empresas creativos para tu proyecto.", "orange", "💡", "✨ IA"),
            ("tools/ai-slogan-generator.html", "Generador de Slogans", "Genera eslóganes pegajosos para tu marca.", "teal", "📢", "✨ IA"),
            ("tools/ai-meta-description-generator.html", "Meta Descripciones IA", "Genera meta descripciones optimizadas para SEO.", "red", "🔍", "✨ IA"),
            ("tools/ai-hashtag-generator.html", "Generador de Hashtags", "Encuentra los mejores hashtags virales para tus redes.", "purple", "#️⃣", "✨ IA"),
            ("tools/ai-post-generator.html", "Generador de Publicaciones", "Crea posts atractivos para Twitter, LinkedIn e Instagram.", "blue", "📱", "✨ IA")
        ]
    },
    "pt": {
        "title": "Ferramentas Grátis de IA e Utilitários Online — SmartToolzAI",
        "desc": "30+ ferramentas online grátis para comprimir PDF, contar palavras, converter unidades e gerar textos com IA. 100% privado.",
        "badge": "100% Grátis — Sem Registro Necessário",
        "hero_h1": 'Aumente sua Produtividade com <span class="gradient-text">Ferramentas de IA</span>',
        "hero_p": "ferramentas online grátis. 100% privado, processamento local no seu navegador.",
        "search_ph": "Buscar ferramentas... (PDF, contar palavras, conversor)",
        "nav": ["Ferramentas PDF", "Conversores", "Ferramentas IA", "Utilitários"],
        "sec_pdf": ("📄 Ferramentas PDF", "Ferramentas PDF Grátis", "Processamento 100% local sem enviar arquivos para servidores"),
        "pdf_items": [
            ("tools/pdf-compressor.html", "Compressor de PDF Grátis", "Comprimir arquivos PDF online sem perder qualidade. 100% privado e sem limites.", "red", "📉", "🔥 Popular"),
            ("tools/pdf-merger.html", "Juntar PDF Grátis", "Combinar vários arquivos PDF em um único documento. Reordenar páginas instantaneamente.", "blue", "📑", "🔥 Popular")
        ],
        "sec_util": ("🔧 Utilitários Web", "Utilitários Web Grátis", "Ferramentas essenciais para texto, desenvolvimento, design e imagens"),
        "util_items": [
            ("tools/word-counter.html", "Contador de Palavras", "Contagem em tempo real de palavras, caracteres e parágrafos.", "blue", "📝", "🔥 Popular"),
            ("tools/password-generator.html", "Gerador de Senhas", "Crie senhas seguras e aleatórias com comprimento personalizável.", "green", "🔐", ""),
            ("tools/case-converter.html", "Conversor de Maiúsculas", "Converta texto para MAIÚSCULAS, minúsculas e camelCase.", "purple", "🔤", ""),
            ("tools/age-calculator.html", "Calculadora de Idade", "Calcule sua idade exata em anos, meses e dias.", "orange", "🎂", ""),
            ("tools/lorem-generator.html", "Gerador Lorem Ipsum", "Gere texto Lorem Ipsum personalizado para design.", "blue", "📄", ""),
            ("tools/qr-generator.html", "Gerador de Código QR", "Crie códigos QR personalizados para links e texto.", "teal", "📱", ""),
            ("tools/color-picker.html", "Seletor de Cores", "Escolha cores, converta HEX/RGB/HSL e crie paletas.", "pink", "🎨", ""),
            ("tools/image-compressor.html", "Compressor de Imagens", "Comprima imagens até 80% menores sem perder qualidade.", "red", "🖼️", ""),
            ("tools/embed-widget.html", "Gerador de Widgets", "Incorpore conversores no seu site gratuitamente.", "purple", "🧩", "✨ Novo")
        ],
        "sec_conv": ("📐 Conversores", "Conversores de Unidades", "Conversões instantâneas de comprimento, peso, temperatura e mais"),
        "conv_items": [
            ("tools/length-converter.html", "Conversor de Comprimento", "Km para milhas, metros para pés, cm para polegadas.", "blue", "📏", "🔥 Popular"),
            ("tools/weight-converter.html", "Conversor de Peso", "Quilogramas para libras, gramas para onças.", "green", "⚖️", ""),
            ("tools/temperature-converter.html", "Conversor de Temperatura", "Celsius para Fahrenheit e Kelvin instantaneamente.", "orange", "🌡️", ""),
            ("tools/volume-converter.html", "Conversor de Volume", "Litros para galões, mililitros para onças fluidas.", "purple", "🧪", ""),
            ("tools/area-converter.html", "Conversor de Área", "Metros quadrados para pés quadrados, hectares para acres.", "teal", "📐", ""),
            ("tools/speed-converter.html", "Conversor de Velocidade", "Km/h para mph, m/s para nós.", "red", "🚀", ""),
            ("tools/time-converter.html", "Conversor de Tempo", "Segundos, minutos, horas, dias e anos.", "yellow", "⏱️", ""),
            ("tools/data-storage-converter.html", "Conversor de Armazenamento", "Megabytes para Gigabytes, Terabytes para Bytes.", "blue", "💾", ""),
            ("tools/pressure-converter.html", "Conversor de Pressão", "Bar para PSI, Pascais para Atmosferas.", "pink", "🌡️", ""),
            ("tools/energy-converter.html", "Conversor de Energia", "Joules para Calorias, Quilowatts-hora para BTU.", "green", "⚡", "")
        ],
        "sec_ai": ("🤖 Ferramentas IA", "Geradores de Texto com IA", "Ferramentas inteligentes para criação rápida de conteúdo"),
        "ai_items": [
            ("tools/ai-email-generator.html", "Gerador de E-mails IA", "Crie e-mails profissionais e eficazes.", "purple", "📧", "✨ IA"),
            ("tools/ai-title-generator.html", "Gerador de Títulos IA", "Gere títulos atraentes para blogs e artigos.", "blue", "✍️", "✨ IA"),
            ("tools/ai-paragraph-rewriter.html", "Reescritor de Parágrafos", "Reescreva e melhore seus parágrafos.", "green", "📝", "✨ IA"),
            ("tools/ai-bio-generator.html", "Gerador de Bio Social", "Crie biografias atraentes para redes sociais.", "pink", "👤", "✨ IA"),
            ("tools/ai-business-name-generator.html", "Gerador de Nomes de Marca", "Encontre nomes criativos para sua empresa.", "orange", "💡", "✨ IA"),
            ("tools/ai-slogan-generator.html", "Gerador de Slogans", "Gere slogans marcantes para sua marca.", "teal", "📢", "✨ IA"),
            ("tools/ai-meta-description-generator.html", "Meta Descrições IA", "Gere meta descrições otimizadas para SEO.", "red", "🔍", "✨ IA"),
            ("tools/ai-hashtag-generator.html", "Gerador de Hashtags", "Encontre as melhores hashtags para suas redes.", "purple", "#️⃣", "✨ IA"),
            ("tools/ai-post-generator.html", "Gerador de Publicações", "Crie posts incríveis para redes sociais.", "blue", "📱", "✨ IA")
        ]
    },
    "ja": {
        "title": "完全無料のAI＆便利Webツール集 — SmartToolzAI",
        "desc": "PDF圧縮、PDF結合、文字数カウント、AIメール作成など30種類以上のツールが登録不要・完全無料で使えます。100%ローカル処理で安心。",
        "badge": "100%完全無料 — 登録・ログイン不要",
        "hero_h1": '<span class="gradient-text">AI＆便利Webツール</span>で作業を圧倒的に効率化',
        "hero_p": "種類以上のWebツールが完全無料。ブラウザ内での100%ローカル処理で安心安全。",
        "search_ph": "ツールを検索... (例: PDF, 文字数, 単位換算)",
        "nav": ["PDFツール", "単位換算", "AIツール", "ユーティリティ"],
        "sec_pdf": ("📄 PDFツール集", "無料PDFツール集", "ファイル送信ゼロ！お使いのブラウザ内での完全ローカル処理"),
        "pdf_items": [
            ("tools/pdf-compressor.html", "無料PDF圧縮ツール", "PDFファイルを画質を損なわずに無料圧縮。ファイル送信なし・100%ローカル処理。", "red", "📉", "🔥 人気"),
            ("tools/pdf-merger.html", "無料PDF結合ツール", "複数のPDFファイルを1つに無料結合。順番並び替え可能・登録不要。", "blue", "📑", "🔥 人気")
        ],
        "sec_util": ("🔧 便利ツール", "無料Webユーティリティ", "テキスト作成、開発、デザイン、画像処理に役立つ便利ツール"),
        "util_items": [
            ("tools/word-counter.html", "無料文字数カウント", "リアルタイムで文字数・単語数・行数をカウント。読了時間も一瞬で分析。", "blue", "📝", "🔥 人気"),
            ("tools/password-generator.html", "パスワード自動生成", "解読不可能な強固なパスワードを即座に自動生成。", "green", "🔐", ""),
            ("tools/case-converter.html", "大文字小文字 変換", "大文字、小文字、キャメルケースなどを一瞬で変換。", "purple", "🔤", ""),
            ("tools/age-calculator.html", "年齢・日数計算", "正確な年齢、生後日数、次の誕生日カウントダウンを計算。", "orange", "🎂", ""),
            ("tools/lorem-generator.html", "ダミーテキスト作成", "デザイン用のLorem Ipsumダミーテキストを生成。", "blue", "📄", ""),
            ("tools/qr-generator.html", "QRコード作成", "URLやテキストから無料でカスタムQRコードを作成・保存。", "teal", "📱", ""),
            ("tools/color-picker.html", "カラーピッカー", "HEX/RGB/HSL変換と配色パレット生成。", "pink", "🎨", ""),
            ("tools/image-compressor.html", "画像圧縮ツール", "画像を画質を保ったまま最大80%軽量化。", "red", "🖼️", ""),
            ("tools/embed-widget.html", "埋め込みウィジェット生成", "あなたのサイトに各種ツールを無料で埋め込み。", "purple", "🧩", "✨ NEW")
        ],
        "sec_conv": ("📐 単位換算", "高精度 単位換算ツール", "長さ、重さ、温度、速度、データ容量などの即時換算"),
        "conv_items": [
            ("tools/length-converter.html", "長さ・距離換算", "km、マイル、メートル、フィート、インチを一瞬で正確に単位換算。", "blue", "📏", "🔥 人気"),
            ("tools/weight-converter.html", "重さ・質量換算", "kg、ポンド、グラム、オンス、トンを即座に換算。", "green", "⚖️", ""),
            ("tools/temperature-converter.html", "温度換算", "摂氏(℃)、華氏(℉)、ケルビン(K)を相互換算。", "orange", "🌡️", ""),
            ("tools/volume-converter.html", "体積・容量換算", "リットル、ガロン、ミリリットル、オンスを換算。", "purple", "🧪", ""),
            ("tools/area-converter.html", "面積換算", "平方メートル、坪、ヘクタール、エーカーを換算。", "teal", "📐", ""),
            ("tools/speed-converter.html", "速度換算", "km/h、mph、m/s、ノットを即座に換算。", "red", "🚀", ""),
            ("tools/time-converter.html", "時間換算", "秒、分、時間、日、週、年を換算。", "yellow", "⏱️", ""),
            ("tools/data-storage-converter.html", "データ容量換算", "MB、GB、TB、Byteを正確に換算。", "blue", "💾", ""),
            ("tools/pressure-converter.html", "圧力換算", "bar、PSI、Pa、気圧(atm)を換算。", "pink", "🌡️", ""),
            ("tools/energy-converter.html", "エネルギー換算", "ジュール、カロリー、kWh、BTUを換算。", "green", "⚡", "")
        ],
        "sec_ai": ("🤖 AIツール", "AI文章作成・生成ツール", "テンプレートベースのスマートAI文章生成"),
        "ai_items": [
            ("tools/ai-email-generator.html", "AIメール作成", "ビジネスメールや返信文をAIが自動作成。", "purple", "📧", "✨ AI"),
            ("tools/ai-title-generator.html", "AIブログ記事タイトル作成", "読まれる魅力的な記事タイトルを10案生成。", "blue", "✍️", "✨ AI"),
            ("tools/ai-paragraph-rewriter.html", "AI文章リライト", "文章を読みやすく自然な表現にリライト。", "green", "📝", "✨ AI"),
            ("tools/ai-bio-generator.html", "AIプロフィール作成", "SNS用の魅力的な自己紹介文を自動生成。", "pink", "👤", "✨ AI"),
            ("tools/ai-business-name-generator.html", "AIネーミング作成", "ブランドやサービスの名称アイデアを生成。", "orange", "💡", "✨ AI"),
            ("tools/ai-slogan-generator.html", "AIスローガン作成", "耳に残るキャッチコピー・スローガンを作成。", "teal", "📢", "✨ AI"),
            ("tools/ai-meta-description-generator.html", "AI Meta説明文作成", "SEOに最適なメタディスクリプションを生成。", "red", "🔍", "✨ AI"),
            ("tools/ai-hashtag-generator.html", "AIハッシュタグ生成", "バズる最適ハッシュタグを自動抽出。", "purple", "#️⃣", "✨ AI"),
            ("tools/ai-post-generator.html", "AI SNS投稿作成", "Twitter, Instagram, LinkedIn用の投稿を作成。", "blue", "📱", "✨ AI")
        ]
    }
}

# Copy ES translations for DE and FR with German & French phrases
translations["de"] = translations["es"].copy()
translations["de"]["title"] = "Kostenlose KI- & Online-Werkzeuge — SmartToolzAI"
translations["de"]["desc"] = "30+ kostenlose Online-Tools für PDF, Wortzähler, Einheiten und KI."
translations["de"]["badge"] = "100% Kostenlos — Keine Anmeldung Erforderlich"
translations["de"]["hero_h1"] = 'Steigern Sie Ihre Arbeit mit <span class="gradient-text">KI-Tools</span>'
translations["de"]["hero_p"] = "kostenlose Online-Tools. 100% privat, lokale Verarbeitung in Ihrem Browser."
translations["de"]["search_ph"] = "Tools suchen..."

translations["fr"] = translations["es"].copy()
translations["fr"]["title"] = "Outils IA et Utilitaires En Ligne Gratuits — SmartToolzAI"
translations["fr"]["desc"] = "30+ outils en ligne gratuits pour PDF, compteur de mots, convertisseurs et IA."
translations["fr"]["badge"] = "100% Gratuit — Sans Inscription Requise"
translations["fr"]["hero_h1"] = 'Boostez Votre Travail Avec Nos <span class="gradient-text">Outils IA</span>'
translations["fr"]["hero_p"] = "outils en ligne gratuits. 100% privé, traitement local dans votre navigateur."
translations["fr"]["search_ph"] = "Rechercher des outils..."

def build_cards_html(items):
    cards = []
    for href, title, desc, icon_color, icon, badge in items:
        badge_html = f'<span class="tool-badge popular">{badge}</span>' if badge else ''
        cards.append(f"""        <a href="{href}" class="tool-card" data-tool="{title}">
          {badge_html}
          <div class="tool-card-icon {icon_color}">{icon}</div>
          <h3>{title}</h3>
          <p>{desc}</p>
          <div class="card-arrow">→</div>
        </a>""")
    return "\n".join(cards)

for lang, d in translations.items():
    nav = d["nav"]
    header = get_header(nav[0], nav[1], nav[2], nav[3])
    head = get_head(lang, d["title"], d["desc"])
    
    sec_pdf_tag, sec_pdf_h2, sec_pdf_p = d["sec_pdf"]
    sec_util_tag, sec_util_h2, sec_util_p = d["sec_util"]
    sec_conv_tag, sec_conv_h2, sec_conv_p = d["sec_conv"]
    sec_ai_tag, sec_ai_h2, sec_ai_p = d["sec_ai"]

    pdf_cards = build_cards_html(d["pdf_items"])
    util_cards = build_cards_html(d["util_items"])
    conv_cards = build_cards_html(d["conv_items"])
    ai_cards = build_cards_html(d["ai_items"])

    full_html = f"""{head}
<body>
{header}

  <main style="padding-top: 5rem;">
    <section class="hero">
      <div class="hero-bg-glow"></div>
      <div class="container">
        <div class="hero-badge animate-in">
          <span class="badge-dot"></span>
          {d["badge"]}
        </div>
        <h1>{d["hero_h1"]}</h1>
        <p><span id="totalToolsCount">30+</span> {d["hero_p"]}</p>

        <div class="hero-search">
          <span class="search-icon">🔍</span>
          <input type="text" id="toolSearch" placeholder="{d["search_ph"]}">
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
          <div class="section-tag">{sec_pdf_tag}</div>
          <h2>{sec_pdf_h2}</h2>
          <p>{sec_pdf_p}</p>
        </div>
        <div class="tools-grid stagger-children">
{pdf_cards}
        </div>
      </div>
    </section>

    <!-- UTILITY TOOLS -->
    <section class="section" id="utility-tools">
      <div class="container">
        <div class="section-header animate-in">
          <div class="section-tag">{sec_util_tag}</div>
          <h2>{sec_util_h2}</h2>
          <p>{sec_util_p}</p>
        </div>
        <div class="tools-grid stagger-children">
{util_cards}
        </div>
      </div>
    </section>

    <!-- CONVERTERS -->
    <section class="section" id="converters">
      <div class="container">
        <div class="section-header animate-in">
          <div class="section-tag">{sec_conv_tag}</div>
          <h2>{sec_conv_h2}</h2>
          <p>{sec_conv_p}</p>
        </div>
        <div class="tools-grid stagger-children">
{conv_cards}
        </div>
      </div>
    </section>

    <!-- AI TOOLS -->
    <section class="section" id="ai-tools">
      <div class="container">
        <div class="section-header animate-in">
          <div class="section-tag">{sec_ai_tag}</div>
          <h2>{sec_ai_h2}</h2>
          <p>{sec_ai_p}</p>
        </div>
        <div class="tools-grid stagger-children">
{ai_cards}
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-bottom">
        <p>© 2026 SmartToolzAI. All rights reserved. 100% Client-Side & Private.</p>
      </div>
    </div>
  </footer>
  <script src="../js/main.js"></script>
</body>
</html>"""

    filepath = os.path.join(BASE_DIR, lang, "index.html")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(full_html)
    print(f"Build complete for {lang}/index.html with ALL 30+ tools!")
