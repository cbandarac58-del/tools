"""
SmartToolzAI — Phase 1+2: Localized Tool SEO Meta Titles + UI Labels
Updates all 150 localized tool pages with proper meta titles, meta descriptions,
and common UI form label translations per language.
"""
import os, re

BASE_DIR = r"C:\Users\Pubudu Nuwan\.gemini\antigravity\scratch\toolsite"

# =============================================
# Per-tool SEO meta data per language
# Format: filename_stem -> { lang: (title, desc) }
# =============================================
TOOL_SEO = {
    "word-counter": {
        "es": ("Contador de Palabras y Caracteres Gratis — SmartToolzAI",
               "Cuenta palabras, caracteres, párrafos y tiempo de lectura en tiempo real. 100% gratis, sin registro, funciona en tu navegador."),
        "pt": ("Contador de Palavras e Caracteres Grátis — SmartToolzAI",
               "Conte palavras, caracteres, parágrafos e tempo de leitura em tempo real. 100% grátis, sem cadastro, funciona no seu navegador."),
        "ja": ("無料文字数カウントツール（リアルタイム）— SmartToolzAI",
               "文字数・単語数・段落数・読了時間をリアルタイムでカウント。登録不要・完全無料・ブラウザで即時動作。"),
        "de": ("Kostenloser Wörter- & Zeichenzähler Online — SmartToolzAI",
               "Zählen Sie Wörter, Zeichen und Absätze in Echtzeit. 100% kostenlos, keine Anmeldung, funktioniert direkt im Browser."),
        "fr": ("Compteur de Mots et Caractères Gratuit — SmartToolzAI",
               "Comptez les mots, caractères, paragraphes et temps de lecture en temps réel. 100% gratuit, sans inscription, fonctionne dans votre navigateur."),
    },
    "password-generator": {
        "es": ("Generador de Contraseñas Seguras Gratis — SmartToolzAI",
               "Crea contraseñas seguras y aleatorias al instante. Personaliza longitud y caracteres. 100% local, sin registro."),
        "pt": ("Gerador de Senhas Fortes Grátis — SmartToolzAI",
               "Gere senhas seguras e aleatórias instantaneamente. Personalize comprimento e caracteres. 100% local, sem cadastro."),
        "ja": ("無料パスワード自動生成ツール — SmartToolzAI",
               "強力なランダムパスワードを即座に自動生成。文字数・記号を自由にカスタマイズ。完全ローカル処理・登録不要。"),
        "de": ("Kostenloser Passwort-Generator Online — SmartToolzAI",
               "Erstellen Sie sofort sichere, zufällige Passwörter. Länge und Zeichen anpassbar. 100% lokal, keine Anmeldung."),
        "fr": ("Générateur de Mots de Passe Sécurisé Gratuit — SmartToolzAI",
               "Créez des mots de passe forts et aléatoires instantanément. Personnalisez longueur et caractères. 100% local, sans inscription."),
    },
    "case-converter": {
        "es": ("Convertidor de Mayúsculas y Minúsculas Gratis — SmartToolzAI",
               "Convierte texto a MAYÚSCULAS, minúsculas, Title Case, camelCase y snake_case al instante. 100% gratis."),
        "pt": ("Conversor de Maiúsculas e Minúsculas Grátis — SmartToolzAI",
               "Converta texto para MAIÚSCULAS, minúsculas, Title Case, camelCase e snake_case instantaneamente."),
        "ja": ("大文字・小文字変換ツール 無料 — SmartToolzAI",
               "テキストを大文字・小文字・タイトルケース・キャメルケース・スネークケースに即座に変換。完全無料。"),
        "de": ("Groß-/Kleinschreibung Konverter Kostenlos — SmartToolzAI",
               "Text zu GROSSBUCHSTABEN, Kleinbuchstaben, Title Case, camelCase und snake_case umwandeln. 100% kostenlos."),
        "fr": ("Convertisseur de Casse Gratuit — SmartToolzAI",
               "Convertissez du texte en MAJUSCULES, minuscules, Title Case, camelCase et snake_case instantanément."),
    },
    "age-calculator": {
        "es": ("Calculadora de Edad Exacta Gratis — SmartToolzAI",
               "Calcula tu edad exacta en años, meses, días y horas. Cuenta regresiva hasta tu próximo cumpleaños. 100% gratis."),
        "pt": ("Calculadora de Idade Exata Grátis — SmartToolzAI",
               "Calcule sua idade exata em anos, meses, dias e horas. Contagem regressiva até seu próximo aniversário."),
        "ja": ("無料年齢・誕生日計算ツール — SmartToolzAI",
               "生年月日から正確な年齢（年・月・日・時間）を計算。次の誕生日までのカウントダウン付き。完全無料。"),
        "de": ("Kostenloser Altersrechner Online — SmartToolzAI",
               "Berechnen Sie Ihr genaues Alter in Jahren, Monaten, Tagen und Stunden. Countdown bis zum nächsten Geburtstag."),
        "fr": ("Calculateur d'Âge Exact Gratuit — SmartToolzAI",
               "Calculez votre âge exact en années, mois, jours et heures. Compte à rebours jusqu'à votre prochain anniversaire."),
    },
    "lorem-generator": {
        "es": ("Generador de Texto Lorem Ipsum Gratis — SmartToolzAI",
               "Genera texto de relleno Lorem Ipsum personalizado para diseño web y maquetación. 100% gratis, sin registro."),
        "pt": ("Gerador de Texto Lorem Ipsum Grátis — SmartToolzAI",
               "Gere texto Lorem Ipsum personalizado para design web e prototipagem. 100% grátis, sem cadastro."),
        "ja": ("無料Loremイプサムダミーテキスト生成ツール — SmartToolzAI",
               "デザインやプロトタイプ用のLoremイプサムダミーテキストを自由に生成。完全無料・登録不要。"),
        "de": ("Kostenloser Lorem Ipsum Generator — SmartToolzAI",
               "Generieren Sie benutzerdefinierten Lorem-Ipsum-Platzhaltertext für Webdesign und Layout. 100% kostenlos."),
        "fr": ("Générateur de Texte Lorem Ipsum Gratuit — SmartToolzAI",
               "Générez du texte Lorem Ipsum personnalisé pour le design web et la maquette. 100% gratuit, sans inscription."),
    },
    "qr-generator": {
        "es": ("Generador de Código QR Gratis (Descarga PNG) — SmartToolzAI",
               "Crea códigos QR personalizados para URLs, texto, WiFi o contactos. Descarga en PNG. 100% gratis, sin registro."),
        "pt": ("Gerador de QR Code Grátis (Download PNG) — SmartToolzAI",
               "Crie QR codes personalizados para URLs, texto, WiFi ou contatos. Baixe em PNG. 100% grátis, sem cadastro."),
        "ja": ("無料QRコード作成ツール（PNG保存対応）— SmartToolzAI",
               "URL・テキスト・WiFi・連絡先のQRコードを無料作成。PNG形式でダウンロード可能。登録不要・完全無料。"),
        "de": ("Kostenloser QR-Code Generator Online (PNG Download) — SmartToolzAI",
               "Erstellen Sie QR-Codes für URLs, Text, WLAN oder Kontakte. PNG-Download. 100% kostenlos, keine Anmeldung."),
        "fr": ("Générateur de QR Code Gratuit (Téléchargement PNG) — SmartToolzAI",
               "Créez des QR codes pour URLs, texte, WiFi ou contacts. Téléchargez en PNG. 100% gratuit, sans inscription."),
    },
    "color-picker": {
        "es": ("Selector de Color Online Gratis — SmartToolzAI",
               "Elige colores, convierte entre HEX, RGB y HSL, y genera paletas de colores armoniosas. 100% gratis."),
        "pt": ("Seletor de Cores Online Grátis — SmartToolzAI",
               "Escolha cores, converta entre HEX, RGB e HSL, e gere paletas de cores harmoniosas. 100% grátis."),
        "ja": ("無料カラーピッカー・カラーコード変換ツール — SmartToolzAI",
               "カラーピッカーでHEX・RGB・HSLを相互変換。調和のとれたカラーパレットも自動生成。完全無料。"),
        "de": ("Kostenloser Farbwähler & Farbcode-Konverter — SmartToolzAI",
               "Farben auswählen, HEX, RGB und HSL konvertieren, harmonische Farbpaletten erstellen. 100% kostenlos."),
        "fr": ("Sélecteur de Couleur Gratuit en Ligne — SmartToolzAI",
               "Choisissez des couleurs, convertissez HEX, RGB et HSL, générez des palettes harmonieuses. 100% gratuit."),
    },
    "image-compressor": {
        "es": ("Compresor de Imágenes Online Gratis (Sin Pérdida) — SmartToolzAI",
               "Comprime imágenes JPEG, PNG y WebP hasta un 80% sin perder calidad. 100% local, sin subir archivos."),
        "pt": ("Compressor de Imagens Online Grátis (Sem Perda) — SmartToolzAI",
               "Comprima imagens JPEG, PNG e WebP até 80% sem perder qualidade. 100% local, sem enviar arquivos."),
        "ja": ("無料画像圧縮ツール（高画質維持）— SmartToolzAI",
               "JPEG・PNG・WebP画像を最大80%圧縮。画質を保ったままファイルサイズを削減。ファイル送信なし・完全ローカル処理。"),
        "de": ("Kostenloser Bildkompressor Online (Verlustfrei) — SmartToolzAI",
               "JPEG, PNG und WebP Bilder bis zu 80% komprimieren ohne Qualitätsverlust. 100% lokal, keine Uploads."),
        "fr": ("Compresseur d'Images en Ligne Gratuit (Sans Perte) — SmartToolzAI",
               "Compressez des images JPEG, PNG et WebP jusqu'à 80% sans perte de qualité. 100% local, sans téléversement."),
    },
    "pdf-compressor": {
        "es": ("Compresor de PDF Gratis Sin Subir Archivos — SmartToolzAI",
               "Comprime archivos PDF online gratis sin perder calidad. 100% local, privado, sin registro ni límites de tamaño."),
        "pt": ("Compressor de PDF Grátis Sem Enviar Arquivos — SmartToolzAI",
               "Comprima PDFs online grátis sem perder qualidade. 100% local, privado, sem cadastro nem limite de tamanho."),
        "ja": ("無料PDF圧縮ツール（ファイル送信なし・100%ローカル）— SmartToolzAI",
               "PDFファイルを画質を損なわず無料圧縮。ファイルはサーバーに送信されません。登録不要・完全ローカル処理。"),
        "de": ("PDF Komprimieren Kostenlos Ohne Upload — SmartToolzAI",
               "PDF-Dateien online komprimieren ohne Qualitätsverlust. 100% lokal, privat, ohne Anmeldung und ohne Datei-Upload."),
        "fr": ("Compresseur PDF Gratuit Sans Téléversement — SmartToolzAI",
               "Compressez des PDF en ligne gratuitement sans perte de qualité. 100% local, privé, sans inscription ni limite de taille."),
    },
    "pdf-merger": {
        "es": ("Unir PDF Gratis Sin Subir Archivos — SmartToolzAI",
               "Combina múltiples archivos PDF en uno solo al instante. Reordena páginas, 100% local, privado y sin registro."),
        "pt": ("Juntar PDF Grátis Sem Enviar Arquivos — SmartToolzAI",
               "Una múltiplos PDFs em um só documento instantaneamente. Reordene páginas, 100% local, privado, sem cadastro."),
        "ja": ("無料PDF結合ツール（ファイル送信なし）— SmartToolzAI",
               "複数のPDFを1つに無料結合。ページの順番を自由に並び替え可能。ファイルはサーバーに送信されません。"),
        "de": ("PDF Zusammenfügen Kostenlos Ohne Upload — SmartToolzAI",
               "Mehrere PDF-Dateien sofort zu einer zusammenführen. Seiten neu anordnen, 100% lokal, privat, ohne Anmeldung."),
        "fr": ("Fusionner PDF Gratuit Sans Téléversement — SmartToolzAI",
               "Combinez plusieurs PDF en un seul document instantanément. Réordonnez les pages, 100% local, privé, sans inscription."),
    },
    "length-converter": {
        "es": ("Convertidor de Longitud Gratis: km, millas, metros — SmartToolzAI",
               "Convierte km a millas, metros a pies, cm a pulgadas y más al instante. Calculadora de unidades de longitud gratuita."),
        "pt": ("Conversor de Comprimento Grátis: km, milhas, metros — SmartToolzAI",
               "Converta km para milhas, metros para pés, cm para polegadas e muito mais. Calculadora de unidades de comprimento gratuita."),
        "ja": ("無料長さ・距離換算ツール（km・マイル・メートル）— SmartToolzAI",
               "km・マイル・メートル・フィート・インチを瞬時に正確換算。完全無料の長さ単位換算ツール。"),
        "de": ("Längenumrechner Kostenlos: km, Meilen, Meter — SmartToolzAI",
               "Kilometer zu Meilen, Meter zu Fuß, cm zu Zoll und mehr sofort umrechnen. Kostenloser Längeneinheiten-Rechner."),
        "fr": ("Convertisseur de Longueur Gratuit: km, miles, mètres — SmartToolzAI",
               "Convertissez km en miles, mètres en pieds, cm en pouces et plus instantanément. Calculateur d'unités de longueur gratuit."),
    },
    "embed-widget": {
        "es": ("Generador de Widget para tu Web Gratis — SmartToolzAI",
               "Incrusta convertidores de unidades o herramientas gratuitas directamente en tu sitio web. Copia el código embed y listo."),
        "pt": ("Gerador de Widget para seu Site Grátis — SmartToolzAI",
               "Incorpore conversores de unidades ou ferramentas gratuitas diretamente no seu site. Copie o código embed e pronto."),
        "ja": ("無料ウェブサイト埋め込みウィジェット生成ツール — SmartToolzAI",
               "単位換算ツールや便利ツールをあなたのサイトに無料で埋め込み。埋め込みコードをコピーするだけで完了。"),
        "de": ("Kostenloser Website-Widget-Generator — SmartToolzAI",
               "Betten Sie Einheitenrechner oder nützliche Tools kostenlos in Ihre Website ein. Einfach Embed-Code kopieren."),
        "fr": ("Générateur de Widget Gratuit pour votre Site — SmartToolzAI",
               "Intégrez des convertisseurs d'unités ou des outils utiles dans votre site gratuitement. Copiez le code d'intégration."),
    },
}

