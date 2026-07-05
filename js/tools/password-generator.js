
document.addEventListener('DOMContentLoaded', () => {
  const passLength = document.getElementById('passLength');
  const lengthVal = document.getElementById('lengthVal');
  const chkUpper = document.getElementById('chkUpper');
  const chkLower = document.getElementById('chkLower');
  const chkNumbers = document.getElementById('chkNumbers');
  const chkSymbols = document.getElementById('chkSymbols');
  const generateBtn = document.getElementById('generateBtn');
  const passOutput = document.getElementById('passOutput');
  const copyPassBtn = document.getElementById('copyPassBtn');
  const strengthFill = document.getElementById('strengthFill');

  SmartToolzAI.addRecentTool('Password Generator', 'password-generator.html', '🔐');
  document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Password Generator');

  passLength.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
  });

  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const numChars = '0123456789';
  const symChars = '!@#$%^&*()_+~`|}{[]:;?><,./-="';

  function generatePassword() {
    let charset = '';
    if (chkUpper.checked) charset += upperChars;
    if (chkLower.checked) charset += lowerChars;
    if (chkNumbers.checked) charset += numChars;
    if (chkSymbols.checked) charset += symChars;

    if (!charset) {
      SmartToolzAI.showToast('Please select at least one character option.', 'error');
      return;
    }

    let password = '';
    const length = parseInt(passLength.value);
    for (let i = 0; i < length; i++) {
      const randIndex = Math.floor(Math.random() * charset.length);
      password += charset[randIndex];
    }

    passOutput.textContent = password;
    evaluateStrength(password);
  }

  function evaluateStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 14) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    strengthFill.className = 'strength-fill';
    if (score <= 2) {
      strengthFill.classList.add('weak');
    } else if (score === 3) {
      strengthFill.classList.add('fair');
    } else if (score === 4) {
      strengthFill.classList.add('good');
    } else {
      strengthFill.classList.add('strong');
    }
  }

  generateBtn.addEventListener('click', generatePassword);
  
  copyPassBtn.addEventListener('click', () => {
    if (passOutput.textContent !== 'Click Generate...') {
      SmartToolzAI.copyToClipboard(passOutput.textContent);
    }
  });

  // Initial gen
  generatePassword();
});
