
document.addEventListener('DOMContentLoaded', () => {
  const colorPicker = document.getElementById('colorPicker');
  const hexVal = document.getElementById('hexVal');
  const rgbVal = document.getElementById('rgbVal');
  const hslVal = document.getElementById('hslVal');
  const paletteContainer = document.getElementById('paletteContainer');

  SmartToolzAI.addRecentTool('Color Picker', 'color-picker.html', '🎨');
  document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Color Picker');

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  function updateColors() {
    const hex = colorPicker.value;
    hexVal.value = hex;

    const { r, g, b } = hexToRgb(hex);
    rgbVal.value = `rgb(${r}, ${g}, ${b})`;

    const { h, s, l } = rgbToHsl(r, g, b);
    hslVal.value = `hsl(${h}, ${s}%, ${l}%)`;

    // Palettes
    generatePalette(h, s, l);
  }

  function generatePalette(h, s, l) {
    paletteContainer.innerHTML = '';
    
    // Schemes: Complementary (180deg), Analogous (-30, +30), Monochromatic (l-20, l+20)
    const colors = [
      { name: 'Primary', h, s, l },
      { name: 'Complementary', h: (h + 180) % 360, s, l },
      { name: 'Analogous L', h: (h + 330) % 360, s, l },
      { name: 'Analogous R', h: (h + 30) % 360, s, l },
      { name: 'Lighter', h, s, l: Math.min(l + 20, 95) },
      { name: 'Darker', h, s, l: Math.max(l - 20, 10) }
    ];

    colors.forEach(c => {
      const hex = hslToHex(c.h, c.s, c.l);
      const card = document.createElement('div');
      card.style.textAlign = 'center';
      card.innerHTML = `
        <div style="background: ${hex}; height: 60px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); cursor: pointer;" onclick="SmartToolzAI.copyToClipboard('${hex}')"></div>
        <div style="font-size: 0.75rem; margin-top: 0.4rem; font-weight: bold;">${c.name}</div>
        <div style="font-size: 0.7rem; color: var(--text-muted);">${hex}</div>
      `;
      paletteContainer.appendChild(card);
    });
  }

  colorPicker.addEventListener('input', updateColors);
  updateColors();

  document.getElementById('copyHex').addEventListener('click', () => SmartToolzAI.copyToClipboard(hexVal.value));
  document.getElementById('copyRgb').addEventListener('click', () => SmartToolzAI.copyToClipboard(rgbVal.value));
  document.getElementById('copyHsl').addEventListener('click', () => SmartToolzAI.copyToClipboard(hslVal.value));
});