# Generic fallback for converter tools (weight, temp, etc.)
CONVERTER_GENERIC = {
    "es": (" Gratis Online — SmartToolzAI", "Convertidor de unidades gratuito. Conversiones instantáneas y precisas en tu navegador. 100% gratis, sin registro."),
    "pt": (" Grátis Online — SmartToolzAI", "Conversor de unidades gratuito. Conversões instantâneas e precisas no seu navegador. 100% grátis, sem cadastro."),
    "ja": (" 無料オンラインツール — SmartToolzAI", "無料の単位換算ツール。ブラウザで即時・正確に換算できます。完全無料・登録不要。"),
    "de": (" Kostenlos Online — SmartToolzAI", "Kostenloser Einheitenrechner. Sofortige und genaue Umrechnungen direkt im Browser. 100% kostenlos, keine Anmeldung."),
    "fr": (" Gratuit en Ligne — SmartToolzAI", "Convertisseur d'unités gratuit. Conversions instantanées et précises dans votre navigateur. 100% gratuit, sans inscription."),
}

AI_GENERIC = {
    "es": (" IA Gratis — SmartToolzAI", "Generador de texto con IA gratis. Sin registro, funciona en tu navegador al instante. 100% gratuito."),
    "pt": (" IA Grátis — SmartToolzAI", "Gerador de texto com IA grátis. Sem cadastro, funciona no seu navegador instantaneamente. 100% gratuito."),
    "ja": (" AI無料ツール — SmartToolzAI", "無料AIテキスト生成ツール。登録不要・ブラウザで即座に動作。完全無料。"),
    "de": (" KI Kostenlos — SmartToolzAI", "Kostenloser KI-Textgenerator. Keine Anmeldung, funktioniert sofort im Browser. 100% kostenlos."),
    "fr": (" IA Gratuit — SmartToolzAI", "Générateur de texte IA gratuit. Sans inscription, fonctionne instantanément dans votre navigateur. 100% gratuit."),
}

# =============================================
# PHASE 2: Common UI label translations
# These are regex-replaced in tool HTML files
# =============================================
UI_TRANSLATIONS = {
    "es": {
        "Enter Text or URL:": "Ingresa Texto o URL:",
        "Enter text or URL": "Ingresa texto o URL",
        "Enter your text here...": "Ingresa tu texto aquí...",
        "Enter text here...": "Ingresa tu texto aquí...",
        "Type or paste your text here...": "Escribe o pega tu texto aquí...",
        "Type or paste text here...": "Escribe o pega texto aquí...",
        "Generate": "Generar",
        "Results": "Resultados",
        "Output": "Resultado",
        "Size:": "Tamaño:",
        "Color:": "Color:",
        "Background:": "Fondo:",
        "Foreground:": "Primer plano:",
        "Date of Birth:": "Fecha de Nacimiento:",
        "Date of Birth": "Fecha de Nacimiento",
        "Calculate": "Calcular",
        "Number of Paragraphs:": "Número de Párrafos:",
        "Words per Paragraph:": "Palabras por Párrafo:",
        "Start with Lorem Ipsum": "Empezar con Lorem Ipsum",
        "Include HTML Tags": "Incluir Etiquetas HTML",
        "Password Length:": "Longitud de la Contraseña:",
        "Include Uppercase": "Incluir Mayúsculas",
        "Include Numbers": "Incluir Números",
        "Include Symbols": "Incluir Símbolos",
        "Exclude Ambiguous": "Excluir Ambiguos",
        "Quality:": "Calidad:",
        "High Quality": "Alta Calidad",
        "Medium Quality": "Calidad Media",
        "Low Quality (Smallest)": "Baja Calidad (Más Pequeño)",
        "Drop your PDF files here": "Arrastra tus archivos PDF aquí",
        "or click to browse": "o haz clic para navegar",
        "Drag and drop PDF files here": "Arrastra y suelta archivos PDF aquí",
        "Click to Upload": "Clic para Subir",
        "Compress PDF": "Comprimir PDF",
        "Merge PDFs": "Unir PDFs",
        "Download Compressed PDF": "Descargar PDF Comprimido",
        "Download Merged PDF": "Descargar PDF Unido",
        "Published:": "Publicado:",
        "min read": "min de lectura",
        "Frequency Analysis": "Análisis de Frecuencia",
        "Word Frequency": "Frecuencia de Palabras",
        "Reading Time": "Tiempo de Lectura",
        "Speaking Time": "Tiempo de Habla",
        "Character Count": "Conteo de Caracteres",
        "Word Count": "Conteo de Palabras",
        "Sentence Count": "Conteo de Oraciones",
        "Paragraph Count": "Conteo de Párrafos",
        "From:": "De:",
        "To:": "A:",
        "Value:": "Valor:",
        "Convert": "Convertir",
    },
    "pt": {
        "Enter Text or URL:": "Insira Texto ou URL:",
        "Enter text or URL": "Insira texto ou URL",
        "Enter your text here...": "Insira seu texto aqui...",
        "Enter text here...": "Insira texto aqui...",
        "Type or paste your text here...": "Digite ou cole seu texto aqui...",
        "Type or paste text here...": "Digite ou cole texto aqui...",
        "Generate": "Gerar",
        "Results": "Resultados",
        "Output": "Resultado",
        "Size:": "Tamanho:",
        "Color:": "Cor:",
        "Background:": "Fundo:",
        "Foreground:": "Frente:",
        "Date of Birth:": "Data de Nascimento:",
        "Date of Birth": "Data de Nascimento",
        "Calculate": "Calcular",
        "Number of Paragraphs:": "Número de Parágrafos:",
        "Words per Paragraph:": "Palavras por Parágrafo:",
        "Start with Lorem Ipsum": "Começar com Lorem Ipsum",
        "Include HTML Tags": "Incluir Tags HTML",
        "Password Length:": "Comprimento da Senha:",
        "Include Uppercase": "Incluir Maiúsculas",
        "Include Numbers": "Incluir Números",
        "Include Symbols": "Incluir Símbolos",
        "Exclude Ambiguous": "Excluir Ambíguos",
        "Quality:": "Qualidade:",
        "High Quality": "Alta Qualidade",
        "Medium Quality": "Qualidade Média",
        "Low Quality (Smallest)": "Baixa Qualidade (Menor)",
        "Drop your PDF files here": "Arraste seus arquivos PDF aqui",
        "or click to browse": "ou clique para navegar",
        "Drag and drop PDF files here": "Arraste e solte arquivos PDF aqui",
        "Click to Upload": "Clique para Enviar",
        "Compress PDF": "Comprimir PDF",
        "Merge PDFs": "Juntar PDFs",
        "Download Compressed PDF": "Baixar PDF Comprimido",
        "Download Merged PDF": "Baixar PDF Unido",
        "Published:": "Publicado:",
        "min read": "min de leitura",
        "Frequency Analysis": "Análise de Frequência",
        "Word Frequency": "Frequência de Palavras",
        "Reading Time": "Tempo de Leitura",
        "Speaking Time": "Tempo de Fala",
        "Character Count": "Contagem de Caracteres",
        "Word Count": "Contagem de Palavras",
        "Sentence Count": "Contagem de Frases",
        "Paragraph Count": "Contagem de Parágrafos",
        "From:": "De:",
        "To:": "Para:",
        "Value:": "Valor:",
        "Convert": "Converter",
    },
    "ja": {
        "Enter Text or URL:": "テキストまたはURLを入力:",
        "Enter text or URL": "テキストまたはURLを入力",
        "Enter your text here...": "ここにテキストを入力...",
        "Enter text here...": "ここにテキストを入力...",
        "Type or paste your text here...": "テキストを入力または貼り付け...",
        "Type or paste text here...": "テキストを入力または貼り付け...",
        "Generate": "生成する",
        "Results": "結果",
        "Output": "出力結果",
        "Size:": "サイズ:",
        "Color:": "色:",
        "Background:": "背景色:",
        "Foreground:": "前景色:",
        "Date of Birth:": "生年月日:",
        "Date of Birth": "生年月日",
        "Calculate": "計算する",
        "Number of Paragraphs:": "段落数:",
        "Words per Paragraph:": "1段落あたりの単語数:",
        "Start with Lorem Ipsum": "Lorem Ipsumで始める",
        "Include HTML Tags": "HTMLタグを含める",
        "Password Length:": "パスワードの長さ:",
        "Include Uppercase": "大文字を含める",
        "Include Numbers": "数字を含める",
        "Include Symbols": "記号を含める",
        "Exclude Ambiguous": "紛らわしい文字を除外",
        "Quality:": "品質:",
        "High Quality": "高品質",
        "Medium Quality": "中品質",
        "Low Quality (Smallest)": "低品質（最小サイズ）",
        "Drop your PDF files here": "PDFファイルをここにドロップ",
        "or click to browse": "またはクリックして選択",
        "Drag and drop PDF files here": "PDFファイルをドラッグ＆ドロップ",
        "Click to Upload": "クリックしてアップロード",
        "Compress PDF": "PDFを圧縮する",
        "Merge PDFs": "PDFを結合する",
        "Download Compressed PDF": "圧縮PDFをダウンロード",
        "Download Merged PDF": "結合PDFをダウンロード",
        "Published:": "公開日:",
        "min read": "分で読める",
        "Frequency Analysis": "頻度分析",
        "Word Frequency": "単語の頻度",
        "Reading Time": "読了時間",
        "Speaking Time": "スピーキング時間",
        "Character Count": "文字数",
        "Word Count": "単語数",
        "Sentence Count": "文数",
        "Paragraph Count": "段落数",
        "From:": "変換元:",
        "To:": "変換先:",
        "Value:": "値:",
        "Convert": "換算する",
    },
    "de": {
        "Enter Text or URL:": "Text oder URL eingeben:",
        "Enter text or URL": "Text oder URL eingeben",
        "Enter your text here...": "Text hier eingeben...",
        "Enter text here...": "Text hier eingeben...",
        "Type or paste your text here...": "Text eingeben oder einfügen...",
        "Type or paste text here...": "Text eingeben oder einfügen...",
        "Generate": "Erstellen",
        "Results": "Ergebnisse",
        "Output": "Ausgabe",
        "Size:": "Größe:",
        "Color:": "Farbe:",
        "Background:": "Hintergrund:",
        "Foreground:": "Vordergrund:",
        "Date of Birth:": "Geburtsdatum:",
        "Date of Birth": "Geburtsdatum",
        "Calculate": "Berechnen",
        "Number of Paragraphs:": "Anzahl der Absätze:",
        "Words per Paragraph:": "Wörter pro Absatz:",
        "Start with Lorem Ipsum": "Mit Lorem Ipsum beginnen",
        "Include HTML Tags": "HTML-Tags einbeziehen",
        "Password Length:": "Passwortlänge:",
        "Include Uppercase": "Großbuchstaben einbeziehen",
        "Include Numbers": "Zahlen einbeziehen",
        "Include Symbols": "Sonderzeichen einbeziehen",
        "Exclude Ambiguous": "Mehrdeutige ausschließen",
        "Quality:": "Qualität:",
        "High Quality": "Hohe Qualität",
        "Medium Quality": "Mittlere Qualität",
        "Low Quality (Smallest)": "Niedrige Qualität (Kleinste)",
        "Drop your PDF files here": "PDF-Dateien hier ablegen",
        "or click to browse": "oder klicken zum Durchsuchen",
        "Drag and drop PDF files here": "PDF-Dateien hierher ziehen",
        "Click to Upload": "Klicken zum Hochladen",
        "Compress PDF": "PDF Komprimieren",
        "Merge PDFs": "PDFs Zusammenfügen",
        "Download Compressed PDF": "Komprimiertes PDF Herunterladen",
        "Download Merged PDF": "Zusammengeführtes PDF Herunterladen",
        "Published:": "Veröffentlicht:",
        "min read": "Min. Lesezeit",
        "Frequency Analysis": "Häufigkeitsanalyse",
        "Word Frequency": "Worthäufigkeit",
        "Reading Time": "Lesezeit",
        "Speaking Time": "Sprechzeit",
        "Character Count": "Zeichenanzahl",
        "Word Count": "Wörteranzahl",
        "Sentence Count": "Satzanzahl",
        "Paragraph Count": "Absatzanzahl",
        "From:": "Von:",
        "To:": "Nach:",
        "Value:": "Wert:",
        "Convert": "Umrechnen",
    },
    "fr": {
        "Enter Text or URL:": "Entrez du Texte ou une URL:",
        "Enter text or URL": "Entrez du texte ou une URL",
        "Enter your text here...": "Entrez votre texte ici...",
        "Enter text here...": "Entrez du texte ici...",
        "Type or paste your text here...": "Tapez ou collez votre texte ici...",
        "Type or paste text here...": "Tapez ou collez du texte ici...",
        "Generate": "Générer",
        "Results": "Résultats",
        "Output": "Résultat",
        "Size:": "Taille:",
        "Color:": "Couleur:",
        "Background:": "Arrière-plan:",
        "Foreground:": "Premier plan:",
        "Date of Birth:": "Date de Naissance:",
        "Date of Birth": "Date de Naissance",
        "Calculate": "Calculer",
        "Number of Paragraphs:": "Nombre de Paragraphes:",
        "Words per Paragraph:": "Mots par Paragraphe:",
        "Start with Lorem Ipsum": "Commencer par Lorem Ipsum",
        "Include HTML Tags": "Inclure les Balises HTML",
        "Password Length:": "Longueur du Mot de Passe:",
        "Include Uppercase": "Inclure les Majuscules",
        "Include Numbers": "Inclure les Chiffres",
        "Include Symbols": "Inclure les Symboles",
        "Exclude Ambiguous": "Exclure les Ambigus",
        "Quality:": "Qualité:",
        "High Quality": "Haute Qualité",
        "Medium Quality": "Qualité Moyenne",
        "Low Quality (Smallest)": "Basse Qualité (Plus Petit)",
        "Drop your PDF files here": "Déposez vos fichiers PDF ici",
        "or click to browse": "ou cliquez pour parcourir",
        "Drag and drop PDF files here": "Glissez-déposez des fichiers PDF ici",
        "Click to Upload": "Cliquer pour Téléverser",
        "Compress PDF": "Compresser le PDF",
        "Merge PDFs": "Fusionner les PDFs",
        "Download Compressed PDF": "Télécharger le PDF Compressé",
        "Download Merged PDF": "Télécharger le PDF Fusionné",
        "Published:": "Publié le:",
        "min read": "min de lecture",
        "Frequency Analysis": "Analyse de Fréquence",
        "Word Frequency": "Fréquence des Mots",
        "Reading Time": "Temps de Lecture",
        "Speaking Time": "Temps de Parole",
        "Character Count": "Nombre de Caractères",
        "Word Count": "Nombre de Mots",
        "Sentence Count": "Nombre de Phrases",
        "Paragraph Count": "Nombre de Paragraphes",
        "From:": "De:",
        "To:": "Vers:",
        "Value:": "Valeur:",
        "Convert": "Convertir",
    },
}

LANGS = ["es", "pt", "ja", "de", "fr"]

# =============================================
# MAIN PROCESSING
# =============================================
def get_stem(filename):
    return filename.replace(".html", "")

total_updated = 0
for lang in LANGS:
    lang_tools_dir = os.path.join(BASE_DIR, lang, "tools")
    if not os.path.isdir(lang_tools_dir):
        print(f"  [{lang.upper()}] tools dir not found, skipping.")
        continue

    ui_trans = UI_TRANSLATIONS.get(lang, {})
    count = 0

    for fname in os.listdir(lang_tools_dir):
        if not fname.endswith(".html"):
            continue
        fpath = os.path.join(lang_tools_dir, fname)
        stem = get_stem(fname)

        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()

        # --- PHASE 1: Update meta title + description ---
        if stem in TOOL_SEO and lang in TOOL_SEO[stem]:
            loc_title, loc_desc = TOOL_SEO[stem][lang]
        else:
            # Generic fallback based on tool type
            current_title_m = re.search(r'<title>(.*?)</title>', content)
            current_title = current_title_m.group(1) if current_title_m else stem
            # Strip SmartToolzAI suffix
            base_title = re.sub(r'\s*—\s*SmartToolzAI.*$', '', current_title).strip()
            if "ai-" in stem or stem.startswith("ai"):
                suffix, fallback_desc = AI_GENERIC[lang]
            else:
                suffix, fallback_desc = CONVERTER_GENERIC[lang]
            loc_title = base_title + suffix
            loc_desc = fallback_desc

        # Replace <title>
        content = re.sub(r'<title>[^<]*</title>', f'<title>{loc_title}</title>', content)
        # Replace meta description
        content = re.sub(
            r'<meta name="description" content="[^"]*">',
            f'<meta name="description" content="{loc_desc}">',
            content
        )
        # Replace og:title
        content = re.sub(
            r'<meta property="og:title" content="[^"]*">',
            f'<meta property="og:title" content="{loc_title}">',
            content
        )
        # Replace og:description
        content = re.sub(
            r'<meta property="og:description" content="[^"]*">',
            f'<meta property="og:description" content="{loc_desc}">',
            content
        )

        # --- PHASE 2: Translate UI labels (form labels, placeholders, buttons) ---
        for en_str, loc_str in ui_trans.items():
            content = content.replace(en_str, loc_str)

        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        count += 1

    print(f"  [{lang.upper()}] Updated meta + UI for {count} tool pages - OK")
    total_updated += count

print(f"\nPhase 1+2 Complete! Total pages updated: {total_updated}")
